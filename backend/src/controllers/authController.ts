import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/config";
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

		const { passwordConfirm: _passwordConfirm, ...userData } = parsed.data.body;

		const newUser = await User.create(userData);

		const token = jwt.sign({ id: newUser._id }, config.jwtSecret, {
			expiresIn: config.jwtExpiresIn,
		});

		res.status(201).json({
			token,
			user: newUser,
		});
	},
);

export default { signup };
