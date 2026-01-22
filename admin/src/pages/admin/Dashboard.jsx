/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  if (!dashData) {
    return (
      <p className="text-center text-gray-400 mt-20 text-sm">
        Loading dashboard...
      </p>
    );
  }

  const { doctors, patients, appointments, latestAppointments } = dashData;

  const barData = [
    { name: "Doctors", value: doctors },
    { name: "Patients", value: patients },
    { name: "Appointments", value: appointments },
  ];

  const pieData = [
    { name: "Completed", value: latestAppointments.filter(a => a.payment).length },
    { name: "Pending", value: latestAppointments.filter(a => !a.payment && !a.cancelled).length },
    { name: "Cancelled", value: latestAppointments.filter(a => a.cancelled).length },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="w-full px-6 py-6 space-y-10 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">
          Hospital performance overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Doctors" value={doctors} />
        <StatCard title="Patients" value={patients} />
        <StatCard title="Appointments" value={appointments} />
        <StatCard title="Revenue" value={`₹${appointments * 60}`} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Appointments Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Appointment Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Appointments
          </h2>
        </div>

        <div className="divide-y">
          {latestAppointments?.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] px-6 py-4 items-center hover:bg-gray-50 transition"
            >
              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData?.image}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.userData?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.userData?.email}
                  </p>
                </div>
              </div>

              {/* Doctor */}
              <div className="flex items-center gap-3">
                <img
                  src={item.docData?.image}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.docData?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.docData?.speciality}
                  </p>
                </div>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-600">
                {item.slotDate} <br /> {item.slotTime}
              </p>

              {/* Fees */}
              <p className="font-semibold text-gray-700">
                ₹{item.amount}
              </p>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium w-fit
                ${
                  item.cancelled
                    ? "bg-red-100 text-red-600"
                    : item.payment
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.cancelled ? "Cancelled" : item.payment ? "Paid" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
};

export default Dashboard;
