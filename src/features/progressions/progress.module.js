import mongoose from "mongoose";

const progressionSchema = new mongoose.Schema(
    {
        enrollment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment",
            required: true
        },

        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
            required: true
        },

        resource: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
            required: true
        },

        status: {
            type: String,
            enum: ["inProgress", "completed"],
            default: "inProgress"
        },

        startedAt: {
            type: Date,
            default: Date.now
        },

        lastAccessedAt: {
            type: Date,
            default: Date.now
        },

        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

progressionSchema.index(
    { enrollment: 1, resource: 1 },
    { unique: true }
);

export default mongoose.model("Progression", progressionSchema);