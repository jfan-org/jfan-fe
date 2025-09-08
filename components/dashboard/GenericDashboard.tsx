"use client";

import React from "react";
import { Session } from "@/actions/session";
import { BaseDashboard } from "./BaseDashboard";
import { UserType } from "@/types/auth.types";
import {
	Shield,
	Target,
	Award,
	Users,
	Heart,
	Folder,
	CheckCircle,
	Network,
	BookOpen,
	TrendingUp,
	Calendar,
	DollarSign,
	User,
	Settings,
} from "lucide-react";

interface GenericDashboardProps {
	session: Session;
}

export function GenericDashboard({ session }: GenericDashboardProps) {
	const userType = session.user.userType;

	// User type-specific configurations
	const dashboardConfig = {
		[UserType.CYBER_AGENT]: {
			title: "Cyber Agent Dashboard",
			subtitle: "Manage your cybersecurity services and client projects.",
			widgets: [
				{
					id: "active-projects",
					title: "Active Projects",
					value: "5",
					change: "+2 this month",
					changeType: "positive" as const,
					icon: <Folder className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "assessments",
					title: "Completed Assessments",
					value: "23",
					change: "+4 this week",
					changeType: "positive" as const,
					icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "clients",
					title: "Active Clients",
					value: "12",
					icon: <Users className="h-4 w-4 text-muted-foreground" />,
				},
			],
			quickActions: [
				{
					id: "new-assessment",
					label: "New Assessment",
					description: "Start a security assessment",
					icon: <Shield className="h-4 w-4" />,
					href: "/cyber-agent/assessments/new",
					variant: "default" as const,
				},
				{
					id: "manage-services",
					label: "Manage Services",
					description: "Update service offerings",
					icon: <Settings className="h-4 w-4" />,
					href: "/cyber-agent/services",
				},
			],
		},
		[UserType.SCOUT]: {
			title: "Scout Dashboard",
			subtitle: "Track your recruitment activities and talent placements.",
			widgets: [
				{
					id: "placements",
					title: "Successful Placements",
					value: "18",
					change: "+3 this month",
					changeType: "positive" as const,
					icon: <Target className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "talent-pool",
					title: "Talent Pool Size",
					value: "156",
					change: "+12 new candidates",
					changeType: "positive" as const,
					icon: <Users className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "network",
					title: "Network Connections",
					value: "342",
					icon: <Network className="h-4 w-4 text-muted-foreground" />,
				},
			],
			quickActions: [
				{
					id: "add-talent",
					label: "Add Talent",
					description: "Add new candidate to pool",
					icon: <Users className="h-4 w-4" />,
					href: "/scout/talent-pool/new",
					variant: "default" as const,
				},
				{
					id: "view-opportunities",
					label: "View Opportunities",
					description: "Browse available positions",
					icon: <Target className="h-4 w-4" />,
					href: "/scout/opportunities",
				},
			],
		},
		[UserType.PROFESSIONAL]: {
			title: "Professional Dashboard",
			subtitle: "Manage your consulting services and client relationships.",
			widgets: [
				{
					id: "active-projects",
					title: "Active Projects",
					value: "7",
					change: "+1 this week",
					changeType: "positive" as const,
					icon: <Folder className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "clients",
					title: "Active Clients",
					value: "15",
					icon: <Users className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "revenue",
					title: "Monthly Revenue",
					value: "$12,500",
					change: "+15% from last month",
					changeType: "positive" as const,
					icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
				},
			],
			quickActions: [
				{
					id: "new-project",
					label: "New Project",
					description: "Start a new client project",
					icon: <Folder className="h-4 w-4" />,
					href: "/professional/projects/new",
					variant: "default" as const,
				},
				{
					id: "manage-services",
					label: "Manage Services",
					description: "Update service offerings",
					icon: <Award className="h-4 w-4" />,
					href: "/professional/services",
				},
			],
		},
		[UserType.MENTOR]: {
			title: "Mentor Dashboard",
			subtitle: "Guide and support your mentees' professional development.",
			widgets: [
				{
					id: "mentees",
					title: "Active Mentees",
					value: "8",
					icon: <Users className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "sessions",
					title: "Sessions This Month",
					value: "24",
					change: "+6 from last month",
					changeType: "positive" as const,
					icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "programs",
					title: "Active Programs",
					value: "3",
					icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
				},
			],
			quickActions: [
				{
					id: "schedule-session",
					label: "Schedule Session",
					description: "Book a mentoring session",
					icon: <Calendar className="h-4 w-4" />,
					href: "/mentor/sessions/new",
					variant: "default" as const,
				},
				{
					id: "manage-mentees",
					label: "Manage Mentees",
					description: "View and manage mentees",
					icon: <Users className="h-4 w-4" />,
					href: "/mentor/mentees",
				},
			],
		},
		[UserType.PHILANTHROPIST]: {
			title: "Philanthropist Dashboard",
			subtitle: "Track your impact and manage philanthropic activities.",
			widgets: [
				{
					id: "projects",
					title: "Active Projects",
					value: "6",
					change: "+2 this quarter",
					changeType: "positive" as const,
					icon: <Heart className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "donations",
					title: "Total Donations",
					value: "$45,000",
					change: "+$12,000 this year",
					changeType: "positive" as const,
					icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
				},
				{
					id: "impact",
					title: "People Impacted",
					value: "1,234",
					change: "+456 this month",
					changeType: "positive" as const,
					icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
				},
			],
			quickActions: [
				{
					id: "new-donation",
					label: "Make Donation",
					description: "Contribute to a cause",
					icon: <Heart className="h-4 w-4" />,
					href: "/philanthropist/donations/new",
					variant: "default" as const,
				},
				{
					id: "view-impact",
					label: "View Impact",
					description: "See your social impact",
					icon: <TrendingUp className="h-4 w-4" />,
					href: "/philanthropist/impact",
				},
			],
		},
	};

	// Get configuration for current user type or fallback to default
	const config = dashboardConfig[userType] || {
		title: "Dashboard",
		subtitle: "Welcome to your dashboard.",
		widgets: [
			{
				id: "profile",
				title: "Profile Completion",
				value: "85%",
				change: "Complete your profile",
				changeType: "neutral" as const,
				icon: <User className="h-4 w-4 text-muted-foreground" />,
				action: {
					label: "Update Profile",
					href: "/profile",
				},
			},
		],
		quickActions: [
			{
				id: "update-profile",
				label: "Update Profile",
				description: "Keep your information current",
				icon: <User className="h-4 w-4" />,
				href: "/profile",
				variant: "default" as const,
			},
		],
	};

	return (
		<BaseDashboard
			session={session}
			title={config.title}
			subtitle={config.subtitle}
			widgets={config.widgets}
			quickActions={config.quickActions}>
			{/* Generic additional content */}
			<div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
				<h3 className="text-lg font-semibold mb-4">Getting Started</h3>
				<div className="space-y-3">
					<div className="flex items-center space-x-3">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-sm">Complete your profile setup</span>
					</div>
					<div className="flex items-center space-x-3">
						<div className="w-2 h-2 bg-gray-300 rounded-full"></div>
						<span className="text-sm">Explore available features</span>
					</div>
					<div className="flex items-center space-x-3">
						<div className="w-2 h-2 bg-gray-300 rounded-full"></div>
						<span className="text-sm">Connect with other professionals</span>
					</div>
				</div>
			</div>
		</BaseDashboard>
	);
}
