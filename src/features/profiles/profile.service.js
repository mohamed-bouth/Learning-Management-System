import User from "../users/user.module.js";
import Role from "../roles/role.module.js"
import { hashPassword, verifyPassword } from "../../utils/password.service.js";

async function getProfileService(userId) {

    const userInfo = await User.findById(userId).populate({path: "role", select: "name"})

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

export { getProfileService, updateProfileNameService, updateProfileEmailService, updateAccountPasswordService }