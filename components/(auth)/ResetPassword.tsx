"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../layouts/AuthLayout";
import { CustomInput } from "../molecule/CustomInput";

import { Button } from "@/components/ui/button";
import { ResetPasswordInput, resetPasswordSchema } from "@/lib/validation.auth";

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
	});

	const onSubmit = async (data: ResetPasswordInput) => {
		try {
			console.log("Reset password data:", data);
			// Implement your reset password logic here
			// await resetPassword(token, data.password)
		} catch (error) {
			console.error("Reset password error:", error);
		}
	};

	if (!token) {
		return (
			<AuthLayout
				title="Invalid reset link"
				subtitle="This password reset link is invalid or has expired"
				showBackButton
				backHref="/forgot-password">
				<div className="text-center">
					<Button
						onClick={() => (window.location.href = "/forgot-password")}
						className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
						Request New Reset Link
					</Button>
				</div>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout title="Reset your password" subtitle="Enter your new password below" showBackButton backHref="/login">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<CustomInput
					label="New Password"
					type="password"
					placeholder="Enter new password"
					{...register("password")}
					error={errors.password?.message}
				/>

				<CustomInput
					label="Confirm New Password"
					type="password"
					placeholder="Confirm new password"
					{...register("confirmPassword")}
					error={errors.confirmPassword?.message}
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
					{isSubmitting ? "Resetting..." : "RESET PASSWORD"}
				</Button>
			</form>
		</AuthLayout>
	);
}
