import { render, screen, waitFor } from "@testing-library/react";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { useRouter } from "next/navigation";

// Mock Next.js router
jest.mock("next/navigation");
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Mock auth context or hook
const mockUseAuth = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
	useAuth: () => mockUseAuth(),
}));

describe("RouteGuard", () => {
	beforeEach(() => {
		mockPush.mockClear();
		mockUseRouter.mockReturnValue({
			push: mockPush,
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
			forward: jest.fn(),
			refresh: jest.fn(),
		});
	});

	it("renders children when user is authenticated", () => {
		mockUseAuth.mockReturnValue({
			user: { id: "1", email: "test@example.com" },
			isLoading: false,
			isAuthenticated: true,
		});

		render(
			<RouteGuard>
				<div>Protected Content</div>
			</RouteGuard>
		);

		expect(screen.getByText("Protected Content")).toBeInTheDocument();
	});

	it("shows loading state while checking authentication", () => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: true,
			isAuthenticated: false,
		});

		render(
			<RouteGuard>
				<div>Protected Content</div>
			</RouteGuard>
		);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();
		expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
	});

	it("redirects to login when user is not authenticated", async () => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: false,
			isAuthenticated: false,
		});

		render(
			<RouteGuard>
				<div>Protected Content</div>
			</RouteGuard>
		);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/login");
		});
	});

	it("redirects to custom redirect path when provided", async () => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: false,
			isAuthenticated: false,
		});

		render(
			<RouteGuard redirectTo="/custom-login">
				<div>Protected Content</div>
			</RouteGuard>
		);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/custom-login");
		});
	});

	it("checks user roles when specified", () => {
		mockUseAuth.mockReturnValue({
			user: { id: "1", email: "test@example.com", userType: "job_seeker" },
			isLoading: false,
			isAuthenticated: true,
		});

		render(
			<RouteGuard allowedRoles={["company"]}>
				<div>Admin Content</div>
			</RouteGuard>
		);

		expect(screen.getByText(/access denied/i)).toBeInTheDocument();
		expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
	});

	it("allows access when user has required role", () => {
		mockUseAuth.mockReturnValue({
			user: { id: "1", email: "test@example.com", userType: "company" },
			isLoading: false,
			isAuthenticated: true,
		});

		render(
			<RouteGuard allowedRoles={["company"]}>
				<div>Company Content</div>
			</RouteGuard>
		);

		expect(screen.getByText("Company Content")).toBeInTheDocument();
	});

	it("requires email verification when specified", () => {
		mockUseAuth.mockReturnValue({
			user: {
				id: "1",
				email: "test@example.com",
				userType: "job_seeker",
				isEmailVerified: false,
			},
			isLoading: false,
			isAuthenticated: true,
		});

		render(
			<RouteGuard requireEmailVerification>
				<div>Verified Content</div>
			</RouteGuard>
		);

		expect(screen.getByText(/please verify your email/i)).toBeInTheDocument();
		expect(screen.queryByText("Verified Content")).not.toBeInTheDocument();
	});

	it("allows access when email is verified", () => {
		mockUseAuth.mockReturnValue({
			user: {
				id: "1",
				email: "test@example.com",
				userType: "job_seeker",
				isEmailVerified: true,
			},
			isLoading: false,
			isAuthenticated: true,
		});

		render(
			<RouteGuard requireEmailVerification>
				<div>Verified Content</div>
			</RouteGuard>
		);

		expect(screen.getByText("Verified Content")).toBeInTheDocument();
	});
});
