import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const loginFormSchema = z.object({
	email: z.email(),
	password: z.string(),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const formId = useId();

	const onSubmit = (data: LoginFormSchema) => {
		console.log(data);
	};

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={`${formId}-email`}>Email</FieldLabel>
									<Input
										{...field}
										id={`${formId}-email`}
										type="email"
										aria-invalid={fieldState.invalid}
										placeholder="Enter your email"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={`${formId}-password`}>
										Password
									</FieldLabel>
									<Input
										{...field}
										id={`${formId}-password`}
										type="password"
										aria-invalid={fieldState.invalid}
										placeholder="Enter your password"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type="submit" form={formId}>
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
};
