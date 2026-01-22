/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { FaCalendarCheck, FaTimesCircle, FaClock } from "react-icons/fa";

const DoctorDashboard = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // Stats
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(a => a.isCompleted).length;
  const cancelledAppointments = appointments.filter(a => a.cancelled).length;
  const pendingAppointments = appointments.filter(
    a => !a.isCompleted && !a.cancelled
  ).length;

  return (
    <div className="w-full px-6 py-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Doctor Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Appointments</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {totalAppointments}
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
              <FaCalendarCheck size={20} />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold text-green-600">
                {completedAppointments}
              </h3>
            </div>
            <div className="bg-green-50 text-green-600 p-3 rounded-full">
              <FaCalendarCheck size={20} />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-500">
                {pendingAppointments}
              </h3>
            </div>
            <div className="bg-yellow-50 text-yellow-500 p-3 rounded-full">
              <FaClock size={20} />
            </div>
          </div>
        </div>

        {/* Cancelled */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cancelled</p>
              <h3 className="text-2xl font-bold text-red-500">
                {cancelledAppointments}
              </h3>
            </div>
            <div className="bg-red-50 text-red-500 p-3 rounded-full">
              <FaTimesCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">Recent Appointments</h3>
        </div>

        <div className="divide-y">
          {appointments.slice(0, 5).map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    item.userData?.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {item.userData?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.slotDate} • {item.slotTime}
                  </p>
                </div>
              </div>

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
