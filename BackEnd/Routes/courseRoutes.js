import express from 'express';
import {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../Controllers/courseController.js";
import AuthMiddleWare from "../middlewares/Auth.MiddleWare.js"
const router = express.Router();


router.get("/all", getAllCourses);
router.get("/:id", getSingleCourse);

// protected routes 
router.post("/create", AuthMiddleWare, createCourse);
router.put("/:id", AuthMiddleWare, updateCourse);
router.delete("/:id", AuthMiddleWare, deleteCourse);


export default router;