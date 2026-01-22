/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets/assets";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="px-6 md:px-20 py-12 bg-gray-50">

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, margin: "-80px" }}
        className="text-center mb-16"
      >
        <p className="text-3xl font-light tracking-wide text-gray-500">
          ABOUT <span className="text-primary font-semibold">US</span>
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
      </motion.div>

      {/* About Content */}
      <div className="my-10 flex flex-col md:flex-row gap-14 items-center">

        {/* Image */}
        <motion.img
          src={assets.about_image}
          alt="About"
          initial={{ opacity: 0, x: -20, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 0.8,
          }}
          viewport={{ once: false, margin: "-80px" }}
          className="
            w-full md:max-w-105 rounded-2xl shadow-xl 
            hover:scale-[1.03] transition-transform duration-500
          "
        />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 18,
          }}
          viewport={{ once: false, margin: "-80px" }}
          className="flex flex-col gap-6 md:w-2/4 text-sm text-gray-600 leading-relaxed"
        >
          <p>
            Welcome to{" "}
            <span className="font-semibold text-gray-800">Prescripto</span>, your
            trusted partner in managing your healthcare needs conveniently and
            efficiently. We understand the challenges individuals face when
            scheduling doctor appointments and managing health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to deliver a smooth and reliable experience.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 16,
              delay: 0.15,
            }}
            viewport={{ once: false, margin: "-80px" }}
            className="bg-white p-6 rounded-xl border-l-4 border-primary shadow-md"
          >
            <p className="text-gray-800 font-semibold mb-1">Our Vision</p>
            <p>
              To create a seamless healthcare experience that bridges the gap
              between patients and providers, making quality care accessible
              anytime, anywhere.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Why Choose Us Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, margin: "-80px" }}
        className="text-center my-14"
      >
        <p className="text-2xl text-gray-500">
          WHY <span className="text-primary font-semibold">CHOOSE US</span>
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        {[
          {
            title: "⚡ Efficiency",
            desc: "Streamlined appointment scheduling that fits perfectly into your busy lifestyle.",
          },
          {
            title: "🩺 Convenience",
            desc: "Access a trusted network of experienced healthcare professionals near you.",
          },
          {
            title: "🎯 Personalization",
            desc: "Tailored recommendations and reminders to help you stay on top of your health.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
              delay: index * 0.12,
            }}
            viewport={{ once: false, margin: "-80px" }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="
              group bg-white border rounded-2xl p-8 shadow-sm
              hover:shadow-xl transition-all duration-300
              hover:bg-primary hover:text-white cursor-pointer
            "
          >
            <p className="text-lg font-semibold mb-3 group-hover:text-white">
              {item.title}
            </p>
            <p className="text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
