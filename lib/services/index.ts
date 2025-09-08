/**
 * Services Index
 *
 * Central export point for all API services
 */

// Export new API-based service classes
export { AuthService, authService } from "./auth.service";
export { UserService, userService } from "./user.service";
export { LocationService as ApiLocationService, locationService as apiLocationService } from "./location.service";
export { JobCatalogService as ApiJobCatalogService, jobCatalogService as apiJobCatalogService } from "./job-catalog.service";

// Export existing services for backward compatibility
export { locationService as existingLocationService } from "./locationService";
export { jobCatalogService as existingJobCatalogService } from "./jobCatalogService";

// Export API client and types
export { api, apiClient, ApiClient, ApiError } from "../api-client";
export * from "../api-types";

// Convenience object with all new API-based services
export const apiServices = {
	auth: authService,
	user: userService,
	location: apiLocationService,
	jobCatalog: apiJobCatalogService,
};

// Convenience object with existing services (for backward compatibility)
export const legacyServices = {
	location: existingLocationService,
	jobCatalog: existingJobCatalogService,
};

// Default services object (uses new API services where available, falls back to existing)
export const services = {
	auth: authService,
	user: userService,
	location: apiLocationService, // Use new API service
	jobCatalog: apiJobCatalogService, // Use new API service

	// Legacy services available as fallback
	legacyLocation: existingLocationService,
	legacyJobCatalog: existingJobCatalogService,
};

// Clear all caches utility
export const clearAllCaches = () => {
	apiLocationService.clearCache();
	apiJobCatalogService.clearCache();
	existingLocationService.clearCache();
	existingJobCatalogService.clearCache();
};
