import enrollmentModel from "../Models/enrollmentModel.js";
import courseModel from "../Models/courseModel.js";

// ── POST /api/student/enroll ─────────────────────────────
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user._id;

    if (!courseId) {
      return res.json({ success: false, message: "Course ID is required" });
    }

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    const alreadyEnrolled = await enrollmentModel.findOne({ student: studentId, course: courseId });
    if (alreadyEnrolled) {
      return res.json({ success: false, message: "You are already enrolled in this course" });
    }

    const enrollment = await enrollmentModel.create({
      student: studentId,
      course: courseId,
      completedLessons: [],
      progress: 0,
    });

    return res.json({ success: true, message: "Enrolled successfully", data: enrollment });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ── GET /api/student/my-courses ──────────────────────────
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await enrollmentModel
      .find({ student: req.user._id })
      .populate("course")
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ── PUT /api/student/lesson-complete/:enrollmentId ───────
// body: { lessonId }
// Marks one lesson as done, recalculates overall progress
const markLessonComplete = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { lessonId } = req.body;
    const studentId = req.user._id;

    if (!lessonId) {
      return res.json({ success: false, message: "lessonId is required" });
    }

    // get enrollment + populate course to count total lessons
    const enrollment = await enrollmentModel
      .findOne({ _id: enrollmentId, student: studentId })
      .populate("course");

    if (!enrollment) {
      return res.json({ success: false, message: "Enrollment not found" });
    }

    const totalLessons = enrollment.course?.lessons?.length || 0;
    if (totalLessons === 0) {
      return res.json({ success: false, message: "This course has no lessons" });
    }

    // add lessonId only if not already there (prevent duplicates)
    const alreadyDone = enrollment.completedLessons.some(
      (id) => id.toString() === lessonId.toString()
    );

    if (!alreadyDone) {
      enrollment.completedLessons.push(lessonId);
    }

    // recalculate progress
    enrollment.progress = Math.round(
      (enrollment.completedLessons.length / totalLessons) * 100
    );

    await enrollment.save();

    return res.json({
      success: true,
      message: alreadyDone ? "Lesson already completed" : "Lesson marked as complete",
      data: {
        enrollmentId: enrollment._id,
        completedLessons: enrollment.completedLessons,
        progress: enrollment.progress,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { enrollCourse, getMyCourses, markLessonComplete };