"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, ChevronRight, Briefcase, Building, Target, Layers, Check, AlertCircle, Filter, RefreshCw, Loader2 } from "lucide-react";

import { Job } from "@/types/auth.types";
import { useJobSearch } from "@/hooks/useJobSearch";

interface JobSelectorProps {
	selectedJobId?: number;
	onJobSelect: (jobId: number) => void;
	error?: string;
}

export function JobSelector({ selectedJobId, onJobSelect, error }: JobSelectorProps) {
	const [showFilters, setShowFilters] = useState(false);
	const [selectedJobPath, setSelectedJobPath] = useState<any>(null);
	const [jobPathsMap, setJobPathsMap] = useState<Map<number, any>>(new Map());

	const {
		economies,
		industries,
		sectors,
		filteredJobs,
		searchTerm,
		selectedEconomy,
		selectedIndustry,
		selectedSector,
		isLoading,
		setSearchTerm,
		setSelectedEconomy,
		setSelectedIndustry,
		setSelectedSector,
		clearFilters,
		getJobPath,
	} = useJobSearch();

	// Pre-load job paths for filtered jobs to avoid individual API calls
	useEffect(() => {
		const loadJobPaths = async () => {
			if (filteredJobs.length === 0) return;

			const newJobPathsMap = new Map();
			
			// Use cached job catalog data instead of individual API calls
			try {
				const { jobCatalog } = await import("@/lib/jobsCatalog");

				filteredJobs.forEach((job) => {
					const sector = jobCatalog.sectors.find((s) => s.id === job.sectorId);
					if (!sector) return;

					const industry = jobCatalog.industries.find((i) => i.id === sector.industryId);
					if (!industry) return;

					const economy = jobCatalog.economies.find((e) => e.id === industry.economyId);
					if (!economy) return;

					newJobPathsMap.set(job.id, { economy, industry, sector, job });
				});

				setJobPathsMap(newJobPathsMap);
			} catch (error) {
				console.error("Failed to load job paths:", error);
			}
		};

		loadJobPaths();
	}, [filteredJobs]);

	// Get selected job details when selectedJobId changes
	useEffect(() => {
		if (selectedJobId && jobPathsMap.has(selectedJobId)) {
			setSelectedJobPath(jobPathsMap.get(selectedJobId));
		} else {
			setSelectedJobPath(null);
		}
	}, [selectedJobId, jobPathsMap]);

	const handleJobSelect = (job: Job) => {
		onJobSelect(job.id);
	};

	const hasActiveFilters = selectedEconomy || selectedIndustry || selectedSector || searchTerm.trim();

	if (isLoading) {
		return (
			<Card className="bg-gray-800 border-gray-700">
				<CardContent className="flex items-center justify-center py-8">
					<Loader2 className="w-6 h-6 animate-spin text-green-400 mr-2" />
					<span className="text-gray-300">Loading career options...</span>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			{/* Search and Filter Controls */}
			<Card className={`bg-gray-800 border-gray-700 ${error ? "border-red-500" : ""}`}>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-green-400 flex items-center">
							<Briefcase className="w-5 h-5 mr-2" />
							Select Your Career Path
						</CardTitle>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setShowFilters(!showFilters)}
							className="text-gray-300 border-gray-600">
							<Filter className="w-4 h-4 mr-2" />
							{showFilters ? "Hide" : "Show"} Filters
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Search */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<Input
							type="text"
							placeholder="Search for careers (e.g., Software Engineer, Doctor, Teacher)..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
						/>
					</div>

					{/* Hierarchical Filters */}
					{showFilters && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-700 rounded-lg">
							<div>
								<label className="text-sm text-gray-300 mb-2 block">Economy</label>
								<Select
									value={selectedEconomy?.id.toString() || ""}
									onValueChange={(value) => {
										const economy = economies.find((e) => e.id.toString() === value);
										setSelectedEconomy(economy || null);
									}}>
									<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
										<SelectValue placeholder="All Economies" />
									</SelectTrigger>
									<SelectContent className="bg-gray-800 border-gray-600">
										{economies.map((economy) => (
											<SelectItem
												key={economy.id}
												value={economy.id.toString()}
												className="text-white hover:bg-gray-700">
												<div className="flex items-center">
													<Building className="w-4 h-4 mr-2" />
													{economy.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className="text-sm text-gray-300 mb-2 block">Industry</label>
								<Select
									value={selectedIndustry?.id.toString() || ""}
									onValueChange={(value) => {
										const industry = industries.find((i) => i.id.toString() === value);
										setSelectedIndustry(industry || null);
									}}
									disabled={!selectedEconomy}>
									<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
										<SelectValue placeholder="All Industries" />
									</SelectTrigger>
									<SelectContent className="bg-gray-800 border-gray-600">
										{industries.map((industry) => (
											<SelectItem
												key={industry.id}
												value={industry.id.toString()}
												className="text-white hover:bg-gray-700">
												<div className="flex items-center">
													<Layers className="w-4 h-4 mr-2" />
													{industry.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className="text-sm text-gray-300 mb-2 block">Sector</label>
								<Select
									value={selectedSector?.id.toString() || ""}
									onValueChange={(value) => {
										const sector = sectors.find((s) => s.id.toString() === value);
										setSelectedSector(sector || null);
									}}
									disabled={!selectedIndustry}>
									<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
										<SelectValue placeholder="All Sectors" />
									</SelectTrigger>
									<SelectContent className="bg-gray-800 border-gray-600">
										{sectors.map((sector) => (
											<SelectItem
												key={sector.id}
												value={sector.id.toString()}
												className="text-white hover:bg-gray-700">
												<div className="flex items-center">
													<Target className="w-4 h-4 mr-2" />
													{sector.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					)}

					{/* Active Filters Display */}
					{hasActiveFilters && (
						<div className="flex items-center justify-between">
							<div className="flex flex-wrap gap-2">
								{selectedEconomy && (
									<Badge variant="secondary" className="bg-blue-600 text-white">
										Economy: {selectedEconomy.name}
									</Badge>
								)}
								{selectedIndustry && (
									<Badge variant="secondary" className="bg-green-600 text-white">
										Industry: {selectedIndustry.name}
									</Badge>
								)}
								{selectedSector && (
									<Badge variant="secondary" className="bg-purple-600 text-white">
										Sector: {selectedSector.name}
									</Badge>
								)}
								{searchTerm && (
									<Badge variant="secondary" className="bg-orange-600 text-white">
										Search: "{searchTerm}"
									</Badge>
								)}
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={clearFilters}
								className="text-gray-300 border-gray-600">
								<RefreshCw className="w-4 h-4 mr-2" />
								Clear All
							</Button>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Jobs List */}
			<Card className="bg-gray-800 border-gray-700">
				<CardHeader>
					<CardTitle className="text-white">
						Available Careers ({filteredJobs.length} {filteredJobs.length === 1 ? "result" : "results"})
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2 max-h-96 overflow-y-auto">
						{filteredJobs.length === 0 ? (
							<div className="text-center py-8 text-gray-400">
								<Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
								<p>No careers found matching your criteria.</p>
								<p className="text-sm mt-1">Try adjusting your search or filters.</p>
							</div>
						) : (
							filteredJobs.map((job) => {
								const isSelected = selectedJobId === job.id;
								const jobPath = jobPathsMap.get(job.id);

								return (
									<JobCard
										key={job.id}
										job={job}
										jobPath={jobPath}
										isSelected={isSelected}
										onSelect={() => handleJobSelect(job)}
									/>
								);
							})
						)}
					</div>
				</CardContent>
			</Card>

			{/* Selected Job Summary */}
			{selectedJobPath && (
				<Card className="bg-green-400/10 border-green-400/20">
					<CardHeader>
						<CardTitle className="text-green-400 text-sm flex items-center">
							<Check className="w-4 h-4 mr-2" />
							Selected Career Path
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex items-center text-sm">
								<Building className="w-4 h-4 mr-2 text-blue-400" />
								<span className="text-gray-300">Economy:</span>
								<span className="text-blue-400 ml-2">{selectedJobPath.economy.name}</span>
							</div>
							<div className="flex items-center text-sm">
								<Layers className="w-4 h-4 mr-2 text-green-400" />
								<span className="text-gray-300">Industry:</span>
								<span className="text-green-400 ml-2">{selectedJobPath.industry.name}</span>
							</div>
							<div className="flex items-center text-sm">
								<Target className="w-4 h-4 mr-2 text-purple-400" />
								<span className="text-gray-300">Sector:</span>
								<span className="text-purple-400 ml-2">{selectedJobPath.sector.name}</span>
							</div>
							<div className="flex items-center text-sm">
								<Briefcase className="w-4 h-4 mr-2 text-white" />
								<span className="text-gray-300">Career:</span>
								<span className="text-white font-medium ml-2">{selectedJobPath.job.name}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Error Display */}
			{error && (
				<Alert className="border-red-500 bg-red-500/10">
					<AlertCircle className="h-4 w-4 text-red-500" />
					<AlertDescription className="text-red-400">{error}</AlertDescription>
				</Alert>
			)}
		</div>
	);
}

// Job Card Component
interface JobCardProps {
	job: Job;
	jobPath?: any;
	isSelected: boolean;
	onSelect: () => void;
}

function JobCard({ job, jobPath, isSelected, onSelect }: JobCardProps) {
	if (!jobPath) {
		return (
			<div className="p-4 rounded-lg border bg-gray-700 border-gray-600">
				<div className="flex items-center">
					<Loader2 className="w-4 h-4 animate-spin text-gray-400 mr-2" />
					<span className="text-gray-400">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
				isSelected
					? "bg-green-400/10 border-green-400/40 ring-1 ring-green-400/20"
					: "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500"
			}`}
			onClick={onSelect}>
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<h4 className="font-medium text-white mb-2">{job.name}</h4>
					<div className="flex items-center text-sm text-gray-400 space-x-2">
						<span className="text-blue-400">{jobPath.economy.name}</span>
						<ChevronRight className="w-3 h-3" />
						<span className="text-green-400">{jobPath.industry.name}</span>
						<ChevronRight className="w-3 h-3" />
						<span className="text-purple-400">{jobPath.sector.name}</span>
					</div>
				</div>
				{isSelected && (
					<div className="ml-4">
						<Check className="w-5 h-5 text-green-400" />
					</div>
				)}
			</div>
		</div>
	);
}
