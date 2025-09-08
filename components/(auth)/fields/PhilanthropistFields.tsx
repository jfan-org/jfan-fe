"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";

interface PhilanthropistFieldsProps {
	form: UseFormReturn<any>;
}

export function PhilanthropistFields({ form }: PhilanthropistFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-pink-400 flex items-center">
					<Heart className="w-5 h-5 mr-2" />
					Philanthropist Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="focusAreas"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Focus Areas *</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={Array.isArray(field.value) ? field.value.join(", ") : ""}
									onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
									placeholder="e.g., Education, Healthcare, Environment"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="givingPreferences"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Giving Preferences *</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={Array.isArray(field.value) ? field.value.join(", ") : ""}
									onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
									placeholder="e.g., Direct Funding, Mentorship, Resource Sharing"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="organizationName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Organization Name (Optional)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter your organization name if applicable"
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
