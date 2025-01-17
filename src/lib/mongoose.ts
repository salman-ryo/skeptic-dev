import mongoose, { Connection, Mongoose } from 'mongoose';

// Define interface for cached connection
interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Mongoose> | null;
}

// Define interface for global with mongoose
interface GlobalWithMongoose extends Global {
  mongoose?: CachedConnection;
}

// Type-safe way to access global object
declare const global: GlobalWithMongoose;

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the NEXT_PUBLIC_MONGO_URI environment variable inside .env.local'
  );
  
}

// Cache object in global scope
let cached: CachedConnection = global.mongoose ?? {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

// Connection options for better performance
const options = {
  bufferCommands: true,
  autoIndex: true,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  family: 4, // Use IPv4, skip trying IPv6
};

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string, options)
      .then((mongoose) => mongoose);
  }

  try {
    const mongoose = await cached.promise;
    cached.conn = mongoose.connection;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}