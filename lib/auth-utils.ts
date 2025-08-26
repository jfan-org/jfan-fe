import { UserType, UserRegistrationData } from "@/types/auth.types";

export interface AuthResult {
	success: boolean;
	message?: string;
	error?: string;
	data?: any;
}

export class AuthError extends Error {
	constructor(message: string, public code: string, public statusCode: number = 400) {
		super(message);
		this.name = "AuthError";
	}
}

export function handleApiError(response: Response, errorData: any): string {
	const errorMessages: Record<number, string> = {
		400: "Invalid request. Please check your input.",
		401: "Invalid credentials. Please try again.",
		403: "Access denied. You don't have permission to perform this action.",
		404: "Resource not found.",
		409: "This email is already registered. Please use a different email.",
		422: "Validation failed. Please check your input.",
		429: "Too many requests. Please try again later.",
		500: "Server error. Please try again later.",
	};

	const statusCode = response.status as keyof typeof errorMessages;
	return errorData.message || errorMessages[statusCode] || "An unexpected error occurred.";
}

export function handleAuthError(error: unknown): AuthResult {
	if (error instanceof Error && error.message === "NEXT_REDIRECT") {
		throw error; // Re-throw redirect errors
	}

	console.error("Auth error:", error);
	return {
		success: false,
		message: "An unexpected error occurred. Please try again.",
	};
}

export function transformRegistrationData(userType: UserType, formData: UserRegistrationData): any {
	const baseData = {
		firstName: formData.firstName,
		lastName: formData.lastName,
		email: formData.email,
		password: formData.password,
		phone: formData.phone,
		countryId: formData.countryId,
		stateId: formData.stateId,
		cityId: formData.cityId,
		gender: formData.gender,
		userType,
	};

	// Add type-specific fields
	switch (userType) {
		case UserType.COMPANY:
			const companyData = formData as any;
			const payload = {
				...baseData,
				companyName: companyData.companyName,
				industry: companyData.industry,
				companySize: companyData.companySize,
				description: companyData.description,
			};
			
			// Only include website if it's not empty
			if (companyData.website && companyData.website.trim() !== '') {
				payload.website = companyData.website;
			}
			
			return payload;

		case UserType.TALENT:
			const talentData = formData as any;
			return {
				...baseData,
				selectedJobId: talentData.selectedJobId,
				experience: talentData.experience,
				skills: talentData.skills,
			};

		case UserType.CYBER_AGENT:
			const cyberAgentData = formData as any;
			return {
				...baseData,
				specializations: cyberAgentData.specializations,
				servicesOffered: cyberAgentData.servicesOffered,
				yearsOfExperience: cyberAgentData.yearsOfExperience,
				certifications: cyberAgentData.certifications,
			};

		case UserType.SCOUT:
			const scoutData = formData as any;
			return {
				...baseData,
				focusAreas: scoutData.focusAreas,
				networkSize: scoutData.networkSize,
				yearsOfExperience: scoutData.yearsOfExperience,
				successfulPlacements: scoutData.successfulPlacements,
			};

		case UserType.PROFESSIONAL:
			const professionalData = formData as any;
			return {
				...baseData,
				professionalBackground: professionalData.professionalBackground,
				serviceOfferings: professionalData.serviceOfferings,
				industryExpertise: professionalData.industryExpertise,
				hourlyRate: professionalData.hourlyRate,
			};

		case UserType.MENTOR:
			const mentorData = formData as any;
			return {
				...baseData,
				mentorshipAreas: mentorData.mentorshipAreas,
				experienceLevel: mentorData.experienceLevel,
				maxMentees: mentorData.maxMentees,
				mentorshipApproach: mentorData.mentorshipApproach,
			};

		case UserType.PHILANTHROPIST:
			const philanthropistData = formData as any;
			return {
				...baseData,
				focusAreas: philanthropistData.focusAreas,
				givingPreferences: philanthropistData.givingPreferences,
				organizationName: philanthropistData.organizationName,
				budgetRange: philanthropistData.budgetRange,
			};

		default:
			return baseData;
	}
}
