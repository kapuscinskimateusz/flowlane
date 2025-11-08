import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

type JsonExpiresIn = StringValue | number;

interface Config {
	port: number;
	nodeEnv: string;
	database: string;
	jwtSecret: string;
	jwtExpiresIn: JsonExpiresIn;
}

const config: Config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	database: process.env.DATABASE ?? "",
	jwtSecret: process.env.JWT_SECRET ?? "",
	jwtExpiresIn: (process.env.JWT_EXPIRES_IN || "90d") as JsonExpiresIn,
};

export default config;
