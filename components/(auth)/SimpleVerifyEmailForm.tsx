"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, Mail, Loader2, RefreshCw } from "lucide-react";

import { verifyEmailSchema, VerifyEmailInput } from "@/lib/validation.auth";
import { verifyEmail, resendVerificationCode } from "@/actions/auth.action";

interface SimpleVerifyEmailFormProps {
	email: string;
}

export function SimpleVerifyEmailForm({ email }: SimpleVerifyEmailFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");
	const [resendMessage, setResendMessage] = useState<string>("");

	const form = useForm<VerifyEmailInput>({
		resolver: zodResolver(verifyEmailSchema),
		defaultValues: {
			email,
			code: "",
		},
	});

	const onSubmit = async (data: VerifyEmailInput) => {
		try {
			setIsSubmitting(true);
			setSubmitError("");

			const result = await verifyEmail(data.email, data);

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

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="max-w-md mx-auto">
			<Card className="bg-gray-800 border-gray-700">
				<CardHeader className="text-center">
					<div className="text-4xl mb-4">=K</div>
					<CardTitle className="text-2xl text-white">Verify Your Email</CardTitle>
					<p className="text-gray-400">
						We&apos;ve sent a 6-digit verification code to <br />
						<span className="text-green-400">{email}</span>
					</p>
				</CardHeader>

				<CardContent>
					{submitError && (
						<Alert className="mb-6 border-red-500 bg-red-500/10">
							<AlertCircle className="h-4 w-4 text-red-500" />
							<AlertDescription className="text-red-400">{submitError}</AlertDescription>
						</Alert>
					)}

					{resendMessage && (
						<Alert className="mb-6 border-green-500 bg-green-500/10">
							<Mail className="h-4 w-4 text-green-500" />
							<AlertDescription className="text-green-400">{resendMessage}</AlertDescription>
						</Alert>
					)}

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-300">Verification Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter 6-digit code"
												maxLength={6}
												className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-center text-lg tracking-widest"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90">
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
						<p className="text-gray-400 text-sm mb-2">Didn&apos;t receive the code?</p>
						<Button
							type="button"
							variant="ghost"
							onClick={handleResendCode}
							disabled={isResending}
							className="text-green-400 hover:text-green-300 hover:bg-green-400/10">
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
				</CardContent>
			</Card>
		</motion.div>
	);
}
