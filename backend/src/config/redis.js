import Redis from 'ioredis';
import { env } from './env.js';

export const redisClient = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: null,
});

redisClient.on('connect', () => console.log('✅ Redis connected'));
redisClient.on('error', (err) => console.error('❌ Redis error:', err.message));

export async function connectRedis() {
    await redisClient.connect();
}
