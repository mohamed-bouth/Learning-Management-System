import multer from "multer";

const allowedMimeTypes = [
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

const upload = multer({
    storage : multer.memoryStorage(),

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter: (req, file, callback) => {
        if(!allowedMimeTypes.includes(file.mimetype)) {
            return callback(
                new Error("Only JPEG, PNG and WebP images are allowed")
            )
        }
        callback(null, true)
    }
})

export default upload