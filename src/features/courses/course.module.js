import mongoose, { mongo, Schema } from "mongoose";

const courseSchema = mongoose.Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 256,
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 256,
    },
    level: {
        type: String,
        required: true,
        enum : ['easy','normal','hard']
    },
    objective: {
        type: String,
        required: true,
        minLength: 16,
    },
    estimatedDuration: {
        type: Number,
        required: true,
    },
    publicationStatus: {
        type: String,
        required: true,
        enum: ['draft','inpublished','published'],
        default : 'draft',
    },
    publicationDate: {
        type: Date,
        default: null
    }
},{ timestamps: true })

courseSchema.virtual("modules", {
    ref: "Module",
    localField: "_id",
    foreignField: "course"
});

courseSchema.set("toJSON", {
    virtuals: true
});

export default mongoose.model('Course', courseSchema)
