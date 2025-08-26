"use client";

import React, { useState, useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Search, Loader2, AlertCircle, Globe, Map, Navigation } from "lucide-react";

import { Country, State, City } from "@/types/auth.types";
import { useLocationData } from "@/hooks/useLocationData";

interface LocationSelectorProps {
	form: UseFormReturn<any>;
}

export function LocationSelector({ form }: LocationSelectorProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [showSearch, setShowSearch] = useState(false);

	const {
		countries,
		states,
		cities,
		selectedCountry,
		selectedState,
		selectedCity,
		isLoading,
		error,
		setSelectedCountry,
		setSelectedState,
		setSelectedCity,
		searchLocations,
	} = useLocationData();

	// Watch form values to sync with location hook
	const countryId = form.watch("countryId");
	const stateId = form.watch("stateId");
	const cityId = form.watch("cityId");

	// Sync form values with location hook
	useEffect(() => {
		if (countryId && countryId !== selectedCountry?.id) {
			const country = countries.find((c) => c.id === countryId);
			setSelectedCountry(country || null);
		}
	}, [countryId, countries, selectedCountry, setSelectedCountry]);

	useEffect(() => {
		if (stateId && stateId !== selectedState?.id) {
			const state = states.find((s) => s.id === stateId);
			setSelectedState(state || null);
		}
	}, [stateId, states, selectedState, setSelectedState]);

	useEffect(() => {
		if (cityId && cityId !== selectedCity?.id) {
			const city = cities.find((c) => c.id === cityId);
			setSelectedCity(city || null);
		}
	}, [cityId, cities, selectedCity, setSelectedCity]);

	// Handle country selection
	const handleCountryChange = (countryId: string) => {
		const country = countries.find((c) => c.id === countryId);
		setSelectedCountry(country || null);
		form.setValue("countryId", countryId);
		form.setValue("stateId", undefined);
		form.setValue("cityId", undefined);
		// Clear any existing errors and trigger validation
		form.clearErrors(["stateId", "cityId"]);
		form.trigger("countryId");
	};

	// Handle state selection
	const handleStateChange = (stateId: string) => {
		const state = states.find((s) => s.id === stateId);
		setSelectedState(state || null);
		form.setValue("stateId", stateId);
		form.setValue("cityId", undefined);
		// Clear any existing errors and trigger validation
		form.clearErrors("cityId");
		form.trigger("stateId");
	};

	// Handle city selection
	const handleCityChange = (cityId: string) => {
		const city = cities.find((c) => c.id === cityId);
		setSelectedCity(city || null);
		form.setValue("cityId", cityId);
		// Trigger validation to clear errors
		form.trigger("cityId");
	};

	// Search functionality
	const searchResults = useMemo(() => {
		if (!searchTerm.trim()) return [];
		return searchLocations(searchTerm);
	}, [searchTerm, searchLocations]);

	const handleSearchSelect = (result: any) => {
		if (result.type === "country") {
			handleCountryChange(result.id);
		} else if (result.type === "state") {
			const country = countries.find((c) => c.id === result.countryId);
			if (country) {
				setSelectedCountry(country);
				form.setValue("countryId", country.id);
				form.trigger("countryId");
			}
			handleStateChange(result.id);
		} else if (result.type === "city") {
			const state = states.find((s) => s.id === result.stateId);
			if (state) {
				const country = countries.find((c) => c.id === state.countryId);
				if (country) {
					setSelectedCountry(country);
					form.setValue("countryId", country.id);
					form.trigger("countryId");
				}
				setSelectedState(state);
				form.setValue("stateId", state.id);
				form.trigger("stateId");
			}
			handleCityChange(result.id);
		}
		setSearchTerm("");
		setShowSearch(false);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<Loader2 className="w-6 h-6 animate-spin text-green-400 mr-2" />
				<span className="text-gray-300">Loading location data...</span>
			</div>
		);
	}

	if (error) {
		return (
			<Alert className="border-red-500 bg-red-500/10">
				<AlertCircle className="h-4 w-4 text-red-500" />
				<AlertDescription className="text-red-400">{error}</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="space-y-4">
			{/* Search Toggle */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-gray-400">Select your location using the dropdowns below or search</p>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => setShowSearch(!showSearch)}
					className="text-gray-300 border-gray-600">
					<Search className="w-4 h-4 mr-2" />
					{showSearch ? "Hide" : "Show"} Search
				</Button>
			</div>

			{/* Search Interface */}
			{showSearch && (
				<div className="p-4 bg-gray-700 rounded-lg space-y-3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<Input
							type="text"
							placeholder="Search for country, state, or city..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
						/>
					</div>

					{/* Search Results */}
					{searchResults.length > 0 && (
						<div className="max-h-48 overflow-y-auto space-y-1">
							{searchResults.map((result, index) => (
								<div
									key={`${result.type}-${result.id}-${index}`}
									className="p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-600 transition-colors"
									onClick={() => handleSearchSelect(result)}>
									<div className="flex items-center space-x-2">
										{result.type === "country" && (
											<Globe className="w-4 h-4 text-blue-400" />
										)}
										{result.type === "state" && (
											<Map className="w-4 h-4 text-green-400" />
										)}
										{result.type === "city" && (
											<Navigation className="w-4 h-4 text-purple-400" />
										)}
										<div>
											<div className="text-white font-medium">{result.name}</div>
											<div className="text-xs text-gray-400">
												{result.type === "state" && `${result.countryName}`}
												{result.type === "city" &&
													`${result.stateName}, ${result.countryName}`}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					{searchTerm.trim() && searchResults.length === 0 && (
						<div className="text-center py-4 text-gray-400">
							<MapPin className="w-6 h-6 mx-auto mb-2 opacity-50" />
							<p>No locations found matching "{searchTerm}"</p>
						</div>
					)}
				</div>
			)}

			{/* Hierarchical Selectors */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Country Selection */}
				<FormField
					control={form.control}
					name="countryId"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300 flex items-center">
								<Globe className="w-4 h-4 mr-2" />
								Country *
							</FormLabel>
							<Select onValueChange={handleCountryChange} value={field.value || ""}>
								<FormControl>
									<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
										<SelectValue placeholder="Select country" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="bg-gray-800 border-gray-600 max-h-60">
									{countries.map((country) => (
										<SelectItem
											key={country.id}
											value={country.id}
											className="text-white hover:bg-gray-700">
											<div className="flex items-center">
												{country.flag && (
													<span className="mr-2">{country.flag}</span>
												)}
												{country.name}
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				{/* State Selection */}
				<FormField
					control={form.control}
					name="stateId"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300 flex items-center">
								<Map className="w-4 h-4 mr-2" />
								State/Province *
							</FormLabel>
							<Select onValueChange={handleStateChange} value={field.value || ""} disabled={!selectedCountry}>
								<FormControl>
									<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
										<SelectValue placeholder="Select state" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="bg-gray-800 border-gray-600 max-h-60">
									{states.map((state) => (
										<SelectItem
											key={state.id}
											value={state.id}
											className="text-white hover:bg-gray-700">
											{state.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				{/* City Selection */}
				<FormField
					control={form.control}
					name="cityId"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300 flex items-center">
								<Navigation className="w-4 h-4 mr-2" />
								City *
							</FormLabel>
							<Select onValueChange={handleCityChange} value={field.value || ""} disabled={!selectedState}>
								<FormControl>
									<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
										<SelectValue placeholder="Select city" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="bg-gray-800 border-gray-600 max-h-60">
									{cities.map((city) => (
										<SelectItem
											key={city.id}
											value={city.id}
											className="text-white hover:bg-gray-700">
											{city.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>
			</div>

			{/* Selected Location Display */}
			{(selectedCountry || selectedState || selectedCity) && (
				<div className="flex flex-wrap gap-2 p-3 bg-gray-700 rounded-lg">
					{selectedCountry && (
						<Badge variant="secondary" className="bg-blue-600 text-white">
							<Globe className="w-3 h-3 mr-1" />
							{selectedCountry.name}
						</Badge>
					)}
					{selectedState && (
						<Badge variant="secondary" className="bg-green-600 text-white">
							<Map className="w-3 h-3 mr-1" />
							{selectedState.name}
						</Badge>
					)}
					{selectedCity && (
						<Badge variant="secondary" className="bg-purple-600 text-white">
							<Navigation className="w-3 h-3 mr-1" />
							{selectedCity.name}
						</Badge>
					)}
				</div>
			)}
		</div>
	);
}
