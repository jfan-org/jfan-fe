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
import { AlertCircle, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validation-utils";
import { forgotPassword } from "@/actions/auth.action";

export function SimpleForgotPasswordForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: ForgotPasswordInput) => {
		try {
			setIsSubmitting(true);
			setSubmitError("");

			// Convert form data to FormData for server action
			const formData = new FormData();
			formData.append("email", data.email);

			const result = await forgotPassword(formData);

			if (result && result.success) {
				setIsSuccess(true);
			} else {
				setSubmitError(result?.message || "Failed to send reset email. Please try again.");
			}
		} catch (error) {
			console.error("Forgot password error:", error);
			setSubmitError("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSuccess) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="max-w-md mx-auto">
				<Card className="bg-gray-800 border-gray-700">
					<CardContent className="text-center py-8">
						<CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
						<h2 className="text-xl font-semibold text-white mb-2">Check Your Email</h2>
						<p className="text-gray-400 mb-6">
							We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the
							instructions to reset your password.
						</p>
						<Link href="/login">
							<Button className="bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90">
								Back to Login
							</Button>
						</Link>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="max-w-md mx-auto">
			<Card className="bg-gray-800 border-gray-700">
				<CardHeader className="text-center">
					<div className="text-4xl mb-4">=K</div>
					<CardTitle className="text-2xl text-white">Forgot Password</CardTitle>
					<p className="text-gray-400">Enter your email to receive a password reset link</p>
				</CardHeader>

				<CardContent>
					{submitError && (
						<Alert className="mb-6 border-red-500 bg-red-500/10">
							<AlertCircle className="h-4 w-4 text-red-500" />
							<AlertDescription className="text-red-400">{submitError}</AlertDescription>
						</Alert>
					)}

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-300 flex items-center">
											<Mail className="w-4 h-4 mr-2" />
											Email Address
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="Enter your email address"
												className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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
										Sending Reset Link...
									</>
								) : (
									"Send Reset Link"
								)}
							</Button>
						</form>
					</Form>

					<div className="mt-6 text-center">
						<Link
							href="/login"
							className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
