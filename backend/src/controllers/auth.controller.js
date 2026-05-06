import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/auth.service.js';
import { setRefreshCookie, clearRefreshCookie } from '../services/token.service.js';
import { REFRESH_TOKEN_COOKIE } from '../utils/constants.js';
import { ApiError } from '../utils/ApiError.js';

export const register = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    setRefreshCookie(res, refreshToken);
    res.status(201).json({ success: true, user, accessToken });
});

export const login = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    setRefreshCookie(res, refreshToken);
    res.json({ success: true, user, accessToken });
});

export const refresh = asyncHandler(async (req, res) => {
    const token = req.cookies?.[REFRESH_TOKEN_COOKIE];
    if (!token) throw new ApiError(401, 'Refresh token missing');

    const { accessToken, refreshToken } = await authService.refreshTokens(token);
    setRefreshCookie(res, refreshToken);
    res.json({ success: true, accessToken });
});

export const logout = asyncHandler(async (req, res) => {
    // if user authenticated via verifyJWT, use req.user.id, otherwise try cookie
    const userId = req.user?.id;
    if (userId) await authService.logout(userId);
    clearRefreshCookie(res);
    res.json({ success: true, message: 'Logged out' });
});
