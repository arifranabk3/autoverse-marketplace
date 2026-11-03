import app from './app';
import { connectDatabase } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    if (process.env.MONGODB_URI) {
      await connectDatabase();
    } else {
      console.warn('[Warning] MONGODB_URI not found in environment. Server starting in API-only mode.');
    }

    app.listen(PORT, () => {
      console.log(`[Server] AUTOVERSE Backend running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
      console.log(`[Health] Health check endpoint: http://localhost:${PORT}/api/v1/health`);
    });
  } catch (error) {
    console.error('[Bootstrap Error] Failed to initialize server:', error);
    process.exit(1);
  }
}

bootstrap();
