import z from "zod";

const emailField = () => z.email("Invalid email address");

const passwordField = () =>
	z
		.string()
		.nonempty("Password is required")
		.superRefine((data, ctx) => {
			if (data.length === 0) return;

			const rules = [
				{
					valid: data.length >= 8,
					message: "Password must be at least 8 characters",
				},
				{
					valid: data.length <= 64,
					message: "Password must be at most 64 characters",
				},
				{
					valid: /[A-Z]/.test(data),
					message: "Password must contain at least one uppercase letter",
				},
				{
					valid: /[a-z]/.test(data),
					message: "Password must contain at least one lowercase letter",
				},
				{
					valid: /[0-9]/.test(data),
					message: "Password must contain at least one number",
				},
				{
					valid: /[^A-Za-z0-9]/.test(data),
					message: "Password must contain at least one special character",
				},
			];

			for (const rule of rules) {
				if (!rule.valid) {
					ctx.addIssue({ code: "custom", message: rule.message });
				}
			}
		});

export default { emailField, passwordField };
