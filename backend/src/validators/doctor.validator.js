import { z } from 'zod';

const timeRegex = /^\d{2}:\d{2}$/;
const timeSchema = z.string().regex(timeRegex, 'Time must be in HH:MM format');

const availabilitySlotSchema = z.object({
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: timeSchema,
    endTime: timeSchema,
    durationMinutes: z.number().int().refine((v) => [15, 20, 30, 45, 60].includes(v), {
        message: 'durationMinutes must be 15, 20, 30, 45, or 60',
    }),
});

export const createDoctorSchema = z.object({
    userId: z.string().length(24, 'userId must be a valid ObjectId'),
    specialization: z.string().trim().min(2).max(100),
    qualification: z.string().trim().min(2).max(200),
    experience: z.number().int().min(0),
    fee: z.number().min(0),
    bio: z.string().trim().max(500).optional(),
    availability: z.array(availabilitySlotSchema).default([]),
});

export const updateDoctorSchema = createDoctorSchema.partial().omit({ userId: true });

export const listDoctorsSchema = z.object({
    specialization: z.string().trim().optional(),
    name: z.string().trim().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});
