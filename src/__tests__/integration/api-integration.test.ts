import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import * as authActions from "@/actions/auth.action";

describe("API Integration Tests", () => {
	describe("Authentication API", () => {
		describe("Registration", () => {
			it("successfully registers a new user", async () => {
				const userData = {
					firstName: "John",
					lastName: "Doe",
					email: "john@example.com",
					password: "Password123!",
					userType: "job_seeker" as const,
				};

				const result = await authActions.register(userData);

				expect(result.success).toBe(true);
				expect(result.message).toBe("Registration successful");
				expect(result.user).toMatchObject({
					email: userData.email,
					userType: userData.userType,
				});
			});

			it("handles registration errors", async () => {
				server.use(
					http.post("/api/auth/register", () => {
						return HttpResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
					})
				);

				const userData = {
					firstName: "John",
					lastName: "Doe",
					email: "existing@example.com",
					password: "Password123!",
					userType: "job_seeker" as const,
				};

				const result = await authActions.register(userData);

				expect(result.success).toBe(false);
				expect(result.message).toBe("Email already exists");
			});

			it("handles network errors gracefully", async () => {
				server.use(
					http.post("/api/auth/register", () => {
						return HttpResponse.error();
					})
				);

				const userData = {
					firstName: "John",
					lastName: "Doe",
					email: "john@example.com",
					password: "Password123!",
					userType: "job_seeker" as const,
				};

				const result = await authActions.register(userData);

				expect(result.success).toBe(false);
				expect(result.message).toContain("network error");
			});
		});

		describe("Login", () => {
			it("successfully logs in a user", async () => {
				const credentials = {
					email: "test@example.com",
					password: "password123",
				};

				const result = await authActions.login(credentials);

				expect(result.success).toBe(true);
				expect(result.message).toBe("Login successful");
				expect(result.user).toMatchObject({
					email: credentials.email,
				});
				expect(result.token).toBeDefined();
			});

			it("handles invalid credentials", async () => {
				server.use(
					http.post("/api/auth/login", () => {
						return HttpResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
					})
				);

				const credentials = {
					email: "test@example.com",
					password: "wrongpassword",
				};

				const result = await authActions.login(credentials);

				expect(result.success).toBe(false);
				expect(result.message).toBe("Invalid credentials");
			});

			it("handles account lockout", async () => {
				server.use(
					http.post("/api/auth/login", () => {
						return HttpResponse.json(
							{
								success: false,
								message: "Account locked due to too many failed attempts",
								lockoutUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
							},
							{ status: 423 }
						);
					})
				);

				const credentials = {
					email: "locked@example.com",
					password: "password123",
				};

				const result = await authActions.login(credentials);

				expect(result.success).toBe(false);
				expect(result.message).toContain("Account locked");
				expect(result.lockoutUntil).toBeDefined();
			});
		});

		describe("Email Verification", () => {
			it("successfully verifies email", async () => {
				const verificationData = {
					email: "test@example.com",
					code: "123456",
				};

				const result = await authActions.verifyEmail(verificationData);

				expect(result.success).toBe(true);
				expect(result.message).toBe("Email verified successfully");
			});

			it("handles invalid verification code", async () => {
				server.use(
					http.post("/api/auth/verify-email", () => {
						return HttpResponse.json({ success: false, message: "Invalid verification code" }, { status: 400 });
					})
				);

				const verificationData = {
					email: "test@example.com",
					code: "000000",
				};

				const result = await authActions.verifyEmail(verificationData);

				expect(result.success).toBe(false);
				expect(result.message).toBe("Invalid verification code");
			});

			it("handles expired verification code", async () => {
				server.use(
					http.post("/api/auth/verify-email", () => {
						return HttpResponse.json({ success: false, message: "Verification code expired" }, { status: 410 });
					})
				);

				const verificationData = {
					email: "test@example.com",
					code: "123456",
				};

				const result = await authActions.verifyEmail(verificationData);

				expect(result.success).toBe(false);
				expect(result.message).toBe("Verification code expired");
			});
		});

		describe("Password Reset", () => {
			it("successfully initiates password reset", async () => {
				const result = await authActions.forgotPassword({ email: "test@example.com" });

				expect(result.success).toBe(true);
				expect(result.message).toBe("Password reset email sent");
			});

			it("successfully resets password", async () => {
				const resetData = {
					email: "test@example.com",
					code: "123456",
					newPassword: "NewPassword123!",
				};

				const result = await authActions.resetPassword(resetData);

				expect(result.success).toBe(true);
				expect(result.message).toBe("Password reset successful");
			});

			it("handles invalid reset code", async () => {
				server.use(
					http.post("/api/auth/reset-password", () => {
						return HttpResponse.json({ success: false, message: "Invalid reset code" }, { status: 400 });
					})
				);

				const resetData = {
					email: "test@example.com",
					code: "000000",
					newPassword: "NewPassword123!",
				};

				const result = await authActions.resetPassword(resetData);

				expect(result.success).toBe(false);
				expect(result.message).toBe("Invalid reset code");
			});
		});

		describe("Logout", () => {
			it("successfully logs out user", async () => {
				const result = await authActions.logout();

				expect(result.success).toBe(true);
				expect(result.message).toBe("Logout successful");
			});

			it("handles logout errors gracefully", async () => {
				server.use(
					http.post("/api/auth/logout", () => {
						return HttpResponse.json({ success: false, message: "Logout failed" }, { status: 500 });
					})
				);

				const result = await authActions.logout();

				expect(result.success).toBe(false);
				expect(result.message).toBe("Logout failed");
			});
		});
	});

	describe("Session Management", () => {
		it("validates active session", async () => {
			server.use(
				http.get("/api/auth/me", () => {
					return HttpResponse.json({
						success: true,
						user: {
							id: "1",
							email: "test@example.com",
							userType: "job_seeker",
							isEmailVerified: true,
						},
					});
				})
			);

			const response = await fetch("/api/auth/me");
			const result = await response.json();

			expect(result.success).toBe(true);
			expect(result.user).toBeDefined();
		});

		it("handles expired session", async () => {
			server.use(
				http.get("/api/auth/me", () => {
					return HttpResponse.json({ success: false, message: "Session expired" }, { status: 401 });
				})
			);

			const response = await fetch("/api/auth/me");
			const result = await response.json();

			expect(response.status).toBe(401);
			expect(result.success).toBe(false);
			expect(result.message).toBe("Session expired");
		});
	});

	describe("Rate Limiting", () => {
		it("handles rate limit errors", async () => {
			server.use(
				http.post("/api/auth/login", () => {
					return HttpResponse.json(
						{
							success: false,
							message: "Too many requests. Please try again later.",
							retryAfter: 60,
						},
						{ status: 429 }
					);
				})
			);

			const credentials = {
				email: "test@example.com",
				password: "password123",
			};

			const result = await authActions.login(credentials);

			expect(result.success).toBe(false);
			expect(result.message).toContain("Too many requests");
			expect(result.retryAfter).toBe(60);
		});
	});

	describe("Request/Response Validation", () => {
		it("validates request payload structure", async () => {
			server.use(
				http.post("/api/auth/register", async ({ request }) => {
					const body = await request.json();

					// Validate required fields
					const requiredFields = ["firstName", "lastName", "email", "password", "userType"];
					const missingFields = requiredFields.filter((field) => !body[field]);

					if (missingFields.length > 0) {
						return HttpResponse.json(
							{
								success: false,
								message: "Missing required fields",
								missingFields,
							},
							{ status: 400 }
						);
					}

					return HttpResponse.json({
						success: true,
						message: "Registration successful",
					});
				})
			);

			// Test with missing fields
			const incompleteData = {
				email: "test@example.com",
				password: "password123",
				// Missing firstName, lastName, userType
			};

			const result = await authActions.register(incompleteData as any);

			expect(result.success).toBe(false);
			expect(result.message).toBe("Missing required fields");
			expect(result.missingFields).toContain("firstName");
			expect(result.missingFields).toContain("lastName");
			expect(result.missingFields).toContain("userType");
		});

		it("validates response structure", async () => {
			const userData = {
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				password: "Password123!",
				userType: "job_seeker" as const,
			};

			const result = await authActions.register(userData);

			// Validate response structure
			expect(result).toHaveProperty("success");
			expect(result).toHaveProperty("message");
			expect(typeof result.success).toBe("boolean");
			expect(typeof result.message).toBe("string");

			if (result.success) {
				expect(result).toHaveProperty("user");
				expect(result.user).toHaveProperty("id");
				expect(result.user).toHaveProperty("email");
				expect(result.user).toHaveProperty("userType");
			}
		});
	});
});
