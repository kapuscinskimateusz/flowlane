import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import itemRoutes from "./routes/itemRoutes";

const app = express();

app.use(express.json());

app.use("/api/items", itemRoutes);

app.use(errorHandler);

export default app;
