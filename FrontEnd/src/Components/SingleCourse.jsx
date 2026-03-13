import { IoIosShareAlt } from "react-icons/io";
import { useContext, useState, useEffect } from "react";
import { FaPlayCircle, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { UserContext } from "../Store/UserStore";
import { Link } from "react-router-dom";
import BackEnd_URI from "../Utils/BackEnd_URI";

const SingleCourse = ({ course, activeCategory = "All" }) => {
  const { UserData } = useContext(UserContext);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingEnroll, setCheckingEnroll] = useState(false);

  const show = activeCategory === "All" || activeCategory === course.category;

  useEffect(() => {
    if (!UserData?.name) return;

    const checkEnrollment = async () => {
      setCheckingEnroll(true);
      try {
        const res = await fetch(`${BackEnd_URI}/api/student/my-courses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LMSUser")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          const alreadyEnrolled = data.data.some(
            (e) => e.course?._id === course._id,
          );
          setIsEnrolled(alreadyEnrolled);
        }
      } catch (error) {
        console.log(error);
        alert("Network error. Please try again.");
      } finally {
        setCheckingEnroll(false);
      }
    };

    checkEnrollment();
  }, [UserData, course._id]);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BackEnd_URI}/api/student/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("LMSUser")}`,
        },
        body: JSON.stringify({ courseId: course._id }),
      });
      const data = await res.json();

      if (data.success) {
        setIsEnrolled(true);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
      <div className="relative overflow-hidden">
        {course?.lessons?.length > 0 ? (
          <img
            src={`https://img.youtube.com/vi/${course.lessons[0].videoUrl.split("v=")[1]}/hqdefault.jpg`}
            alt={course.title}
            className="w-full h-44 object-cover"
          />
        ) : (
          <div className="w-full h-44 bg-gray-200 flex items-center justify-center">
            <FaPlayCircle className="text-gray-400 text-4xl" />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
            {course.instructor?.name?.charAt(0)}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {course.instructor?.name}
          </span>
          <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
            {course.category}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 mb-2">
          <span className="text-sm font-bold text-gray-900">
            ${course.price}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(course.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Link to={`/course/${course._id}`}>
          <button className="py-2 px-7 flex w-full bg-[#d8cccc] text-black font-semibold rounded-3xl justify-center items-center gap-4 mb-5 mt-3">
            Check Course Details <IoIosShareAlt size={17} />
          </button>
        </Link>

        {!UserData?.name && (
          <Link to="/login">
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-3xl text-sm transition-colors shadow-lg shadow-green-200">
              Login First To Enroll
            </button>
          </Link>
        )}

        {UserData?.name && UserData?.role !== "student" && (
          <button
            disabled
            className="w-full mt-4 bg-gray-100 text-gray-400 font-bold px-8 py-3 rounded-xl text-sm cursor-not-allowed"
          >
            Only Students Can Enroll
          </button>
        )}

        {UserData?.role === "student" && checkingEnroll && (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-400 font-bold px-8 py-3 mt-1 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <FaSpinner className="animate-spin" size={13} />
            Checking...
          </button>
        )}

        {UserData?.role === "student" && !checkingEnroll && isEnrolled && (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-500 font-bold px-8 py-3 mt-1 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <FaCheckCircle className="text-green-500" size={14} />
            Enrolled
          </button>
        )}

        {UserData?.role === "student" && !checkingEnroll && !isEnrolled && (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 mt-1 rounded-xl text-sm transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" size={13} /> Enrolling...
              </>
            ) : (
              "Enroll Now"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleCourse;
