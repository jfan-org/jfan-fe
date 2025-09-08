import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationFlow } from "@/components/(auth)/RegistrationFlow";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("Authentication Flow Integration", () => {
	describe("Complete Registration Flow", () => {
		it("completes full registration process for job seeker", async () => {
			const user = userEvent.setup();
			const mockOnComplete = jest.fn();

			render(<RegistrationFlow onComplete={mockOnComplete} />);

			// Step 1: User Type Selection
			expect(screen.getByText(/choose your account type/i)).toBeInTheDocument();
			await user.click(screen.getByRole("button", { name: /job seeker/i }));

			// Step 2: Registration Form
			await waitFor(() => {
				expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/first name/i), "John");
			await user.type(screen.getByLabelText(/last name/i), "Doe");
			await user.type(screen.getByLabelText(/email/i), "john@example.com");
			await user.type(screen.getByLabelText(/^password/i), "Password123!");
			await user.type(screen.getByLabelText(/confirm password/i), "Password123!");

			await user.click(screen.getByRole("button", { name: /create account/i }));

			// Step 3: Email Verification
			await waitFor(() => {
				expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/verification code/i), "123456");
			await user.click(screen.getByRole("button", { name: /verify email/i }));

			// Should complete the flow
			await waitFor(() => {
				expect(mockOnComplete).toHaveBeenCalled();
			});
		});

		it("handles registration errors gracefully", async () => {
			const user = userEvent.setup();

			// Mock registration failure
			server.use(
				http.post("/api/auth/register", () => {
					return HttpResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
				})
			);

			render(<RegistrationFlow onComplete={jest.fn()} />);

			// Select user type and fill form
			await user.click(screen.getByRole("button", { name: /job seeker/i }));

			await waitFor(() => {
				expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/first name/i), "John");
			await user.type(screen.getByLabelText(/last name/i), "Doe");
			await user.type(screen.getByLabelText(/email/i), "existing@example.com");
			await user.type(screen.getByLabelText(/^password/i), "Password123!");
			await user.type(screen.getByLabelText(/confirm password/i), "Password123!");

			await user.click(screen.getByRole("button", { name: /create account/i }));

			// Should show error message
			await waitFor(() => {
				expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
			});

			// Should stay on registration form
			expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		});
	});

	describe("Login Flow Integration", () => {
		it("completes successful login process", async () => {
			const user = userEvent.setup();
			const mockOnSuccess = jest.fn();

			render(<LoginForm onSuccess={mockOnSuccess} />);

			await user.type(screen.getByLabelText(/email/i), "test@example.com");
			await user.type(screen.getByLabelText(/password/i), "password123");
			await user.click(screen.getByRole("button", { name: /sign in/i }));

			await waitFor(() => {
				expect(mockOnSuccess).toHaveBeenCalled();
			});
		});

		it("handles login errors and shows appropriate messages", async () => {
			const user = userEvent.setup();

			// Mock login failure
			server.use(
				http.post("/api/auth/login", () => {
					return HttpResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
				})
			);

			render(<LoginForm onSuccess={jest.fn()} />);

			await user.type(screen.getByLabelText(/email/i), "test@example.com");
			await user.type(screen.getByLabelText(/password/i), "wrongpassword");
			await user.click(screen.getByRole("button", { name: /sign in/i }));

			await waitFor(() => {
				expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
			});
		});
	});

	describe("Password Reset Flow Integration", () => {
		it("completes password reset process", async () => {
			const user = userEvent.setup();

			render(<ForgotPasswordFlow />);

			// Step 1: Request reset
			await user.type(screen.getByLabelText(/email/i), "test@example.com");
			await user.click(screen.getByRole("button", { name: /send reset link/i }));

			// Step 2: Enter reset code
			await waitFor(() => {
				expect(screen.getByText(/enter reset code/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/reset code/i), "123456");
			await user.click(screen.getByRole("button", { name: /verify code/i }));

			// Step 3: Set new password
			await waitFor(() => {
				expect(screen.getByText(/set new password/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/new password/i), "NewPassword123!");
			await user.type(screen.getByLabelText(/confirm password/i), "NewPassword123!");
			await user.click(screen.getByRole("button", { name: /reset password/i }));

			await waitFor(() => {
				expect(screen.getByText(/password reset successful/i)).toBeInTheDocument();
			});
		});
	});

	describe("Session Management Integration", () => {
		it("maintains session state across page refreshes", async () => {
			// Mock authenticated user
			const mockUser = {
				id: "1",
				email: "test@example.com",
				userType: "job_seeker",
				isEmailVerified: true,
			};

			// Mock session storage
			Object.defineProperty(window, "sessionStorage", {
				value: {
					getItem: jest.fn(() => JSON.stringify(mockUser)),
					setItem: jest.fn(),
					removeItem: jest.fn(),
				},
				writable: true,
			});

			render(
				<AuthProvider>
					<DashboardRouter />
				</AuthProvider>
			);

			// Should render dashboard for authenticated user
			await waitFor(() => {
				expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
			});
		});

		it("redirects to login when session expires", async () => {
			// Mock expired session
			server.use(
				http.get("/api/auth/me", () => {
					return HttpResponse.json({ success: false, message: "Session expired" }, { status: 401 });
				})
			);

			render(
				<AuthProvider>
					<ProtectedRoute />
				</AuthProvider>
			);

			await waitFor(() => {
				expect(mockPush).toHaveBeenCalledWith("/login");
			});
		});
	});

	describe("User Type Specific Features Integration", () => {
		it("shows job seeker specific features after login", async () => {
			const user = userEvent.setup();

			// Mock job seeker login
			server.use(
				http.post("/api/auth/login", () => {
					return HttpResponse.json({
						success: true,
						user: {
							id: "1",
							email: "jobseeker@example.com",
							userType: "job_seeker",
							isEmailVerified: true,
						},
					});
				})
			);

			render(<LoginForm onSuccess={() => {}} />);

			await user.type(screen.getByLabelText(/email/i), "jobseeker@example.com");
			await user.type(screen.getByLabelText(/password/i), "password123");
			await user.click(screen.getByRole("button", { name: /sign in/i }));

			await waitFor(() => {
				expect(screen.getByText(/job search/i)).toBeInTheDocument();
				expect(screen.getByText(/saved jobs/i)).toBeInTheDocument();
			});
		});

		it("shows company specific features after login", async () => {
			const user = userEvent.setup();

			// Mock company login
			server.use(
				http.post("/api/auth/login", () => {
					return HttpResponse.json({
						success: true,
						user: {
							id: "1",
							email: "company@example.com",
							userType: "company",
							isEmailVerified: true,
						},
					});
				})
			);

			render(<LoginForm onSuccess={() => {}} />);

			await user.type(screen.getByLabelText(/email/i), "company@example.com");
			await user.type(screen.getByLabelText(/password/i), "password123");
			await user.click(screen.getByRole("button", { name: /sign in/i }));

			await waitFor(() => {
				expect(screen.getByText(/post job/i)).toBeInTheDocument();
				expect(screen.getByText(/manage candidates/i)).toBeInTheDocument();
			});
		});
	});
});
