"use client";

import React, { ReactNode } from "react";
import { Session } from "@/actions/session";
import { MobileNavigation, MobileBottomNavigation } from "@/components/navigation/MobileNavigation";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserTypeConfig } from "@/lib/user-types.config";

interface ResponsiveLayoutProps {
	children: ReactNode;
	session: Session;
	title?: string;
	subtitle?: string;
	actions?: ReactNode;
	showSearch?: boolean;
	showNotifications?: boolean;
	onLogout?: () => void;
}

export function ResponsiveLayout({
	children,
	session,
	title,
	subtitle,
	actions,
	showSearch = true,
	showNotifications = true,
	onLogout,
}: ResponsiveLayoutProps) {
	const userTypeConfig = getUserTypeConfig(session.user.userType);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Skip Links */}
			<div className="sr-only-focusable">
				<a
					href="#main-content"
					className="skip-link absolute top-0 left-0 z-50 px-4 py-2 bg-blue-600 text-white font-medium rounded-br-md transform -translate-y-full transition-transform duration-200 focus:translate-y-0">
					Skip to main content
				</a>
				<a
					href="#navigation"
					className="skip-link absolute top-0 left-20 z-50 px-4 py-2 bg-blue-600 text-white font-medium rounded-br-md transform -translate-y-full transition-transform duration-200 focus:translate-y-0">
					Skip to navigation
				</a>
			</div>

			{/* Mobile Header */}
			<header className="sticky top-0 z-50 bg-white border-b border-gray-200 md:hidden" role="banner">
				<div className="flex items-center justify-between h-16 mobile-container">
					{/* Left: Menu */}
					<nav id="navigation" aria-label="Main navigation">
						<MobileNavigation session={session} onLogout={onLogout} />
					</nav>

					{/* Center: Logo/Title */}
					<div className="flex-1 text-center">
						<h1 className="mobile-text-lg font-semibold text-gray-900 truncate">{title || "Dashboard"}</h1>
					</div>

					{/* Right: Actions */}
					<div className="flex items-center space-x-2" role="toolbar" aria-label="Page actions">
						{showSearch && (
							<Button
								variant="ghost"
								size="icon"
								className="min-h-[44px] min-w-[44px] flex items-center justify-center"
								aria-label="Search">
								<Search className="w-5 h-5" aria-hidden="true" />
							</Button>
						)}
						{showNotifications && (
							<Button
								variant="ghost"
								size="icon"
								className="min-h-[44px] min-w-[44px] flex items-center justify-center relative"
								aria-label="Notifications (3 unread)">
								<Bell className="w-5 h-5" aria-hidden="true" />
								{/* Notification badge */}
								<span
									className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
									aria-hidden="true"></span>
							</Button>
						)}
					</div>
				</div>
			</header>

			{/* Desktop Sidebar */}
			<div className="hidden md:flex">
				{/* Sidebar content would go here for desktop */}
				<aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
					<div className="p-6">
						<div className="flex items-center space-x-3 mb-8">
							<div
								className={cn(
									"w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
									userTypeConfig?.bgColor || "bg-gray-500"
								)}>
								{session.user.name.charAt(0).toUpperCase()}
							</div>
							<div>
								<p className="font-semibold text-gray-900">{session.user.name}</p>
								<p className="text-sm text-gray-500 capitalize">{session.user.userType}</p>
							</div>
						</div>
						{/* Desktop navigation would go here */}
					</div>
				</aside>
			</div>

			{/* Main Content */}
			<main className="flex-1 md:ml-64">
				{/* Desktop Header */}
				<header className="hidden md:block bg-white border-b border-gray-200">
					<div className="flex items-center justify-between h-16 px-6">
						<div>
							{title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
							{subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
						</div>
						<div className="flex items-center space-x-4">
							{actions}
							{showSearch && (
								<Button variant="ghost" size="icon">
									<Search className="w-5 h-5" />
								</Button>
							)}
							{showNotifications && (
								<Button variant="ghost" size="icon" className="relative">
									<Bell className="w-5 h-5" />
									<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
								</Button>
							)}
						</div>
					</div>
				</header>

				{/* Page Content */}
				<div className="mobile-container py-6 pb-20 md:pb-6">
					{/* Mobile Page Header */}
					<div className="md:hidden mb-6">
						{title && <h1 className="mobile-text-2xl font-bold text-gray-900">{title}</h1>}
						{subtitle && <p className="mobile-text-base text-gray-600 mt-1">{subtitle}</p>}
						{actions && (
							<div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Page actions">
								{actions}
							</div>
						)}
					</div>

					{/* Main Content */}
					<main id="main-content" role="main" tabIndex={-1}>
						{children}
					</main>
				</div>
			</main>

			{/* Mobile Bottom Navigation */}
			<MobileBottomNavigation session={session} />
		</div>
	);
}

// Responsive Card Component
export function ResponsiveCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("mobile-card bg-white border border-gray-200 shadow-sm", className)} {...props}>
			{children}
		</div>
	);
}

// Responsive Grid Component
export function ResponsiveGrid({
	children,
	cols = 1,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	cols?: 1 | 2 | 3 | 4;
}) {
	const gridClasses = {
		1: "grid-cols-1",
		2: "grid-cols-1 sm:grid-cols-2",
		3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
	};

	return (
		<div className={cn("grid gap-4 sm:gap-6", gridClasses[cols], className)} {...props}>
			{children}
		</div>
	);
}

// Responsive Button Group
export function ResponsiveButtonGroup({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex flex-col sm:flex-row gap-2 sm:gap-3", className)} {...props}>
			{children}
		</div>
	);
}
