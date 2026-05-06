import { z } from 'zod';

const timeRegex = /^\d{2}:\d{2}$/;

export const bookAppointmentSchema = z.object({
    doctorId: z.string().length(24, 'doctorId must be a valid ObjectId'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
    slotStart: z.string().regex(timeRegex, 'slotStart must be HH:MM'),
    reason: z.string().trim().max(500).optional(),
});

export const cancelAppointmentSchema = z.object({
    reason: z.string().trim().max(500).optional(),
});

export const completeAppointmentSchema = z.object({
    notes: z.string().trim().max(1000).optional(),
});

export const appointmentQuerySchema = z.object({
    status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});
