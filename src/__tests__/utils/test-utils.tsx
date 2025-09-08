import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";

// Mock providers for testing
const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
	const mockAuthValue = {
		user: null,
		isLoading: false,
		isAuthenticated: false,
		login: jest.fn(),
		logout: jest.fn(),
		register: jest.fn(),
	};

	return <AuthProvider value={mockAuthValue}>{children}</AuthProvider>;
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			<MockAuthProvider>{children}</MockAuthProvider>
		</ThemeProvider>
	);
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

// Custom matchers
export const expectToBeAccessible = async (element: HTMLElement) => {
	// Check for basic accessibility attributes
	const hasAriaLabel = element.hasAttribute("aria-label");
	const hasAriaLabelledBy = element.hasAttribute("aria-labelledby");
	const hasAriaDescribedBy = element.hasAttribute("aria-describedby");
	const hasRole = element.hasAttribute("role");

	expect(hasAriaLabel || hasAriaLabelledBy || hasAriaDescribedBy || hasRole).toBe(true);
};

// Mock user factory
export const createMockUser = (overrides = {}) => ({
	id: "1",
	email: "test@example.com",
	firstName: "Test",
	lastName: "User",
	userType: "job_seeker",
	isEmailVerified: true,
	onboardingCompleted: true,
	createdAt: new Date().toISOString(),
	...overrides,
});

// Mock form data factory
export const createMockFormData = (type: "login" | "register" | "verify", overrides = {}) => {
	const baseData = {
		login: {
			email: "test@example.com",
			password: "password123",
		},
		register: {
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
			password: "Password123!",
			confirmPassword: "Password123!",
			userType: "job_seeker",
		},
		verify: {
			email: "test@example.com",
			code: "123456",
		},
	};

	return { ...baseData[type], ...overrides };
};

// Wait for async operations
export const waitForLoadingToFinish = () => new Promise((resolve) => setTimeout(resolve, 0));

// Mock localStorage
export const mockLocalStorage = () => {
	const store: Record<string, string> = {};

	return {
		getItem: jest.fn((key: string) => store[key] || null),
		setItem: jest.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: jest.fn((key: string) => {
			delete store[key];
		}),
		clear: jest.fn(() => {
			Object.keys(store).forEach((key) => delete store[key]);
		}),
	};
};

// Mock sessionStorage
export const mockSessionStorage = () => {
	const store: Record<string, string> = {};

	return {
		getItem: jest.fn((key: string) => store[key] || null),
		setItem: jest.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: jest.fn((key: string) => {
			delete store[key];
		}),
		clear: jest.fn(() => {
			Object.keys(store).forEach((key) => delete store[key]);
		}),
	};
};

// Setup test environment
export const setupTestEnvironment = () => {
	// Mock window.matchMedia
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});

	// Mock IntersectionObserver
	global.IntersectionObserver = jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));

	// Mock ResizeObserver
	global.ResizeObserver = jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
};
