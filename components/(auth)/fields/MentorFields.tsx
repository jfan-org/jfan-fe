"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

interface MentorFieldsProps {
	form: UseFormReturn<any>;
}

export function MentorFields({ form }: MentorFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-orange-400 flex items-center">
					<Users className="w-5 h-5 mr-2" />
					Mentor Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="mentorshipAreas"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Mentorship Areas *</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={Array.isArray(field.value) ? field.value.join(", ") : ""}
									onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
									placeholder="e.g., Career Development, Leadership, Technical Skills"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="experienceLevel"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Experience Level *</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="e.g., Senior Professional, Executive"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="maxMentees"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Maximum Mentees *</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									min="1"
									max="20"
									onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
									placeholder="Enter maximum number of mentees"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
