/**
 * Authentication Service
 *
 * Handles all authentication-related API calls including registration,
 * login, password reset, and email verification.
 */

import { api, ApiError } from "@/lib/api-client";
import {
	API_ENDPOINTS,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	VerifyEmailRequest,
	ResendVerificationRequest,
} from "@/lib/api-types";

export class AuthService {
	/**
	 * User login
	 */
	static async login(credentials: LoginRequest): Promise<LoginResponse> {
		try {
			const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Login failed", 400);
			}

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Login request failed", 500);
		}
	}

	/**
	 * User registration (handles all user types)
	 */
	static async register(userData: RegisterRequest): Promise<RegisterResponse> {
		try {
			const response = await api.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, userData, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Registration failed", 400);
			}

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Registration request failed", 500);
		}
	}

	/**
	 * Refresh access token
	 */
	static async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
		try {
			const response = await api.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken }, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Token refresh failed", 401);
			}

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Token refresh request failed", 500);
		}
	}

	/**
	 * Logout user
	 */
	static async logout(): Promise<void> {
		try {
			await api.post(API_ENDPOINTS.AUTH.LOGOUT);
		} catch (error) {
			// Logout should not fail silently, but we don't want to throw
			console.warn("Logout request failed:", error);
		}
	}

	/**
	 * Request password reset
	 */
	static async forgotPassword(email: string): Promise<void> {
		try {
			const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }, { requireAuth: false });

			if (!response.success) {
				throw new ApiError("Password reset request failed", 400);
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Password reset request failed", 500);
		}
	}

	/**
	 * Reset password with token
	 */
	static async resetPassword(token: string, password: string): Promise<void> {
		try {
			const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password }, { requireAuth: false });

			if (!response.success) {
				throw new ApiError("Password reset failed", 400);
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Password reset request failed", 500);
		}
	}

	/**
	 * Verify email with token
	 */
	static async verifyEmail(token: string): Promise<void> {
		try {
			const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token }, { requireAuth: false });

			if (!response.success) {
				throw new ApiError("Email verification failed", 400);
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Email verification request failed", 500);
		}
	}

	/**
	 * Resend email verification
	 */
	static async resendVerification(email: string): Promise<void> {
		try {
			const response = await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email }, { requireAuth: false });

			if (!response.success) {
				throw new ApiError("Resend verification failed", 400);
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Resend verification request failed", 500);
		}
	}
}

// Export convenience functions
export const authService = {
	login: AuthService.login,
	register: AuthService.register,
	refreshToken: AuthService.refreshToken,
	logout: AuthService.logout,
	forgotPassword: AuthService.forgotPassword,
	resetPassword: AuthService.resetPassword,
	verifyEmail: AuthService.verifyEmail,
	resendVerification: AuthService.resendVerification,
};
