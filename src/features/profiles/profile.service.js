import User from "../users/user.module.js";
import Role from "../roles/role.module.js"
import Image from "../images/image.module.js"
import { hashPassword, verifyPassword } from "../../utils/password.service.js";
import { randomBytes } from "crypto";
import env from "../../config/env.js";
import cloudflareR2 from "../../config/cloudflareR2.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

async function getProfileService(userId) {

    const userInfo = await User.findById(userId).populate({path: "role", select: "name"}).populate({path: "profileImage", select: "key"})

    userInfo.profileImage.key = `${env.r2PublicUrl}/${userInfo.profileImage.key}`
    return userInfo
}

async function updateProfileNameService(userId, body) {

    const user = await User.findByIdAndUpdate(userId , body , { new: true })

    return user
}

async function updateProfileEmailService(userId, body) {

    const user = await User.findByIdAndUpdate(userId , body , { new: true })

    return user
}

async function updateProfileImageService(userId, file) {

    const extension = file.ext;
    const mimeType = file.mimetype;
    const generatedString = randomBytes(32).toString('hex')

    const imageKey = `profiles/${userId}-${generatedString}-profileImage.${extension}`

    const command = new PutObjectCommand({
        Bucket: env.r2BucketName,
        Key: imageKey,
        Body: file.buffer,
        ContentType: extension
    });

    const result = await cloudflareR2.send(command);

    if(!result){
        throw new Error("Upload failed!")
    }

    const image = await Image.create({
        key: imageKey,
        mimeType,
        size: file.size,
        originalName: file.originalname,
        uploadedBy: userId,
        purpose: "profile"
    })

    const user = await User.findByIdAndUpdate(userId , {profileImage : image._id} , { new: true }).populate('profileImage')

    return user
}

async function updateAccountPasswordService(userId, body) {

    const {oldPassword, newPassword, newPasswordConfirmation} = body

    if(oldPassword === newPassword) {
        const error = new Error('Please type Valid New Password!')
        error.name = 'ValidationError'
        throw error
    }

    if (newPassword !== newPasswordConfirmation) {
        const error = new Error('New Password and New Password confirmation must be the same !')
        error.name = 'ValidationError'
        throw error
    }

    const user = await User.findById(userId).select("+passwordHash")

    if(!user){
        const error = new Error('User not Found!')
            error.status = 404
            throw error
    }

    if (!(await verifyPassword(user.passwordHash, oldPassword))) {
        const error = new Error('Invalid password. Please try again!')
        error.name = 'ValidationError'
        throw error
    }

    const newPasswordHash = await hashPassword(newPassword)

    const userWithNewPassword = await User.findByIdAndUpdate(userId, {passwordHash: newPasswordHash}, { new: true })

    return userWithNewPassword
}

export { getProfileService, updateProfileNameService, updateProfileEmailService, updateProfileImageService, updateAccountPasswordService }