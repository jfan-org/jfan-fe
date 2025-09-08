import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { AuthProvider } from "@/contexts/AuthContext";

// Mock Next.js router
jest.mock("next/navigation");
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Mock auth hook
const mockUseAuth = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
	useAuth: () => mockUseAuth(),
}));

describe("Route Protection Integration", () => {
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

	describe("Authentication-based Protection", () => {
		it("allows access to authenticated users", () => {
			mockUseAuth.mockReturnValue({
				user: { id: "1", email: "test@example.com", userType: "job_seeker" },
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard>
						<div>Protected Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText("Protected Content")).toBeInTheDocument();
		});

		it("redirects unauthenticated users to login", async () => {
			mockUseAuth.mockReturnValue({
				user: null,
				isLoading: false,
				isAuthenticated: false,
			});

			render(
				<AuthProvider>
					<RouteGuard>
						<div>Protected Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			await waitFor(() => {
				expect(mockPush).toHaveBeenCalledWith("/login");
			});
		});

		it("preserves intended destination in redirect", async () => {
			mockUseAuth.mockReturnValue({
				user: null,
				isLoading: false,
				isAuthenticated: false,
			});

			// Mock current pathname
			Object.defineProperty(window, "location", {
				value: { pathname: "/dashboard/profile" },
				writable: true,
			});

			render(
				<AuthProvider>
					<RouteGuard>
						<div>Protected Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			await waitFor(() => {
				expect(mockPush).toHaveBeenCalledWith("/login?redirect=/dashboard/profile");
			});
		});
	});

	describe("Role-based Protection", () => {
		it("allows access to users with correct role", () => {
			mockUseAuth.mockReturnValue({
				user: { id: "1", email: "admin@example.com", userType: "admin" },
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard allowedRoles={["admin"]}>
						<div>Admin Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText("Admin Content")).toBeInTheDocument();
		});

		it("denies access to users without correct role", () => {
			mockUseAuth.mockReturnValue({
				user: { id: "1", email: "user@example.com", userType: "job_seeker" },
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard allowedRoles={["admin"]}>
						<div>Admin Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText(/access denied/i)).toBeInTheDocument();
			expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
		});

		it("allows multiple roles", () => {
			mockUseAuth.mockReturnValue({
				user: { id: "1", email: "company@example.com", userType: "company" },
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard allowedRoles={["company", "talent_acquisition"]}>
						<div>Hiring Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText("Hiring Content")).toBeInTheDocument();
		});
	});

	describe("Email Verification Protection", () => {
		it("allows access to users with verified email", () => {
			mockUseAuth.mockReturnValue({
				user: {
					id: "1",
					email: "verified@example.com",
					userType: "job_seeker",
					isEmailVerified: true,
				},
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard requireEmailVerification>
						<div>Verified Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText("Verified Content")).toBeInTheDocument();
		});

		it("blocks access for unverified users", () => {
			mockUseAuth.mockReturnValue({
				user: {
					id: "1",
					email: "unverified@example.com",
					userType: "job_seeker",
					isEmailVerified: false,
				},
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard requireEmailVerification>
						<div>Verified Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText(/please verify your email/i)).toBeInTheDocument();
			expect(screen.queryByText("Verified Content")).not.toBeInTheDocument();
		});

		it("provides verification link for unverified users", () => {
			mockUseAuth.mockReturnValue({
				user: {
					id: "1",
					email: "unverified@example.com",
					userType: "job_seeker",
					isEmailVerified: false,
				},
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard requireEmailVerification>
						<div>Verified Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			const verifyLink = screen.getByRole("link", { name: /verify now/i });
			expect(verifyLink).toBeInTheDocument();
			expect(verifyLink).toHaveAttribute("href", "/verify-email");
		});
	});

	describe("Onboarding Protection", () => {
		it("redirects incomplete users to onboarding", async () => {
			mockUseAuth.mockReturnValue({
				user: {
					id: "1",
					email: "new@example.com",
					userType: "job_seeker",
					isEmailVerified: true,
					onboardingCompleted: false,
				},
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard requireOnboarding>
						<div>Dashboard Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			await waitFor(() => {
				expect(mockPush).toHaveBeenCalledWith("/onboarding");
			});
		});

		it("allows access to users who completed onboarding", () => {
			mockUseAuth.mockReturnValue({
				user: {
					id: "1",
					email: "complete@example.com",
					userType: "job_seeker",
					isEmailVerified: true,
					onboardingCompleted: true,
				},
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard requireOnboarding>
						<div>Dashboard Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
		});
	});

	describe("Combined Protection Rules", () => {
		it("enforces multiple protection rules", () => {
			mockUseAuth.mockReturnValue({
				user: {
					id: "1",
					email: "admin@example.com",
					userType: "admin",
					isEmailVerified: true,
					onboardingCompleted: true,
				},
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard allowedRoles={["admin"]} requireEmailVerification requireOnboarding>
						<div>Super Protected Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText("Super Protected Content")).toBeInTheDocument();
		});

		it("fails if any protection rule is not met", () => {
			mockUseAuth.mockReturnValue({
				user: {
					id: "1",
					email: "admin@example.com",
					userType: "admin",
					isEmailVerified: false, // This should fail the check
					onboardingCompleted: true,
				},
				isLoading: false,
				isAuthenticated: true,
			});

			render(
				<AuthProvider>
					<RouteGuard allowedRoles={["admin"]} requireEmailVerification requireOnboarding>
						<div>Super Protected Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByText(/please verify your email/i)).toBeInTheDocument();
			expect(screen.queryByText("Super Protected Content")).not.toBeInTheDocument();
		});
	});

	describe("Loading States", () => {
		it("shows loading spinner while checking authentication", () => {
			mockUseAuth.mockReturnValue({
				user: null,
				isLoading: true,
				isAuthenticated: false,
			});

			render(
				<AuthProvider>
					<RouteGuard>
						<div>Protected Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			expect(screen.getByRole("progressbar")).toBeInTheDocument();
			expect(screen.getByText(/loading/i)).toBeInTheDocument();
		});

		it("has accessible loading state", () => {
			mockUseAuth.mockReturnValue({
				user: null,
				isLoading: true,
				isAuthenticated: false,
			});

			render(
				<AuthProvider>
					<RouteGuard>
						<div>Protected Content</div>
					</RouteGuard>
				</AuthProvider>
			);

			const loadingElement = screen.getByRole("progressbar");
			expect(loadingElement).toHaveAttribute("aria-label", "Checking authentication");
		});
	});
});
