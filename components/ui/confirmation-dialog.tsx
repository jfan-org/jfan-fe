/**
 * Confirmation Dialog Components
 *
 * Reusable confirmation dialogs for important user actions
 */

import { AlertTriangle, Trash2, LogOut, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Dialog variant types
type DialogVariant = "default" | "destructive" | "warning" | "success";

interface ConfirmationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void;
	onCancel?: () => void;
	variant?: DialogVariant;
	icon?: React.ReactNode;
	isLoading?: boolean;
	className?: string;
}

/**
 * Base confirmation dialog component
 */
export function ConfirmationDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	onConfirm,
	onCancel,
	variant = "default",
	icon,
	isLoading = false,
	className,
}: ConfirmationDialogProps) {
	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		} else {
			onOpenChange(false);
		}
	};

	const handleConfirm = () => {
		onConfirm();
		// Don't auto-close if loading, let the parent handle it
		if (!isLoading) {
			onOpenChange(false);
		}
	};

	const variantStyles = {
		default: {
			confirmButton: "default",
			iconColor: "text-blue-500",
		},
		destructive: {
			confirmButton: "destructive",
			iconColor: "text-red-500",
		},
		warning: {
			confirmButton: "default",
			iconColor: "text-yellow-500",
		},
		success: {
			confirmButton: "default",
			iconColor: "text-green-500",
		},
	};

	const style = variantStyles[variant];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn("sm:max-w-md", className)}>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						{icon && <div className={cn("flex-shrink-0", style.iconColor)}>{icon}</div>}
						{title}
					</DialogTitle>
					<DialogDescription className="text-left">{description}</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex-col-reverse sm:flex-row gap-2">
					<Button variant="outline" onClick={handleCancel} disabled={isLoading} className="w-full sm:w-auto">
						{cancelLabel}
					</Button>
					<Button
						variant={style.confirmButton as any}
						onClick={handleConfirm}
						disabled={isLoading}
						className="w-full sm:w-auto">
						{isLoading ? (
							<>
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
								Processing...
							</>
						) : (
							confirmLabel
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Delete confirmation dialog
 */
interface DeleteConfirmationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	itemName: string;
	itemType?: string;
	onConfirm: () => void;
	onCancel?: () => void;
	isLoading?: boolean;
	additionalWarning?: string;
}

export function DeleteConfirmation({
	open,
	onOpenChange,
	itemName,
	itemType = "item",
	onConfirm,
	onCancel,
	isLoading = false,
	additionalWarning,
}: DeleteConfirmationProps) {
	const description = additionalWarning
		? `Are you sure you want to delete "${itemName}"? ${additionalWarning}`
		: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;

	return (
		<ConfirmationDialog
			open={open}
			onOpenChange={onOpenChange}
			title={`Delete ${itemType}`}
			description={description}
			confirmLabel="Delete"
			cancelLabel="Cancel"
			onConfirm={onConfirm}
			onCancel={onCancel}
			variant="destructive"
			icon={<Trash2 className="h-5 w-5" />}
			isLoading={isLoading}
		/>
	);
}

/**
 * Logout confirmation dialog
 */
interface LogoutConfirmationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	onCancel?: () => void;
	isLoading?: boolean;
}

export function LogoutConfirmation({ open, onOpenChange, onConfirm, onCancel, isLoading = false }: LogoutConfirmationProps) {
	return (
		<ConfirmationDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Sign Out"
			description="Are you sure you want to sign out? You'll need to sign in again to access your account."
			confirmLabel="Sign Out"
			cancelLabel="Cancel"
			onConfirm={onConfirm}
			onCancel={onCancel}
			variant="warning"
			icon={<LogOut className="h-5 w-5" />}
			isLoading={isLoading}
		/>
	);
}

/**
 * Unsaved changes confirmation dialog
 */
interface UnsavedChangesProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: () => void;
	onDiscard: () => void;
	onCancel?: () => void;
	isLoading?: boolean;
}

export function UnsavedChangesConfirmation({ open, onOpenChange, onSave, onDiscard, onCancel, isLoading = false }: UnsavedChangesProps) {
	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		} else {
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						<AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
						Unsaved Changes
					</DialogTitle>
					<DialogDescription className="text-left">
						You have unsaved changes that will be lost if you continue. What would you like to do?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex-col gap-2 sm:flex-row">
					<Button
						variant="outline"
						onClick={handleCancel}
						disabled={isLoading}
						className="w-full sm:w-auto order-3 sm:order-1">
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onDiscard();
							onOpenChange(false);
						}}
						disabled={isLoading}
						className="w-full sm:w-auto order-2">
						<X className="h-4 w-4 mr-2" />
						Discard Changes
					</Button>
					<Button
						onClick={() => {
							onSave();
							// Don't auto-close if loading
							if (!isLoading) {
								onOpenChange(false);
							}
						}}
						disabled={isLoading}
						className="w-full sm:w-auto order-1 sm:order-3">
						{isLoading ? (
							<>
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
								Saving...
							</>
						) : (
							<>
								<Save className="h-4 w-4 mr-2" />
								Save Changes
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Generic action confirmation with custom content
 */
interface ActionConfirmationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: React.ReactNode;
	confirmLabel: string;
	cancelLabel?: string;
	onConfirm: () => void;
	onCancel?: () => void;
	variant?: DialogVariant;
	icon?: React.ReactNode;
	isLoading?: boolean;
}

export function ActionConfirmation({
	open,
	onOpenChange,
	title,
	children,
	confirmLabel,
	cancelLabel = "Cancel",
	onConfirm,
	onCancel,
	variant = "default",
	icon,
	isLoading = false,
}: ActionConfirmationProps) {
	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		} else {
			onOpenChange(false);
		}
	};

	const handleConfirm = () => {
		onConfirm();
		if (!isLoading) {
			onOpenChange(false);
		}
	};

	const variantStyles = {
		default: "default",
		destructive: "destructive",
		warning: "default",
		success: "default",
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						{icon && <div className="flex-shrink-0">{icon}</div>}
						{title}
					</DialogTitle>
				</DialogHeader>

				<div className="py-4">{children}</div>

				<DialogFooter className="flex-col-reverse sm:flex-row gap-2">
					<Button variant="outline" onClick={handleCancel} disabled={isLoading} className="w-full sm:w-auto">
						{cancelLabel}
					</Button>
					<Button
						variant={variantStyles[variant] as any}
						onClick={handleConfirm}
						disabled={isLoading}
						className="w-full sm:w-auto">
						{isLoading ? (
							<>
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
								Processing...
							</>
						) : (
							confirmLabel
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Hook for managing confirmation dialog state
 */
export function useConfirmationDialog() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const openDialog = () => setIsOpen(true);
	const closeDialog = () => {
		setIsOpen(false);
		setIsLoading(false);
	};

	const setLoading = (loading: boolean) => setIsLoading(loading);

	return {
		isOpen,
		isLoading,
		openDialog,
		closeDialog,
		setLoading,
	};
}

// Add React import for the hook
import React from "react";
