import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { redisClient } from '../config/redis.js';
import { REFRESH_TOKEN_COOKIE } from '../utils/constants.js';

const REFRESH_KEY_PREFIX = 'refresh:';

/**
 * Generate a short-lived access token (15 min).
 * @param {{ id: string, role: string, email: string }} payload
 * @returns {string}
 */
export const generateAccessToken = (payload) =>
    jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN });

/**
 * Generate a long-lived refresh token (7 days) and store it in Redis.
 * @param {{ id: string, role: string, email: string }} payload
 * @returns {Promise<string>}
 */
export const generateRefreshToken = async (payload) => {
    const token = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });
    // Store in Redis with the same expiry (7 days = 604800 s)
    await redisClient.setex(`${REFRESH_KEY_PREFIX}${payload.id}`, 604800, token);
    return token;
};

/**
 * Verify a refresh token and check it exists in Redis.
 * @param {string} token
 * @returns {Promise<{ id: string, role: string, email: string }>}
 */
export const verifyRefreshToken = async (token) => {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    const stored = await redisClient.get(`${REFRESH_KEY_PREFIX}${decoded.id}`);
    if (stored !== token) {
        throw new Error('Refresh token is invalid or has been revoked');
    }
    return { id: decoded.id, role: decoded.role, email: decoded.email };
};

/**
 * Revoke a user's refresh token from Redis.
 * @param {string} userId
 */
export const revokeRefreshToken = async (userId) => {
    await redisClient.del(`${REFRESH_KEY_PREFIX}${userId}`);
};

/**
 * Attach the refresh token as an httpOnly cookie on the response.
 * @param {import('express').Response} res
 * @param {string} token
 */
export const setRefreshCookie = (res, token) => {
    res.cookie(REFRESH_TOKEN_COOKIE, token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
};

/**
 * Clear the refresh token cookie.
 * @param {import('express').Response} res
 */
export const clearRefreshCookie = (res) => {
    res.clearCookie(REFRESH_TOKEN_COOKIE, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
};
