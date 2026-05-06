import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

/**
 * Global Express error handler. Must be registered last in app.js.
 * Normalises all errors to a consistent JSON shape.
 *
 * @type {import('express').ErrorRequestHandler}
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
    // Log stack in development only
    if (env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Known ApiError
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(err.toJSON());
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        return res.status(409).json({
            success: false,
            message: `${field} already exists`,
            errors: [],
            statusCode: 409,
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors,
            statusCode: 422,
        });
    }

    // Generic fallback
    return res.status(500).json({
        success: false,
        message: env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        errors: [],
        statusCode: 500,
    });
};
