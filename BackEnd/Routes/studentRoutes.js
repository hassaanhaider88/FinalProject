import express from "express";
import { enrollCourse, getMyCourses, markLessonComplete } from "../Controllers/enrollmentController.js";
import AuthMiddleWare from "../middlewares/Auth.MiddleWare.js"

const router = express.Router();

router.post("/enroll", AuthMiddleWare, enrollCourse);
router.get("/my-courses", AuthMiddleWare, getMyCourses);
router.put("/lesson-complete/:enrollmentId", AuthMiddleWare, markLessonComplete);

export default router;

// app.use("/api/student", studentRoutes);