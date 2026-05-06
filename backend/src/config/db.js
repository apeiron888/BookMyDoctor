import mongoose from 'mongoose';
import { env } from './env.js';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

/**
 * Connect to MongoDB with retry logic.
 * Retries up to MAX_RETRIES times with a fixed delay between attempts.
 */
export async function connectDB() {
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            await mongoose.connect(env.MONGO_URI, { dbName: env.DB_NAME });
            console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
            return;
        } catch (err) {
            retries += 1;
            console.error(
                `❌ MongoDB connection failed (attempt ${retries}/${MAX_RETRIES}): ${err.message}`
            );
            if (retries >= MAX_RETRIES) {
                console.error('🔴 Max retries reached. Exiting.');
                process.exit(1);
            }
            console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
            await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
        }
    }
}

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed (SIGINT)');
    process.exit(0);
});
