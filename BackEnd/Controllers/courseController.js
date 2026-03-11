import courseModel from "../Models/courseModel.js";

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find();
        if (!courses) {
            return res.json({
                success: false,
                message: "No Courses Found",
            });
        }
        return res.json({
            success: true,
            message: "All Courses Found",
            data: courses,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// url will be /api/course/:id
const getSingleCourse = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({
                success: false,
                message: "Invalid Id",
            });
        }
        const course = await courseModel.findById(id).populate("instructor");
        if (!course) {
            return res.json({
                success: false,
                message: "No Course Found",
            });
        }
        return res.json({
            success: true,
            message: "Course Found",
            data: course,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const createCourse = async (req, res) => {
    try {
        const { title, description, category, price } = req.body;
        if (!title || !description || !category || !price) {
            return res.json({
                success: false,
                message: "All Fields Required",
            });
        }

        if (!req.user.role === "admin" || !req.user.role === "instructor") {
            return res.json({
                success: false,
                message: "You are not authorized to create a course",
            });
        }
        const course = await courseModel.create({
            title,
            description,
            category,
            price,
            instructor: req.user._id,
        });
        if (!course) {
            return res.json({
                success: false,
                message: "Something went wrong",
            });
        }
        return res.json({
            success: true,
            message: "Course Created",
            data: course,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, price } = req.body;
        if (!id) {
            return res.json({
                success: false,
                message: "Invalid Id",
            });
        }

        if (!req.user.role === "admin" || !req.user.role === "instructor") {
            return res.json({
                success: false,
                message: "You are not authorized to update a course",
            });
        }

        const course = await courseModel.findByIdAndUpdate(id, {
            title,
            description,
            category,
            price,
        });
        if (!course) {
            return {
                success: false,
                message: "Something went wrong..",
            };
        }
        return res.json({
            success: true,
            message: "Course Updated Successfully..",
            data: course,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({
                success: false,
                message: "Invalid Id",
            });
        }

        if (!req.user.role === "admin" || !req.user.role === "instructor") {
            return res.json({
                success: false,
                message: "You are not authorized to Delete a course",
            });
        }

        const course = await courseModel.findByIdAndDelete(id);
        if (!course) {
            return res.json({
                success: false,
                message: "Something wents wrong...",
            });
        }

        return res.json({
            success: true,
            message: "Course Deleted Successfully..",
            data: course,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const sendInstructorsCourses = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const courses = await courseModel.find({ instructor: req.user._id });
        if (!courses) {
            return res.json({
                success: false,
                message: "No Courses Found",
            });
        }

        return res.json({
            success: true,
            message: "Courses Found",
            data: courses,
        });
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

export {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    sendInstructorsCourses,
};
