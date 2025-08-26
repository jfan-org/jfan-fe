"use client";

import { Country, State, City, LocationData } from "@/types/auth.types";

// Cache configuration
const CACHE_KEY = "location_data_cache";
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

interface CachedLocationData {
	data: LocationData;
	timestamp: number;
}

// Static location data (can be replaced with API calls)
const staticLocationData: LocationData = {
	countries: [
		{
			id: "ng",
			name: "Nigeria",
			code: "NG",
			flag: "🇳🇬",
		},
		{
			id: "za",
			name: "South Africa",
			code: "ZA",
			flag: "🇿🇦",
		},
		{
			id: "ke",
			name: "Kenya",
			code: "KE",
			flag: "🇰🇪",
		},
		{
			id: "gh",
			name: "Ghana",
			code: "GH",
			flag: "🇬🇭",
		},
		{
			id: "eg",
			name: "Egypt",
			code: "EG",
			flag: "🇪🇬",
		},
		{
			id: "ma",
			name: "Morocco",
			code: "MA",
			flag: "🇲🇦",
		},
		{
			id: "et",
			name: "Ethiopia",
			code: "ET",
			flag: "🇪🇹",
		},
		{
			id: "ug",
			name: "Uganda",
			code: "UG",
			flag: "🇺🇬",
		},
		{
			id: "tz",
			name: "Tanzania",
			code: "TZ",
			flag: "🇹🇿",
		},
		{
			id: "rw",
			name: "Rwanda",
			code: "RW",
			flag: "🇷🇼",
		},
		{
			id: "sn",
			name: "Senegal",
			code: "SN",
			flag: "🇸🇳",
		},
		{
			id: "ci",
			name: "Côte d'Ivoire",
			code: "CI",
			flag: "🇨🇮",
		},
		{
			id: "zm",
			name: "Zambia",
			code: "ZM",
			flag: "🇿🇲",
		},
		{
			id: "zw",
			name: "Zimbabwe",
			code: "ZW",
			flag: "🇿🇼",
		},
		{
			id: "bw",
			name: "Botswana",
			code: "BW",
			flag: "🇧🇼",
		},
	],
	states: [
		// Nigeria
		{ id: "ng-la", name: "Lagos State", countryId: "ng" },
		{ id: "ng-fc", name: "Federal Capital Territory", countryId: "ng" },
		{ id: "ng-ka", name: "Kano State", countryId: "ng" },
		{ id: "ng-ri", name: "Rivers State", countryId: "ng" },
		{ id: "ng-on", name: "Ogun State", countryId: "ng" },
		{ id: "ng-oy", name: "Oyo State", countryId: "ng" },

		// South Africa
		{ id: "za-wc", name: "Western Cape", countryId: "za" },
		{ id: "za-gt", name: "Gauteng", countryId: "za" },
		{ id: "za-kn", name: "KwaZulu-Natal", countryId: "za" },
		{ id: "za-ec", name: "Eastern Cape", countryId: "za" },

		// Kenya
		{ id: "ke-nb", name: "Nairobi County", countryId: "ke" },
		{ id: "ke-mb", name: "Mombasa County", countryId: "ke" },
		{ id: "ke-ki", name: "Kiambu County", countryId: "ke" },
		{ id: "ke-nk", name: "Nakuru County", countryId: "ke" },

		// Ghana
		{ id: "gh-gr", name: "Greater Accra Region", countryId: "gh" },
		{ id: "gh-as", name: "Ashanti Region", countryId: "gh" },
		{ id: "gh-we", name: "Western Region", countryId: "gh" },

		// Egypt
		{ id: "eg-ca", name: "Cairo Governorate", countryId: "eg" },
		{ id: "eg-al", name: "Alexandria Governorate", countryId: "eg" },
		{ id: "eg-gi", name: "Giza Governorate", countryId: "eg" },

		// Morocco
		{ id: "ma-cs", name: "Casablanca-Settat", countryId: "ma" },
		{ id: "ma-rs", name: "Rabat-Salé-Kénitra", countryId: "ma" },
		{ id: "ma-fm", name: "Fès-Meknès", countryId: "ma" },

		// Ethiopia
		{ id: "et-aa", name: "Addis Ababa", countryId: "et" },
		{ id: "et-or", name: "Oromia Region", countryId: "et" },
		{ id: "et-am", name: "Amhara Region", countryId: "et" },

		// Uganda
		{ id: "ug-ce", name: "Central Region", countryId: "ug" },
		{ id: "ug-we", name: "Western Region", countryId: "ug" },
		{ id: "ug-ea", name: "Eastern Region", countryId: "ug" },

		// Tanzania
		{ id: "tz-ds", name: "Dar es Salaam Region", countryId: "tz" },
		{ id: "tz-ar", name: "Arusha Region", countryId: "tz" },
		{ id: "tz-ki", name: "Kilimanjaro Region", countryId: "tz" },

		// Rwanda
		{ id: "rw-ki", name: "Kigali City", countryId: "rw" },
		{ id: "rw-no", name: "Northern Province", countryId: "rw" },
		{ id: "rw-so", name: "Southern Province", countryId: "rw" },

		// Senegal
		{ id: "sn-dk", name: "Dakar Region", countryId: "sn" },
		{ id: "sn-th", name: "Thiès Region", countryId: "sn" },

		// Côte d'Ivoire
		{ id: "ci-ab", name: "Abidjan Autonomous District", countryId: "ci" },
		{ id: "ci-ym", name: "Yamoussoukro Autonomous District", countryId: "ci" },

		// Zambia
		{ id: "zm-lu", name: "Lusaka Province", countryId: "zm" },
		{ id: "zm-co", name: "Copperbelt Province", countryId: "zm" },

		// Zimbabwe
		{ id: "zw-ha", name: "Harare Province", countryId: "zw" },
		{ id: "zw-bu", name: "Bulawayo Province", countryId: "zw" },

		// Botswana
		{ id: "bw-se", name: "South-East District", countryId: "bw" },
		{ id: "bw-nw", name: "North-West District", countryId: "bw" },
	],
	cities: [
		// Nigeria - Lagos State
		{ id: "ng-la-ik", name: "Ikeja", stateId: "ng-la" },
		{ id: "ng-la-vi", name: "Victoria Island", stateId: "ng-la" },
		{ id: "ng-la-le", name: "Lekki", stateId: "ng-la" },
		{ id: "ng-la-su", name: "Surulere", stateId: "ng-la" },
		{ id: "ng-la-ml", name: "Mainland", stateId: "ng-la" },

		// Nigeria - FCT
		{ id: "ng-fc-ab", name: "Abuja", stateId: "ng-fc" },
		{ id: "ng-fc-ga", name: "Garki", stateId: "ng-fc" },
		{ id: "ng-fc-wu", name: "Wuse", stateId: "ng-fc" },
		{ id: "ng-fc-ma", name: "Maitama", stateId: "ng-fc" },

		// Nigeria - Kano State
		{ id: "ng-ka-ka", name: "Kano City", stateId: "ng-ka" },
		{ id: "ng-ka-fa", name: "Fagge", stateId: "ng-ka" },

		// Nigeria - Rivers State
		{ id: "ng-ri-ph", name: "Port Harcourt", stateId: "ng-ri" },
		{ id: "ng-ri-ob", name: "Obio-Akpor", stateId: "ng-ri" },

		// South Africa - Western Cape
		{ id: "za-wc-ct", name: "Cape Town", stateId: "za-wc" },
		{ id: "za-wc-st", name: "Stellenbosch", stateId: "za-wc" },
		{ id: "za-wc-pa", name: "Paarl", stateId: "za-wc" },

		// South Africa - Gauteng
		{ id: "za-gt-jh", name: "Johannesburg", stateId: "za-gt" },
		{ id: "za-gt-pr", name: "Pretoria", stateId: "za-gt" },
		{ id: "za-gt-so", name: "Soweto", stateId: "za-gt" },
		{ id: "za-gt-sa", name: "Sandton", stateId: "za-gt" },

		// South Africa - KwaZulu-Natal
		{ id: "za-kn-du", name: "Durban", stateId: "za-kn" },
		{ id: "za-kn-pm", name: "Pietermaritzburg", stateId: "za-kn" },

		// Kenya - Nairobi County
		{ id: "ke-nb-na", name: "Nairobi City", stateId: "ke-nb" },
		{ id: "ke-nb-we", name: "Westlands", stateId: "ke-nb" },
		{ id: "ke-nb-ka", name: "Karen", stateId: "ke-nb" },

		// Kenya - Mombasa County
		{ id: "ke-mb-mo", name: "Mombasa City", stateId: "ke-mb" },
		{ id: "ke-mb-ny", name: "Nyali", stateId: "ke-mb" },

		// Ghana - Greater Accra Region
		{ id: "gh-gr-ac", name: "Accra", stateId: "gh-gr" },
		{ id: "gh-gr-te", name: "Tema", stateId: "gh-gr" },
		{ id: "gh-gr-ma", name: "Madina", stateId: "gh-gr" },

		// Ghana - Ashanti Region
		{ id: "gh-as-ku", name: "Kumasi", stateId: "gh-as" },
		{ id: "gh-as-ob", name: "Obuasi", stateId: "gh-as" },

		// Egypt - Cairo Governorate
		{ id: "eg-ca-ca", name: "Cairo City", stateId: "eg-ca" },
		{ id: "eg-ca-he", name: "Heliopolis", stateId: "eg-ca" },
		{ id: "eg-ca-ma", name: "Maadi", stateId: "eg-ca" },

		// Egypt - Alexandria Governorate
		{ id: "eg-al-al", name: "Alexandria City", stateId: "eg-al" },
		{ id: "eg-al-mo", name: "Montaza", stateId: "eg-al" },

		// Morocco - Casablanca-Settat
		{ id: "ma-cs-ca", name: "Casablanca", stateId: "ma-cs" },
		{ id: "ma-cs-mo", name: "Mohammedia", stateId: "ma-cs" },

		// Morocco - Rabat-Salé-Kénitra
		{ id: "ma-rs-ra", name: "Rabat", stateId: "ma-rs" },
		{ id: "ma-rs-sa", name: "Salé", stateId: "ma-rs" },

		// Ethiopia - Addis Ababa
		{ id: "et-aa-aa", name: "Addis Ababa City", stateId: "et-aa" },
		{ id: "et-aa-bo", name: "Bole", stateId: "et-aa" },

		// Uganda - Central Region
		{ id: "ug-ce-ka", name: "Kampala", stateId: "ug-ce" },
		{ id: "ug-ce-en", name: "Entebbe", stateId: "ug-ce" },

		// Tanzania - Dar es Salaam Region
		{ id: "tz-ds-ds", name: "Dar es Salaam City", stateId: "tz-ds" },
		{ id: "tz-ds-ki", name: "Kinondoni", stateId: "tz-ds" },

		// Rwanda - Kigali City
		{ id: "rw-ki-ki", name: "Kigali City", stateId: "rw-ki" },
		{ id: "rw-ki-ga", name: "Gasabo", stateId: "rw-ki" },

		// Senegal - Dakar Region
		{ id: "sn-dk-dk", name: "Dakar City", stateId: "sn-dk" },
		{ id: "sn-dk-pi", name: "Pikine", stateId: "sn-dk" },

		// Côte d'Ivoire - Abidjan
		{ id: "ci-ab-ab", name: "Abidjan City", stateId: "ci-ab" },
		{ id: "ci-ab-co", name: "Cocody", stateId: "ci-ab" },

		// Zambia - Lusaka Province
		{ id: "zm-lu-lu", name: "Lusaka City", stateId: "zm-lu" },
		{ id: "zm-lu-ch", name: "Chilanga", stateId: "zm-lu" },

		// Zimbabwe - Harare Province
		{ id: "zw-ha-ha", name: "Harare City", stateId: "zw-ha" },
		{ id: "zw-ha-ch", name: "Chitungwiza", stateId: "zw-ha" },

		// Botswana - South-East District
		{ id: "bw-se-ga", name: "Gaborone", stateId: "bw-se" },
		{ id: "bw-se-lo", name: "Lobatse", stateId: "bw-se" },
	],
};

class LocationService {
	private cache: LocationData | null = null;
	private lastFetch: number = 0;

	/**
	 * Get location data with caching
	 */
	async getLocationData(): Promise<LocationData> {
		// Check if we have valid cached data
		if (this.cache && Date.now() - this.lastFetch < CACHE_DURATION) {
			return this.cache;
		}

		// Try to get from localStorage first
		const cachedData = this.getCachedData();
		if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
			this.cache = cachedData.data;
			this.lastFetch = cachedData.timestamp;
			return cachedData.data;
		}

		// Fetch fresh data
		const freshData = await this.fetchLocationData();

		// Cache the data
		this.setCachedData(freshData);
		this.cache = freshData;
		this.lastFetch = Date.now();

		return freshData;
	}

	/**
	 * Fetch location data from API or local source
	 */
	private async fetchLocationData(): Promise<LocationData> {
		// For now, return static data
		// In the future, this can be replaced with an API call
		return staticLocationData;
	}

	/**
	 * Get cached data from localStorage
	 */
	private getCachedData(): CachedLocationData | null {
		try {
			const cached = localStorage.getItem(CACHE_KEY);
			if (cached) {
				return JSON.parse(cached);
			}
		} catch (error) {
			console.warn("Failed to parse cached location data:", error);
		}
		return null;
	}

	/**
	 * Set cached data in localStorage
	 */
	private setCachedData(data: LocationData): void {
		try {
			const cacheData: CachedLocationData = {
				data,
				timestamp: Date.now(),
			};
			localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
		} catch (error) {
			console.warn("Failed to cache location data:", error);
		}
	}

	/**
	 * Get countries
	 */
	async getCountries(): Promise<Country[]> {
		const data = await this.getLocationData();
		return data.countries;
	}

	/**
	 * Get states by country ID
	 */
	async getStatesByCountry(countryId: string): Promise<State[]> {
		const data = await this.getLocationData();
		return data.states.filter((state) => state.countryId === countryId);
	}

	/**
	 * Get cities by state ID
	 */
	async getCitiesByState(stateId: string): Promise<City[]> {
		const data = await this.getLocationData();
		return data.cities.filter((city) => city.stateId === stateId);
	}

	/**
	 * Get complete location path
	 */
	async getLocationPath(cityId: string): Promise<{
		country: Country;
		state: State;
		city: City;
	} | null> {
		const data = await this.getLocationData();

		const city = data.cities.find((c) => c.id === cityId);
		if (!city) return null;

		const state = data.states.find((s) => s.id === city.stateId);
		if (!state) return null;

		const country = data.countries.find((c) => c.id === state.countryId);
		if (!country) return null;

		return { country, state, city };
	}

	/**
	 * Search locations by name
	 */
	async searchLocations(query: string): Promise<any[]> {
		const data = await this.getLocationData();
		const searchTerm = query.toLowerCase().trim();

		if (!searchTerm) return [];

		const results: any[] = [];

		// Search countries
		data.countries.forEach((country) => {
			if (country.name.toLowerCase().includes(searchTerm)) {
				results.push({
					type: "country",
					id: country.id,
					name: country.name,
					flag: country.flag,
				});
			}
		});

		// Search states
		data.states.forEach((state) => {
			if (state.name.toLowerCase().includes(searchTerm)) {
				const country = data.countries.find((c) => c.id === state.countryId);
				results.push({
					type: "state",
					id: state.id,
					name: state.name,
					countryId: state.countryId,
					countryName: country?.name || "Unknown",
				});
			}
		});

		// Search cities
		data.cities.forEach((city) => {
			if (city.name.toLowerCase().includes(searchTerm)) {
				const state = data.states.find((s) => s.id === city.stateId);
				const country = state ? data.countries.find((c) => c.id === state.countryId) : null;
				results.push({
					type: "city",
					id: city.id,
					name: city.name,
					stateId: city.stateId,
					stateName: state?.name || "Unknown",
					countryName: country?.name || "Unknown",
				});
			}
		});

		return results.slice(0, 20); // Limit results
	}

	/**
	 * Clear cache
	 */
	clearCache(): void {
		this.cache = null;
		this.lastFetch = 0;
		try {
			localStorage.removeItem(CACHE_KEY);
		} catch (error) {
			console.warn("Failed to clear location cache:", error);
		}
	}
}

// Export singleton instance
export const locationService = new LocationService();

// Export utility functions
export const getLocationData = () => locationService.getLocationData();
export const getCountries = () => locationService.getCountries();
export const getStatesByCountry = (countryId: string) => locationService.getStatesByCountry(countryId);
export const getCitiesByState = (stateId: string) => locationService.getCitiesByState(stateId);
export const getLocationPath = (cityId: string) => locationService.getLocationPath(cityId);
export const searchLocations = (query: string) => locationService.searchLocations(query);
