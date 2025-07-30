// components/sections/HeroSection.tsx
"use client";

import React, { useState } from "react";
import { Search, MapPin, Filter, Briefcase, TrendingUp, Users, Building, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SearchFilters {
	location: string;
	category: string;
	salary: string;
	type: string;
}

interface HeroSectionProps {
	onSearch?: (query: string, filters: SearchFilters) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState<SearchFilters>({
		location: "",
		category: "",
		salary: "",
		type: "",
	});
	const router = useRouter();

	const categories = [
		"Technology",
		"Finance",
		"Healthcare",
		"Education",
		"Marketing",
		"Sales",
		"Engineering",
		"Design",
		"Management",
		"Operations",
	];

	const locations = ["Nigeria", "Kenya", "South Africa", "Ghana", "Egypt", "Morocco", "Ethiopia", "Tanzania", "Uganda", "Rwanda"];

	const salaryRanges = ["$1,000 - $2,000", "$2,000 - $3,000", "$3,000 - $5,000", "$5,000 - $7,000", "$7,000 - $10,000", "$10,000+"];

	const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];

	const handleSearch = () => {
		if (onSearch) {
			onSearch(searchQuery, filters);
		} else {
			const params = new URLSearchParams();
			if (searchQuery) params.append("q", searchQuery);
			if (filters.location) params.append("location", filters.location);
			if (filters.category) params.append("category", filters.category);
			if (filters.salary) params.append("salary", filters.salary);
			if (filters.type) params.append("type", filters.type);

			router.push(`/jobs?${params.toString()}`);
		}
	};

	const popularSearches = [
		"Software Engineer",
		"Marketing Manager",
		"Data Analyst",
		"Project Manager",
		"Sales Representative",
		"Graphic Designer",
	];

	const stats = [
		{ icon: Briefcase, value: "10,000+", label: "Active Jobs", color: "text-emerald-600" },
		{ icon: Users, value: "50,000+", label: "Job Seekers", color: "text-blue-600" },
		{ icon: Building, value: "2,500+", label: "Companies", color: "text-orange-600" },
		{ icon: MapPin, value: "54", label: "Countries", color: "text-purple-600" },
	];

	return (
		<section className="relative bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-16 lg:py-24 overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200 to-transparent rounded-full opacity-20 blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200 to-transparent rounded-full opacity-20 blur-3xl" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100 to-orange-100 rounded-full opacity-10 blur-3xl" />
			</div>

			<div className="relative container mx-auto px-4">
				{/* Hero Content */}
				<div className="text-center mb-12 max-w-4xl mx-auto">
					<div className="flex justify-center mb-6">
						<Badge
							variant="secondary"
							className="bg-gradient-to-r from-emerald-100 to-orange-100 text-emerald-700 border-emerald-200">
							<Star className="w-3 h-3 mr-1" />
							Africa&apos;s #1 Job Platform
						</Badge>
					</div>

					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
						Discover Your Next Opportunity
						<span className="block bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent"></span>
					</h1>

					<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
						Connect with leading employers from Cape Town to Cairo. Find jobs that match your skills, aspirations,
						and cultural values across the African continent.
					</p>

					{/* Stats Cards */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
						{stats.map((stat, index) => {
							const Icon = stat.icon;
							return (
								<Card
									key={index}
									className="border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
									<CardContent className="p-4 text-center">
										<div
											className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm mb-3 ${stat.color}`}>
											<Icon className="w-6 h-6" />
										</div>
										<div className="text-2xl font-bold text-foreground mb-1">
											{stat.value}
										</div>
										<div className="text-sm text-muted-foreground">{stat.label}</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>

				{/* Search Section */}
				<div className="max-w-4xl mx-auto">
					<Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6 lg:p-8">
							{/* Main Search Bar */}
							<div className="flex flex-col lg:flex-row gap-4 mb-6">
								<div className="flex-1 relative">
									<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
									<Input
										type="text"
										placeholder="Job title, company, or keywords..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onKeyPress={(e) => e.key === "Enter" && handleSearch()}
										className="pl-12 h-14 text-lg border-none bg-muted/50 focus:bg-white transition-colors"
									/>
								</div>

								<div className="flex gap-3">
									<Collapsible open={showFilters} onOpenChange={setShowFilters}>
										<CollapsibleTrigger asChild>
											<Button
												variant={showFilters ? "default" : "outline"}
												size="lg"
												className={
													showFilters
														? "bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-orange-600"
														: ""
												}>
												<Filter className="w-5 h-5 mr-2" />
												Filters
											</Button>
										</CollapsibleTrigger>
									</Collapsible>

									<Button
										onClick={handleSearch}
										size="lg"
										className="bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-orange-600 px-8">
										Search Jobs
									</Button>
								</div>
							</div>

							{/* Advanced Filters */}
							<Collapsible open={showFilters} onOpenChange={setShowFilters}>
								<CollapsibleContent className="space-y-4">
									<div className="pt-6 border-t">
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
											<div className="space-y-2">
												<label className="text-sm font-medium text-foreground">
													Location
												</label>
												<Select
													value={filters.location}
													onValueChange={(value) =>
														setFilters((prev) => ({
															...prev,
															location: value,
														}))
													}>
													<SelectTrigger>
														<SelectValue placeholder="All Locations" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="">
															All Locations
														</SelectItem>
														{locations.map((location) => (
															<SelectItem
																key={location}
																value={location}>
																{location}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<label className="text-sm font-medium text-foreground">
													Category
												</label>
												<Select
													value={filters.category}
													onValueChange={(value) =>
														setFilters((prev) => ({
															...prev,
															category: value,
														}))
													}>
													<SelectTrigger>
														<SelectValue placeholder="All Categories" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="">
															All Categories
														</SelectItem>
														{categories.map((category) => (
															<SelectItem
																key={category}
																value={category}>
																{category}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<label className="text-sm font-medium text-foreground">
													Salary Range
												</label>
												<Select
													value={filters.salary}
													onValueChange={(value) =>
														setFilters((prev) => ({
															...prev,
															salary: value,
														}))
													}>
													<SelectTrigger>
														<SelectValue placeholder="Any Salary" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="">
															Any Salary
														</SelectItem>
														{salaryRanges.map((range) => (
															<SelectItem
																key={range}
																value={range}>
																{range}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<label className="text-sm font-medium text-foreground">
													Job Type
												</label>
												<Select
													value={filters.type}
													onValueChange={(value) =>
														setFilters((prev) => ({
															...prev,
															type: value,
														}))
													}>
													<SelectTrigger>
														<SelectValue placeholder="All Types" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="">
															All Types
														</SelectItem>
														{jobTypes.map((type) => (
															<SelectItem
																key={type}
																value={type}>
																{type}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
									</div>
								</CollapsibleContent>
							</Collapsible>

							{/* Popular Searches */}
							<div className="mt-6 pt-6 border-t">
								<div className="text-center">
									<p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
									<div className="flex flex-wrap justify-center gap-2">
										{popularSearches.map((search) => (
											<Button
												key={search}
												variant="ghost"
												size="sm"
												onClick={() => {
													setSearchQuery(search);
													handleSearch();
												}}
												className="text-xs hover:bg-gradient-to-r hover:from-emerald-50 hover:to-orange-50 hover:text-emerald-700">
												{search}
											</Button>
										))}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Trust Indicators */}
				<div className="mt-16 text-center">
					<p className="text-sm text-muted-foreground mb-6">Trusted by leading companies across Africa</p>
					<div className="flex justify-center items-center gap-8 opacity-60 grayscale">
						{/* You can replace these with actual company logos */}
						<div className="text-2xl font-bold">Safaricom</div>
						<div className="text-2xl font-bold">MTN</div>
						<div className="text-2xl font-bold">Jumia</div>
						<div className="text-2xl font-bold">Flutterwave</div>
						<div className="text-2xl font-bold">Andela</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
