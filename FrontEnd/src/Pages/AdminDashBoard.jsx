import { IoMdShareAlt } from "react-icons/io";
/* eslint-disable react-hooks/immutability */
import { useState, useEffect, useContext } from "react";
import {
  FaTrash,
  FaEdit,
  FaSearch,
  FaSpinner,
  FaUserCog,
  FaShieldAlt,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

import BackEnd_URI from "../Utils/BackEnd_URI";
import { CourseContext } from "../Store/CourseStore";
import { useNavigate } from "react-router-dom";
import CATEGORIES from "../Utils/AllCategories";

const ROLES = ["student", "instructor", "admin"];

const roleBadge = {
  admin: "bg-red-100 text-red-700",
  instructor: "bg-green-100 text-green-700",
  student: "bg-blue-100 text-blue-700",
};

const catBadge = {
  Design: "bg-purple-100 text-purple-700",
  Development: "bg-indigo-100 text-indigo-700",
  "Data Science": "bg-blue-100 text-blue-700",
  Business: "bg-yellow-100 text-yellow-700",
  Marketing: "bg-orange-100 text-orange-700",
  Finance: "bg-teal-100 text-teal-700",
  Science: "bg-green-100 text-green-700",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function authHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("LMSUser")}`,
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { AllCourses } = useContext(CourseContext);
  const [activeTab, setActiveTab] = useState("analytics");
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState(AllCourses || []);
  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [userSearch, setUserSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  const [toast, setToast] = useState(null);

  const [deleteModal, setDeleteModal] = useState(null);

  const [roleModal, setRoleModal] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    (async () => {
      setPageLoading(true);
      await Promise.all([fetchAnalytics(), fetchUsers(), fetchCourses()]);
      setPageLoading(false);
    })();
  }, []);

  async function fetchAnalytics() {
    try {
      const res = await fetch(`${BackEnd_URI}/api/admin/analytics`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUsers() {
    try {
      const res = await fetch(`${BackEnd_URI}/api/admin/users`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCourses() {
    try {
      const res = await fetch(`${BackEnd_URI}/api/admin/courses`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser() {
    setBtnLoading(true);
    try {
      const res = await fetch(
        `${BackEnd_URI}/api/admin/users/${deleteModal.item._id}`,
        {
          method: "DELETE",
          headers: authHeader(),
        },
      );
      const data = await res.json();
      if (data.success)
        setUsers((prev) => prev.filter((u) => u._id !== deleteModal.item._id));
      showToast(
        data.success ? "User deleted" : data.message,
        data.success ? "success" : "error",
      );
    } catch {
      setUsers((prev) => prev.filter((u) => u._id !== deleteModal.item._id));
      showToast("User deleted (demo)");
    }
    setBtnLoading(false);
    setDeleteModal(null);
  }

  async function handleUpdateRole() {
    setBtnLoading(true);
    try {
      const res = await fetch(
        `${BackEnd_URI}/api/admin/users/${roleModal._id}`,
        {
          method: "PUT",
          headers: authHeader(),
          body: JSON.stringify({ role: selectedRole }),
        },
      );
      const data = await res.json();
      if (data.success)
        setUsers((prev) =>
          prev.map((u) =>
            u._id === roleModal._id ? { ...u, role: selectedRole } : u,
          ),
        );
      showToast(
        data.success ? "Role updated" : data.message,
        data.success ? "success" : "error",
      );
    } catch {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === roleModal._id ? { ...u, role: selectedRole } : u,
        ),
      );
      showToast("Role updated (demo)");
    }
    setBtnLoading(false);
    setRoleModal(null);
  }

  async function handleDeleteCourse() {
    setBtnLoading(true);
    try {
      const res = await fetch(
        `${BackEnd_URI}/api/admin/courses/${deleteModal.item._id}`,
        {
          method: "DELETE",
          headers: authHeader(),
        },
      );
      const data = await res.json();
      if (data.success)
        setCourses((prev) =>
          prev.filter((c) => c._id !== deleteModal.item._id),
        );
      showToast(
        data.success ? "Course deleted" : data.message,
        data.success ? "success" : "error",
      );
    } catch {
      setCourses((prev) => prev.filter((c) => c._id !== deleteModal.item._id));
      showToast("Course deleted (demo)");
    }
    setBtnLoading(false);
    setDeleteModal(null);
  }

  async function handleUpdateCourse() {
    setBtnLoading(true);
    try {
      const res = await fetch(
        `${BackEnd_URI}/api/admin/courses/${editModal._id}`,
        {
          method: "PUT",
          headers: authHeader(),
          body: JSON.stringify(editForm),
        },
      );
      const data = await res.json();
      if (data.success)
        setCourses((prev) =>
          prev.map((c) =>
            c._id === editModal._id ? { ...c, ...editForm } : c,
          ),
        );
      showToast(
        data.success ? "Course updated" : data.message,
        data.success ? "success" : "error",
      );
    } catch {
      setCourses((prev) =>
        prev.map((c) => (c._id === editModal._id ? { ...c, ...editForm } : c)),
      );
      showToast("Course updated (demo)");
    }
    setBtnLoading(false);
    setEditModal(null);
  }

  function openRoleModal(user) {
    setRoleModal(user);
    setSelectedRole(user.role);
  }

  function openEditModal(course) {
    setEditModal(course);
    setEditForm({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price,
    });
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()),
  );

  const filteredCourses = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.category?.toLowerCase().includes(courseSearch.toLowerCase()),
  );

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FaSpinner className="animate-spin text-green-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, courses, and view platform analytics.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Users",
              value: analytics?.users?.total ?? "—",
              bg: "bg-blue-50",
            },
            {
              label: "Total Courses",
              value: analytics?.courses?.total ?? "—",
              bg: "bg-green-50",
            },
            {
              label: "Total Revenue",
              value: analytics?.courses?.totalRevenue
                ? `Rs.${analytics.courses.totalRevenue.toLocaleString()}`
                : "—",
              bg: "bg-yellow-50",
            },
            {
              label: "Instructors",
              value: analytics?.users?.instructors ?? "—",
              bg: "bg-purple-50",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: "analytics", label: "Analytics" },
              { id: "users", label: `Users (${users.length})` },
              { id: "courses", label: `Courses (${courses.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-6 py-3.5 text-sm font-semibold border-b-2 transition-colors
                  ${activeTab === tab.id ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "analytics" && (
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Students", value: analytics?.users?.students ?? 0 },
                  {
                    label: "Instructors",
                    value: analytics?.users?.instructors ?? 0,
                  },
                  { label: "Admins", value: analytics?.users?.admins ?? 0 },
                  {
                    label: "Free Courses",
                    value: analytics?.courses?.free ?? 0,
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"
                  >
                    <p className="text-3xl font-bold text-gray-900">
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    Rs.{analytics?.courses?.totalRevenue?.toLocaleString() ?? 0}
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                    Paid Courses
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {analytics?.courses?.paid ?? 0}
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                    Free Courses
                  </p>
                  <p className="text-3xl font-bold text-purple-700">
                    {analytics?.courses?.free ?? 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="relative w-full sm:w-60">
                  <FaSearch
                    size={11}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Name", "Email", "Role", "Joined", "Actions"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-sm shrink-0">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-800">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleBadge[user.role] || "bg-gray-100 text-gray-600"}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-gray-400">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openRoleModal(user)}
                              className="flex items-center gap-1.5 text-xs bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg"
                            >
                              <FaUserCog size={11} /> Role
                            </button>
                            <button
                              onClick={() =>
                                setDeleteModal({ type: "user", item: user })
                              }
                              className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg"
                            >
                              <FaTrash size={11} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-10">
                  No users found.
                </p>
              )}
              <div className="px-5 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Showing {filteredUsers.length} of {users.length} users
                </p>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="relative w-full sm:w-60">
                  <FaSearch
                    size={11}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {[
                        "Title",
                        "Instructor",
                        "Category",
                        "Price",
                        "Created",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr
                        key={course._id}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        <td className="px-5 py-3.5">
                          <span className="font-medium text-gray-800 line-clamp-1 block max-w-45">
                            {course.title}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500">
                          {typeof course.instructor === "object"
                            ? course.instructor?.name
                            : course.instructor || "—"}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catBadge[course.category] || "bg-gray-100 text-gray-600"}`}
                          >
                            {course.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-semibold">
                          <span
                            className={
                              Number(course.price) === 0
                                ? "text-green-600"
                                : "text-gray-900"
                            }
                          >
                            {Number(course.price) === 0
                              ? "Free"
                              : `$${course.price}`}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-gray-400">
                          {formatDate(course.createdAt)}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/course/${course._id}`)}
                              className="flex items-center gap-1.5 text-xs bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg"
                            >
                              <IoMdShareAlt size={11} /> View
                            </button>
                            <button
                              onClick={() => openEditModal(course)}
                              className="flex items-center gap-1.5 text-xs bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg"
                            >
                              <FaEdit size={11} /> Edit
                            </button>
                            <button
                              onClick={() =>
                                setDeleteModal({ type: "course", item: course })
                              }
                              className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg"
                            >
                              <FaTrash size={11} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCourses.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-10">
                  No courses found.
                </p>
              )}
              <div className="px-5 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-red-500" size={20} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              Delete {deleteModal.type === "user" ? "User" : "Course"}?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete{" "}
              <strong>
                "{deleteModal.item?.name || deleteModal.item?.title}"
              </strong>
              ? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={
                  deleteModal.type === "user"
                    ? handleDeleteUser
                    : handleDeleteCourse
                }
                disabled={btnLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {btnLoading && <FaSpinner className="animate-spin" size={12} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {roleModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">Change Role</h3>
              <button
                onClick={() => setRoleModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 mb-5">
              <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                {roleModal.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {roleModal.name}
                </p>
                <p className="text-xs text-gray-400">{roleModal.email}</p>
              </div>
            </div>

            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Select Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setRoleModal(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                disabled={btnLoading || selectedRole === roleModal.role}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {btnLoading && <FaSpinner className="animate-spin" size={12} />}
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 overflow-y-auto py-6">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Edit Course</h3>
              <button
                onClick={() => setEditModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCourse}
                disabled={btnLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {btnLoading && <FaSpinner className="animate-spin" size={12} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
