import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserTypeSelection } from "@/components/(auth)/UserTypeSelection";

describe("UserTypeSelection", () => {
	const mockOnSelect = jest.fn();

	beforeEach(() => {
		mockOnSelect.mockClear();
	});

	it("renders all user type options", () => {
		render(<UserTypeSelection onSelect={mockOnSelect} />);

		expect(screen.getByText("Job Seeker")).toBeInTheDocument();
		expect(screen.getByText("Company")).toBeInTheDocument();
		expect(screen.getByText("Talent Acquisition")).toBeInTheDocument();
	});

	it("calls onSelect when a user type is selected", async () => {
		const user = userEvent.setup();
		render(<UserTypeSelection onSelect={mockOnSelect} />);

		const jobSeekerButton = screen.getByRole("button", { name: /job seeker/i });
		await user.click(jobSeekerButton);

		expect(mockOnSelect).toHaveBeenCalledWith("job_seeker");
	});

	it("highlights selected user type", async () => {
		const user = userEvent.setup();
		render(<UserTypeSelection onSelect={mockOnSelect} />);

		const companyButton = screen.getByRole("button", { name: /company/i });
		await user.click(companyButton);

		expect(companyButton).toHaveClass("ring-2");
	});

	it("displays correct descriptions for each user type", () => {
		render(<UserTypeSelection onSelect={mockOnSelect} />);

		expect(screen.getByText(/looking for job opportunities/i)).toBeInTheDocument();
		expect(screen.getByText(/hiring talented professionals/i)).toBeInTheDocument();
		expect(screen.getByText(/recruiting for multiple companies/i)).toBeInTheDocument();
	});

	it("is accessible with keyboard navigation", async () => {
		const user = userEvent.setup();
		render(<UserTypeSelection onSelect={mockOnSelect} />);

		// Tab to first button
		await user.tab();
		expect(screen.getByRole("button", { name: /job seeker/i })).toHaveFocus();

		// Press Enter to select
		await user.keyboard("{Enter}");
		expect(mockOnSelect).toHaveBeenCalledWith("job_seeker");
	});
});
