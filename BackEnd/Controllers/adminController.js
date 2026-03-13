import userModel from "../Models/userModel.js";
import courseModel from "../Models/courseModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel
            .find().select("-password").sort({ createdAt: -1 });

        if (!users) {
            return res.json({
                success: false,
                message: "No Users Found"
            })
        }
        return res.json({
            success: true,
            message: "All Users Fetched",
            count: users.length,
            data: users,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Invalid Id" });
        }
        const user = await userModel.findById(id).select("-password");

        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        return res.json({
            success: true,
            message: "User Found",
            data: user,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Invalid Id" });
        }

        const { role } = req.body;
        if (!role) {
            return res.json({ success: false, message: "Invalid Role" });
        }
        if (!req.user.role === "admin") {
            return res.json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
        const allowedRoles = ["student", "instructor", "admin"];
        if (!allowedRoles.includes(role)) {
            return res.json({
                success: false,
                message: "Invalid role. Allowed: student, instructor, admin",
            });
        }

        const user = await userModel
            .findByIdAndUpdate(id, { role }, { new: true })
            .select("-password");

        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        return res.json({
            success: true,
            message: `User role updated to "${role}" successfully`,
            data: user,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Invalid Id" });
        }

        if (!req.user.role === "admin") {
            return res.json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
        if (req.user._id.toString() === id) {
            return res.json({
                success: false,
                message: "You cannot delete your own account",
            });
        }

        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        return res.json({
            success: true,
            message: "User Deleted Successfully",
            data: { _id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const getAllCoursesAdmin = async (req, res) => {
    try {
        if (!req.user.role === "admin") {
            return res.json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
        const courses = await courseModel
            .find().populate("instructor", "-password").sort({ createdAt: -1 });

        return res.json({
            success: true,
            message: "All Courses Fetched",
            count: courses.length,
            data: courses,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const deleteCourseAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Invalid Id" });
        }
        if (!req.user.role === "admin") {
            return res.json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
        const course = await courseModel.findByIdAndDelete(id);

        if (!course) {
            return res.json({ success: false, message: "Course Not Found" });
        }

        return res.json({
            success: true,
            message: "Course Deleted Successfully",
            data: course,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const updateCourseAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ success: false, message: "Invalid Id" });
        }
        if (!req.user.role === "admin") {
            return res.json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
        const { title, description, category, price } = req.body;

        const course = await courseModel
            .findByIdAndUpdate(
                id,
                { title, description, category, price },
                { new: true },
            )
            .populate("instructor", "-password");

        if (!course) {
            return res.json({ success: false, message: "Course Not Found" });
        }

        return res.json({
            success: true,
            message: "Course Updated Successfully",
            data: course,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const getAnalytics = async (req, res) => {
    try {
        const [users, courses] = await Promise.all([
            userModel.find().select("-password"),
            courseModel.find().populate("instructor", "name email role"),
        ]);
        if (!users || !courses) {
            return res.json({
                success: false,
                message: "No Data Found"
            })
        }
        if (!req.user.role === "admin") {
            return res.json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
        const totalUsers = users.length;
        const totalStudents = users.filter((u) => u.role === "student").length;
        const totalInstructors = users.filter(
            (u) => u.role === "instructor",
        ).length;
        const totalAdmins = users.filter((u) => u.role === "admin").length;


        const totalCourses = courses.length;
        const freeCourses = courses.filter((c) => Number(c.price) === 0).length;
        const paidCourses = totalCourses - freeCourses;
        const totalRevenue = courses.reduce(
            (sum, c) => sum + (Number(c.price) || 0),
            0,
        );
        const avgCoursePrice =
            totalCourses > 0 ? (totalRevenue / totalCourses).toFixed(2) : 0;


        const categoryMap = {};
        courses.forEach((c) => {
            if (c.category) {
                categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
            }
        });
        const categoryBreakdown = Object.entries(categoryMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);


        const now = new Date();
        const monthlyCourses = Array.from({ length: 6 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
            const label = d.toLocaleString("en-US", {
                month: "short",
                year: "numeric",
            });
            const count = courses.filter((c) => {
                const cd = new Date(c.createdAt);
                return (
                    cd.getMonth() === d.getMonth() && cd.getFullYear() === d.getFullYear()
                );
            }).length;
            return { month: label, count };
        });


        const monthlyUsers = Array.from({ length: 6 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
            const label = d.toLocaleString("en-US", {
                month: "short",
                year: "numeric",
            });
            const count = users.filter((u) => {
                const cd = new Date(u.createdAt);
                return (
                    cd.getMonth() === d.getMonth() && cd.getFullYear() === d.getFullYear()
                );
            }).length;
            return { month: label, count };
        });


        const instructorMap = {};
        courses.forEach((c) => {
            if (c.instructor) {
                const key = c.instructor._id?.toString();
                if (!instructorMap[key]) {
                    instructorMap[key] = {
                        name: c.instructor.name,
                        email: c.instructor.email,
                        courses: 0,
                        revenue: 0,
                    };
                }
                instructorMap[key].courses += 1;
                instructorMap[key].revenue += Number(c.price) || 0;
            }
        });
        const topInstructors = Object.values(instructorMap)
            .sort((a, b) => b.courses - a.courses)
            .slice(0, 5);

        return res.json({
            success: true,
            message: "Analytics Fetched",
            data: {
                users: {
                    total: totalUsers,
                    students: totalStudents,
                    instructors: totalInstructors,
                    admins: totalAdmins,
                },
                courses: {
                    total: totalCourses,
                    free: freeCourses,
                    paid: paidCourses,
                    totalRevenue,
                    avgPrice: avgCoursePrice,
                },
                categoryBreakdown,
                monthlyCourses,
                monthlyUsers,
                topInstructors,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export {
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
    getAllCoursesAdmin,
    deleteCourseAdmin,
    updateCourseAdmin,
    getAnalytics,
};
