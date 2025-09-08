"use client";

import React from "react";
import { Session } from "@/actions/session";
import { BaseDashboard } from "./BaseDashboard";
import { Users, BarChart, Settings, FileText, TrendingUp, AlertTriangle, Activity, Database } from "lucide-react";

interface AdminDashboardProps {
	session: Session;
}

export function AdminDashboard({ session }: AdminDashboardProps) {
	// Mock data - in real app, this would come from API
	const widgets = [
		{
			id: "total-users",
			title: "Total Users",
			value: "12,847",
			change: "+234 this month",
			changeType: "positive" as const,
			icon: <Users className="h-4 w-4 text-muted-foreground" />,
			action: {
				label: "Manage Users",
				href: "/admin/users",
			},
		},
		{
			id: "active-jobs",
			title: "Active Jobs",
			value: "1,456",
			change: "+89 this week",
			changeType: "positive" as const,
			icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
			action: {
				label: "View Analytics",
				href: "/admin/analytics",
			},
		},
		{
			id: "system-health",
			title: "System Health",
			value: "99.8%",
			change: "All systems operational",
			changeType: "positive" as const,
			icon: <Activity className="h-4 w-4 text-muted-foreground" />,
			description: "Platform uptime this month",
		},
		{
			id: "pending-reports",
			title: "Pending Reports",
			value: "3",
			change: "2 high priority",
			changeType: "negative" as const,
			icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
			action: {
				label: "Review Reports",
				href: "/admin/reports",
			},
		},
	];

	const quickActions = [
		{
			id: "manage-users",
			label: "Manage Users",
			description: "User accounts and permissions",
			icon: <Users className="h-4 w-4" />,
			href: "/admin/users",
			variant: "default" as const,
		},
		{
			id: "system-settings",
			label: "System Settings",
			description: "Platform configuration",
			icon: <Settings className="h-4 w-4" />,
			href: "/admin/system",
		},
		{
			id: "view-analytics",
			label: "Analytics",
			description: "Platform insights and metrics",
			icon: <BarChart className="h-4 w-4" />,
			href: "/admin/analytics",
		},
		{
			id: "generate-reports",
			label: "Generate Reports",
			description: "Create system reports",
			icon: <FileText className="h-4 w-4" />,
			href: "/admin/reports",
		},
	];

	return (
		<BaseDashboard
			session={session}
			title="Admin Dashboard"
			subtitle="Monitor platform performance and manage system operations."
			widgets={widgets}
			quickActions={quickActions}>
			{/* Additional admin-specific content */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* System Status */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
					<h3 className="text-lg font-semibold mb-4">System Status</h3>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-sm">API Server</span>
							<span className="text-sm text-green-600 font-medium">Operational</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Database</span>
							<span className="text-sm text-green-600 font-medium">Operational</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">File Storage</span>
							<span className="text-sm text-green-600 font-medium">Operational</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Email Service</span>
							<span className="text-sm text-yellow-600 font-medium">Degraded</span>
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
					<h3 className="text-lg font-semibold mb-4">Recent Admin Activity</h3>
					<div className="space-y-3">
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							<span className="text-sm">User account created: john.doe@example.com</span>
							<span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
							<span className="text-sm">System maintenance scheduled</span>
							<span className="text-xs text-gray-500 ml-auto">3 hours ago</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-red-500 rounded-full"></div>
							<span className="text-sm">Security alert: Multiple failed login attempts</span>
							<span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
						</div>
					</div>
				</div>
			</div>
		</BaseDashboard>
	);
}
