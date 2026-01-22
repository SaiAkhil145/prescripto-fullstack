/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets/assets";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const Contact = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="px-6 md:px-20 py-12 overflow-hidden"
    >
      {/* Heading */}
      <motion.div variants={fadeUp} className="text-center mb-14">
        <p className="text-3xl font-light tracking-wide text-gray-500">
          CONTACT <span className="text-primary font-semibold">US</span>
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
      </motion.div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-28">
        {/* Image */}
        <motion.img
          variants={fadeLeft}
          className="w-full md:max-w-[420px] rounded-xl shadow-xl"
          src={assets.contact_image}
          alt="Contact"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        {/* Info Card */}
        <motion.div
          variants={fadeRight}
          className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-5 w-full md:w-2/4"
        >
          <motion.p variants={fadeUp} className="text-xl font-semibold text-gray-700">
            Our Office
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-500">
            <span className="font-medium text-gray-700">Tel:</span> (415) 555-0132
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-500">
            <span className="font-medium text-gray-700">Email:</span>{" "}
            prescripto@gmail.com
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="border-t pt-4 mt-2"
          >
            <p className="text-lg font-semibold text-gray-700">
              Careers at <span className="text-primary">PRESCRIPTO</span>
            </p>
            <p className="text-gray-500 text-sm">
              Learn more about our teams and explore exciting job opportunities.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 self-start bg-primary text-white py-3 px-8 rounded-full shadow-md hover:shadow-xl transition-all"
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
