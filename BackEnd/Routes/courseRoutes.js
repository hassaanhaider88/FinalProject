import express from 'express';
import {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    sendInstructorsCourses,
    addLesson
} from "../Controllers/courseController.js";
import AuthMiddleWare from "../middlewares/Auth.MiddleWare.js"
const router = express.Router();


router.get("/all", getAllCourses);
router.get("/instructor-courses", AuthMiddleWare, sendInstructorsCourses)
router.get("/:id", getSingleCourse);

// protected routes 
router.post("/create", AuthMiddleWare, createCourse);
router.put("/:id", AuthMiddleWare, updateCourse);
router.delete("/:id", AuthMiddleWare, deleteCourse);
router.post("/:courseId/lesson", AuthMiddleWare, addLesson)


export default router;