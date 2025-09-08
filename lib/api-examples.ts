/**
 * API Usage Examples
 *
 * This file demonstrates how to use the new API client and services
 * in different scenarios throughout the application.
 */

import { authService, userService, onboardingService, apiLocationService, apiJobCatalogService, ApiError } from "@/lib/services";
import { UserType, Gender } from "@/types/auth.types";

// ============================================================================
// Authentication Examples
// ============================================================================

/**
 * Example: User Registration
 */
export async function exampleUserRegistration() {
	try {
		const registrationData = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "SecurePassword123!",
			phone: "+1234567890",
			userType: UserType.TALENT,
			gender: Gender.MALE,
			countryId: "ng",
			stateId: "ng-la",
			cityId: "ng-la-ik",
			// Talent-specific fields
			selectedJobId: 101,
			experience: "intermediate",
			skills: "JavaScript, React, Node.js",
		};

		const result = await authService.register(registrationData);
		console.log("Registration successful:", result);
		return result;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Registration failed:", error.message);
			if (error.isClientError()) {
				// Handle validation errors
				console.error("Validation errors:", error.details);
			}
		}
		throw error;
	}
}

/**
 * Example: User Login
 */
export async function exampleUserLogin() {
	try {
		const loginData = {
			email: "john.doe@example.com",
			password: "SecurePassword123!",
		};

		const result = await authService.login(loginData);
		console.log("Login successful:", result);
		return result;
	} catch (error) {
		if (error instanceof ApiError) {
			if (error.isStatus(401)) {
				console.error("Invalid credentials");
			} else if (error.isStatus(403)) {
				console.error("Account not verified");
			}
		}
		throw error;
	}
}

// ============================================================================
// Profile Management Examples
// ============================================================================

/**
 * Example: Get User Profile
 */
export async function exampleGetProfile() {
	try {
		const profile = await userService.getProfile();
		console.log("User profile:", profile);
		return profile;
	} catch (error) {
		if (error instanceof ApiError) {
			if (error.isStatus(401)) {
				console.error("User not authenticated");
				// Redirect to login
			}
		}
		throw error;
	}
}

/**
 * Example: Update User Profile
 */
export async function exampleUpdateProfile() {
	try {
		const updateData = {
			bio: "Updated bio information",
			location: {
				countryId: "za",
				stateId: "za-wc",
				cityId: "za-wc-ct",
			},
			typeData: {
				skills: ["React", "TypeScript", "Node.js"],
				experience: "senior",
			},
		};

		const updatedProfile = await userService.updateProfile(updateData);
		console.log("Profile updated:", updatedProfile);
		return updatedProfile;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Profile update failed:", error.message);
		}
		throw error;
	}
}

/**
 * Example: Upload Avatar
 */
export async function exampleUploadAvatar(file: File) {
	try {
		const result = await userService.uploadAvatar(file);
		console.log("Avatar uploaded:", result);
		return result;
	} catch (error) {
		if (error instanceof ApiError) {
			if (error.isStatus(413)) {
				console.error("File too large");
			} else if (error.isStatus(415)) {
				console.error("Invalid file type");
			}
		}
		throw error;
	}
}

// ============================================================================
// Onboarding Examples
// ============================================================================

/**
 * Example: Get Onboarding Status
 */
export async function exampleGetOnboardingStatus() {
	try {
		const status = await onboardingService.getStatus();
		console.log("Onboarding status:", status);
		return status;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Failed to get onboarding status:", error.message);
		}
		throw error;
	}
}

/**
 * Example: Complete Onboarding
 */
export async function exampleCompleteOnboarding() {
	try {
		const onboardingData = {
			steps: [
				{
					step: 1,
					data: {
						profilePhoto: "https://example.com/photo.jpg",
						bio: "Software developer with 5 years experience",
					},
				},
				{
					step: 2,
					data: {
						location: {
							countryId: "ng",
							stateId: "ng-la",
							cityId: "ng-la-ik",
						},
					},
				},
				{
					step: 3,
					data: {
						preferences: {
							jobTypes: ["full-time", "remote"],
							salaryRange: "50000-80000",
						},
					},
				},
			],
		};

		await onboardingService.complete(onboardingData);
		console.log("Onboarding completed successfully");
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Onboarding completion failed:", error.message);
		}
		throw error;
	}
}

// ============================================================================
// Location Data Examples
// ============================================================================

/**
 * Example: Get All Countries
 */
export async function exampleGetCountries() {
	try {
		const countries = await apiLocationService.getCountries();
		console.log("Countries:", countries);
		return countries;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Failed to fetch countries:", error.message);
		}
		throw error;
	}
}

/**
 * Example: Get States by Country
 */
export async function exampleGetStatesByCountry(countryId: string) {
	try {
		const states = await apiLocationService.getStatesByCountry(countryId);
		console.log(`States for ${countryId}:`, states);
		return states;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Failed to fetch states:", error.message);
		}
		throw error;
	}
}

/**
 * Example: Search Locations
 */
export async function exampleSearchLocations(query: string) {
	try {
		const results = await apiLocationService.searchLocations(query);
		console.log(`Search results for "${query}":`, results);
		return results;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Location search failed:", error.message);
		}
		throw error;
	}
}

// ============================================================================
// Job Catalog Examples
// ============================================================================

/**
 * Example: Get Job Catalog Hierarchy
 */
export async function exampleGetJobCatalogHierarchy() {
	try {
		const hierarchy = await apiJobCatalogService.getJobCatalogHierarchy();
		console.log("Job catalog hierarchy:", hierarchy);
		return hierarchy;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Failed to fetch job catalog:", error.message);
		}
		throw error;
	}
}

/**
 * Example: Search Jobs
 */
export async function exampleSearchJobs(query: string) {
	try {
		const jobs = await apiJobCatalogService.searchJobs(query);
		console.log(`Job search results for "${query}":`, jobs);
		return jobs;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Job search failed:", error.message);
		}
		throw error;
	}
}

/**
 * Example: Get Job with Context
 */
export async function exampleGetJobWithContext(jobId: number) {
	try {
		const jobContext = await apiJobCatalogService.getJobWithContext(jobId);
		if (jobContext) {
			console.log("Job with context:", jobContext);
			console.log(
				`${jobContext.job.name} -> ${jobContext.sector.name} -> ${jobContext.industry.name} -> ${jobContext.economy.name}`
			);
		} else {
			console.log("Job not found");
		}
		return jobContext;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("Failed to fetch job context:", error.message);
		}
		throw error;
	}
}

// ============================================================================
// Error Handling Examples
// ============================================================================

/**
 * Example: Comprehensive Error Handling
 */
export async function exampleWithErrorHandling() {
	try {
		// Some API operation
		const result = await authService.login({
			email: "test@example.com",
			password: "wrongpassword",
		});
		return result;
	} catch (error) {
		if (error instanceof ApiError) {
			// Handle specific HTTP status codes
			switch (error.status) {
				case 400:
					console.error("Bad request - check your input");
					break;
				case 401:
					console.error("Unauthorized - please login");
					break;
				case 403:
					console.error("Forbidden - insufficient permissions");
					break;
				case 404:
					console.error("Not found");
					break;
				case 422:
					console.error("Validation failed:", error.details);
					break;
				case 429:
					console.error("Rate limit exceeded - please try again later");
					break;
				case 500:
					console.error("Server error - please try again");
					break;
				default:
					console.error("Unexpected error:", error.message);
			}

			// Check error type
			if (error.isClientError()) {
				console.log("This is a client-side error (4xx)");
			} else if (error.isServerError()) {
				console.log("This is a server-side error (5xx)");
			}
		} else {
			// Handle non-API errors
			console.error("Unexpected error:", error);
		}

		throw error;
	}
}

// ============================================================================
// Cache Management Examples
// ============================================================================

/**
 * Example: Clear All Caches
 */
export function exampleClearCaches() {
	apiLocationService.clearCache();
	apiJobCatalogService.clearCache();
	console.log("All caches cleared");
}

/**
 * Example: Preload Data
 */
export async function examplePreloadData() {
	try {
		// Preload commonly used data
		const [countries, jobCatalog] = await Promise.all([apiLocationService.getCountries(), apiJobCatalogService.getJobCatalog()]);

		console.log("Data preloaded successfully");
		return { countries, jobCatalog };
	} catch (error) {
		console.error("Failed to preload data:", error);
		throw error;
	}
}
