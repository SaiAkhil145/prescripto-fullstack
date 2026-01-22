/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import AllAppointments from "./pages/admin/AllAppointments";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const location = useLocation();

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        <Sidebar />

        {/* Page Transitions */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Admin Routes */}
              <Route
                path="/"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <motion.div {...motionProps}>
                    <Dashboard />
                  </motion.div>
                }
              />

              <Route
                path="/all-appointments"
                element={
                  <motion.div {...motionProps}>
                    <AllAppointments />
                  </motion.div>
                }
              />

              <Route
                path="/add-doctor"
                element={
                  <motion.div {...motionProps}>
                    <AddDoctor />
                  </motion.div>
                }
              />

              <Route
                path="/doctor-list"
                element={
                  <motion.div {...motionProps}>
                    <DoctorsList />
                  </motion.div>
                }
              />

              {/* Doctor Routes */}
              <Route
                path="/doctor-dashboard"
                element={
                  <motion.div {...motionProps}>
                    <DoctorDashboard />
                  </motion.div>
                }
              />

              <Route
                path="/doctor-profile"
                element={
                  <motion.div {...motionProps}>
                    <DoctorProfile />
                  </motion.div>
                }
              />

              <Route
                path="/doctor-appointments"
                element={
                  <motion.div {...motionProps}>
                    <DoctorAppointments />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

const motionProps = {
  variants: pageVariants,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.35, ease: "easeInOut" },
};

export default App;
