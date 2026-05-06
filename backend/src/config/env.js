import 'dotenv/config';

const required = (key) => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required environment variable: ${key}`);
    return value;
};

export const env = {
    PORT: parseInt(process.env.PORT || '5000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',

    MONGO_URI: required('MONGO_URI'),
    DB_NAME: process.env.DB_NAME || 'hams',

    REDIS_URL: required('REDIS_URL'),

    ACCESS_TOKEN_SECRET: required('ACCESS_TOKEN_SECRET'),
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    REFRESH_TOKEN_SECRET: required('REFRESH_TOKEN_SECRET'),
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',

    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost',

    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '20', 10),
};
