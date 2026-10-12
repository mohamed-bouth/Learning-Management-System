import { fileTypeFromBuffer } from "file-type";

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

export async function validateImage(req, res, next) {
    try {
        if (!req.file) {

            const error = new Error("Image is required!")
            error.name = "ValidationError"

            return next(error)
        }

        const detectedType = await fileTypeFromBuffer(
            req.file.buffer
        );

        if (!detectedType || !allowedMimeTypes.includes(detectedType.mime)) {
            const error = new Error("Image is required!")
            error.name = "ValidationError"
            return next(error)
        }

        req.file.ext = detectedType.ext;

        next();
    } catch (error) {
        next(error);
    }
}