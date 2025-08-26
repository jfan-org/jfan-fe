"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession, updateTokens, getSession, completeOnboarding } from "@/actions/session";
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
import { UserType, UserRegistrationData } from "@/types/auth.types";
import { getRegistrationEndpoint } from "@/lib/user-types.config";
import { transformRegistrationData, handleApiError, handleAuthError, AuthResult } from "@/lib/auth-utils";

interface ActionResult {
	success?: boolean;
	message?: string;
	error?: string;
	data?: any;
}

// Onboarding data interface
interface OnboardingData {
	profileData?: any;
	locationData?: any;
	preferencesData?: any;
	skillsData?: any;
	[key: string]: any;
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
// Multi-type registration action
export async function registerUser(userType: UserType, formData: UserRegistrationData): Promise<AuthResult> {
	try {
		const endpoint = getRegistrationEndpoint(userType);
		const payload = transformRegistrationData(userType, formData);

		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (response.ok) {
			const result = await response.json();
			redirect(`/verify-email?email=${encodeURIComponent(formData.email)}`);
		} else {
			const errorData = await response.json().catch(() => ({}));
			return {
				success: false,
				message: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		return handleAuthError(error);
	}
}

// Legacy signup function for backward compatibility
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
		return handleAuthError(error);
	}
}

// Enhanced login with user type and onboarding status handling
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
			console.log("Login response:", JSON.stringify(result, null, 2));
			console.log("User object:", result.user);
			console.log("Tokens object:", result.tokens);
			console.log("Response keys:", Object.keys(result));

			// Handle different response formats
			let userData = result.user;
			let tokensData = result.tokens;

			// Check if the response is wrapped in a data property
			if (result.data) {
				userData = result.data.user;
				tokensData = result.data.tokens;
			}

			// Check if user data is directly in the result
			if (!userData && result.id) {
				userData = result;
				tokensData = result.tokens || { accessToken: result.access_token, refreshToken: result.refresh_token };
			}

			console.log("Final userData:", userData);
			console.log("Final tokensData:", tokensData);

			if (!userData || !userData.id) {
				console.error("No user object in login response");
				console.error("Available result properties:", Object.keys(result));
				return {
					success: false,
					message: "Invalid login response format",
				};
			}

			await createSession({
				user: {
					id: userData.id,
					name: `${userData.firstName} ${userData.lastName}`,
					email: userData.email,
					role: userData.role,
					userType: userData.userType || UserType.TALENT,
					isOnboarded: userData.isOnboarded || false,
				},
				accessToken: tokensData.accessToken,
				refreshToken: tokensData.refreshToken,
			});

			// Redirect based on onboarding status
			if (!userData.isOnboarded) {
				redirect("/onboarding");
			} else {
				redirect("/redirect-user");
			}
		} else {
			const errorData = await response.json().catch(() => ({}));

			return {
				success: false,
				message: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		return handleAuthError(error);
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
				message: response.status === 404 ? "No account found with this email address." : handleApiError(response, errorData),
			};
		}
	} catch (error) {
		return handleAuthError(error);
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
		return handleAuthError(error);
	}
}

export async function verifyEmail(email: string, formData: VerifyEmailInput): Promise<ActionResult> {
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
		return handleAuthError(error);
	}
}

export async function resendVerificationCode(email: string): Promise<ActionResult> {
	try {
		const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/resend-verification`, {
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
						: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		return handleAuthError(error);
	}
}

// Onboarding completion action
export async function completeOnboardingFlow(onboardingData: OnboardingData): Promise<AuthResult> {
	try {
		const session = await getSession();
		if (!session) {
			redirect("/login");
		}

		console.log("Original onboarding data:", JSON.stringify(onboardingData, null, 2));

		// Helper function to map frontend experience levels to backend enum values
		const mapExperienceLevel = (frontendLevel: string): string | undefined => {
			const mappings: Record<string, string> = {
				"Entry-level": "entry_level",
				"Junior-level": "junior",
				"Mid-level": "mid_level",
				"Senior-level": "senior",
				"Lead-level": "lead",
				"Executive-level": "executive",
				// Alternative mappings used in onboarding forms
				Entry: "entry_level",
				Junior: "junior",
				Mid: "mid_level",
				Senior: "senior",
				Lead: "lead",
				Executive: "executive",
			};
			return mappings[frontendLevel];
		};

		// Transform nested data structure to flat structure expected by backend
		const profileData = onboardingData.profileData || {};
		const preferencesData = onboardingData.preferencesData || {};

		const transformedData = {
			// Required user basic info from session
			firstName: session.user.name?.split(" ")[0] || "",
			lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
			email: session.user.email || "",

			// Map profile data to OnboardingDto fields
			bio: profileData.bio || profileData.description,
			experienceLevel: profileData.experienceLevel ? mapExperienceLevel(profileData.experienceLevel) : undefined,
			currentJobTitle: profileData.currentJobTitle,

			// Map skills to languages array for now (adjust based on actual form structure)
			languages: profileData.keySkills ? [profileData.keySkills] : undefined,

			// Map preferences - you may need to adjust these mappings based on your form
			preferredJobTypes: preferencesData["Job Preferences"] || [],

			// Location data (if available)
			...(onboardingData.locationData || {}),

			// Skills data (if available)
			...(onboardingData.skillsData || {}),
		};

		// Remove undefined fields to avoid validation errors
		Object.keys(transformedData).forEach((key) => {
			if (transformedData[key] === undefined || transformedData[key] === "") {
				delete transformedData[key];
			}
		});

		console.log("Transformed onboarding data:", JSON.stringify(transformedData, null, 2));

		const response = await authFetch(`${NEXT_PUBLIC_BACKEND_URL}/users/complete-onboarding`, {
			method: "POST",
			body: JSON.stringify(transformedData),
		});

		if (response.ok) {
			// Update session to mark user as onboarded
			await completeOnboarding();
			redirect("/redirect-user");
		} else {
			const errorData = await response.json().catch(() => ({}));
			return {
				success: false,
				message: handleApiError(response, errorData),
			};
		}
	} catch (error) {
		return handleAuthError(error);
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
		handleAuthError(error);
	}
}
