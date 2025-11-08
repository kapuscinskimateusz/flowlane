import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

userSchema.methods.comparePassword = async function (
	candidatePassword: string,
) {
	return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
