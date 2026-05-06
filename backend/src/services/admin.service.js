import { User } from '../models/User.js';
import { Appointment } from '../models/Appointment.js';
import { Doctor } from '../models/Doctor.js';
import { ApiError } from '../utils/ApiError.js';

export const listUsers = async ({ role, page = 1, limit = 20, search } = {}) => {
    const filter = {};
    if (role) filter.role = role;
    if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];

    const skip = (page - 1) * limit;
    const docs = await User.find(filter).skip(skip).limit(limit).select('-password');
    const total = await User.countDocuments(filter);
    return { docs, total, page, limit };
};

export const listAppointments = async ({ status, doctorId, from, to, page = 1, limit = 20 } = {}) => {
    const filter = {};
    if (status) filter.status = status;
    if (doctorId) filter.doctor = doctorId;
    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const skip = (page - 1) * limit;
    const docs = await Appointment.find(filter).populate('patient doctor').sort({ date: -1 }).skip(skip).limit(limit);
    const total = await Appointment.countDocuments(filter);
    return { docs, total, page, limit };
};

export const createDoctor = async (payload) => {
    // payload must include userId
    const existing = await Doctor.findOne({ user: payload.userId });
    if (existing) throw new ApiError(409, 'Doctor profile already exists for this user');
    const doc = await Doctor.create({ user: payload.userId, specialization: payload.specialization, qualification: payload.qualification, experience: payload.experience, fee: payload.fee, bio: payload.bio || '', availability: payload.availability || [] });
    return doc;
};

export const updateDoctor = async (id, data) => {
    const doc = await Doctor.findById(id);
    if (!doc) throw new ApiError(404, 'Doctor not found');
    Object.assign(doc, data);
    await doc.save();
    return doc;
};

export const softDeleteDoctor = async (id) => {
    const doc = await Doctor.findById(id);
    if (!doc) throw new ApiError(404, 'Doctor not found');
    doc.isActive = false;
    await doc.save();
    return doc;
};

export const adminCancelAppointment = async (id) => {
    const appt = await Appointment.findById(id);
    if (!appt) throw new ApiError(404, 'Appointment not found');
    appt.status = 'cancelled';
    appt.cancelledAt = new Date();
    await appt.save();
    return appt;
};
