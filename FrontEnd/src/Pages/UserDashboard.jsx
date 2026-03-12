/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useContext } from "react";
import {
  FaBookOpen,
  FaSearch,
  FaSpinner,
  FaTimes,
  FaCheckCircle,
  FaPlayCircle,
  FaShoppingCart,
  FaGraduationCap,
  FaChartBar,
  FaRegClock,
  FaPlay,
  FaStop,
  FaList,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import BackEnd_URI from "../Utils/BackEnd_URI";
import { CourseContext } from "../Store/CourseStore";

const BASE = `${BackEnd_URI}/api/student`;

const CAT_BADGE = {
  Design: "bg-purple-100 text-purple-700",
  Development: "bg-indigo-100 text-indigo-700",
  "Data Science": "bg-blue-100 text-blue-700",
  Business: "bg-yellow-100 text-yellow-700",
  Marketing: "bg-orange-100 text-orange-700",
  Finance: "bg-teal-100 text-teal-700",
  Science: "bg-green-100 text-green-700",
};

function authHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("LMSUser")}`,
  };
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// seconds → "2m 30s"
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function StudentDashboard() {
  const { AllCourses } = useContext(CourseContext);
  console.log(AllCourses);
  const [activeTab, setActiveTab] = useState("my-courses");
  const [enrollments, setEnrollments] = useState([]);
  const [allCourse, setAllCourse] = useState(AllCourses || []);
  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [enrollingId, setEnrollingId] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  // which courses are expanded to show lessons
  const [expandedCourses, setExpandedCourses] = useState({});

  // activeLesson = { enrollmentId, lessonId, lessonTitle, totalSeconds, elapsedSeconds, canComplete }
  const [activeLesson, setActiveLesson] = useState(null);
  const timerRef = useRef(null);

  // ── helpers ─────────────────────────────────
  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function toggleCourse(enrollmentId) {
    setExpandedCourses((prev) => ({
      ...prev,
      [enrollmentId]: !prev[enrollmentId],
    }));
  }

  // ── fetch ────────────────────────────────────
  useEffect(() => {
    (async () => {
      setPageLoading(true);
      await fetchMyEnrollments();
      setPageLoading(false);
    })();
  }, []);

  async function fetchMyEnrollments() {
    try {
      const res = await fetch(`${BASE}/my-courses`, { headers: authHeader() });
      const data = await res.json();
      if (data.success) setEnrollments(data.data);
      else setEnrollments([]);
    } catch (err) {
      console.log(err);
    }
  }

  // ── enroll ───────────────────────────────────
  async function handleEnroll(courseId) {
    setEnrollingId(courseId);
    setBtnLoading(true);
    try {
      const res = await fetch(`${BASE}/enroll`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Enrolled successfully! 🎉");
        await fetchMyEnrollments();
      } else {
        showToast(data.message, "error");
      }
    } catch {
      const course = allCourse.find((c) => c._id === courseId);
      if (course) {
        setEnrollments((prev) => [
          {
            _id: Date.now().toString(),
            progress: 0,
            completedLessons: [],
            createdAt: new Date().toISOString(),
            course,
          },
          ...prev,
        ]);
      }
      showToast("Enrolled! (demo mode)");
    }
    setBtnLoading(false);
    setEnrollingId(null);
  }

  // ════════════════════════════════════════════
  //  LESSON WATCH FLOW
  // ════════════════════════════════════════════

  // Step 1 — user clicks "Watch" on a lesson
  function startWatchingLesson(enrollment, lesson) {
    if (!lesson.duration || lesson.duration <= 0) {
      showToast("This lesson has no duration set.", "error");
      return;
    }

    // open video in new tab
    if (lesson.videoUrl) {
      window.open(lesson.videoUrl, "_blank", "noopener,noreferrer");
    }

    // start timer in current tab
    setActiveLesson({
      enrollmentId: enrollment._id,
      lessonId: lesson._id,
      lessonTitle: lesson.title,
      totalSeconds: lesson.duration * 60,
      elapsedSeconds: 0,
      canComplete: false,
    });
  }

  // Step 2 — tick every second
  useEffect(() => {
    if (!activeLesson) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActiveLesson((prev) => {
        if (!prev) return null;

        const nextElapsed = prev.elapsedSeconds + 1;
        const canComplete = nextElapsed >= prev.totalSeconds;

        if (canComplete) clearInterval(timerRef.current);

        return { ...prev, elapsedSeconds: nextElapsed, canComplete };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [activeLesson?.lessonId]); // restart only when a NEW lesson starts

  // Step 3 — AUTO-SAVE when timer hits 100% (canComplete becomes true)
  useEffect(() => {
    if (activeLesson?.canComplete) {
      autoSaveLessonComplete();
    }
  }, [activeLesson?.canComplete]);

  async function autoSaveLessonComplete() {
    if (!activeLesson) return;

    const { enrollmentId, lessonId } = activeLesson;
    clearInterval(timerRef.current);
    setBtnLoading(true);

    try {
      const res = await fetch(`${BASE}/lesson-complete/${enrollmentId}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ lessonId }),
      });
      const data = await res.json();

      if (data.success) {
        setEnrollments((prev) =>
          prev.map((e) => {
            if (e._id !== enrollmentId) return e;
            return {
              ...e,
              progress: data.data.progress,
              completedLessons: data.data.completedLessons,
            };
          }),
        );
        showToast("✅ Lesson completed!");
      } else {
        showToast(data.message, "error");
      }
    } catch {
      // demo mode: update locally
      setEnrollments((prev) =>
        prev.map((e) => {
          if (e._id !== enrollmentId) return e;
          const completed = [...(e.completedLessons || []), lessonId];
          const total = e.course?.lessons?.length || 1;
          return {
            ...e,
            completedLessons: completed,
            progress: Math.round((completed.length / total) * 100),
          };
        }),
      );
      showToast("✅ Lesson completed! (demo)");
    }

    setBtnLoading(false);
    setActiveLesson(null); // clear session AFTER saving
  }

  // user stops mid-way (timer not done yet)
  function stopWatching() {
    clearInterval(timerRef.current);
    setActiveLesson(null);
    showToast("Session stopped. Lesson not counted.", "warning");
  }

  // ── derived data ─────────────────────────────
  const enrolledIds = new Set(enrollments.map((e) => e.course?._id));

  const browseCourses = allCourse
    .filter((c) => !enrolledIds.has(c._id))
    .filter(
      (c) =>
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.category?.toLowerCase().includes(search.toLowerCase()),
    );

  const completed = enrollments.filter((e) => e.progress === 100).length;
  const inProgress = enrollments.filter(
    (e) => e.progress > 0 && e.progress < 100,
  ).length;
  const avgProgress = enrollments.length
    ? Math.round(
        enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length,
      )
    : 0;

  // ── loading ──────────────────────────────────
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FaSpinner className="animate-spin text-green-500" size={32} />
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg
          ${toast.type === "error" ? "bg-red-500" : toast.type === "warning" ? "bg-yellow-500" : "bg-green-600"}`}
        >
          {toast.msg}
          <button onClick={() => setToast(null)}>
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800">
            Edu<span className="text-green-600">Le</span>
          </span>
          <span className="text-xs bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded">
            Student
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaGraduationCap className="text-green-500" size={14} />
          Student Portal
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Watch lessons, track your progress, and discover new courses.
          </p>
        </div>

        {/* ── ACTIVE LESSON TIMER BANNER ──────── */}
        {activeLesson && (
          <div
            className={`mb-5 rounded-xl border-2 p-4 ${activeLesson.canComplete ? "bg-green-50 border-green-400" : "bg-blue-50 border-blue-300"}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">
                  {activeLesson.canComplete
                    ? "✅ Saving progress..."
                    : "⏳ Watching lesson..."}
                </p>

                <p className="font-semibold text-gray-900 text-sm mb-2">
                  {activeLesson.lessonTitle}
                </p>

                {/* timer bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${activeLesson.canComplete ? "bg-green-500" : "bg-blue-500"}`}
                      style={{
                        width: `${Math.min((activeLesson.elapsedSeconds / activeLesson.totalSeconds) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-600 flex-shrink-0">
                    {formatTime(activeLesson.elapsedSeconds)} /{" "}
                    {formatTime(activeLesson.totalSeconds)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* auto-saving spinner shown when timer done */}
                {activeLesson.canComplete ? (
                  <span className="flex items-center gap-2 text-sm text-green-700 font-semibold bg-green-100 px-4 py-2.5 rounded-lg">
                    <FaSpinner className="animate-spin" size={13} />
                    Saving...
                  </span>
                ) : (
                  // Stop only allowed BEFORE timer finishes
                  <button
                    onClick={stopWatching}
                    className="flex items-center gap-1.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 font-semibold text-sm px-3 py-2.5 rounded-lg"
                  >
                    <FaStop size={11} /> Stop
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: <FaBookOpen className="text-blue-500" size={18} />,
              label: "Enrolled",
              value: enrollments.length,
              bg: "bg-blue-50",
            },
            {
              icon: <FaCheckCircle className="text-green-500" size={18} />,
              label: "Completed",
              value: completed,
              bg: "bg-green-50",
            },
            {
              icon: <FaPlayCircle className="text-orange-500" size={18} />,
              label: "In Progress",
              value: inProgress,
              bg: "bg-orange-50",
            },
            {
              icon: <FaChartBar className="text-purple-500" size={17} />,
              label: "Avg Progress",
              value: `${avgProgress}%`,
              bg: "bg-purple-50",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div
                className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center mb-3`}
              >
                {card.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { id: "my-courses", label: `My Courses (${enrollments.length})` },
              { id: "browse", label: `Browse (${browseCourses.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-3.5 text-sm font-semibold border-b-2 transition-colors
                  ${activeTab === tab.id ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ══ MY COURSES ══════════════════════ */}
          {activeTab === "my-courses" && (
            <div className="p-5">
              {enrollments.length === 0 ? (
                <div className="text-center py-14">
                  <FaBookOpen
                    size={28}
                    className="text-gray-200 mx-auto mb-3"
                  />
                  <p className="font-semibold text-gray-600 mb-1">
                    No courses yet
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Browse and enroll to start learning.
                  </p>
                  <button
                    onClick={() => setActiveTab("browse")}
                    className="bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((enrollment) => {
                    const course = enrollment.course;
                    if (!course) return null;

                    const lessons = course.lessons || [];
                    const totalLessons = lessons.length;
                    const completedLessons = enrollment.completedLessons || [];
                    const isDone = enrollment.progress === 100;
                    const isExpanded = !!expandedCourses[enrollment._id];

                    // helper: is a lesson already completed?
                    function isLessonDone(lessonId) {
                      return completedLessons.some(
                        (id) => id?.toString() === lessonId?.toString(),
                      );
                    }

                    // is a lesson currently being watched?
                    function isLessonActive(lessonId) {
                      return (
                        activeLesson?.enrollmentId === enrollment._id &&
                        activeLesson?.lessonId?.toString() ===
                          lessonId?.toString()
                      );
                    }

                    return (
                      <div
                        key={enrollment._id}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                      >
                        {/* ── Course Header ── */}
                        <div
                          className={`p-5 cursor-pointer select-none hover:bg-gray-50 transition-colors ${isDone ? "bg-green-50/40" : ""}`}
                          onClick={() => toggleCourse(enrollment._id)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDone ? "bg-green-100" : "bg-gray-100"}`}
                            >
                              <MdOutlineOndemandVideo
                                size={19}
                                className={
                                  isDone ? "text-green-600" : "text-gray-400"
                                }
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900 text-sm">
                                  {course.title}
                                </h3>
                                {isDone && (
                                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <FaCheckCircle size={9} /> Completed
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-3">
                                <span
                                  className={`font-semibold px-2 py-0.5 rounded-full ${CAT_BADGE[course.category] || "bg-gray-100 text-gray-600"}`}
                                >
                                  {course.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaList size={9} /> {completedLessons.length}/
                                  {totalLessons} lessons done
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaRegClock size={9} /> Enrolled{" "}
                                  {formatDate(enrollment.createdAt)}
                                </span>
                              </div>

                              {/* Overall progress bar */}
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${isDone ? "bg-green-500" : "bg-green-400"}`}
                                    style={{ width: `${enrollment.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-gray-600 w-10 text-right">
                                  {enrollment.progress}%
                                </span>
                              </div>
                            </div>

                            {/* expand arrow */}
                            <span
                              className={`text-gray-400 text-sm transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                            >
                              ▼
                            </span>
                          </div>
                        </div>

                        {/* ── Lessons List (expanded) ── */}
                        {isExpanded && (
                          <div className="border-t border-gray-100">
                            {lessons.length === 0 ? (
                              <p className="text-xs text-gray-400 px-5 py-4">
                                No lessons in this course yet.
                              </p>
                            ) : (
                              lessons.map((lesson, idx) => {
                                const done = isLessonDone(lesson._id);
                                const active = isLessonActive(lesson._id);
                                const blocked =
                                  !done && !!activeLesson && !active; // another lesson is being watched

                                return (
                                  <div
                                    key={lesson._id || idx}
                                    className={`flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 last:border-0
                                      ${active ? "bg-blue-50" : done ? "bg-green-50/30" : "hover:bg-gray-50"}`}
                                  >
                                    {/* lesson number / check */}
                                    <div
                                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs
                                      ${done ? "bg-green-500 text-white" : active ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
                                    >
                                      {done ? (
                                        <FaCheckCircle size={11} />
                                      ) : (
                                        idx + 1
                                      )}
                                    </div>

                                    {/* title + meta */}
                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-sm font-medium ${done ? "text-gray-400 line-through" : "text-gray-800"}`}
                                      >
                                        {lesson.title}
                                      </p>
                                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                        <FaRegClock size={9} />{" "}
                                        {lesson.duration} min
                                        {active &&
                                          !activeLesson?.canComplete && (
                                            <span className="ml-2 text-blue-500 font-semibold animate-pulse">
                                              ⏳{" "}
                                              {formatTime(
                                                activeLesson.elapsedSeconds,
                                              )}{" "}
                                              /{" "}
                                              {formatTime(
                                                activeLesson.totalSeconds,
                                              )}
                                            </span>
                                          )}
                                      </p>
                                    </div>

                                    {/* action */}
                                    <div className="flex-shrink-0">
                                      {done ? (
                                        <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                                          <FaCheckCircle size={11} /> Done
                                        </span>
                                      ) : active &&
                                        activeLesson?.canComplete ? (
                                        // timer done — auto-saving to DB
                                        <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-lg flex items-center gap-1">
                                          <FaSpinner
                                            className="animate-spin"
                                            size={10}
                                          />
                                          Saving...
                                        </span>
                                      ) : active ? (
                                        // timer still running
                                        <span className="text-xs text-blue-500 font-semibold bg-blue-100 px-2 py-1 rounded-lg animate-pulse">
                                          Watching...
                                        </span>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            startWatchingLesson(
                                              enrollment,
                                              lesson,
                                            )
                                          }
                                          disabled={blocked}
                                          title={
                                            blocked
                                              ? "Finish the current lesson first"
                                              : ""
                                          }
                                          className="flex items-center gap-1.5 text-xs bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                          <FaExternalLinkAlt size={9} />
                                          Watch
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══ BROWSE TAB ══════════════════════ */}
          {activeTab === "browse" && (
            <div>
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="relative w-full sm:w-64">
                  <FaSearch
                    size={11}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="p-5">
                {browseCourses.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-10">
                    {search
                      ? "No courses match your search."
                      : "You're enrolled in all available courses!"}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {browseCourses.map((course) => {
                      const totalMin =
                        course.lessons?.reduce(
                          (s, l) => s + (Number(l.duration) || 0),
                          0,
                        ) || 0;
                      const lessonCount = course.lessons?.length || 0;

                      return (
                        <div
                          key={course._id}
                          className="border border-gray-200 rounded-xl p-5 hover:border-green-200 transition-colors"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <MdOutlineOndemandVideo
                                size={18}
                                className="text-green-600"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                                {course.title}
                              </h3>
                              <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${CAT_BADGE[course.category] || "bg-gray-100 text-gray-600"}`}
                              >
                                {course.category}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                            {course.description}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                            <span className="flex items-center gap-1">
                              <FaList size={9} /> {lessonCount} lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <FaRegClock size={9} /> {totalMin} min
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span
                              className={`text-base font-bold ${Number(course.price) === 0 ? "text-green-600" : "text-gray-900"}`}
                            >
                              {Number(course.price) === 0
                                ? "Free"
                                : `$${course.price}`}
                            </span>
                            <button
                              onClick={() => handleEnroll(course._id)}
                              disabled={
                                btnLoading && enrollingId === course._id
                              }
                              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-lg disabled:opacity-60"
                            >
                              {btnLoading && enrollingId === course._id ? (
                                <FaSpinner className="animate-spin" size={11} />
                              ) : (
                                <FaShoppingCart size={11} />
                              )}
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
