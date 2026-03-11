import React from "react";
import { FaPlayCircle, FaRegClock, FaUsers } from "react-icons/fa";

const SingleCourse = ({ course, activeCategory = "All" }) => {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer ${activeCategory === course.category || activeCategory === "All" ? "block" : "hidden"}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <FaPlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-4xl drop-shadow-lg" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={course.avatar}
            alt={course.instructor}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-xs text-gray-500 font-medium">
            {course.instructor}
          </span>
          <span
            className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${course.categoryColor}`}
          >
            {course.category}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
          {course.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <FaRegClock size={11} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <FaUsers size={11} /> {course.lectures}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-bold ${course.isFree ? "text-green-600" : "text-gray-900"}`}
            >
              {course.price}
            </span>
            {course.original && (
              <span className="text-xs text-gray-400 line-through">
                {course.original}
              </span>
            )}
          </div>
          {course.rating}
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
