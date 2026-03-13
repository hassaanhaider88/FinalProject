import { BiUpload } from "react-icons/bi";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import {
  FaTimes,
  FaBookOpen,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import BackEnd_URI from "../Utils/BackEnd_URI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CATEGORIES from "../Utils/AllCategories";

function ConfirmModal({ open, title, desc, onConfirm, onCancel, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaExclamationTriangle className="text-red-500" size={20} />
        </div>
        <h3 className="text-center font-extrabold text-gray-900 text-lg mb-1">
          {title}
        </h3>
        <p className="text-center text-sm text-gray-500 mb-6">{desc}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:border-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <FaSpinner className="animate-spin" size={13} /> : null}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseModal({ open, onClose, onSubmit, editData, loading }) {
  const empty = { title: "", description: "", category: "", price: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData)
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        category: editData.category || "",
        price: editData.price || "",
      });
    else setForm(empty);
    setErrors({});
  }, [editData, open]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.category) e.category = "Category is required";
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      e.price = "Valid price is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-extrabold text-gray-900 text-lg">
              {editData ? "Edit Course" : "Create New Course"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editData
                ? "Update course information below."
                : "Fill in the details to publish a new course."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <FaTimes size={13} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Data Science with Python"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 ${errors.title ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe what students will learn..."
              rows={4}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 resize-none ${errors.description ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 ${errors.category ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                min="0"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 ${errors.price ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:border-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-green-200"
          >
            {loading ? (
              <FaSpinner className="animate-spin" size={13} />
            ) : editData ? (
              <FaEdit size={13} />
            ) : (
              <FaPlus size={13} />
            )}
            {editData ? "Update Course" : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewModal({ open, course, onClose }) {
  if (!open || !course) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900">Course Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <FaTimes size={13} className="text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
              Title
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {course.title}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
              Description
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                Category
              </p>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {course.category}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                Price
              </p>
              <p className="text-lg font-extrabold text-green-600">
                {Number(course.price) === 0 ? "Free" : `$${course.price}`}
              </p>
            </div>
          </div>
          {course._id && (
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                Course ID
              </p>
              <p className="text-xs text-gray-500 font-mono bg-gray-50 px-3 py-2 rounded-lg break-all">
                {course._id}
              </p>
            </div>
          )}
        </div>
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:border-gray-300 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const token = localStorage.getItem("LMSUser");
  if (!token) {
    navigate("/");
  }

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BackEnd_URI}/api/course/instructor-courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success) setCourses(data.data);
      else toast(data.message || "Failed to load courses", "error");
    } catch {
      // Fallback mock data for demo purposes
      setCourses([
        {
          _id: "1",
          title: "Data Science with Python – Hands On!",
          description:
            "Master Python, Pandas, NumPy, Scikit-Learn through 30+ projects.",
          category: "Data Science",
          price: "385",
        },
        {
          _id: "2",
          title: "UX Design: Color Theory for Products",
          description:
            "Create stunning color schemes for your digital products.",
          category: "Design",
          price: "420",
        },
        {
          _id: "3",
          title: "Build Brand Into Marketing",
          description:
            "Tackle the new marketing landscape and build powerful brands.",
          category: "Marketing",
          price: "136",
        },
        {
          _id: "4",
          title: "Finance Series: Budget & Net Worth",
          description:
            "Learn to budget and calculate your financial net worth.",
          category: "Finance",
          price: "0",
        },
        {
          _id: "5",
          title: "React Development Masterclass",
          description:
            "Full-stack React with hooks, context, and modern patterns.",
          category: "Development",
          price: "299",
        },
        {
          _id: "6",
          title: "Business Strategy for Startups",
          description: "Build and grow your business with proven strategies.",
          category: "Business",
          price: "199",
        },
      ]);
      toast.error("Using demo data — API not connected", "warning");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (form) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${BackEnd_URI}/api/course/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setCourses((prev) => [data.data, ...prev]);
        toast.success("Course created successfully!");
        setFormOpen(false);
      } else {
        toast.error(data.message || "Failed to create course", "error");
      }
    } catch {
      // Demo fallback
      const newCourse = { _id: Date.now().toString(), ...form };
      setCourses((prev) => [newCourse, ...prev]);
      toast.success("Course created (demo mode)");
      setFormOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (form) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${BackEnd_URI}/api/course/${editData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setCourses((prev) =>
          prev.map((c) => (c._id === editData._id ? { ...c, ...form } : c)),
        );
        toast.success("Course updated successfully!");
        setFormOpen(false);
        setEditData(null);
      } else {
        toast.error(data.message || "Failed to update course", "error");
      }
    } catch (error) {
      setCourses((prev) =>
        prev.map((c) => (c._id === editData._id ? { ...c, ...form } : c)),
      );
      toast.success(error.message);
      setFormOpen(false);
      setEditData(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(
        `${BackEnd_URI}/api/course/${confirmDelete._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setCourses((prev) => prev.filter((c) => c._id !== confirmDelete._id));
        toast.success("Course deleted successfully!");
        setConfirmDelete(null);
      } else {
        toast.error(data.message || "Failed to delete course", "error");
      }
    } catch (error) {

      setCourses((prev) => prev.filter((c) => c._id !== confirmDelete._id));
      toast.success(error.message);
      setConfirmDelete(null);
    } finally {
      setActionLoading(false);
    }
  };


  const filtered = courses.filter((c) => {
    const matchSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || c.category === filterCat;
    return matchSearch && matchCat;
  });

  const freeCourses = courses.filter((c) => Number(c.price) === 0).length;

  const categoryColors = {
    "Data Science": "bg-blue-100 text-blue-700",
    Design: "bg-purple-100 text-purple-700",
    Development: "bg-indigo-100 text-indigo-700",
    Business: "bg-yellow-100 text-yellow-700",
    Marketing: "bg-orange-100 text-orange-700",
    Finance: "bg-teal-100 text-teal-700",
    Science: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Breadcrumb */}
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-green-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
                Instructor Dashboard
              </h1>
              <p className="text-gray-300 text-sm">
                Manage and monitor all your published courses.
              </p>
            </div>
            <button
              onClick={() => {
                setEditData(null);
                setFormOpen(true);
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm w-fit"
            >
              <FaPlus size={13} /> Create New Course
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-7">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full" />
              My Courses
              <span className="ml-1 text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                {courses.length}
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <FaSearch
                  size={12}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 w-56"
                />
              </div>
              {/* Category Filter */}
              <div className="relative">
                <FaFilter
                  size={11}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={filterCat}
                  onChange={(e) => setFilterCat(e.target.value)}
                  className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 appearance-none"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-green-500" size={28} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaBookOpen size={24} className="text-gray-300" />
              </div>
              <p className="font-bold text-gray-700 mb-1">No courses found</p>
              <p className="text-sm text-gray-400 mb-5">
                {search || filterCat !== "All"
                  ? "Try adjusting your filters."
                  : "Start by creating your first course."}
              </p>
              <button
                onClick={() => {
                  setEditData(null);
                  setFormOpen(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 mx-auto"
              >
                <FaPlus size={12} /> Create Course
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="text-right px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((course, i) => (
                      <tr
                        key={course._id}
                        className="hover:bg-green-50/40 transition-colors group"
                      >
                        <td className="px-6 py-4 text-xs text-gray-400 font-medium">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                              <MdOutlineOndemandVideo
                                size={16}
                                className="text-green-600"
                              />
                            </div>
                            <span className="font-semibold text-gray-800 line-clamp-1 max-w-xs">
                              {course.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[course.category] || "bg-gray-100 text-gray-600"}`}
                          >
                            {course.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`font-extrabold text-sm ${Number(course.price) === 0 ? "text-green-600" : "text-gray-900"}`}
                          >
                            {Number(course.price) === 0
                              ? "Free"
                              : `Rs.${course.price}`}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              title="Upload Lessons"
                              className="py-2 px-3"
                              onClick={() => navigate(`/upload/${course._id}`)}
                            >
                              <BiUpload size={14} />
                            </button>
                            <button
                              title="View Course"
                              onClick={() => navigate(`/course/${course._id}`)}
                              className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <FaEye size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setEditData(course);
                                setFormOpen(true);
                              }}
                              className="w-8 h-8 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg flex items-center justify-center transition-colors"
                              title="Edit Course"
                            >
                              <FaEdit size={13} />
                            </button>
                            <button
                              onClick={() => setConfirmDelete(course)}
                              className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors"
                              title="Delete Course"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-100">
                // eslint-disable-next-line no-unused-vars
                {filtered.map((course, i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                          <MdOutlineOndemandVideo
                            size={16}
                            className="text-green-600"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm line-clamp-2">
                            {course.title}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[course.category] || "bg-gray-100 text-gray-600"}`}
                        >
                          {course.category}
                        </span>
                        <span
                          className={`text-sm font-extrabold ${Number(course.price) === 0 ? "text-green-600" : "text-gray-900"}`}
                        >
                          {Number(course.price) === 0
                            ? "Free"
                            : `Rs.${course.price}`}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/course/${course._id}`)}
                          className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"
                        >
                          <FaEye size={13} />
                        </button>
                        <button
                          onClick={() => {
                            setEditData(course);
                            setFormOpen(true);
                          }}
                          className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(course)}
                          className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {filtered.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-700">
                    {courses.length}
                  </span>{" "}
                  courses
                </p>
                <button
                  onClick={fetchCourses}
                  disabled={loading}
                  className="text-xs text-green-600 font-semibold hover:underline flex items-center gap-1 disabled:opacity-50"
                >
                  Refresh <FaArrowRight size={10} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────── */}
      <CourseModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditData(null);
        }}
        onSubmit={editData ? handleUpdate : handleCreate}
        editData={editData}
        loading={actionLoading}
      />
      <ViewModal
        open={!!viewCourse}
        course={viewCourse}
        onClose={() => setViewCourse(null)}
      />
      <ConfirmModal
        open={!!confirmDelete}
        title="Delete Course"
        desc={`Are you sure you want to delete "${confirmDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        loading={actionLoading}
      />
    </div>
  );
}
