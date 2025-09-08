/**
 * Type-safe API interfaces for JFAN backend endpoints
 */

import { UserType, Gender } from "@/types/auth.types";

// ============================================================================
// Authentication API Types
// ============================================================================

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		userType: UserType;
		role: UserType; // Simplified: role = userType
		isOnboarded: boolean;
		isEmailVerified: boolean;
	};
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
}

export interface RegisterRequest {
	// Base fields (required for all user types)
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
	userType: UserType;
	gender: Gender;

	// Location fields
	countryId: string;
	stateId?: string;
	cityId?: string;

	// User type-specific fields (optional)
	companyName?: string;
	industry?: string;
	companySize?: string;
	website?: string;
	description?: string;
	selectedJobId?: number;
	experience?: string;
	skills?: string;
	specializations?: string[];
	servicesOffered?: string[];
	yearsOfExperience?: number;
	certifications?: string[];
	focusAreas?: string[];
	networkSize?: string;
	successfulPlacements?: number;
	professionalBackground?: string;
	serviceOfferings?: string[];
	industryExpertise?: string[];
	hourlyRate?: number;
	mentorshipAreas?: string[];
	experienceLevel?: string;
	maxMentees?: number;
	mentorshipApproach?: string;
	givingPreferences?: string[];
	organizationName?: string;
	budgetRange?: string;
	adminLevel?: string;
	department?: string;
}

export interface RegisterResponse {
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		userType: UserType;
	};
	message: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface RefreshTokenResponse {
	accessToken: string;
	refreshToken: string;
}

export interface ForgotPasswordRequest {
	email: string;
}

export interface ResetPasswordRequest {
	token: string;
	password: string;
}

export interface VerifyEmailRequest {
	token: string;
}

export interface ResendVerificationRequest {
	email: string;
}

// ============================================================================
// User Profile API Types
// ============================================================================

export interface UserProfile {
	id: string;
	userId: string;
	bio?: string;
	avatar?: string;
	location?: {
		country: string;
		state?: string;
		city?: string;
	};
	// Type-specific profile data stored as JSON
	typeData: Record<string, any>;
	createdAt: string;
	updatedAt: string;
}

export interface UpdateProfileRequest {
	bio?: string;
	avatar?: string;
	location?: {
		countryId: string;
		stateId?: string;
		cityId?: string;
	};
	typeData?: Record<string, any>;
}

export interface ChangePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

// ============================================================================
// Onboarding API Types
// ============================================================================

export interface OnboardingStep {
	step: number;
	name: string;
	completed: boolean;
	data?: Record<string, any>;
}

export interface OnboardingStatus {
	isCompleted: boolean;
	currentStep: number;
	totalSteps: number;
	steps: OnboardingStep[];
}

export interface CompleteOnboardingRequest {
	steps: Array<{
		step: number;
		data: Record<string, any>;
	}>;
}

export interface UpdateOnboardingStepRequest {
	step: number;
	data: Record<string, any>;
}

// ============================================================================
// Location API Types
// ============================================================================

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

export interface LocationResponse {
	countries: Country[];
	states: State[];
	cities: City[];
}

// ============================================================================
// Job Catalog API Types
// ============================================================================

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

export interface JobCatalogResponse {
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
}

export interface JobCatalogHierarchy {
	economy: Economy;
	industries: Array<{
		industry: Industry;
		sectors: Array<{
			sector: Sector;
			jobs: Job[];
		}>;
	}>;
}

// ============================================================================
// File Upload API Types
// ============================================================================

export interface FileUploadResponse {
	url: string;
	filename: string;
	size: number;
	mimeType: string;
}

export interface AvatarUploadRequest {
	file: File;
}

// ============================================================================
// Error Response Types
// ============================================================================

export interface ValidationError {
	field: string;
	message: string;
	code?: string;
}

export interface ErrorResponse {
	success: false;
	message: string;
	error?: string;
	errors?: ValidationError[];
	code?: string;
	statusCode: number;
}

// ============================================================================
// Pagination Types
// ============================================================================

export interface PaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

// ============================================================================
// Search and Filter Types
// ============================================================================

export interface SearchParams {
	query?: string;
	filters?: Record<string, any>;
	pagination?: PaginationParams;
}

// ============================================================================
// API Endpoint Constants
// ============================================================================

export const API_ENDPOINTS = {
	// Authentication
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		LOGOUT: "/auth/logout",
		REFRESH: "/auth/refresh",
		FORGOT_PASSWORD: "/auth/forgot-password",
		RESET_PASSWORD: "/auth/reset-password",
		VERIFY_EMAIL: "/auth/verify-email",
		RESEND_VERIFICATION: "/auth/resend-verification",
	},

	// User Profile
	USER: {
		PROFILE: "/user/profile",
		UPDATE_PROFILE: "/user/profile",
		CHANGE_PASSWORD: "/user/change-password",
		UPLOAD_AVATAR: "/user/avatar",
	},

	// Onboarding
	ONBOARDING: {
		STATUS: "/onboarding/status",
		COMPLETE: "/onboarding/complete",
		UPDATE_STEP: "/onboarding/step",
	},

	// Location
	LOCATION: {
		COUNTRIES: "/location/countries",
		STATES: "/location/states",
		CITIES: "/location/cities",
		ALL: "/location/all",
	},

	// Job Catalog
	JOB_CATALOG: {
		ALL: "/job-catalog",
		ECONOMIES: "/job-catalog/economies",
		INDUSTRIES: "/job-catalog/industries",
		SECTORS: "/job-catalog/sectors",
		JOBS: "/job-catalog/jobs",
		HIERARCHY: "/job-catalog/hierarchy",
	},

	// File Upload
	UPLOAD: {
		AVATAR: "/upload/avatar",
		DOCUMENT: "/upload/document",
	},
} as const;
