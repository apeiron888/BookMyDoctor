/**
 * Custom API error class for consistent error responses.
 * @extends Error
 */
export class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Human-readable error message
     * @param {Array} [errors=[]] - Optional array of field-level errors (e.g. Zod issues)
     */
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            success: false,
            message: this.message,
            errors: this.errors,
            statusCode: this.statusCode,
        };
    }
}
