import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/config";
import { User } from "../models/userModel";
import { loginSchema, signupSchema } from "../schemas/authSchema";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { ValidationError } from "../utils/ValidationError";

const signToken = (id: string) => {
	return jwt.sign({ id }, config.jwtSecret, {
		expiresIn: config.jwtExpiresIn,
	});
};

const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const parsed = signupSchema.safeParse(req);

		if (!parsed.success) {
			return next(new ValidationError(parsed.error.issues));
		}

		const { passwordConfirm: _passwordConfirm, ...userData } = parsed.data.body;

		const newUser = await User.create(userData);

		const token = signToken(newUser._id.toString());

		res.status(201).json({
			token,
			user: newUser,
		});
	},
);

const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const parsed = loginSchema.safeParse(req);

		if (!parsed.success) {
			return next(new ValidationError(parsed.error.issues));
		}

		const { email, password } = parsed.data.body;

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.comparePassword(password, user.password))) {
			return next(new AppError("Incorrect email or password", 401));
		}

		const token = signToken(user._id.toString());
		const { password: _password, ...userData } = user.toObject();

		res.status(200).json({
			token,
			user: userData,
		});
	},
);

export default { signup, login };
