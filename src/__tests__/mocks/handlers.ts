import { http, HttpResponse } from "msw";

export const handlers = [
	// Auth endpoints
	http.post("/api/auth/register", () => {
		return HttpResponse.json({
			success: true,
			message: "Registration successful",
			user: {
				id: "1",
				email: "test@example.com",
				userType: "job_seeker",
				isEmailVerified: false,
			},
		});
	}),

	http.post("/api/auth/login", () => {
		return HttpResponse.json({
			success: true,
			message: "Login successful",
			user: {
				id: "1",
				email: "test@example.com",
				userType: "job_seeker",
				isEmailVerified: true,
			},
			token: "mock-jwt-token",
		});
	}),

	http.post("/api/auth/verify-email", () => {
		return HttpResponse.json({
			success: true,
			message: "Email verified successfully",
		});
	}),

	http.post("/api/auth/forgot-password", () => {
		return HttpResponse.json({
			success: true,
			message: "Password reset email sent",
		});
	}),

	http.post("/api/auth/reset-password", () => {
		return HttpResponse.json({
			success: true,
			message: "Password reset successful",
		});
	}),

	http.post("/api/auth/logout", () => {
		return HttpResponse.json({
			success: true,
			message: "Logout successful",
		});
	}),

	// Error handlers for testing error states
	http.post("/api/auth/register-error", () => {
		return HttpResponse.json(
			{
				success: false,
				message: "Email already exists",
			},
			{ status: 400 }
		);
	}),

	http.post("/api/auth/login-error", () => {
		return HttpResponse.json(
			{
				success: false,
				message: "Invalid credentials",
			},
			{ status: 401 }
		);
	}),
];
