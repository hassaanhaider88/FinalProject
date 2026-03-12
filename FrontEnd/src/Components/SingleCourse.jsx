import React, { useContext, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { UserContext } from "../Store/UserStore";
import { Link } from "react-router-dom";

const SingleCourse = ({ course, activeCategory = "All" }) => {
  const { UserData } = useContext(UserContext);
  const [IsEnrolled, setIsEnrolled] = useState(false);
  const show = activeCategory === "All" || activeCategory === course.category;
  console.log(course);

  if (!show) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
      <div className="relative overflow-hidden">
        {course?.lessons?.length > 0 ? (
          <img
            src={`https://img.youtube.com/vi/${
              course.lessons[0].videoUrl.split("v=")[1]
            }/hqdefault.jpg`}
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
        {/* Instructor */}
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

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {course.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-sm font-bold text-gray-900">
            ${course.price}
          </span>

          <span className="text-xs text-gray-400">
            {new Date(course.createdAt).toLocaleDateString()}
          </span>
        </div>
        {UserData.name ? (
          <button
            disabled={IsEnrolled}
            onClick={() => setIsEnrolled(true)}
            className={` ${
              IsEnrolled
                ? "cursor-not-allowed text-black bg-[#E5E7EB] "
                : "bg-green-600 text-white hover:bg-green-700"
            }  font-bold px-8 py-3 mt-2 rounded-xl text-sm transition-colors shadow-lg shadow-green-200 w-full`}
          >
            {IsEnrolled ? "Enrolled" : "Enroll Now"}
          </button>
        ) : (
          <Link to={"/login"}>
            <button
              className="cursor-not-allowed text-white bg-green-600 hover:bg-green-700
           font-bold px-8 py-3 mt-2 rounded-xl text-sm transition-colors shadow-lg shadow-green-200 w-full"
            >
              Login First To Enroll
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleCourse;
