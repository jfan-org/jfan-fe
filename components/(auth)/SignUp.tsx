"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SignupInput, signupSchema } from "@/lib/validation.auth";
import { AuthLayout } from "../layouts/AuthLayout";
import { CustomInput } from "../molecule/CustomInput";
import { signUp } from "@/actions/auth.action";

export default function SignupPage() {
	const [error, setError] = React.useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupInput>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: SignupInput) => {
		try {
			setError("");
			const result = await signUp(data);

			if (result && !result.success) {
				setError(result.message || "Signup failed");
			}
		} catch (error) {
			console.error("Signup error:", error);
			setError("An unexpected error occurred");
		}
	};

	return (
		<AuthLayout title="Create your account" subtitle="Join thousands of Africans, Land your dream Job">
			{error && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-sm text-red-700">{error}</p>
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<CustomInput
						label="First Name"
						type="text"
						placeholder="First name"
						{...register("firstName")}
						error={errors.firstName?.message}
					/>

					<CustomInput
						label="Last Name"
						type="text"
						placeholder="Last name"
						{...register("lastName")}
						error={errors.lastName?.message}
					/>
				</div>

				<CustomInput
					label="Email Address"
					type="email"
					placeholder="Enter your email"
					{...register("email")}
					error={errors.email?.message}
				/>

				<CustomInput
					label="Password"
					type="password"
					placeholder="Create a password"
					{...register("password")}
					error={errors.password?.message}
				/>

				<CustomInput
					label="Confirm Password"
					type="password"
					placeholder="Confirm your password"
					{...register("confirmPassword")}
					error={errors.confirmPassword?.message}
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
					{isSubmitting ? "Creating Account..." : "CREATE ACCOUNT"}
				</Button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					Already have an account?{" "}
					<Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
						Login
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
