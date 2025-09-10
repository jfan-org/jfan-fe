"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ExternalLink, Linkedin, Twitter, Github, Mail, X, MapPin, Award, GraduationCap, Briefcase, Users, FileText } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeamMember } from "@/lib/constants";

interface TeamMemberCardProps {
	member: TeamMember;
	index: number;
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
	const [showDetails, setShowDetails] = useState(false);

	const handleViewDetails = () => {
		setShowDetails(true);
	};

	const handleCloseDetails = () => {
		setShowDetails(false);
	};

	return (
		<>
			{/* Team Member Card */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
				className="group">
				<Card className="bg-gray-800/80 border-gray-700 hover:border-green-500/50 transition-all duration-300 overflow-hidden h-full">
					<CardContent className="p-6">
						{/* Profile Image */}
						<div className="relative mb-4 mx-auto w-24 h-24">
							<div className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
							<div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600">
								<Image
									src={member.image}
									alt={member.name}
									width={96}
									height={96}
									className="w-full h-full object-cover object-center"
									style={{
										objectPosition: "50% 25%", // This positions the face better in the frame
									}}
									onError={(e) => {
										// Fallback to placeholder on image error
										e.currentTarget.style.display = "none";
									}}
								/>
								{/* Fallback placeholder */}
								<div
									className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center"
									style={{ display: "none" }}>
									<Users className="w-10 h-10 text-gray-400" />
								</div>
							</div>
						</div>

						{/* Member Info */}
						<div className="text-center mb-4">
							<h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
								{member.name}
							</h3>
							<p className="text-green-400 font-medium text-sm mb-1">{member.position}</p>
							<p className="text-gray-400 text-sm">{member.department}</p>
						</div>

						{/* Brief Bio */}
						<p className="text-gray-300 text-sm text-center mb-4 line-clamp-3">{member.bio}</p>

						{/* Skills Preview */}
						<div className="flex flex-wrap gap-1 justify-center mb-4">
							{member.skills.slice(0, 3).map((skill, skillIndex) => (
								<Badge
									key={skillIndex}
									variant="secondary"
									className="bg-gray-700/80 text-white hover:bg-gray-600 hover:text-white transition-colors text-xs px-2 py-1">
									{skill}
								</Badge>
							))}
							{member.skills.length > 3 && (
								<Badge
									variant="secondary"
									className="bg-green-500/30 text-green-300 hover:bg-green-500/40 hover:text-green-200 transition-colors text-xs px-2 py-1">
									+{member.skills.length - 3} more
								</Badge>
							)}
						</div>


						{/* View Details Button */}
						<Button
							onClick={handleViewDetails}
							className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-gray-900 font-semibold transition-all duration-200 group-hover:scale-105">
							<Eye className="w-4 h-4 mr-2" />
							View Details
						</Button>
					</CardContent>
				</Card>
			</motion.div>

			{/* Detailed Modal */}
			<AnimatePresence>
				{showDetails && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-8 md:pt-4"
						onClick={handleCloseDetails}>
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							transition={{ duration: 0.3 }}
							className="bg-gray-800 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[85vh] md:max-h-[90vh] flex flex-col"
							onClick={(e) => e.stopPropagation()}>
							{/* Modal Header */}
							<div className="relative p-6 border-b border-gray-700">
								<button
									onClick={handleCloseDetails}
									className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors touch-manipulation">
									<X className="w-5 h-5 md:w-6 md:h-6" />
								</button>

								<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
									{/* Large Profile Image */}
									<div className="relative">
										<div className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full blur-md opacity-75"></div>
										<div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600">
											<Image
												src={member.image}
												alt={member.name}
												width={128}
												height={128}
												className="w-full h-full object-cover object-center"
												style={{
													objectPosition: "50% 25%", // This positions the face better in the frame
												}}
												onError={(e) => {
													// Fallback to placeholder on image error
													e.currentTarget.style.display = "none";
													e.currentTarget.nextElementSibling.style.display =
														"flex";
												}}
											/>
											{/* Fallback placeholder */}
											<div
												className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center"
												style={{ display: "none" }}>
												<Users className="w-16 h-16 text-gray-400" />
											</div>
										</div>
									</div>

									{/* Header Info */}
									<div className="text-center md:text-left flex-1">
										<h2 className="text-3xl font-bold text-white mb-2">{member.name}</h2>
										<p className="text-xl text-green-400 font-semibold mb-2">
											{member.position}
										</p>
										<p className="text-gray-300 mb-4">{member.department}</p>

										{/* Social Links */}
										<div className="flex gap-3 justify-center md:justify-start">
											{member.socialLinks.linkedin && (
												<a
													href={member.socialLinks.linkedin}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-400 hover:text-blue-400 transition-colors">
													<Linkedin className="w-5 h-5" />
												</a>
											)}
											{member.socialLinks.twitter && (
												<a
													href={member.socialLinks.twitter}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-400 hover:text-blue-400 transition-colors">
													<Twitter className="w-5 h-5" />
												</a>
											)}
											{member.socialLinks.github && (
												<a
													href={member.socialLinks.github}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-400 hover:text-green-400 transition-colors">
													<Github className="w-5 h-5" />
												</a>
											)}
											{member.socialLinks.email && (
												<a
													href={`mailto:${member.socialLinks.email}`}
													className="text-gray-400 hover:text-yellow-400 transition-colors">
													<Mail className="w-5 h-5" />
												</a>
											)}
										</div>
									</div>

									{/* PDF Document Button */}
									{member.pdfDocument && (
										<div className="mt-4">
											<Button
												onClick={() => window.open(member.pdfDocument!.url, '_blank')}
												variant="outline"
												size="sm"
												className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
												<FileText className="w-4 h-4 mr-2" />
												View Document
											</Button>
										</div>
									)}
								</div>
							</div>

							{/* Modal Content */}
							<div className="p-6 space-y-6 overflow-y-auto flex-1">
								{/* Biography */}
								<div>
									<h3 className="text-xl font-semibold text-white mb-3 flex items-center">
										<Users className="w-5 h-5 mr-2 text-green-400" />
										Biography
									</h3>
									<div className="text-gray-300 leading-relaxed whitespace-pre-line">
										{member.biography}
									</div>
								</div>

								{/* Experience & Education */}
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h4 className="text-lg font-semibold text-white mb-3 flex items-center">
											<Briefcase className="w-5 h-5 mr-2 text-green-400" />
											Experience
										</h4>
										<p className="text-gray-300">{member.experience}</p>
									</div>
									<div>
										<h4 className="text-lg font-semibold text-white mb-3 flex items-center">
											<GraduationCap className="w-5 h-5 mr-2 text-green-400" />
											Education
										</h4>
										<p className="text-gray-300">{member.education}</p>
									</div>
								</div>

								{/* Skills */}
								<div>
									<h4 className="text-lg font-semibold text-white mb-3">Skills & Expertise</h4>
									<div className="flex flex-wrap gap-2">
										{member.skills.map((skill, skillIndex) => (
											<Badge
												key={skillIndex}
												variant="secondary"
												className="bg-gray-700/80 text-white hover:bg-green-500/20 hover:text-green-300 transition-colors px-3 py-1">
												{skill}
											</Badge>
										))}
									</div>
								</div>

								{/* Achievements */}
								<div>
									<h4 className="text-lg font-semibold text-white mb-3 flex items-center">
										<Award className="w-5 h-5 mr-2 text-green-400" />
										Key Achievements
									</h4>
									<ul className="space-y-2">
										{member.achievements.map((achievement, achievementIndex) => (
											<li
												key={achievementIndex}
												className="text-gray-300 flex items-start">
												<div className="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3 flex-shrink-0"></div>
												{achievement}
											</li>
										))}
									</ul>
								</div>

							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
