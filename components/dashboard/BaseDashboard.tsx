"use client";

import React from "react";
import { Session } from "@/actions/session";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardWidget {
	id: string;
	title: string;
	description?: string;
	value?: string | number;
	change?: string;
	changeType?: "positive" | "negative" | "neutral";
	icon?: React.ReactNode;
	action?: {
		label: string;
		href?: string;
		onClick?: () => void;
	};
}

interface QuickAction {
	id: string;
	label: string;
	description?: string;
	icon?: React.ReactNode;
	href?: string;
	onClick?: () => void;
	variant?: "default" | "outline" | "secondary";
}

interface BaseDashboardProps {
	session: Session;
	title: string;
	subtitle?: string;
	widgets: DashboardWidget[];
	quickActions: QuickAction[];
	children?: React.ReactNode;
}

export function BaseDashboard({ session, title, subtitle, widgets, quickActions, children }: BaseDashboardProps) {
	const getChangeColor = (changeType?: string) => {
		switch (changeType) {
			case "positive":
				return "text-green-600";
			case "negative":
				return "text-red-600";
			default:
				return "text-gray-600";
		}
	};

	return (
		<div className="mobile-spacing-lg">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mobile-spacing-md">
				<div>
					<h1 className="mobile-text-2xl font-bold text-gray-900 dark:text-white">
						Welcome back, {session.user.name.split(" ")[0]}!
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-1 mobile-text-base">
						{subtitle || `Here's what's happening with your ${session.user.userType.replace("-", " ")} account.`}
					</p>
				</div>
				<div className="mt-4 sm:mt-0">
					<Badge variant="outline" className="capitalize mobile-text-sm">
						{session.user.userType.replace("-", " ")}
					</Badge>
				</div>
			</div>

			{/* Quick Actions */}
			{quickActions.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
					{quickActions.map((action) => (
						<Button
							key={action.id}
							variant={action.variant || "outline"}
							className="touch-button h-auto p-4 flex flex-col items-start mobile-spacing-sm"
							onClick={action.onClick}
							asChild={!!action.href}>
							{action.href ? (
								<a href={action.href} className="w-full">
									<div className="flex items-center space-x-2 w-full">
										{action.icon}
										<span className="font-medium mobile-text-base">{action.label}</span>
									</div>
									{action.description && (
										<p className="mobile-text-sm text-muted-foreground text-left mt-1">
											{action.description}
										</p>
									)}
								</a>
							) : (
								<div className="w-full">
									<div className="flex items-center space-x-2 w-full">
										{action.icon}
										<span className="font-medium mobile-text-base">{action.label}</span>
									</div>
									{action.description && (
										<p className="mobile-text-sm text-muted-foreground text-left mt-1">
											{action.description}
										</p>
									)}
								</div>
							)}
						</Button>
					))}
				</div>
			)}

			{/* Widgets Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
				{widgets.map((widget) => (
					<Card key={widget.id} className="mobile-card">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="mobile-text-sm font-medium">{widget.title}</CardTitle>
							{widget.icon}
						</CardHeader>
						<CardContent>
							<div className="text-xl sm:text-2xl font-bold">{widget.value}</div>
							{widget.change && (
								<p className={`mobile-text-sm ${getChangeColor(widget.changeType)}`}>
									{widget.change}
								</p>
							)}
							{widget.description && (
								<CardDescription className="mt-2 mobile-text-sm">
									{widget.description}
								</CardDescription>
							)}
							{widget.action && (
								<Button
									variant="outline"
									size="sm"
									className="mt-3 w-full touch-button mobile-text-sm"
									onClick={widget.action.onClick}
									asChild={!!widget.action.href}>
									{widget.action.href ? (
										<a href={widget.action.href}>{widget.action.label}</a>
									) : (
										widget.action.label
									)}
								</Button>
							)}
						</CardContent>
					</Card>
				))}
			</div>

			{/* Additional Content */}
			{children && <div className="mt-6 sm:mt-8">{children}</div>}
		</div>
	);
}
