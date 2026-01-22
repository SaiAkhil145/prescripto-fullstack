/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);

  // ---------------- DOCTORS ----------------
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/list"
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message);
    }
  };

  // ---------------- USER PROFILE ----------------
  const loadUserProfileData = async () => {
  try {
    const { data } = await axios.get(
      backendUrl + "/api/user/get-profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("PROFILE RESPONSE:", data);

    if (data.success) {
      setUserData({
        ...data.userData,
        address: {
          line1: data.userData.address?.line1 || "",
          line2: data.userData.address?.line2 || "",
        },
      });
    } else {
      toast.error(data.message);
      setUserData(null);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    setUserData(null);
  }
};


  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]); 

  const value = {
    doctors,
    currency,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    getDoctorsData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
