import mongoose, { Schema, model } from "mongoose"

const courseSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})

const courseModel = model("course", courseSchema);

export default courseModel;