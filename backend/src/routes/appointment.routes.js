import express from 'express';
import { book, myAppointments, doctorAppointments, getAppointment, cancel, complete } from '../controllers/appointment.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validate } from '../middleware/validate.js';
import { bookAppointmentSchema, cancelAppointmentSchema, completeAppointmentSchema, appointmentQuerySchema } from '../validators/appointment.validator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.post('/', verifyJWT, authorizeRoles(ROLES.PATIENT), validate(bookAppointmentSchema), book);
router.get('/my', verifyJWT, authorizeRoles(ROLES.PATIENT), validate(appointmentQuerySchema, 'query'), myAppointments);
router.get('/doctor', verifyJWT, authorizeRoles(ROLES.DOCTOR), validate(appointmentQuerySchema, 'query'), doctorAppointments);
router.get('/:id', verifyJWT, getAppointment);
router.patch('/:id/cancel', verifyJWT, authorizeRoles(ROLES.PATIENT), validate(cancelAppointmentSchema), cancel);
router.patch('/:id/complete', verifyJWT, authorizeRoles(ROLES.DOCTOR), validate(completeAppointmentSchema), complete);

export default router;
