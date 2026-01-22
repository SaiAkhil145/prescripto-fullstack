/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, doctorData, getDoctorProfile, backendUrl } =
    useContext(DoctorContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    experience: "",
    fees: "",
    degree: "",
    about: "",
    available: true,
  });

  useEffect(() => {
    if (dToken) getDoctorProfile();
  }, [dToken]);

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData.name || "",
        speciality: doctorData.speciality || "",
        experience: doctorData.experience || "",
        fees: doctorData.fees || "",
        degree: doctorData.degree || "",
        about: doctorData.about || "",
        available: doctorData.available ?? true,
      });
    }
  }, [doctorData]);

  if (!doctorData) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-400 animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.patch(
        backendUrl + "/api/doctor/update-profile",
        formData,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
        getDoctorProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: doctorData.name,
      speciality: doctorData.speciality,
      experience: doctorData.experience,
      fees: doctorData.fees,
      degree: doctorData.degree,
      about: doctorData.about,
      available: doctorData.available,
    });
    setEditMode(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500">
            View and manage your professional details
          </p>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-5 py-2 rounded-lg bg-primary text-white text-sm shadow hover:opacity-90"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-green-500 text-white text-sm shadow"
            >
              Save
            </button>
            <button
              onClick={resetForm}
              className="px-5 py-2 rounded-lg bg-gray-200 text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
        {/* Profile Top */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={
              doctorData.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
            alt="Doctor"
          />

          <div className="w-full">
            <input
              disabled={!editMode}
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full text-xl font-semibold outline-none bg-transparent
              ${editMode ? "border-b border-primary" : "text-gray-800"}`}
            />
            <input
              disabled={!editMode}
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className={`w-full text-primary mt-1 outline-none bg-transparent
              ${editMode ? "border-b border-primary" : ""}`}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-sm">
          {[
            { label: "Experience", name: "experience" },
            { label: "Fees", name: "fees" },
            { label: "Degree", name: "degree" },
          ].map((field) => (
            <div key={field.name} className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500">{field.label}</p>
              <input
                disabled={!editMode}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full font-semibold outline-none bg-transparent
                ${editMode ? "border-b border-primary" : ""}`}
              />
            </div>
          ))}

          {/* Availability */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500">Availability</p>
            {editMode ? (
              <select
                name="available"
                value={formData.available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available: e.target.value === "true",
                  })
                }
                className="w-full mt-1 border rounded px-2 py-1"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            ) : (
              <p
                className={`font-semibold ${
                  doctorData.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {doctorData.available ? "Active" : "Inactive"}
              </p>
            )}
          </div>
        </div>

        {/* About */}
        <div className="mt-8">
          <p className="text-gray-700 font-semibold mb-2">About</p>
          <textarea
            disabled={!editMode}
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className={`w-full rounded-xl p-3 text-sm outline-none resize-none
            ${editMode ? "border border-primary" : "bg-gray-50"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
