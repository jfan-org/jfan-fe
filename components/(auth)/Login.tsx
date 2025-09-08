"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoginInput, loginSchema } from "@/lib/validation.auth";
import { AuthLayout } from "../layouts/AuthLayout";
import { CustomInput } from "../molecule/CustomInput";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/actions/auth.action";

export default function LoginPage() {
	const searchParams = useSearchParams();
	const message = searchParams.get("message");
	const [error, setError] = React.useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: LoginInput) => {
		try {
			setError("");
			const result = await signIn(data);

			if (result && !result.success) {
				setError(result.message || "Login failed");
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("An unexpected error occurred");
		}
	};

	return (
		<AuthLayout title="Login to your account" subtitle="Securely login to  JFAN ">
			{message && (
				<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
					<p className="text-sm text-green-700">{message}</p>
				</div>
			)}

			{error && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-sm text-red-700">{error}</p>
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
				<CustomInput
					label="Email or Phone Number"
					type="email"
					placeholder="Enter your email"
					{...register("email")}
					error={errors.email?.message}
				/>

				<CustomInput
					label="Password"
					type="password"
					placeholder="Enter your password"
					{...register("password")}
					error={errors.password?.message}
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
					{isSubmitting ? "Logging in..." : "LOG IN"}
				</Button>
			</form>

			<div className="mt-6 text-center space-y-4">
				<p className="text-sm text-gray-600">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="text-green-600 hover:text-green-700 font-medium">
						Register
					</Link>
				</p>

				<Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
					Forgot Password?
				</Link>
			</div>
		</AuthLayout>
	);
}
