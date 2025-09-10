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
import { getValidationSchema } from "@/lib/validation.auth";
import { getUserTypeConfig } from "@/lib/user-types.config";
import { registerUser } from "@/actions/auth.action";

import { BaseRegistrationFields } from "./forms/BaseRegistrationFields";
import { CompanySpecificFields } from "./forms/CompanySpecificFields";
import { TalentSpecificFields } from "./forms/TalentSpecificFields";
import { CyberAgentSpecificFields } from "./forms/CyberAgentSpecificFields";
import { ScoutSpecificFields } from "./forms/ScoutSpecificFields";
import { ProfessionalSpecificFields } from "./forms/ProfessionalSpecificFields";
import { MentorSpecificFields } from "./forms/MentorSpecificFields";
import { PhilanthropistSpecificFields } from "./forms/PhilanthropistSpecificFields";

interface DynamicRegistrationFormProps {
	userType: UserType;
	onBack: () => void;
	onSuccess?: () => void;
}

export function DynamicRegistrationForm({ userType, onBack, onSuccess }: DynamicRegistrationFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");

	const userTypeConfig = getUserTypeConfig(userType);
	const validationSchema = getValidationSchema(userType);

	const form = useForm({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "1111qqqqQ_",
			confirmPassword: "1111qqqqQ_",
			phone: "",
			countryId: undefined,
			stateId: undefined,
			cityId: undefined,
			gender: undefined,
			// User type specific defaults
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

	const onSubmit = async (data: UserRegistrationData) => {
		try {
			setIsSubmitting(true);
			setSubmitError("");

			// Clean up the data before submission - remove location fields temporarily
			const cleanedData = {
				...data,
			};
			
			// Remove location fields temporarily until backend is updated to handle string IDs
			delete cleanedData.countryId;
			delete cleanedData.stateId;
			delete cleanedData.cityId;

			const result = await registerUser(userType, cleanedData);

			if (result && !result.success) {
				setSubmitError(result.message || "Registration failed. Please try again.");
			} else if (result && result.success) {
				// If there's a redirect URL, navigate to it
				if (result.redirectTo) {
					window.location.href = result.redirectTo;
				} else {
					onSuccess?.();
				}
			}
		} catch (error) {
			console.error("Registration error:", error);
			setSubmitError("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderUserTypeSpecificFields = () => {
		switch (userType) {
			case UserType.COMPANY:
				return <CompanySpecificFields form={form} />;
			case UserType.TALENT:
				return <TalentSpecificFields form={form} />;
			case UserType.CYBER_AGENT:
				return <CyberAgentSpecificFields form={form} />;
			case UserType.SCOUT:
				return <ScoutSpecificFields form={form} />;
			case UserType.PROFESSIONAL:
				return <ProfessionalSpecificFields form={form} />;
			case UserType.MENTOR:
				return <MentorSpecificFields form={form} />;
			case UserType.PHILANTHROPIST:
				return <PhilanthropistSpecificFields form={form} />;
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
				<CardHeader className="p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
						<Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white self-start sm:self-auto">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back
						</Button>
						<div className="flex-1">
							<CardTitle className={`text-lg sm:text-xl ${userTypeConfig.color}`}>
								Register as {userTypeConfig.name}
							</CardTitle>
							<p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">{userTypeConfig.description}</p>
						</div>
					</div>
				</CardHeader>

				<CardContent className="p-4 sm:p-6">
					{submitError && (
						<Alert className="mb-4 sm:mb-6 border-red-500 bg-red-500/10">
							<AlertCircle className="h-4 w-4 text-red-500" />
							<AlertDescription className="text-red-400 text-sm">{submitError}</AlertDescription>
						</Alert>
					)}

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
							{/* Base Registration Fields */}
							<BaseRegistrationFields form={form} />

							{/* User Type Specific Fields */}
							{renderUserTypeSpecificFields()}

							{/* Submit Button */}
							<div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-700">
								<Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} className="w-full sm:w-auto">
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting}
									className={`w-full sm:w-auto ${userTypeConfig.bgColor} ${userTypeConfig.color} border-0 hover:opacity-80`}>
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
