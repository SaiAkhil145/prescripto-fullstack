/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("relevance");

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    let tempDoctors = [...doctors];

    if (speciality) {
      tempDoctors = tempDoctors.filter((doc) => doc.speciality === speciality);
    }

    if (searchTerm.trim()) {
      tempDoctors = tempDoctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortType === "priceLow") {
      tempDoctors.sort((a, b) => a.fees - b.fees);
    } else if (sortType === "priceHigh") {
      tempDoctors.sort((a, b) => b.fees - a.fees);
    } else if (sortType === "name") {
      tempDoctors.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilterDoc(tempDoctors);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchTerm, sortType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-4 sm:px-10 py-8"
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-600 text-lg"
      >
        Find trusted doctors and book your appointment instantly
      </motion.p>

      {/* Search & Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-5 py-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary transition-all"
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="px-5 py-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="priceLow">Fees: Low → High</option>
          <option value="priceHigh">Fees: High → Low</option>
          <option value="name">Name: A → Z</option>
        </select>
      </motion.div>

      {/* Layout */}
      <div className="flex flex-col sm:flex-row gap-8 mt-10">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 w-full sm:w-60"
        >
          {specialities.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)
              }
              className={`py-2.5 px-4 rounded text-sm border transition-all ${
                speciality === item
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
        >
          {filterDoc.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                y: -6,
                boxShadow: "0px 12px 25px rgba(0,0,0,0.08)",
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white"
            >
              <img
                className="bg-blue-50 w-full h-52 object-cover"
                src={item.image}
                alt={item.name}
              />

              <div className="p-4 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available
                </div>

                <p className="text-gray-900 text-lg font-medium mt-1">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>

                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    Experience:{" "}
                    <span className="font-medium">{item.experience}</span>
                  </p>
                  <p>
                    Fees:{" "}
                    <span className="font-semibold text-primary">
                      ₹{item.fees}
                    </span>
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-4 w-full py-2.5 rounded-full bg-primary text-white text-sm font-medium"
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Doctors;
