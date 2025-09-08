"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Award, Code } from "lucide-react";
import { JobSelector } from "../JobSelector";

interface TalentFieldsProps {
	form: UseFormReturn<any>;
}

const experienceLevels = ["Entry Level (0-2 years)", "Mid Level (3-5 years)", "Senior Level (6-10 years)", "Expert Level (10+ years)"];

export function TalentFields({ form }: TalentFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-yellow-400 flex items-center">
					<Star className="w-5 h-5 mr-2" />
					Talent Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<JobSelector form={form} />

				<FormField
					control={form.control}
					name="experience"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300 flex items-center">
								<Award className="w-4 h-4 mr-2" />
								Experience Level *
							</FormLabel>
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
								<Code className="w-4 h-4 mr-2" />
								Key Skills *
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="e.g., JavaScript, React, Node.js, Project Management"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
							<p className="text-xs text-gray-400">Separate skills with commas</p>
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
