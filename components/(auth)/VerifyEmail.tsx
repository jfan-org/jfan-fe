"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../layouts/AuthLayout";
import { CustomInput } from "../molecule/CustomInput";

import { Button } from "@/components/ui/button";
import { VerifyEmailInput, verifyEmailSchema } from "@/lib/validation.auth";
import { resendVerificationCode, verifyEmail } from "@/actions/auth.action";

export default function VerifyEmailPage() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email") || "";
	const [error, setError] = React.useState<string>("");
	const [resendMessage, setResendMessage] = React.useState<string>("");
	const [isResending, setIsResending] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<VerifyEmailInput>({
		resolver: zodResolver(verifyEmailSchema),
	});

	const onSubmit = async (data: VerifyEmailInput) => {
		try {
			setError("");
			const result = await verifyEmail(email, data);

			if (result && !result.success) {
				setError(result.message || "Verification failed");
			}
		} catch (error) {
			console.error("Verify email error:", error);
			setError("An unexpected error occurred");
		}
	};

	const handleResendCode = async () => {
		try {
			setIsResending(true);
			setError("");
			setResendMessage("");

			const result = await resendVerificationCode(email);

			if (result.success) {
				setResendMessage("Verification code sent successfully!");
			} else {
				setError(result.message || "Failed to resend code");
			}
		} catch (error) {
			console.error("Resend code error:", error);
			setError("An unexpected error occurred");
		} finally {
			setIsResending(false);
		}
	};

	return (
		<AuthLayout title="Verify your email" subtitle={`Enter the 6-digit code sent to ${email}`} showBackButton backHref="/signup">
			{error && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-sm text-red-700">{error}</p>
				</div>
			)}

			{resendMessage && (
				<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
					<p className="text-sm text-green-700">{resendMessage}</p>
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<CustomInput
					label="Verification Code"
					type="text"
					placeholder="Enter 6-digit code"
					maxLength={6}
					{...register("code")}
					error={errors.code?.message}
					className="text-center text-2xl tracking-widest"
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
					{isSubmitting ? "Verifying..." : "VERIFY EMAIL"}
				</Button>
			</form>

			{email && (
				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
					<button
						onClick={handleResendCode}
						disabled={isResending}
						className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50">
						{isResending ? "Sending..." : "Resend Code"}
					</button>
				</div>
			)}
		</AuthLayout>
	);
}
