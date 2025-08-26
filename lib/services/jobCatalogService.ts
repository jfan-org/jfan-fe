"use client";

import { Economy, Industry, Sector, Job, JobCatalogResponse } from "@/types/auth.types";
import { jobCatalog } from "@/lib/jobsCatalog";

// Cache configuration
const CACHE_KEY = "job_catalog_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedJobCatalog {
	data: JobCatalogResponse;
	timestamp: number;
}

class JobCatalogService {
	private cache: JobCatalogResponse | null = null;
	private lastFetch: number = 0;

	/**
	 * Get job catalog data with caching
	 */
	async getJobCatalog(): Promise<JobCatalogResponse> {
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

		// Fetch fresh data (for now, use local data, but this can be extended to API calls)
		const freshData = await this.fetchJobCatalog();

		// Cache the data
		this.setCachedData(freshData);
		this.cache = freshData;
		this.lastFetch = Date.now();

		return freshData;
	}

	/**
	 * Fetch job catalog from API or local source
	 */
	private async fetchJobCatalog(): Promise<JobCatalogResponse> {
		// For now, return local data
		// In the future, this can be replaced with an API call
		return {
			economies: jobCatalog.economies,
			industries: jobCatalog.industries,
			sectors: jobCatalog.sectors,
			jobs: jobCatalog.jobs,
		};
	}

	/**
	 * Get cached data from localStorage
	 */
	private getCachedData(): CachedJobCatalog | null {
		try {
			const cached = localStorage.getItem(CACHE_KEY);
			if (cached) {
				return JSON.parse(cached);
			}
		} catch (error) {
			console.warn("Failed to parse cached job catalog data:", error);
		}
		return null;
	}

	/**
	 * Set cached data in localStorage
	 */
	private setCachedData(data: JobCatalogResponse): void {
		try {
			const cacheData: CachedJobCatalog = {
				data,
				timestamp: Date.now(),
			};
			localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
		} catch (error) {
			console.warn("Failed to cache job catalog data:", error);
		}
	}

	/**
	 * Search jobs by name
	 */
	async searchJobs(query: string): Promise<Job[]> {
		const catalog = await this.getJobCatalog();
		const searchTerm = query.toLowerCase().trim();

		if (!searchTerm) {
			return catalog.jobs;
		}

		return catalog.jobs.filter((job) => job.name.toLowerCase().includes(searchTerm));
	}

	/**
	 * Get job by ID
	 */
	async getJobById(jobId: number): Promise<Job | null> {
		const catalog = await this.getJobCatalog();
		return catalog.jobs.find((job) => job.id === jobId) || null;
	}

	/**
	 * Get complete job path (economy -> industry -> sector -> job)
	 */
	async getJobPath(jobId: number): Promise<{
		economy: Economy;
		industry: Industry;
		sector: Sector;
		job: Job;
	} | null> {
		const catalog = await this.getJobCatalog();

		const job = catalog.jobs.find((j) => j.id === jobId);
		if (!job) return null;

		const sector = catalog.sectors.find((s) => s.id === job.sectorId);
		if (!sector) return null;

		const industry = catalog.industries.find((i) => i.id === sector.industryId);
		if (!industry) return null;

		const economy = catalog.economies.find((e) => e.id === industry.economyId);
		if (!economy) return null;

		return { economy, industry, sector, job };
	}

	/**
	 * Get jobs by economy ID
	 */
	async getJobsByEconomy(economyId: number): Promise<Job[]> {
		const catalog = await this.getJobCatalog();

		const economyIndustries = catalog.industries.filter((i) => i.economyId === economyId);
		const economySectors = catalog.sectors.filter((s) => economyIndustries.some((i) => i.id === s.industryId));

		return catalog.jobs.filter((j) => economySectors.some((s) => s.id === j.sectorId));
	}

	/**
	 * Get jobs by industry ID
	 */
	async getJobsByIndustry(industryId: number): Promise<Job[]> {
		const catalog = await this.getJobCatalog();

		const industrySectors = catalog.sectors.filter((s) => s.industryId === industryId);

		return catalog.jobs.filter((j) => industrySectors.some((s) => s.id === j.sectorId));
	}

	/**
	 * Get jobs by sector ID
	 */
	async getJobsBySector(sectorId: number): Promise<Job[]> {
		const catalog = await this.getJobCatalog();
		return catalog.jobs.filter((j) => j.sectorId === sectorId);
	}

	/**
	 * Get industries by economy ID
	 */
	async getIndustriesByEconomy(economyId: number): Promise<Industry[]> {
		const catalog = await this.getJobCatalog();
		return catalog.industries.filter((i) => i.economyId === economyId);
	}

	/**
	 * Get sectors by industry ID
	 */
	async getSectorsByIndustry(industryId: number): Promise<Sector[]> {
		const catalog = await this.getJobCatalog();
		return catalog.sectors.filter((s) => s.industryId === industryId);
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
			console.warn("Failed to clear job catalog cache:", error);
		}
	}

	/**
	 * Get popular jobs (most commonly selected)
	 */
	async getPopularJobs(limit: number = 10): Promise<Job[]> {
		const catalog = await this.getJobCatalog();

		// For now, return first N jobs
		// In the future, this could be based on actual selection statistics
		return catalog.jobs.slice(0, limit);
	}

	/**
	 * Get job recommendations based on skills or other criteria
	 */
	async getJobRecommendations(skills: string[], limit: number = 5): Promise<Job[]> {
		const catalog = await this.getJobCatalog();

		// Simple recommendation based on job name matching skills
		const skillsLower = skills.map((skill) => skill.toLowerCase());

		const matchingJobs = catalog.jobs.filter((job) => {
			const jobNameLower = job.name.toLowerCase();
			return skillsLower.some((skill) => jobNameLower.includes(skill) || skill.includes(jobNameLower));
		});

		return matchingJobs.slice(0, limit);
	}
}

// Export singleton instance
export const jobCatalogService = new JobCatalogService();

// Export utility functions
export const getJobPath = (jobId: number) => jobCatalogService.getJobPath(jobId);
export const searchJobs = (query: string) => jobCatalogService.searchJobs(query);
export const getJobById = (jobId: number) => jobCatalogService.getJobById(jobId);
export const getPopularJobs = (limit?: number) => jobCatalogService.getPopularJobs(limit);
export const getJobRecommendations = (skills: string[], limit?: number) => jobCatalogService.getJobRecommendations(skills, limit);
