import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";
import { ValidationError } from "../utils/ValidationError";

export const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json({
			message: err.message,
			issues: err.issues,
		});
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}

	console.error("🔴 Unknown error:", err);
	res.status(500).json({ message: "Internal Server Error" });
};
