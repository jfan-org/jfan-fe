"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

import { LocationSelector } from "../LocationSelector";

interface BaseRegistrationFieldsProps {
	form: UseFormReturn<any>;
}

export function BaseRegistrationFields({ form }: BaseRegistrationFieldsProps) {
	return (
		<div className="space-y-6">
			{/* Personal Information */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-white flex items-center">
						<User className="w-5 h-5 mr-2" />
						Personal Information
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-300">First Name *</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter your first name"
											className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
										/>
									</FormControl>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-300">Last Name *</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter your last name"
											className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
										/>
									</FormControl>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Mail className="w-4 h-4 mr-2" />
									Email Address *
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										placeholder="Enter your email address"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Phone className="w-4 h-4 mr-2" />
									Phone Number *
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="tel"
										placeholder="Enter your phone number"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Calendar className="w-4 h-4 mr-2" />
									Gender *
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="bg-gray-800 border-gray-600 text-white">
											<SelectValue placeholder="Select your gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="bg-gray-800 border-gray-600">
										<SelectItem value="male" className="text-white hover:bg-gray-700">
											Male
										</SelectItem>
										<SelectItem value="female" className="text-white hover:bg-gray-700">
											Female
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Location Information */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-white flex items-center">
						<MapPin className="w-5 h-5 mr-2" />
						Location Information
					</CardTitle>
				</CardHeader>
				<CardContent>
					<LocationSelector form={form} />
				</CardContent>
			</Card>

		</div>
	);
}
