"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

interface CyberAgentFieldsProps {
	form: UseFormReturn<any>;
}

export function CyberAgentFields({ form }: CyberAgentFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-purple-400 flex items-center">
					<Shield className="w-5 h-5 mr-2" />
					Cyber Agent Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="specializations"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Specializations *</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={Array.isArray(field.value) ? field.value.join(", ") : ""}
									onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
									placeholder="e.g., Cybersecurity, Network Security, Penetration Testing"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="yearsOfExperience"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Years of Experience *</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									min="0"
									onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
									placeholder="Enter years of experience"
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
