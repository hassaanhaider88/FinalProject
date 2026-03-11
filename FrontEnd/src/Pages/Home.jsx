import { useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaSearch,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaRegClock,
  FaUsers,
  FaPlayCircle,
  FaBookOpen,
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";

const courses = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    instructor: "Jason Williams",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Science",
    categoryColor: "bg-green-100 text-green-600",
    title: "Data Science and Machine Learning with Python – Hands On!",
    duration: "08 hr 15 mins",
    lectures: "29 Lectures",
    price: "$385.00",
    original: "$440.00",
    rating: 4.9,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
    instructor: "Pamela Foster",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Science",
    categoryColor: "bg-green-100 text-green-600",
    title: "Create Amazing Color Schemes for Your UX Design Projects",
    duration: "08 hr 15 mins",
    lectures: "29 Lectures",
    price: "$420.00",
    original: null,
    rating: 4.9,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    instructor: "Rose Simmons",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "Science",
    categoryColor: "bg-green-100 text-green-600",
    title: "Culture & Leadership: Strategies for a Successful Business",
    duration: "08 hr 15 mins",
    lectures: "29 Lectures",
    price: "$295.00",
    original: "$340.00",
    rating: 4.9,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    instructor: "Jason Williams",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Finance",
    categoryColor: "bg-blue-100 text-blue-600",
    title: "Finance Series: Learn to Budget and Calculate your Net Worth.",
    duration: "08 hr 15 mins",
    lectures: "29 Lectures",
    price: "Free",
    original: null,
    rating: 4.9,
    isFree: true,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
    instructor: "Jason Williams",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    category: "Marketing",
    categoryColor: "bg-orange-100 text-orange-600",
    title: "Build Brand Into Marketing: Tackling the New Marketing Landscape",
    duration: "08 hr 15 mins",
    lectures: "29 Lectures",
    price: "$136.00",
    original: null,
    rating: 4.9,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    instructor: "Jason Williams",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    category: "Design",
    categoryColor: "bg-purple-100 text-purple-600",
    title:
      "Graphic Design: Illustrating Badges and Icons with Geometric Shapes",
    duration: "08 hr 15 mins",
    lectures: "29 Lectures",
    price: "$237.00",
    original: null,
    rating: 4.9,
  },
];

const categories = [
  "UI/UX Design",
  "Development",
  "Data Science",
  "Business",
  "Financial",
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          className={
            s <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"
          }
          size={11}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
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
          <StarRating rating={course.rating} />
        </div>
      </div>
    </div>
  );
}

export default function EduLe() {
  const [activeCategory, setActiveCategory] = useState("UI/UX Design");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="bg-[#f0faf4] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 relative">
          {/* Decorative dots */}
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

          {/* Left Content */}
          <div className="flex-1 z-10">
            <p className="text-green-600 text-sm font-semibold mb-3 tracking-wide">
              Start your favourite course
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Now learning from <br className="hidden md:block" />
              anywhere, and build <br className="hidden md:block" />
              your <span className="text-green-500">bright career.</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md leading-relaxed">
              It has survived not only five centuries but also the leap into
              electronic typesetting.
            </p>
            <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-7 py-3.5 rounded-lg shadow-lg hover:shadow-green-200 transition-all duration-300 flex items-center gap-2 group">
              Start A Course
              <FaArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          {/* Center badge */}
          <div className="hidden md:flex flex-col items-center gap-6 z-10">
            <div className="bg-green-700 text-white rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-2xl shadow-green-300 relative">
              <FaBookOpen size={22} className="mb-1 opacity-80" />
              <span className="text-2xl font-extrabold leading-none">
                1,235
              </span>
              <span className="text-xs opacity-80 mt-0.5">courses</span>
              {/* orbit ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-green-400 animate-spin"
                style={{ animationDuration: "12s" }}
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-end relative z-10">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=85"
                alt="Student"
                className="w-72 md:w-96 h-72 md:h-[400px] object-cover object-top rounded-3xl shadow-2xl"
              />
              {/* Rating badge */}
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

      {/* ── Courses Section ─────────────────────────────────────── */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
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
              of Edule
            </h2>
            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search your course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-200 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-1.5 rounded-lg hover:bg-green-700 transition-colors">
                <FaSearch size={12} />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button className="text-gray-400 hover:text-green-600 p-1.5 flex-shrink-0 transition-colors">
              <FaChevronLeft size={14} />
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600"
                }`}
              >
                {cat}
              </button>
            ))}
            <button className="text-gray-400 hover:text-green-600 p-1.5 flex-shrink-0 transition-colors">
              <FaChevronRight size={14} />
            </button>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Other Course button */}
          <div className="flex justify-center mt-10">
            <button className="border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 font-semibold px-10 py-3 rounded-xl transition-all duration-200 hover:shadow-md text-sm">
              Other Course
            </button>
          </div>
        </div>
      </section>

      {/* ── Become Instructor Banner ─────────────────────────────── */}
      <section className="bg-[#f0faf4] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#e6f7ee] rounded-3xl px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Decorative dots top-right */}
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

            {/* Left text */}
            <div>
              <p className="text-green-600 text-sm font-semibold mb-1 flex items-center gap-2">
                <FaGraduationCap />
                Become A Instructor
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                You can join with Edule <br className="hidden md:block" />
                as a{" "}
                <span className="text-green-500 underline decoration-wavy decoration-green-400">
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
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-green-300 transition-all duration-300 text-sm whitespace-nowrap">
                Drop Information
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-1.5 rounded-lg">
              <HiOutlineAcademicCap size={18} />
            </div>
            <span className="text-lg font-bold text-white">
              Edu<span className="text-green-400">Le</span>
            </span>
          </div>
          <p className="text-xs text-center">
            © 2026 EduLe. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <FaTwitter
              className="hover:text-green-400 cursor-pointer transition-colors"
              size={16}
            />
            <FaInstagram
              className="hover:text-green-400 cursor-pointer transition-colors"
              size={16}
            />
            <FaLinkedin
              className="hover:text-green-400 cursor-pointer transition-colors"
              size={16}
            />
            <FaYoutube
              className="hover:text-green-400 cursor-pointer transition-colors"
              size={16}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
