import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        // stores IDs of lessons the student has finished
        completedLessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        // 0–100, auto-calculated from completedLessons vs total lessons
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
    },
    { timestamps: true }
);

// prevent duplicate enrollments
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);

export default enrollmentModel;