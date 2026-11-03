import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sanitizes a MongoDB connection URI to mask username and password before logging.
 */
export function sanitizeMongoUri(uri: string): string {
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  } catch {
    return 'mongodb://****:****@masked';
  }
}

let isConnected = false;

export async function connectDatabase(customUri?: string): Promise<typeof mongoose> {
  const uri = customUri || process.env.MONGODB_URI;

  if (!uri) {
    const errorMsg = 'MONGODB_URI is not defined in environment variables. Please configure backend/.env';
    console.error(`[Database Error] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const maskedUri = sanitizeMongoUri(uri);
  console.log(`[Database] Initiating connection to MongoDB: ${maskedUri}`);

  try {
    const conn = await mongoose.connect(uri, {
      dbName: 'autoverse',
      autoIndex: process.env.NODE_ENV !== 'production',
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`[Database] MongoDB Connected successfully to database: "${conn.connection.name}"`);

    // Listen to connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error('[Database Connection Error]:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database Disconnected]: Lost connection to MongoDB.');
      isConnected = false;
    });

    return conn;
  } catch (error: any) {
    console.error(`[Database Error] Connection failed to ${maskedUri}:`, error.message || error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] Disconnected from MongoDB.');
  }
}

// Graceful process shutdown handler
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});
