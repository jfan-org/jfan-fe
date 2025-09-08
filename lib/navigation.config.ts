import { UserType } from "@/types/auth.types";

export interface NavigationItem {
	name: string;
	href: string;
	icon: string;
	badge?: string | number;
	children?: NavigationItem[];
	permissions?: UserType[];
	description?: string;
}

export interface NavigationSection {
	title: string;
	items: NavigationItem[];
}

// Base navigation items available to all authenticated users
const baseNavigation: NavigationItem[] = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: "Home",
		description: "Overview and quick actions",
	},
	{
		name: "Profile",
		href: "/profile",
		icon: "User",
		description: "Manage your profile information",
	},
];

// User type-specific navigation configurations
const navigationConfig: Record<UserType, NavigationSection[]> = {
	[UserType.ADMIN]: [
		{
			title: "Administration",
			items: [
				{
					name: "Users",
					href: "/admin/users",
					icon: "Users",
					description: "Manage platform users",
				},
				{
					name: "Analytics",
					href: "/admin/analytics",
					icon: "BarChart",
					description: "Platform analytics and insights",
				},
				{
					name: "System",
					href: "/admin/system",
					icon: "Settings",
					description: "System configuration and settings",
				},
				{
					name: "Reports",
					href: "/admin/reports",
					icon: "FileText",
					description: "Generate and view reports",
				},
			],
		},
	],
	[UserType.COMPANY]: [
		{
			title: "Hiring",
			items: [
				{
					name: "Jobs",
					href: "/company/jobs",
					icon: "Briefcase",
					description: "Manage job postings",
				},
				{
					name: "Applications",
					href: "/company/applications",
					icon: "Users",
					description: "Review job applications",
				},
				{
					name: "Talent Pool",
					href: "/company/talent",
					icon: "Search",
					description: "Browse available talent",
				},
			],
		},
		{
			title: "Management",
			items: [
				{
					name: "Team",
					href: "/company/team",
					icon: "Users",
					description: "Manage company team members",
				},
				{
					name: "Analytics",
					href: "/company/analytics",
					icon: "BarChart",
					description: "Hiring analytics and metrics",
				},
			],
		},
	],
	[UserType.TALENT]: [
		{
			title: "Job Search",
			items: [
				{
					name: "Browse Jobs",
					href: "/talent/jobs",
					icon: "Search",
					description: "Find job opportunities",
				},
				{
					name: "Saved Jobs",
					href: "/talent/saved-jobs",
					icon: "Bookmark",
					description: "Your saved job listings",
				},
				{
					name: "Applications",
					href: "/talent/applications",
					icon: "FileText",
					description: "Track your applications",
				},
			],
		},
		{
			title: "Profile",
			items: [
				{
					name: "Skills",
					href: "/talent/skills",
					icon: "Award",
					description: "Manage your skills and certifications",
				},
				{
					name: "Portfolio",
					href: "/talent/portfolio",
					icon: "Folder",
					description: "Showcase your work",
				},
			],
		},
	],
	[UserType.CYBER_AGENT]: [
		{
			title: "Services",
			items: [
				{
					name: "Security Services",
					href: "/cyber-agent/services",
					icon: "Shield",
					description: "Manage security service offerings",
				},
				{
					name: "Projects",
					href: "/cyber-agent/projects",
					icon: "Folder",
					description: "Active security projects",
				},
				{
					name: "Assessments",
					href: "/cyber-agent/assessments",
					icon: "CheckCircle",
					description: "Security assessments and audits",
				},
			],
		},
		{
			title: "Business",
			items: [
				{
					name: "Clients",
					href: "/cyber-agent/clients",
					icon: "Users",
					description: "Manage client relationships",
				},
			],
		},
	],
	[UserType.SCOUT]: [
		{
			title: "Recruitment",
			items: [
				{
					name: "Talent Pool",
					href: "/scout/talent-pool",
					icon: "Users",
					description: "Browse and manage talent",
				},
				{
					name: "Placements",
					href: "/scout/placements",
					icon: "Target",
					description: "Track successful placements",
				},
				{
					name: "Opportunities",
					href: "/scout/opportunities",
					icon: "Search",
					description: "Available job opportunities",
				},
			],
		},
		{
			title: "Network",
			items: [
				{
					name: "Network",
					href: "/scout/network",
					icon: "Network",
					description: "Professional network management",
				},
			],
		},
	],
	[UserType.PROFESSIONAL]: [
		{
			title: "Services",
			items: [
				{
					name: "Service Offerings",
					href: "/professional/services",
					icon: "Award",
					description: "Manage your professional services",
				},
				{
					name: "Projects",
					href: "/professional/projects",
					icon: "Folder",
					description: "Active and completed projects",
				},
				{
					name: "Portfolio",
					href: "/professional/portfolio",
					icon: "Briefcase",
					description: "Showcase your expertise",
				},
			],
		},
		{
			title: "Business",
			items: [
				{
					name: "Clients",
					href: "/professional/clients",
					icon: "Users",
					description: "Client management",
				},
			],
		},
	],
	[UserType.MENTOR]: [
		{
			title: "Mentorship",
			items: [
				{
					name: "Mentees",
					href: "/mentor/mentees",
					icon: "Users",
					description: "Manage your mentees",
				},
				{
					name: "Programs",
					href: "/mentor/programs",
					icon: "BookOpen",
					description: "Mentorship programs",
				},
				{
					name: "Sessions",
					href: "/mentor/sessions",
					icon: "Calendar",
					description: "Schedule and manage sessions",
				},
			],
		},
		{
			title: "Resources",
			items: [
				{
					name: "Resources",
					href: "/mentor/resources",
					icon: "Library",
					description: "Learning resources and materials",
				},
			],
		},
	],
	[UserType.PHILANTHROPIST]: [
		{
			title: "Impact",
			items: [
				{
					name: "Projects",
					href: "/philanthropist/projects",
					icon: "Heart",
					description: "Philanthropic projects and initiatives",
				},
				{
					name: "Impact Tracking",
					href: "/philanthropist/impact",
					icon: "TrendingUp",
					description: "Track your social impact",
				},
				{
					name: "Opportunities",
					href: "/philanthropist/opportunities",
					icon: "Search",
					description: "Find giving opportunities",
				},
			],
		},
		{
			title: "Giving",
			items: [
				{
					name: "Donations",
					href: "/philanthropist/donations",
					icon: "DollarSign",
					description: "Manage donations and contributions",
				},
			],
		},
	],
};

// Settings navigation (available to all users)
const settingsNavigation: NavigationItem[] = [
	{
		name: "Settings",
		href: "/settings",
		icon: "Settings",
		description: "Account and application settings",
	},
];

/**
 * Get navigation sections for a specific user type
 */
export function getNavigationSections(userType: UserType): NavigationSection[] {
	return navigationConfig[userType] || [];
}

/**
 * Get flat navigation items for a specific user type (for backward compatibility)
 */
export function getUserTypeNavigation(userType: UserType): NavigationItem[] {
	const sections = getNavigationSections(userType);
	const flatItems = sections.flatMap((section) => section.items);

	return [...baseNavigation, ...flatItems, ...settingsNavigation];
}

/**
 * Check if a user has permission to access a navigation item
 */
export function hasNavigationPermission(item: NavigationItem, userType: UserType): boolean {
	if (!item.permissions) return true;
	return item.permissions.includes(userType);
}

/**
 * Filter navigation items based on user permissions
 */
export function filterNavigationByPermissions(items: NavigationItem[], userType: UserType): NavigationItem[] {
	return items.filter((item) => hasNavigationPermission(item, userType));
}

/**
 * Get the full navigation structure with sections for a user type
 */
export function getFullNavigation(userType: UserType): {
	base: NavigationItem[];
	sections: NavigationSection[];
	settings: NavigationItem[];
} {
	return {
		base: baseNavigation,
		sections: getNavigationSections(userType),
		settings: settingsNavigation,
	};
}
