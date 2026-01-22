/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      staggerChildren: 0.08,
    },
  },
};

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/user/register",
          { name, email, password }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/user/login",
          { email, password }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center  px-4">
      <motion.form
        onSubmit={onSubmitHandler}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="
          bg-white rounded-2xl shadow-xl p-8 sm:p-10 
          w-full max-w-md flex flex-col gap-4
        "
      >
        {/* Title */}
        <motion.div variants={inputVariant}>
          <p className="text-2xl font-semibold text-gray-800">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </p>
          <p className="text-sm text-gray-500">
            Please {state === "Sign Up" ? "Sign Up" : "Sign In"} to continue
          </p>
        </motion.div>

        {/* Full Name */}
        {state === "Sign Up" && (
          <motion.div variants={inputVariant} className="w-full">
            <p className="text-sm font-medium">Full Name</p>
            <input
              className="
                border border-gray-300 rounded-lg w-full p-2.5 mt-1
                focus:ring-2 focus:ring-primary outline-none transition
              "
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </motion.div>
        )}

        {/* Email */}
        <motion.div variants={inputVariant} className="w-full">
          <p className="text-sm font-medium">Email</p>
          <input
            className="
              border border-gray-300 rounded-lg w-full p-2.5 mt-1
              focus:ring-2 focus:ring-primary outline-none transition
            "
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </motion.div>

        {/* Password */}
        <motion.div variants={inputVariant} className="w-full">
          <p className="text-sm font-medium">Password</p>
          <input
            className="
              border border-gray-300 rounded-lg w-full p-2.5 mt-1
              focus:ring-2 focus:ring-primary outline-none transition
            "
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </motion.div>

        {/* Button */}
        <motion.button
          variants={inputVariant}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="submit"
          className="
            bg-primary w-full py-3 text-white rounded-full
            font-medium shadow-md hover:shadow-lg
            transition-all duration-300
          "
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </motion.button>

        {/* Toggle Auth */}
        <motion.div
          variants={inputVariant}
          className="text-sm text-gray-600 text-center"
        >
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-primary font-semibold cursor-pointer hover:underline"
                onClick={() => setState("Sign In")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                className="text-primary font-semibold cursor-pointer hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Login;
