import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    revokeRefreshToken,
} from './token.service.js';

/**
 * @param {{ name, email, password, phone? }} data
 * @returns {Promise<{ user, accessToken, refreshToken }>}
 */
export const register = async (data) => {
    const exists = await User.findOne({ email: data.email });
    if (exists) throw new ApiError(409, 'Email already in use');

    const user = await User.create(data);
    const payload = { id: user._id.toString(), role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return { user, accessToken, refreshToken };
};

/**
 * @param {{ email, password }} credentials
 * @returns {Promise<{ user, accessToken, refreshToken }>}
 */
export const login = async ({ email, password }) => {
    const user = await User.findOne({ email, isActive: true }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const payload = { id: user._id.toString(), role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return { user, accessToken, refreshToken };
};

/**
 * Rotate the refresh token: verify old one, issue new pair.
 * @param {string} oldRefreshToken
 * @returns {Promise<{ accessToken, refreshToken }>}
 */
export const refreshTokens = async (oldRefreshToken) => {
    const payload = await verifyRefreshToken(oldRefreshToken);
    const user = await User.findById(payload.id);
    if (!user || !user.isActive) throw new ApiError(401, 'User not found or inactive');

    const newPayload = { id: user._id.toString(), role: user.role, email: user.email };
    const accessToken = generateAccessToken(newPayload);
    const refreshToken = await generateRefreshToken(newPayload); // also overwrites in Redis

    return { accessToken, refreshToken };
};

/**
 * @param {string} userId
 */
export const logout = async (userId) => {
    await revokeRefreshToken(userId);
};
