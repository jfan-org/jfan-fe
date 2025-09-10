// pages/about.tsx
"use client";
import React, { useState } from "react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import {
	Target,
	Globe,
	Users,
	Award,
	TrendingUp,
	Shield,
	Heart,
	Lightbulb,
	Mail,
	ArrowRight,
	CheckCircle,
	Clock,
	Calendar,
	MapPin,
	ExternalLink,
	Building,
	Handshake,
	ChevronRight,
	Star,
	Zap,
} from "lucide-react";
import { aboutStatistics, coreValues, partnerships, teamMembers, milestones, initiatives } from "@/lib/aboutPageData";
import { Statistic, CoreValue, Partnership, TeamMember, Milestone, Initiative } from "@/types";
import AnimatedSection from "../ui/AnimatedSection";
import LayoutWrapper from "../layouts/LayoutWrapper";
import Button from "../ui/NewButton";
import Card from "../ui/NewCard";

const AboutPage: NextPage = () => {
	const [activeValueIndex, setActiveValueIndex] = useState<number>(0);
	const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);

	const getStatusColor = (status: Initiative["status"]): string => {
		switch (status) {
			case "active":
				return "text-green-400 bg-green-400/10";
			case "completed":
				return "text-blue-400 bg-blue-400/10";
			case "planned":
				return "text-yellow-400 bg-yellow-400/10";
			default:
				return "text-gray-400 bg-gray-400/10";
		}
	};

	const getStatusIcon = (status: Initiative["status"]): React.ReactNode => {
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

	return (
		<LayoutWrapper>
			<div className="pt-16 sm:pt-20">
				{/* Hero Section */}
				<AnimatedSection className="py-12 md:py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
					<div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="mb-6 md:mb-8">
							<div className="text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-6">🌍</div>
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent px-4">
								About JFAN
							</h1>
							<p className="text-lg sm:text-xl md:text-2xl text-yellow-400 mb-4 md:mb-6">Jobs For Africa Now</p>
							<p className="text-base sm:text-lg text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
								Transforming Africa's professional landscape through innovative technology, strategic
								partnerships, and unwavering commitment to excellence. We are the continent's premier
								platform connecting talent with opportunity.
							</p>
						</motion.div>

						<div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
							<Button size="lg" href="/register" icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />} className="w-full sm:w-auto">
								Join Our Mission
							</Button>
							<Button variant="secondary" size="lg" href="/contact" className="w-full sm:w-auto">
								Partner With Us
							</Button>
						</div>

						{/* Key Statistics */}
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
							{aboutStatistics.map((stat: Statistic, index: number) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
									className="text-center">
									<div className="text-yellow-400 mb-1.5 md:mb-2 flex justify-center">{stat.icon}</div>
									<div className="text-xl sm:text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
									<div className="text-xs sm:text-sm font-medium text-white mb-1">{stat.label}</div>
									<div className="text-xs text-gray-400 leading-tight">{stat.description}</div>
								</motion.div>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* Mission, Vision, Impact */}
				<AnimatedSection className="py-20 bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid lg:grid-cols-3 gap-8 mb-16">
							<Card className="text-center" hover={true}>
								<Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
								<h3 className="text-2xl font-bold mb-4 text-green-400">Our Mission</h3>
								<p className="text-gray-300">
									To create a unified platform that showcases Africa's diverse talents,
									facilitates meaningful connections, and drives economic empowerment across all
									55 African nations and diaspora communities worldwide.
								</p>
							</Card>

							<Card className="text-center" hover={true}>
								<Globe className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
								<h3 className="text-2xl font-bold mb-4 text-green-400">Our Vision</h3>
								<p className="text-gray-300">
									To become the premier gateway for African talent, fostering innovation,
									entrepreneurship, and professional excellence while bridging local expertise
									with global opportunities and sustainable development.
								</p>
							</Card>

							<Card className="text-center" hover={true}>
								<Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
								<h3 className="text-2xl font-bold mb-4 text-green-400">Our Impact</h3>
								<p className="text-gray-300">
									Connecting millions of professionals, creating thousands of opportunities, and
									building a stronger, more prosperous Africa through the power of
									collaboration, technology, and strategic partnerships.
								</p>
							</Card>
						</div>
					</div>
				</AnimatedSection>

				{/* Core Values */}
				<AnimatedSection className="py-20 bg-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								Our Core Values
							</h2>
							<p className="text-xl text-gray-300">
								The principles that guide every decision and action we take
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{coreValues.map((value: CoreValue, index: number) => (
								<Card
									key={index}
									className={`cursor-pointer transition-all duration-300 ${
										activeValueIndex === index ? "border-green-400 bg-gray-800" : ""
									}`}
									onClick={() => setActiveValueIndex(index)}
									hover={true}>
									<div className="text-yellow-400 mb-4">{value.icon}</div>
									<h3 className="text-xl font-bold mb-3 text-green-400">{value.title}</h3>
									<p className="text-gray-300 mb-4">{value.description}</p>

									{activeValueIndex === index && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											className="border-t border-gray-700 pt-4">
											<h4 className="text-sm font-semibold text-yellow-400 mb-2">
												Key Principles:
											</h4>
											<ul className="space-y-1">
												{value.principles.map(
													(principle: string, pIndex: number) => (
														<li
															key={pIndex}
															className="flex items-center text-sm text-gray-400">
															<div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
															{principle}
														</li>
													)
												)}
											</ul>
										</motion.div>
									)}
								</Card>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* JFAN Story & Milestones */}
				<AnimatedSection className="py-20 bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								Our Journey
							</h2>
							<p className="text-xl text-gray-300 max-w-3xl mx-auto">
								From a vision to transform Africa's professional landscape to becoming the continent's
								leading talent network - here's our story.
							</p>
						</div>

						<div className="relative">
							{/* Timeline line */}
							<div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-yellow-400"></div>

							<div className="space-y-12">
								{milestones.map((milestone: Milestone, index: number) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.2 }}
										className={`flex items-center ${
											index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
										}`}>
										{/* Timeline dot */}
										<div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-gray-800"></div>

										{/* Content */}
										<div
											className={`ml-12 md:ml-0 md:w-1/2 ${
												index % 2 === 0 ? "md:pr-12" : "md:pl-12"
											}`}>
											<Card>
												<div className="flex items-center mb-3">
													<Calendar className="w-5 h-5 text-green-400 mr-2" />
													<span className="text-xl font-bold text-yellow-400">
														{milestone.year}
													</span>
												</div>
												<h3 className="text-xl font-bold mb-3 text-white">
													{milestone.title}
												</h3>
												<p className="text-gray-300 mb-3">
													{milestone.description}
												</p>
												{milestone.impact && (
													<div className="flex items-center text-sm text-green-400">
														<TrendingUp className="w-4 h-4 mr-2" />
														<span>{milestone.impact}</span>
													</div>
												)}
											</Card>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</AnimatedSection>

				{/* Regional Leadership */}
				<AnimatedSection className="py-20 bg-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								Regional Leadership
							</h2>
							<p className="text-xl text-gray-300">
								Meet the dedicated leaders driving JFAN&apos;s mission across Africa and the diaspora
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{teamMembers.map((member: TeamMember, index: number) => (
								<Card
									key={member.id}
									className={`cursor-pointer transition-all duration-300 ${
										selectedTeamMember === member.id ? "border-green-400 bg-gray-800" : ""
									}`}
									onClick={() =>
										setSelectedTeamMember(
											selectedTeamMember === member.id ? null : member.id
										)
									}
									hover={true}>
									<div className="text-center">
										<div className="w-20 h-20 bg-gradient-to-br from-green-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mx-auto mb-4">
											{member.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</div>
										<h3 className="text-lg font-bold mb-2 text-green-400">
											{member.name}
										</h3>
										<p className="text-yellow-400 font-medium mb-1">{member.position}</p>
										<div className="flex items-center justify-center text-gray-400 mb-4">
											<MapPin className="w-4 h-4 mr-1" />
											<span className="text-sm">{member.region}</span>
										</div>

										{selectedTeamMember === member.id && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												className="border-t border-gray-700 pt-4 text-left">
												<p className="text-gray-300 text-sm mb-4">
													{member.bio}
												</p>
												<div className="flex justify-center space-x-4">
													<Button
														variant="ghost"
														size="sm"
														icon={<Mail className="w-4 h-4" />}>
														Contact
													</Button>
													<Button
														variant="ghost"
														size="sm"
														icon={
															<ExternalLink className="w-4 h-4" />
														}>
														Profile
													</Button>
												</div>
											</motion.div>
										)}
									</div>
								</Card>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* Strategic Partnerships */}
				<AnimatedSection className="py-20 bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								Strategic Partnerships
							</h2>
							<p className="text-xl text-gray-300">
								Collaborating with leading organizations to advance African development
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							{partnerships.map((partner: Partnership, index: number) => (
								<Card key={index} hover={true}>
									<div className="flex items-start space-x-4">
										<div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">
											{partner.name}
										</div>
										<div className="flex-1">
											<h3 className="text-xl font-bold mb-2 text-green-400">
												{partner.full}
											</h3>
											<p className="text-gray-300 mb-3">{partner.description}</p>
											<div className="flex flex-wrap gap-2">
												<span className="px-3 py-1 bg-gray-900 text-yellow-400 rounded-full text-xs">
													{partner.region}
												</span>
												<span className="px-3 py-1 bg-gray-900 text-green-400 rounded-full text-xs">
													{partner.focus}
												</span>
											</div>
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* JFAN Initiatives */}
				<AnimatedSection className="py-20 bg-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
								JFAN Initiatives
							</h2>
							<p className="text-xl text-gray-300">
								Transformative programs driving positive change across Africa
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{initiatives.map((initiative: Initiative, index: number) => (
								<Card key={index} hover={true}>
									<div className="flex items-center justify-between mb-4">
										<div
											className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${getStatusColor(
												initiative.status
											)}`}>
											{getStatusIcon(initiative.status)}
											<span className="capitalize">{initiative.status}</span>
										</div>
									</div>

									<h3 className="text-lg font-bold mb-3 text-green-400">{initiative.title}</h3>
									<p className="text-gray-300 mb-4 text-sm">{initiative.description}</p>

									{initiative.impact && (
										<div className="flex items-center text-sm text-yellow-400 mb-3">
											<Star className="w-4 h-4 mr-2" />
											<span>{initiative.impact}</span>
										</div>
									)}

									{initiative.partners && (
										<div className="border-t border-gray-700 pt-3">
											<div className="text-xs text-gray-500 mb-2">
												Key Partners:
											</div>
											<div className="flex flex-wrap gap-1">
												{initiative.partners.map(
													(partner: string, pIndex: number) => (
														<span
															key={pIndex}
															className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
															{partner}
														</span>
													)
												)}
											</div>
										</div>
									)}
								</Card>
							))}
						</div>
					</div>
				</AnimatedSection>

				{/* Call to Action */}
				<AnimatedSection className="py-20 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500">
					<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
						<h2 className="text-4xl font-bold mb-6 text-gray-900">Be Part of Africa's Professional Revolution</h2>
						<p className="text-xl mb-8 text-gray-800">
							Join JFAN today and help us build a more connected, prosperous Africa where every professional
							has access to opportunities that match their potential.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								variant="secondary"
								size="lg"
								href="/register"
								className="bg-gray-900 text-white hover:bg-gray-800"
								icon={<Users className="w-5 h-5" />}>
								Start Your Journey
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

export default AboutPage;
