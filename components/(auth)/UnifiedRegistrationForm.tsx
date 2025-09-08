"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form } from "@/components/ui/form";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";

import { UserType } from "@/types/auth.types";
import { getRegistrationSchema } from "@/lib/validation-utils";
import { getUserTypeConfig } from "@/lib/user-types.config";
import { register } from "@/actions/auth.action";

import { BaseFields } from "./fields/BaseFields";
import { AdminFields } from "./fields/AdminFields";
import { CompanyFields } from "./fields/CompanyFields";
import { TalentFields } from "./fields/TalentFields";
import { CyberAgentFields } from "./fields/CyberAgentFields";
import { ScoutFields } from "./fields/ScoutFields";
import { ProfessionalFields } from "./fields/ProfessionalFields";
import { MentorFields } from "./fields/MentorFields";
import { PhilanthropistFields } from "./fields/PhilanthropistFields";

interface UnifiedRegistrationFormProps {
	userType: UserType;
	onBack: () => void;
	onSuccess?: () => void;
}

export function UnifiedRegistrationForm({ userType, onBack, onSuccess }: UnifiedRegistrationFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");

	const userTypeConfig = getUserTypeConfig(userType);
	const validationSchema = getRegistrationSchema(userType);

	const form = useForm({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
			gender: undefined,
			userType,
			countryId: undefined,
			stateId: undefined,
			cityId: undefined,
			// User type specific defaults
			...(userType === UserType.ADMIN && {
				adminLevel: "",
				department: "",
			}),
			...(userType === UserType.COMPANY && {
				companyName: "",
				industry: "",
				companySize: "",
				website: "",
				description: "",
			}),
			...(userType === UserType.TALENT && {
				selectedJobId: undefined,
				experience: "",
				skills: "",
			}),
			...(userType === UserType.CYBER_AGENT && {
				specializations: [],
				servicesOffered: [],
				yearsOfExperience: 0,
				certifications: [],
			}),
			...(userType === UserType.SCOUT && {
				focusAreas: [],
				networkSize: "",
				yearsOfExperience: 0,
				successfulPlacements: 0,
			}),
			...(userType === UserType.PROFESSIONAL && {
				professionalBackground: "",
				serviceOfferings: [],
				industryExpertise: [],
				hourlyRate: 0,
			}),
			...(userType === UserType.MENTOR && {
				mentorshipAreas: [],
				experienceLevel: "",
				maxMentees: 1,
				mentorshipApproach: "",
			}),
			...(userType === UserType.PHILANTHROPIST && {
				focusAreas: [],
				givingPreferences: [],
				organizationName: "",
				budgetRange: "",
			}),
		},
	});

	const onSubmit = async (data: any) => {
		try {
			setIsSubmitting(true);
			setSubmitError("");

			// Convert form data to FormData for server action
			const formData = new FormData();

			// Add all form fields to FormData
			Object.entries(data).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					if (Array.isArray(value)) {
						formData.append(key, JSON.stringify(value));
					} else {
						formData.append(key, String(value));
					}
				}
			});

			const result = await register(formData);

			if (result && !result.success) {
				setSubmitError(result.message || "Registration failed. Please try again.");
			} else {
				onSuccess?.();
			}
		} catch (error) {
			console.error("Registration error:", error);
			setSubmitError("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderUserTypeFields = () => {
		switch (userType) {
			case UserType.ADMIN:
				return <AdminFields form={form} />;
			case UserType.COMPANY:
				return <CompanyFields form={form} />;
			case UserType.TALENT:
				return <TalentFields form={form} />;
			case UserType.CYBER_AGENT:
				return <CyberAgentFields form={form} />;
			case UserType.SCOUT:
				return <ScoutFields form={form} />;
			case UserType.PROFESSIONAL:
				return <ProfessionalFields form={form} />;
			case UserType.MENTOR:
				return <MentorFields form={form} />;
			case UserType.PHILANTHROPIST:
				return <PhilanthropistFields form={form} />;
			default:
				return null;
		}
	};

	if (!userTypeConfig) {
		return (
			<div className="text-center py-8">
				<p className="text-red-500">Invalid user type selected</p>
				<Button onClick={onBack} variant="outline" className="mt-4">
					Go Back
				</Button>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="max-w-4xl mx-auto">
			<Card className="bg-gray-800 border-gray-700">
				<CardHeader>
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back
						</Button>
						<div className="flex-1">
							<CardTitle className={`text-xl ${userTypeConfig.color}`}>
								Register as {userTypeConfig.name}
							</CardTitle>
							<p className="text-gray-400 text-sm mt-1">{userTypeConfig.description}</p>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					{submitError && (
						<Alert className="mb-6 border-red-500 bg-red-500/10">
							<AlertCircle className="h-4 w-4 text-red-500" />
							<AlertDescription className="text-red-400">{submitError}</AlertDescription>
						</Alert>
					)}

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Base Fields - Common for all user types */}
							<BaseFields form={form} />

							{/* User Type Specific Fields */}
							{renderUserTypeFields()}

							{/* Submit Button */}
							<div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
								<Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90">
									{isSubmitting ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Creating Account...
										</>
									) : (
										"Create Account"
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</motion.div>
	);
}
