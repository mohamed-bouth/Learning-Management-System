import mongoose, { Schema } from "mongoose";

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

moduleShema.virtual("resources", {
    ref: "Resource",
    localField: "_id",
    foreignField: "module"
});

moduleShema.set("toJSON", {
    virtuals: true
});


export default mongoose.model('Module' , moduleShema)