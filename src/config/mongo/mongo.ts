import logger from "@config/logger/logger";
import mongoose from "mongoose";

export const connectMongoDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		logger.info("Connected to MongoDB");
	} catch (error) {
		logger.error("Error connecting to MongoDB", error);
	}
};
