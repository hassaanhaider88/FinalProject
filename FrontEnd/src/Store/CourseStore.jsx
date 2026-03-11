import { createContext, useEffect, useState } from "react";
import data from "../DummyData/CourseData";

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
    // here real fetch request will be made
    setAllCourses(data);
  } catch (error) {
    console.log(error.message);
  }
};
