import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SimpleLoginForm } from "@/components/(auth)/SimpleLoginForm";
import * as authActions from "@/actions/auth.action";

// Mock the auth actions
jest.mock("@/actions/auth.action");
const mockLogin = authActions.login as jest.MockedFunction<typeof authActions.login>;

describe("SimpleLoginForm", () => {
	beforeEach(() => {
		mockLogin.mockClear();
	});

	it("renders login form fields", () => {
		render(<SimpleLoginForm />);

		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
	});

	it("validates required fields", async () => {
		const user = userEvent.setup();
		render(<SimpleLoginForm />);

		const submitButton = screen.getByRole("button", { name: /sign in/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/email is required/i)).toBeInTheDocument();
			expect(screen.getByText(/password is required/i)).toBeInTheDocument();
		});
	});

	it("validates email format", async () => {
		const user = userEvent.setup();
		render(<SimpleLoginForm />);

		const emailInput = screen.getByLabelText(/email/i);
		await user.type(emailInput, "invalid-email");

		const submitButton = screen.getByRole("button", { name: /sign in/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
		});
	});

	it("submits form with valid data", async () => {
		const user = userEvent.setup();
		mockLogin.mockResolvedValue({ success: true, message: "Login successful" });

		render(<SimpleLoginForm />);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: /sign in/i });

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
			});
		});
	});

	it("displays error message on login failure", async () => {
		const user = userEvent.setup();
		mockLogin.mockResolvedValue({
			success: false,
			message: "Invalid credentials",
		});

		render(<SimpleLoginForm />);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: /sign in/i });

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "wrongpassword");
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
		});
	});

	it("shows loading state during submission", async () => {
		const user = userEvent.setup();
		mockLogin.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

		render(<SimpleLoginForm />);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: /sign in/i });

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");
		await user.click(submitButton);

		expect(screen.getByText(/signing in/i)).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});

	it("has forgot password link", () => {
		render(<SimpleLoginForm />);

		const forgotPasswordLink = screen.getByRole("link", { name: /forgot password/i });
		expect(forgotPasswordLink).toBeInTheDocument();
		expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
	});

	it("is accessible with proper labels and ARIA attributes", () => {
		render(<SimpleLoginForm />);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);

		expect(emailInput).toHaveAttribute("type", "email");
		expect(passwordInput).toHaveAttribute("type", "password");
		expect(emailInput).toHaveAttribute("aria-required", "true");
		expect(passwordInput).toHaveAttribute("aria-required", "true");
	});
});
