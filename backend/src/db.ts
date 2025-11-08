import mongoose from "mongoose";
import config from "./config/config";

export const connectDB = async () => {
	try {
		await mongoose.connect(config.database);
		console.log("🟢 MongoDB connected successfully!");
	} catch (err) {
		if (err instanceof Error) {
			console.error("🔴 MongoDB connection failed:", err.message);
		} else {
			console.error("🔴 MongoDB connection failed (unexpected error):", err);
		}
		process.exit(1);
	}
};
