
import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        mimeType: {
            type: String,
            required: true,
        },

        size: {
            type: Number,
            required: true,
            min: 1
        },

        originalName: {
            type: String,
            trim: true,
            maxlength: 255
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        purpose: {
            type: String,
            required: true,
            enum: ["profile", "course", "resource"]
        }
    },
    { timestamps: true }
);

export default mongoose.model("Upload", uploadSchema);
