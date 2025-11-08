import z from "zod";

import validators from "./validators";

export const signupSchema = z
	.object({
		body: z.strictObject({
			name: z.string().min(2, "Name must be at least 2 characters"),
			email: validators.emailField(),
			password: validators.passwordField(),
			passwordConfirm: z.string(),
		}),
	})
	.superRefine((data, ctx) => {
		const passwordHasErrors = ctx.issues.some(
			({ path }) => path?.join(".") === "body.password",
		);

		if (passwordHasErrors) return;

		const { password, passwordConfirm } = data.body;

		if (passwordConfirm.length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "Password confirm is required",
				path: ["body", "passwordConfirm"],
			});

			return;
		}

		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: "custom",
				message: "Passwords must be the same",
				path: ["body", "passwordConfirm"],
			});
		}
	});

export const loginSchema = z.object({
	body: z.object({
		email: validators.emailField(),
		password: z.string().nonempty("Password is required"),
	}),
});
