import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
        maxLength: 64,
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 256,
    },
},{ timestamps: true })

export default mongoose.model('Category', categorySchema)