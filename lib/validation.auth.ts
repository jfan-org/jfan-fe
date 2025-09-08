import { z } from "zod";
import { UserType } from "@/types/auth.types";

// Base schemas
export const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const verifyEmailSchema = z.object({
	code: z.string().length(6, "Verification code must be 6 digits"),
});

// Base registration schema with common fields
const baseRegistrationSchema = z
	.object({
		firstName: z.string().min(2, "First name must be at least 2 characters"),
		lastName: z.string().min(2, "Last name must be at least 2 characters"),
		email: z.string().email("Please enter a valid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			),
		confirmPassword: z.string(),
		phone: z.string().min(10, "Phone number must be at least 10 characters"),
		countryId: z.string().min(1, "Please select a country").optional(),
		stateId: z.string().min(1, "Please select a state").optional(),
		cityId: z.string().min(1, "Please select a city").optional(),
		gender: z.enum(["male", "female"], { required_error: "Please select a gender" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

// Company registration schema
export const companyRegistrationSchema = baseRegistrationSchema.extend({
	companyName: z.string().min(2, "Company name must be at least 2 characters"),
	industry: z.string().min(1, "Please select an industry"),
	companySize: z.string().min(1, "Please select company size"),
	website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
	description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
});

// Talent registration schema
export const talentRegistrationSchema = baseRegistrationSchema.extend({
	selectedJobId: z.number().min(1, "Please select a job from the catalog"),
	experience: z.string().min(1, "Please select your experience level"),
	skills: z.string().min(1, "Please enter your skills"),
});

// Cyber Agent registration schema
export const cyberAgentRegistrationSchema = baseRegistrationSchema.extend({
	specializations: z.array(z.string()).min(1, "Please select at least one specialization"),
	servicesOffered: z.array(z.string()).min(1, "Please select at least one service"),
	yearsOfExperience: z.number().min(0, "Years of experience must be 0 or greater"),
	certifications: z.array(z.string()).optional(),
});

// Scout registration schema
export const scoutRegistrationSchema = baseRegistrationSchema.extend({
	focusAreas: z.array(z.string()).min(1, "Please select at least one focus area"),
	networkSize: z.string().min(1, "Please select your network size"),
	yearsOfExperience: z.number().min(0, "Years of experience must be 0 or greater"),
	successfulPlacements: z.number().min(0, "Successful placements must be 0 or greater").optional(),
});

// Professional registration schema
export const professionalRegistrationSchema = baseRegistrationSchema.extend({
	professionalBackground: z
		.string()
		.min(10, "Professional background must be at least 10 characters")
		.max(500, "Professional background must be less than 500 characters"),
	serviceOfferings: z.array(z.string()).min(1, "Please select at least one service offering"),
	industryExpertise: z.array(z.string()).min(1, "Please select at least one area of industry expertise"),
	hourlyRate: z.number().min(0, "Hourly rate must be 0 or greater").optional(),
});

// Mentor registration schema
export const mentorRegistrationSchema = baseRegistrationSchema.extend({
	mentorshipAreas: z.array(z.string()).min(1, "Please select at least one mentorship area"),
	experienceLevel: z.string().min(1, "Please select your experience level"),
	maxMentees: z.number().min(1, "Maximum mentees must be at least 1").max(20, "Maximum mentees cannot exceed 20"),
	mentorshipApproach: z.string().max(500, "Mentorship approach must be less than 500 characters").optional(),
});

// Philanthropist registration schema
export const philanthropistRegistrationSchema = baseRegistrationSchema.extend({
	focusAreas: z.array(z.string()).min(1, "Please select at least one focus area"),
	givingPreferences: z.array(z.string()).min(1, "Please select at least one giving preference"),
	organizationName: z.string().max(100, "Organization name must be less than 100 characters").optional(),
	budgetRange: z.string().optional(),
});

// Legacy signup schema for backward compatibility
export const signupSchema = z
	.object({
		firstName: z.string().min(2, "First name must be at least 2 characters"),
		lastName: z.string().min(2, "Last name must be at least 2 characters"),
		email: z.string().email("Please enter a valid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

// Dynamic validation schema selection
export function getValidationSchema(userType: UserType) {
	switch (userType) {
		case UserType.COMPANY:
			return companyRegistrationSchema;
		case UserType.TALENT:
			return talentRegistrationSchema;
		case UserType.CYBER_AGENT:
			return cyberAgentRegistrationSchema;
		case UserType.SCOUT:
			return scoutRegistrationSchema;
		case UserType.PROFESSIONAL:
			return professionalRegistrationSchema;
		case UserType.MENTOR:
			return mentorRegistrationSchema;
		case UserType.PHILANTHROPIST:
			return philanthropistRegistrationSchema;
		default:
			return baseRegistrationSchema;
	}
}

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export type BaseRegistrationInput = z.infer<typeof baseRegistrationSchema>;
export type CompanyRegistrationInput = z.infer<typeof companyRegistrationSchema>;
export type TalentRegistrationInput = z.infer<typeof talentRegistrationSchema>;
export type CyberAgentRegistrationInput = z.infer<typeof cyberAgentRegistrationSchema>;
export type ScoutRegistrationInput = z.infer<typeof scoutRegistrationSchema>;
export type ProfessionalRegistrationInput = z.infer<typeof professionalRegistrationSchema>;
export type MentorRegistrationInput = z.infer<typeof mentorRegistrationSchema>;
export type PhilanthropistRegistrationInput = z.infer<typeof philanthropistRegistrationSchema>;
