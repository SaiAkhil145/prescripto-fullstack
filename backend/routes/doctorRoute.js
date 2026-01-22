import express from "express";
import {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  completeAppointment,
  cancelAppointment,
  getDoctorProfile,
  updateDoctorProfile
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);

doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.get('/profile',authDoctor,getDoctorProfile)
doctorRouter.patch("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
