import { useContext, useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaBookOpen,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import SingleCourse from "../assets/SingleCourse";
import { CourseContext } from "../Store/CourseStore";

const categories = [
  "All",
  "UI/UX Design",
  "Development",
  "Data Science",
  "Business",
  "Financial",
];

export default function EduLe() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { AllCourses } = useContext(CourseContext);
  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="bg-[#f0faf4] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 relative">
          <div className="absolute top-8 left-4 opacity-40 hidden md:block">
            {[...Array(4)].map((_, r) => (
              <div key={r} className="flex gap-2 mb-2">
                {[...Array(5)].map((_, c) => (
                  <div
                    key={c}
                    className="w-1.5 h-1.5 bg-green-400 rounded-full"
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex-1 z-10">
            <p className="text-green-600 text-sm font-semibold mb-3 tracking-wide">
              Start your favourite course
            </p>
            <h1 className="text-3xl upp md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Now learning from <br className="hidden md:block" />
              anywhere, and build your{" "}
              <span className="text-green-500 block uppercase">
                bright career.
              </span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md leading-relaxed">
              It has survived not only five centuries but also the leap into
              electronic typesetting.
            </p>
            <Link to={"/all-course"}>
              <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-7 py-3.5 rounded-lg shadow-lg hover:shadow-green-200 transition-all duration-300 flex items-center gap-2 group">
                Start A Course
                <FaArrowRight
                  size={13}
                  className="group-hover:translate-x-2 group-hover:-rotate-30 group-hover:scale-110 transition-transform"
                />
              </button>
            </Link>
          </div>

          <div className="hidden md:flex flex-col items-center gap-6 z-10">
            <div className="bg-green-700 text-white rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-2xl shadow-green-300 relative">
              <FaBookOpen size={22} className="mb-1 opacity-80" />
              <span className="text-2xl font-extrabold leading-none">
                {AllCourses.length || 10}+
              </span>
              <span className="text-xs opacity-80 mt-0.5">courses</span>

              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-green-400 animate-spin"
                style={{ animationDuration: "12s" }}
              />
            </div>
          </div>

          <div className="flex-1 flex justify-end relative z-10">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=85"
                alt="Student"
                className="w-72 md:w-96 h-72 md:h-100 object-cover object-top rounded-3xl shadow-2xl"
              />

              <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-gray-800">4.8</span>
                    <FaStar className="text-yellow-400" size={14} />
                  </div>
                  <p className="text-[10px] text-gray-400">Rating (86K)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h className="text-2xl md:text-3xl font-extrabold text-gray-900">
              All{" "}
              <span className="text-green-500 relative">
                Courses
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  height="6"
                >
                  <path
                    d="M0 5 Q50 0 100 5"
                    stroke="#22c55e"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              of{" "}
              <span className="text-3xl font-bold text-gray-800">
                Edu<span className="text-green-600">Cation</span>
              </span>
            </h>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button className="text-gray-400 hover:text-green-600 p-1.5 shrink-0 transition-colors">
              <FaChevronLeft size={14} />
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600"
                }`}
              >
                {cat}
              </button>
            ))}
            <button className="text-gray-400 hover:text-green-600 p-1.5 shrink-0 transition-colors">
              <FaChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AllCourses.map((course) => (
              <SingleCourse
                key={course.id}
                course={course}
                activeCategory={activeCategory}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link to={"/all-course"}>
              <button className="border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 font-semibold px-10 py-3 rounded-xl transition-all duration-200 hover:shadow-md text-sm">
                Other Course
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f0faf4] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#e6f7ee] rounded-3xl px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-30 hidden md:block">
              {[...Array(3)].map((_, r) => (
                <div key={r} className="flex gap-2 mb-1.5">
                  {[...Array(4)].map((_, c) => (
                    <div
                      key={c}
                      className="w-1.5 h-1.5 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
              ))}
            </div>

            <div>
              <p className="text-green-600 text-sm font-semibold mb-1 flex items-center gap-2">
                <FaGraduationCap />
                Become A Instructor
              </p>
              <h3 className="text-xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                You can join with{" "}
                <span className="text-3xl font-bold text-gray-800">
                  Edu<span className="text-green-600">Cation</span>
                </span>{" "}
                <br className="hidden md:block" />
                as a{" "}
                <span className="text-green-500 uppercase underline decoration-wavy decoration-green-400">
                  instructor?
                </span>
              </h3>
            </div>

            {/* Arrow + CTA */}
            <div className="flex items-center gap-6">
              {/* Decorative arrow */}
              <svg
                width="80"
                height="40"
                viewBox="0 0 80 40"
                className="hidden md:block text-green-400"
                fill="none"
              >
                <path
                  d="M5 35 Q30 5 65 20 L58 15 M65 20 L60 28"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button
                onClick={() =>
                  window.open(
                    "https://api.whatsapp.com/send/?phone=923437117831&text&type=phone_number&app_absent=0",
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-green-300 transition-all duration-300 text-sm whitespace-nowrap"
              >
                Drop Information
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
