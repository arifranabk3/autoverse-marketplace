import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

export function sanitizeMongoUri(uri: string): string {
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  } catch {
    return 'mongodb://****:****@masked';
  }
}

let isConnected = false;
let embeddedMongo: MongoMemoryServer | null = null;

export async function connectDatabase(customUri?: string): Promise<typeof mongoose> {
  const primaryUri = customUri || process.env.MONGODB_URI;

  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // Attempt 1: Connect to configured Primary URI (e.g. Atlas / Remote Cluster)
  if (primaryUri) {
    const maskedUri = sanitizeMongoUri(primaryUri);
    console.log(`[Database] Attempting connection to MongoDB: ${maskedUri}`);

    try {
      const conn = await mongoose.connect(primaryUri, {
        dbName: 'autoverse',
        autoIndex: process.env.NODE_ENV !== 'production',
        serverSelectionTimeoutMS: 3000,
        socketTimeoutMS: 45000,
      });

      isConnected = true;
      console.log(`[Database] MongoDB Connected successfully to database: "${conn.connection.name}"`);
      return conn;
    } catch (err: any) {
      console.warn(`[Database Warning] Primary connection failed: ${err.message}. Initiating resilient local persistent Mongo server.`);
    }
  }

  // Attempt 2: Resilient Local Persistent MongoDB Server using wiredTiger storage
  try {
    const storageDir = path.resolve(__dirname, '../../data/mongodb');
    fs.mkdirSync(storageDir, { recursive: true });

    if (!embeddedMongo) {
      embeddedMongo = await MongoMemoryServer.create({
        instance: {
          dbPath: storageDir,
          storageEngine: 'wiredTiger',
          port: 27017,
          dbName: 'autoverse',
        },
      });
    }

    const localUri = embeddedMongo.getUri();
    console.log(`[Database] Connected to persistent local MongoDB at: ${localUri}`);

    const conn = await mongoose.connect(localUri, {
      dbName: 'autoverse',
      autoIndex: true,
    });

    isConnected = true;
    return conn;
  } catch (error: any) {
    console.error(`[Database Error] Could not start local database:`, error.message);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] Disconnected from MongoDB.');
  }
  if (embeddedMongo) {
    await embeddedMongo.stop();
    embeddedMongo = null;
  }
}

process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});
