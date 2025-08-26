"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Target, Users, TrendingUp, Award } from "lucide-react";

interface ScoutSpecificFieldsProps {
	form: UseFormReturn<any>;
}

const focusAreas = [
	"Technology & IT",
	"Healthcare & Medical",
	"Finance & Banking",
	"Engineering",
	"Sales & Marketing",
	"Operations & Management",
	"Creative & Design",
	"Education & Training",
	"Legal & Compliance",
	"Human Resources",
	"Manufacturing",
	"Construction",
	"Agriculture",
	"Hospitality & Tourism",
	"Transportation & Logistics",
];

const networkSizes = ["Small (1-50 contacts)", "Medium (51-200 contacts)", "Large (201-500 contacts)", "Enterprise (500+ contacts)"];

export function ScoutSpecificFields({ form }: ScoutSpecificFieldsProps) {
	return (
		<div className="space-y-6">
			{/* Focus Areas */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-green-400 flex items-center">
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
																className="border-gray-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
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
									Select the industries and roles you specialize in recruiting for
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Network and Experience */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-green-400 flex items-center">
						<Users className="w-5 h-5 mr-2" />
						Network & Experience
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="networkSize"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Network Size *</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
											<SelectValue placeholder="Select your network size" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="bg-gray-800 border-gray-600">
										{networkSizes.map((size) => (
											<SelectItem
												key={size}
												value={size}
												className="text-white hover:bg-gray-700">
												{size}
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
						name="yearsOfExperience"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<TrendingUp className="w-4 h-4 mr-2" />
									Years of Recruiting Experience *
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="number"
										min="0"
										max="50"
										placeholder="Enter years of experience"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
										onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="successfulPlacements"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Award className="w-4 h-4 mr-2" />
									Successful Placements (Optional)
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="number"
										min="0"
										placeholder="Number of successful placements"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
										onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									Total number of candidates you've successfully placed in roles
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
