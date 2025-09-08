/**
 * Simple Error Logging Service
 *
 * Provides error logging and recovery mechanisms for the application
 */

import { AppError, ErrorType } from "@/lib/error-handling";

// Error log entry interface
interface ErrorLogEntry {
	id: string;
	timestamp: string;
	type: ErrorType;
	message: string;
	context?: string;
	userAgent?: string;
	url?: string;
	userId?: string;
	sessionId?: string;
	originalError?: {
		name: string;
		message: string;
		stack?: string;
	};
	code?: string;
	details?: any;
}

// Error statistics for monitoring
interface ErrorStats {
	totalErrors: number;
	errorsByType: Record<ErrorType, number>;
	recentErrors: ErrorLogEntry[];
	lastError?: ErrorLogEntry;
}

class ErrorLogger {
	private logs: ErrorLogEntry[] = [];
	private maxLogs = 100; // Keep last 100 errors in memory

	/**
	 * Log an error with context information
	 */
	log(error: AppError, context?: string, userId?: string): string {
		const id = this.generateId();
		const entry: ErrorLogEntry = {
			id,
			timestamp: new Date().toISOString(),
			type: error.type,
			message: error.message,
			context,
			userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
			url: typeof window !== "undefined" ? window.location.href : undefined,
			userId,
			sessionId: this.getSessionId(),
			originalError: error.originalError
				? {
						name: error.originalError.name,
						message: error.originalError.message,
						stack: error.originalError.stack,
				  }
				: undefined,
			code: error.code,
			details: error.details,
		};

		// Add to in-memory logs
		this.logs.push(entry);

		// Keep only recent logs
		if (this.logs.length > this.maxLogs) {
			this.logs = this.logs.slice(-this.maxLogs);
		}

		// Log to console in development
		if (process.env.NODE_ENV === "development") {
			this.logToConsole(entry);
		}

		// Send to monitoring service in production
		if (process.env.NODE_ENV === "production") {
			this.sendToMonitoringService(entry);
		}

		// Store in localStorage for debugging
		this.storeInLocalStorage(entry);

		return id;
	}

	/**
	 * Get error statistics
	 */
	getStats(): ErrorStats {
		const errorsByType = this.logs.reduce((acc, log) => {
			acc[log.type] = (acc[log.type] || 0) + 1;
			return acc;
		}, {} as Record<ErrorType, number>);

		return {
			totalErrors: this.logs.length,
			errorsByType,
			recentErrors: this.logs.slice(-10), // Last 10 errors
			lastError: this.logs[this.logs.length - 1],
		};
	}

	/**
	 * Get logs by type
	 */
	getLogsByType(type: ErrorType): ErrorLogEntry[] {
		return this.logs.filter((log) => log.type === type);
	}

	/**
	 * Get recent logs
	 */
	getRecentLogs(count: number = 10): ErrorLogEntry[] {
		return this.logs.slice(-count);
	}

	/**
	 * Clear all logs
	 */
	clear(): void {
		this.logs = [];
		if (typeof window !== "undefined") {
			localStorage.removeItem("jfan_error_logs");
		}
	}

	/**
	 * Export logs for debugging
	 */
	exportLogs(): string {
		return JSON.stringify(this.logs, null, 2);
	}

	/**
	 * Log to console with formatting
	 */
	private logToConsole(entry: ErrorLogEntry): void {
		const style = this.getConsoleStyle(entry.type);

		console.group(`%c[${entry.type.toUpperCase()}] ${entry.message}`, style);
		console.log("Timestamp:", entry.timestamp);
		console.log("Context:", entry.context || "None");
		console.log("URL:", entry.url || "Unknown");

		if (entry.originalError) {
			console.log("Original Error:", entry.originalError);
		}

		if (entry.details) {
			console.log("Details:", entry.details);
		}

		console.groupEnd();
	}

	/**
	 * Get console styling for error types
	 */
	private getConsoleStyle(type: ErrorType): string {
		const styles = {
			[ErrorType.NETWORK]: "color: #f59e0b; font-weight: bold;",
			[ErrorType.AUTHENTICATION]: "color: #ef4444; font-weight: bold;",
			[ErrorType.VALIDATION]: "color: #f97316; font-weight: bold;",
			[ErrorType.SERVER]: "color: #dc2626; font-weight: bold;",
			[ErrorType.UNKNOWN]: "color: #6b7280; font-weight: bold;",
		};

		return styles[type] || styles[ErrorType.UNKNOWN];
	}

	/**
	 * Store error in localStorage for debugging
	 */
	private storeInLocalStorage(entry: ErrorLogEntry): void {
		if (typeof window === "undefined") return;

		try {
			const stored = localStorage.getItem("jfan_error_logs");
			const logs = stored ? JSON.parse(stored) : [];

			logs.push(entry);

			// Keep only last 50 errors in localStorage
			if (logs.length > 50) {
				logs.splice(0, logs.length - 50);
			}

			localStorage.setItem("jfan_error_logs", JSON.stringify(logs));
		} catch (error) {
			console.warn("Failed to store error in localStorage:", error);
		}
	}

	/**
	 * Send error to monitoring service (placeholder)
	 */
	private async sendToMonitoringService(entry: ErrorLogEntry): Promise<void> {
		try {
			// In a real application, you would send to a service like:
			// - Sentry
			// - LogRocket
			// - Datadog
			// - Custom logging endpoint

			// Example implementation:
			/*
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      */

			// For now, just log that we would send it
			console.log("Would send to monitoring service:", entry.id);
		} catch (error) {
			console.warn("Failed to send error to monitoring service:", error);
		}
	}

	/**
	 * Generate unique error ID
	 */
	private generateId(): string {
		return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Get session ID for tracking
	 */
	private getSessionId(): string {
		if (typeof window === "undefined") return "server";

		let sessionId = sessionStorage.getItem("jfan_session_id");
		if (!sessionId) {
			sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			sessionStorage.setItem("jfan_session_id", sessionId);
		}

		return sessionId;
	}
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

// Convenience functions
export function logError(error: AppError, context?: string, userId?: string): string {
	return errorLogger.log(error, context, userId);
}

export function getErrorStats(): ErrorStats {
	return errorLogger.getStats();
}

export function clearErrorLogs(): void {
	errorLogger.clear();
}

export function exportErrorLogs(): string {
	return errorLogger.exportLogs();
}

// Error recovery utilities
export class ErrorRecovery {
	private static retryAttempts = new Map<string, number>();
	private static maxRetries = 3;

	/**
	 * Attempt to recover from an error with retry logic
	 */
	static async attemptRecovery<T>(operation: () => Promise<T>, errorId: string, onRetry?: (attempt: number) => void): Promise<T> {
		const attempts = this.retryAttempts.get(errorId) || 0;

		if (attempts >= this.maxRetries) {
			throw new Error(`Max retry attempts (${this.maxRetries}) exceeded for operation`);
		}

		try {
			const result = await operation();
			// Reset retry count on success
			this.retryAttempts.delete(errorId);
			return result;
		} catch (error) {
			const newAttempts = attempts + 1;
			this.retryAttempts.set(errorId, newAttempts);

			if (onRetry) {
				onRetry(newAttempts);
			}

			// Wait before retrying (exponential backoff)
			await this.delay(Math.pow(2, attempts) * 1000);

			throw error;
		}
	}

	/**
	 * Reset retry attempts for an operation
	 */
	static resetRetries(errorId: string): void {
		this.retryAttempts.delete(errorId);
	}

	/**
	 * Get retry count for an operation
	 */
	static getRetryCount(errorId: string): number {
		return this.retryAttempts.get(errorId) || 0;
	}

	/**
	 * Delay utility
	 */
	private static delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

// Global error handler for unhandled errors
if (typeof window !== "undefined") {
	window.addEventListener("error", (event) => {
		const error: AppError = {
			type: ErrorType.UNKNOWN,
			message: event.message || "Unhandled error occurred",
			originalError: event.error,
			recoverable: false,
		};

		logError(error, "Global error handler");
	});

	window.addEventListener("unhandledrejection", (event) => {
		const error: AppError = {
			type: ErrorType.UNKNOWN,
			message: "Unhandled promise rejection",
			originalError: event.reason,
			recoverable: false,
		};

		logError(error, "Unhandled promise rejection");
	});
}
