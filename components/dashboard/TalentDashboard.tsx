"use client";

import React from "react";
import { Session } from "@/actions/session";
import { BaseDashboard } from "./BaseDashboard";
import { Search, Bookmark, FileText, Award, Eye, TrendingUp, User, Briefcase } from "lucide-react";

interface TalentDashboardProps {
	session: Session;
}

export function TalentDashboard({ session }: TalentDashboardProps) {
	// Mock data - in real app, this would come from API
	const widgets = [
		{
			id: "applications",
			title: "Active Applications",
			value: "8",
			change: "+3 this week",
			changeType: "positive" as const,
			icon: <FileText className="h-4 w-4 text-muted-foreground" />,
			action: {
				label: "View Applications",
				href: "/talent/applications",
			},
		},
		{
			id: "saved-jobs",
			title: "Saved Jobs",
			value: "15",
			change: "+5 new matches",
			changeType: "positive" as const,
			icon: <Bookmark className="h-4 w-4 text-muted-foreground" />,
			action: {
				label: "View Saved Jobs",
				href: "/talent/saved-jobs",
			},
		},
		{
			id: "profile-views",
			title: "Profile Views",
			value: "234",
			change: "+12% this month",
			changeType: "positive" as const,
			icon: <Eye className="h-4 w-4 text-muted-foreground" />,
			description: "Employers viewing your profile",
		},
		{
			id: "match-score",
			title: "Average Match Score",
			value: "87%",
			change: "+3% improvement",
			changeType: "positive" as const,
			icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
			description: "How well you match job requirements",
		},
	];

	const quickActions = [
		{
			id: "search-jobs",
			label: "Search Jobs",
			description: "Find new opportunities",
			icon: <Search className="h-4 w-4" />,
			href: "/talent/jobs",
			variant: "default" as const,
		},
		{
			id: "update-profile",
			label: "Update Profile",
			description: "Keep your profile current",
			icon: <User className="h-4 w-4" />,
			href: "/profile",
		},
		{
			id: "manage-skills",
			label: "Manage Skills",
			description: "Add or update your skills",
			icon: <Award className="h-4 w-4" />,
			href: "/talent/skills",
		},
		{
			id: "view-portfolio",
			label: "View Portfolio",
			description: "Showcase your work",
			icon: <Briefcase className="h-4 w-4" />,
			href: "/talent/portfolio",
		},
	];

	return (
		<BaseDashboard
			session={session}
			title="Talent Dashboard"
			subtitle="Track your job search progress and discover new opportunities."
			widgets={widgets}
			quickActions={quickActions}>
			{/* Additional talent-specific content */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
				{/* Recent Job Matches */}
				<div className="mobile-card bg-white dark:bg-gray-800 border">
					<h3 className="mobile-text-lg font-semibold mb-4">Recent Job Matches</h3>
					<div className="mobile-spacing-md">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mobile-spacing-sm">
							<div className="flex-1 min-w-0">
								<h4 className="font-medium mobile-text-base truncate">Senior Frontend Developer</h4>
								<p className="mobile-text-sm text-gray-600 dark:text-gray-400 truncate">
									TechCorp Inc.
								</p>
							</div>
							<div className="text-left sm:text-right mt-2 sm:mt-0 flex-shrink-0">
								<span className="mobile-text-sm font-medium text-green-600">92% match</span>
								<p className="text-xs text-gray-500">2 hours ago</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mobile-spacing-sm">
							<div className="flex-1 min-w-0">
								<h4 className="font-medium mobile-text-base truncate">Full Stack Engineer</h4>
								<p className="mobile-text-sm text-gray-600 dark:text-gray-400 truncate">StartupXYZ</p>
							</div>
							<div className="text-left sm:text-right mt-2 sm:mt-0 flex-shrink-0">
								<span className="mobile-text-sm font-medium text-green-600">89% match</span>
								<p className="text-xs text-gray-500">1 day ago</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mobile-spacing-sm">
							<div className="flex-1 min-w-0">
								<h4 className="font-medium mobile-text-base truncate">React Developer</h4>
								<p className="mobile-text-sm text-gray-600 dark:text-gray-400 truncate">
									Digital Agency
								</p>
							</div>
							<div className="text-left sm:text-right mt-2 sm:mt-0 flex-shrink-0">
								<span className="mobile-text-sm font-medium text-blue-600">85% match</span>
								<p className="text-xs text-gray-500">3 days ago</p>
							</div>
						</div>
					</div>
				</div>

				{/* Application Status */}
				<div className="mobile-card bg-white dark:bg-gray-800 border">
					<h3 className="mobile-text-lg font-semibold mb-4">Application Status</h3>
					<div className="mobile-spacing-sm">
						<div className="flex justify-between items-center py-2">
							<span className="mobile-text-sm">Under Review</span>
							<span className="mobile-text-sm font-medium">3 applications</span>
						</div>
						<div className="flex justify-between items-center py-2">
							<span className="mobile-text-sm">Interview Scheduled</span>
							<span className="mobile-text-sm font-medium">2 applications</span>
						</div>
						<div className="flex justify-between items-center py-2">
							<span className="mobile-text-sm">Awaiting Response</span>
							<span className="mobile-text-sm font-medium">3 applications</span>
						</div>
						<div className="flex justify-between items-center py-2">
							<span className="mobile-text-sm">Rejected</span>
							<span className="mobile-text-sm font-medium">1 application</span>
						</div>
					</div>
				</div>
			</div>
		</BaseDashboard>
	);
}
