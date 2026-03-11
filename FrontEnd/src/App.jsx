import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import NavBar from "./Components/NavBar";
import CourseDetail from "./Pages/CourseDetail";
import CourseListing from "./Pages/CourseListing";
import FooterCom from "./Components/FooterCom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/Register";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/all-course" element={<CourseListing />} />
        <Route path="/course/:id" element={<CourseDetail />} />

        {/* auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <FooterCom />
    </>
  );
};

export default App;
