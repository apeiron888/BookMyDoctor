import { Appointment } from '../models/Appointment.js';
import { Doctor } from '../models/Doctor.js';
import { ApiError } from '../utils/ApiError.js';
import { APPOINTMENT_STATUS, CANCEL_CUTOFF_HOURS } from '../utils/constants.js';

const addMinutes = (timeStr, minutes) => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date(0, 0, 0, h, m + minutes);
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
};

export const bookAppointment = async (patientId, { doctorId, date, slotStart, reason }) => {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) throw new ApiError(404, 'Doctor not found');

    const dayOfWeek = new Date(date).getDay();
    const slotDef = doctor.availability.find((s) => s.dayOfWeek === dayOfWeek && s.startTime <= slotStart && addMinutes(slotStart, s.durationMinutes) <= s.endTime);
    if (!slotDef) throw new ApiError(400, 'Requested slot is not within doctor availability');

    // Check for existing non-cancelled appointment
    const existing = await Appointment.findOne({ doctor: doctorId, date: new Date(date), slotStart, status: { $ne: APPOINTMENT_STATUS.CANCELLED } });
    if (existing) throw new ApiError(409, 'Slot already booked');

    const slotEnd = addMinutes(slotStart, slotDef.durationMinutes);

    const appointment = await Appointment.create({ patient: patientId, doctor: doctorId, date: new Date(date), slotStart, slotEnd, reason });
    return appointment;
};

export const getMyAppointments = async (patientId, { page = 1, limit = 10, status, from, to } = {}) => {
    const filter = { patient: patientId };
    if (status) filter.status = status;
    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const skip = (page - 1) * limit;
    const docs = await Appointment.find(filter).populate('doctor').sort({ date: -1 }).skip(skip).limit(limit);
    const total = await Appointment.countDocuments(filter);
    return { docs, total, page, limit };
};

export const getDoctorAppointments = async (doctorUserId, { page = 1, limit = 10, status, from, to } = {}) => {
    const doctor = await Doctor.findOne({ user: doctorUserId });
    if (!doctor) throw new ApiError(404, 'Doctor profile not found');
    const filter = { doctor: doctor._id };
    if (status) filter.status = status;
    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const skip = (page - 1) * limit;
    const docs = await Appointment.find(filter).populate('patient', 'name email').sort({ date: -1 }).skip(skip).limit(limit);
    const total = await Appointment.countDocuments(filter);
    return { docs, total, page, limit };
};

export const getAppointmentById = async (id, requester) => {
    const appt = await Appointment.findById(id).populate('patient doctor');
    if (!appt) throw new ApiError(404, 'Appointment not found');
    if (requester) {
        const requesterId = requester.id?.toString?.() ?? requester.id;
        const patientId = appt.patient?._id?.toString?.() ?? appt.patient?.toString?.();
        const doctorUserId = appt.doctor?.user?._id?.toString?.() ?? appt.doctor?.user?.toString?.();
        if (requester.role === 'patient' && requesterId !== patientId) {
            throw new ApiError(403, 'Not your appointment');
        }
        if (requester.role === 'doctor' && requesterId !== doctorUserId) {
            throw new ApiError(403, 'Not your appointment');
        }
    }
    return appt;
};

export const cancelAppointment = async (patientId, appointmentId, { reason } = {}) => {
    const appt = await Appointment.findById(appointmentId);
    if (!appt) throw new ApiError(404, 'Appointment not found');
    if (appt.patient.toString() !== patientId) throw new ApiError(403, 'Not your appointment');
    if (appt.status === APPOINTMENT_STATUS.CANCELLED) throw new ApiError(400, 'Appointment already cancelled');

    // compute appointment datetime
    const [h, m] = appt.slotStart.split(':').map(Number);
    const apptDate = new Date(appt.date);
    apptDate.setHours(h, m, 0, 0);

    const cutoffMs = CANCEL_CUTOFF_HOURS * 60 * 60 * 1000;
    if (apptDate.getTime() - Date.now() < cutoffMs) {
        throw new ApiError(400, `Appointments can only be cancelled at least ${CANCEL_CUTOFF_HOURS} hours before`);
    }

    appt.status = APPOINTMENT_STATUS.CANCELLED;
    appt.cancelledAt = new Date();
    if (reason) appt.notes = (appt.notes || '') + `\nCancel reason: ${reason}`;
    await appt.save();
    return appt;
};

export const completeAppointment = async (doctorUserId, appointmentId, { notes } = {}) => {
    const doctor = await Doctor.findOne({ user: doctorUserId });
    if (!doctor) throw new ApiError(404, 'Doctor profile not found');

    const appt = await Appointment.findById(appointmentId);
    if (!appt) throw new ApiError(404, 'Appointment not found');
    if (appt.doctor.toString() !== doctor._id.toString()) throw new ApiError(403, 'Not your appointment');
    if (appt.status !== APPOINTMENT_STATUS.SCHEDULED) throw new ApiError(400, 'Only scheduled appointments can be completed');

    appt.status = APPOINTMENT_STATUS.COMPLETED;
    if (notes) appt.notes = (appt.notes || '') + `\nComplete notes: ${notes}`;
    await appt.save();
    return appt;
};
