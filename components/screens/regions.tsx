// pages/regions.tsx\
"use client";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import {
	MapPin,
	Users,
	Building,
	Briefcase,
	GraduationCap,
	Rocket,
	Globe,
	TrendingUp,
	Award,
	Phone,
	Mail,
	ExternalLink,
	ChevronRight,
	Calendar,
	Clock,
	Target,
	Zap,
	CheckCircle,
	DollarSign,
	BarChart3,
	Star,
	ArrowRight,
	Handshake,
	BookOpen,
	Lightbulb,
	Heart,
} from "lucide-react";
import { regionsData, getRegionStats } from "@/lib/regionPageData";
import { RegionalData, RegionalProgram, SuccessStory } from "@/types";
import AnimatedSection from "../ui/AnimatedSection";
import LayoutWrapper from "../layouts/LayoutWrapper";
import Card from "../ui/NewCard";
import Button from "../ui/NewButton";

const RegionsPage: NextPage = () => {
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [activeTab, setActiveTab] = useState<string>("overview");
	const [selectedProgram, setSelectedProgram] = useState<string>("");
	const [hoveredRegion, setHoveredRegion] = useState<string>("");

	const regionalStats = getRegionStats();

	const getStatusColor = (status: "active" | "completed" | "planned"): string => {
		switch (status) {
			case "active":
				return "text-green-400 bg-green-400/10 border-green-400/20";
			case "completed":
				return "text-blue-400 bg-blue-400/10 border-blue-400/20";
			case "planned":
				return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
			default:
				return "text-gray-400 bg-gray-400/10 border-gray-400/20";
		}
	};

	const getStatusIcon = (status: "active" | "completed" | "planned"): React.ReactNode => {
		switch (status) {
			case "active":
				return <Zap className="w-4 h-4" />;
			case "completed":
				return <CheckCircle className="w-4 h-4" />;
			case "planned":
				return <Clock className="w-4 h-4" />;
			default:
				return null;
		}
	};

	const tabs = [
		{ id: "overview", label: "Overview", icon: <Globe className="w-4 h-4" /> },
		{ id: "programs", label: "Programs", icon: <Target className="w-4 h-4" /> },
		{ id: "stories", label: "Success Stories", icon: <Star className="w-4 h-4" /> },
		{ id: "leadership", label: "Leadership", icon: <Users className="w-4 h-4" /> },
		{ id: "opportunities", label: "Opportunities", icon: <TrendingUp className="w-4 h-4" /> },
	];

	const selectedRegionData = regionsData.find((region) => region.slug === selectedRegion);

	return (
		<LayoutWrapper>
			<div className="pt-20">
				{/* Hero Section */}
				<AnimatedSection className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
					<div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="mb-8">
							<div className="text-6xl mb-6">🌍</div>
							<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								JFAN Regional Network
							</h1>
							<p className="text-xl md:text-2xl text-yellow-400 mb-6">
								Connecting Talent Across Africa&apos;s Five Continental Regions
							</p>
							<p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto">
								From Cairo to Cape Town, Lagos to Nairobi - our regional network spans the entire
								African continent and global diaspora, creating opportunities and fostering
								professional growth everywhere Africans call home.
							</p>
						</motion.div>

						{/* Global Statistics */}
						<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
							{[
								{
									value: regionalStats.totalRegions.toString(),
									label: "Regional Hubs",
									icon: <MapPin className="w-6 h-6" />,
								},
								{ value: "55", label: "Countries", icon: <Globe className="w-6 h-6" /> },
								{
									value: regionalStats.totalMembers,
									label: "Active Members",
									icon: <Users className="w-6 h-6" />,
								},
								{
									value: regionalStats.totalCompanies,
									label: "Partner Companies",
									icon: <Building className="w-6 h-6" />,
								},
								{
									value: regionalStats.totalJobs,
									label: "Job Opportunities",
									icon: <Briefcase className="w-6 h-6" />,
								},
							].map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
									className="text-center">
									<div className="text-yellow-400 mb-2 flex justify-center">{stat.icon}</div>
									<div className="text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
									<div className="text-sm text-gray-300">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* Regional Overview */}
				<AnimatedSection className="py-20 bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								Explore Our Regional Network
							</h2>
							<p className="text-xl text-gray-300">
								Click on any region to discover opportunities, leadership, and success stories
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{regionsData.map((region: RegionalData, index: number) => (
								<Card
									key={region.slug}
									className={`cursor-pointer transition-all duration-300 ${
										selectedRegion === region.slug
											? "border-green-400 bg-gray-700 scale-105"
											: hoveredRegion === region.slug
											? "border-yellow-400 scale-102"
											: "hover:border-yellow-400"
									}`}
									onClick={() =>
										setSelectedRegion(selectedRegion === region.slug ? "" : region.slug)
									}
									onMouseEnter={() => setHoveredRegion(region.slug)}
									onMouseLeave={() => setHoveredRegion("")}>
									<div className="flex items-center space-x-4 mb-4">
										<div
											className="w-6 h-6 rounded-full flex-shrink-0"
											style={{ backgroundColor: region.color }}></div>
										<h3 className="text-xl font-bold text-white">{region.name}</h3>
									</div>

									<div className="mb-4">
										<p className="text-gray-400 mb-2">
											Headquarters:{" "}
											<span className="text-green-400">{region.headquarters}</span>
										</p>
										<p className="text-gray-400 mb-3">
											Est.{" "}
											<span className="text-yellow-400">
												{region.establishedYear}
											</span>
										</p>

										<div className="grid grid-cols-3 gap-2 text-center mb-4">
											<div>
												<div className="text-lg font-bold text-yellow-400">
													{region.stats.members}
												</div>
												<div className="text-xs text-gray-500">Members</div>
											</div>
											<div>
												<div className="text-lg font-bold text-green-400">
													{region.stats.companies}
												</div>
												<div className="text-xs text-gray-500">Companies</div>
											</div>
											<div>
												<div className="text-lg font-bold text-yellow-400">
													{region.stats.jobs}
												</div>
												<div className="text-xs text-gray-500">Jobs</div>
											</div>
										</div>

										<p className="text-gray-300 text-sm mb-4 line-clamp-3">
											{region.description}
										</p>
									</div>

									<div className="flex items-center justify-between text-sm text-gray-500">
										<div className="flex items-center">
											<MapPin className="w-4 h-4 mr-2" />
											<span>{region.countries.length} Countries</span>
										</div>
										<ChevronRight
											className={`w-4 h-4 transition-transform ${
												selectedRegion === region.slug ? "rotate-90" : ""
											}`}
										/>
									</div>
								</Card>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* Selected Region Details */}
				<AnimatePresence>
					{selectedRegion && selectedRegionData && (
						<motion.section
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="py-20 bg-gray-900">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								{/* Region Header */}
								<div className="text-center mb-12">
									<div className="flex justify-center items-center space-x-4 mb-6">
										<div
											className="w-8 h-8 rounded-full"
											style={{ backgroundColor: selectedRegionData.color }}></div>
										<h2 className="text-4xl font-bold text-green-400">
											{selectedRegionData.name}
										</h2>
									</div>
									<p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
										{selectedRegionData.description}
									</p>

									{/* Region Tabs */}
									<div className="flex flex-wrap justify-center gap-2 mb-8">
										{tabs.map((tab) => (
											<button
												key={tab.id}
												onClick={() => setActiveTab(tab.id)}
												className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
													activeTab === tab.id
														? "bg-green-400 text-gray-900"
														: "bg-gray-800 text-gray-300 hover:bg-gray-700"
												}`}>
												{tab.icon}
												<span>{tab.label}</span>
											</button>
										))}
									</div>
								</div>

								{/* Tab Content */}
								<AnimatePresence mode="wait">
									<motion.div
										key={activeTab}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3 }}>
										{activeTab === "overview" && (
											<div className="space-y-12">
												{/* Key Statistics */}
												<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
													<Card>
														<h3 className="text-lg font-bold mb-4 text-green-400">
															Regional Stats
														</h3>
														<div className="space-y-3">
															<div className="flex justify-between">
																<span className="text-gray-400">
																	Population:
																</span>
																<span className="text-white">
																	{
																		selectedRegionData.population
																	}
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-gray-400">
																	GDP:
																</span>
																<span className="text-white">
																	{
																		selectedRegionData.gdp
																	}
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-gray-400">
																	Countries:
																</span>
																<span className="text-white">
																	{
																		selectedRegionData
																			.countries
																			.length
																	}
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-gray-400">
																	Time Zones:
																</span>
																<span className="text-white">
																	{selectedRegionData.timeZones.join(
																		", "
																	)}
																</span>
															</div>
														</div>
													</Card>

													<Card>
														<h3 className="text-lg font-bold mb-4 text-green-400">
															Languages
														</h3>
														<div className="flex flex-wrap gap-2">
															{selectedRegionData.languages.map(
																(language, index) => (
																	<span
																		key={
																			index
																		}
																		className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
																		{
																			language
																		}
																	</span>
																)
															)}
														</div>
													</Card>

													<Card>
														<h3 className="text-lg font-bold mb-4 text-green-400">
															Key Industries
														</h3>
														<div className="flex flex-wrap gap-2">
															{selectedRegionData.keyIndustries.map(
																(industry, index) => (
																	<span
																		key={
																			index
																		}
																		className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-sm border border-green-400/20">
																		{
																			industry
																		}
																	</span>
																)
															)}
														</div>
													</Card>
												</div>

												{/* Countries */}
												<Card>
													<h3 className="text-xl font-bold mb-6 text-green-400">
														Countries in Region
													</h3>
													<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
														{selectedRegionData.countries.map(
															(country, index) => (
																<div
																	key={index}
																	className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
																	<div className="w-2 h-2 bg-green-400 rounded-full"></div>
																	<span className="text-gray-300 text-sm">
																		{
																			country
																		}
																	</span>
																</div>
															)
														)}
													</div>
												</Card>

												{/* Regional Office */}
												<Card>
													<h3 className="text-xl font-bold mb-6 text-green-400">
														Regional Office
													</h3>
													<div className="grid md:grid-cols-2 gap-6">
														<div>
															<div className="flex items-center space-x-3 mb-4">
																<MapPin className="w-5 h-5 text-yellow-400" />
																<div>
																	<div className="font-medium text-white">
																		{
																			selectedRegionData
																				.office
																				.city
																		}
																	</div>
																	<div className="text-sm text-gray-400">
																		{
																			selectedRegionData
																				.office
																				.address
																		}
																	</div>
																</div>
															</div>
															<div className="flex items-center space-x-3 mb-4">
																<Phone className="w-5 h-5 text-yellow-400" />
																<div className="text-gray-300">
																	{
																		selectedRegionData
																			.office
																			.phone
																	}
																</div>
															</div>
															<div className="flex items-center space-x-3">
																<Mail className="w-5 h-5 text-yellow-400" />
																<div className="text-gray-300">
																	{
																		selectedRegionData
																			.office
																			.email
																	}
																</div>
															</div>
														</div>
														<div className="space-y-4">
															<Button
																variant="ghost"
																className="w-full justify-start"
																icon={
																	<MapPin className="w-4 h-4" />
																}>
																View on Map
															</Button>
															<Button
																variant="ghost"
																className="w-full justify-start"
																icon={
																	<Mail className="w-4 h-4" />
																}>
																Contact Office
															</Button>
															<Button
																variant="ghost"
																className="w-full justify-start"
																icon={
																	<Calendar className="w-4 h-4" />
																}>
																Schedule Visit
															</Button>
														</div>
													</div>
												</Card>
											</div>
										)}

										{activeTab === "programs" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Regional Programs & Initiatives
													</h3>
													<p className="text-gray-300">
														Transformative programs driving
														development across{" "}
														{selectedRegionData.name}
													</p>
												</div>

												<div className="grid md:grid-cols-2 gap-6">
													{selectedRegionData.programs.map(
														(
															program: RegionalProgram,
															index: number
														) => (
															<Card
																key={program.id}
																className={`cursor-pointer transition-all duration-300 ${
																	selectedProgram ===
																	program.id
																		? "border-green-400 bg-gray-800"
																		: ""
																}`}
																onClick={() =>
																	setSelectedProgram(
																		selectedProgram ===
																			program.id
																			? ""
																			: program.id
																	)
																}>
																<div className="flex items-center justify-between mb-4">
																	<div
																		className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(
																			program.status
																		)}`}>
																		{getStatusIcon(
																			program.status
																		)}
																		<span className="capitalize">
																			{
																				program.status
																			}
																		</span>
																	</div>
																	{program.budget && (
																		<div className="flex items-center text-sm text-yellow-400">
																			<DollarSign className="w-4 h-4 mr-1" />
																			<span>
																				{
																					program.budget
																				}
																			</span>
																		</div>
																	)}
																</div>

																<h4 className="text-lg font-bold mb-3 text-green-400">
																	{
																		program.title
																	}
																</h4>
																<p className="text-gray-300 mb-4 text-sm">
																	{
																		program.description
																	}
																</p>

																<div className="flex flex-wrap gap-2 mb-4">
																	{program.focus.map(
																		(
																			focus: string,
																			fIndex: number
																		) => (
																			<span
																				key={
																					fIndex
																				}
																				className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
																				{
																					focus
																				}
																			</span>
																		)
																	)}
																</div>

																{program.beneficiaries && (
																	<div className="flex items-center text-sm text-green-400 mb-3">
																		<Users className="w-4 h-4 mr-2" />
																		<span>
																			{
																				program.beneficiaries
																			}
																		</span>
																	</div>
																)}

																<div className="flex items-center text-sm text-gray-500">
																	<Calendar className="w-4 h-4 mr-2" />
																	<span>
																		Started:{" "}
																		{new Date(
																			program.startDate
																		).toLocaleDateString()}
																	</span>
																</div>

																{selectedProgram ===
																	program.id &&
																	program.partners && (
																		<motion.div
																			initial={{
																				opacity: 0,
																				height: 0,
																			}}
																			animate={{
																				opacity: 1,
																				height: "auto",
																			}}
																			className="border-t border-gray-700 pt-4 mt-4">
																			<div className="text-sm text-gray-500 mb-2">
																				Key
																				Partners:
																			</div>
																			<div className="flex flex-wrap gap-2">
																				{program.partners.map(
																					(
																						partner: string,
																						pIndex: number
																					) => (
																						<span
																							key={
																								pIndex
																							}
																							className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
																							{
																								partner
																							}
																						</span>
																					)
																				)}
																			</div>
																		</motion.div>
																	)}
															</Card>
														)
													)}
												</div>

												{/* Future Goals */}
												<Card>
													<h3 className="text-xl font-bold mb-6 text-green-400">
														Future Goals & Vision
													</h3>
													<div className="grid md:grid-cols-2 gap-6">
														<div>
															<h4 className="text-lg font-semibold mb-4 text-yellow-400">
																Strategic Initiatives
															</h4>
															<ul className="space-y-3">
																{selectedRegionData.initiatives.map(
																	(
																		initiative: string,
																		index: number
																	) => (
																		<li
																			key={
																				index
																			}
																			className="flex items-start space-x-3">
																			<Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
																			<span className="text-gray-300 text-sm">
																				{
																					initiative
																				}
																			</span>
																		</li>
																	)
																)}
															</ul>
														</div>
														<div>
															<h4 className="text-lg font-semibold mb-4 text-yellow-400">
																2026 Goals
															</h4>
															<ul className="space-y-3">
																{selectedRegionData.futureGoals.map(
																	(
																		goal: string,
																		index: number
																	) => (
																		<li
																			key={
																				index
																			}
																			className="flex items-start space-x-3">
																			<Target className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
																			<span className="text-gray-300 text-sm">
																				{
																					goal
																				}
																			</span>
																		</li>
																	)
																)}
															</ul>
														</div>
													</div>
												</Card>
											</div>
										)}

										{activeTab === "stories" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Success Stories
													</h3>
													<p className="text-gray-300">
														Inspiring journeys of professionals
														who transformed their careers through
														JFAN
													</p>
												</div>

												<div className="grid md:grid-cols-2 gap-6">
													{selectedRegionData.successStories.map(
														(
															story: SuccessStory,
															index: number
														) => (
															<Card key={story.id}>
																<div className="flex items-start space-x-4 mb-4">
																	<div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg flex-shrink-0">
																		{story.name
																			.split(
																				" "
																			)
																			.map(
																				(
																					n
																				) =>
																					n[0]
																			)
																			.join(
																				""
																			)}
																	</div>
																	<div>
																		<h4 className="text-lg font-bold text-green-400">
																			{
																				story.name
																			}
																		</h4>
																		<p className="text-yellow-400 font-medium">
																			{
																				story.profession
																			}
																		</p>
																		<div className="flex items-center text-gray-400 text-sm">
																			<MapPin className="w-4 h-4 mr-1" />
																			<span>
																				{
																					story.country
																				}
																			</span>
																			<span className="mx-2">
																				•
																			</span>
																			<span>
																				{
																					story.year
																				}
																			</span>
																		</div>
																	</div>
																</div>

																<blockquote className="text-gray-300 italic mb-4 border-l-4 border-green-400 pl-4">
																	"{story.story}
																	"
																</blockquote>

																<div className="flex items-center text-sm text-green-400">
																	<Award className="w-4 h-4 mr-2" />
																	<span>
																		{
																			story.achievement
																		}
																	</span>
																</div>
															</Card>
														)
													)}
												</div>
											</div>
										)}

										{activeTab === "leadership" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Regional Leadership
													</h3>
													<p className="text-gray-300">
														Meet the visionary leader driving{" "}
														{selectedRegionData.name}'s growth and
														development
													</p>
												</div>

												<Card className="max-w-4xl mx-auto">
													<div className="grid md:grid-cols-3 gap-6">
														<div className="text-center">
															<div className="w-32 h-32 bg-gradient-to-br from-green-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-2xl mx-auto mb-4">
																{selectedRegionData.director.name
																	.split(" ")
																	.map(
																		(n) =>
																			n[0]
																	)
																	.join("")}
															</div>
															<h4 className="text-xl font-bold text-green-400 mb-2">
																{
																	selectedRegionData
																		.director
																		.name
																}
															</h4>
															<p className="text-yellow-400 font-medium mb-4">
																{
																	selectedRegionData
																		.director
																		.position
																}
															</p>
															<div className="flex flex-col space-y-2">
																<Button
																	variant="ghost"
																	size="sm"
																	icon={
																		<Mail className="w-4 h-4" />
																	}>
																	Email
																</Button>
																<Button
																	variant="ghost"
																	size="sm"
																	icon={
																		<ExternalLink className="w-4 h-4" />
																	}>
																	LinkedIn
																</Button>
															</div>
														</div>

														<div className="md:col-span-2 space-y-6">
															<div>
																<h5 className="text-lg font-semibold text-yellow-400 mb-3">
																	Biography
																</h5>
																<p className="text-gray-300">
																	{
																		selectedRegionData
																			.director
																			.bio
																	}
																</p>
															</div>

															<div>
																<h5 className="text-lg font-semibold text-yellow-400 mb-3">
																	Experience &
																	Education
																</h5>
																<div className="space-y-2">
																	<div className="flex items-center text-gray-300">
																		<Briefcase className="w-4 h-4 mr-2 text-green-400" />
																		<span>
																			{
																				selectedRegionData
																					.director
																					.experience
																			}
																		</span>
																	</div>
																	<div className="flex items-center text-gray-300">
																		<GraduationCap className="w-4 h-4 mr-2 text-green-400" />
																		<span>
																			{
																				selectedRegionData
																					.director
																					.education
																			}
																		</span>
																	</div>
																</div>
															</div>

															<div>
																<h5 className="text-lg font-semibold text-yellow-400 mb-3">
																	Key
																	Achievements
																</h5>
																<ul className="space-y-2">
																	{selectedRegionData.director.achievements.map(
																		(
																			achievement: string,
																			index: number
																		) => (
																			<li
																				key={
																					index
																				}
																				className="flex items-start space-x-2">
																				<Star className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
																				<span className="text-gray-300 text-sm">
																					{
																						achievement
																					}
																				</span>
																			</li>
																		)
																	)}
																</ul>
															</div>
														</div>
													</div>
												</Card>
											</div>
										)}

										{activeTab === "opportunities" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Regional Opportunities
													</h3>
													<p className="text-gray-300">
														Discover trending careers and emerging
														opportunities in{" "}
														{selectedRegionData.name}
													</p>
												</div>

												<div className="grid md:grid-cols-3 gap-6">
													<Card>
														<h4 className="text-lg font-bold mb-4 text-green-400 flex items-center">
															<TrendingUp className="w-5 h-5 mr-2" />
															Trending Now
														</h4>
														<div className="space-y-2">
															{selectedRegionData.opportunities.trending.map(
																(
																	opportunity: string,
																	index: number
																) => (
																	<div
																		key={
																			index
																		}
																		className="flex items-center space-x-2 p-2 bg-gray-800 rounded">
																		<div className="w-2 h-2 bg-green-400 rounded-full"></div>
																		<span className="text-gray-300 text-sm">
																			{
																				opportunity
																			}
																		</span>
																	</div>
																)
															)}
														</div>
													</Card>

													<Card>
														<h4 className="text-lg font-bold mb-4 text-yellow-400 flex items-center">
															<Rocket className="w-5 h-5 mr-2" />
															Emerging Fields
														</h4>
														<div className="space-y-2">
															{selectedRegionData.opportunities.emerging.map(
																(
																	opportunity: string,
																	index: number
																) => (
																	<div
																		key={
																			index
																		}
																		className="flex items-center space-x-2 p-2 bg-gray-800 rounded">
																		<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
																		<span className="text-gray-300 text-sm">
																			{
																				opportunity
																			}
																		</span>
																	</div>
																)
															)}
														</div>
													</Card>

													<Card>
														<h4 className="text-lg font-bold mb-4 text-red-400 flex items-center">
															<BarChart3 className="w-5 h-5 mr-2" />
															High Demand
														</h4>
														<div className="space-y-2">
															{selectedRegionData.opportunities.highDemand.map(
																(
																	opportunity: string,
																	index: number
																) => (
																	<div
																		key={
																			index
																		}
																		className="flex items-center space-x-2 p-2 bg-gray-800 rounded">
																		<div className="w-2 h-2 bg-red-400 rounded-full"></div>
																		<span className="text-gray-300 text-sm">
																			{
																				opportunity
																			}
																		</span>
																	</div>
																)
															)}
														</div>
													</Card>
												</div>

												{/* Challenges & Solutions */}
												<div className="grid md:grid-cols-2 gap-6">
													<Card>
														<h4 className="text-lg font-bold mb-4 text-red-400">
															Regional Challenges
														</h4>
														<ul className="space-y-3">
															{selectedRegionData.challenges.map(
																(
																	challenge: string,
																	index: number
																) => (
																	<li
																		key={
																			index
																		}
																		className="flex items-start space-x-3">
																		<div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
																		<span className="text-gray-300 text-sm">
																			{
																				challenge
																			}
																		</span>
																	</li>
																)
															)}
														</ul>
													</Card>

													<Card>
														<h4 className="text-lg font-bold mb-4 text-green-400">
															JFAN Solutions
														</h4>
														<ul className="space-y-3">
															{selectedRegionData.initiatives
																.slice(0, 4)
																.map(
																	(
																		initiative: string,
																		index: number
																	) => (
																		<li
																			key={
																				index
																			}
																			className="flex items-start space-x-3">
																			<CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
																			<span className="text-gray-300 text-sm">
																				{
																					initiative
																				}
																			</span>
																		</li>
																	)
																)}
														</ul>
													</Card>
												</div>

												{/* CTA */}
												<Card className="text-center">
													<h4 className="text-xl font-bold mb-4 text-green-400">
														Ready to Explore Opportunities?
													</h4>
													<p className="text-gray-300 mb-6">
														Join thousands of professionals
														already benefiting from{" "}
														{selectedRegionData.name}'s network
													</p>
													<div className="flex flex-col sm:flex-row gap-4 justify-center">
														<Button
															size="lg"
															href={`/register?region=${selectedRegionData.slug}`}
															icon={
																<ArrowRight className="w-5 h-5" />
															}>
															Join {selectedRegionData.name}
														</Button>
														<Button
															variant="secondary"
															size="lg"
															href={`/jobs?region=${selectedRegionData.slug}`}>
															Browse Jobs
														</Button>
													</div>
												</Card>
											</div>
										)}
									</motion.div>
								</AnimatePresence>
							</div>
						</motion.section>
					)}
				</AnimatePresence>

				{/* Call to Action */}
				<AnimatedSection className="py-20 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500">
					<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
						<h2 className="text-4xl font-bold mb-6 text-gray-900">Connect with Your Regional Network</h2>
						<p className="text-xl mb-8 text-gray-800">
							Whether you're in Lagos or London, Cairo or California - your regional JFAN network is ready
							to support your professional journey.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								variant="secondary"
								size="lg"
								href="/register"
								className="bg-gray-900 text-white hover:bg-gray-800"
								icon={<Users className="w-5 h-5" />}>
								Find Your Region
							</Button>
							<Button
								variant="ghost"
								size="lg"
								href="/contact"
								className="bg-gray-900 text-white hover:bg-gray-800"
								icon={<Handshake className="w-5 h-5" />}>
								Partner With Us
							</Button>
						</div>
					</div>
				</AnimatedSection>
			</div>
		</LayoutWrapper>
	);
};

export default RegionsPage;
