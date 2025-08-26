"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, BookOpen, Award, Heart } from "lucide-react";

interface MentorSpecificFieldsProps {
	form: UseFormReturn<any>;
}

const mentorshipAreas = [
	"Career Development",
	"Leadership Skills",
	"Technical Skills",
	"Entrepreneurship",
	"Personal Branding",
	"Communication Skills",
	"Project Management",
	"Industry Knowledge",
	"Networking",
	"Work-Life Balance",
	"Financial Literacy",
	"Creative Development",
	"Academic Guidance",
	"Professional Growth",
	"Life Coaching",
];

const experienceLevels = ["Entry Level (1-3 years)", "Mid-Level (3-7 years)", "Senior Level (7-15 years)", "Executive Level (15+ years)"];

export function MentorSpecificFields({ form }: MentorSpecificFieldsProps) {
	return (
		<div className="space-y-6">
			{/* Mentorship Areas */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-orange-400 flex items-center">
						<BookOpen className="w-5 h-5 mr-2" />
						Mentorship Areas
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="mentorshipAreas"
						render={() => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Your Mentorship Areas *</FormLabel>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
									{mentorshipAreas.map((area) => (
										<FormField
											key={area}
											control={form.control}
											name="mentorshipAreas"
											render={({ field }) => {
												return (
													<FormItem
														key={area}
														className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	area
																)}
																onCheckedChange={(
																	checked
																) => {
																	return checked
																		? field.onChange(
																				[
																					...(field.value ||
																						[]),
																					area,
																				]
																		  )
																		: field.onChange(
																				field.value?.filter(
																					(
																						value: string
																					) =>
																						value !==
																						area
																				)
																		  );
																}}
																className="border-gray-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
															/>
														</FormControl>
														<FormLabel className="text-sm text-gray-300 font-normal">
															{area}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400 mt-2">
									Select the areas where you can provide guidance and support
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Experience and Capacity */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-orange-400 flex items-center">
						<Award className="w-5 h-5 mr-2" />
						Experience & Capacity
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="experienceLevel"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Your Experience Level *</FormLabel>
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
						name="maxMentees"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Users className="w-4 h-4 mr-2" />
									Maximum Number of Mentees *
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="number"
										min="1"
										max="20"
										placeholder="How many mentees can you handle?"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
										onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									Consider your availability and the quality of mentorship you can provide
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Mentorship Approach */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-orange-400 flex items-center">
						<Heart className="w-5 h-5 mr-2" />
						Mentorship Approach
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="mentorshipApproach"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Your Mentorship Approach (Optional)</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Describe your mentorship style, philosophy, and what mentees can expect from working with you..."
										rows={4}
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									Maximum 500 characters. This helps potential mentees understand your style.
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
