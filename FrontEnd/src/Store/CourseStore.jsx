/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import BackEnd_URI from "../Utils/BackEnd_URI";

// eslint-disable-next-line react-refresh/only-export-components
export const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const [AllCourses, setAllCourses] = useState([]);
  const [CourseLoading, setCourseLoading] = useState(false);
  const [CourseError, setCourseError] = useState(false);
  useEffect(() => {
    fetchCourser(setAllCourses, setCourseLoading, setCourseError);
  }, []);
  return (
    <CourseContext.Provider
      value={{
        AllCourses,
        setAllCourses,
        CourseLoading,
        setCourseLoading,
        CourseError,
        setCourseError,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const fetchCourser = async (
  setAllCourses,
  setCourseLoading,
  setCourseError,
) => {
  try {
    setCourseLoading(true);
    const res = await fetch(`${BackEnd_URI}/api/course/all`);
    const data = await res.json();
    console.log(data);
    if (data.success) {
      setAllCourses(data.data);
    } else {
      setCourseError(true);
      console.log(data.message);
    }
    // here real fetch request will be made
  } catch (error) {
    console.log(error.message);
    setCourseError(true)
  } finally {
    setCourseLoading(false);
  }
};
