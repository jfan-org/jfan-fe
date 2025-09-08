import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { App } from "@/app/page";

describe("Critical User Journeys E2E", () => {
	describe("New Job Seeker Journey", () => {
		it("completes full journey from registration to job search", async () => {
			const user = userEvent.setup();

			render(<App />);

			// 1. Landing page - Click "Get Started"
			expect(screen.getByText(/find your dream job/i)).toBeInTheDocument();
			await user.click(screen.getByRole("button", { name: /get started/i }));

			// 2. Registration - Select Job Seeker
			await waitFor(() => {
				expect(screen.getByText(/choose your account type/i)).toBeInTheDocument();
			});
			await user.click(screen.getByRole("button", { name: /job seeker/i }));

			// 3. Fill registration form
			await waitFor(() => {
				expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/first name/i), "Sarah");
			await user.type(screen.getByLabelText(/last name/i), "Johnson");
			await user.type(screen.getByLabelText(/email/i), "sarah@example.com");
			await user.type(screen.getByLabelText(/^password/i), "SecurePass123!");
			await user.type(screen.getByLabelText(/confirm password/i), "SecurePass123!");

			await user.click(screen.getByRole("button", { name: /create account/i }));

			// 4. Email verification
			await waitFor(() => {
				expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/verification code/i), "123456");
			await user.click(screen.getByRole("button", { name: /verify email/i }));

			// 5. Onboarding flow
			await waitFor(() => {
				expect(screen.getByText(/welcome to jfan/i)).toBeInTheDocument();
			});

			// Complete onboarding steps
			await user.click(screen.getByRole("button", { name: /get started/i }));

			// Location selection
			await waitFor(() => {
				expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
			});
			await user.type(screen.getByLabelText(/location/i), "San Francisco, CA");
			await user.click(screen.getByRole("button", { name: /next/i }));

			// Job preferences
			await waitFor(() => {
				expect(screen.getByText(/job preferences/i)).toBeInTheDocument();
			});
			await user.click(screen.getByLabelText(/software engineer/i));
			await user.click(screen.getByLabelText(/full-time/i));
			await user.click(screen.getByRole("button", { name: /complete setup/i }));

			// 6. Dashboard access
			await waitFor(() => {
				expect(screen.getByText(/welcome back, sarah/i)).toBeInTheDocument();
				expect(screen.getByText(/job recommendations/i)).toBeInTheDocument();
			});

			// 7. Job search functionality
			const searchInput = screen.getByPlaceholderText(/search jobs/i);
			await user.type(searchInput, "React Developer");
			await user.click(screen.getByRole("button", { name: /search/i }));

			await waitFor(() => {
				expect(screen.getByText(/search results/i)).toBeInTheDocument();
			});
		});
	});

	describe("Company Registration Journey", () => {
		it("completes company registration and job posting", async () => {
			const user = userEvent.setup();

			render(<App />);

			// 1. Navigate to company registration
			await user.click(screen.getByRole("link", { name: /for employers/i }));
			await user.click(screen.getByRole("button", { name: /get started/i }));

			// 2. Select company account type
			await waitFor(() => {
				expect(screen.getByText(/choose your account type/i)).toBeInTheDocument();
			});
			await user.click(screen.getByRole("button", { name: /company/i }));

			// 3. Company registration form
			await waitFor(() => {
				expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/company name/i), "Tech Innovations Inc");
			await user.type(screen.getByLabelText(/contact person/i), "John Smith");
			await user.type(screen.getByLabelText(/email/i), "john@techinnovations.com");
			await user.type(screen.getByLabelText(/^password/i), "CompanyPass123!");
			await user.type(screen.getByLabelText(/confirm password/i), "CompanyPass123!");

			await user.click(screen.getByRole("button", { name: /create account/i }));

			// 4. Email verification
			await waitFor(() => {
				expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/verification code/i), "123456");
			await user.click(screen.getByRole("button", { name: /verify email/i }));

			// 5. Company onboarding
			await waitFor(() => {
				expect(screen.getByText(/company setup/i)).toBeInTheDocument();
			});

			// Company details
			await user.type(screen.getByLabelText(/industry/i), "Technology");
			await user.type(screen.getByLabelText(/company size/i), "50-100");
			await user.click(screen.getByRole("button", { name: /next/i }));

			// Location
			await waitFor(() => {
				expect(screen.getByLabelText(/headquarters/i)).toBeInTheDocument();
			});
			await user.type(screen.getByLabelText(/headquarters/i), "San Francisco, CA");
			await user.click(screen.getByRole("button", { name: /complete setup/i }));

			// 6. Company dashboard
			await waitFor(() => {
				expect(screen.getByText(/company dashboard/i)).toBeInTheDocument();
				expect(screen.getByRole("button", { name: /post new job/i })).toBeInTheDocument();
			});

			// 7. Post a job
			await user.click(screen.getByRole("button", { name: /post new job/i }));

			await waitFor(() => {
				expect(screen.getByText(/create job posting/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/job title/i), "Senior React Developer");
			await user.type(screen.getByLabelText(/description/i), "We are looking for an experienced React developer...");
			await user.click(screen.getByRole("button", { name: /publish job/i }));

			await waitFor(() => {
				expect(screen.getByText(/job posted successfully/i)).toBeInTheDocument();
			});
		});
	});

	describe("Returning User Journey", () => {
		it("handles returning user login and dashboard access", async () => {
			const user = userEvent.setup();

			// Mock existing user session
			server.use(
				http.post("/api/auth/login", () => {
					return HttpResponse.json({
						success: true,
						user: {
							id: "1",
							email: "existing@example.com",
							userType: "job_seeker",
							isEmailVerified: true,
							onboardingCompleted: true,
						},
						token: "mock-jwt-token",
					});
				})
			);

			render(<App />);

			// 1. Navigate to login
			await user.click(screen.getByRole("link", { name: /sign in/i }));

			// 2. Login form
			await waitFor(() => {
				expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/email/i), "existing@example.com");
			await user.type(screen.getByLabelText(/password/i), "password123");
			await user.click(screen.getByRole("button", { name: /sign in/i }));

			// 3. Direct access to dashboard (skip onboarding)
			await waitFor(() => {
				expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
				expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
			});

			// 4. Access profile settings
			await user.click(screen.getByRole("button", { name: /profile/i }));

			await waitFor(() => {
				expect(screen.getByText(/profile settings/i)).toBeInTheDocument();
			});
		});
	});

	describe("Error Recovery Journey", () => {
		it("handles and recovers from various error states", async () => {
			const user = userEvent.setup();

			render(<App />);

			// 1. Network error during registration
			server.use(
				http.post("/api/auth/register", () => {
					return HttpResponse.error();
				})
			);

			await user.click(screen.getByRole("button", { name: /get started/i }));
			await user.click(screen.getByRole("button", { name: /job seeker/i }));

			await waitFor(() => {
				expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
			});

			await user.type(screen.getByLabelText(/first name/i), "Test");
			await user.type(screen.getByLabelText(/last name/i), "User");
			await user.type(screen.getByLabelText(/email/i), "test@example.com");
			await user.type(screen.getByLabelText(/^password/i), "Password123!");
			await user.type(screen.getByLabelText(/confirm password/i), "Password123!");

			await user.click(screen.getByRole("button", { name: /create account/i }));

			// Should show error message
			await waitFor(() => {
				expect(screen.getByText(/network error/i)).toBeInTheDocument();
			});

			// 2. Retry with successful response
			server.use(
				http.post("/api/auth/register", () => {
					return HttpResponse.json({
						success: true,
						message: "Registration successful",
						user: { id: "1", email: "test@example.com", userType: "job_seeker" },
					});
				})
			);

			await user.click(screen.getByRole("button", { name: /try again/i }));

			// Should proceed to verification
			await waitFor(() => {
				expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
			});
		});
	});

	describe("Accessibility Journey", () => {
		it("supports full keyboard navigation through registration", async () => {
			const user = userEvent.setup();

			render(<App />);

			// Navigate using only keyboard
			await user.tab(); // Skip link
			await user.tab(); // Get started button
			await user.keyboard("{Enter}");

			// User type selection
			await waitFor(() => {
				expect(screen.getByRole("button", { name: /job seeker/i })).toHaveFocus();
			});
			await user.keyboard("{Enter}");

			// Registration form navigation
			await waitFor(() => {
				expect(screen.getByLabelText(/first name/i)).toHaveFocus();
			});

			await user.keyboard("John");
			await user.tab();
			await user.keyboard("Doe");
			await user.tab();
			await user.keyboard("john@example.com");
			await user.tab();
			await user.keyboard("Password123!");
			await user.tab();
			await user.keyboard("Password123!");
			await user.tab();
			await user.keyboard("{Enter}");

			// Should proceed to verification
			await waitFor(() => {
				expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
			});
		});

		it("provides proper screen reader announcements", async () => {
			const user = userEvent.setup();

			render(<App />);

			await user.click(screen.getByRole("button", { name: /get started/i }));

			// Check for ARIA live regions
			await waitFor(() => {
				const liveRegion = screen.getByRole("status");
				expect(liveRegion).toBeInTheDocument();
			});

			await user.click(screen.getByRole("button", { name: /job seeker/i }));

			// Should announce step change
			await waitFor(() => {
				const announcement = screen.getByRole("status");
				expect(announcement).toHaveTextContent(/step 2/i);
			});
		});
	});
});
