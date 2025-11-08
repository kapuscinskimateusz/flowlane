import express from "express";

import { connectDB } from "./db";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";
import { AppError } from "./utils/AppError";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use((req, _res, next) => {
	next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

export default app;
