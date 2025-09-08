import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SimpleVerifyEmailForm } from "@/components/(auth)/SimpleVerifyEmailForm";
import * as authActions from "@/actions/auth.action";

// Mock the auth actions
jest.mock("@/actions/auth.action");
const mockVerifyEmail = authActions.verifyEmail as jest.MockedFunction<typeof authActions.verifyEmail>;

describe("SimpleVerifyEmailForm", () => {
	const mockProps = {
		email: "test@example.com",
		onSuccess: jest.fn(),
	};

	beforeEach(() => {
		mockVerifyEmail.mockClear();
		mockProps.onSuccess.mockClear();
	});

	it("renders verification form with email display", () => {
		render(<SimpleVerifyEmailForm {...mockProps} />);

		expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
		expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
		expect(screen.getByLabelText(/verification code/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /verify email/i })).toBeInTheDocument();
	});

	it("validates verification code format", async () => {
		const user = userEvent.setup();
		render(<SimpleVerifyEmailForm {...mockProps} />);

		const codeInput = screen.getByLabelText(/verification code/i);
		await user.type(codeInput, "123");

		const submitButton = screen.getByRole("button", { name: /verify email/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/verification code must be 6 digits/i)).toBeInTheDocument();
		});
	});

	it("submits form with valid verification code", async () => {
		const user = userEvent.setup();
		mockVerifyEmail.mockResolvedValue({
			success: true,
			message: "Email verified successfully",
		});

		render(<SimpleVerifyEmailForm {...mockProps} />);

		const codeInput = screen.getByLabelText(/verification code/i);
		await user.type(codeInput, "123456");

		const submitButton = screen.getByRole("button", { name: /verify email/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockVerifyEmail).toHaveBeenCalledWith({
				email: "test@example.com",
				code: "123456",
			});
		});
	});

	it("calls onSuccess after successful verification", async () => {
		const user = userEvent.setup();
		mockVerifyEmail.mockResolvedValue({
			success: true,
			message: "Email verified successfully",
		});

		render(<SimpleVerifyEmailForm {...mockProps} />);

		const codeInput = screen.getByLabelText(/verification code/i);
		await user.type(codeInput, "123456");

		const submitButton = screen.getByRole("button", { name: /verify email/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockProps.onSuccess).toHaveBeenCalled();
		});
	});

	it("displays error message on verification failure", async () => {
		const user = userEvent.setup();
		mockVerifyEmail.mockResolvedValue({
			success: false,
			message: "Invalid verification code",
		});

		render(<SimpleVerifyEmailForm {...mockProps} />);

		const codeInput = screen.getByLabelText(/verification code/i);
		await user.type(codeInput, "123456");

		const submitButton = screen.getByRole("button", { name: /verify email/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/invalid verification code/i)).toBeInTheDocument();
		});
	});

	it("shows loading state during verification", async () => {
		const user = userEvent.setup();
		mockVerifyEmail.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

		render(<SimpleVerifyEmailForm {...mockProps} />);

		const codeInput = screen.getByLabelText(/verification code/i);
		await user.type(codeInput, "123456");

		const submitButton = screen.getByRole("button", { name: /verify email/i });
		await user.click(submitButton);

		expect(screen.getByText(/verifying/i)).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});

	it("has resend verification code functionality", async () => {
		const user = userEvent.setup();
		render(<SimpleVerifyEmailForm {...mockProps} />);

		const resendButton = screen.getByRole("button", { name: /resend code/i });
		expect(resendButton).toBeInTheDocument();

		await user.click(resendButton);

		await waitFor(() => {
			expect(screen.getByText(/verification code sent/i)).toBeInTheDocument();
		});
	});

	it("formats verification code input correctly", async () => {
		const user = userEvent.setup();
		render(<SimpleVerifyEmailForm {...mockProps} />);

		const codeInput = screen.getByLabelText(/verification code/i);
		await user.type(codeInput, "123456789");

		// Should only accept 6 digits
		expect(codeInput).toHaveValue("123456");
	});

	it("is accessible with proper ARIA attributes", () => {
		render(<SimpleVerifyEmailForm {...mockProps} />);

		const codeInput = screen.getByLabelText(/verification code/i);
		expect(codeInput).toHaveAttribute("aria-required", "true");
		expect(codeInput).toHaveAttribute("inputmode", "numeric");
	});
});
