import express from 'express';
import { listDoctors, getDoctor, getSlots } from '../controllers/doctor.controller.js';
import { validate } from '../middleware/validate.js';
import { listDoctorsSchema } from '../validators/doctor.validator.js';
import { z } from 'zod';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

const slotsQuerySchema = z.object({
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
});

// Public but requires auth per design
router.get('/', verifyJWT, validate(listDoctorsSchema, 'query'), listDoctors);
router.get('/:id', verifyJWT, getDoctor);
router.get('/:id/slots', verifyJWT, validate(slotsQuerySchema, 'query'), getSlots);

export default router;
