import { asyncHandler } from '../utils/asyncHandler.js';
import * as appointmentService from '../services/appointment.service.js';

export const book = asyncHandler(async (req, res) => {
    const patientId = req.user.id;
    const appt = await appointmentService.bookAppointment(patientId, req.body);
    res.status(201).json({ success: true, appointment: appt });
});

export const myAppointments = asyncHandler(async (req, res) => {
    const patientId = req.user.id;
    const result = await appointmentService.getMyAppointments(patientId, req.query);
    res.json({ success: true, ...result });
});

export const doctorAppointments = asyncHandler(async (req, res) => {
    const doctorUserId = req.user.id;
    const result = await appointmentService.getDoctorAppointments(doctorUserId, req.query);
    res.json({ success: true, ...result });
});

export const getAppointment = asyncHandler(async (req, res) => {
    const appt = await appointmentService.getAppointmentById(req.params.id, req.user);
    res.json({ success: true, appointment: appt });
});

export const cancel = asyncHandler(async (req, res) => {
    const patientId = req.user.id;
    const appt = await appointmentService.cancelAppointment(patientId, req.params.id, req.body);
    res.json({ success: true, appointment: appt });
});

export const complete = asyncHandler(async (req, res) => {
    const doctorUserId = req.user.id;
    const appt = await appointmentService.completeAppointment(doctorUserId, req.params.id, req.body);
    res.json({ success: true, appointment: appt });
});
