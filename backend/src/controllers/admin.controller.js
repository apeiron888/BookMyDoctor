import { asyncHandler } from '../utils/asyncHandler.js';
import * as adminService from '../services/admin.service.js';

export const listUsers = asyncHandler(async (req, res) => {
    const result = await adminService.listUsers(req.query);
    res.json({ success: true, ...result });
});

export const listAppointments = asyncHandler(async (req, res) => {
    const result = await adminService.listAppointments(req.query);
    res.json({ success: true, ...result });
});

export const createDoctor = asyncHandler(async (req, res) => {
    const doc = await adminService.createDoctor(req.body);
    res.status(201).json({ success: true, doctor: doc });
});

export const updateDoctor = asyncHandler(async (req, res) => {
    const doc = await adminService.updateDoctor(req.params.id, req.body);
    res.json({ success: true, doctor: doc });
});

export const deleteDoctor = asyncHandler(async (req, res) => {
    const doc = await adminService.softDeleteDoctor(req.params.id);
    res.json({ success: true, doctor: doc });
});

export const cancelAppointment = asyncHandler(async (req, res) => {
    const appt = await adminService.adminCancelAppointment(req.params.id);
    res.json({ success: true, appointment: appt });
});
