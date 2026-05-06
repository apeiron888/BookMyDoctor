import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { connectRedis } from './config/redis.js';
import app from './app.js';

const start = async () => {
    await connectDB();
    await connectRedis();

    app.listen(env.PORT, () => {
        console.log(`🚀 Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
};

start();
