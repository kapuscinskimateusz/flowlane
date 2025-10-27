import mongoose from "mongoose";

import app from "./app";
import config from "./config/config";

mongoose.connect(config.database).then(() => {
	console.log("Successfully connected to the database");
});

app.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`);
});
