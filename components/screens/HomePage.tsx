"use client";
import React from "react";
import type { NextPage } from "next";
import { Target, Globe, Users, MapPin, Star, TrendingUp } from "lucide-react";
import { regions, jobCatalog } from "../../lib/constants";
import { Region, Economy, Industry } from "../../types";
import HeroSection from "./HeroSection";
import AnimatedSection from "../ui/AnimatedSection";
import Card from "../ui/NewCard";
import Button from "../ui/NewButton";
import { motion } from "framer-motion";
import LayoutWrapper from "../layouts/LayoutWrapper";

const HomePage: NextPage = () => {
	return (
		<LayoutWrapper>
			<HeroSection />

			{/* About Section */}
			<AnimatedSection className="py-20 bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
							About JFAN
						</h2>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Jobs For Africa Now (JFAN) is a comprehensive platform designed to connect Africa's vast
							talent pool with global opportunities while fostering professional development across the
							continent.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: <Target className="w-8 h-8" />,
								title: "Our Mission",
								description:
									"To create a unified platform that showcases Africa's diverse talents, facilitates meaningful connections, and drives economic empowerment across all 55 African nations.",
							},
							{
								icon: <Globe className="w-8 h-8" />,
								title: "Our Vision",
								description:
									"To become the premier gateway for African talent, fostering innovation, entrepreneurship, and professional excellence while bridging local expertise with global opportunities.",
							},
							{
								icon: <Users className="w-8 h-8" />,
								title: "Our Values",
								description:
									"Unity, Excellence, Innovation, Integrity, and Empowerment guide our commitment to building a stronger, more connected African professional community.",
							},
						].map((item, index: number) => (
							<Card key={index}>
								<div className="text-yellow-400 mb-4">{item.icon}</div>
								<h3 className="text-xl font-bold mb-4 text-green-400">{item.title}</h3>
								<p className="text-gray-300">{item.description}</p>
							</Card>
						))}
					</div>
				</div>
			</AnimatedSection>

			{/* Regional Structure */}
			<AnimatedSection className="py-20 bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
							Continental Regions
						</h2>
						<p className="text-xl text-gray-300">
							JFAN operates across five strategic regions, each with dedicated leadership and localized
							support
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{regions.map((region: Region, index: number) => (
							<Card key={index} className="cursor-pointer">
								<div className="flex items-center space-x-4 mb-4">
									<div
										className="w-4 h-4 rounded-full"
										style={{ backgroundColor: region.color }}></div>
									<h3 className="text-xl font-bold text-white">{region.name}</h3>
								</div>
								<p className="text-gray-400 mb-2">Headquarters: {region.country}</p>
								<div className="flex items-center text-sm text-gray-500">
									<MapPin className="w-4 h-4 mr-2" />
									<span>Regional Coverage</span>
								</div>
							</Card>
						))}
					</div>

					<div className="text-center mt-12">
						<Button href="/regions" size="lg">
							Explore All Regions
						</Button>
					</div>
				</div>
			</AnimatedSection>

			{/* Job Atlas Preview */}
			<AnimatedSection className="py-20 relative overflow-hidden">
				{/* Background Image with Overlay */}
				<div className="absolute inset-0 z-0">
					<div
						className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"
						style={{
							backgroundImage:
								"linear-gradient(rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.9)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
						}}
					/>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					{/* Section Header */}
					<div className="text-center mb-16">
						<motion.h2
							className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}>
							Job Atlas Preview
						</motion.h2>
						<motion.p
							className="text-xl text-gray-300 max-w-2xl mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}>
							Explore opportunities across Africa's diverse economic sectors
						</motion.p>
					</div>

					{/* Economy Cards */}
					<div className="grid lg:grid-cols-3 gap-8">
						{jobCatalog.economies.map((economy: Economy) => (
							<motion.div
								key={economy.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 * economy.id }}>
								<Card className="h-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-green-400/50 transition-all duration-300">
									<div className="p-6">
										<div className="flex items-center mb-6">
											<div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
											<h3 className="text-2xl font-bold text-white">
												{economy.name}
											</h3>
										</div>

										<div className="space-y-3 mb-6">
											{jobCatalog.industries
												.filter(
													(industry: Industry) =>
														industry.economyId === economy.id
												)
												.slice(0, 3)
												.map((industry: Industry) => (
													<div
														key={industry.id}
														className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
														<div className="flex items-center">
															<div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
															<span className="text-gray-300">
																{industry.name}
															</span>
														</div>
													</div>
												))}
										</div>

										<Button
											className="w-full mt-6 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-gray-900 font-medium"
											href="/jobs">
											Explore {economy.name} →
										</Button>
									</div>
								</Card>
							</motion.div>
						))}
					</div>

					{/* Decorative Elements */}
					<div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-400/10 blur-3xl -z-10"></div>
					<div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl -z-10"></div>
				</div>
			</AnimatedSection>

			{/* CTA Section */}
			<AnimatedSection className="py-20 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500">
				<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Transform Your Career?</h2>
					<p className="text-xl mb-8 text-gray-800">
						Join thousands of professionals already connected through JFAN's comprehensive network
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							variant="secondary"
							size="lg"
							icon={<Star className="w-5 h-5" />}
							href="/register"
							className="bg-gray-900 text-white hover:bg-gray-800">
							Get Started Today
						</Button>
						<Button
							variant="ghost"
							size="lg"
							icon={<TrendingUp className="w-5 h-5" />}
							className="bg-gray-900 text-white hover:bg-gray-800">
							Explore Success Stories
						</Button>
					</div>
				</div>
			</AnimatedSection>
		</LayoutWrapper>
	);
};

export default HomePage;
