/**
 * Toast Notification Service
 *
 * Provides a unified interface for showing user feedback messages
 * using Sonner toast library with consistent styling and behavior.
 */

import { toast as sonnerToast } from "sonner";
import { AppError, ErrorType } from "@/lib/error-handling";

// Toast types for different message categories
export enum ToastType {
	SUCCESS = "success",
	ERROR = "error",
	WARNING = "warning",
	INFO = "info",
	LOADING = "loading",
}

// Toast configuration options
export interface ToastOptions {
	duration?: number;
	position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
	dismissible?: boolean;
	action?: {
		label: string;
		onClick: () => void;
	};
	cancel?: {
		label: string;
		onClick?: () => void;
	};
	id?: string;
}

// Default configurations for different toast types
const DEFAULT_DURATIONS = {
	[ToastType.SUCCESS]: 4000,
	[ToastType.ERROR]: 6000,
	[ToastType.WARNING]: 5000,
	[ToastType.INFO]: 4000,
	[ToastType.LOADING]: Infinity,
};

/**
 * Toast Service Class
 */
class ToastService {
	/**
	 * Show success message
	 */
	success(message: string, options?: ToastOptions): string | number {
		return sonnerToast.success(message, {
			duration: options?.duration || DEFAULT_DURATIONS[ToastType.SUCCESS],
			dismissible: options?.dismissible ?? true,
			action: options?.action,
			cancel: options?.cancel,
			id: options?.id,
		});
	}

	/**
	 * Show error message
	 */
	error(message: string, options?: ToastOptions): string | number {
		return sonnerToast.error(message, {
			duration: options?.duration || DEFAULT_DURATIONS[ToastType.ERROR],
			dismissible: options?.dismissible ?? true,
			action: options?.action,
			cancel: options?.cancel,
			id: options?.id,
		});
	}

	/**
	 * Show warning message
	 */
	warning(message: string, options?: ToastOptions): string | number {
		return sonnerToast.warning(message, {
			duration: options?.duration || DEFAULT_DURATIONS[ToastType.WARNING],
			dismissible: options?.dismissible ?? true,
			action: options?.action,
			cancel: options?.cancel,
			id: options?.id,
		});
	}

	/**
	 * Show info message
	 */
	info(message: string, options?: ToastOptions): string | number {
		return sonnerToast.info(message, {
			duration: options?.duration || DEFAULT_DURATIONS[ToastType.INFO],
			dismissible: options?.dismissible ?? true,
			action: options?.action,
			cancel: options?.cancel,
			id: options?.id,
		});
	}

	/**
	 * Show loading message
	 */
	loading(message: string, options?: ToastOptions): string | number {
		return sonnerToast.loading(message, {
			duration: options?.duration || DEFAULT_DURATIONS[ToastType.LOADING],
			dismissible: options?.dismissible ?? false,
			id: options?.id,
		});
	}

	/**
	 * Show custom message
	 */
	custom(message: string, options?: ToastOptions): string | number {
		return sonnerToast(message, {
			duration: options?.duration || DEFAULT_DURATIONS[ToastType.INFO],
			dismissible: options?.dismissible ?? true,
			action: options?.action,
			cancel: options?.cancel,
			id: options?.id,
		});
	}

	/**
	 * Show error from AppError object
	 */
	showError(error: AppError, options?: ToastOptions): string | number {
		const retryAction = error.recoverable && options?.action ? options.action : undefined;

		return this.error(error.message, {
			...options,
			action: retryAction,
			duration: this.getErrorDuration(error.type),
		});
	}

	/**
	 * Show promise-based toast (loading -> success/error)
	 */
	promise<T>(
		promise: Promise<T>,
		messages: {
			loading: string;
			success: string | ((data: T) => string);
			error: string | ((error: any) => string);
		},
		options?: ToastOptions
	): Promise<T> {
		return sonnerToast.promise(promise, {
			loading: messages.loading,
			success: messages.success,
			error: messages.error,
			duration: options?.duration,
			dismissible: options?.dismissible,
			action: options?.action,
			cancel: options?.cancel,
			id: options?.id,
		});
	}

	/**
	 * Dismiss a specific toast
	 */
	dismiss(id?: string | number): void {
		sonnerToast.dismiss(id);
	}

	/**
	 * Dismiss all toasts
	 */
	dismissAll(): void {
		sonnerToast.dismiss();
	}

	/**
	 * Update an existing toast
	 */
	update(id: string | number, message: string, type?: ToastType): void {
		const updateFn = type ? sonnerToast[type] : sonnerToast;
		updateFn(message, { id });
	}

	/**
	 * Get appropriate duration for error types
	 */
	private getErrorDuration(errorType: ErrorType): number {
		switch (errorType) {
			case ErrorType.NETWORK:
				return 8000; // Longer for network errors
			case ErrorType.AUTHENTICATION:
				return 10000; // Longer for auth errors
			case ErrorType.SERVER:
				return 8000; // Longer for server errors
			default:
				return DEFAULT_DURATIONS[ToastType.ERROR];
		}
	}
}

// Create singleton instance
export const toast = new ToastService();

// Convenience functions for common use cases
export const showSuccess = (message: string, options?: ToastOptions) => toast.success(message, options);
export const showError = (message: string, options?: ToastOptions) => toast.error(message, options);
export const showWarning = (message: string, options?: ToastOptions) => toast.warning(message, options);
export const showInfo = (message: string, options?: ToastOptions) => toast.info(message, options);
export const showLoading = (message: string, options?: ToastOptions) => toast.loading(message, options);

// Specialized functions for common scenarios
export const showAuthError = (error: AppError) => {
	return toast.showError(error, {
		action: {
			label: "Sign In",
			onClick: () => (window.location.href = "/login"),
		},
	});
};

export const showNetworkError = (error: AppError, onRetry?: () => void) => {
	return toast.showError(error, {
		action: onRetry
			? {
					label: "Retry",
					onClick: onRetry,
			  }
			: undefined,
	});
};

export const showFormSuccess = (message: string = "Changes saved successfully!") => {
	return toast.success(message, {
		duration: 3000,
	});
};

export const showFormError = (message: string) => {
	return toast.error(message, {
		duration: 5000,
	});
};

// Form submission helpers
export const handleFormSubmission = async <T>(
	operation: () => Promise<T>,
	messages: {
		loading: string;
		success: string;
		error?: string;
	}
): Promise<T> => {
	return toast.promise(operation(), {
		loading: messages.loading,
		success: messages.success,
		error: messages.error || "Operation failed. Please try again.",
	});
};

// Authentication flow helpers
export const showRegistrationSuccess = () => {
	return toast.success("Account created successfully! Please check your email to verify your account.", {
		duration: 6000,
	});
};

export const showLoginSuccess = (userName?: string) => {
	const message = userName ? `Welcome back, ${userName}!` : "Successfully signed in!";
	return toast.success(message, {
		duration: 3000,
	});
};

export const showLogoutSuccess = () => {
	return toast.success("Successfully signed out!", {
		duration: 2000,
	});
};

export const showEmailVerificationSuccess = () => {
	return toast.success("Email verified successfully! You can now sign in.", {
		duration: 4000,
	});
};

export const showPasswordResetSuccess = () => {
	return toast.success("Password reset link sent to your email!", {
		duration: 5000,
	});
};

export const showOnboardingSuccess = () => {
	return toast.success("Profile setup completed! Welcome to JFAN!", {
		duration: 4000,
	});
};

// Confirmation toasts with actions
export const showDeleteConfirmation = (itemName: string, onConfirm: () => void) => {
	return toast.warning(`Are you sure you want to delete ${itemName}?`, {
		duration: 10000,
		action: {
			label: "Delete",
			onClick: onConfirm,
		},
		cancel: {
			label: "Cancel",
		},
	});
};

export const showUnsavedChanges = (onSave: () => void, onDiscard: () => void) => {
	return toast.warning("You have unsaved changes. What would you like to do?", {
		duration: 15000,
		action: {
			label: "Save",
			onClick: onSave,
		},
		cancel: {
			label: "Discard",
			onClick: onDiscard,
		},
	});
};

// Export the main toast service
export default toast;
