"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Award, Briefcase, DollarSign, Target } from "lucide-react";

interface ProfessionalSpecificFieldsProps {
	form: UseFormReturn<any>;
}

const serviceOfferings = [
	"Business Consulting",
	"Strategy Development",
	"Project Management",
	"Financial Advisory",
	"Legal Consulting",
	"Marketing & Branding",
	"Technology Consulting",
	"Operations Optimization",
	"Change Management",
	"Training & Development",
	"Risk Management",
	"Compliance Consulting",
	"Market Research",
	"Business Analysis",
	"Process Improvement",
];

const industryExpertise = [
	"Technology & Software",
	"Healthcare & Pharmaceuticals",
	"Financial Services",
	"Manufacturing",
	"Retail & E-commerce",
	"Energy & Utilities",
	"Real Estate",
	"Education",
	"Government & Public Sector",
	"Non-profit",
	"Agriculture",
	"Transportation & Logistics",
	"Media & Entertainment",
	"Hospitality & Tourism",
	"Construction",
];

export function ProfessionalSpecificFields({ form }: ProfessionalSpecificFieldsProps) {
	return (
		<div className="space-y-6">
			{/* Professional Background */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-indigo-400 flex items-center">
						<Award className="w-5 h-5 mr-2" />
						Professional Background
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="professionalBackground"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Professional Background *</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Describe your professional background, key achievements, and what makes you unique as a consultant..."
										rows={4}
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">Minimum 10 characters, maximum 500 characters</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Service Offerings */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-indigo-400 flex items-center">
						<Briefcase className="w-5 h-5 mr-2" />
						Service Offerings
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="serviceOfferings"
						render={() => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Services You Offer *</FormLabel>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
									{serviceOfferings.map((service) => (
										<FormField
											key={service}
											control={form.control}
											name="serviceOfferings"
											render={({ field }) => {
												return (
													<FormItem
														key={service}
														className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	service
																)}
																onCheckedChange={(
																	checked
																) => {
																	return checked
																		? field.onChange(
																				[
																					...(field.value ||
																						[]),
																					service,
																				]
																		  )
																		: field.onChange(
																				field.value?.filter(
																					(
																						value: string
																					) =>
																						value !==
																						service
																				)
																		  );
																}}
																className="border-gray-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
															/>
														</FormControl>
														<FormLabel className="text-sm text-gray-300 font-normal">
															{service}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400 mt-2">Select at least one service offering</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Industry Expertise */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-indigo-400 flex items-center">
						<Target className="w-5 h-5 mr-2" />
						Industry Expertise
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="industryExpertise"
						render={() => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Your Industry Expertise *</FormLabel>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
									{industryExpertise.map((industry) => (
										<FormField
											key={industry}
											control={form.control}
											name="industryExpertise"
											render={({ field }) => {
												return (
													<FormItem
														key={industry}
														className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	industry
																)}
																onCheckedChange={(
																	checked
																) => {
																	return checked
																		? field.onChange(
																				[
																					...(field.value ||
																						[]),
																					industry,
																				]
																		  )
																		: field.onChange(
																				field.value?.filter(
																					(
																						value: string
																					) =>
																						value !==
																						industry
																				)
																		  );
																}}
																className="border-gray-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
															/>
														</FormControl>
														<FormLabel className="text-sm text-gray-300 font-normal">
															{industry}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400 mt-2">
									Select the industries where you have expertise
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Pricing */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-indigo-400 flex items-center">
						<DollarSign className="w-5 h-5 mr-2" />
						Pricing Information
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="hourlyRate"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Hourly Rate (USD) - Optional</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="number"
										min="0"
										step="0.01"
										placeholder="Enter your hourly rate"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
										onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									This helps clients understand your pricing structure. You can always negotiate
									project-based rates.
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
