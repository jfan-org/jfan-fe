"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";

interface ScoutFieldsProps {
	form: UseFormReturn<any>;
}

export function ScoutFields({ form }: ScoutFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-green-400 flex items-center">
					<Target className="w-5 h-5 mr-2" />
					Scout Information
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
									placeholder="e.g., Technology, Healthcare, Finance"
									className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="networkSize"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Network Size *</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="e.g., 100-500 contacts"
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
