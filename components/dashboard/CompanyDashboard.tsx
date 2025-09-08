"use client";

import React from "react";
import { Session } from "@/actions/session";
import { BaseDashboard } from "./BaseDashboard";
import { Briefcase, Users, Eye, TrendingUp, Plus, Search, BarChart, UserCheck } from "lucide-react";

interface CompanyDashboardProps {
	session: Session;
}

export function CompanyDashboard({ session }: CompanyDashboardProps) {
	// Mock data - in real app, this would come from API
	const widgets = [
		{
			id: "active-jobs",
			title: "Active Jobs",
			value: "12",
			change: "+2 this week",
			changeType: "positive" as const,
			icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
			action: {
				label: "Manage Jobs",
				href: "/company/jobs",
			},
		},
		{
			id: "applications",
			title: "New Applications",
			value: "47",
			change: "+12 today",
			changeType: "positive" as const,
			icon: <Users className="h-4 w-4 text-muted-foreground" />,
			action: {
				label: "Review Applications",
				href: "/company/applications",
			},
		},
		{
			id: "profile-views",
			title: "Profile Views",
			value: "1,234",
			change: "+18% from last month",
			changeType: "positive" as const,
			icon: <Eye className="h-4 w-4 text-muted-foreground" />,
			description: "People viewing your company profile",
		},
		{
			id: "hire-rate",
			title: "Hire Rate",
			value: "23%",
			change: "+5% improvement",
			changeType: "positive" as const,
			icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
			description: "Successful hires from applications",
		},
	];

	const quickActions = [
		{
			id: "post-job",
			label: "Post New Job",
			description: "Create a new job posting",
			icon: <Plus className="h-4 w-4" />,
			href: "/company/jobs/new",
			variant: "default" as const,
		},
		{
			id: "browse-talent",
			label: "Browse Talent",
			description: "Search for candidates",
			icon: <Search className="h-4 w-4" />,
			href: "/company/talent",
		},
		{
			id: "view-analytics",
			label: "View Analytics",
			description: "Hiring insights and metrics",
			icon: <BarChart className="h-4 w-4" />,
			href: "/company/analytics",
		},
		{
			id: "manage-team",
			label: "Manage Team",
			description: "Team members and permissions",
			icon: <UserCheck className="h-4 w-4" />,
			href: "/company/team",
		},
	];

	return (
		<BaseDashboard
			session={session}
			title="Company Dashboard"
			subtitle="Manage your hiring process and find the best talent."
			widgets={widgets}
			quickActions={quickActions}>
			{/* Additional company-specific content can go here */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Activity */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
					<h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
					<div className="space-y-3">
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span className="text-sm">New application for Senior Developer position</span>
							<span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							<span className="text-sm">Job posting "Marketing Manager" went live</span>
							<span className="text-xs text-gray-500 ml-auto">1 day ago</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
							<span className="text-sm">Interview scheduled with John Doe</span>
							<span className="text-xs text-gray-500 ml-auto">2 days ago</span>
						</div>
					</div>
				</div>

				{/* Top Performing Jobs */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
					<h3 className="text-lg font-semibold mb-4">Top Performing Jobs</h3>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium">Senior Developer</span>
							<span className="text-sm text-gray-500">23 applications</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium">Marketing Manager</span>
							<span className="text-sm text-gray-500">18 applications</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium">UX Designer</span>
							<span className="text-sm text-gray-500">15 applications</span>
						</div>
					</div>
				</div>
			</div>
		</BaseDashboard>
	);
}
