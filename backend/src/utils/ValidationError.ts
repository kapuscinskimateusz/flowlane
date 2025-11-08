import type { ZodError } from "zod";

import { AppError } from "./AppError";

export class ValidationError extends AppError {
	issues: ZodError["issues"];

	constructor(issues: ZodError["issues"], statusCode = 400) {
		super("Invalid input data", statusCode);

		this.issues = issues;
	}
}
