import { createContext, useEffect, useState } from "react";
import BackEnd_URI from "../Utils/BackEnd_URI";

// eslint-disable-next-line react-refresh/only-export-components
export const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const [AllCourses, setAllCourses] = useState([]);
  useEffect(() => {
    fetchCourser(setAllCourses);
  }, []);
  return (
    <CourseContext.Provider value={{ AllCourses, setAllCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

const fetchCourser = async (setAllCourses) => {
  try {
    const res = await fetch(`${BackEnd_URI}/api/course/all`);
    const data = await res.json();
    console.log(data);
    if (data.success) {
      setAllCourses(data.data);
    } else {
      console.log(data.message);
    }
    // here real fetch request will be made
  } catch (error) {
    console.log(error.message);
  }
};
