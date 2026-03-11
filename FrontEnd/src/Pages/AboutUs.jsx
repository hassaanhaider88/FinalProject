import {
  FaTwitter,
  FaLinkedin,
  FaGraduationCap,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft,
  FaAward,
  FaGlobe,
  FaLightbulb,
} from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Home", "All Course", "Pages", "Blog", "Contact"];

const TEAM = [
  {
    name: "Jason Williams",
    role: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "10+ years in Data Science & ML. PhD from Stanford.",
    socials: { twitter: true, linkedin: true },
  },
  {
    name: "Pamela Foster",
    role: "Head of Design",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Award-winning UX designer with 8 years of experience.",
    socials: { twitter: true, linkedin: true },
  },
  {
    name: "Rose Simmons",
    role: "Lead Instructor",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Finance expert and passionate educator since 2015.",
    socials: { twitter: true, linkedin: true },
  },
  {
    name: "David Carter",
    role: "Head of Engineering",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Full-stack developer, previously at Google & Meta.",
    socials: { twitter: true, linkedin: true },
  },
];

const STATS = [
  {
    icon: <FaUsers size={22} className="text-green-600" />,
    value: "120K+",
    label: "Students Enrolled",
  },
  {
    icon: <MdOutlineOndemandVideo size={24} className="text-green-600" />,
    value: "1,235",
    label: "Total Courses",
  },
  {
    icon: <FaGraduationCap size={22} className="text-green-600" />,
    value: "98%",
    label: "Completion Rate",
  },
  {
    icon: <FaGlobe size={22} className="text-green-600" />,
    value: "50+",
    label: "Countries Reached",
  },
];

const VALUES = [
  {
    icon: <FaLightbulb size={22} className="text-green-600" />,
    title: "Innovation",
    desc: "We constantly update our curriculum to reflect the latest industry trends and technologies.",
  },
  {
    icon: <FaAward size={22} className="text-green-600" />,
    title: "Quality",
    desc: "Every course is carefully reviewed and crafted by industry experts and educators.",
  },
  {
    icon: <FaUsers size={22} className="text-green-600" />,
    title: "Community",
    desc: "We foster a supportive learning environment where students help each other grow.",
  },
  {
    icon: <FaCheckCircle size={22} className="text-green-600" />,
    title: "Accessibility",
    desc: "We believe great education should be affordable and available to everyone, everywhere.",
  },
];

const TESTIMONIALS = [
  {
    name: "Alex Turner",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "EduCation completely changed how I approach learning. The courses are top-notch and the instructors are world-class.",
    rating: 5,
  },
  {
    name: "Maria Gonzalez",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    text: "I landed my dream job 3 months after completing the UX design course. Can't recommend EduCation enough!",
    rating: 5,
  },
  {
    name: "James Park",
    role: "Data Analyst",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "The data science curriculum is incredibly well-structured. I went from zero to employed in under 6 months.",
    rating: 5,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Page Banner ─────────────────────── */}
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-green-900 text-white py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            About <span className="text-green-400">EduCation</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            We're on a mission to make world-class education accessible to
            everyone, anywhere on the planet.
          </p>
        </div>
      </div>

      {/* ── Our Story ───────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <p className="text-green-600 text-sm font-semibold mb-2">
              Our Story
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5 leading-tight">
              We Started With a{" "}
              <span className="text-green-500">Simple Idea</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              EduLe was founded in 2018 by a group of educators and tech
              professionals who believed that quality education shouldn't be
              limited by geography or income. What started as a small collection
              of free courses has grown into a platform trusted by over 120,000
              students worldwide.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Today, we offer 1,235+ courses across data science, design,
              business, marketing, and more — all taught by real-world
              practitioners who bring their expertise directly into the
              classroom.
            </p>
            <div className="space-y-2.5">
              {[
                "Expert-led courses updated regularly",
                "Hands-on projects with real datasets",
                "Certificates recognized by top companies",
                "Lifetime access after enrollment",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <FaCheckCircle
                    size={14}
                    className="text-green-500 shrink-0"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=85"
                alt="Team working"
                className="w-full h-80 object-cover"
              />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white rounded-2xl shadow-xl px-5 py-4">
                <p className="text-2xl font-extrabold text-gray-900">
                  6+ <span className="text-green-500">Years</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  of empowering learners
                </p>
              </div>
            </div>
            {/* Decorative dot grid */}
            <div className="absolute -bottom-5 -right-5 opacity-20 hidden md:block">
              {[...Array(4)].map((_, r) => (
                <div key={r} className="flex gap-2 mb-2">
                  {[...Array(4)].map((_, c) => (
                    <div
                      key={c}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────── */}
      <section className="bg-[#f0faf4] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {s.icon}
                </div>
                <p className="text-3xl font-extrabold text-gray-900">
                  {s.value}
                </p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Values ──────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-sm font-semibold mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Core <span className="text-green-500">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  {v.icon}
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-sm font-semibold mb-2">
              The People Behind EduCation
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Meet Our <span className="text-green-500">Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-green-100 group-hover:ring-green-300 transition-all"
                  />
                  <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm">
                  {member.name}
                </h3>
                <p className="text-green-600 text-xs font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-3">
                  <FaTwitter
                    size={14}
                    className="text-gray-300 hover:text-green-500 cursor-pointer transition-colors"
                  />
                  <FaLinkedin
                    size={14}
                    className="text-gray-300 hover:text-green-500 cursor-pointer transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-sm font-semibold mb-2">
              Student Stories
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Our <span className="text-green-500">Students Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <FaQuoteLeft size={24} className="text-green-100 mb-4" />
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} size={11} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────── */}
      <section className="bg-[#f0faf4] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#e6f7ee] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-green-600 text-sm font-semibold mb-1 flex items-center gap-2">
                <FaGraduationCap /> Become A Instructor
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                You can join with EduCation <br className="hidden md:block" />
                as a{" "}
                <span className="text-green-500 underline decoration-wavy">
                  instructor?
                </span>
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.open("https://wa.me/923437117831")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all text-sm whitespace-nowrap"
              >
                Drop Information
              </button>
              <Link
                to={"/all-course"}
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap flex items-center gap-2"
              >
                Browse Courses <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
