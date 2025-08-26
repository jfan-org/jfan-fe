// app/verify-email/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/constants";
import { resendVerificationCode } from "@/actions/auth.action";

export default function VerifyEmailPage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Get params from URL
	const token = searchParams.get("token");
	const email = searchParams.get("email");

	// Debug logs
	console.log("VerifyEmailPage - token:", token);
	console.log("VerifyEmailPage - email:", email);

	const [isVerifying, setIsVerifying] = useState(false);
	const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [isResending, setIsResending] = useState(false);
	const [resendMessage, setResendMessage] = useState("");
	const [resendError, setResendError] = useState("");

	useEffect(() => {
		// Only attempt verification if we have BOTH token and email
		if (token && email) {
			console.log("Attempting verification with token and email");
			performVerification();
		}
	}, [token, email]);

	const performVerification = async () => {
		setIsVerifying(true);
		setVerificationStatus(null);
		setErrorMessage("");

		try {
			const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token,
				}),
			});

			if (response.ok) {
				setVerificationStatus("success");
				// Redirect to login after 2 seconds
				setTimeout(() => {
					router.push("/login?message=Email verified successfully! Please login to start onboarding.");
				}, 2000);
			} else {
				const errorData = await response.json().catch(() => ({}));
				setVerificationStatus("error");
				setErrorMessage(errorData.message || "Failed to verify email. The link may be expired or invalid.");
			}
		} catch (error) {
			console.error("Verification error:", error);
			setVerificationStatus("error");
			setErrorMessage("An unexpected error occurred. Please try again.");
		} finally {
			setIsVerifying(false);
		}
	};

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

	// Case 1: We have email but no token (coming from signup)
	if (email && !token) {
		return (
			<AuthLayout title="Check your email" subtitle="We've sent you a verification link">
				<div className="w-full space-y-6">
					<div className="bg-green-50 border border-green-200 rounded-lg p-6">
						<div className="flex items-start space-x-3">
							<svg
								className="w-6 h-6 text-green-600 mt-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
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
								<p className="mt-1 font-medium text-green-800">{decodeURIComponent(email)}</p>
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

						<Button
							onClick={handleResendVerification}
							disabled={isResending}
							variant="outline"
							className="w-full">
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

	// Case 2: We have token but no email
	if (token && !email) {
		return (
			<AuthLayout title="Complete Email Verification" subtitle="Please enter your email address to complete verification">
				<EmailInputForm token={token} />
			</AuthLayout>
		);
	}

	// Case 3: We have both token and email - show verification status
	if (token && email) {
		// Verifying
		if (isVerifying) {
			return (
				<AuthLayout title="Verifying Email..." subtitle="Please wait while we verify your email address">
					<div className="w-full space-y-6">
						<div className="flex flex-col items-center space-y-4">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
							<p className="text-gray-600">Verifying your email...</p>
						</div>
					</div>
				</AuthLayout>
			);
		}

		// Success
		if (verificationStatus === "success") {
			return (
				<AuthLayout title="Email Verified!" subtitle="">
					<div className="w-full space-y-6">
						<div className="flex flex-col items-center space-y-4">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<p className="text-green-600 text-center">
								Email verified successfully! Redirecting to login...
							</p>
						</div>
					</div>
				</AuthLayout>
			);
		}

		// Error
		if (verificationStatus === "error") {
			return (
				<AuthLayout title="Verification Failed" subtitle="">
					<div className="w-full space-y-6">
						<div className="flex flex-col items-center space-y-4">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-red-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</div>
							<p className="text-red-600 text-center">{errorMessage}</p>
							<div className="flex flex-col sm:flex-row gap-4 mt-4">
								<Link href="/signup">
									<Button variant="outline">Back to Signup</Button>
								</Link>
								<Button
									onClick={handleResendVerification}
									disabled={isResending}
									className="bg-green-600 hover:bg-green-700">
									{isResending ? "Resending..." : "Resend Verification Email"}
								</Button>
							</div>
						</div>
					</div>
				</AuthLayout>
			);
		}
	}

	// Case 4: No token and no email - invalid link
	return (
		<AuthLayout title="Invalid Verification Link" subtitle="">
			<div className="w-full space-y-6">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
						<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</div>
					<p className="text-red-600 text-center">Invalid verification link. Missing required parameters.</p>
					<div className="flex flex-col sm:flex-row gap-4 mt-4">
						<Link href="/signup">
							<Button variant="outline">Back to Signup</Button>
						</Link>
						<Link href="/login">
							<Button className="bg-green-600 hover:bg-green-700">Go to Login</Button>
						</Link>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
}

// Component for entering email when we have token but no email
function EmailInputForm({ token }: { token: string }) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setError("Please enter your email address");
			return;
		}

		setIsSubmitting(true);
		setError("");

		try {
			const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					token,
				}),
			});

			if (response.ok) {
				router.push("/login?message=Email verified successfully! Please login to start onboarding.");
			} else {
				const errorData = await response.json().catch(() => ({}));
				setError(errorData.message || "Failed to verify email");
			}
		} catch (error) {
			console.error("Verification error:", error);
			setError("An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full space-y-6">
			<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
				<p className="text-sm text-yellow-700">
					We have your verification token but need your email address to complete the process.
				</p>
			</div>

			{error && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-sm text-red-700">{error}</p>
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						placeholder="Enter your email address"
						required
						autoFocus
					/>
				</div>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
					{isSubmitting ? "Verifying..." : "VERIFY EMAIL"}
				</Button>
			</form>

			<div className="text-center">
				<p className="text-sm text-gray-600">
					Already verified?{" "}
					<Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
}
