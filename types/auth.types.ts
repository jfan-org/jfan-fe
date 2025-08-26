import { z } from "zod";

export enum UserType {
	COMPANY = "company",
	TALENT = "talent",
	CYBER_AGENT = "cyber-agent",
	SCOUT = "scout",
	PROFESSIONAL = "professional",
	MENTOR = "mentor",
	PHILANTHROPIST = "philanthropist",
}

export enum UserRole {
	ADMIN = "admin",
	EMPLOYER = "employer",
	JOB_SEEKER = "job_seeker",
}

export enum Gender {
	MALE = "male",
	FEMALE = "female",
}

export interface UserTypeConfig {
	id: UserType;
	name: string;
	description: string;
	icon: string; // We'll use Lucide icon names as strings
	color: string;
	bgColor: string;
	features: string[];
	registrationFields: string[];
	dashboardRoute: string;
}

export interface BaseRegistrationData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone: string;
	countryId: string;
	stateId: string;
	cityId: string;
	gender: Gender;
}

export interface CompanyRegistrationData extends BaseRegistrationData {
	companyName: string;
	industry: string;
	companySize: string;
	website?: string;
	description?: string;
}

export interface TalentRegistrationData extends BaseRegistrationData {
	selectedJobId: number;
	experience: string;
	skills: string;
}

export interface CyberAgentRegistrationData extends BaseRegistrationData {
	specializations: string[];
	servicesOffered: string[];
	yearsOfExperience: number;
	certifications?: string[];
}

export interface ScoutRegistrationData extends BaseRegistrationData {
	focusAreas: string[];
	networkSize: string;
	yearsOfExperience: number;
	successfulPlacements?: number;
}

export interface ProfessionalRegistrationData extends BaseRegistrationData {
	professionalBackground: string;
	serviceOfferings: string[];
	industryExpertise: string[];
	hourlyRate?: number;
}

export interface MentorRegistrationData extends BaseRegistrationData {
	mentorshipAreas: string[];
	experienceLevel: string;
	maxMentees: number;
	mentorshipApproach?: string;
}

export interface PhilanthropistRegistrationData extends BaseRegistrationData {
	focusAreas: string[];
	givingPreferences: string[];
	organizationName?: string;
	budgetRange?: string;
}

export type UserRegistrationData =
	| CompanyRegistrationData
	| TalentRegistrationData
	| CyberAgentRegistrationData
	| ScoutRegistrationData
	| ProfessionalRegistrationData
	| MentorRegistrationData
	| PhilanthropistRegistrationData;

// Form state interfaces
export interface RegistrationFormState {
	step: "userType" | "form" | "verification" | "onboarding";
	selectedUserType: UserType | null;
	formData: Partial<UserRegistrationData>;
	errors: Record<string, string>;
	isLoading: boolean;
}

export interface OnboardingFormState {
	currentStep: number;
	totalSteps: number;
	data: Record<string, any>;
	errors: Record<string, string>;
	isLoading: boolean;
}

// Location data interfaces
export interface LocationData {
	countries: Country[];
	states: State[];
	cities: City[];
}

export interface Country {
	id: string;
	name: string;
	code: string;
	flag?: string;
}

export interface State {
	id: string;
	name: string;
	countryId: string;
}

export interface City {
	id: string;
	name: string;
	stateId: string;
}

// API response interfaces
export interface AuthResponse {
	success: boolean;
	message?: string;
	user?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		role: UserRole;
		userType: UserType;
		isOnboarded: boolean;
	};
	tokens?: {
		accessToken: string;
		refreshToken: string;
	};
}

export interface JobCatalogResponse {
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
}

export interface Economy {
	id: number;
	name: string;
	description?: string;
}

export interface Industry {
	id: number;
	name: string;
	economyId: number;
	description?: string;
}

export interface Sector {
	id: number;
	name: string;
	industryId: number;
	description?: string;
}

export interface Job {
	id: number;
	name: string;
	sectorId: number;
	description?: string;
}

export interface LocationResponse {
	countries: Country[];
	states: State[];
	cities: City[];
}

// Legacy types for backward compatibility
export type FormState =
	| {
			error?: {
				name?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;

export const SignupFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters long.",
		})
		.trim(),
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { message: "Be at least 8 characters long" })
		.regex(/[a-zA-Z]/, {
			message: "Contain at least one letter.",
		})
		.regex(/[0-9]/, {
			message: "Contain at least one number.",
		})
		.regex(/[^a-zA-Z0-9]/, {
			message: "Contain at least one special character.",
		})
		.trim(),
});

export const LoginFormSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }),
	password: z.string().min(1, {
		message: "Password field must not be empty.",
	}),
});

export enum Role {
	ADMIN = "admin",
	EMPLOYER = "employer",
	USER = "job_seeker",
}
