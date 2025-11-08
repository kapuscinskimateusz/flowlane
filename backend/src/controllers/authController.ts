import type { NextFunction, Request, Response } from "express";

import { User } from "../models/userModel";
import { signupSchema } from "../schemas/authSchema";
import { catchAsync } from "../utils/catchAsync";
import { ValidationError } from "../utils/ValidationError";

const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const parsed = signupSchema.safeParse(req);

		if (!parsed.success) {
			return next(new ValidationError(parsed.error.issues));
		}

		const newUser = await User.create(req.body);

		res.status(201).json(newUser);
	},
);

export default { signup };
