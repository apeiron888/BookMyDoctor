import { asyncHandler } from '../utils/asyncHandler.js';
import * as doctorService from '../services/doctor.service.js';

export const listDoctors = asyncHandler(async (req, res) => {
    const { specialization, name, page, limit } = req.query;
    const result = await doctorService.listDoctors({ specialization, name, page, limit });
    res.json({ success: true, ...result });
});

export const getDoctor = asyncHandler(async (req, res) => {
    const doc = await doctorService.getDoctorById(req.params.id);
    res.json({ success: true, doctor: doc });
});

export const getSlots = asyncHandler(async (req, res) => {
    const date = req.query.date;
    const slots = await doctorService.getAvailableSlots(req.params.id, date);
    res.json({ success: true, slots });
});
