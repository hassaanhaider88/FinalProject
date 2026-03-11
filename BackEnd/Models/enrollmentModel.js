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
        progress: {
            type: Number, // 0-100
            default: 0,
        },
    },
    { timestamps: true }
);

const EnrollmentModel = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default EnrollmentModel;