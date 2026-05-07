import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from '../models/AppointmentModel.js';
import crypto from 'crypto';

//API to register user
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" });
        }
        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to get user data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select("-password");
        return res.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing.." });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender, image: imageFile ? imageFile.path : undefined });
        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }
        return res.json({ success: true, message: "Profile Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available" });
        }

        let slots_booked = docData.slots_booked;

        //checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");
        delete docData.slots_booked; // removing slots_booked from docData to avoid redundancy

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.json({ success: true, message: "Appointment booked successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to get user appointment for frontend my-appointment page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        return res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        // releasing doc slot
        const { docId, slotDate, slotTime } = appointmentData;
        const docData = await doctorModel.findById(docId);
        let slots_booked = docData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        return res.json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to make payment of appointment using PayHere
const paymentPayHere = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const { userId } = req.body;
        
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment not found or cancelled" });
        }

        // Verify the appointment belongs to the user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const userData = await userModel.findById(userId);
        
        // Verify environment variables are set
        if (!process.env.PAYHERE_MERCHANT_ID || !process.env.PAYHERE_MERCHANT_SECRET) {
            return res.json({ success: false, message: "PayHere credentials not configured" });
        }
        
        // Generate unique order ID
        const orderId = `ORDER_${appointmentId}_${Date.now()}`;
        
        // Prepare PayHere payment data
        const merchantId = process.env.PAYHERE_MERCHANT_ID;
        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
        const amount = appointmentData.amount.toFixed(2);
        const currency = 'LKR';
        
        const paymentData = {
            merchant_id: merchantId,
            return_url: process.env.FRONTEND_URL + '/my-appointments',
            cancel_url: process.env.FRONTEND_URL + '/my-appointments',
            notify_url: process.env.BACKEND_URL + '/api/user/verify-payhere',
            order_id: orderId,
            items: `Appointment with Dr. ${appointmentData.docData.name}`,
            currency: currency,
            amount: amount,
            first_name: userData.name.split(' ')[0] || 'User',
            last_name: userData.name.split(' ').slice(1).join(' ') || 'Name',
            email: userData.email,
            phone: userData.phone || '0000000000',
            address: userData.address?.line1 || 'N/A',
            city: userData.address?.line2 || 'Colombo',
            country: 'Sri Lanka',
            custom_1: appointmentId
        };

        // Generate hash for security
        const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
        const hashString = `${merchantId}${orderId}${amount}${currency}${hashedSecret}`;
        const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();
        
        paymentData.hash = hash;

        return res.json({ success: true, paymentData });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// API to confirm payment from frontend after PayHere success
const confirmPayment = async (req, res) => {
    try {
        const { appointmentId, orderId } = req.body;
        const { userId } = req.body;

        // Verify appointment exists and belongs to user
        const appointment = await appointmentModel.findById(appointmentId);
        
        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (appointment.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        // Update payment status
        await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
        
        return res.json({ success: true, message: "Payment confirmed successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// API to verify payment of PayHere (webhook - for production)
const verifyPayHerePayment = async (req, res) => {
    try {
        const {
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig,
            custom_1
        } = req.body;

        // Verify the payment signature
        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
        const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
        const amountFormatted = parseFloat(payhere_amount).toFixed(2);
        
        const hashString = `${merchant_id}${order_id}${amountFormatted}${payhere_currency}${status_code}${hashedSecret}`;
        const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

        if (hash !== md5sig) {
            return res.json({ success: false, message: "Payment verification failed - Invalid signature" });
        }

        // Check if payment was successful (status_code 2 means success)
        if (status_code === '2') {
            await appointmentModel.findByIdAndUpdate(custom_1, { payment: true });
            return res.json({ success: true, message: "Payment successful" });
        } else {
            return res.json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentPayHere, confirmPayment, verifyPayHerePayment };