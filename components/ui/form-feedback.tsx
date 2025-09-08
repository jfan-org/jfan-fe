/**
 * Form Feedback Components
 *
 * Inline validation feedback and form state indicators
 */

import { CheckCircle, AlertCircle, AlertTriangle, Info, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Feedback types
type FeedbackType = "success" | "error" | "warning" | "info";

interface FormFeedbackProps {
	type: FeedbackType;
	message: string;
	className?: string;
}

/**
 * Basic form feedback message
 */
export function FormFeedback({ type, message, className }: FormFeedbackProps) {
	if (!message) return null;

	const icons = {
		success: CheckCircle,
		error: AlertCircle,
		warning: AlertTriangle,
		info: Info,
	};

	const styles = {
		success: "text-green-600 bg-green-50 border-green-200",
		error: "text-red-600 bg-red-50 border-red-200",
		warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
		info: "text-blue-600 bg-blue-50 border-blue-200",
	};

	const Icon = icons[type];

	return (
		<div className={cn("flex items-start gap-2 p-3 rounded-md border text-sm", styles[type], className)}>
			<Icon className="h-4 w-4 flex-shrink-0 mt-0.5" />
			<span>{message}</span>
		</div>
	);
}

/**
 * Inline field error message
 */
interface FieldErrorProps {
	error?: string;
	className?: string;
}

export function FieldError({ error, className }: FieldErrorProps) {
	if (!error) return null;

	return (
		<p className={cn("text-sm text-red-600 mt-1 flex items-center gap-1", className)}>
			<AlertCircle className="h-3 w-3 flex-shrink-0" />
			{error}
		</p>
	);
}

/**
 * Field success message
 */
interface FieldSuccessProps {
	message?: string;
	className?: string;
}

export function FieldSuccess({ message, className }: FieldSuccessProps) {
	if (!message) return null;

	return (
		<p className={cn("text-sm text-green-600 mt-1 flex items-center gap-1", className)}>
			<CheckCircle className="h-3 w-3 flex-shrink-0" />
			{message}
		</p>
	);
}

/**
 * Field help text
 */
interface FieldHelpProps {
	text?: string;
	className?: string;
}

export function FieldHelp({ text, className }: FieldHelpProps) {
	if (!text) return null;

	return <p className={cn("text-sm text-muted-foreground mt-1", className)}>{text}</p>;
}

/**
 * Password strength indicator
 */
interface PasswordStrengthProps {
	password: string;
	className?: string;
	showRequirements?: boolean;
}

export function PasswordStrength({ password, className, showRequirements = true }: PasswordStrengthProps) {
	const requirements = [
		{ label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
		{ label: "Contains uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
		{ label: "Contains lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
		{ label: "Contains number", test: (pwd: string) => /\d/.test(pwd) },
		{ label: "Contains special character", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
	];

	const passedRequirements = requirements.filter((req) => req.test(password));
	const strength = passedRequirements.length;

	const getStrengthLabel = () => {
		if (strength === 0) return "";
		if (strength <= 2) return "Weak";
		if (strength <= 3) return "Fair";
		if (strength <= 4) return "Good";
		return "Strong";
	};

	const getStrengthColor = () => {
		if (strength <= 2) return "bg-red-500";
		if (strength <= 3) return "bg-yellow-500";
		if (strength <= 4) return "bg-blue-500";
		return "bg-green-500";
	};

	if (!password) return null;

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex items-center gap-2">
				<div className="flex-1 bg-gray-200 rounded-full h-2">
					<div
						className={cn("h-2 rounded-full transition-all duration-300", getStrengthColor())}
						style={{ width: `${(strength / requirements.length) * 100}%` }}
					/>
				</div>
				<span className="text-sm font-medium text-muted-foreground">{getStrengthLabel()}</span>
			</div>

			{showRequirements && (
				<ul className="space-y-1">
					{requirements.map((req, index) => (
						<li
							key={index}
							className={cn(
								"text-xs flex items-center gap-2",
								req.test(password) ? "text-green-600" : "text-muted-foreground"
							)}>
							<div
								className={cn(
									"w-1.5 h-1.5 rounded-full",
									req.test(password) ? "bg-green-500" : "bg-gray-300"
								)}
							/>
							{req.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

/**
 * Character count indicator
 */
interface CharacterCountProps {
	current: number;
	max: number;
	className?: string;
}

export function CharacterCount({ current, max, className }: CharacterCountProps) {
	const percentage = (current / max) * 100;
	const isNearLimit = percentage >= 80;
	const isOverLimit = current > max;

	return (
		<div className={cn("text-xs text-right", className)}>
			<span className={cn(isOverLimit ? "text-red-600" : isNearLimit ? "text-yellow-600" : "text-muted-foreground")}>
				{current}/{max}
			</span>
		</div>
	);
}

/**
 * Form validation summary
 */
interface ValidationSummaryProps {
	errors: Record<string, string>;
	className?: string;
}

export function ValidationSummary({ errors, className }: ValidationSummaryProps) {
	const errorEntries = Object.entries(errors).filter(([_, message]) => message);

	if (errorEntries.length === 0) return null;

	return (
		<div className={cn("rounded-md border border-red-200 bg-red-50 p-4", className)}>
			<div className="flex">
				<AlertCircle className="h-5 w-5 text-red-400" />
				<div className="ml-3">
					<h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
					<div className="mt-2 text-sm text-red-700">
						<ul className="list-disc space-y-1 pl-5">
							{errorEntries.map(([field, message]) => (
								<li key={field}>
									<span className="font-medium capitalize">
										{field.replace(/([A-Z])/g, " $1").toLowerCase()}:
									</span>{" "}
									{message}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * Real-time validation indicator
 */
interface ValidationIndicatorProps {
	isValid?: boolean;
	isValidating?: boolean;
	className?: string;
}

export function ValidationIndicator({ isValid, isValidating, className }: ValidationIndicatorProps) {
	if (isValidating) {
		return (
			<div className={cn("flex items-center justify-center w-5 h-5", className)}>
				<div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500" />
			</div>
		);
	}

	if (isValid === undefined) return null;

	return (
		<div className={cn("flex items-center justify-center w-5 h-5", className)}>
			{isValid ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-red-500" />}
		</div>
	);
}

/**
 * Password visibility toggle
 */
interface PasswordToggleProps {
	visible: boolean;
	onToggle: () => void;
	className?: string;
}

export function PasswordToggle({ visible, onToggle, className }: PasswordToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", className)}>
			{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
		</button>
	);
}

/**
 * Enhanced input with validation feedback
 */
interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	success?: string;
	help?: string;
	isValidating?: boolean;
	showPasswordToggle?: boolean;
}

export function ValidatedInput({
	error,
	success,
	help,
	isValidating,
	showPasswordToggle = false,
	type = "text",
	className,
	...props
}: ValidatedInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const inputType = showPasswordToggle && type === "password" ? (showPassword ? "text" : "password") : type;

	return (
		<div className="space-y-1">
			<div className="relative">
				<input
					type={inputType}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
						"file:border-0 file:bg-transparent file:text-sm file:font-medium",
						"placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-red-500 focus-visible:ring-red-500",
						success && "border-green-500 focus-visible:ring-green-500",
						(showPasswordToggle || isValidating) && "pr-10",
						className
					)}
					{...props}
				/>

				{showPasswordToggle && type === "password" && (
					<PasswordToggle visible={showPassword} onToggle={() => setShowPassword(!showPassword)} />
				)}

				{isValidating && !showPasswordToggle && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						<ValidationIndicator isValidating={true} />
					</div>
				)}
			</div>

			<FieldError error={error} />
			<FieldSuccess message={success} />
			<FieldHelp text={help} />
		</div>
	);
}
