import express from 'express';
import validator from 'validator'
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'
import crypto from 'crypto'
//API to register user


const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        //validation credentials
        if(!email || !name || !password){
            return res.json({success:false,message:'missing details'});
        }
        //validating email
        const trimmedEmail = email.trim();
        if(!validator.isEmail(trimmedEmail)){
            return res.json({success:false,message:"please enter a valid email+8"})
        }
        //validating strong password
        if(password.length<8){
            return res.json({success:false,message:"enter a strong password"});
        }
        // let hashedPassword = await bcrypt.hash(password,10);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const userData = {
            name,
            email:trimmedEmail,
            password:hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        return res.json({success:true,token});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            return res.json({success:true,token})
        }else{
            return res.json({success:false,message:'Invalid credentials'});
        }
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel
      .findById(userId)
      .select("-password");

    return res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ always from auth middleware
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    // ✅ safely parse address
    const parsedAddress =
      typeof address === "string"
        ? JSON.parse(address)
        : address;

    await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address: parsedAddress,
        dob,
        gender,
      },
      { new: true }
    );

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        { resource_type: "image" }
      );

      const imageUrl = imageUpload.secure_url; // ✅ properly declared

      await userModel.findByIdAndUpdate(userId, {
        image: imageUrl,
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to book appointment

const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "doctor not available" });
    }

    let slots_booked = docData.slots_booked || {};

    // Check slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available" });
      }
      slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "user not found" });
    }

    // Create safe snapshots
    const doctorSnapshot = { ...docData._doc };
    delete doctorSnapshot.slots_booked;

    const userSnapshot = { ...userData._doc };

    const appointmentData = {
      userId,
      docId,
      userData: userSnapshot,
      docData: doctorSnapshot,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save updated slots in doctor
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: "appointment booked" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


// api to get user appointment for frontend my appointments page

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;  

    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//  api to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment already cancelled" });
    }

    // mark appointment cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (t) => t !== slotTime
      );
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})

//api to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: "INR",
      receipt: appointmentId,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      order,   // 🔥 THIS IS REQUIRED
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const verfiyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // fetch order to get appointmentId stored in receipt
    const order = await razorpayInstance.orders.fetch(razorpay_order_id);
    const appointmentId = order.receipt;

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      payment: true,
    });

    return res.json({
      success: true,
      message: "Payment verified & appointment updated",
    });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

 

export {registerUser,loginUser,getProfile,updateUserProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verfiyRazorpay};