/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const ITEMS_PER_PAGE = 5;

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Format: 12_1_2026 → 12 Jan 2026
  const formatDate = (slotDate) => {
    if (!slotDate) return "-";
    const [day, month, year] = slotDate.split("_");
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];
    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  // Pagination Logic
  const totalPages = Math.ceil((appointments?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedAppointments = appointments?.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full px-4 py-6">
      {/* Page Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Appointments
        </h2>
        <span className="text-sm text-gray-500">
          Total: {appointments?.length || 0}
        </span>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div
          className="hidden sm:grid 
          grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr]
          bg-gray-50 py-4 px-6 text-xs uppercase tracking-wide 
          font-semibold text-gray-500"
        >
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {paginatedAppointments?.length > 0 ? (
            paginatedAppointments.map((item, index) => (
              <div
                key={item._id}
                className="
                  grid grid-cols-1 sm:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr]
                  gap-2 sm:gap-0 px-6 py-4
                  hover:bg-gray-50 transition-all duration-200
                "
              >
                {/* Index */}
                <p className="text-gray-400 font-medium">
                  {startIndex + index + 1}
                </p>

                {/* Patient with Profile Image */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData?.image || "/default-avatar.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.userData?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.userData?.email || ""}
                    </p>
                  </div>
                </div>

                {/* Age */}
                <p className="text-gray-600">
                  {item.userData?.dob
                    ? calculateAge(item.userData.dob)
                    : item.userData?.age || "-"}
                </p>

                {/* Date & Time */}
                <div>
                  <p className="font-medium text-gray-700">
                    {formatDate(item.slotDate)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.slotTime}
                  </p>
                </div>

                {/* Doctor with Profile Image */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.docData?.image || "/default-doctor.png"}
                    alt="doctor"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.docData?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.docData?.email || ""}
                    </p>
                  </div>
                </div>

                {/* Fees */}
                <p className="font-semibold text-primary">
                  ₹{item.amount}
                </p>

                {/* Status Badge */}
                <div>
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full 
                      text-xs font-medium bg-red-50 text-red-600" onClick={()=>cancelAppointment(item._id)}>
                      Cancelled
                    </span>
                  ) : item.payment ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full 
                      text-xs font-medium bg-green-50 text-green-600">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full 
                      text-xs font-medium bg-yellow-50 text-yellow-600">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-gray-400">
              <p className="text-sm">No appointments found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-indigo-600"
              }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition
                  ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-indigo-600"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
