"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LocationSelector } from "../LocationSelector";

interface BaseFieldsProps {
	form: UseFormReturn<any>;
}

export function BaseFields({ form }: BaseFieldsProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
								<FormLabel className="text-gray-300">Gender *</FormLabel>
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

			{/* Security Information */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-white flex items-center">
						<Lock className="w-5 h-5 mr-2" />
						Security Information
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Password *</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											{...field}
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
											{showPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Confirm Password *</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											{...field}
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirm your password"
											className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
											{showConfirmPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
								</FormControl>
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
						Location Information (Optional)
					</CardTitle>
				</CardHeader>
				<CardContent>
					<LocationSelector form={form} />
				</CardContent>
			</Card>
		</div>
	);
}
