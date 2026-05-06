import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Middleware: verify the JWT access token from the Authorization header.
 * Attaches the decoded user payload ({ id, role, email }) to req.user.
 */
export const verifyJWT = asyncHandler(async (req, _res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        throw new ApiError(401, 'Access token missing');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        req.user = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email,
        };
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Access token expired');
        }
        throw new ApiError(401, 'Invalid access token');
    }
});
