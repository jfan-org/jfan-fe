"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Globe, Users, Briefcase } from "lucide-react";

interface CompanySpecificFieldsProps {
	form: UseFormReturn<any>;
}

const industries = [
	"Technology",
	"Healthcare",
	"Finance",
	"Education",
	"Manufacturing",
	"Retail",
	"Construction",
	"Agriculture",
	"Transportation",
	"Energy",
	"Media & Entertainment",
	"Real Estate",
	"Hospitality",
	"Consulting",
	"Non-profit",
	"Government",
	"Other",
];

const companySizes = ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "501-1000 employees", "1000+ employees"];

export function CompanySpecificFields({ form }: CompanySpecificFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-blue-400 flex items-center">
					<Building className="w-5 h-5 mr-2" />
					Company Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="companyName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Company Name *</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter your company name"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="industry"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Briefcase className="w-4 h-4 mr-2" />
									Industry *
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
											<SelectValue placeholder="Select your industry" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="bg-gray-800 border-gray-600 max-h-60">
										{industries.map((industry) => (
											<SelectItem
												key={industry}
												value={industry}
												className="text-white hover:bg-gray-700">
												{industry}
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
						name="companySize"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Users className="w-4 h-4 mr-2" />
									Company Size *
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
											<SelectValue placeholder="Select company size" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="bg-gray-800 border-gray-600">
										{companySizes.map((size) => (
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
				</div>

				<FormField
					control={form.control}
					name="website"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300 flex items-center">
								<Globe className="w-4 h-4 mr-2" />
								Website (Optional)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="url"
									placeholder="https://www.yourcompany.com"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Company Description (Optional)</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Tell us about your company, what you do, and what makes you unique..."
									rows={4}
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
							<p className="text-xs text-gray-400">Maximum 1000 characters</p>
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
