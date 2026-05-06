import { ApiError } from '../utils/ApiError.js';

/**
 * Middleware factory: validate request data against a Zod schema.
 *
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 * @param {'body'|'params'|'query'} [target='body'] - Part of the request to validate
 * @returns {Function} Express middleware
 */
export const validate = (schema, target = 'body') => (req, _res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));
        return next(new ApiError(422, 'Validation failed', errors));
    }

    req[target] = result.data; // replace with parsed + cleaned data
    next();
};
