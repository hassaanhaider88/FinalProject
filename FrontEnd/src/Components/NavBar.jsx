import React, { useContext, useState } from "react";
import { FaBars, FaGraduationCap, FaTimes } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import { UserContext } from "../Store/UserStore";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { UserData } = useContext(UserContext);

  const navLinks = [
    {
      label: "Home",
      redirectUri: "/",
    },
    {
      label: "All Course",
      redirectUri: "/all-course",
    },
    {
      label: "About Us",
      redirectUri: "/about",
    },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo goes here*/}
        <div className="flex items-center gap-2">
          <div className="bg-green-600 text-white p-1.5 rounded-lg">
            <HiOutlineAcademicCap size={22} />
          </div>
          <span className="text-xl font-bold text-gray-800">
            Edu<span className="text-green-600">Cation</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          {navLinks.map((item, idx) => (
            <Link
              to={item.redirectUri}
              key={idx}
              className="hover:text-green-600 cursor-pointer transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {UserData.name ? (
            "User Here"
          ) : (
            <>
              <Link to={"/login"}>
                <button className="text-sm text-gray-700 font-medium hover:text-green-600 transition-colors">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <ul className="flex flex-col items-center gap-7 text-sm font-medium text-gray-600">
            {navLinks.map((item, idx) => (
              <Link
                to={item.redirectUri}
                key={idx}
                className="hover:text-green-600 cursor-pointer transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </ul>
          <div className="flex gap-3 pt-2">
            <button className="text-sm text-gray-700 font-medium border border-gray-300 px-4 py-2 rounded-lg w-full">
              Sign In
            </button>
            <button className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg w-full">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
