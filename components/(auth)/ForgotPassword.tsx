"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../layouts/AuthLayout";
import { CustomInput } from "../molecule/CustomInput";

import { Button } from "@/components/ui/button";
import { ForgotPasswordInput, forgotPasswordSchema } from "@/lib/validation.auth";
import { forgotPassword } from "@/actions/auth.action";

export default function ForgotPasswordPage() {
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [error, setError] = React.useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data: ForgotPasswordInput) => {
		try {
			setError("");
			const result = await forgotPassword(data);

			if (result.success) {
				setIsSubmitted(true);
			} else {
				setError(result.message || "Failed to send reset link");
			}
		} catch (error) {
			console.error("Forgot password error:", error);
			setError("An unexpected error occurred");
		}
	};

	if (isSubmitted) {
		return (
			<AuthLayout
				title="Check your email"
				subtitle="We've sent a password reset link to your email"
				showBackButton
				backHref="/login">
				<div className="text-center space-y-6">
					<div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
						<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					</div>

					<div>
						<p className="text-gray-600 mb-4">
							We've sent a password reset link to <strong>{getValues("email")}</strong>
						</p>
						<p className="text-sm text-gray-500">
							Didn't receive the email? Check your spam folder or try again.
						</p>
					</div>

					<Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full h-12">
						Try Again
					</Button>
				</div>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout
			title="Forgot your password?"
			subtitle="Enter your email and we'll send you a reset link"
			showBackButton
			backHref="/login">
			{error && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-sm text-red-700">{error}</p>
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<CustomInput
					label="Email Address"
					type="email"
					placeholder="Enter your email"
					{...register("email")}
					error={errors.email?.message}
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
					{isSubmitting ? "Sending..." : "SEND RESET LINK"}
				</Button>
			</form>
		</AuthLayout>
	);
}
