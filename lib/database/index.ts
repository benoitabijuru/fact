import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Better typing for the cached object
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Initialize cached object properly
const cached: CachedConnection = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  // Return existing connection if available
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  // Validate environment variable
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is missing');
  }

  try {
    // Create connection promise if it doesn't exist
    if (!cached.promise) {
      console.log('Creating new MongoDB connection...');
      
      cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: 'fact',
        bufferCommands: false,
        // Additional recommended options
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    // Wait for connection
    cached.conn = await cached.promise;
    
    // Store in global for reuse
    (global as any).mongoose = cached;
    
    console.log('Successfully connected to MongoDB');
    return cached.conn;
    
  } catch (error) {
    // Reset promise on error so next call can retry
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Optional: Add connection event listeners for better debugging
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});