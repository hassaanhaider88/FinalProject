import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    enrolledCourses: [],
    createdCourses: [],
  });
  useEffect(() => {
    fetchUserData(setUserData);
  }, []);
  return (
    <UserContext.Provider value={{ UserData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const fetchUserData = async (setUserData) => {
  try {
    // here real fetch request will be made to
    setUserData({
      name: "",
      email: "test@test.com",
      role: "admin",
      enrolledCourses: [],
      createdCourses: [],
    });
  } catch (error) {
    console.log(error.message);
  }
};
