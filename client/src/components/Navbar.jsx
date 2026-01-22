import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowDropdown(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  const navItem = (path, label) => (
    <NavLink to={path} className="relative py-1">
      <span className={location.pathname === path ? "text-primary" : ""}>
        {label}
      </span>
      <span
        className={`absolute left-1/2 -bottom-1 h-0.5 bg-primary transition-all duration-300
        ${
          location.pathname === path
            ? "w-4 -translate-x-1/2"
            : "w-0"
        }`}
      />
    </NavLink>
  );

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 relative">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-6 font-medium">
        {navItem("/", "HOME")}
        {navItem("/doctors", "ALL DOCTORS")}
        {navItem("/about", "ABOUT")}
        {navItem("/contact", "CONTACT")}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative">
            <img
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
              className="w-9 h-9 rounded-full shadow-lg cursor-pointer object-cover"
              src={
                userData?.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
            />

            {/* Dropdown */}
            {showDropdown && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                  absolute right-0 top-12 z-20 min-w-52 rounded-xl bg-white p-4
                  shadow-xl border border-gray-100
                  flex flex-col gap-3 text-gray-600
                  animate-fadeIn
                "
              >
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="hover:text-primary cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                  }}
                  className="hover:text-primary cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-red-500 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="
              hidden sm:block bg-primary text-white px-8 py-3 rounded-full font-medium
              transition-all duration-300
              hover:scale-105 hover:shadow-lg
              active:scale-95
            "
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Backdrop */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-20 bg-white md:hidden
          transform transition-all duration-500 ease-in-out
          ${showMenu ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.logo} alt="logo" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <ul className="flex flex-col items-center gap-5 mt-8 font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            ALL DOCTORS
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            CONTACT
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
