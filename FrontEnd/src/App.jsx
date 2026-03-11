import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import NavBar from "./Components/NavBar";
import CourseDetail from "./Pages/CourseDetail";
import CourseListing from "./Pages/CourseListing";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/all-course" element={<CourseListing />} />

        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </>
  );
};

export default App;
