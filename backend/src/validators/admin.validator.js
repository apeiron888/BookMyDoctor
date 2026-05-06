import { z } from 'zod';

export const adminUserQuerySchema = z.object({
    role: z.enum(['patient', 'doctor', 'admin']).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().optional(),
});

export const adminAppointmentQuerySchema = z.object({
    status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
    doctorId: z.string().length(24).optional(),
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});
