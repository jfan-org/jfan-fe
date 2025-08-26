"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Award, Briefcase, Clock } from "lucide-react";

interface CyberAgentSpecificFieldsProps {
	form: UseFormReturn<any>;
}

const specializations = [
	"Cybersecurity Consulting",
	"Penetration Testing",
	"Security Auditing",
	"Incident Response",
	"Digital Forensics",
	"Risk Assessment",
	"Compliance Management",
	"Security Architecture",
	"Threat Intelligence",
	"Security Training",
	"Cloud Security",
	"Network Security",
	"Application Security",
	"Data Protection",
];

const services = [
	"Security Assessment",
	"Vulnerability Testing",
	"Security Implementation",
	"Incident Investigation",
	"Security Training",
	"Compliance Consulting",
	"Risk Management",
	"Security Monitoring",
	"Digital Transformation",
	"Technology Consulting",
];

export function CyberAgentSpecificFields({ form }: CyberAgentSpecificFieldsProps) {
	return (
		<div className="space-y-6">
			{/* Specializations */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-purple-400 flex items-center">
						<Shield className="w-5 h-5 mr-2" />
						Specializations
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="specializations"
						render={() => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Your Specializations *</FormLabel>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
									{specializations.map((specialization) => (
										<FormField
											key={specialization}
											control={form.control}
											name="specializations"
											render={({ field }) => {
												return (
													<FormItem
														key={specialization}
														className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	specialization
																)}
																onCheckedChange={(
																	checked
																) => {
																	return checked
																		? field.onChange(
																				[
																					...(field.value ||
																						[]),
																					specialization,
																				]
																		  )
																		: field.onChange(
																				field.value?.filter(
																					(
																						value: string
																					) =>
																						value !==
																						specialization
																				)
																		  );
																}}
																className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
															/>
														</FormControl>
														<FormLabel className="text-sm text-gray-300 font-normal">
															{specialization}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400 mt-2">Select at least one specialization</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Services Offered */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-purple-400 flex items-center">
						<Briefcase className="w-5 h-5 mr-2" />
						Services Offered
					</CardTitle>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="servicesOffered"
						render={() => (
							<FormItem>
								<FormLabel className="text-gray-300">Select Services You Offer *</FormLabel>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
									{services.map((service) => (
										<FormField
											key={service}
											control={form.control}
											name="servicesOffered"
											render={({ field }) => {
												return (
													<FormItem
														key={service}
														className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	service
																)}
																onCheckedChange={(
																	checked
																) => {
																	return checked
																		? field.onChange(
																				[
																					...(field.value ||
																						[]),
																					service,
																				]
																		  )
																		: field.onChange(
																				field.value?.filter(
																					(
																						value: string
																					) =>
																						value !==
																						service
																				)
																		  );
																}}
																className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
															/>
														</FormControl>
														<FormLabel className="text-sm text-gray-300 font-normal">
															{service}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400 mt-2">Select at least one service</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{/* Experience and Certifications */}
			<Card className="bg-gray-700 border-gray-600">
				<CardHeader>
					<CardTitle className="text-purple-400 flex items-center">
						<Award className="w-5 h-5 mr-2" />
						Experience & Credentials
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="yearsOfExperience"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300 flex items-center">
									<Clock className="w-4 h-4 mr-2" />
									Years of Experience *
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="number"
										min="0"
										max="50"
										placeholder="Enter years of experience"
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
										onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="certifications"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-300">Certifications (Optional)</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										value={field.value?.join(", ") || ""}
										onChange={(e) => {
											const certifications = e.target.value
												.split(",")
												.map((cert) => cert.trim())
												.filter((cert) => cert.length > 0);
											field.onChange(certifications);
										}}
										placeholder="List your certifications separated by commas (e.g., CISSP, CEH, CISM, CompTIA Security+)"
										rows={3}
										className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none"
									/>
								</FormControl>
								<FormMessage className="text-red-400" />
								<p className="text-xs text-gray-400">
									Include relevant cybersecurity certifications, degrees, and professional
									credentials
								</p>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
