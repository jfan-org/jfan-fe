"use client";

// pages/communities.tsx
import React, { useState } from "react";
import type { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import {
	Users,
	Trophy,
	Briefcase,
	Wrench,
	Heart,
	Calendar,
	MapPin,
	Clock,
	Play,
	Monitor,
	Gamepad2,
	Mic,
	Camera,
	Palette,
	Code,
	Lightbulb,
	TrendingUp,
	Award,
	Target,
	Zap,
	BookOpen,
	Download,
	Star,
	ArrowRight,
	ExternalLink,
	CheckCircle,
	Globe,
	Handshake,
	BarChart3,
	DollarSign,
	User,
} from "lucide-react";
import { communitiesData, getCommunityStats } from "@/lib/communitiesData";
import { CommunityData, CommunityEvent, CommunityLeader, CommunityResource, CommunitySuccessStory } from "@/types";
import LayoutWrapper from "../layouts/LayoutWrapper";
import AnimatedSection from "../ui/AnimatedSection";
import Card from "../ui/NewCard";
import Button from "../ui/NewButton";

const CommunitiesPage: NextPage = () => {
	const [selectedCommunity, setSelectedCommunity] = useState<string>("");
	const [activeTab, setActiveTab] = useState<string>("overview");
	const [selectedEvent, setSelectedEvent] = useState<string>("");
	const [hoveredCommunity, setHoveredCommunity] = useState<string>("");

	const communityStats = getCommunityStats();

	const getEventStatusColor = (status: "upcoming" | "ongoing" | "completed"): string => {
		switch (status) {
			case "upcoming":
				return "text-green-400 bg-green-400/10 border-green-400/20";
			case "ongoing":
				return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
			case "completed":
				return "text-gray-400 bg-gray-400/10 border-gray-400/20";
			default:
				return "text-gray-400 bg-gray-400/10 border-gray-400/20";
		}
	};

	const getEventTypeIcon = (type: string): React.ReactNode => {
		switch (type) {
			case "webinar":
				return <Monitor className="w-4 h-4" />;
			case "workshop":
				return <Wrench className="w-4 h-4" />;
			case "networking":
				return <Users className="w-4 h-4" />;
			case "conference":
				return <Mic className="w-4 h-4" />;
			case "hackathon":
				return <Code className="w-4 h-4" />;
			default:
				return <Calendar className="w-4 h-4" />;
		}
	};

	const getDifficultyColor = (difficulty: "beginner" | "intermediate" | "advanced"): string => {
		switch (difficulty) {
			case "beginner":
				return "text-green-400 bg-green-400/10";
			case "intermediate":
				return "text-yellow-400 bg-yellow-400/10";
			case "advanced":
				return "text-red-400 bg-red-400/10";
			default:
				return "text-gray-400 bg-gray-400/10";
		}
	};

	const tabs = [
		{ id: "overview", label: "Overview", icon: <Globe className="w-4 h-4" /> },
		{ id: "events", label: "Events", icon: <Calendar className="w-4 h-4" /> },
		{ id: "resources", label: "Resources", icon: <BookOpen className="w-4 h-4" /> },
		{ id: "leaders", label: "Leaders", icon: <Star className="w-4 h-4" /> },
		{ id: "stories", label: "Success Stories", icon: <Trophy className="w-4 h-4" /> },
	];

	const selectedCommunityData = communitiesData.find((community) => community.slug === selectedCommunity);

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
							<div className="text-6xl mb-6">🌟</div>
							<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								Professional Communities
							</h1>
							<p className="text-xl md:text-2xl text-yellow-400 mb-6">
								Connect, Collaborate, and Create Together
							</p>
							<p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto">
								Join vibrant communities of like-minded professionals across Africa's diverse
								industries. From athletes to artists, entrepreneurs to enablers - find your tribe and
								accelerate your professional journey.
							</p>
						</motion.div>

						{/* Community Statistics */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{[
								{
									value: communityStats.totalCommunities.toString(),
									label: "Communities",
									icon: <Heart className="w-6 h-6" />,
								},
								{
									value: communityStats.totalMembers,
									label: "Active Members",
									icon: <Users className="w-6 h-6" />,
								},
								{
									value: communityStats.totalProfessionals,
									label: "Professionals",
									icon: <Briefcase className="w-6 h-6" />,
								},
								{
									value: communityStats.totalEvents,
									label: "Annual Events",
									icon: <Calendar className="w-6 h-6" />,
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

				{/* Communities Overview */}
				<AnimatedSection className="py-20 bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								Discover Your Professional Community
							</h2>
							<p className="text-xl text-gray-300">
								Each community offers unique opportunities, resources, and connections tailored to
								your professional interests
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{communitiesData.map((community: CommunityData, index: number) => (
								<Card
									key={community.slug}
									className={`cursor-pointer transition-all duration-300 ${
										selectedCommunity === community.slug
											? "border-green-400 bg-gray-700 scale-105"
											: hoveredCommunity === community.slug
											? "border-yellow-400 scale-102"
											: "hover:border-yellow-400"
									}`}
									onClick={() =>
										setSelectedCommunity(
											selectedCommunity === community.slug ? "" : community.slug
										)
									}
									onMouseEnter={() => setHoveredCommunity(community.slug)}
									onMouseLeave={() => setHoveredCommunity("")}>
									<div className="text-center">
										<div className="text-5xl mb-4">{community.icon}</div>
										<h3
											className="text-xl font-bold mb-2"
											style={{ color: community.color }}>
											{community.name}
										</h3>
										<p className="text-sm font-medium text-yellow-400 mb-3">
											{community.tagline}
										</p>
										<p className="text-gray-300 text-sm mb-4 line-clamp-3">
											{community.description}
										</p>

										<div className="grid grid-cols-2 gap-3 mb-4 text-xs">
											<div className="text-center">
												<div className="font-bold text-green-400">
													{community.stats.members}
												</div>
												<div className="text-gray-500">Members</div>
											</div>
											<div className="text-center">
												<div className="font-bold text-yellow-400">
													{community.stats.jobs}
												</div>
												<div className="text-gray-500">Jobs</div>
											</div>
										</div>

										<div className="flex flex-wrap gap-1 mb-4">
											{community.keyAreas.slice(0, 3).map((area, aIndex) => (
												<span
													key={aIndex}
													className="px-2 py-1 bg-gray-900 text-gray-400 rounded text-xs">
													{area}
												</span>
											))}
											{community.keyAreas.length > 3 && (
												<span className="px-2 py-1 bg-gray-900 text-gray-400 rounded text-xs">
													+{community.keyAreas.length - 3} more
												</span>
											)}
										</div>

										<Button
											variant="ghost"
											size="sm"
											className="w-full"
											style={{
												borderColor: community.color,
												color: community.color,
											}}>
											Explore Community
										</Button>
									</div>
								</Card>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* Selected Community Details */}
				<AnimatePresence>
					{selectedCommunity && selectedCommunityData && (
						<motion.section
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="py-20 bg-gray-900">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								{/* Community Header */}
								<div className="text-center mb-12">
									<div className="flex justify-center items-center space-x-4 mb-6">
										<div className="text-6xl">{selectedCommunityData.icon}</div>
										<div>
											<h2
												className="text-4xl font-bold"
												style={{ color: selectedCommunityData.color }}>
												{selectedCommunityData.name}
											</h2>
											<p className="text-xl text-yellow-400">
												{selectedCommunityData.tagline}
											</p>
										</div>
									</div>
									<p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8">
										{selectedCommunityData.description}
									</p>

									{/* Community Tabs */}
									<div className="flex flex-wrap justify-center gap-2 mb-8">
										{tabs.map((tab) => (
											<button
												key={tab.id}
												onClick={() => setActiveTab(tab.id)}
												className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
													activeTab === tab.id
														? "text-gray-900"
														: "bg-gray-800 text-gray-300 hover:bg-gray-700"
												}`}
												style={{
													backgroundColor:
														activeTab === tab.id
															? selectedCommunityData.color
															: undefined,
												}}>
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
												{/* Community Stats */}
												<div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
													{Object.entries(
														selectedCommunityData.stats
													).map(([key, value], index) => (
														<Card
															key={key}
															className="text-center">
															<div
																className="text-2xl font-bold mb-2"
																style={{
																	color: selectedCommunityData.color,
																}}>
																{value}
															</div>
															<div className="text-sm text-gray-400 capitalize">
																{key
																	.replace(
																		/([A-Z])/g,
																		" $1"
																	)
																	.trim()}
															</div>
														</Card>
													))}
												</div>

												{/* Key Areas */}
												<Card>
													<h3 className="text-xl font-bold mb-6 text-green-400">
														Key Focus Areas
													</h3>
													<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
														{selectedCommunityData.keyAreas.map(
															(area, index) => (
																<div
																	key={index}
																	className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
																	<div
																		className="w-2 h-2 rounded-full"
																		style={{
																			backgroundColor:
																				selectedCommunityData.color,
																		}}></div>
																	<span className="text-gray-300 text-sm">
																		{area}
																	</span>
																</div>
															)
														)}
													</div>
												</Card>

												{/* Benefits & Requirements */}
												<div className="grid md:grid-cols-2 gap-8">
													<Card>
														<h3 className="text-xl font-bold mb-6 text-green-400">
															Member Benefits
														</h3>
														<ul className="space-y-3">
															{selectedCommunityData.benefits.map(
																(benefit, index) => (
																	<li
																		key={
																			index
																		}
																		className="flex items-start space-x-3">
																		<CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
																		<span className="text-gray-300 text-sm">
																			{
																				benefit
																			}
																		</span>
																	</li>
																)
															)}
														</ul>
													</Card>

													<Card>
														<h3 className="text-xl font-bold mb-6 text-yellow-400">
															Membership Requirements
														</h3>
														<ul className="space-y-3">
															{selectedCommunityData.requirements.map(
																(
																	requirement,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																		className="flex items-start space-x-3">
																		<Target className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
																		<span className="text-gray-300 text-sm">
																			{
																				requirement
																			}
																		</span>
																	</li>
																)
															)}
														</ul>
													</Card>
												</div>

												{/* Partnerships */}
												<Card>
													<h3 className="text-xl font-bold mb-6 text-green-400">
														Strategic Partnerships
													</h3>
													<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
														{selectedCommunityData.partnerships.map(
															(partner, index) => (
																<div
																	key={index}
																	className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
																	<Handshake className="w-5 h-5 text-yellow-400" />
																	<span className="text-gray-300 text-sm">
																		{
																			partner
																		}
																	</span>
																</div>
															)
														)}
													</div>
												</Card>
											</div>
										)}

										{activeTab === "events" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Community Events
													</h3>
													<p className="text-gray-300">
														Join upcoming events, workshops, and
														networking opportunities
													</p>
												</div>

												<div className="grid md:grid-cols-2 gap-6">
													{selectedCommunityData.events.map(
														(
															event: CommunityEvent,
															index: number
														) => (
															<Card
																key={event.id}
																className={`cursor-pointer transition-all duration-300 ${
																	selectedEvent ===
																	event.id
																		? "border-green-400 bg-gray-800"
																		: ""
																}`}
																onClick={() =>
																	setSelectedEvent(
																		selectedEvent ===
																			event.id
																			? ""
																			: event.id
																	)
																}>
																<div className="flex items-center justify-between mb-4">
																	<div
																		className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs border ${getEventStatusColor(
																			event.status
																		)}`}>
																		{getEventTypeIcon(
																			event.type
																		)}
																		<span className="capitalize">
																			{
																				event.type
																			}
																		</span>
																	</div>
																	<div
																		className={`px-2 py-1 rounded text-xs ${getEventStatusColor(
																			event.status
																		)}`}>
																		{
																			event.status
																		}
																	</div>
																</div>

																<h4 className="text-lg font-bold mb-3 text-green-400">
																	{event.title}
																</h4>
																<p className="text-gray-300 mb-4 text-sm">
																	{
																		event.description
																	}
																</p>

																<div className="space-y-2 mb-4 text-sm">
																	<div className="flex items-center text-gray-400">
																		<Calendar className="w-4 h-4 mr-2" />
																		<span>
																			{new Date(
																				event.date
																			).toLocaleDateString()}
																		</span>
																	</div>
																	<div className="flex items-center text-gray-400">
																		<Clock className="w-4 h-4 mr-2" />
																		<span>
																			{
																				event.time
																			}{" "}
																			(
																			{
																				event.duration
																			}

																			)
																		</span>
																	</div>
																	<div className="flex items-center text-gray-400">
																		<MapPin className="w-4 h-4 mr-2" />
																		<span className="capitalize">
																			{
																				event.location
																			}
																		</span>
																	</div>
																</div>

																{event.capacity &&
																	event.registered && (
																		<div className="mb-4">
																			<div className="flex justify-between text-sm text-gray-400 mb-1">
																				<span>
																					Registration
																				</span>
																				<span>
																					{
																						event.registered
																					}

																					/
																					{
																						event.capacity
																					}
																				</span>
																			</div>
																			<div className="w-full bg-gray-700 rounded-full h-2">
																				<div
																					className="h-2 rounded-full"
																					style={{
																						width: `${
																							(event.registered /
																								event.capacity) *
																							100
																						}%`,
																						backgroundColor:
																							selectedCommunityData.color,
																					}}></div>
																			</div>
																		</div>
																	)}

																<Button
																	variant="ghost"
																	size="sm"
																	className="w-full"
																	style={{
																		borderColor:
																			selectedCommunityData.color,
																		color: selectedCommunityData.color,
																	}}>
																	{event.status ===
																	"upcoming"
																		? "Register Now"
																		: "Learn More"}
																</Button>
															</Card>
														)
													)}
												</div>
											</div>
										)}

										{activeTab === "resources" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Community Resources
													</h3>
													<p className="text-gray-300">
														Access exclusive tools, guides, and
														learning materials
													</p>
												</div>

												<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
													{selectedCommunityData.resources.map(
														(
															resource: CommunityResource,
															index: number
														) => (
															<Card key={resource.id}>
																<div className="flex items-center justify-between mb-3">
																	<div className="flex items-center space-x-2">
																		<BookOpen
																			className="w-5 h-5"
																			style={{
																				color: selectedCommunityData.color,
																			}}
																		/>
																		<span className="text-sm font-medium text-gray-400 capitalize">
																			{
																				resource.type
																			}
																		</span>
																	</div>
																	<div
																		className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
																			resource.difficulty
																		)}`}>
																		{
																			resource.difficulty
																		}
																	</div>
																</div>

																<h4 className="text-lg font-bold mb-3 text-white">
																	{
																		resource.title
																	}
																</h4>
																<p className="text-gray-300 mb-4 text-sm">
																	{
																		resource.description
																	}
																</p>

																<div className="flex items-center justify-between mb-4 text-sm text-gray-400">
																	<div className="flex items-center">
																		<Download className="w-4 h-4 mr-1" />
																		<span>
																			{resource.downloadCount?.toLocaleString()}{" "}
																			downloads
																		</span>
																	</div>
																	{resource.rating && (
																		<div className="flex items-center">
																			<Star className="w-4 h-4 mr-1 text-yellow-400" />
																			<span>
																				{
																					resource.rating
																				}
																			</span>
																		</div>
																	)}
																</div>

																<Button
																	variant="ghost"
																	size="sm"
																	className="w-full"
																	style={{
																		borderColor:
																			selectedCommunityData.color,
																		color: selectedCommunityData.color,
																	}}
																	icon={
																		<Download className="w-4 h-4" />
																	}>
																	Download
																	Resource
																</Button>
															</Card>
														)
													)}
												</div>
											</div>
										)}

										{activeTab === "leaders" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Community Leaders
													</h3>
													<p className="text-gray-300">
														Meet the visionaries and experts
														leading our community
													</p>
												</div>

												<div className="grid md:grid-cols-2 gap-8">
													{selectedCommunityData.leaders.map(
														(
															leader: CommunityLeader,
															index: number
														) => (
															<Card key={leader.id}>
																<div className="flex items-start space-x-4 mb-6">
																	<div
																		className="w-20 h-20 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl flex-shrink-0"
																		style={{
																			backgroundColor:
																				selectedCommunityData.color,
																		}}>
																		{leader.name
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
																		<h4 className="text-xl font-bold text-green-400">
																			{
																				leader.name
																			}
																		</h4>
																		<p className="text-yellow-400 font-medium">
																			{
																				leader.position
																			}
																		</p>
																		<p className="text-gray-400 text-sm">
																			{
																				leader.company
																			}
																		</p>
																	</div>
																</div>

																<p className="text-gray-300 mb-4">
																	{leader.bio}
																</p>

																<div className="mb-4">
																	<h5 className="text-sm font-semibold text-yellow-400 mb-2">
																		Expertise:
																	</h5>
																	<div className="flex flex-wrap gap-2">
																		{leader.expertise.map(
																			(
																				skill,
																				sIndex
																			) => (
																				<span
																					key={
																						sIndex
																					}
																					className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
																					{
																						skill
																					}
																				</span>
																			)
																		)}
																	</div>
																</div>

																<div className="mb-6">
																	<h5 className="text-sm font-semibold text-yellow-400 mb-2">
																		Key
																		Achievements:
																	</h5>
																	<ul className="space-y-1">
																		{leader.achievements.map(
																			(
																				achievement,
																				aIndex
																			) => (
																				<li
																					key={
																						aIndex
																					}
																					className="flex items-start space-x-2">
																					<Star className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
																					<span className="text-gray-300 text-xs">
																						{
																							achievement
																						}
																					</span>
																				</li>
																			)
																		)}
																	</ul>
																</div>

																<div className="flex space-x-2">
																	<Button
																		variant="ghost"
																		size="sm"
																		className="flex-1"
																		style={{
																			borderColor:
																				selectedCommunityData.color,
																			color: selectedCommunityData.color,
																		}}
																		icon={
																			<User className="w-4 h-4" />
																		}>
																		View
																		Profile
																	</Button>
																	<Button
																		variant="ghost"
																		size="sm"
																		icon={
																			<ExternalLink className="w-4 h-4" />
																		}>
																		Connect
																	</Button>
																</div>
															</Card>
														)
													)}
												</div>
											</div>
										)}

										{activeTab === "stories" && (
											<div className="space-y-8">
												<div className="text-center mb-8">
													<h3 className="text-2xl font-bold mb-4 text-green-400">
														Success Stories
													</h3>
													<p className="text-gray-300">
														Inspiring journeys of community
														members who achieved remarkable
														success
													</p>
												</div>

												<div className="grid md:grid-cols-2 gap-8">
													{selectedCommunityData.successStories.map(
														(
															story: CommunitySuccessStory,
															index: number
														) => (
															<Card key={story.id}>
																<div className="flex items-start space-x-4 mb-4">
																	<div
																		className="w-16 h-16 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg flex-shrink-0"
																		style={{
																			backgroundColor:
																				selectedCommunityData.color,
																		}}>
																		{story.memberName
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
																				story.memberName
																			}
																		</h4>
																		<p className="text-yellow-400 font-medium">
																			{
																				story.profession
																			}
																		</p>
																		<p className="text-gray-400 text-sm">
																			{
																				story.company
																			}
																		</p>
																	</div>
																</div>

																<blockquote
																	className="text-gray-300 italic mb-4 border-l-4 pl-4"
																	style={{
																		borderColor:
																			selectedCommunityData.color,
																	}}>
																	{story.story}
																</blockquote>

																<div className="bg-gray-800 p-4 rounded-lg mb-4">
																	<h5 className="text-sm font-semibold text-yellow-400 mb-2">
																		Transformation:
																	</h5>
																	<div className="space-y-2 text-sm">
																		<div>
																			<span className="text-red-400">
																				Before:
																			</span>
																			<span className="text-gray-300 ml-2">
																				{
																					story
																						.beforeAfter
																						.before
																				}
																			</span>
																		</div>
																		<div>
																			<span className="text-green-400">
																				After:
																			</span>
																			<span className="text-gray-300 ml-2">
																				{
																					story
																						.beforeAfter
																						.after
																				}
																			</span>
																		</div>
																	</div>
																</div>

																<div className="flex items-center justify-between text-sm">
																	<div className="flex items-center text-green-400">
																		<Award className="w-4 h-4 mr-2" />
																		<span>
																			{
																				story.achievement
																			}
																		</span>
																	</div>
																	<span className="text-gray-500">
																		{
																			story.year
																		}
																	</span>
																</div>
															</Card>
														)
													)}
												</div>
											</div>
										)}
									</motion.div>
								</AnimatePresence>

								{/* Community CTA */}
								<Card className="text-center mt-12">
									<h4 className="text-2xl font-bold mb-4 text-green-400">
										Ready to Join {selectedCommunityData.name}?
									</h4>
									<p className="text-gray-300 mb-6">
										Connect with {selectedCommunityData.stats.members} professionals and
										accelerate your career
									</p>
									<div className="flex flex-col sm:flex-row gap-4 justify-center">
										<Button
											size="lg"
											href={`/register?community=${selectedCommunityData.slug}`}
											icon={<ArrowRight className="w-5 h-5" />}
											style={{ backgroundColor: selectedCommunityData.color }}
											className="text-gray-900 hover:opacity-90">
											Join {selectedCommunityData.name}
										</Button>
										<Button
											variant="secondary"
											size="lg"
											href={`/jobs?community=${selectedCommunityData.slug}`}>
											Browse Jobs
										</Button>
									</div>
								</Card>
							</div>
						</motion.section>
					)}
				</AnimatePresence>

				{/* All Communities CTA */}
				{!selectedCommunity && (
					<AnimatedSection className="py-20 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500">
						<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
							<h2 className="text-4xl font-bold mb-6 text-gray-900">Find Your Professional Tribe</h2>
							<p className="text-xl mb-8 text-gray-800">
								Join one or more communities that align with your interests and career goals. Your
								professional network awaits!
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									variant="secondary"
									size="lg"
									href="/register"
									className="bg-gray-900 text-white hover:bg-gray-800"
									icon={<Users className="w-5 h-5" />}>
									Join All Communities
								</Button>
								<Button
									variant="ghost"
									size="lg"
									href="/jobs"
									className="bg-gray-900 text-white hover:bg-gray-800"
									icon={<Briefcase className="w-5 h-5" />}>
									Explore All Jobs
								</Button>
							</div>
						</div>
					</AnimatedSection>
				)}
			</div>
		</LayoutWrapper>
	);
};

export default CommunitiesPage;
