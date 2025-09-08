"use client";

import React, { createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";
import { createAriaAttributes, announceFormError, announceFormSuccess } from "@/lib/accessibility";

// Form Context
interface FormContextValue {
	formId: string;
	errors: Record<string, string>;
	isSubmitting: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

// Form Root Component
interface AccessibleFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	errors?: Record<string, string>;
	isSubmitting?: boolean;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode;
}

export function AccessibleForm({ errors = {}, isSubmitting = false, onSubmit, children, className, ...props }: AccessibleFormProps) {
	const formId = useId();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Announce form submission
		if (isSubmitting) {
			announceFormSuccess("Form is being submitted");
		}

		// Check for errors and announce them
		const errorKeys = Object.keys(errors);
		if (errorKeys.length > 0) {
			const firstError = errors[errorKeys[0]];
			announceFormError(errorKeys[0], firstError);
		}

		onSubmit?.(e);
	};

	return (
		<FormContext.Provider value={{ formId, errors, isSubmitting }}>
			<form
				{...props}
				onSubmit={handleSubmit}
				className={cn("mobile-form", className)}
				noValidate // We handle validation ourselves for better accessibility
				aria-busy={isSubmitting}>
				{children}
			</form>
		</FormContext.Provider>
	);
}

// Field Group Component
interface FieldGroupProps {
	children: React.ReactNode;
	className?: string;
}

export function FieldGroup({ children, className }: FieldGroupProps) {
	return (
		<div className={cn("mobile-spacing-sm", className)} role="group">
			{children}
		</div>
	);
}

// Label Component
interface AccessibleLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	required?: boolean;
	children: React.ReactNode;
}

export function AccessibleLabel({ required, children, className, ...props }: AccessibleLabelProps) {
	return (
		<label className={cn("mobile-text-sm font-medium text-gray-700 block", className)} {...props}>
			{children}
			{required && (
				<span className="text-red-500 ml-1" aria-label="required">
					*
				</span>
			)}
		</label>
	);
}

// Input Component
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	description?: string;
	required?: boolean;
}

export function AccessibleInput({ label, error, description, required, className, id, ...props }: AccessibleInputProps) {
	const context = useContext(FormContext);
	const generatedId = useId();
	const inputId = id || generatedId;
	const errorId = `${inputId}-error`;
	const descriptionId = `${inputId}-description`;

	const fieldError = error || context?.errors[props.name || ""];
	const hasError = Boolean(fieldError);

	const ariaAttributes = createAriaAttributes({
		required,
		invalid: hasError,
		describedBy: [description ? descriptionId : "", hasError ? errorId : ""].filter(Boolean).join(" ") || undefined,
	});

	return (
		<FieldGroup>
			{label && (
				<AccessibleLabel htmlFor={inputId} required={required}>
					{label}
				</AccessibleLabel>
			)}

			{description && (
				<p id={descriptionId} className="mobile-text-sm text-gray-600 mt-1">
					{description}
				</p>
			)}

			<input
				{...props}
				{...ariaAttributes}
				id={inputId}
				className={cn(
					"touch-input w-full border border-gray-200 bg-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
					hasError && "border-red-500 focus-visible:ring-red-500",
					className
				)}
			/>

			{hasError && (
				<p id={errorId} className="mobile-text-sm text-red-600 mt-1" role="alert" aria-live="polite">
					{fieldError}
				</p>
			)}
		</FieldGroup>
	);
}

// Button Component
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	loading?: boolean;
	loadingText?: string;
	children: React.ReactNode;
}

export function AccessibleButton({
	variant = "primary",
	size = "md",
	loading = false,
	loadingText = "Loading...",
	children,
	className,
	disabled,
	...props
}: AccessibleButtonProps) {
	const context = useContext(FormContext);
	const isDisabled = disabled || loading || context?.isSubmitting;

	const variantClasses = {
		primary: "bg-green-600 hover:bg-green-700 text-white",
		secondary: "bg-gray-600 hover:bg-gray-700 text-white",
		outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
		ghost: "hover:bg-gray-100 text-gray-700",
	};

	const sizeClasses = {
		sm: "h-8 px-3 text-sm",
		md: "h-10 px-4 text-base",
		lg: "h-12 px-6 text-lg",
	};

	const ariaAttributes = createAriaAttributes({
		disabled: isDisabled,
	});

	return (
		<button
			{...props}
			{...ariaAttributes}
			disabled={isDisabled}
			className={cn(
				"touch-button font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				variantClasses[variant],
				sizeClasses[size],
				loading && "cursor-wait",
				className
			)}>
			{loading ? (
				<span className="flex items-center justify-center">
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					<span className="sr-only">Loading: </span>
					{loadingText}
				</span>
			) : (
				children
			)}
		</button>
	);
}

// Fieldset Component for grouping related fields
interface FieldsetProps {
	legend: string;
	children: React.ReactNode;
	className?: string;
}

export function Fieldset({ legend, children, className }: FieldsetProps) {
	return (
		<fieldset className={cn("border border-gray-200 rounded-lg p-4", className)}>
			<legend className="mobile-text-base font-medium text-gray-900 px-2">{legend}</legend>
			<div className="mt-4 mobile-spacing-md">{children}</div>
		</fieldset>
	);
}

// Error Summary Component
interface ErrorSummaryProps {
	errors: Record<string, string>;
	title?: string;
}

export function ErrorSummary({ errors, title = "Please fix the following errors:" }: ErrorSummaryProps) {
	const errorEntries = Object.entries(errors);

	if (errorEntries.length === 0) return null;

	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" role="alert" aria-live="assertive">
			<h2 className="mobile-text-base font-medium text-red-800 mb-2">{title}</h2>
			<ul className="mobile-text-sm text-red-700 space-y-1">
				{errorEntries.map(([field, error]) => (
					<li key={field}>
						<a
							href={`#${field}`}
							className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded">
							{error}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
