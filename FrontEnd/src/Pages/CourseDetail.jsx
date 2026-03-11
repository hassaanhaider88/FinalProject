import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaDollarSign,
  FaCalendarAlt,
  FaUser,
  FaLayerGroup,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
  FaIdBadge,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

const BASE_URL = "http://localhost:3000/api/course";

const CATEGORY_COLORS = {
  Design: "bg-purple-100 text-purple-700 border-purple-200",
  Development: "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Data Science": "bg-blue-100 text-blue-700 border-blue-200",
  Business: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Marketing: "bg-orange-100 text-orange-700 border-orange-200",
  Finance: "bg-teal-100 text-teal-700 border-teal-200",
  Science: "bg-green-100 text-green-700 border-green-200",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SingleCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/${id}`);
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
        } else {
          setError(data.message || "Course not found.");
        }
      } catch (err) {
        setError("Unable to connect to the server. Please try again.",err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  /* ── Loading ──────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner
            className="animate-spin text-green-500 mx-auto mb-3"
            size={32}
          />
          <p className="text-sm text-gray-500 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  /* ── Error ────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center max-w-sm w-full">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-red-400" size={22} />
          </div>
          <h2 className="font-extrabold text-gray-900 text-lg mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const catStyle =
    CATEGORY_COLORS[course.category] ||
    "bg-gray-100 text-gray-600 border-gray-200";
  const isFree = Number(course.price) === 0;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
 
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-green-900 text-white px-4 pt-8 pb-14">
        <div className="max-w-3xl mx-auto">
       
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium mb-6 transition-colors group"
          >
            <FaArrowLeft
              size={13}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to courses
          </button>


          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${catStyle}`}
          >
            <FaLayerGroup size={10} />
            {course.category}
          </span>


          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3">
            {course.title}
          </h1>

      
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-4">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt size={12} className="text-green-400" />
              Created {formatDate(course.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock size={12} className="text-green-400" />
              Updated {formatDate(course.updatedAt)}
            </span>
          </div>
        </div>
      </div>

  
      <div className="max-w-3xl mx-auto px-4 -mt-6 pb-16 space-y-5">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
              Course Price
            </p>
            <span
              className={`text-3xl font-extrabold ${isFree ? "text-green-600" : "text-gray-900"}`}
            >
              {isFree ? "Free" : `$${course.price}`}
            </span>
            {!isFree && (
              <span className="text-xs text-gray-400 ml-2">
                one-time payment
              </span>
            )}
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-green-200 w-full sm:w-auto">
            Enroll Now
          </button>
        </div>

      
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full" />
            Description
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line wrap-break-word">
            {course.description}
          </p>
        </div>


        {course.instructor && typeof course.instructor === "object" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-extrabold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full" />
              Instructor
            </h2>
            <div className="flex items-center gap-4">
  
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center shrink-0 ring-4 ring-green-50">
                <span className="text-green-700 font-extrabold text-lg">
                  {course.instructor.name?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-gray-900 text-base">
                  {course.instructor.name}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {course.instructor.email}
                </p>
                <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full capitalize">
                  <FaShieldAlt size={9} /> {course.instructor.role}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
                <FaEnvelope
                  size={13}
                  className="text-green-500 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-semibold">
                    Email
                  </p>
                  <p className="text-xs font-semibold text-gray-700 truncate">
                    {course.instructor.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
                <FaCalendarAlt
                  size={12}
                  className="text-green-500 shrink-0"
                />
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    Joined
                  </p>
                  <p className="text-xs font-semibold text-gray-700">
                    {formatDate(course.instructor.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-extrabold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full" />
            Course Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <FaLayerGroup size={15} className="text-green-600" />,
                label: "Category",
                value: course.category,
                badge: true,
              },
              {
                icon: <FaDollarSign size={15} className="text-green-600" />,
                label: "Price",
                value: isFree ? "Free" : `$${course.price}`,
              },
              {
                icon: <FaCalendarAlt size={13} className="text-green-600" />,
                label: "Created At",
                value: formatDate(course.createdAt),
              },
              {
                icon: <FaClock size={13} className="text-green-600" />,
                label: "Last Updated",
                value: formatDate(course.updatedAt),
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 bg-gray-50 rounded-xl p-4 ${item.full ? "sm:col-span-2" : ""}`}
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-semibold mb-0.5">
                    {item.label}
                  </p>
                  {item.badge ? (
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${catStyle}`}
                    >
                      {item.value}
                    </span>
                  ) : (
                    <p
                      className={`text-sm font-semibold text-gray-800 ${item.mono ? "font-mono text-xs break-all" : ""}`}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
