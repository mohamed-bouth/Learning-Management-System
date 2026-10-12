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

        console.log("detectedType :", detectedType)

        if (!detectedType || !allowedMimeTypes.includes(detectedType.mime)) {
            const error = new Error("Image is required!")
            error.name = "ValidationError"
            return next(error)
        }

        req.file.detectedMimeType = detectedType.mime;

        next();
    } catch (error) {
        next(error);
    }
}