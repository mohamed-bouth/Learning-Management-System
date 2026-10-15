import mongoose from "mongoose";

const resourceSchema = mongoose.Schema({
    module: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Module',
        required: true
    },
    upload: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Upload',
        required: false
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
        required: false,
    },
    estimatedDuration: {
        type: Number,
        required: true,
        min: 0
    },
    displayOrder: {
        type: Number,
        required: true
    }
},{ timestamps: true })

export default mongoose.model('Resource', resourceSchema)