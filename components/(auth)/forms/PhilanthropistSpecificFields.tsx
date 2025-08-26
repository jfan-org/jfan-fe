"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Target, Building, DollarSign } from "lucide-react";

interface PhilanthropistSpecificFieldsProps {
	form: UseFormReturn<any>;
}

const focusAreas = [
	"Education & Scholarships",
	"Healthcare & Medical",
	"Technology & Innovation",
	"Environmental Conservation",
	"Poverty Alleviation",
	"Women's Empowerment",
	"Youth Development",
	"Community Development",
	"Arts & Culture",
	"Economic Development",
	"Infrastructure Development",
	"Food Security",
	"Clean Water & Sanitation",
	"Disaster Relief",
	"Human Rights",
];

const givingPreferences = [
	"Direct Financial Support",
	"Scholarship Programs",
	"Equipment & Resources",
	"Capacity Building",
	"Mentorship Programs",
	"Infrastructure Projects",
	"Research Funding",
	"Emergency Relief",
	"Long-term Partnerships",
	"Community Projects",
	"Educational Programs",
	"Healthcare Initiatives",
	"Technology Access",
	"Skills Training",
	"Microfinance",
];

const budgetRanges = [
	"Under $1,000",
	"$1,000 - $5,000",
	"$5,000 - $10,000",
	"$10,000 - $25,000",
	"$25,000 - $50,000",
	"$50,000 - $100,000",
	"$100,000 - $500,000",
	"$500,000+",
	"Prefer not to specify",
];

export function PhilanthropistSpecificFields({ form }: PhilanthropistSpecificFieldsProps) {
	return (
		<div className="space-y-6">
			{/* Focus Areas */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-pink-400 flex items-center">
						<Target className="w-5 h-5 mr-2" />
						Focus Areas
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="focusAreas"
						render={() => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Your Focus Areas *</FormLabel>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
									{focusAreas.map((area) => (
										<FormField
											key={area}
											control={form.control}
											name="focusAreas"
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
																className="border-gray-600 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
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
									Select the areas where you want to make an impact
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Giving Preferences */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-pink-400 flex items-center">
						<Heart className="w-5 h-5 mr-2" />
						Giving Preferences
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="givingPreferences"
						render={() => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Your Giving Preferences *</FormLabel>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
									{givingPreferences.map((preference) => (
										<FormField
											key={preference}
											control={form.control}
											name="givingPreferences"
											render={({ field }) => {
												return (
													<FormItem
														key={preference}
														className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	preference
																)}
																onCheckedChange={(
																	checked
																) => {
																	return checked
																		? field.onChange(
																				[
																					...(field.value ||
																						[]),
																					preference,
																				]
																		  )
																		: field.onChange(
																				field.value?.filter(
																					(
																						value: string
																					) =>
																						value !==
																						preference
																				)
																		  );
																}}
																className="border-gray-600 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
															/>
														</FormControl>
														<FormLabel className="text-sm text-gray-300 font-normal">
															{preference}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400 mt-2">
									Select how you prefer to contribute and support causes
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Organization and Budget */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-pink-400 flex items-center">
						<Building className="w-5 h-5 mr-2" />
						Organization & Budget
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="organizationName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Organization Name (Optional)</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Enter your organization or foundation name"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									If you represent an organization, foundation, or company
								</p>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="budgetRange"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<DollarSign className="w-4 h-4 mr-2" />
									Annual Giving Budget (Optional)
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
											<SelectValue placeholder="Select your budget range" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="bg-gray-800 border-gray-600">
										{budgetRanges.map((range) => (
											<SelectItem
												key={range}
												value={range}
												className="text-white hover:bg-gray-700">
												{range}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									This helps match you with appropriate opportunities and projects
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
