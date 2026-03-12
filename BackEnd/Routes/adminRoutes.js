import express from "express";
import {
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
    getAllCoursesAdmin,
    deleteCourseAdmin,
    updateCourseAdmin,
    getAnalytics,
} from "../Controllers/adminController.js";
import AuthMiddleWare from "../middlewares/Auth.MiddleWare.js";


const router = express.Router();




// ── Analytics ──────────────────────────────
router.get("/analytics", AuthMiddleWare, getAnalytics);

// ── User Management ────────────────────────
router.get("/users", AuthMiddleWare, getAllUsers);
router.get("/users/:id", AuthMiddleWare, getSingleUser);
router.put("/users/:id", AuthMiddleWare, updateUserRole);
router.delete("/users/:id", AuthMiddleWare, deleteUser);

// ── Course Management ──────────────────────
router.get("/courses", AuthMiddleWare, getAllCoursesAdmin);
router.put("/courses/:id", AuthMiddleWare, updateCourseAdmin);
router.delete("/courses/:id", AuthMiddleWare, deleteCourseAdmin);

export default router;
