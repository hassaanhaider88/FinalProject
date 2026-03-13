import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CourseProvider } from "./Store/CourseStore.jsx";
import { UserContextProvider } from "./Store/UserStore.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CourseProvider>
      <UserContextProvider>
        <ToastContainer />
        <App />
      </UserContextProvider>
    </CourseProvider>
  </BrowserRouter>,
);
