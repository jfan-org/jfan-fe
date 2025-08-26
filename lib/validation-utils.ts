import { ZodError, ZodSchema } from "zod";
import { UserType } from "@/types/auth.types";
import { getValidationSchema } from "./validation.auth";

export interface ValidationResult {
	success: boolean;
	errors: Record<string, string>;
	data?: any;
}

export function validateFormData(data: any, userType?: UserType): ValidationResult {
	try {
		const schema = userType ? getValidationSchema(userType) : getValidationSchema(UserType.TALENT);
		const validatedData = schema.parse(data);

		return {
			success: true,
			errors: {},
			data: validatedData,
		};
	} catch (error) {
		if (error instanceof ZodError) {
			const errors: Record<string, string> = {};

			error.errors.forEach((err) => {
				const path = err.path.join(".");
				errors[path] = err.message;
			});

			return {
				success: false,
				errors,
			};
		}

		return {
			success: false,
			errors: { general: "Validation failed" },
		};
	}
}

export function validateField(fieldName: string, value: any, userType?: UserType): string | null {
	try {
		const schema = userType ? getValidationSchema(userType) : getValidationSchema(UserType.TALENT);

		// Create a partial schema for the specific field
		const fieldSchema = schema.shape[fieldName as keyof typeof schema.shape];
		if (!fieldSchema) return null;

		fieldSchema.parse(value);
		return null;
	} catch (error) {
		if (error instanceof ZodError) {
			return error.errors[0]?.message || "Invalid value";
		}
		return "Validation error";
	}
}

export function getFieldError(errors: Record<string, string>, fieldName: string): string | undefined {
	return errors[fieldName];
}

export function hasFieldError(errors: Record<string, string>, fieldName: string): boolean {
	return Boolean(errors[fieldName]);
}

export function clearFieldError(errors: Record<string, string>, fieldName: string): Record<string, string> {
	const newErrors = { ...errors };
	delete newErrors[fieldName];
	return newErrors;
}

export function setFieldError(errors: Record<string, string>, fieldName: string, message: string): Record<string, string> {
	return {
		...errors,
		[fieldName]: message,
	};
}

export function hasAnyErrors(errors: Record<string, string>): boolean {
	return Object.keys(errors).length > 0;
}

export function getErrorCount(errors: Record<string, string>): number {
	return Object.keys(errors).length;
}

export function getFirstError(errors: Record<string, string>): string | null {
	const firstKey = Object.keys(errors)[0];
	return firstKey ? errors[firstKey] : null;
}

export function formatValidationErrors(errors: Record<string, string>): string[] {
	return Object.values(errors);
}

// Password strength validation
export function validatePasswordStrength(password: string): {
	score: number;
	feedback: string[];
	isValid: boolean;
} {
	const feedback: string[] = [];
	let score = 0;

	if (password.length >= 8) {
		score += 1;
	} else {
		feedback.push("Password must be at least 8 characters long");
	}

	if (/[a-z]/.test(password)) {
		score += 1;
	} else {
		feedback.push("Password must contain at least one lowercase letter");
	}

	if (/[A-Z]/.test(password)) {
		score += 1;
	} else {
		feedback.push("Password must contain at least one uppercase letter");
	}

	if (/\d/.test(password)) {
		score += 1;
	} else {
		feedback.push("Password must contain at least one number");
	}

	if (/[^a-zA-Z0-9]/.test(password)) {
		score += 1;
	} else {
		feedback.push("Password should contain at least one special character");
	}

	return {
		score,
		feedback,
		isValid: score >= 4, // Require at least 4 out of 5 criteria
	};
}

// Email validation
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Phone validation
export function validatePhone(phone: string): boolean {
	const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
	return phoneRegex.test(phone);
}

// URL validation
export function validateUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}
