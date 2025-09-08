/**
 * Simple Error Handling Utilities for JFAN Frontend
 *
 * This module provides consistent error handling patterns across the application
 * with user-friendly error messages and recovery mechanisms.
 */

import { ApiError } from "@/lib/api-client";

// Error types for different scenarios
export enum ErrorType {
	NETWORK = "network",
	AUTHENTICATION = "authentication",
	VALIDATION = "validation",
	SERVER = "server",
	UNKNOWN = "unknown",
}

// Standardized error interface
export interface AppError {
	type: ErrorType;
	message: string;
	originalError?: Error;
	code?: string;
	details?: any;
	recoverable?: boolean;
}

// User-friendly error messages mapping
const ERROR_MESSAGES: Record<string, string> = {
	// Network errors
	"Failed to fetch": "Unable to connect to the server. Please check your internet connection.",
	"Request timeout": "The request took too long. Please try again.",
	"Network request failed": "Network error occurred. Please check your connection and try again.",

	// Authentication errors
	"Invalid credentials": "The email or password you entered is incorrect.",
	"Token expired": "Your session has expired. Please log in again.",
	Unauthorized: "You don't have permission to access this resource.",
	"Access denied": "Access denied. Please check your permissions.",

	// Validation errors
	"Validation failed": "Please check the information you entered and try again.",
	"Invalid email": "Please enter a valid email address.",
	"Password too weak": "Password must be at least 8 characters with letters and numbers.",
	"Required field missing": "Please fill in all required fields.",

	// Server errors
	"Internal server error": "Something went wrong on our end. Please try again later.",
	"Service unavailable": "The service is temporarily unavailable. Please try again later.",
	"Database error": "We're experiencing technical difficulties. Please try again later.",

	// Registration/Login specific
	"Email already exists": "An account with this email already exists. Try logging in instead.",
	"User not found": "No account found with this email address.",
	"Invalid verification code": "The verification code is incorrect or has expired.",
	"Registration failed": "Unable to create your account. Please try again.",
	"Login failed": "Login failed. Please check your credentials and try again.",
};

/**
 * Convert any error to a standardized AppError
 */
export function normalizeError(error: unknown): AppError {
	// Handle ApiError instances
	if (error instanceof ApiError) {
		return {
			type: getErrorType(error.status),
			message: getUserFriendlyMessage(error.message),
			originalError: error,
			code: error.code,
			details: error.details,
			recoverable: isRecoverable(error.status),
		};
	}

	// Handle standard Error instances
	if (error instanceof Error) {
		return {
			type: getErrorTypeFromMessage(error.message),
			message: getUserFriendlyMessage(error.message),
			originalError: error,
			recoverable: true,
		};
	}

	// Handle string errors
	if (typeof error === "string") {
		return {
			type: ErrorType.UNKNOWN,
			message: getUserFriendlyMessage(error),
			recoverable: true,
		};
	}

	// Handle unknown error types
	return {
		type: ErrorType.UNKNOWN,
		message: "An unexpected error occurred. Please try again.",
		originalError: error as Error,
		recoverable: true,
	};
}

/**
 * Get error type based on HTTP status code
 */
function getErrorType(status: number): ErrorType {
	if (status === 401 || status === 403) {
		return ErrorType.AUTHENTICATION;
	}
	if (status >= 400 && status < 500) {
		return ErrorType.VALIDATION;
	}
	if (status >= 500) {
		return ErrorType.SERVER;
	}
	return ErrorType.UNKNOWN;
}

/**
 * Get error type based on error message
 */
function getErrorTypeFromMessage(message: string): ErrorType {
	const lowerMessage = message.toLowerCase();

	if (lowerMessage.includes("network") || lowerMessage.includes("fetch") || lowerMessage.includes("timeout")) {
		return ErrorType.NETWORK;
	}
	if (lowerMessage.includes("unauthorized") || lowerMessage.includes("token") || lowerMessage.includes("auth")) {
		return ErrorType.AUTHENTICATION;
	}
	if (lowerMessage.includes("validation") || lowerMessage.includes("invalid") || lowerMessage.includes("required")) {
		return ErrorType.VALIDATION;
	}
	if (lowerMessage.includes("server") || lowerMessage.includes("internal")) {
		return ErrorType.SERVER;
	}

	return ErrorType.UNKNOWN;
}

/**
 * Convert technical error messages to user-friendly ones
 */
function getUserFriendlyMessage(message: string): string {
	// Direct mapping
	if (ERROR_MESSAGES[message]) {
		return ERROR_MESSAGES[message];
	}

	// Pattern matching for common error formats
	const lowerMessage = message.toLowerCase();

	// Network errors
	if (lowerMessage.includes("failed to fetch") || lowerMessage.includes("network")) {
		return ERROR_MESSAGES["Failed to fetch"];
	}

	// Authentication errors
	if (lowerMessage.includes("unauthorized") || lowerMessage.includes("invalid credentials")) {
		return ERROR_MESSAGES["Invalid credentials"];
	}

	// Validation errors
	if (lowerMessage.includes("validation") || lowerMessage.includes("invalid")) {
		return ERROR_MESSAGES["Validation failed"];
	}

	// Server errors
	if (lowerMessage.includes("internal server error") || lowerMessage.includes("500")) {
		return ERROR_MESSAGES["Internal server error"];
	}

	// Return original message if no mapping found, but clean it up
	return cleanErrorMessage(message);
}

/**
 * Clean up technical error messages for user display
 */
function cleanErrorMessage(message: string): string {
	// Remove technical prefixes
	const cleaned = message
		.replace(/^Error:\s*/i, "")
		.replace(/^ApiError:\s*/i, "")
		.replace(/^ValidationError:\s*/i, "")
		.replace(/HTTP \d+:\s*/i, "");

	// Capitalize first letter
	return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/**
 * Determine if an error is recoverable (user can retry)
 */
function isRecoverable(status?: number): boolean {
	if (!status) return true;

	// Non-recoverable errors
	if (status === 401 || status === 403 || status === 404) {
		return false;
	}

	// Recoverable errors (network, server, validation)
	return true;
}

/**
 * Handle form action errors consistently
 */
export function handleFormError(error: unknown): { error: string } {
	const normalizedError = normalizeError(error);
	return { error: normalizedError.message };
}

/**
 * Handle API errors with optional retry logic
 */
export async function handleApiError<T>(
	operation: () => Promise<T>,
	maxRetries: number = 3,
	onError?: (error: AppError, attempt: number) => void
): Promise<T> {
	let lastError: AppError;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await operation();
		} catch (error) {
			lastError = normalizeError(error);

			// Call error callback if provided
			if (onError) {
				onError(lastError, attempt);
			}

			// Don't retry non-recoverable errors
			if (!lastError.recoverable) {
				throw lastError;
			}

			// Don't retry on last attempt
			if (attempt === maxRetries) {
				break;
			}

			// Wait before retrying (exponential backoff)
			await delay(Math.pow(2, attempt - 1) * 1000);
		}
	}

	throw lastError!;
}

/**
 * Log errors for debugging and monitoring
 */
export function logError(error: AppError, context?: string): void {
	const logData = {
		type: error.type,
		message: error.message,
		context,
		timestamp: new Date().toISOString(),
		originalError: error.originalError?.message,
		code: error.code,
		details: error.details,
	};

	// In development, log to console
	if (process.env.NODE_ENV === "development") {
		console.error("Application Error:", logData);
		if (error.originalError) {
			console.error("Original Error:", error.originalError);
		}
	}

	// In production, you would send to monitoring service
	// Example: sendToMonitoringService(logData);
}

/**
 * Create error recovery suggestions
 */
export function getRecoverySuggestions(error: AppError): string[] {
	const suggestions: string[] = [];

	switch (error.type) {
		case ErrorType.NETWORK:
			suggestions.push("Check your internet connection");
			suggestions.push("Try refreshing the page");
			suggestions.push("Wait a moment and try again");
			break;

		case ErrorType.AUTHENTICATION:
			suggestions.push("Try logging in again");
			suggestions.push("Check if your session has expired");
			suggestions.push("Contact support if the problem persists");
			break;

		case ErrorType.VALIDATION:
			suggestions.push("Check the information you entered");
			suggestions.push("Make sure all required fields are filled");
			suggestions.push("Verify the format of your input");
			break;

		case ErrorType.SERVER:
			suggestions.push("Wait a few minutes and try again");
			suggestions.push("Contact support if the issue continues");
			break;

		default:
			suggestions.push("Try refreshing the page");
			suggestions.push("Contact support if the problem persists");
	}

	return suggestions;
}

/**
 * Utility function for delays
 */
function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Error boundary helper for React components
 */
export interface ErrorBoundaryState {
	hasError: boolean;
	error?: AppError;
}

export function createErrorBoundaryState(): ErrorBoundaryState {
	return { hasError: false };
}

export function handleErrorBoundary(error: Error): ErrorBoundaryState {
	const normalizedError = normalizeError(error);
	logError(normalizedError, "ErrorBoundary");

	return {
		hasError: true,
		error: normalizedError,
	};
}
