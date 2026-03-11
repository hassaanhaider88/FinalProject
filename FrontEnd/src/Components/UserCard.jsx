/* eslint-disable react-hooks/set-state-in-effect */
import { FiLogOut } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { ImAccessibility } from "react-icons/im";
import React, { useEffect, useState } from "react";
import { FiUser, FiSettings, FiEye, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BackEnd_URI from "../Utils/BackEnd_URI";
import { useContext } from "react";
import { UserContext } from "../Store/UserStore";

const UserCard = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const { setUserData } = useContext(UserContext);

  const items = [
    { name: "DashBoard", icon: <RiDashboardLine />, redirectUri: "/dashboard" },
    { name: "Log Out", icon: <FiLogOut />, redirectUri: "" },
  ];

  const navigate = useNavigate();

  const handleUserLogOutClick = async () => {
    setUserData({});
    localStorage.removeItem("LMSUser");
    alert("log Out successfully");
  };

  useEffect(() => {
    setShowProfileCard(false);
  }, [navigate]);

  return (
    <div className="relative inline-block">
      {/* User Icon */}
      <BiUserCircle
        size={34}
        className="cursor-pointer mr-5 text-black"
        onClick={() => setShowProfileCard(!showProfileCard)}
      />

      {/* Dropdown */}
      {showProfileCard && (
        <div className="absolute right-0 mt-2 w-56 bg-black rounded-md p-2 shadow-lg">
          <div className="flex flex-col">
            {items.map((item, index) => (
              <button
                onClick={() => {
                  if (item.name === "Log Out") {
                    handleUserLogOutClick();
                    setShowProfileCard(false);
                  } else {
                    navigate(item.redirectUri);
                  }
                }}
                key={index}
                className="group relative flex items-center gap-3 text-white px-3 py-2 rounded-md hover:bg-[#111] transition"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-[#008236] rounded opacity-0 group-focus:opacity-100 group-active:opacity-100"></span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
