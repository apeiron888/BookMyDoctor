import express from 'express';
import { register, login, refresh, logout } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

// Rate limit auth routes
router.post('/register', authRateLimiter, validate(registerSchema), register);
router.post('/login', authRateLimiter, validate(loginSchema), login);
router.post('/refresh', authRateLimiter, refresh);
router.post('/logout', verifyJWT, logout);

export default router;
