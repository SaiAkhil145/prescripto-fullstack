import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  const role = aToken ? "Admin" : dToken ? "Doctor" : "Guest";

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 shadow-md bg-white">
      <div className="flex items-center gap-3 text-xs">
        <img className="w-36 cursor-pointer" src={assets.admin_logo} alt="logo" />

        <p className="border px-3 py-1 rounded-full border-gray-300 text-gray-600 font-medium">
          {role}
        </p>
      </div>

      {(aToken || dToken) && (
        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-8 py-2 rounded-full hover:bg-indigo-600 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
