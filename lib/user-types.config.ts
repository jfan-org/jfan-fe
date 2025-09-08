import { UserType, UserRole, UserTypeConfig } from "@/types/auth.types";

export const userTypesConfig: UserTypeConfig[] = [
	{
		id: UserType.COMPANY,
		name: "Company",
		description: "Register your organization to find and hire talented professionals",
		icon: "Building",
		color: "text-blue-400",
		bgColor: "bg-blue-400/10 border-blue-400/20",
		features: ["Post job opportunities", "Access talent pool", "Company branding", "Analytics dashboard"],
		registrationFields: ["companyName", "industry", "companySize", "website", "description"],
		dashboardRoute: "/employer",
	},
	{
		id: UserType.TALENT,
		name: "Talent",
		description: "Showcase your skills and connect with opportunities in your field",
		icon: "Star",
		color: "text-yellow-400",
		bgColor: "bg-yellow-400/10 border-yellow-400/20",
		features: ["Professional profile", "Job matching", "Skills verification", "Career guidance"],
		registrationFields: ["selectedJobId", "experience", "skills"],
		dashboardRoute: "/user",
	},
	{
		id: UserType.CYBER_AGENT,
		name: "Cyber Agent",
		description: "Digital specialists providing technology solutions and cybersecurity services",
		icon: "Shield",
		color: "text-purple-400",
		bgColor: "bg-purple-400/10 border-purple-400/20",
		features: ["Security consulting", "Digital solutions", "Tech support", "Risk assessment"],
		registrationFields: ["specializations", "servicesOffered", "yearsOfExperience", "certifications"],
		dashboardRoute: "/user",
	},
	{
		id: UserType.SCOUT,
		name: "Scout",
		description: "Recruitment specialists connecting talent with opportunities",
		icon: "Target",
		color: "text-green-400",
		bgColor: "bg-green-400/10 border-green-400/20",
		features: ["Talent scouting", "Recruitment network", "Placement tracking", "Industry insights"],
		registrationFields: ["focusAreas", "networkSize", "yearsOfExperience", "successfulPlacements"],
		dashboardRoute: "/user",
	},
	{
		id: UserType.PROFESSIONAL,
		name: "Professional",
		description: "Experienced professionals offering consulting and advisory services",
		icon: "Award",
		color: "text-indigo-400",
		bgColor: "bg-indigo-400/10 border-indigo-400/20",
		features: ["Professional consulting", "Industry expertise", "Service marketplace", "Client management"],
		registrationFields: ["professionalBackground", "serviceOfferings", "industryExpertise", "hourlyRate"],
		dashboardRoute: "/user",
	},
	{
		id: UserType.MENTOR,
		name: "Mentor",
		description: "Guide and support the next generation of professionals",
		icon: "Users",
		color: "text-orange-400",
		bgColor: "bg-orange-400/10 border-orange-400/20",
		features: ["Mentorship programs", "Career guidance", "Skill development", "Knowledge sharing"],
		registrationFields: ["mentorshipAreas", "experienceLevel", "maxMentees", "mentorshipApproach"],
		dashboardRoute: "/user",
	},
	{
		id: UserType.PHILANTHROPIST,
		name: "Philanthropist",
		description: "Make a positive impact through strategic giving and community support",
		icon: "Heart",
		color: "text-pink-400",
		bgColor: "bg-pink-400/10 border-pink-400/20",
		features: ["Impact tracking", "Giving opportunities", "Community projects", "Donation management"],
		registrationFields: ["focusAreas", "givingPreferences", "organizationName", "budgetRange"],
		dashboardRoute: "/user",
	},
];

export function getUserTypeConfig(userType: UserType): UserTypeConfig | undefined {
	return userTypesConfig.find((config) => config.id === userType);
}

export function getDashboardRoute(userType: UserType, role: UserRole): string {
	if (role === UserRole.ADMIN) return "/admin";

	const config = getUserTypeConfig(userType);
	return config?.dashboardRoute || "/user";
}

export function getUserTypeNavigation(userType: UserType) {
	const baseNavigation = [
		{ name: "Dashboard", href: "/dashboard", icon: "Home" },
		{ name: "Profile", href: "/profile", icon: "User" },
		{ name: "Settings", href: "/settings", icon: "Settings" },
	];

	const typeSpecificNavigation = {
		[UserType.COMPANY]: [
			{ name: "Jobs", href: "/jobs", icon: "Briefcase" },
			{ name: "Applications", href: "/applications", icon: "Users" },
			{ name: "Analytics", href: "/analytics", icon: "BarChart" },
		],
		[UserType.TALENT]: [
			{ name: "Job Search", href: "/jobs", icon: "Search" },
			{ name: "Saved Jobs", href: "/saved-jobs", icon: "Bookmark" },
			{ name: "Applications", href: "/my-applications", icon: "FileText" },
		],
		[UserType.CYBER_AGENT]: [
			{ name: "Services", href: "/services", icon: "Shield" },
			{ name: "Projects", href: "/projects", icon: "Folder" },
			{ name: "Assessments", href: "/assessments", icon: "CheckCircle" },
		],
		[UserType.SCOUT]: [
			{ name: "Talent Pool", href: "/talent-pool", icon: "Users" },
			{ name: "Placements", href: "/placements", icon: "Target" },
			{ name: "Network", href: "/network", icon: "Network" },
		],
		[UserType.PROFESSIONAL]: [
			{ name: "Services", href: "/services", icon: "Award" },
			{ name: "Clients", href: "/clients", icon: "Users" },
			{ name: "Projects", href: "/projects", icon: "Folder" },
		],
		[UserType.MENTOR]: [
			{ name: "Mentees", href: "/mentees", icon: "Users" },
			{ name: "Programs", href: "/programs", icon: "BookOpen" },
			{ name: "Resources", href: "/resources", icon: "Library" },
		],
		[UserType.PHILANTHROPIST]: [
			{ name: "Projects", href: "/projects", icon: "Heart" },
			{ name: "Impact", href: "/impact", icon: "TrendingUp" },
			{ name: "Opportunities", href: "/opportunities", icon: "Search" },
		],
	};

	return [...baseNavigation, ...(typeSpecificNavigation[userType] || [])];
}

export function getRegistrationEndpoint(userType: UserType): string {
	const endpoints = {
		[UserType.COMPANY]: "/auth/register/company",
		[UserType.TALENT]: "/auth/register/talent",
		[UserType.CYBER_AGENT]: "/auth/register/cyber-agent",
		[UserType.SCOUT]: "/auth/register/scout",
		[UserType.PROFESSIONAL]: "/auth/register/professional",
		[UserType.MENTOR]: "/auth/register/mentor",
		[UserType.PHILANTHROPIST]: "/auth/register/philanthropist",
	};

	return endpoints[userType] || "/auth/register";
}
