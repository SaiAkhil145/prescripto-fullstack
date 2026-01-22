/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets/assets";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 py-4 overflow-hidden"
    >
      {/* Left Side */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]"
      >
        <motion.p
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight"
        >
          Book Appointment <br /> With Trusted Doctors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light"
        >
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </motion.div>

        <motion.a
          href="#speciality"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm shadow-md"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </motion.a>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 relative"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;   
