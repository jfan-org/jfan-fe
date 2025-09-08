/**
 * Error Display Components
 *
 * Consistent error display patterns for the application
 */

import { AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppError, ErrorType, getRecoverySuggestions } from "@/lib/error-handling";

interface ErrorDisplayProps {
	error: AppError;
	onRetry?: () => void;
	showSuggestions?: boolean;
	className?: string;
}

/**
 * Main error display component
 */
export function ErrorDisplay({ error, onRetry, showSuggestions = true, className = "" }: ErrorDisplayProps) {
	const suggestions = showSuggestions ? getRecoverySuggestions(error) : [];

	return (
		<div className={`space-y-4 ${className}`}>
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription className="font-medium">{error.message}</AlertDescription>
			</Alert>

			{suggestions.length > 0 && (
				<div className="text-sm text-muted-foreground space-y-1">
					<p className="font-medium">Try these solutions:</p>
					<ul className="list-disc list-inside space-y-1">
						{suggestions.map((suggestion, index) => (
							<li key={index}>{suggestion}</li>
						))}
					</ul>
				</div>
			)}

			{error.recoverable && onRetry && (
				<Button onClick={onRetry} variant="outline" size="sm" className="w-full sm:w-auto">
					<RefreshCw className="h-4 w-4 mr-2" />
					Try Again
				</Button>
			)}
		</div>
	);
}

/**
 * Inline error message for form fields
 */
interface InlineErrorProps {
	message: string;
	className?: string;
}

export function InlineError({ message, className = "" }: InlineErrorProps) {
	if (!message) return null;

	return (
		<p className={`text-sm text-red-600 mt-1 flex items-center gap-1 ${className}`}>
			<AlertCircle className="h-3 w-3 flex-shrink-0" />
			{message}
		</p>
	);
}

/**
 * Network error display with connection status
 */
interface NetworkErrorProps {
	error: AppError;
	onRetry?: () => void;
	isOnline?: boolean;
}

export function NetworkError({ error, onRetry, isOnline = true }: NetworkErrorProps) {
	return (
		<div className="text-center py-8 space-y-4">
			<div className="flex justify-center">
				{isOnline ? <Wifi className="h-12 w-12 text-muted-foreground" /> : <WifiOff className="h-12 w-12 text-red-500" />}
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Connection Problem</h3>
				<p className="text-muted-foreground max-w-md mx-auto">{error.message}</p>
			</div>

			{onRetry && (
				<Button onClick={onRetry} variant="outline">
					<RefreshCw className="h-4 w-4 mr-2" />
					Try Again
				</Button>
			)}
		</div>
	);
}

/**
 * Authentication error display
 */
interface AuthErrorProps {
	error: AppError;
	onLogin?: () => void;
}

export function AuthError({ error, onLogin }: AuthErrorProps) {
	return (
		<div className="text-center py-8 space-y-4">
			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Authentication Required</h3>
				<p className="text-muted-foreground max-w-md mx-auto">{error.message}</p>
			</div>

			{onLogin && <Button onClick={onLogin}>Sign In</Button>}
		</div>
	);
}

/**
 * Validation error summary for forms
 */
interface ValidationErrorSummaryProps {
	errors: Record<string, string>;
	className?: string;
}

export function ValidationErrorSummary({ errors, className = "" }: ValidationErrorSummaryProps) {
	const errorEntries = Object.entries(errors).filter(([_, message]) => message);

	if (errorEntries.length === 0) return null;

	return (
		<Alert variant="destructive" className={className}>
			<AlertCircle className="h-4 w-4" />
			<AlertDescription>
				<div className="space-y-1">
					<p className="font-medium">Please fix the following errors:</p>
					<ul className="list-disc list-inside text-sm space-y-1">
						{errorEntries.map(([field, message]) => (
							<li key={field}>
								<span className="capitalize">{field.replace(/([A-Z])/g, " $1").toLowerCase()}</span>:{" "}
								{message}
							</li>
						))}
					</ul>
				</div>
			</AlertDescription>
		</Alert>
	);
}

/**
 * Error boundary fallback component
 */
interface ErrorBoundaryFallbackProps {
	error: AppError;
	onReset?: () => void;
}

export function ErrorBoundaryFallback({ error, onReset }: ErrorBoundaryFallbackProps) {
	return (
		<div className="min-h-[400px] flex items-center justify-center p-8">
			<div className="text-center space-y-6 max-w-md">
				<div className="space-y-2">
					<AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
					<h2 className="text-2xl font-bold">Something went wrong</h2>
					<p className="text-muted-foreground">{error.message}</p>
				</div>

				<div className="space-y-3">
					{onReset && (
						<Button onClick={onReset} className="w-full">
							<RefreshCw className="h-4 w-4 mr-2" />
							Try Again
						</Button>
					)}

					<Button variant="outline" onClick={() => window.location.reload()} className="w-full">
						Reload Page
					</Button>
				</div>

				<div className="text-xs text-muted-foreground">If this problem persists, please contact support.</div>
			</div>
		</div>
	);
}

/**
 * Simple error message component
 */
interface SimpleErrorProps {
	message: string;
	className?: string;
}

export function SimpleError({ message, className = "" }: SimpleErrorProps) {
	if (!message) return null;

	return <div className={`text-red-600 text-sm ${className}`}>{message}</div>;
}
