"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Mail, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";

import { verifyEmailSchema, VerifyEmailInput } from "@/lib/validation.auth";
import { verifyEmail, resendVerificationCode } from "@/actions/auth.action";

function VerifyEmailContent() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email") || "";
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");
	const [resendMessage, setResendMessage] = useState<string>("");

	const form = useForm<VerifyEmailInput>({
		resolver: zodResolver(verifyEmailSchema),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = async (data: VerifyEmailInput) => {
		try {
			setIsSubmitting(true);
			setSubmitError("");

			const result = await verifyEmail(email, data);

			if (result && !result.success) {
				setSubmitError(result.message || "Verification failed. Please try again.");
			}
			// If successful, the server action will redirect
		} catch (error) {
			console.error("Email verification error:", error);
			setSubmitError("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResendCode = async () => {
		try {
			setIsResending(true);
			setResendMessage("");
			setSubmitError("");

			const result = await resendVerificationCode(email);

			if (result && result.success) {
				setResendMessage("Verification code sent successfully!");
			} else {
				setSubmitError(result?.message || "Failed to resend verification code.");
			}
		} catch (error) {
			console.error("Resend verification error:", error);
			setSubmitError("An unexpected error occurred while resending the code.");
		} finally {
			setIsResending(false);
		}
	};

	if (!email) {
		return (
			<AuthLayout title="Invalid Link" subtitle="Missing email parameter">
				<div className="text-center space-y-4">
					<p className="text-red-600">No email address provided. Please check your verification link.</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/signup">
							<Button variant="outline">Back to Signup</Button>
						</Link>
						<Link href="/login">
							<Button className="bg-green-600 hover:bg-green-700">Go to Login</Button>
						</Link>
					</div>
				</div>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout 
			title="Verify your email" 
			subtitle={`Enter the 6-digit code sent to ${email}`}
			showBackToHome={false}
		>
			<div className="max-w-md mx-auto">
				<Card className="bg-white border border-gray-200">
					<CardHeader className="text-center">
						<div className="text-4xl mb-4">📧</div>
						<CardTitle className="text-xl text-gray-900">Enter Verification Code</CardTitle>
						<p className="text-gray-600 text-sm">
							We&apos;ve sent a 6-digit verification code to your email address.
						</p>
					</CardHeader>

					<CardContent>
						{submitError && (
							<Alert className="mb-6 border-red-500 bg-red-50">
								<AlertCircle className="h-4 w-4 text-red-500" />
								<AlertDescription className="text-red-600">{submitError}</AlertDescription>
							</Alert>
						)}

						{resendMessage && (
							<Alert className="mb-6 border-green-500 bg-green-50">
								<Mail className="h-4 w-4 text-green-500" />
								<AlertDescription className="text-green-600">{resendMessage}</AlertDescription>
							</Alert>
						)}

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-700">Verification Code</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter 6-digit code"
													maxLength={6}
													className="text-center text-lg tracking-widest font-mono border-gray-300 focus:border-green-500 focus:ring-green-500"
													autoFocus
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-green-600 hover:bg-green-700 text-white">
									{isSubmitting ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Verifying...
										</>
									) : (
										"Verify Email"
									)}
								</Button>
							</form>
						</Form>

						<div className="mt-6 text-center">
							<p className="text-gray-500 text-sm mb-2">Didn&apos;t receive the code?</p>
							<Button
								type="button"
								variant="ghost"
								onClick={handleResendCode}
								disabled={isResending}
								className="text-green-600 hover:text-green-700 hover:bg-green-50">
								{isResending ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Resending...
									</>
								) : (
									<>
										<RefreshCw className="w-4 h-4 mr-2" />
										Resend Code
									</>
								)}
							</Button>
						</div>

						<div className="mt-4 text-center">
							<p className="text-gray-500 text-xs">
								Already verified?{" "}
								<Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
									Login here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</AuthLayout>
	);
}

export default function VerifyEmailPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyEmailContent />
		</Suspense>
	);
}