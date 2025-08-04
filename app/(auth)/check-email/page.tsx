// app/check-email/page.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { resendVerificationCode } from "@/actions/auth.action";

export default function CheckEmailPage() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email") || "";
	const [isResending, setIsResending] = React.useState(false);
	const [resendMessage, setResendMessage] = React.useState("");
	const [resendError, setResendError] = React.useState("");

	const handleResendVerification = async () => {
		if (!email) {
			setResendError("Email address is missing");
			return;
		}

		setIsResending(true);
		setResendMessage("");
		setResendError("");

		try {
			const result = await resendVerificationCode(email);

			if (result.success) {
				setResendMessage(result.message || "Verification email sent successfully!");
			} else {
				setResendError(result.message || "Failed to resend verification email");
			}
		} catch (error) {
			console.error("Resend verification error:", error);
			setResendError("An unexpected error occurred");
		} finally {
			setIsResending(false);
		}
	};

	return (
		<AuthLayout title="Check your email" subtitle="We've sent you a verification link">
			<div className="w-full space-y-6">
				<div className="bg-green-50 border border-green-200 rounded-lg p-6">
					<div className="flex items-start space-x-3">
						<svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<div className="flex-1">
							<h3 className="text-lg font-medium text-green-800">Verification email sent!</h3>
							<p className="mt-2 text-sm text-green-700">We've sent a verification link to:</p>
							<p className="mt-1 font-medium text-green-800">{email}</p>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div className="text-center text-sm text-gray-600">
						<p>Please check your email and click the verification link to activate your account.</p>
						<p className="mt-2">The link will expire in 24 hours.</p>
					</div>

					{resendMessage && (
						<div className="p-3 bg-green-50 border border-green-200 rounded-lg">
							<p className="text-sm text-green-700">{resendMessage}</p>
						</div>
					)}

					{resendError && (
						<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-700">{resendError}</p>
						</div>
					)}

					<Button onClick={handleResendVerification} disabled={isResending} variant="outline" className="w-full">
						{isResending ? "Resending..." : "Resend verification email"}
					</Button>

					<div className="text-center space-y-2">
						<p className="text-sm text-gray-600">Didn't receive the email? Check your spam folder.</p>
						<p className="text-sm text-gray-600">
							Already verified?{" "}
							<Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
								Login here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
}
