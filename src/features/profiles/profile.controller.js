import { getProfileService, updateProfileNameService, updateProfileEmailService, updateAccountPasswordService } from "./profile.service.js"
import { updateAccountPasswordSchema, updateProfileEmailSchema, updateProfileNameSchema } from "./profile.validation.js"

async function getProfileInfo(req, res, next) {
    try {
        const user = await getProfileService(req.user.userId)

        return res.status(200).json({
            success: true,
            data : {
                user
            }
        })
    }catch (error) {
        next(error)
    }
}

async function updateProfileName(req, res, next) {
    try {

        const result = updateProfileNameSchema.safeParse(req.body)

        if(!result.success){
            return next(result.error)
        }

        const user = await updateProfileNameService(req.user.userId, result.data)

        return res.status(200).json({
            success: true,
            data : {
                user
            }
        })
    }catch (error) {
        next(error)
    }
}

async function updateProfileEmail(req, res, next) {
    try {

        const result = updateProfileEmailSchema.safeParse(req.body)

        if(!result.success){
            return next(result.error)
        }

        const user = await updateProfileEmailService(req.user.userId, result.data)

        return res.status(200).json({
            success: true,
            data : {
                user
            }
        })
    }catch (error) {
        next(error)
    }
}

async function updateProfileImage(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required"
            });
        }

        const { originalname, mimetype, size, buffer } = req.file;

        console.log({
            originalname,
            mimetype,
            size,
            bufferLength: buffer.length
        });

        return res.status(200).json({
            success: true,
            message: "Image received successfully"
        });
    }catch (error) {
        next(error)
    }
}

async function updateAccountPassword(req, res, next) {
    try {

        const result = updateAccountPasswordSchema.safeParse(req.body)

        if(!result.success){
            return next(result.error)
        }

        const user = await updateAccountPasswordService(req.user.userId, result.data)

        return res.status(200).json({
            success: true,
            data : {
                user
            }
        })
    }catch (error) {
        next(error)
    }
}

export { getProfileInfo, updateProfileName, updateProfileEmail, updateProfileImage, updateAccountPassword }