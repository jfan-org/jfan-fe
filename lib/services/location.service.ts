/**
 * Location Service
 *
 * Handles location data fetching including countries, states, and cities
 * with simple caching for static data.
 */

import { api, ApiError } from "@/lib/api-client";
import { API_ENDPOINTS, Country, State, City, LocationResponse } from "@/lib/api-types";

// Simple in-memory cache for location data
class LocationCache {
	private cache = new Map<string, { data: any; timestamp: number }>();
	private readonly TTL = 30 * 60 * 1000; // 30 minutes

	set(key: string, data: any): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
		});
	}

	get(key: string): any | null {
		const cached = this.cache.get(key);
		if (!cached) return null;

		// Check if cache is expired
		if (Date.now() - cached.timestamp > this.TTL) {
			this.cache.delete(key);
			return null;
		}

		return cached.data;
	}

	clear(): void {
		this.cache.clear();
	}
}

const locationCache = new LocationCache();

export class LocationService {
	/**
	 * Get all location data (countries, states, cities)
	 */
	static async getAllLocations(): Promise<LocationResponse> {
		const cacheKey = "all-locations";
		const cached = locationCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<LocationResponse>(API_ENDPOINTS.LOCATION.ALL, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch location data", 400);
			}

			// Cache the result
			locationCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Location data request failed", 500);
		}
	}

	/**
	 * Get all countries
	 */
	static async getCountries(): Promise<Country[]> {
		const cacheKey = "countries";
		const cached = locationCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<Country[]>(API_ENDPOINTS.LOCATION.COUNTRIES, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch countries", 400);
			}

			// Cache the result
			locationCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Countries request failed", 500);
		}
	}

	/**
	 * Get states by country ID
	 */
	static async getStatesByCountry(countryId: string): Promise<State[]> {
		const cacheKey = `states-${countryId}`;
		const cached = locationCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<State[]>(`${API_ENDPOINTS.LOCATION.STATES}?countryId=${countryId}`, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch states", 400);
			}

			// Cache the result
			locationCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("States request failed", 500);
		}
	}

	/**
	 * Get cities by state ID
	 */
	static async getCitiesByState(stateId: string): Promise<City[]> {
		const cacheKey = `cities-${stateId}`;
		const cached = locationCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<City[]>(`${API_ENDPOINTS.LOCATION.CITIES}?stateId=${stateId}`, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch cities", 400);
			}

			// Cache the result
			locationCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Cities request failed", 500);
		}
	}

	/**
	 * Search locations by query
	 */
	static async searchLocations(query: string): Promise<{
		countries: Country[];
		states: State[];
		cities: City[];
	}> {
		try {
			// Get all locations first
			const allLocations = await this.getAllLocations();

			const searchTerm = query.toLowerCase();

			// Filter locations based on search query
			const countries = allLocations.countries.filter((country) => country.name.toLowerCase().includes(searchTerm));

			const states = allLocations.states.filter((state) => state.name.toLowerCase().includes(searchTerm));

			const cities = allLocations.cities.filter((city) => city.name.toLowerCase().includes(searchTerm));

			return { countries, states, cities };
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Location search failed", 500);
		}
	}

	/**
	 * Clear location cache
	 */
	static clearCache(): void {
		locationCache.clear();
	}
}

// Export convenience functions
export const locationService = {
	getAllLocations: LocationService.getAllLocations,
	getCountries: LocationService.getCountries,
	getStatesByCountry: LocationService.getStatesByCountry,
	getCitiesByState: LocationService.getCitiesByState,
	searchLocations: LocationService.searchLocations,
	clearCache: LocationService.clearCache,
};
