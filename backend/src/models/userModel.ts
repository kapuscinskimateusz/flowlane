import bcrypt from "bcrypt";
import mongoose, { type Model } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
}

interface UserMethods {
	comparePassword(
		candidatePassword: string,
		userPassword: string,
	): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser, Model<IUser>, UserMethods>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	next();
});

userSchema.methods.comparePassword = async (
	candidatePassword: string,
	userPassword: string,
) => {
	return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model("User", userSchema);
