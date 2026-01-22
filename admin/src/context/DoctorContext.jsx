/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');
    const [appointments,setAppointments] = useState([]);
    const [doctorData, setDoctorData] = useState(null);

const getDoctorProfile = async () => {
  try {
    const { data } = await axios.get(
      backendUrl + "/api/doctor/profile",
      {
        headers: { dtoken: dToken }
      }
    );

    if (data.success) {
      setDoctorData(data.doctor);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

    const getAppointments = async () => {
  try {
    const { data } = await axios.get(
      backendUrl + "/api/doctor/appointments",
      {
        headers: {
          dtoken: dToken,   // lowercase
        },
      }
    );

    if (data.success) {
      setAppointments(data.appointments.reverse());
      console.log(data.appointments.reverse());
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

    const value={
        dToken,setDToken,backendUrl,appointments,getAppointments,setAppointments,getDoctorProfile,doctorData
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider;