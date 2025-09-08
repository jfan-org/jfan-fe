"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award } from "lucide-react";

interface ProfessionalFieldsProps {
	form: UseFormReturn<any>;
}

export function ProfessionalFields({ form }: ProfessionalFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-indigo-400 flex items-center">
					<Award className="w-5 h-5 mr-2" />
					Professional Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="professionalBackground"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Professional Background *</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Describe your professional background and expertise..."
									rows={4}
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="serviceOfferings"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Service Offerings *</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={Array.isArray(field.value) ? field.value.join(", ") : ""}
									onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
									placeholder="e.g., Consulting, Training, Strategy Development"
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
