// app/page.tsx or components/HomePage.tsx
"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, Star, CheckCircle, Users, Building, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LayoutWrapper from "../layouts/LayoutWrapper";
import HeroSection from "./HeroSection";
import JobListingsSection from "../molecule/JobListings";
import { Hero } from "./Hero";

interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

interface HomePageProps {
	user?: User | null;
	onLogout?: () => Promise<void>;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogout }) => {
	// Featured companies data
	const featuredCompanies = [
		{
			id: 1,
			name: "Safaricom",
			logo: "📱",
			industry: "Telecommunications",
			location: "Nairobi, Kenya",
			openJobs: 45,
			rating: 4.8,
			description: "Leading telecommunications company in East Africa",
		},
		{
			id: 2,
			name: "Flutterwave",
			logo: "💳",
			industry: "Fintech",
			location: "Lagos, Nigeria",
			openJobs: 32,
			rating: 4.9,
			description: "Building payment infrastructure for Africa",
		},
		{
			id: 3,
			name: "Andela",
			logo: "💻",
			industry: "Technology",
			location: "Remote",
			openJobs: 28,
			rating: 4.7,
			description: "Connecting global companies with African talent",
		},
		{
			id: 4,
			name: "Jumia",
			logo: "🛒",
			industry: "E-commerce",
			location: "Multiple Cities",
			openJobs: 56,
			rating: 4.6,
			description: "Africa's leading e-commerce platform",
		},
	];

	// Success stories/testimonials
	const testimonials = [
		{
			id: 1,
			name: "Amara Okafor",
			role: "Software Engineer at Flutterwave",
			avatar: "👩🏾‍💻",
			content: "African Job Atlas helped me land my dream job in fintech. The platform made it so easy to connect with top employers across Africa.",
			location: "Lagos, Nigeria",
		},
		{
			id: 2,
			name: "Kwame Asante",
			role: "Marketing Director at Safaricom",
			avatar: "👨🏿‍💼",
			content: "I found amazing opportunities that I never would have discovered otherwise. The quality of jobs on this platform is exceptional.",
			location: "Nairobi, Kenya",
		},
		{
			id: 3,
			name: "Fatima Al-Rashid",
			role: "Data Scientist at Jumia",
			avatar: "👩🏽‍🔬",
			content: "The career resources and job matching helped me transition into tech. Now I'm working for one of Africa's biggest companies.",
			location: "Cairo, Egypt",
		},
	];

	// Updated job categories based on the new classification system
	const jobEconomies = [
		{
			id: 1,
			name: "Creative Economy",
			count: 3456,
			icon: "🎨",
			color: "bg-purple-100 text-purple-700 border-purple-200",
			description: "Arts, Technology, Crafts & Vocational services",
			industries: ["Arts Industry", "Science & Technology Industry", "Artisanal Industry", "Vocational Industry"],
		},
		{
			id: 2,
			name: "Athletic Economy",
			count: 1234,
			icon: "🏃‍♀️",
			color: "bg-orange-100 text-orange-700 border-orange-200",
			description: "Sports, Competition & Physical Activities",
			industries: [
				"Big Arena Sports Industry",
				"Mental Sports Industry",
				"Track & Field Sports Industry",
				"Animal Sports Industry",
			],
		},
		{
			id: 3,
			name: "Entrepreneurial Economy",
			count: 2876,
			icon: "🚀",
			color: "bg-emerald-100 text-emerald-700 border-emerald-200",
			description: "Business, Trade & Enterprise Development",
			industries: [
				"Agricultural Entrepreneurs",
				"Tourism and Hospitality",
				"Manufacturing Entrepreneurs",
				"Logistical Entrepreneurs",
			],
		},
	];

	// Popular industries within each economy
	const popularIndustries = [
		// Creative Economy Industries
		{
			id: 101,
			economyId: 1,
			name: "Arts Industry",
			count: 856,
			icon: "🎭",
			color: "bg-pink-100 text-pink-700 border-pink-200",
			sectors: ["Performing Arts", "Visual Arts", "Philosophical Arts", "Auditory Arts"],
		},
		{
			id: 102,
			economyId: 1,
			name: "Science & Technology Industry",
			count: 1245,
			icon: "💻",
			color: "bg-blue-100 text-blue-700 border-blue-200",
			sectors: ["Computer-based Works", "Electrical Works", "Electronic Works", "3I Sector"],
		},
		{
			id: 103,
			economyId: 1,
			name: "Artisanal Industry",
			count: 789,
			icon: "🔨",
			color: "bg-amber-100 text-amber-700 border-amber-200",
			sectors: ["Civil Constructs", "Mechanical Works", "Metal Works", "Carpentry & Joinery"],
		},
		{
			id: 104,
			economyId: 1,
			name: "Vocational Industry",
			count: 566,
			icon: "✂️",
			color: "bg-indigo-100 text-indigo-700 border-indigo-200",
			sectors: ["Cosmetics", "Personal Grooming", "General Vocational"],
		},
		// Athletic Economy Industries
		{
			id: 105,
			economyId: 2,
			name: "Big Arena Sports Industry",
			count: 345,
			icon: "⚽",
			color: "bg-green-100 text-green-700 border-green-200",
			sectors: ["Big Arena Sports"],
		},
		{
			id: 106,
			economyId: 2,
			name: "Mental Sports Industry",
			count: 234,
			icon: "🧠",
			color: "bg-purple-100 text-purple-700 border-purple-200",
			sectors: ["Target Sports", "Table Top Sports"],
		},
		{
			id: 107,
			economyId: 2,
			name: "Track & Field Sports Industry",
			count: 567,
			icon: "🏃",
			color: "bg-red-100 text-red-700 border-red-200",
			sectors: ["Track Races", "Throw Sports", "Jump Sports", "Combat Sports", "Water Sports", "Motor Sports"],
		},
		{
			id: 108,
			economyId: 2,
			name: "Animal Sports Industry",
			count: 88,
			icon: "🐎",
			color: "bg-yellow-100 text-yellow-700 border-yellow-200",
			sectors: ["Horseback Sports"],
		},
		// Entrepreneurial Economy Industries
		{
			id: 109,
			economyId: 3,
			name: "Agricultural Entrepreneurs",
			count: 1245,
			icon: "🌾",
			color: "bg-green-100 text-green-700 border-green-200",
			sectors: ["Cultivation", "Storage", "Processing", "Agro-Logistics"],
		},
		{
			id: 110,
			economyId: 3,
			name: "Tourism and Hospitality",
			count: 678,
			icon: "🏨",
			color: "bg-cyan-100 text-cyan-700 border-cyan-200",
			sectors: ["Venues", "Recreation", "Food & Beverage", "Tour Management", "Stop-over Management"],
		},
		{
			id: 111,
			economyId: 3,
			name: "Manufacturing Entrepreneurs",
			count: 534,
			icon: "🏭",
			color: "bg-gray-100 text-gray-700 border-gray-200",
			sectors: ["Electrical/Electronics", "Mechanical & Metallurgical", "Bio-Chemical Manufacturing", "Civil Construction"],
		},
		{
			id: 112,
			economyId: 3,
			name: "Logistical Entrepreneurs",
			count: 419,
			icon: "📦",
			color: "bg-orange-100 text-orange-700 border-orange-200",
			sectors: ["Adverts & Order Management", "Holding & Wholesales", "Retail Chains", "Logistics & Delivery"],
		},
	];

	return (
		<LayoutWrapper user={user} onLogout={onLogout}>
			{/* Hero Section */}
			<Hero />

			{/* Economic Sectors Overview */}
			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Explore Jobs by Economic Sector</h2>
						<p className="text-muted-foreground max-w-3xl mx-auto">
							Discover opportunities across Africa's three major economic pillars. Each economy offers
							diverse career paths tailored to different skills and interests.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						{jobEconomies.map((economy) => (
							<Card
								key={economy.id}
								className="hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 group-hover:to-black/10 transition-all"></div>
								<CardContent className="p-8 relative z-10">
									<div className="flex items-center justify-between mb-6">
										<div
											className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${economy.color}`}>
											{economy.icon}
										</div>
										<ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground group-hover:translate-x-2 transition-all" />
									</div>
									<h3 className="text-2xl font-bold mb-3">{economy.name}</h3>
									<p className="text-muted-foreground mb-4 leading-relaxed">
										{economy.description}
									</p>
									<div className="flex items-center justify-between mb-4">
										<span className="text-2xl font-bold text-emerald-600">
											{economy.count.toLocaleString()}
										</span>
										<span className="text-sm text-muted-foreground">open positions</span>
									</div>
									<div className="space-y-2">
										{economy.industries.slice(0, 3).map((industry, index) => (
											<div
												key={index}
												className="text-xs text-muted-foreground flex items-center">
												<div className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></div>
												{industry}
											</div>
										))}
										{economy.industries.length > 3 && (
											<div className="text-xs text-emerald-600 font-medium">
												+{economy.industries.length - 3} more industries
											</div>
										)}
									</div>
									<Button
										variant="ghost"
										size="sm"
										className="p-0 h-auto font-medium text-emerald-600 hover:text-emerald-700 mt-4">
										Explore Economy <ArrowRight className="w-4 h-4 ml-1" />
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Popular Industries Section */}
			<section className="py-16 bg-background">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Popular Industries</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Browse the most in-demand industries across different economic sectors and find your perfect
							career match.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{popularIndustries.slice(0, 8).map((industry) => (
							<Card
								key={industry.id}
								className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
								<CardContent className="p-6">
									<div className="flex items-center justify-between mb-4">
										<div
											className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${industry.color}`}>
											{industry.icon}
										</div>
										<ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
									</div>
									<h3 className="text-lg font-semibold mb-2 line-clamp-2">{industry.name}</h3>
									<p className="text-muted-foreground text-sm mb-3">
										{industry.count.toLocaleString()} positions
									</p>
									<div className="space-y-1">
										{industry.sectors.slice(0, 2).map((sector, index) => (
											<div
												key={index}
												className="text-xs text-muted-foreground flex items-center">
												<div className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></div>
												{sector}
											</div>
										))}
										{industry.sectors.length > 2 && (
											<div className="text-xs text-emerald-600">
												+{industry.sectors.length - 2} more sectors
											</div>
										)}
									</div>
									<Button
										variant="ghost"
										size="sm"
										className="p-0 h-auto font-medium text-emerald-600 hover:text-emerald-700 mt-3">
										View Jobs <ArrowRight className="w-4 h-4 ml-1" />
									</Button>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="text-center mt-12">
						<Button variant="outline" size="lg" asChild>
							<Link href="/industries">
								View All Industries
								<ArrowRight className="w-4 h-4 ml-2" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Featured Jobs Section */}
			<JobListingsSection />

			{/* Featured Companies Section */}
			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Top Companies Hiring</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Join Africa's most innovative companies and take your career to the next level.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{featuredCompanies.map((company) => (
							<Card
								key={company.id}
								className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
								<CardHeader className="pb-3">
									<div className="flex items-center space-x-3 mb-3">
										<div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-xl flex items-center justify-center text-2xl">
											{company.logo}
										</div>
										<div className="flex-1">
											<CardTitle className="text-lg">{company.name}</CardTitle>
											<p className="text-sm text-muted-foreground">
												{company.industry}
											</p>
										</div>
									</div>

									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center gap-1">
											<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
											<span className="font-medium">{company.rating}</span>
										</div>
										<Badge variant="secondary">{company.openJobs} jobs</Badge>
									</div>
								</CardHeader>

								<CardContent className="pt-0">
									<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
										{company.description}
									</p>

									<div className="flex items-center text-xs text-muted-foreground mb-4">
										<MapPin className="w-3 h-3 mr-1" />
										{company.location}
									</div>

									<Button
										variant="outline"
										size="sm"
										className="w-full group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-amber-400 group-hover:text-white group-hover:border-transparent transition-all">
										View Jobs
									</Button>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="text-center mt-12">
						<Button variant="outline" size="lg" asChild>
							<Link href="/companies">
								View All Companies
								<ArrowRight className="w-4 h-4 ml-2" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Success Stories Section */}
			<section className="py-16 bg-background">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<Badge variant="secondary" className="mb-4">
							<Star className="w-3 h-3 mr-1" />
							Success Stories
						</Badge>
						<h2 className="text-3xl font-bold mb-4">Hear from Our Community</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Thousands of professionals have found their dream jobs through African Job Atlas. Here are
							some of their stories.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{testimonials.map((testimonial) => (
							<Card key={testimonial.id} className="relative overflow-hidden">
								<CardContent className="p-6">
									<div className="flex items-center space-x-3 mb-4">
										<Avatar className="w-12 h-12">
											<AvatarFallback className="text-2xl">
												{testimonial.avatar}
											</AvatarFallback>
										</Avatar>
										<div>
											<h4 className="font-semibold">{testimonial.name}</h4>
											<p className="text-sm text-muted-foreground">
												{testimonial.role}
											</p>
										</div>
									</div>

									<blockquote className="text-muted-foreground mb-4 leading-relaxed">
										"{testimonial.content}"
									</blockquote>

									<div className="flex items-center text-xs text-muted-foreground">
										<MapPin className="w-3 h-3 mr-1" />
										{testimonial.location}
									</div>
								</CardContent>

								{/* Decorative element */}
								<div className="absolute top-4 right-4 text-6xl text-emerald-100">"</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-emerald-600 to-orange-600 text-white">
				<div className="container mx-auto px-4 text-center">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-4xl font-bold mb-6">Ready to Start Your African Career Journey?</h2>
						<p className="text-xl mb-8 opacity-90 leading-relaxed">
							Join thousands of professionals building their careers across the continent. Your next
							opportunity is just a click away.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							{!user ? (
								<>
									<Button
										size="lg"
										asChild
										className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold">
										<Link href="/signup">
											Create Your Profile
											<ArrowRight className="w-5 h-5 ml-2" />
										</Link>
									</Button>
									<Button
										size="lg"
										variant="outline"
										asChild
										className="border-white text-white hover:bg-white hover:text-emerald-600 font-semibold">
										<Link href="/jobs">Browse Jobs</Link>
									</Button>
								</>
							) : (
								<>
									<Button
										size="lg"
										asChild
										className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold">
										<Link href="/dashboard">
											Go to Dashboard
											<ArrowRight className="w-5 h-5 ml-2" />
										</Link>
									</Button>
									<Button
										size="lg"
										variant="outline"
										asChild
										className="border-white text-white hover:bg-white hover:text-emerald-600 font-semibold">
										<Link href="/jobs">Find New Jobs</Link>
									</Button>
								</>
							)}
						</div>

						{/* Trust indicators */}
						<div className="mt-12 pt-8 border-t border-white/20">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
								<div>
									<div className="text-2xl font-bold mb-1">10,000+</div>
									<div className="text-sm opacity-80">Active Jobs</div>
								</div>
								<div>
									<div className="text-2xl font-bold mb-1">50,000+</div>
									<div className="text-sm opacity-80">Professionals</div>
								</div>
								<div>
									<div className="text-2xl font-bold mb-1">2,500+</div>
									<div className="text-sm opacity-80">Companies</div>
								</div>
								<div>
									<div className="text-2xl font-bold mb-1">54</div>
									<div className="text-sm opacity-80">African Countries</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</LayoutWrapper>
	);
};

export default HomePage;
