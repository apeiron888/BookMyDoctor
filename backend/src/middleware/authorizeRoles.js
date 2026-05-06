import { ApiError } from '../utils/ApiError.js';

/**
 * Middleware factory: allow only users with the specified roles.
 * Must be used AFTER verifyJWT (requires req.user to be set).
 *
 * @param {...string} allowedRoles - Roles that may access the route
 * @returns {Function} Express middleware
 */
export const authorizeRoles = (...allowedRoles) => (req, _res, next) => {
    if (!req.user) {
        return next(new ApiError(401, 'Not authenticated'));
    }
    if (!allowedRoles.includes(req.user.role)) {
        return next(new ApiError(403, 'You do not have permission to access this resource'));
    }
    next();
};
