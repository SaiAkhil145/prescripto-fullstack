/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null); // 🔥 prevents double clicks
  const navigate = useNavigate();

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  // ---------------- Fetch Appointments ----------------
  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Cancel Appointment ----------------
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to cancel appointment");
    }
  };

  // ---------------- Razorpay Payment ----------------
  const appointmentRazorpay = async (appointmentId) => {
    try {
      setPayingId(appointmentId);

      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success || !data.order) {
        setPayingId(null);
        return toast.error("Failed to create Razorpay order");
      }

      if (!window.Razorpay) {
        setPayingId(null);
        return toast.error("Razorpay SDK not loaded");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Doctor Appointment",
        description: "Appointment Payment",
        order_id: data.order.id,

        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              backendUrl + "/api/user/verify-razorpay",
              response,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful!");
              getUserAppointments();
              navigate("/my-appointments");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.log(error);
            toast.error("Payment verification error");
          } finally {
            setPayingId(null);
          }
        },

        modal: {
          ondismiss: () => {
            setPayingId(null);
            toast.info("Payment cancelled");
          },
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment initialization failed");
      setPayingId(null);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <p className="pb-3 mt-12 text-2xl font-semibold text-zinc-900 border-b">
        My Appointments
      </p>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 mt-10">
          Loading your appointments...
        </p>
      )}

      {/* Empty */}
      {!loading && appointments.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          You don’t have any appointments yet.
        </p>
      )}

      {/* Appointment Cards */}
      <div className="mt-6 space-y-6">
        {!loading &&
          appointments.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl p-5 flex flex-col sm:flex-row gap-6 transition-all
              ${
                item.cancelled
                  ? "bg-red-50 border border-red-200"
                  : "bg-white shadow-sm hover:shadow-md"
              }`}
            >
              {/* Doctor Image */}
              <div className="shrink-0">
                <img
                  className="bg-blue-100 rounded-xl w-28 h-28 object-cover"
                  src={item.docData?.image}
                  alt="doctor"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-lg font-semibold text-neutral-900">
                  {item.docData?.name}
                </p>
                <p className="text-primary font-medium">
                  {item.docData?.speciality}
                </p>

                <p className="mt-2 text-xs">{item.docData?.address?.line1}</p>
                <p className="text-xs">{item.docData?.address?.line2}</p>

                <p className="mt-2">
                  <span className="font-medium">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>

                {/* Status Badges */}
                {item.cancelled && (
                  <p className="mt-2 inline-block text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 border border-red-200">
                    Appointment Cancelled
                  </p>
                )}

                {item.payment && !item.cancelled && (
                  <>
                    <p className="mt-2 inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 border border-green-200">
                      Payment Completed
                    </p>
                    <p className="text-xs text-green-700 mt-1 font-medium">
                      Transaction completed successfully ✔
                    </p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 justify-end">
                {item.cancelled ? (
                  <p className="text-red-500 text-sm text-center font-medium">
                    No actions available
                  </p>
                ) : item.payment ? (
                  <button
                    disabled
                    className="px-6 py-2.5 rounded-full bg-green-500 text-white 
                    cursor-not-allowed text-sm font-medium shadow"
                  >
                    Paid ✓
                  </button>
                ) : (
                  <>
                    <button
                      disabled={payingId === item._id}
                      onClick={() => appointmentRazorpay(item._id)}
                      className={`px-6 py-2.5 rounded-full border transition
                      ${
                        payingId === item._id
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "border-primary text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {payingId === item._id ? "Processing..." : "Pay Online"}
                    </button>

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-6 py-2.5 rounded-full border border-red-400 text-red-500 
                      hover:bg-red-500 hover:text-white transition"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
