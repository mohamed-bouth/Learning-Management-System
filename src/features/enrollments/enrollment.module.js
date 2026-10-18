import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema({
    learner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    enrolledAt: {
        type : Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active','completed','cancelled']
    },
    progress: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    }

}, { timestamps: true })

enrollmentSchema.virtual("progressions", {
    ref: "Progression",
    localField: "_id",
    foreignField: "enrollment"
});

enrollmentSchema.set("toObject", { virtuals: true });
enrollmentSchema.set("toJSON", { virtuals: true });

enrollmentSchema.index({ learner: 1, course: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema)