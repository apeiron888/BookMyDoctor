/**
 * Wraps an async route handler so that rejected promises are forwarded
 * to Express's next() error handler instead of silently crashing.
 *
 * @param {Function} fn - Async Express route handler (req, res, next)
 * @returns {Function} Wrapped Express middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
