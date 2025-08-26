"use client";

import { useState, useEffect, useMemo } from "react";
import { Economy, Industry, Sector, Job } from "@/types/auth.types";
import { jobCatalogService } from "@/lib/services/jobCatalogService";

interface UseJobSearchOptions {
	initialSearchTerm?: string;
	initialEconomyId?: number;
	initialIndustryId?: number;
	initialSectorId?: number;
}

interface UseJobSearchReturn {
	// Data
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
	filteredJobs: Job[];

	// Search state
	searchTerm: string;
	selectedEconomy: Economy | null;
	selectedIndustry: Industry | null;
	selectedSector: Sector | null;

	// Loading states
	isLoading: boolean;
	isSearching: boolean;

	// Actions
	setSearchTerm: (term: string) => void;
	setSelectedEconomy: (economy: Economy | null) => void;
	setSelectedIndustry: (industry: Industry | null) => void;
	setSelectedSector: (sector: Sector | null) => void;
	clearFilters: () => void;

	// Utilities
	getJobPath: (jobId: number) => Promise<any>;
	searchJobs: (query: string) => Promise<Job[]>;
}

export function useJobSearch(options: UseJobSearchOptions = {}): UseJobSearchReturn {
	const { initialSearchTerm = "", initialEconomyId, initialIndustryId, initialSectorId } = options;

	// State
	const [economies, setEconomies] = useState<Economy[]>([]);
	const [industries, setIndustries] = useState<Industry[]>([]);
	const [sectors, setSectors] = useState<Sector[]>([]);
	const [jobs, setJobs] = useState<Job[]>([]);

	const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
	const [selectedEconomy, setSelectedEconomy] = useState<Economy | null>(null);
	const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
	const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

	const [isLoading, setIsLoading] = useState(true);
	const [isSearching, setIsSearching] = useState(false);

	// Load initial data
	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				const catalog = await jobCatalogService.getJobCatalog();

				setEconomies(catalog.economies);
				setIndustries(catalog.industries);
				setSectors(catalog.sectors);
				setJobs(catalog.jobs);

				// Set initial selections if provided
				if (initialEconomyId) {
					const economy = catalog.economies.find((e) => e.id === initialEconomyId);
					setSelectedEconomy(economy || null);
				}

				if (initialIndustryId) {
					const industry = catalog.industries.find((i) => i.id === initialIndustryId);
					setSelectedIndustry(industry || null);
				}

				if (initialSectorId) {
					const sector = catalog.sectors.find((s) => s.id === initialSectorId);
					setSelectedSector(sector || null);
				}
			} catch (error) {
				console.error("Failed to load job catalog:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [initialEconomyId, initialIndustryId, initialSectorId]);

	// Available industries based on selected economy
	const availableIndustries = useMemo(() => {
		if (!selectedEconomy) return industries;
		return industries.filter((industry) => industry.economyId === selectedEconomy.id);
	}, [industries, selectedEconomy]);

	// Available sectors based on selected industry
	const availableSectors = useMemo(() => {
		if (!selectedIndustry) return sectors;
		return sectors.filter((sector) => sector.industryId === selectedIndustry.id);
	}, [sectors, selectedIndustry]);

	// Filtered jobs based on search and selections
	const filteredJobs = useMemo(() => {
		let filtered = jobs;

		// Filter by search term
		if (searchTerm.trim()) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter((job) => job.name.toLowerCase().includes(searchLower));
		}

		// Filter by hierarchy selections
		if (selectedSector) {
			filtered = filtered.filter((job) => job.sectorId === selectedSector.id);
		} else if (selectedIndustry) {
			const industrySectors = sectors.filter((s) => s.industryId === selectedIndustry.id);
			filtered = filtered.filter((job) => industrySectors.some((s) => s.id === job.sectorId));
		} else if (selectedEconomy) {
			const economyIndustries = industries.filter((i) => i.economyId === selectedEconomy.id);
			const economySectors = sectors.filter((s) => economyIndustries.some((i) => i.id === s.industryId));
			filtered = filtered.filter((job) => economySectors.some((s) => s.id === job.sectorId));
		}

		return filtered;
	}, [jobs, searchTerm, selectedEconomy, selectedIndustry, selectedSector, industries, sectors]);

	// Handle economy selection
	const handleSetSelectedEconomy = (economy: Economy | null) => {
		setSelectedEconomy(economy);
		setSelectedIndustry(null); // Clear dependent selections
		setSelectedSector(null);
	};

	// Handle industry selection
	const handleSetSelectedIndustry = (industry: Industry | null) => {
		setSelectedIndustry(industry);
		setSelectedSector(null); // Clear dependent selections
	};

	// Clear all filters
	const clearFilters = () => {
		setSearchTerm("");
		setSelectedEconomy(null);
		setSelectedIndustry(null);
		setSelectedSector(null);
	};

	// Search jobs with loading state
	const searchJobsWithLoading = async (query: string): Promise<Job[]> => {
		try {
			setIsSearching(true);
			return await jobCatalogService.searchJobs(query);
		} finally {
			setIsSearching(false);
		}
	};

	return {
		// Data
		economies,
		industries: availableIndustries,
		sectors: availableSectors,
		jobs,
		filteredJobs,

		// Search state
		searchTerm,
		selectedEconomy,
		selectedIndustry,
		selectedSector,

		// Loading states
		isLoading,
		isSearching,

		// Actions
		setSearchTerm,
		setSelectedEconomy: handleSetSelectedEconomy,
		setSelectedIndustry: handleSetSelectedIndustry,
		setSelectedSector,
		clearFilters,

		// Utilities
		getJobPath: jobCatalogService.getJobPath.bind(jobCatalogService),
		searchJobs: searchJobsWithLoading,
	};
}
