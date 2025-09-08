"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Star, ArrowRight } from "lucide-react";

import AnimatedSection from "@/components/ui/AnimatedSection";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import Button from "@/components/ui/NewButton";
import { teamMembers } from "@/lib/constants";

export default function TeamSection() {
	return (
		<AnimatedSection className="py-20 bg-gray-900 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-6">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl mb-6">
							<Users className="w-8 h-8 text-gray-900" />
						</div>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-4xl md:text-5xl font-bold text-white mb-6">
						Meet the{" "}
						<span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
							JFAN Team
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
						Our diverse team of visionaries, innovators, and changemakers is dedicated to unlocking Africa's
						boundless talent potential. Each member brings unique expertise and passion to our mission of
						connecting African professionals with global opportunities.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
						<div className="flex items-center">
							<Star className="w-4 h-4 text-green-400 mr-2" />
							<span>15+ Years Combined Leadership Experience</span>
						</div>
						<div className="flex items-center">
							<Users className="w-4 h-4 text-yellow-400 mr-2" />
							<span>Representing All 5 African Regions</span>
						</div>
					</motion.div>
				</div>

				{/* Team Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{teamMembers.map((member, index) => (
						<TeamMemberCard key={member.id} member={member} index={index} />
					))}
				</div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center">
					<div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
						<h3 className="text-2xl font-bold text-white mb-4">Want to Join Our Mission?</h3>
						<p className="text-gray-300 mb-6">
							We&apos;re always looking for passionate individuals who share our vision of connecting
							Africa's talent with global opportunities. Explore career opportunities with JFAN.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							{/* <Button
								href="/careers"
								size="lg"
								className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-gray-900 font-semibold"
								icon={<ArrowRight className="w-5 h-5" />}>
								View Open Positions
							</Button> */}
							<Button
								href="/about"
								variant="primary"
								size="lg"
								className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
								Learn More About JFAN
							</Button>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute top-1/2 left-10 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse" />
			<div className="absolute top-1/3 right-20 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-pulse delay-1000" />
			<div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-green-400 rounded-full opacity-80 animate-pulse delay-500" />
		</AnimatedSection>
	);
}
