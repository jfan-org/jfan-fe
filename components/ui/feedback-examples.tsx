/**
 * Feedback System Examples
 *
 * Demonstrates how to use all the feedback components together
 * This file serves as documentation and can be removed in production
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import all feedback components
import { ErrorDisplay, InlineError, NetworkError, AuthError, ValidationErrorSummary, ErrorBoundaryFallback } from "@/components/ui/error-display";

import {
	LoadingSpinner,
	LoadingOverlay,
	Skeleton,
	CardSkeleton,
	ProgressBar,
	StepProgress,
	CircularProgress,
	LoadingDots,
	RefreshButton,
} from "@/components/ui/loading";

import {
	ConfirmationDialog,
	DeleteConfirmation,
	LogoutConfirmation,
	UnsavedChangesConfirmation,
	useConfirmationDialog,
} from "@/components/ui/confirmation-dialog";

import {
	FormFeedback,
	FieldError,
	FieldSuccess,
	FieldHelp,
	PasswordStrength,
	CharacterCount,
	ValidationSummary,
	ValidationIndicator,
	ValidatedInput,
} from "@/components/ui/form-feedback";

import { toast, showSuccess, showError, showWarning, showInfo, showAuthError, showNetworkError, showDeleteConfirmation } from "@/lib/toast";

import { AppError, ErrorType } from "@/lib/error-handling";

export function FeedbackExamples() {
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(30);
	const [currentStep, setCurrentStep] = useState(1);
	const [password, setPassword] = useState("");
	const [description, setDescription] = useState("");
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const deleteDialog = useConfirmationDialog();
	const logoutDialog = useConfirmationDialog();
	const unsavedDialog = useConfirmationDialog();

	// Example error objects
	const networkError: AppError = {
		type: ErrorType.NETWORK,
		message: "Unable to connect to the server. Please check your internet connection.",
		recoverable: true,
	};

	const authError: AppError = {
		type: ErrorType.AUTHENTICATION,
		message: "Your session has expired. Please sign in again.",
		recoverable: false,
	};

	const validationErrors = {
		email: "Please enter a valid email address",
		password: "Password must be at least 8 characters",
		firstName: "First name is required",
	};

	const steps = ["Account", "Profile", "Preferences", "Complete"];

	// Toast examples
	const showToastExamples = () => {
		showSuccess("Operation completed successfully!");
		setTimeout(() => showWarning("This is a warning message"), 1000);
		setTimeout(() => showError("Something went wrong"), 2000);
		setTimeout(() => showInfo("Here's some helpful information"), 3000);
	};

	const simulateNetworkError = () => {
		showNetworkError(networkError, () => {
			showSuccess("Retry successful!");
		});
	};

	const simulateAuthError = () => {
		showAuthError(authError);
	};

	const simulateLoading = async () => {
		setLoading(true);

		await toast.promise(new Promise((resolve) => setTimeout(resolve, 3000)), {
			loading: "Processing your request...",
			success: "Request completed successfully!",
			error: "Request failed. Please try again.",
		});

		setLoading(false);
	};

	const simulateProgress = () => {
		setProgress(0);
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + 10;
			});
		}, 200);
	};

	const handleDeleteConfirm = () => {
		deleteDialog.setLoading(true);
		setTimeout(() => {
			deleteDialog.closeDialog();
			showSuccess("Item deleted successfully!");
		}, 2000);
	};

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold mb-2">Feedback System Examples</h1>
				<p className="text-muted-foreground">Comprehensive examples of all feedback components</p>
			</div>

			{/* Toast Examples */}
			<Card>
				<CardHeader>
					<CardTitle>Toast Notifications</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-2">
						<Button onClick={showToastExamples}>Show All Toast Types</Button>
						<Button onClick={simulateNetworkError} variant="outline">
							Network Error
						</Button>
						<Button onClick={simulateAuthError} variant="outline">
							Auth Error
						</Button>
						<Button onClick={simulateLoading} variant="outline">
							Promise Toast
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Loading States */}
			<Card>
				<CardHeader>
					<CardTitle>Loading States</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<h4 className="font-medium">Spinners</h4>
							<div className="flex items-center gap-4">
								<LoadingSpinner size="sm" />
								<LoadingSpinner size="md" />
								<LoadingSpinner size="lg" />
								<LoadingSpinner size="xl" />
							</div>
							<LoadingSpinner text="Loading data..." />
							<LoadingDots />
						</div>

						<div className="space-y-4">
							<h4 className="font-medium">Progress Indicators</h4>
							<ProgressBar value={progress} showPercentage />
							<CircularProgress value={progress} />
							<Button onClick={simulateProgress} size="sm">
								Simulate Progress
							</Button>
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-medium">Step Progress</h4>
						<StepProgress steps={steps} currentStep={currentStep} />
						<div className="flex gap-2">
							<Button
								onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
								disabled={currentStep === 0}
								size="sm">
								Previous
							</Button>
							<Button
								onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
								disabled={currentStep === steps.length - 1}
								size="sm">
								Next
							</Button>
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-medium">Skeletons</h4>
						<Skeleton lines={3} />
						<CardSkeleton />
					</div>
				</CardContent>
			</Card>

			{/* Error Display */}
			<Card>
				<CardHeader>
					<CardTitle>Error Display</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<ErrorDisplay error={networkError} onRetry={() => showSuccess("Retry clicked!")} />

					<NetworkError error={networkError} onRetry={() => showSuccess("Network retry clicked!")} />

					<AuthError error={authError} onLogin={() => showInfo("Redirecting to login...")} />

					<ValidationErrorSummary errors={validationErrors} />
				</CardContent>
			</Card>

			{/* Form Feedback */}
			<Card>
				<CardHeader>
					<CardTitle>Form Feedback</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						<FormFeedback type="success" message="Your profile has been updated successfully!" />
						<FormFeedback type="error" message="There was an error processing your request." />
						<FormFeedback type="warning" message="Your session will expire in 5 minutes." />
						<FormFeedback type="info" message="You can change these settings later in your profile." />
					</div>

					<div className="space-y-4">
						<div>
							<Label htmlFor="password-example">Password</Label>
							<ValidatedInput
								id="password-example"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								showPasswordToggle
								help="Password must be at least 8 characters with mixed case, numbers, and symbols"
							/>
							<PasswordStrength password={password} />
						</div>

						<div>
							<Label htmlFor="description-example">Description</Label>
							<textarea
								id="description-example"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter a description..."
								className="w-full p-2 border rounded-md"
								maxLength={200}
							/>
							<CharacterCount current={description.length} max={200} />
						</div>

						<div className="space-y-2">
							<FieldError error="This field is required" />
							<FieldSuccess message="Email address verified!" />
							<FieldHelp text="We'll never share your email with anyone else." />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Confirmation Dialogs */}
			<Card>
				<CardHeader>
					<CardTitle>Confirmation Dialogs</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						<Button onClick={deleteDialog.openDialog} variant="destructive">
							Delete Item
						</Button>
						<Button onClick={logoutDialog.openDialog} variant="outline">
							Sign Out
						</Button>
						<Button onClick={unsavedDialog.openDialog} variant="outline">
							Unsaved Changes
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Confirmation Dialog Components */}
			<DeleteConfirmation
				open={deleteDialog.isOpen}
				onOpenChange={deleteDialog.closeDialog}
				itemName="Important Document"
				itemType="document"
				onConfirm={handleDeleteConfirm}
				isLoading={deleteDialog.isLoading}
				additionalWarning="This will also delete all associated comments and attachments."
			/>

			<LogoutConfirmation
				open={logoutDialog.isOpen}
				onOpenChange={logoutDialog.closeDialog}
				onConfirm={() => {
					logoutDialog.closeDialog();
					showSuccess("Signed out successfully!");
				}}
			/>

			<UnsavedChangesConfirmation
				open={unsavedDialog.isOpen}
				onOpenChange={unsavedDialog.closeDialog}
				onSave={() => {
					unsavedDialog.closeDialog();
					showSuccess("Changes saved!");
				}}
				onDiscard={() => {
					unsavedDialog.closeDialog();
					showInfo("Changes discarded");
				}}
			/>

			{/* Loading Overlay Example */}
			{loading && <LoadingOverlay message="Processing your request..." />}
		</div>
	);
}
