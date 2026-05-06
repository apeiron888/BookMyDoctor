import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redisClient } from '../config/redis.js';
import { env } from '../config/env.js';

/**
 * Redis-backed rate limiter for auth routes.
 * 20 requests per minute per IP by default (configurable via env).
 */
export const authRateLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args),
    }),
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        statusCode: 429,
    },
    keyGenerator: (req) => req.ip,
});
