import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

/* ---------------- CHANGE DOCTOR AVAILABILITY ---------------- */

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    return res.json({ success: true, message: "Availability updated!" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

/* ---------------- GET ALL DOCTORS (FOR USERS) ---------------- */

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-email -password");
    return res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ---------------- DOCTOR LOGIN ---------------- */

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ---------------- GET DOCTOR APPOINTMENTS ---------------- */
/* docId comes from authDoctor middleware */

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel
      .find({ docId })
      .populate("userId", "name email phone image")
      .sort({ date: -1 });

    return res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ---------------- COMPLETE APPOINTMENT ---------------- */

const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.cancelled) {
      return res.json({
        success: false,
        message: "Cannot complete a cancelled appointment",
      });
    }

    appointment.isCompleted = true;
    await appointment.save();

    res.json({ success: true, message: "Appointment marked as completed" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

/* ---------------- CANCEL APPOINTMENT ---------------- */

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.isCompleted) {
      return res.json({
        success: false,
        message: "Completed appointment cannot be cancelled",
      });
    }

    appointment.cancelled = true;
    await appointment.save();

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get Doctor Profile
const getDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId; // coming from authDoctor middleware

    const doctor = await doctorModel
      .findById(docId)
      .select("-password");

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    return res.json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE DOCTOR PROFILE
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId; // coming from authDoctor middleware

    const {
      name,
      speciality,
      experience,
      fees,
      degree,
      about,
      available,
    } = req.body;

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      {
        name,
        speciality,
        experience,
        fees,
        degree,
        about,
        available,
      },
      { new: true }
    ).select("-password");

    if (!updatedDoctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  completeAppointment,
  cancelAppointment,
  getDoctorProfile,
  updateDoctorProfile
};
