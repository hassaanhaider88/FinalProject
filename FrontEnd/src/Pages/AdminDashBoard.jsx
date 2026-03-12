/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUsers,
  FaBookOpen,
  FaChartBar,
  FaDollarSign,
  FaTrash,
  FaEdit,
  FaEye,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserCog,
  FaHome,
  FaAngleRight,
  FaArrowUp,
  FaArrowDown,
  FaSortAmountDown,
  FaSync,
} from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";

/* ── Config ──────────────────────────────────────────────── */
const BASE = "http://localhost:3000/api/admin";
const NAV_LINKS = ["Home", "All Course", "Pages", "Blog", "Contact"];
const ROLES = ["student", "instructor", "admin"];
const CATEGORIES = [
  "Data Science",
  "Design",
  "Development",
  "Business",
  "Marketing",
  "Finance",
  "Science",
];

const CAT_COLORS = {
  Design: "bg-purple-100 text-purple-700",
  Development: "bg-indigo-100 text-indigo-700",
  "Data Science": "bg-blue-100 text-blue-700",
  Business: "bg-yellow-100 text-yellow-700",
  Marketing: "bg-orange-100 text-orange-700",
  Finance: "bg-teal-100 text-teal-700",
  Science: "bg-green-100 text-green-700",
};
const ROLE_COLORS = {
  admin: "bg-red-100 text-red-700",
  instructor: "bg-green-100 text-green-700",
  student: "bg-blue-100 text-blue-700",
};

function fmt(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);
  if (!toast) return null;
  const s = {
    success: "bg-green-600",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };
  const icons = {
    success: <FaCheckCircle />,
    error: <FaTimesCircle />,
    warning: <FaExclamationTriangle />,
  };
  return (
    <div
      className={`fixed top-5 right-5 z-[200] flex items-center gap-3 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl ${s[toast.type]}`}
    >
      {icons[toast.type]} {toast.msg}
      <button onClick={onClose}>
        <FaTimes size={12} className="opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
}

/* ── Confirm Modal ───────────────────────────────────────── */
function Confirm({ open, title, desc, onOk, onCancel, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaExclamationTriangle className="text-red-500" size={20} />
        </div>
        <h3 className="font-extrabold text-gray-900 text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{desc}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <FaSpinner className="animate-spin" size={12} />} Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Role Modal ──────────────────────────────────────────── */
function RoleModal({ open, user, onClose, onSave, loading }) {
  const [role, setRole] = useState("");
  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-extrabold text-gray-900">Change Role</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <FaTimes size={12} />
          </button>
        </div>
        <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-xl">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center font-extrabold text-green-700">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
        <label className="block text-xs font-bold text-gray-700 mb-2">
          Select Role
        </label>
        <div className="space-y-2 mb-5">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold capitalize transition-all ${role === r ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:border-green-300"}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${role === r ? "bg-green-500" : "bg-gray-300"}`}
              />
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(role)}
            disabled={loading || role === user.role}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <FaSpinner className="animate-spin" size={12} />} Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Course Edit Modal ───────────────────────────────────── */
function CourseEditModal({ open, course, onClose, onSave, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });
  useEffect(() => {
    if (course)
      setForm({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        price: course.price || "",
      });
  }, [course]);
  if (!open || !course) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 overflow-y-auto py-6">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900">Edit Course</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <FaTimes size={13} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <FaSpinner className="animate-spin" size={12} />} Update
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Stat Card ───────────────────────────────────────────── */
function StatCard({ icon, value, label, sub, bg }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
          {sub}
        </span>
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}

/* ── Mini Bar Chart ──────────────────────────────────────── */
function BarChart({ data, color = "bg-green-500", label }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
        {label}
      </p>
      <div className="flex items-end gap-2 h-28">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-400 font-semibold">
              {d.count}
            </span>
            <div
              className="w-full rounded-t-md"
              style={{ height: `${(d.count / max) * 80}px`, minHeight: "4px" }}
            >
              <div
                className={`w-full h-full ${color} rounded-t-md opacity-80`}
              />
            </div>
            <span className="text-[9px] text-gray-400 text-center leading-tight">
              {d.month?.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN DASHBOARD
════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = "success") => setToast({ msg, type });

  /* ── State ─────────────────────────────────── */
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState({
    analytics: false,
    users: false,
    courses: false,
  });
  const [actionLoading, setActionLoading] = useState(false);

  // filters
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("All");
  const [courseSearch, setCourseSearch] = useState("");
  const [courseCatFilter, setCourseCatFilter] = useState("All");

  // modals
  const [confirmDel, setConfirmDel] = useState(null); // { type: "user"|"course", item }
  const [roleModal, setRoleModal] = useState(null);
  const [courseEditModal, setCourseEditModal] = useState(null);

  const token = localStorage.getItem("LMSUser");
  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  /* ── Fetch helpers ─────────────────────────── */
  const fetchAnalytics = async () => {
    setLoading((p) => ({ ...p, analytics: true }));
    try {
      const res = await fetch(`${BASE}/analytics`, { headers: authHeaders() });
      const data = await res.json();
      if (data.success) setAnalytics(data.data);
      else showToast(data.message, "error");
    } catch {
      // Demo fallback
      setAnalytics({
        users: { total: 245, students: 210, instructors: 30, admins: 5 },
        courses: {
          total: 18,
          free: 4,
          paid: 14,
          totalRevenue: 42580,
          avgPrice: "2365.56",
        },
        categoryBreakdown: [
          { name: "Development", count: 5 },
          { name: "Design", count: 4 },
          { name: "Data Science", count: 3 },
          { name: "Business", count: 3 },
          { name: "Marketing", count: 2 },
          { name: "Finance", count: 1 },
        ],
        monthlyCourses: [
          { month: "Oct 2025", count: 1 },
          { month: "Nov 2025", count: 2 },
          { month: "Dec 2025", count: 3 },
          { month: "Jan 2026", count: 4 },
          { month: "Feb 2026", count: 5 },
          { month: "Mar 2026", count: 3 },
        ],
        monthlyUsers: [
          { month: "Oct 2025", count: 20 },
          { month: "Nov 2025", count: 35 },
          { month: "Dec 2025", count: 28 },
          { month: "Jan 2026", count: 55 },
          { month: "Feb 2026", count: 62 },
          { month: "Mar 2026", count: 45 },
        ],
        topInstructors: [
          {
            name: "Jason Williams",
            email: "jason@edule.com",
            courses: 5,
            revenue: 15420,
          },
          {
            name: "Pamela Foster",
            email: "pamela@edule.com",
            courses: 4,
            revenue: 12000,
          },
          {
            name: "Rose Simmons",
            email: "rose@edule.com",
            courses: 3,
            revenue: 9800,
          },
        ],
      });
      showToast("Using demo analytics — API not connected", "warning");
    } finally {
      setLoading((p) => ({ ...p, analytics: false }));
    }
  };

  const fetchUsers = async () => {
    setLoading((p) => ({ ...p, users: true }));
    try {
      const res = await fetch(`${BASE}/users`, { headers: authHeaders() });
      const data = await res.json();
      if (data.success) setUsers(data.data);
      else showToast(data.message, "error");
    } catch {
      setUsers([
        {
          _id: "1",
          name: "Jason Williams",
          email: "jason@edule.com",
          role: "instructor",
          createdAt: "2026-01-10T10:00:00Z",
        },
        {
          _id: "2",
          name: "Sarah Johnson",
          email: "sarah@gmail.com",
          role: "student",
          createdAt: "2026-01-15T10:00:00Z",
        },
        {
          _id: "3",
          name: "Pamela Foster",
          email: "pamela@edule.com",
          role: "instructor",
          createdAt: "2026-02-01T10:00:00Z",
        },
        {
          _id: "4",
          name: "Admin User",
          email: "admin@edule.com",
          role: "admin",
          createdAt: "2026-01-01T10:00:00Z",
        },
        {
          _id: "5",
          name: "Michael Chen",
          email: "michael@gmail.com",
          role: "student",
          createdAt: "2026-02-20T10:00:00Z",
        },
        {
          _id: "6",
          name: "Rose Simmons",
          email: "rose@edule.com",
          role: "instructor",
          createdAt: "2026-02-10T10:00:00Z",
        },
      ]);
      showToast("Using demo users — API not connected", "warning");
    } finally {
      setLoading((p) => ({ ...p, users: false }));
    }
  };

  const fetchCourses = async () => {
    setLoading((p) => ({ ...p, courses: true }));
    try {
      const res = await fetch(`${BASE}/courses`, { headers: authHeaders() });
      const data = await res.json();
      if (data.success) setCourses(data.data);
      else showToast(data.message, "error");
    } catch {
      setCourses([
        {
          _id: "1",
          title: "Data Science with Python",
          description: "Master Python for Data Science.",
          category: "Data Science",
          price: 385,
          instructor: { name: "Jason Williams" },
          createdAt: "2026-01-20T10:00:00Z",
        },
        {
          _id: "2",
          title: "UX Design Color Theory",
          description: "Color theory for digital products.",
          category: "Design",
          price: 420,
          instructor: { name: "Pamela Foster" },
          createdAt: "2026-02-01T10:00:00Z",
        },
        {
          _id: "3",
          title: "Finance: Budget & Net Worth",
          description: "Personal finance fundamentals.",
          category: "Finance",
          price: 0,
          instructor: { name: "Rose Simmons" },
          createdAt: "2026-02-15T10:00:00Z",
        },
        {
          _id: "4",
          title: "React Development Masterclass",
          description: "Full-stack React development.",
          category: "Development",
          price: 299,
          instructor: { name: "Jason Williams" },
          createdAt: "2026-03-01T10:00:00Z",
        },
      ]);
      showToast("Using demo courses — API not connected", "warning");
    } finally {
      setLoading((p) => ({ ...p, courses: false }));
    }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
    fetchCourses();
  }, []);

  /* ── Delete User ───────────────────────────── */
  const handleDeleteUser = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`${BASE}/users/${confirmDel.item._id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((p) => p.filter((u) => u._id !== confirmDel.item._id));
        showToast("User deleted");
      } else showToast(data.message, "error");
    } catch {
      setUsers((p) => p.filter((u) => u._id !== confirmDel.item._id));
      showToast("User deleted (demo)");
    } finally {
      setActionLoading(false);
      setConfirmDel(null);
    }
  };

  /* ── Update Role ───────────────────────────── */
  const handleUpdateRole = async (role) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${BASE}/users/${roleModal._id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((p) =>
          p.map((u) => (u._id === roleModal._id ? { ...u, role } : u)),
        );
        showToast("Role updated");
      } else showToast(data.message, "error");
    } catch {
      setUsers((p) =>
        p.map((u) => (u._id === roleModal._id ? { ...u, role } : u)),
      );
      showToast("Role updated (demo)");
    } finally {
      setActionLoading(false);
      setRoleModal(null);
    }
  };

  /* ── Delete Course ─────────────────────────── */
  const handleDeleteCourse = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`${BASE}/courses/${confirmDel.item._id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setCourses((p) => p.filter((c) => c._id !== confirmDel.item._id));
        showToast("Course deleted");
      } else showToast(data.message, "error");
    } catch {
      setCourses((p) => p.filter((c) => c._id !== confirmDel.item._id));
      showToast("Course deleted (demo)");
    } finally {
      setActionLoading(false);
      setConfirmDel(null);
    }
  };

  /* ── Update Course ─────────────────────────── */
  const handleUpdateCourse = async (form) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${BASE}/courses/${courseEditModal._id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setCourses((p) =>
          p.map((c) => (c._id === courseEditModal._id ? { ...c, ...form } : c)),
        );
        showToast("Course updated");
      } else showToast(data.message, "error");
    } catch {
      setCourses((p) =>
        p.map((c) => (c._id === courseEditModal._id ? { ...c, ...form } : c)),
      );
      showToast("Course updated (demo)");
    } finally {
      setActionLoading(false);
      setCourseEditModal(null);
    }
  };

  /* ── Filtered lists ────────────────────────── */
  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      (u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)) &&
      (userRoleFilter === "All" || u.role === userRoleFilter)
    );
  });

  const filteredCourses = courses.filter((c) => {
    const q = courseSearch.toLowerCase();
    return (
      (c.title?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q)) &&
      (courseCatFilter === "All" || c.category === courseCatFilter)
    );
  });

  const tabs = [
    { id: "analytics", label: "Analytics", icon: <FaChartBar size={13} /> },
    { id: "users", label: "Manage Users", icon: <FaUsers size={13} /> },
    {
      id: "courses",
      label: "Manage Courses",
      icon: <MdOutlineOndemandVideo size={15} />,
    },
  ];

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Hero */}
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-green-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <FaHome size={11} />
            <span className="hover:text-green-400 cursor-pointer">Home</span>
            <FaAngleRight size={10} />
            <span className="text-green-400">Admin Dashboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
            Admin Dashboard
          </h1>
          <p className="text-gray-300 text-sm">
            Full control over users, courses, and platform analytics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* ── Overview Stat Cards ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<FaUsers size={20} className="text-blue-600" />}
            value={analytics?.users?.total ?? "—"}
            label="Total Users"
            sub={`+${analytics?.users?.students ?? 0} students`}
            bg="bg-blue-50"
          />
          <StatCard
            icon={
              <MdOutlineOndemandVideo size={22} className="text-green-600" />
            }
            value={analytics?.courses?.total ?? "—"}
            label="Total Courses"
            sub={`${analytics?.courses?.free ?? 0} free`}
            bg="bg-green-50"
          />
          <StatCard
            icon={<FaDollarSign size={20} className="text-yellow-600" />}
            value={
              analytics?.courses?.totalRevenue
                ? `$${analytics.courses.totalRevenue.toLocaleString()}`
                : "—"
            }
            label="Total Revenue"
            sub="all time"
            bg="bg-yellow-50"
          />
          <StatCard
            icon={<FaChalkboardTeacher size={20} className="text-purple-600" />}
            value={analytics?.users?.instructors ?? "—"}
            label="Instructors"
            sub={`${analytics?.users?.admins ?? 0} admins`}
            bg="bg-purple-50"
          />
        </div>

        {/* ── Tabs ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`shrink-0 flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all ${activeTab === t.id ? "border-green-600 text-green-600 bg-green-50" : "border-transparent text-gray-500 hover:text-gray-800"}`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ════════════════ ANALYTICS TAB ════════════════ */}
          {activeTab === "analytics" && (
            <div className="p-6">
              {loading.analytics ? (
                <div className="flex justify-center py-16">
                  <FaSpinner
                    className="animate-spin text-green-500"
                    size={28}
                  />
                </div>
              ) : analytics ? (
                <div className="space-y-7">
                  {/* ── User Breakdown ─────────────────── */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        icon: <FaUsers size={16} className="text-blue-600" />,
                        label: "Students",
                        value: analytics.users.students,
                        bg: "bg-blue-50",
                      },
                      {
                        icon: (
                          <FaChalkboardTeacher
                            size={16}
                            className="text-green-600"
                          />
                        ),
                        label: "Instructors",
                        value: analytics.users.instructors,
                        bg: "bg-green-50",
                      },
                      {
                        icon: (
                          <FaShieldAlt size={16} className="text-red-600" />
                        ),
                        label: "Admins",
                        value: analytics.users.admins,
                        bg: "bg-red-50",
                      },
                      {
                        icon: (
                          <FaBookOpen size={16} className="text-purple-600" />
                        ),
                        label: "Paid Courses",
                        value: analytics.courses.paid,
                        bg: "bg-purple-50",
                      },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className={`${s.bg} rounded-2xl p-4 flex items-center gap-3 border border-gray-100`}
                      >
                        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          {s.icon}
                        </div>
                        <div>
                          <p className="text-xl font-extrabold text-gray-900">
                            {s.value}
                          </p>
                          <p className="text-xs text-gray-500">{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ── Charts ─────────────────────────── */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                      <BarChart
                        data={analytics.monthlyCourses}
                        color="bg-green-500"
                        label="Courses Created (Last 6 Months)"
                      />
                    </div>
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                      <BarChart
                        data={analytics.monthlyUsers}
                        color="bg-blue-500"
                        label="User Signups (Last 6 Months)"
                      />
                    </div>
                  </div>

                  {/* ── Category Breakdown + Top Instructors ─────── */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Category Breakdown */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                      <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                        <span className="w-1 h-4 bg-green-500 rounded-full" />
                        Courses by Category
                      </h3>
                      <div className="space-y-3">
                        {analytics.categoryBreakdown.map((c, i) => {
                          const max =
                            analytics.categoryBreakdown[0]?.count || 1;
                          return (
                            <div key={i} className="flex items-center gap-3">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-24 text-center shrink-0 ${CAT_COLORS[c.name] || "bg-gray-100 text-gray-600"}`}
                              >
                                {c.name}
                              </span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${(c.count / max) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-gray-600 w-4">
                                {c.count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Top Instructors */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                      <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                        <span className="w-1 h-4 bg-green-500 rounded-full" />
                        Top Instructors
                      </h3>
                      <div className="space-y-3">
                        {analytics.topInstructors.map((ins, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-extrabold text-green-700 text-sm shrink-0">
                              {ins.name?.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {ins.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {ins.courses} courses
                              </p>
                            </div>
                            <span className="text-xs font-extrabold text-green-600">
                              ${ins.revenue.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Revenue Summary ─────────────────── */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: "Total Revenue",
                        value: `$${analytics.courses.totalRevenue.toLocaleString()}`,
                        color: "text-green-600",
                        bg: "bg-green-50",
                      },
                      {
                        label: "Avg. Course Price",
                        value: `$${analytics.courses.avgPrice}`,
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                      },
                      {
                        label: "Free Courses",
                        value: analytics.courses.free,
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                      },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className={`${s.bg} rounded-2xl border border-gray-100 p-5`}
                      >
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                          {s.label}
                        </p>
                        <p className={`text-3xl font-extrabold ${s.color}`}>
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-400 py-10">
                  No analytics data
                </p>
              )}
            </div>
          )}

          {/* ════════════════ USERS TAB ════════════════ */}
          {activeTab === "users" && (
            <div>
              {/* Filters */}
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded-full" />
                  Manage Users
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full ml-1">
                    {users.length}
                  </span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <FaSearch
                      size={11}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search users..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 w-48"
                    />
                  </div>
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
                  >
                    <option value="All">All Roles</option>
                    {ROLES.map((r) => (
                      <option key={r} className="capitalize">
                        {r}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={fetchUsers}
                    className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:border-green-400 hover:text-green-600 transition-all"
                  >
                    <FaSync size={12} />
                  </button>
                </div>
              </div>

              {loading.users ? (
                <div className="flex justify-center py-16">
                  <FaSpinner
                    className="animate-spin text-green-500"
                    size={28}
                  />
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          {[
                            "#",
                            "Name",
                            "Email",
                            "Role",
                            "Joined",
                            "Actions",
                          ].map((h, i) => (
                            <th
                              key={h}
                              className={`px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 5 ? "text-right" : "text-left"}`}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((u, i) => (
                          <tr
                            key={u._id}
                            className="hover:bg-green-50/40 transition-colors"
                          >
                            <td className="px-6 py-4 text-xs text-gray-400">
                              {i + 1}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-extrabold text-green-700 text-sm shrink-0">
                                  {u.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-gray-800">
                                  {u.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {u.email}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${ROLE_COLORS[u.role] || "bg-gray-100 text-gray-600"}`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-gray-400">
                              {fmt(u.createdAt)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setRoleModal(u)}
                                  className="w-8 h-8 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg flex items-center justify-center transition-colors"
                                  title="Change Role"
                                >
                                  <FaUserCog size={13} />
                                </button>
                                <button
                                  onClick={() =>
                                    setConfirmDel({ type: "user", item: u })
                                  }
                                  className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors"
                                  title="Delete"
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
                    {filteredUsers.map((u) => (
                      <div key={u._id} className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-extrabold text-green-700 shrink-0">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {u.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {u.email}
                          </p>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize mt-1 inline-block ${ROLE_COLORS[u.role] || "bg-gray-100 text-gray-600"}`}
                          >
                            {u.role}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setRoleModal(u)}
                            className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"
                          >
                            <FaUserCog size={13} />
                          </button>
                          <button
                            onClick={() =>
                              setConfirmDel({ type: "user", item: u })
                            }
                            className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-3.5 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Showing{" "}
                      <span className="font-semibold text-gray-700">
                        {filteredUsers.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-700">
                        {users.length}
                      </span>{" "}
                      users
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ════════════════ COURSES TAB ════════════════ */}
          {activeTab === "courses" && (
            <div>
              {/* Filters */}
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded-full" />
                  Manage Courses
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full ml-1">
                    {courses.length}
                  </span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <FaSearch
                      size={11}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      placeholder="Search courses..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 w-48"
                    />
                  </div>
                  <select
                    value={courseCatFilter}
                    onChange={(e) => setCourseCatFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
                  >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <button
                    onClick={fetchCourses}
                    className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:border-green-400 hover:text-green-600 transition-all"
                  >
                    <FaSync size={12} />
                  </button>
                </div>
              </div>

              {loading.courses ? (
                <div className="flex justify-center py-16">
                  <FaSpinner
                    className="animate-spin text-green-500"
                    size={28}
                  />
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          {[
                            "#",
                            "Title",
                            "Instructor",
                            "Category",
                            "Price",
                            "Created",
                            "Actions",
                          ].map((h, i) => (
                            <th
                              key={h}
                              className={`px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 6 ? "text-right" : "text-left"}`}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredCourses.map((c, i) => (
                          <tr
                            key={c._id}
                            className="hover:bg-green-50/40 transition-colors"
                          >
                            <td className="px-5 py-4 text-xs text-gray-400">
                              {i + 1}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                  <MdOutlineOndemandVideo
                                    size={15}
                                    className="text-green-600"
                                  />
                                </div>
                                <span className="font-semibold text-gray-800 line-clamp-1 max-w-45">
                                  {c.title}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-gray-500">
                              {typeof c.instructor === "object"
                                ? c.instructor?.name
                                : c.instructor || "—"}
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CAT_COLORS[c.category] || "bg-gray-100 text-gray-600"}`}
                              >
                                {c.category}
                              </span>
                            </td>
                            <td className="px-5 py-4 font-extrabold text-sm">
                              <span
                                className={
                                  Number(c.price) === 0
                                    ? "text-green-600"
                                    : "text-gray-900"
                                }
                              >
                                {Number(c.price) === 0 ? "Free" : `$${c.price}`}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-xs text-gray-400">
                              {fmt(c.createdAt)}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setCourseEditModal(c)}
                                  className="w-8 h-8 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg flex items-center justify-center transition-colors"
                                  title="Edit"
                                >
                                  <FaEdit size={13} />
                                </button>
                                <button
                                  onClick={() =>
                                    setConfirmDel({ type: "course", item: c })
                                  }
                                  className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors"
                                  title="Delete"
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
                    {filteredCourses.map((c) => (
                      <div key={c._id} className="p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                            <MdOutlineOndemandVideo
                              size={16}
                              className="text-green-600"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                              {c.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {typeof c.instructor === "object"
                                ? c.instructor?.name
                                : c.instructor}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[c.category] || "bg-gray-100 text-gray-600"}`}
                            >
                              {c.category}
                            </span>
                            <span
                              className={`text-sm font-extrabold ${Number(c.price) === 0 ? "text-green-600" : "text-gray-900"}`}
                            >
                              {Number(c.price) === 0 ? "Free" : `$${c.price}`}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setCourseEditModal(c)}
                              className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"
                            >
                              <FaEdit size={13} />
                            </button>
                            <button
                              onClick={() =>
                                setConfirmDel({ type: "course", item: c })
                              }
                              className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-3.5 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Showing{" "}
                      <span className="font-semibold text-gray-700">
                        {filteredCourses.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-700">
                        {courses.length}
                      </span>{" "}
                      courses
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────── */}
      <Confirm
        open={!!confirmDel}
        title={`Delete ${confirmDel?.type === "user" ? "User" : "Course"}`}
        desc={`Are you sure you want to delete "${confirmDel?.item?.name || confirmDel?.item?.title}"? This cannot be undone.`}
        onOk={
          confirmDel?.type === "user" ? handleDeleteUser : handleDeleteCourse
        }
        onCancel={() => setConfirmDel(null)}
        loading={actionLoading}
      />
      <RoleModal
        open={!!roleModal}
        user={roleModal}
        onClose={() => setRoleModal(null)}
        onSave={handleUpdateRole}
        loading={actionLoading}
      />
      <CourseEditModal
        open={!!courseEditModal}
        course={courseEditModal}
        onClose={() => setCourseEditModal(null)}
        onSave={handleUpdateCourse}
        loading={actionLoading}
      />
    </div>
  );
}
