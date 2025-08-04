"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession, updateTokens } from "@/actions/session";

import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/authFetch";
import {
	ForgotPasswordInput,
	forgotPasswordSchema,
	LoginInput,
	loginSchema,
	ResetPasswordInput,
	resetPasswordSchema,
	SignupInput,
	signupSchema,
	VerifyEmailInput,
	verifyEmailSchema,
} from "@/lib/validation.auth";

interface ActionResult {
	success?: boolean;
	message?: string;
	error?: string;
	data?: any;
}
export const getProfile = async () => {
	const response = await authFetch(`${NEXT_PUBLIC_BACKEND_URL}/users/me`);

	const result = await response.json();
	return result;
};

export const refreshToken = async (oldRefreshToken: string) => {
	try {
		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				refreshToken: oldRefreshToken,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to refresh token");
		}

		const { accessToken, refreshToken } = await response.json();

		console.log("refresh token endpoint called");
		await updateTokens({ accessToken, refreshToken });

		return accessToken;
	} catch (err) {
		console.error("Refresh Token failed:", err);
		return null;
	}
};
export async function signUp(formData: SignupInput): Promise<ActionResult> {
	try {
		// Validate input data
		const validatedData = signupSchema.parse(formData);

		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: validatedData.firstName,
				lastName: validatedData.lastName,
				email: validatedData.email,
				password: validatedData.password,
			}),
		});

		if (response.ok) {
			const result = await response.json();

			// Redirect to verify email page with email parameter
			redirect(`/verify-email?email=${encodeURIComponent(validatedData.email)}`);
		} else {
			const errorData = await response.json().catch(() => ({}));

			return {
				success: false,
				message: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		// Check if this is a redirect error (which is expected)
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error; // Re-throw redirect errors
		}

		console.error("Signup error:", error);
		return {
			success: false,
			message: "An unexpected error occurred. Please try again.",
		};
	}
}

export async function signIn(formData: LoginInput): Promise<ActionResult> {
	try {
		// Validate input data
		const validatedData = loginSchema.parse(formData);

		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: validatedData.email,
				password: validatedData.password,
			}),
		});

		if (response.ok) {
			const result = await response.json();
			const tokens = result.tokens;

			console.log(tokens.accessToken, "accesstoken");

			await createSession({
				user: {
					id: result.user.id,
					name: `${result?.user?.firstName} ${result?.user?.lastName}`,
					email: result.user.email,
					role: result.user.role,
				},
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
			});

			redirect("/redirect-user"); // page that takes user to appropriate dashboard page based on role
		} else {
			const errorData = await response.json().catch(() => ({}));

			return {
				success: false,
				message: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		// Check if this is a redirect error (which is expected)
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error; // Re-throw redirect errors
		}

		console.error("Signin error:", error);
		return {
			success: false,
			message: "An unexpected error occurred. Please try again.",
		};
	}
}

export async function forgotPassword(formData: ForgotPasswordInput): Promise<ActionResult> {
	try {
		// Validate input data
		const validatedData = forgotPasswordSchema.parse(formData);

		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: validatedData.email,
			}),
		});

		if (response.ok) {
			return {
				success: true,
				message: "Password reset link sent to your email!",
			};
		} else {
			const errorData = await response.json().catch(() => ({}));

			return {
				success: false,
				message:
					response.status === 404
						? "No account found with this email address."
						: errorData.message || response.statusText,
			};
		}
	} catch (error) {
		console.error("Forgot password error:", error);
		return {
			success: false,
			message: "An unexpected error occurred. Please try again.",
		};
	}
}

export async function resetPassword(token: string, formData: ResetPasswordInput): Promise<ActionResult> {
	try {
		// Validate input data
		const validatedData = resetPasswordSchema.parse(formData);

		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token,
				password: validatedData.password,
			}),
		});

		if (response.ok) {
			redirect("/login?message=Password reset successfully. Please login with your new password.");
		} else {
			const errorData = await response.json().catch(() => ({}));

			return {
				success: false,
				message: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		// Check if this is a redirect error (which is expected)
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error; // Re-throw redirect errors
		}

		console.error("Reset password error:", error);
		return {
			success: false,
			message: "An unexpected error occurred. Please try again.",
		};
	}
}

export async function verifyEmail(email: string, formData: VerifyEmailInput): Promise<ActionResult> {
	console.log("Very email called", "unexpected");
	try {
		// Validate input data
		const validatedData = verifyEmailSchema.parse(formData);

		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				code: validatedData.code,
			}),
		});

		if (response.ok) {
			redirect("/login?message=Email verified successfully! Please login to continue.");
		} else {
			const errorData = await response.json().catch(() => ({}));

			return {
				success: false,
				message: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		// Check if this is a redirect error (which is expected)
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error; // Re-throw redirect errors
		}

		console.error("Verify email error:", error);
		return {
			success: false,
			message: "An unexpected error occurred. Please try again.",
		};
	}
}

export async function resendVerificationCode(email: string): Promise<ActionResult> {
	console.log("email request", email, process.env.BACKEND_URL);
	try {
		const response = await fetch(`${process.env.BACKEND_URL}/auth/resend-verification-code`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
			}),
		});

		if (response.ok) {
			return {
				success: true,
				message: "Verification code sent successfully!",
			};
		} else {
			const errorData = await response.json().catch(() => ({}));

			return {
				success: false,
				message:
					response.status === 404
						? "No account found with this email address."
						: response.status === 429
						? "Too many requests. Please wait before requesting another code."
						: errorData.message || response.statusText,
			};
		}
	} catch (error) {
		console.error("Resend verification code error:", error);
		return {
			success: false,
			message: "An unexpected error occurred. Please try again.",
		};
	}
}

export async function signOut(): Promise<void> {
	try {
		// Call backend logout endpoint if needed
		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// Include authorization header if needed
				// "Authorization": `Bearer ${accessToken}`,
			},
		});

		// Delete local session regardless of backend response
		await deleteSession();

		redirect("/login");
	} catch (error) {
		// Check if this is a redirect error (which is expected)
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error; // Re-throw redirect errors
		}

		console.error("Signout error:", error);
		// Still delete local session even if backend call fails
		await deleteSession();
		redirect("/login");
	}
}

// Helper function to handle API errors consistently
function handleApiError(response: Response, errorData: any): string {
	switch (response.status) {
		case 400:
			return errorData.message || "Bad request. Please check your input.";
		case 401:
			return "Invalid credentials.";
		case 403:
			return "Access forbidden.";
		case 404:
			return "Resource not found.";
		case 409:
			return "Resource already exists.";
		case 429:
			return "Too many requests. Please try again later.";
		case 500:
			return "Server error. Please try again later.";
		default:
			return errorData.message || response.statusText || "An unexpected error occurred.";
	}
}
