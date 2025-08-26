"use client";

import { useState, useEffect, useMemo } from "react";
import { Country, State, City } from "@/types/auth.types";
import { locationService } from "@/lib/services/locationService";

interface UseLocationDataReturn {
	// Data
	countries: Country[];
	states: State[];
	cities: City[];

	// Selected items
	selectedCountry: Country | null;
	selectedState: State | null;
	selectedCity: City | null;

	// Loading and error states
	isLoading: boolean;
	error: string | null;

	// Actions
	setSelectedCountry: (country: Country | null) => void;
	setSelectedState: (state: State | null) => void;
	setSelectedCity: (city: City | null) => void;

	// Utilities
	searchLocations: (query: string) => any[];
	getLocationPath: (cityId: string) => Promise<any>;
}

export function useLocationData(): UseLocationDataReturn {
	// State
	const [countries, setCountries] = useState<Country[]>([]);
	const [allStates, setAllStates] = useState<State[]>([]);
	const [allCities, setAllCities] = useState<City[]>([]);

	const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
	const [selectedState, setSelectedState] = useState<State | null>(null);
	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Load initial data
	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const locationData = await locationService.getLocationData();

				setCountries(locationData.countries);
				setAllStates(locationData.states);
				setAllCities(locationData.cities);
			} catch (err) {
				console.error("Failed to load location data:", err);
				setError("Failed to load location data. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, []);

	// Get available states based on selected country
	const states = useMemo(() => {
		if (!selectedCountry) return [];
		return allStates.filter((state) => state.countryId === selectedCountry.id);
	}, [allStates, selectedCountry]);

	// Get available cities based on selected state
	const cities = useMemo(() => {
		if (!selectedState) return [];
		return allCities.filter((city) => city.stateId === selectedState.id);
	}, [allCities, selectedState]);

	// Handle country selection (clear dependent selections)
	const handleSetSelectedCountry = (country: Country | null) => {
		setSelectedCountry(country);
		setSelectedState(null);
		setSelectedCity(null);
	};

	// Handle state selection (clear dependent selections)
	const handleSetSelectedState = (state: State | null) => {
		setSelectedState(state);
		setSelectedCity(null);
	};

	// Search functionality
	const searchLocations = useMemo(() => {
		return (query: string) => {
			if (!query.trim()) return [];

			const searchTerm = query.toLowerCase();
			const results: any[] = [];

			// Search countries
			countries.forEach((country) => {
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
			allStates.forEach((state) => {
				if (state.name.toLowerCase().includes(searchTerm)) {
					const country = countries.find((c) => c.id === state.countryId);
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
			allCities.forEach((city) => {
				if (city.name.toLowerCase().includes(searchTerm)) {
					const state = allStates.find((s) => s.id === city.stateId);
					const country = state ? countries.find((c) => c.id === state.countryId) : null;
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

			// Sort results by relevance (exact matches first, then partial matches)
			return results
				.sort((a, b) => {
					const aExact = a.name.toLowerCase() === searchTerm;
					const bExact = b.name.toLowerCase() === searchTerm;

					if (aExact && !bExact) return -1;
					if (!aExact && bExact) return 1;

					// Then by type priority (country > state > city)
					const typePriority = { country: 0, state: 1, city: 2 };
					return typePriority[a.type] - typePriority[b.type];
				})
				.slice(0, 10); // Limit to 10 results
		};
	}, [countries, allStates, allCities]);

	// Get complete location path
	const getLocationPath = async (cityId: string) => {
		try {
			const city = allCities.find((c) => c.id === cityId);
			if (!city) return null;

			const state = allStates.find((s) => s.id === city.stateId);
			if (!state) return null;

			const country = countries.find((c) => c.id === state.countryId);
			if (!country) return null;

			return { country, state, city };
		} catch (error) {
			console.error("Failed to get location path:", error);
			return null;
		}
	};

	return {
		// Data
		countries,
		states,
		cities,

		// Selected items
		selectedCountry,
		selectedState,
		selectedCity,

		// Loading and error states
		isLoading,
		error,

		// Actions
		setSelectedCountry: handleSetSelectedCountry,
		setSelectedState: handleSetSelectedState,
		setSelectedCity,

		// Utilities
		searchLocations,
		getLocationPath,
	};
}
