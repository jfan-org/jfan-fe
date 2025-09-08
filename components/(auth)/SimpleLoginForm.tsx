"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

import { loginSchema, LoginInput } from "@/lib/validation-utils";
import { login } from "@/actions/auth.action";
// import { toast, showFormError, handleFormSubmission } from "@/lib/toast";

interface SimpleLoginFormProps {
	onSuccess?: () => void;
}

export function SimpleLoginForm({ onSuccess }: SimpleLoginFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	// const [submitError, setSubmitError] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginInput) => {
		try {
			setIsSubmitting(true);
			setSubmitError("");

			// Convert form data to FormData for server action
			const formData = new FormData();
			formData.append("email", data.email);
			formData.append("password", data.password);

			await handleFormSubmission(
				async () => {
					const result = await login(formData);
					if (result && !result.success) {
						throw new Error(result.error || result.message || "Login failed");
					}
					return result;
				},
				{
					loading: "Signing you in...",
					success: "Welcome back! Redirecting...",
					error: "Login failed. Please check your credentials.",
				}
			);

			onSuccess?.();
		} catch (error) {
			// Error is already handled by toast system
			console.error("Login error:", error);
		} finally {
			setIsSubmitting(false);
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
					<CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
					<p className="text-gray-400">Sign in to your JFAN account</p>
				</CardHeader>

				<CardContent>
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

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-300 flex items-center">
											<Lock className="w-4 h-4 mr-2" />
											Password
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													{...field}
													type={showPassword ? "text" : "password"}
													placeholder="Enter your password"
													className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
												/>
												<button
													type="button"
													onClick={() => setShowPassword(!showPassword)}
													className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
													{showPassword ? (
														<EyeOff className="w-4 h-4" />
													) : (
														<Eye className="w-4 h-4" />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>

							<div className="flex items-center justify-between">
								<Link
									href="/forgot-password"
									className="text-sm text-green-400 hover:text-green-300 transition-colors">
									Forgot your password?
								</Link>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90">
								{isSubmitting ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Signing In...
									</>
								) : (
									"Sign In"
								)}
							</Button>
						</form>
					</Form>

					<div className="mt-6 text-center">
						<p className="text-gray-400">
							Don&apos;t have an account?{" "}
							<Link href="/register" className="text-green-400 hover:text-green-300 transition-colors">
								Sign up here
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
