import express from "express";

import { errorHandler } from "./middlewares/errorHandler";
import itemRoutes from "./routes/itemRoutes";
import { AppError } from "./utils/AppError";

const app = express();

app.use(express.json());

app.use("/api/items", itemRoutes);

app.use((req, _res, next) => {
	next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

export default app;
