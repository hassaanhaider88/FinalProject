import mongoose, { Schema, model } from "mongoose";

const lessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    }
}, { timestamps: true });

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    lessons: [lessonSchema]   
}, { timestamps: true });

const courseModel = model("Course", courseSchema);

export default courseModel;