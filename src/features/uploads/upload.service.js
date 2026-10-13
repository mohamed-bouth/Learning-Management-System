import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import Upload from "../uploads/upload.module.js";
import { randomBytes } from "crypto";
import env from "../../config/env.js"
import cloudflareR2 from "../../config/cloudflareR2.js";

async function uploadFile(file, purpose, uniqueId, userId) {
    
    const extension = file.ext;
    const mimeType = file.mimetype;
    const generatedString = randomBytes(32).toString('hex')
    const imageKey = `resources/${uniqueId}-${generatedString}-resource.${extension}`

    const command = new PutObjectCommand({
        Bucket: env.r2BucketName,
        Key: imageKey,
        Body: file.buffer,
        ContentType: extension
    });

    const result = await cloudflareR2.send(command);

    if (!result) {
        throw new Error("Upload failed!")
    }

    const newFile = await Upload.create({
        key: imageKey,
        mimeType,
        size: file.size,
        originalName: file.originalname,
        uploadedBy: userId,
        purpose,
    })

    return newFile
}

async function removeUploadedFile(key) {

    await cloudflareR2.send(
        new DeleteObjectCommand({
            Bucket: env.r2BucketName,
            Key: key,
        })
    );
}

export { uploadFile, removeUploadedFile }