import { render, screen } from "@testing-library/react";
import { AuthLayout } from "@/components/layouts/AuthLayout";

describe("AuthLayout", () => {
	it("renders children content", () => {
		render(
			<AuthLayout>
				<div>Test Content</div>
			</AuthLayout>
		);

		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("has proper layout structure", () => {
		render(
			<AuthLayout>
				<div>Test Content</div>
			</AuthLayout>
		);

		const layout = screen.getByRole("main");
		expect(layout).toBeInTheDocument();
		expect(layout).toHaveClass("auth-layout");
	});

	it("includes branding elements", () => {
		render(
			<AuthLayout>
				<div>Test Content</div>
			</AuthLayout>
		);

		expect(screen.getByText(/jfan/i)).toBeInTheDocument();
		expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
	});

	it("has responsive design classes", () => {
		render(
			<AuthLayout>
				<div>Test Content</div>
			</AuthLayout>
		);

		const container = screen.getByRole("main");
		expect(container).toHaveClass("min-h-screen");
		expect(container).toHaveClass("flex");
	});

	it("includes background styling", () => {
		render(
			<AuthLayout>
				<div>Test Content</div>
			</AuthLayout>
		);

		const background = screen.getByTestId("auth-background");
		expect(background).toBeInTheDocument();
		expect(background).toHaveClass("bg-gradient-to-br");
	});

	it("is accessible with proper landmarks", () => {
		render(
			<AuthLayout>
				<div>Test Content</div>
			</AuthLayout>
		);

		expect(screen.getByRole("main")).toBeInTheDocument();
		expect(screen.getByRole("banner")).toBeInTheDocument();
	});

	it("includes skip link for accessibility", () => {
		render(
			<AuthLayout>
				<div>Test Content</div>
			</AuthLayout>
		);

		const skipLink = screen.getByText(/skip to main content/i);
		expect(skipLink).toBeInTheDocument();
		expect(skipLink).toHaveAttribute("href", "#main-content");
	});
});
