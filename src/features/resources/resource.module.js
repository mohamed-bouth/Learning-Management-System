import mongoose, { Schema } from "mongoose";

const resourceSchema = mongoose.Schema({
    module : {
        type : Schema.Types.ObjectId,
        ref : 'Module',
        required : true
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
    type: {
        type: String,
        required: true,
        enum: ['article', 'video', 'externalLink', 'pdf', 'image', 'exercise', 'codeRepository', 'courseMaterial']
    },
    url: {
        type: String,
        required: true,
    },
    originalFileName: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true
    },
    displayOrder: {
        type: Number,
        required: true
    }
},{ timestamps: true })

export default mongoose.model('Resource', resourceSchema)