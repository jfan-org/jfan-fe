/**
 * Job Catalog Service
 *
 * Handles job catalog data fetching including economies, industries,
 * sectors, and jobs with hierarchical relationships and caching.
 */

import { api, ApiError } from "@/lib/api-client";
import { API_ENDPOINTS, Economy, Industry, Sector, Job, JobCatalogResponse, JobCatalogHierarchy } from "@/lib/api-types";

// Simple in-memory cache for job catalog data
class JobCatalogCache {
	private cache = new Map<string, { data: any; timestamp: number }>();
	private readonly TTL = 60 * 60 * 1000; // 1 hour (job catalog changes less frequently)

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

const jobCatalogCache = new JobCatalogCache();

export class JobCatalogService {
	/**
	 * Get complete job catalog data
	 */
	static async getJobCatalog(): Promise<JobCatalogResponse> {
		const cacheKey = "job-catalog";
		const cached = jobCatalogCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<JobCatalogResponse>(API_ENDPOINTS.JOB_CATALOG.ALL, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch job catalog", 400);
			}

			// Cache the result
			jobCatalogCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Job catalog request failed", 500);
		}
	}

	/**
	 * Get all economies
	 */
	static async getEconomies(): Promise<Economy[]> {
		const cacheKey = "economies";
		const cached = jobCatalogCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<Economy[]>(API_ENDPOINTS.JOB_CATALOG.ECONOMIES, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch economies", 400);
			}

			// Cache the result
			jobCatalogCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Economies request failed", 500);
		}
	}

	/**
	 * Get industries by economy ID
	 */
	static async getIndustriesByEconomy(economyId: number): Promise<Industry[]> {
		const cacheKey = `industries-${economyId}`;
		const cached = jobCatalogCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<Industry[]>(`${API_ENDPOINTS.JOB_CATALOG.INDUSTRIES}?economyId=${economyId}`, {
				requireAuth: false,
			});

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch industries", 400);
			}

			// Cache the result
			jobCatalogCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Industries request failed", 500);
		}
	}

	/**
	 * Get sectors by industry ID
	 */
	static async getSectorsByIndustry(industryId: number): Promise<Sector[]> {
		const cacheKey = `sectors-${industryId}`;
		const cached = jobCatalogCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<Sector[]>(`${API_ENDPOINTS.JOB_CATALOG.SECTORS}?industryId=${industryId}`, {
				requireAuth: false,
			});

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch sectors", 400);
			}

			// Cache the result
			jobCatalogCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Sectors request failed", 500);
		}
	}

	/**
	 * Get jobs by sector ID
	 */
	static async getJobsBySector(sectorId: number): Promise<Job[]> {
		const cacheKey = `jobs-${sectorId}`;
		const cached = jobCatalogCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			const response = await api.get<Job[]>(`${API_ENDPOINTS.JOB_CATALOG.JOBS}?sectorId=${sectorId}`, { requireAuth: false });

			if (!response.success || !response.data) {
				throw new ApiError("Failed to fetch jobs", 400);
			}

			// Cache the result
			jobCatalogCache.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Jobs request failed", 500);
		}
	}

	/**
	 * Get hierarchical job catalog structure
	 */
	static async getJobCatalogHierarchy(): Promise<JobCatalogHierarchy[]> {
		const cacheKey = "job-catalog-hierarchy";
		const cached = jobCatalogCache.get(cacheKey);

		if (cached) {
			return cached;
		}

		try {
			// Get all catalog data
			const catalog = await this.getJobCatalog();

			// Build hierarchical structure
			const hierarchy: JobCatalogHierarchy[] = catalog.economies.map((economy) => ({
				economy,
				industries: catalog.industries
					.filter((industry) => industry.economyId === economy.id)
					.map((industry) => ({
						industry,
						sectors: catalog.sectors
							.filter((sector) => sector.industryId === industry.id)
							.map((sector) => ({
								sector,
								jobs: catalog.jobs.filter((job) => job.sectorId === sector.id),
							})),
					})),
			}));

			// Cache the result
			jobCatalogCache.set(cacheKey, hierarchy);

			return hierarchy;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Job catalog hierarchy request failed", 500);
		}
	}

	/**
	 * Search jobs by query
	 */
	static async searchJobs(query: string): Promise<Job[]> {
		try {
			const catalog = await this.getJobCatalog();
			const searchTerm = query.toLowerCase();

			return catalog.jobs.filter(
				(job) => job.name.toLowerCase().includes(searchTerm) || job.description?.toLowerCase().includes(searchTerm)
			);
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Job search failed", 500);
		}
	}

	/**
	 * Get job by ID with full hierarchy context
	 */
	static async getJobWithContext(jobId: number): Promise<{
		job: Job;
		sector: Sector;
		industry: Industry;
		economy: Economy;
	} | null> {
		try {
			const catalog = await this.getJobCatalog();

			const job = catalog.jobs.find((j) => j.id === jobId);
			if (!job) return null;

			const sector = catalog.sectors.find((s) => s.id === job.sectorId);
			if (!sector) return null;

			const industry = catalog.industries.find((i) => i.id === sector.industryId);
			if (!industry) return null;

			const economy = catalog.economies.find((e) => e.id === industry.economyId);
			if (!economy) return null;

			return { job, sector, industry, economy };
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError("Job context request failed", 500);
		}
	}

	/**
	 * Clear job catalog cache
	 */
	static clearCache(): void {
		jobCatalogCache.clear();
	}
}

// Export convenience functions
export const jobCatalogService = {
	getJobCatalog: JobCatalogService.getJobCatalog,
	getEconomies: JobCatalogService.getEconomies,
	getIndustriesByEconomy: JobCatalogService.getIndustriesByEconomy,
	getSectorsByIndustry: JobCatalogService.getSectorsByIndustry,
	getJobsBySector: JobCatalogService.getJobsBySector,
	getJobCatalogHierarchy: JobCatalogService.getJobCatalogHierarchy,
	searchJobs: JobCatalogService.searchJobs,
	getJobWithContext: JobCatalogService.getJobWithContext,
	clearCache: JobCatalogService.clearCache,
};
