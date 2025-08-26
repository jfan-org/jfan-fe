"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Award, Target } from "lucide-react";

import { JobSelector } from "../JobSelector";

interface TalentSpecificFieldsProps {
	form: UseFormReturn<any>;
}

const experienceLevels = [
	"Entry Level (0-1 years)",
	"Junior (1-3 years)",
	"Mid-Level (3-5 years)",
	"Senior (5-8 years)",
	"Expert (8+ years)",
	"Executive (10+ years)",
];

export function TalentSpecificFields({ form }: TalentSpecificFieldsProps) {
	return (
		<div className="space-y-6">
			{/* Career Path Selection */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-yellow-400 flex items-center">
						<Target className="w-5 h-5 mr-2" />
						Career Path
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="selectedJobId"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Your Career Path *</FormLabel>
								<FormControl>
									<JobSelector
										selectedJobId={field.value}
										onJobSelect={(jobId) => field.onChange(jobId)}
										error={form.formState.errors.selectedJobId?.message}
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Professional Information */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-yellow-400 flex items-center">
						<Award className="w-5 h-5 mr-2" />
						Professional Information
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="experience"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Experience Level *</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
											<SelectValue placeholder="Select your experience level" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="bg-gray-800 border-gray-600">
										{experienceLevels.map((level) => (
											<SelectItem
												key={level}
												value={level}
												className="text-white hover:bg-gray-700">
												{level}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="skills"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Star className="w-4 h-4 mr-2" />
									Skills & Expertise *
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="List your key skills, technologies, and areas of expertise. Separate with commas (e.g., JavaScript, React, Node.js, Project Management, Communication)"
										rows={4}
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									Include technical skills, soft skills, certifications, and tools you're
									proficient with
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
