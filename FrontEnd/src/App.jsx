/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
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

import { useContext } from "react";
import { UserContext } from "./Store/UserStore";
import { useEffect } from "react";
import { getLocalStorageUser } from "./Utils/HandleUserAuth";
import UserDashboard from "./Pages/UserDashboard";
import InstructorDashBoard from "./Pages/InstructorDashBoard";
import AdminDashBoard from "./Pages/AdminDashBoard";
import UploadLesson from "./Pages/UploadLesson";

const App = () => {
  const { UserData, setUserData } = useContext(UserContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const token = localStorage.getItem("LMSUser");
    if (!token) {
      return console.log(token);
    }
    const result = await getLocalStorageUser(token);
    if (result.success) {
      setUserData({
        name: result.data.name,
        email: result.data.email,
        role: result.data.role,
      });
    } else {
      return;
    }
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/all-course" element={<CourseListing />} />
        <Route path="/course/:id" element={<CourseDetail />} />

        <Route
          path="/upload/:courseId"
          element={
            UserData.name ? (
              UserData.role === "instructor" ? (
                <UploadLesson />
              ) : (
                <Home />
              )
            ) : (
              <Home />
            )
          }
        />

        {/* auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Only Login User  */}
        <Route
          path="/dashboard"
          element={
            !UserData?.name ? (
              <Home />
            ) : UserData.role === "user" ? (
              <UserDashboard />
            ) : UserData.role === "instructor" ? (
              <InstructorDashBoard />
            ) : UserData.role === "admin" ? (
              <AdminDashBoard />
            ) : (
              <Home />
            )
          }
        />
      </Routes>
      <FooterCom />
    </>
  );
};

export default App;
