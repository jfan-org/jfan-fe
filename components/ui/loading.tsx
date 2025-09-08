/**
 * Loading Components
 *
 * Various loading indicators and progress components for user feedback
 */

import { Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// Loading spinner sizes
type SpinnerSize = "sm" | "md" | "lg" | "xl";

interface LoadingSpinnerProps {
	size?: SpinnerSize;
	className?: string;
	text?: string;
}

/**
 * Basic loading spinner
 */
export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
		xl: "h-12 w-12",
	};

	return (
		<div className={cn("flex items-center justify-center", className)}>
			<div className="flex items-center gap-2">
				<Loader2 className={cn("animate-spin", sizeClasses[size])} />
				{text && <span className="text-sm text-muted-foreground">{text}</span>}
			</div>
		</div>
	);
}

/**
 * Inline loading spinner for buttons
 */
interface InlineSpinnerProps {
	size?: SpinnerSize;
	className?: string;
}

export function InlineSpinner({ size = "sm", className }: InlineSpinnerProps) {
	const sizeClasses = {
		sm: "h-3 w-3",
		md: "h-4 w-4",
		lg: "h-5 w-5",
		xl: "h-6 w-6",
	};

	return <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />;
}

/**
 * Full page loading overlay
 */
interface LoadingOverlayProps {
	message?: string;
	className?: string;
}

export function LoadingOverlay({ message = "Loading...", className }: LoadingOverlayProps) {
	return (
		<div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm", className)}>
			<div className="flex flex-col items-center gap-4 rounded-lg bg-card p-8 shadow-lg">
				<LoadingSpinner size="lg" />
				<p className="text-sm text-muted-foreground">{message}</p>
			</div>
		</div>
	);
}

/**
 * Loading skeleton for content placeholders
 */
interface SkeletonProps {
	className?: string;
	lines?: number;
}

export function Skeleton({ className, lines = 1 }: SkeletonProps) {
	return (
		<div className="space-y-2">
			{Array.from({ length: lines }).map((_, i) => (
				<div
					key={i}
					className={cn(
						"h-4 bg-muted animate-pulse rounded",
						i === lines - 1 && lines > 1 ? "w-3/4" : "w-full",
						className
					)}
				/>
			))}
		</div>
	);
}

/**
 * Card skeleton for loading cards
 */
export function CardSkeleton({ className }: { className?: string }) {
	return (
		<div className={cn("rounded-lg border bg-card p-6 space-y-4", className)}>
			<Skeleton className="h-6 w-1/3" />
			<Skeleton lines={3} />
			<div className="flex gap-2">
				<Skeleton className="h-8 w-20" />
				<Skeleton className="h-8 w-16" />
			</div>
		</div>
	);
}

/**
 * Progress bar component
 */
interface ProgressBarProps {
	value: number; // 0-100
	max?: number;
	className?: string;
	showPercentage?: boolean;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "success" | "warning" | "error";
}

export function ProgressBar({ value, max = 100, className, showPercentage = false, size = "md", variant = "default" }: ProgressBarProps) {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

	const sizeClasses = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3",
	};

	const variantClasses = {
		default: "bg-primary",
		success: "bg-green-500",
		warning: "bg-yellow-500",
		error: "bg-red-500",
	};

	return (
		<div className={cn("w-full", className)}>
			<div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size])}>
				<div
					className={cn("h-full transition-all duration-300 ease-out rounded-full", variantClasses[variant])}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			{showPercentage && <div className="mt-1 text-xs text-muted-foreground text-right">{Math.round(percentage)}%</div>}
		</div>
	);
}

/**
 * Step progress indicator
 */
interface StepProgressProps {
	steps: string[];
	currentStep: number;
	className?: string;
}

export function StepProgress({ steps, currentStep, className }: StepProgressProps) {
	return (
		<div className={cn("w-full", className)}>
			<div className="flex items-center justify-between mb-2">
				{steps.map((step, index) => (
					<div key={index} className="flex flex-col items-center flex-1">
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
								index < currentStep
									? "bg-primary text-primary-foreground border-primary"
									: index === currentStep
									? "bg-primary/10 text-primary border-primary"
									: "bg-muted text-muted-foreground border-muted"
							)}>
							{index + 1}
						</div>
						<span
							className={cn(
								"text-xs mt-1 text-center",
								index <= currentStep ? "text-foreground" : "text-muted-foreground"
							)}>
							{step}
						</span>
					</div>
				))}
			</div>
			<ProgressBar value={currentStep} max={steps.length - 1} size="sm" className="mt-4" />
		</div>
	);
}

/**
 * Circular progress indicator
 */
interface CircularProgressProps {
	value: number; // 0-100
	size?: number;
	strokeWidth?: number;
	className?: string;
	showPercentage?: boolean;
	variant?: "default" | "success" | "warning" | "error";
}

export function CircularProgress({
	value,
	size = 60,
	strokeWidth = 4,
	className,
	showPercentage = true,
	variant = "default",
}: CircularProgressProps) {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - (value / 100) * circumference;

	const variantColors = {
		default: "stroke-primary",
		success: "stroke-green-500",
		warning: "stroke-yellow-500",
		error: "stroke-red-500",
	};

	return (
		<div className={cn("relative inline-flex items-center justify-center", className)}>
			<svg width={size} height={size} className="transform -rotate-90">
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="transparent"
					className="text-muted"
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className={cn("transition-all duration-300 ease-out", variantColors[variant])}
				/>
			</svg>
			{showPercentage && <span className="absolute text-sm font-medium">{Math.round(value)}%</span>}
		</div>
	);
}

/**
 * Loading dots animation
 */
interface LoadingDotsProps {
	className?: string;
	size?: "sm" | "md" | "lg";
}

export function LoadingDots({ className, size = "md" }: LoadingDotsProps) {
	const sizeClasses = {
		sm: "w-1 h-1",
		md: "w-2 h-2",
		lg: "w-3 h-3",
	};

	return (
		<div className={cn("flex space-x-1", className)}>
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className={cn("bg-current rounded-full animate-pulse", sizeClasses[size])}
					style={{
						animationDelay: `${i * 0.2}s`,
						animationDuration: "1s",
					}}
				/>
			))}
		</div>
	);
}

/**
 * Refresh button with loading state
 */
interface RefreshButtonProps {
	onRefresh: () => void;
	isLoading?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export function RefreshButton({ onRefresh, isLoading = false, className, children = "Refresh" }: RefreshButtonProps) {
	return (
		<button
			onClick={onRefresh}
			disabled={isLoading}
			className={cn(
				"inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
				"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				className
			)}>
			<RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
			{children}
		</button>
	);
}
