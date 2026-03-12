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

// All admin routes are protected by Auth + Admin middleware
router.use(AuthMiddleWare);

// ── Analytics ──────────────────────────────
router.get("/analytics", getAnalytics);

// ── User Management ────────────────────────
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);

// ── Course Management ──────────────────────
router.get("/courses", getAllCoursesAdmin);
router.put("/courses/:id", updateCourseAdmin);
router.delete("/courses/:id", deleteCourseAdmin);

export default router;

// app.use("/api/admin", adminRoutes);