import express from 'express';
import {
    listUsers,
    listAppointments,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    cancelAppointment,
} from '../controllers/admin.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validate } from '../middleware/validate.js';
import { adminUserQuerySchema, adminAppointmentQuerySchema } from '../validators/admin.validator.js';
import { createDoctorSchema, updateDoctorSchema } from '../validators/doctor.validator.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.use(verifyJWT, authorizeRoles(ROLES.ADMIN));

router.get('/users', validate(adminUserQuerySchema, 'query'), listUsers);
router.get('/appointments', validate(adminAppointmentQuerySchema, 'query'), listAppointments);
router.post('/doctors', validate(createDoctorSchema), createDoctor);
router.patch('/doctors/:id', validate(updateDoctorSchema), updateDoctor);
router.delete('/doctors/:id', deleteDoctor);
router.patch('/appointments/:id/cancel', cancelAppointment);

export default router;
