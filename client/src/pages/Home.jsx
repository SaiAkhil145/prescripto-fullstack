/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Speciality from "../components/Speciality";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";

const fadeSection = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={fadeSection}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}   // triggers when 20% visible
      >
        <Header />
      </motion.div>

      <motion.div
        variants={fadeSection}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
      >
        <Speciality />
      </motion.div>

      <motion.div
        variants={fadeSection}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
      >
        <TopDoctors />
      </motion.div>

      <motion.div
        variants={fadeSection}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
      >
        <Banner />
      </motion.div>
    </div>
  );
};

export default Home;
