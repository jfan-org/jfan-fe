import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnifiedRegistrationForm } from "@/components/(auth)/UnifiedRegistrationForm";
import * as authActions from "@/actions/auth.action";

// Mock the auth actions
jest.mock("@/actions/auth.action");
const mockRegister = authActions.register as jest.MockedFunction<typeof authActions.register>;

describe("UnifiedRegistrationForm", () => {
	const mockProps = {
		userType: "job_seeker" as const,
		onSuccess: jest.fn(),
	};

	beforeEach(() => {
		mockRegister.mockClear();
		mockProps.onSuccess.mockClear();
	});

	it("renders registration form fields", () => {
		render(<UnifiedRegistrationForm {...mockProps} />);

		expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
	});

	it("validates required fields", async () => {
		const user = userEvent.setup();
		render(<UnifiedRegistrationForm {...mockProps} />);

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
			expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
			expect(screen.getByText(/email is required/i)).toBeInTheDocument();
			expect(screen.getByText(/password is required/i)).toBeInTheDocument();
		});
	});

	it("validates email format", async () => {
		const user = userEvent.setup();
		render(<UnifiedRegistrationForm {...mockProps} />);

		const emailInput = screen.getByLabelText(/email/i);
		await user.type(emailInput, "invalid-email");

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
		});
	});

	it("validates password strength", async () => {
		const user = userEvent.setup();
		render(<UnifiedRegistrationForm {...mockProps} />);

		const passwordInput = screen.getByLabelText(/^password/i);
		await user.type(passwordInput, "123");

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
		});
	});

	it("validates password confirmation", async () => {
		const user = userEvent.setup();
		render(<UnifiedRegistrationForm {...mockProps} />);

		const passwordInput = screen.getByLabelText(/^password/i);
		const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

		await user.type(passwordInput, "password123");
		await user.type(confirmPasswordInput, "differentpassword");

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
		});
	});

	it("submits form with valid data", async () => {
		const user = userEvent.setup();
		mockRegister.mockResolvedValue({
			success: true,
			message: "Registration successful",
		});

		render(<UnifiedRegistrationForm {...mockProps} />);

		await user.type(screen.getByLabelText(/first name/i), "John");
		await user.type(screen.getByLabelText(/last name/i), "Doe");
		await user.type(screen.getByLabelText(/email/i), "john@example.com");
		await user.type(screen.getByLabelText(/^password/i), "password123");
		await user.type(screen.getByLabelText(/confirm password/i), "password123");

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockRegister).toHaveBeenCalledWith({
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				password: "password123",
				userType: "job_seeker",
			});
		});
	});

	it("calls onSuccess after successful registration", async () => {
		const user = userEvent.setup();
		mockRegister.mockResolvedValue({
			success: true,
			message: "Registration successful",
		});

		render(<UnifiedRegistrationForm {...mockProps} />);

		await user.type(screen.getByLabelText(/first name/i), "John");
		await user.type(screen.getByLabelText(/last name/i), "Doe");
		await user.type(screen.getByLabelText(/email/i), "john@example.com");
		await user.type(screen.getByLabelText(/^password/i), "password123");
		await user.type(screen.getByLabelText(/confirm password/i), "password123");

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockProps.onSuccess).toHaveBeenCalled();
		});
	});

	it("displays error message on registration failure", async () => {
		const user = userEvent.setup();
		mockRegister.mockResolvedValue({
			success: false,
			message: "Email already exists",
		});

		render(<UnifiedRegistrationForm {...mockProps} />);

		await user.type(screen.getByLabelText(/first name/i), "John");
		await user.type(screen.getByLabelText(/last name/i), "Doe");
		await user.type(screen.getByLabelText(/email/i), "existing@example.com");
		await user.type(screen.getByLabelText(/^password/i), "password123");
		await user.type(screen.getByLabelText(/confirm password/i), "password123");

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
		});
	});

	it("shows different fields for company user type", () => {
		render(<UnifiedRegistrationForm {...mockProps} userType="company" />);

		expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/contact person/i)).toBeInTheDocument();
	});

	it("shows loading state during submission", async () => {
		const user = userEvent.setup();
		mockRegister.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

		render(<UnifiedRegistrationForm {...mockProps} />);

		await user.type(screen.getByLabelText(/first name/i), "John");
		await user.type(screen.getByLabelText(/last name/i), "Doe");
		await user.type(screen.getByLabelText(/email/i), "john@example.com");
		await user.type(screen.getByLabelText(/^password/i), "password123");
		await user.type(screen.getByLabelText(/confirm password/i), "password123");

		const submitButton = screen.getByRole("button", { name: /create account/i });
		await user.click(submitButton);

		expect(screen.getByText(/creating account/i)).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});
});
