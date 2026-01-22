import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const { dToken, backendUrl, appointments, getAppointments } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (slotDate) => {
    if (!slotDate) return "-";
    const [d, m, y] = slotDate.split("_");
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];
    return `${d} ${months[m - 1]} ${y}`;
  };

  return (
    <div className="w-full px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Appointments
        </h2>
        <span className="text-sm text-gray-500">
          Total: {appointments.length}
        </span>
      </div>

      {/* Wrapper */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div
          className="hidden sm:grid grid-cols-[2fr_2fr_1fr_1fr_2fr] 
          bg-gray-50 py-4 px-6 text-xs uppercase tracking-wide 
          font-semibold text-gray-500"
        >
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Amount</p>
          <p>Status</p>
          <p className="text-right">Actions</p>
        </div>

        {/* Table Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <p>No appointments found</p>
            </div>
          ) : (
            appointments.map((item) => (
              <div
                key={item._id}
                className="
                  grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr_1fr_2fr]
                  gap-4 sm:gap-0 px-6 py-4 items-center
                  hover:bg-gray-50 transition-all duration-200
                "
              >
                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.userData?.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.userData?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.userData?.email}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <p className="text-gray-700 font-medium">
                    {formatDate(item.slotDate)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.slotTime}
                  </p>
                </div>

                {/* Amount */}
                <p className="font-semibold text-primary">
                  ₹{item.amount}
                </p>

                {/* Status */}
                <div>
                  {item.cancelled ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-600">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-600">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs bg-yellow-50 text-yellow-600">
                      Pending
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  {!item.cancelled && !item.isCompleted && (
                    <>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="
                          px-4 py-2 rounded-lg text-sm font-medium
                          bg-green-500 text-white hover:bg-green-600
                          transition-all duration-200
                        "
                      >
                        Complete
                      </button>

                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="
                          px-4 py-2 rounded-lg text-sm font-medium
                          bg-red-500 text-white hover:bg-red-600
                          transition-all duration-200
                        "
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
