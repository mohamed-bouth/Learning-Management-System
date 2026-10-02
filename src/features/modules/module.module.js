import mongoose, { mongo, Schema } from "mongoose";

const moduleShema = mongoose.Schema({
    course : {
        type : Schema.Types.ObjectId,
        ref : 'Course',
        required : true,
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
    order: {
        type: Number,
        required: true,
    },
    estimatedDuration: {
        type: Number,
        required: true
    }
},{ timestamps: true })


export default mongoose.model('Module' , moduleShema)