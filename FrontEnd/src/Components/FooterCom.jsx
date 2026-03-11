import React from "react";
import { HiOutlineAcademicCap } from "react-icons/hi";

const FooterCom = () => {
  const DateYear = new Date();
  const year = DateYear.getFullYear();
  return (
    <footer className="flex flex-col items-center justify-around w-full py-16 text-sm bg-slate-50 text-gray-800/70">
      <div className="flex items-center gap-2">
        <div className="bg-green-600 text-white p-1.5 rounded-lg">
          <HiOutlineAcademicCap size={22} />
        </div>
        <span className="text-3xl font-bold text-gray-800">
          Edu<span className="text-green-600">Cation</span>
        </span>
      </div>
      <p className="mt-4 text-center">
        Copyright © {year} EduCation. All rights reservered.
      </p>
      <div className="flex items-center gap-4 mt-6">
        <a
          href="#"
          className="font-medium text-gray-800 hover:text-black transition-all"
        >
          Brand Guidelines
        </a>
        <div className="h-4 w-px bg-black/20"></div>
        <a
          href="#"
          className="font-medium text-gray-800 hover:text-black transition-all"
        >
          Trademark Policy
        </a>
      </div>
    </footer>
  );
};

export default FooterCom;
