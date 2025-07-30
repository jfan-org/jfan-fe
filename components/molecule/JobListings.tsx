// components/sections/JobListingsSection.tsx
"use client";

import React, { useState, useMemo } from "react";
import { MapPin, Clock, DollarSign, Building, Bookmark, ExternalLink, Filter, Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const jobCatalog = {
	economies: [
		{ id: 1, name: "Creative Economy" },
		{ id: 2, name: "Athletic Economy" },
		{ id: 3, name: "Entrepreneurial Economy" },
	],
	industries: [
		{ id: 101, economyId: 1, name: "Arts Industry" },
		{ id: 102, economyId: 1, name: "Science & Technology Industry" },
		{ id: 103, economyId: 1, name: "Artisanal Industry" },
		{ id: 104, economyId: 1, name: "Vocational Industry" },
		{ id: 105, economyId: 2, name: "Big Arena Sports Industry" },
		{ id: 106, economyId: 2, name: "Mental Sports Industry" },
		{ id: 107, economyId: 2, name: "Track & Field Sports Industry" },
		{ id: 108, economyId: 2, name: "Animal Sports Industry" },
		{ id: 109, economyId: 3, name: "Agricultural Entrepreneurs" },
		{ id: 110, economyId: 3, name: "Tourism and Hospitality" },
		{ id: 111, economyId: 3, name: "Manufacturing Entrepreneurs" },
		{ id: 112, economyId: 3, name: "Logistical Entrepreneurs" },
	],
	sectors: [
		{ id: 1001, industryId: 101, name: "Performing Arts Sector" },
		{ id: 1002, industryId: 101, name: "Visual Arts Sector" },
		{ id: 1007, industryId: 102, name: "Computer-based Works Sector" },
		{ id: 1008, industryId: 102, name: "Electrical Works Sector" },
		{ id: 1019, industryId: 105, name: "Big Arena Sports Sector" },
		{ id: 1029, industryId: 109, name: "Cultivation Sector" },
		{ id: 1035, industryId: 110, name: "Food & Beverage Sector" },
	],
};

interface Job {
	id: number;
	title: string;
	company: string;
	location: string;
	country: string;
	economyId: number;
	economyName: string;
	industryId: number;
	industryName: string;
	sectorId: number;
	sectorName: string;
	salary: string;
	type: string;
	posted: string;
	description: string;
	requirements: string[];
	logo?: string;
	featured?: boolean;
}

interface JobListingsSectionProps {
	jobs?: Job[];
	searchQuery?: string;
	onApply?: (jobId: number) => void;
	showFilters?: boolean;
}

// Sample job data following the new classification system
const sampleJobs: Job[] = [
	{
		id: 1,
		title: "Senior Software Engineer",
		company: "TechHub Lagos",
		location: "Lagos, Nigeria",
		country: "Nigeria",
		economyId: 1,
		economyName: "Creative Economy",
		industryId: 102,
		industryName: "Science & Technology Industry",
		sectorId: 1007,
		sectorName: "Computer-based Works Sector",
		salary: "$2,500 - $4,000",
		type: "Full-time",
		posted: "2 days ago",
		description:
			"Join our innovative team building the next generation of fintech solutions for Africa. We're looking for passionate developers who want to make a real impact on financial inclusion across the continent.",
		requirements: ["5+ years experience", "React/Node.js", "Remote-friendly", "Fintech experience preferred"],
		logo: "🚀",
		featured: true,
	},
	{
		id: 2,
		title: "Professional Footballer",
		company: "Lagos City FC",
		location: "Lagos, Nigeria",
		country: "Nigeria",
		economyId: 2,
		economyName: "Athletic Economy",
		industryId: 105,
		industryName: "Big Arena Sports Industry",
		sectorId: 1019,
		sectorName: "Big Arena Sports Sector",
		salary: "$1,200 - $3,000",
		type: "Contract",
		posted: "1 week ago",
		description:
			"Join one of Nigeria's premier football clubs. We're seeking talented players who can compete at the highest level and represent our club in national and international competitions.",
		requirements: ["Professional football experience", "Excellent physical fitness", "Team player", "Age 18-30"],
		logo: "⚽",
		featured: false,
	},
	{
		id: 3,
		title: "Agricultural Processing Manager",
		company: "Harvest Plus Nigeria",
		location: "Kaduna, Nigeria",
		country: "Nigeria",
		economyId: 3,
		economyName: "Entrepreneurial Economy",
		industryId: 109,
		industryName: "Agricultural Entrepreneurs",
		sectorId: 1031,
		sectorName: "Processing Sector",
		salary: "$1,800 - $2,800",
		type: "Full-time",
		posted: "3 days ago",
		description:
			"Lead agricultural processing operations for one of Nigeria's leading agro-processing companies. Oversee the transformation of raw agricultural products into market-ready goods while ensuring quality and efficiency.",
		requirements: ["Agricultural engineering degree", "5+ years processing experience", "Quality management", "Supply chain knowledge"],
		logo: "🌾",
		featured: true,
	},
	{
		id: 4,
		title: "Executive Chef",
		company: "Transcorp Hilton",
		location: "Abuja, Nigeria",
		country: "Nigeria",
		economyId: 3,
		economyName: "Entrepreneurial Economy",
		industryId: 110,
		industryName: "Tourism and Hospitality",
		sectorId: 1035,
		sectorName: "Food & Beverage Sector",
		salary: "$2,000 - $3,500",
		type: "Full-time",
		posted: "5 days ago",
		description:
			"Lead culinary operations at one of Nigeria's premier hotels. Create innovative menus that showcase both international cuisine and local Nigerian flavors while maintaining the highest standards.",
		requirements: ["Culinary degree/certification", "10+ years experience", "Hotel experience", "Team leadership"],
		logo: "👨‍🍳",
		featured: false,
	},
	{
		id: 5,
		title: "Digital Artist",
		company: "Nollywood Studios",
		location: "Lagos, Nigeria",
		country: "Nigeria",
		economyId: 1,
		economyName: "Creative Economy",
		industryId: 101,
		industryName: "Arts Industry",
		sectorId: 1002,
		sectorName: "Visual Arts Sector",
		salary: "$800 - $1,500",
		type: "Contract",
		posted: "1 day ago",
		description:
			"Create stunning visual effects and digital art for Nollywood film productions. Work with directors and producers to bring creative visions to life through cutting-edge digital artistry.",
		requirements: ["Digital art portfolio", "Adobe Creative Suite", "Film industry experience", "Creative vision"],
		logo: "🎨",
		featured: true,
	},
	{
		id: 6,
		title: "Electrical Engineer",
		company: "Nigeria Electricity Company",
		location: "Abuja, Nigeria",
		country: "Nigeria",
		economyId: 1,
		economyName: "Creative Economy",
		industryId: 102,
		industryName: "Science & Technology Industry",
		sectorId: 1008,
		sectorName: "Electrical Works Sector",
		salary: "$1,500 - $2,500",
		type: "Full-time",
		posted: "4 days ago",
		description:
			"Design and maintain electrical infrastructure for Nigeria's power grid. Contribute to improving electricity access and reliability across the country through innovative engineering solutions.",
		requirements: ["Electrical engineering degree", "Power systems knowledge", "Project management", "Safety certification"],
		logo: "⚡",
		featured: false,
	},
];

const JobListingsSection: React.FC<JobListingsSectionProps> = ({ jobs = sampleJobs, searchQuery = "", onApply, showFilters = true }) => {
	const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
	const [selectedEconomy, setSelectedEconomy] = useState("All");
	const [selectedIndustry, setSelectedIndustry] = useState("All");
	const [selectedSector, setSelectedSector] = useState("All");
	const [selectedCountry, setSelectedCountry] = useState("All");
	const [sortBy, setSortBy] = useState("newest");
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());

	// Get unique values for filters
	const economies = ["All", ...Array.from(new Set(jobs.map((job) => job.economyName)))];
	const industries = ["All", ...Array.from(new Set(jobs.map((job) => job.industryName)))];
	const sectors = ["All", ...Array.from(new Set(jobs.map((job) => job.sectorName)))];
	const countries = ["All", ...Array.from(new Set(jobs.map((job) => job.country)))];

	// Filter industries based on selected economy
	const availableIndustries = useMemo(() => {
		if (selectedEconomy === "All") return industries;
		const economyJobs = jobs.filter((job) => job.economyName === selectedEconomy);
		return ["All", ...Array.from(new Set(economyJobs.map((job) => job.industryName)))];
	}, [selectedEconomy, jobs, industries]);

	// Filter sectors based on selected industry
	const availableSectors = useMemo(() => {
		if (selectedIndustry === "All") return sectors;
		const industryJobs = jobs.filter((job) => job.industryName === selectedIndustry);
		return ["All", ...Array.from(new Set(industryJobs.map((job) => job.sectorName)))];
	}, [selectedIndustry, jobs, sectors]);

	const filteredJobs = useMemo(() => {
		const filtered = jobs.filter((job) => {
			const matchesSearch =
				job.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
				job.company.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
				job.location.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
				job.description.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
				job.economyName.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
				job.industryName.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
				job.sectorName.toLowerCase().includes(localSearchQuery.toLowerCase());

			const matchesEconomy = selectedEconomy === "All" || job.economyName === selectedEconomy;
			const matchesIndustry = selectedIndustry === "All" || job.industryName === selectedIndustry;
			const matchesSector = selectedSector === "All" || job.sectorName === selectedSector;
			const matchesCountry = selectedCountry === "All" || job.country === selectedCountry;

			return matchesSearch && matchesEconomy && matchesIndustry && matchesSector && matchesCountry;
		});

		// Sort jobs
		switch (sortBy) {
			case "newest":
				return filtered.sort((a, b) => {
					const aDate = new Date(a.posted.replace(" ago", ""));
					const bDate = new Date(b.posted.replace(" ago", ""));
					return bDate.getTime() - aDate.getTime();
				});
			case "salary":
				return filtered.sort((a, b) => {
					const aMax = parseInt(a.salary.split(" - $")[1]?.replace(",", "") || "0");
					const bMax = parseInt(b.salary.split(" - $")[1]?.replace(",", "") || "0");
					return bMax - aMax;
				});
			case "featured":
				return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
			default:
				return filtered;
		}
	}, [jobs, localSearchQuery, selectedEconomy, selectedIndustry, selectedSector, selectedCountry, sortBy]);

	const handleSaveJob = (jobId: number) => {
		setSavedJobs((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(jobId)) {
				newSet.delete(jobId);
			} else {
				newSet.add(jobId);
			}
			return newSet;
		});
	};

	const clearFilters = () => {
		setLocalSearchQuery("");
		setSelectedEconomy("All");
		setSelectedIndustry("All");
		setSelectedSector("All");
		setSelectedCountry("All");
	};

	// Reset dependent filters when parent changes
	const handleEconomyChange = (value: string) => {
		setSelectedEconomy(value);
		setSelectedIndustry("All");
		setSelectedSector("All");
	};

	const handleIndustryChange = (value: string) => {
		setSelectedIndustry(value);
		setSelectedSector("All");
	};

	return (
		<section className="py-16 bg-background">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
					<div>
						<h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
						<p className="text-muted-foreground">
							{filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
							{localSearchQuery && ` for "${localSearchQuery}"`}
						</p>
					</div>

					{showFilters && (
						<div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
							<div className="relative flex-1 lg:w-80">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									type="text"
									placeholder="Search jobs, companies, sectors..."
									value={localSearchQuery}
									onChange={(e) => setLocalSearchQuery(e.target.value)}
									className="pl-10"
								/>
							</div>
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="w-full sm:w-40">
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="newest">Newest First</SelectItem>
									<SelectItem value="salary">Highest Paid</SelectItem>
									<SelectItem value="featured">Featured First</SelectItem>
									<SelectItem value="relevant">Most Relevant</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}
				</div>

				{/* Hierarchical Filters */}
				{showFilters && (
					<Card className="mb-6">
						<CardContent className="p-4">
							<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
								<Select value={selectedEconomy} onValueChange={handleEconomyChange}>
									<SelectTrigger>
										<SelectValue placeholder="Economy" />
									</SelectTrigger>
									<SelectContent>
										{economies.map((economy) => (
											<SelectItem key={economy} value={economy}>
												{economy}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select
									value={selectedIndustry}
									onValueChange={handleIndustryChange}
									disabled={selectedEconomy === "All"}>
									<SelectTrigger>
										<SelectValue placeholder="Industry" />
									</SelectTrigger>
									<SelectContent>
										{availableIndustries.map((industry) => (
											<SelectItem key={industry} value={industry}>
												{industry}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select
									value={selectedSector}
									onValueChange={setSelectedSector}
									disabled={selectedIndustry === "All"}>
									<SelectTrigger>
										<SelectValue placeholder="Sector" />
									</SelectTrigger>
									<SelectContent>
										{availableSectors.map((sector) => (
											<SelectItem key={sector} value={sector}>
												{sector}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select value={selectedCountry} onValueChange={setSelectedCountry}>
									<SelectTrigger>
										<SelectValue placeholder="Country" />
									</SelectTrigger>
									<SelectContent>
										{countries.map((country) => (
											<SelectItem key={country} value={country}>
												{country}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Button variant="outline" onClick={clearFilters} className="w-full">
									<X className="w-4 h-4 mr-2" />
									Clear All
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Job Listings */}
				<div className="space-y-4">
					{filteredJobs.map((job) => (
						<Card
							key={job.id}
							className={`hover:shadow-lg transition-all duration-300 ${
								job.featured
									? "ring-2 ring-emerald-200 bg-gradient-to-r from-emerald-50/50 to-orange-50/50"
									: ""
							}`}>
							<CardContent className="p-6">
								<div className="flex items-start justify-between">
									<div className="flex items-start space-x-4 flex-1">
										<Avatar className="w-12 h-12">
											<AvatarFallback className="bg-gradient-to-r from-emerald-500 to-amber-400 text-white text-lg">
												{job.logo || job.company[0]}
											</AvatarFallback>
										</Avatar>

										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-2">
												<h3 className="text-xl font-bold text-foreground">
													{job.title}
												</h3>
												{job.featured && (
													<Badge className="bg-gradient-to-r from-emerald-500 to-amber-400 text-white">
														Featured
													</Badge>
												)}
											</div>

											<p className="text-lg font-medium text-muted-foreground mb-3">
												{job.company}
											</p>

											<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
												<div className="flex items-center gap-1">
													<MapPin className="w-4 h-4" />
													{job.location}
												</div>
												<div className="flex items-center gap-1">
													<DollarSign className="w-4 h-4" />
													{job.salary}
												</div>
												<div className="flex items-center gap-1">
													<Clock className="w-4 h-4" />
													{job.posted}
												</div>
												<div className="flex items-center gap-1">
													<Building className="w-4 h-4" />
													{job.type}
												</div>
											</div>

											<p className="text-muted-foreground mb-4 line-clamp-2">
												{job.description}
											</p>

											{/* Hierarchical categorization badges */}
											<div className="flex flex-wrap gap-2">
												<Badge variant="default" className="bg-emerald-600">
													{job.economyName}
												</Badge>
												<Badge variant="secondary">{job.industryName}</Badge>
												<Badge variant="outline">{job.sectorName}</Badge>
											</div>
										</div>
									</div>

									<div className="flex flex-col gap-2 ml-4">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleSaveJob(job.id)}
											className={savedJobs.has(job.id) ? "text-emerald-600" : ""}>
											<Bookmark
												className={`w-4 h-4 ${
													savedJobs.has(job.id) ? "fill-current" : ""
												}`}
											/>
										</Button>

										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="outline"
													onClick={() => setSelectedJob(job)}>
													View Details
												</Button>
											</DialogTrigger>
											<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
												<DialogHeader>
													<DialogTitle className="flex items-center gap-3">
														<Avatar className="w-12 h-12">
															<AvatarFallback className="bg-gradient-to-r from-emerald-500 to-amber-400 text-white">
																{job.logo ||
																	job
																		.company[0]}
															</AvatarFallback>
														</Avatar>
														<div>
															<h3 className="text-xl font-bold">
																{job.title}
															</h3>
															<p className="text-muted-foreground font-normal">
																{job.company}
															</p>
														</div>
													</DialogTitle>
												</DialogHeader>

												<div className="space-y-6">
													<div className="grid grid-cols-2 gap-4 text-sm">
														<div className="flex items-center gap-2">
															<MapPin className="w-4 h-4 text-muted-foreground" />
															<span>{job.location}</span>
														</div>
														<div className="flex items-center gap-2">
															<DollarSign className="w-4 h-4 text-muted-foreground" />
															<span>{job.salary}</span>
														</div>
														<div className="flex items-center gap-2">
															<Clock className="w-4 h-4 text-muted-foreground" />
															<span>{job.posted}</span>
														</div>
														<div className="flex items-center gap-2">
															<Building className="w-4 h-4 text-muted-foreground" />
															<span>{job.type}</span>
														</div>
													</div>

													<Separator />

													{/* Hierarchical Structure */}
													<div>
														<h4 className="font-semibold mb-3">
															Job Classification
														</h4>
														<div className="space-y-2">
															<div className="flex items-center gap-2 text-sm">
																<span className="font-medium">
																	Economy:
																</span>
																<Badge
																	variant="default"
																	className="bg-emerald-600">
																	{
																		job.economyName
																	}
																</Badge>
															</div>
															<div className="flex items-center gap-2 text-sm">
																<span className="font-medium">
																	Industry:
																</span>
																<Badge variant="secondary">
																	{
																		job.industryName
																	}
																</Badge>
															</div>
															<div className="flex items-center gap-2 text-sm">
																<span className="font-medium">
																	Sector:
																</span>
																<Badge variant="outline">
																	{
																		job.sectorName
																	}
																</Badge>
															</div>
														</div>
													</div>

													<div>
														<h4 className="font-semibold mb-3">
															Job Description
														</h4>
														<p className="text-muted-foreground leading-relaxed">
															{job.description}
														</p>
													</div>

													<div>
														<h4 className="font-semibold mb-3">
															Requirements
														</h4>
														<ul className="space-y-2">
															{job.requirements.map(
																(req, index) => (
																	<li
																		key={
																			index
																		}
																		className="flex items-start gap-2">
																		<div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
																		<span className="text-muted-foreground">
																			{
																				req
																			}
																		</span>
																	</li>
																)
															)}
														</ul>
													</div>

													<div className="flex gap-3 pt-4">
														<Button
															onClick={() =>
																onApply?.(job.id)
															}
															className="flex-1 bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-orange-600">
															Apply for this Job
														</Button>
														<Button
															variant="outline"
															onClick={() =>
																handleSaveJob(job.id)
															}
															className={
																savedJobs.has(job.id)
																	? "border-emerald-500 text-emerald-600"
																	: ""
															}>
															<Bookmark
																className={`w-4 h-4 mr-2 ${
																	savedJobs.has(
																		job.id
																	)
																		? "fill-current"
																		: ""
																}`}
															/>
															{savedJobs.has(job.id)
																? "Saved"
																: "Save Job"}
														</Button>
													</div>
												</div>
											</DialogContent>
										</Dialog>

										<Button
											onClick={() => onApply?.(job.id)}
											className="bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-orange-600">
											Apply Now
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* No Results */}
				{filteredJobs.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
								<Search className="w-12 h-12 text-muted-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-2">No jobs found</h3>
							<p className="text-muted-foreground mb-6">
								Try adjusting your search criteria or filters to find more opportunities
							</p>
							<Button onClick={clearFilters} className="bg-gradient-to-r from-emerald-500 to-amber-400">
								Clear All Filters
							</Button>
						</CardContent>
					</Card>
				)}

				{/* Load More Button */}
				{filteredJobs.length > 0 && (
					<div className="text-center mt-12">
						<Button variant="outline" size="lg">
							Load More Jobs
							<ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default JobListingsSection;
