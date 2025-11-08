import type { NextFunction, Request, Response } from "express";

import { User } from "../models/userModel";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

const createUser = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const newUser = await User.create(req.body);

		res.status(201).json({ user: newUser });
	},
);

const getAllUsers = catchAsync(
	async (_req: Request, res: Response, _next: NextFunction) => {
		const users = await User.find();

		res.status(200).json({ users });
	},
);

const getUserById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(req.params.id);

		if (!user) {
			return next(
				new AppError(`No user found with that ID: ${req.params.id}`, 404),
			);
		}

		res.status(200).json({ user });
	},
);

const updateUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findByIdAndUpdate(req.params.id);

		if (!user) {
			return next(
				new AppError(`No user found with that ID: ${req.params.id}`, 404),
			);
		}

		res.status(200).json({ user });
	},
);

const deleteUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			return next(
				new AppError(`No user found with that ID: ${req.params.id}`, 404),
			);
		}

		res.status(204).send();
	},
);

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser };
