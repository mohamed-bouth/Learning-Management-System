import { fileTypeFromBuffer } from "file-type";

const DefaultAllowedMimeTypes = [
     // Images
    "image/jpeg",
    "image/png",
    "image/webp",

    // Documents
    "application/pdf",
    "application/json",
    "text/plain",
    "text/csv",

    // Videos
    "video/mp4",
    "video/webm",

    // Archives
    "application/zip",
];

function validateFile(MimeTypes = []) {

    return async function (req, res, next) {

        let allowedMimeTypes = []

        if(MimeTypes.length > 0){
            allowedMimeTypes = [...MimeTypes]
        }else{
            allowedMimeTypes = [...DefaultAllowedMimeTypes]
        }

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

}

export default validateFile