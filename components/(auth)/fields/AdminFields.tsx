"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface AdminFieldsProps {
	form: UseFormReturn<any>;
}

export function AdminFields({ form }: AdminFieldsProps) {
	return (
		<Card className="bg-gray-700 border-gray-600">
			<CardHeader>
				<CardTitle className="text-white flex items-center">
					<Settings className="w-5 h-5 mr-2" />
					Administrative Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="adminLevel"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Admin Level</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
										<SelectValue placeholder="Select admin level" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="bg-gray-800 border-gray-600">
									<SelectItem value="super-admin" className="text-white hover:bg-gray-700">
										Super Admin
									</SelectItem>
									<SelectItem value="admin" className="text-white hover:bg-gray-700">
										Admin
									</SelectItem>
									<SelectItem value="moderator" className="text-white hover:bg-gray-700">
										Moderator
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="department"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Department</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter your department (e.g., IT, Operations, HR)"
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
