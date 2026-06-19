import logger from '~config/logger/logger';
import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

/**
 * Conecta a MongoDB con retry logic y exponential backoff
 */
export const connectMongoDb = async (attempt = 1): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined');
    }

    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    logger.info('✅ Connected to MongoDB');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`❌ MongoDB connection failed (attempt ${attempt}/${MAX_RETRIES}): ${errorMsg}`);

    if (attempt < MAX_RETRIES) {
      const delay = RETRY_DELAY * attempt; // exponential backoff
      logger.info(`🔄 Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return connectMongoDb(attempt + 1);
    } else {
      logger.error('❌ Failed to connect to MongoDB after maximum retries');
      process.exit(1);
    }
  }
};

/**
 * Verificar si la conexión a MongoDB está activa
 */
export const isMongoConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};
