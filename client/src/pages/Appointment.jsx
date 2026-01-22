/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const docInfo = doctors?.find((doc) => doc._id?.toString() === docId);

  // ---------------- CREATE SLOTS ----------------
  const getAvailableSlots = () => {
    let slots = [];
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0); // 9 PM

      if (i === 0) {
        let now = new Date();
        currDate.setHours(
          now.getHours() >= 10 ? now.getHours() + 1 : 10,
          now.getMinutes() > 30 ? 30 : 0,
          0,
          0
        );
      } else {
        currDate.setHours(10, 0, 0, 0); // Start from 10 AM
      }

      let timeSlots = [];

      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currDate.getDate();
        let month = currDate.getMonth() + 1;
        let year = currDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;

        const isBooked =
          docInfo.slots_booked?.[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime);

        timeSlots.push({
          datetime: new Date(currDate),
          time: formattedTime,
          isBooked,
        });

        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
    setSlotIndex(0);
    setSlotTime("");
  };

  // ---------------- BOOK APPOINTMENT ----------------
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      navigate("/login");
      return;
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      const selectedSlot = docSlots[slotIndex].find(
        (item) => item.time === slotTime
      );

      if (!selectedSlot || selectedSlot.isBooked) {
        toast.error("This slot is not available");
        return;
      }

      const date = selectedSlot.datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message, {
          className:
            "bg-green-600 text-white font-semibold rounded-xl shadow-lg",
        });
        getDoctorsData();
        setTimeout(() => navigate("/my-appointments"), 1500);
      } else {
        toast.error(data.message, {
          className:
            "bg-red-600 text-white font-semibold rounded-xl shadow-lg",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        className: "bg-red-600 text-white font-semibold rounded-xl shadow-lg",
      });
    }
  };

  // ---------------- EFFECT ----------------
  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* ===== Doctor Details ===== */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0">
            <p className="flex items-center gap-1 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-4" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* ABOUT SECTION (RESTORED) */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee :
              <span className="text-gray-600">
                {currency}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ===== BOOKING SLOTS ===== */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          {/* Days */}
          <div className="flex gap-3 overflow-x-scroll mt-4">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime("");
                }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-300"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Time Slots – Single Row */}
          <div className="flex gap-3 overflow-x-auto whitespace-nowrap mt-4">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => !item.isBooked && setSlotTime(item.time)}
                className={`inline-block text-sm px-5 py-2 rounded-full ${
                  item.isBooked
                    ? "bg-gray-200 text-gray-400 line-through cursor-not-allowed"
                    : item.time === slotTime
                    ? "bg-primary text-white"
                    : "border border-gray-300 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button
            className="bg-primary text-white text-sm px-8 py-4 mt-4 rounded-full hover:scale-105 transition-all"
            onClick={bookAppointment}
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
