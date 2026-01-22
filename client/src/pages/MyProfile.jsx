/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets/assets";

const MyProfile = () => {
  const { userData, token, loadUserProfileData, backendUrl } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (token && !userData) {
      loadUserProfileData();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Please login to view your profile
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading profile...
      </div>
    );
  }

  const address = userData.address || { line1: "", line2: "" };

  const imagePreview = image
    ? URL.createObjectURL(image)
    : userData.image || assets.default_profile;

  const updateUserProfileData = async () => {
    try {
      setSaving(true);

      if (!userData.name || !userData.phone) {
        toast.error("Name and phone are required");
        return;
      }

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append(
        "address",
        JSON.stringify({
          line1: address.line1,
          line2: address.line2,
        })
      );
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        setIsEdit(false);
        setImage(null);
        loadUserProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl  bg-white shadow-xl rounded-2xl p-6 md:p-10 text-sm">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative group">
          <img
            src={imagePreview}
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-md cursor-pointer"
            onClick={() =>
              isEdit && document.getElementById("profileImage").click()
            }
          />
          {isEdit && (
            <span className="absolute bottom-1 right-1 bg-primary text-white text-xs px-2 py-1 rounded-full">
              Edit
            </span>
          )}
        </div>

        {isEdit && (
          <input
            type="file"
            id="profileImage"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}

        <div className="text-center md:text-left">
          {isEdit ? (
            <input
              className="text-2xl font-semibold border-b focus:outline-none"
              type="text"
              value={userData.name}
              onChange={(e) =>
                (userData.name = e.target.value)
              }
            />
          ) : (
            <p className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </p>
          )}
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      <hr className="my-6" />

      {/* Contact Information */}
      <section className="mb-8">
        <p className="text-primary font-semibold mb-4">
          Contact Information
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-gray-500">Phone</p>
            {isEdit ? (
              <input
                className="w-full border rounded-lg p-2"
                value={userData.phone}
                onChange={(e) =>
                  (userData.phone = e.target.value)
                }
              />
            ) : (
              <p className="font-medium text-gray-700">
                {userData.phone}
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-500">Address</p>
            {isEdit ? (
              <>
                <input
                  className="w-full border rounded-lg p-2 mb-2"
                  placeholder="Line 1"
                  value={address.line1}
                  onChange={(e) =>
                    (userData.address.line1 = e.target.value)
                  }
                />
                <input
                  className="w-full border rounded-lg p-2"
                  placeholder="Line 2"
                  value={address.line2}
                  onChange={(e) =>
                    (userData.address.line2 = e.target.value)
                  }
                />
              </>
            ) : (
              <p className="font-medium text-gray-700">
                {address.line1}
                <br />
                {address.line2}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Basic Information */}
      <section className="mb-8">
        <p className="text-primary font-semibold mb-4">
          Basic Information
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-gray-500">Gender</p>
            {isEdit ? (
              <select
                className="w-full border rounded-lg p-2"
                value={userData.gender}
                onChange={(e) =>
                  (userData.gender = e.target.value)
                }
              >
                <option value="Not Selected">Not Selected</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="font-medium text-gray-700">
                {userData.gender}
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-500">Birthday</p>
            {isEdit ? (
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                value={
                  userData.dob === "Not Selected" ? "" : userData.dob
                }
                onChange={(e) =>
                  (userData.dob = e.target.value)
                }
              />
            ) : (
              <p className="font-medium text-gray-700">
                {userData.dob}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        {isEdit ? (
          <>
            <button
              disabled={saving}
              onClick={updateUserProfileData}
              className="bg-primary text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setImage(null);
                loadUserProfileData();
              }}
              className="border px-6 py-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
