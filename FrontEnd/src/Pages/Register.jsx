import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleUserRegister } from "../Utils/HandleUserAuth";
import { UserContext } from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUserData, UserData } = useContext(UserContext);
  const [Loading, setLoading] = useState("");
  useEffect(() => {
    if (UserData.name) {
      navigate("/");
    }
  }, [UserData.name, navigate]);
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await handleUserRegister(FormData);
      if (result.success) {
        setUserData({
          name: result.data.name,
          email: result.data.email,
          role: result.data.role,
          enrolledCourses: result.data.enrolledCourses,
          createdCourses: result.data.createdCourses,
        });
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full p-10 justify-center items-center flex">
      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-[#008236] bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-slate-300 mt-1">Login to your account</p>
        <form
          onSubmit={handleFormSubmit}
          className="mt-8"
          onsubmit="return false"
        >
          <label
            htmlFor="Name"
            className="block mb-1 font-medium text-slate-300"
          >
            Name
          </label>
          <input
            value={FormData.name}
            onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
            type="text"
            id="name"
            name="name"
            placeholder="Name Here..."
            required
            className="w-full p-2 mb-3 bg-slate-900 border border-[#008236] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#008236] focus:border-[#008236]"
          />
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-slate-300"
          >
            Email address
          </label>
          <input
            value={FormData.email}
            onChange={(e) =>
              setFormData({ ...FormData, email: e.target.value })
            }
            type="email"
            id="email"
            name="email"
            placeholder="Email Here..."
            required
            className="w-full p-2 mb-3 bg-slate-900 border border-[#008236] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#008236] focus:border-[#008236]"
          />

          <label
            htmlFor="password"
            className="block mb-1 font-medium text-slate-300"
          >
            Password
          </label>
          <input
            value={FormData.password}
            onChange={(e) =>
              setFormData({ ...FormData, password: e.target.value })
            }
            type="password"
            id="password"
            required
            name="password"
            placeholder="Password Here..."
            className="w-full p-2 mb-2 bg-slate-900 border border-[#008236] rounded-md focus:outline-none focus:ring-1 transition focus:ring-[#008236] focus:border-[#008236]"
          />
          <div className="text-right">
            <Link
              to={"/login"}
              className="font-medium text-[#008236] hover:text-[#008236]"
            >
              Already a member? Login
            </Link>
          </div>
          <button
            type="submit"
            disabled={Loading}
            className={`${Loading ? "cursor-not-allowed" : ""} w-full mt-10 px-4 py-2.5 font-medium text-white bg-[#008236] rounded-md hover:bg-[#008236c2] focus:outline-none focus:ring-2 focus:ring-[#008236]`}
          >
            {Loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
