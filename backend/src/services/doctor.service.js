import { Doctor } from '../models/Doctor.js';
import { Appointment } from '../models/Appointment.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * List doctors with simple filters and pagination.
 */
export const listDoctors = async ({ specialization, name, page = 1, limit = 10 }) => {
    const filter = { isActive: true };
    if (specialization) filter.specialization = new RegExp(specialization, 'i');
    if (name) filter['user.name'] = new RegExp(name, 'i');

    const skip = (page - 1) * limit;
    const docs = await Doctor.find(filter).populate('user', 'name email avatar').skip(skip).limit(limit);
    const total = await Doctor.countDocuments(filter);
    return { docs, total, page, limit };
};

export const getDoctorById = async (id) => {
    const doctor = await Doctor.findById(id).populate('user', 'name email avatar');
    if (!doctor) throw new ApiError(404, 'Doctor not found');
    return doctor;
};

// Helper: add minutes to HH:MM string
const addMinutes = (timeStr, minutes) => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date(0, 0, 0, h, m + minutes);
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
};

/**
 * Compute available slots for a doctor on a given date (YYYY-MM-DD).
 * Excludes already booked (non-cancelled) appointments.
 */
export const getAvailableSlots = async (doctorId, dateStr) => {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) throw new ApiError(404, 'Doctor not found');

    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) throw new ApiError(400, 'Invalid date');
    const dayOfWeek = date.getDay();

    const daySlots = doctor.availability.filter((s) => s.dayOfWeek === dayOfWeek);
    if (!daySlots.length) return [];

    // Get booked slotStart values for that date
    const booked = await Appointment.find({ doctor: doctorId, date: date, status: { $ne: 'cancelled' } }).select('slotStart');
    const bookedSet = new Set(booked.map((b) => b.slotStart));

    const slots = [];
    for (const s of daySlots) {
        let cursor = s.startTime;
        while (true) {
            // if slot end would exceed endTime, break
            const slotEnd = addMinutes(cursor, s.durationMinutes);
            if (slotEnd > s.endTime) break;
            if (!bookedSet.has(cursor)) slots.push({ slotStart: cursor, slotEnd });
            cursor = addMinutes(cursor, s.durationMinutes);
            // safety guard to prevent infinite loops
            if (slots.length > 1000) break;
        }
    }

    return slots;
};
