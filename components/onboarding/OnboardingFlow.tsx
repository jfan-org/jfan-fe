"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Session } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { getUserTypeConfig } from "@/lib/user-types.config";
import { completeOnboardingFlow } from "@/actions/auth.action";

// Import step components
import { WelcomeStep } from "./steps/WelcomeStep";
import { ProfileStep } from "./steps/ProfileStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { CompletionStep } from "./steps/CompletionStep";

interface OnboardingFlowProps {
	session: Session;
}

export function OnboardingFlow({ session }: OnboardingFlowProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [onboardingData, setOnboardingData] = useState({
		profileData: {},
		preferencesData: {},
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const userTypeConfig = getUserTypeConfig(session.user.userType);

	// Define steps based on user type
	const steps = [
		{ id: "welcome", title: "Welcome", component: WelcomeStep },
		{ id: "profile", title: "Profile Setup", component: ProfileStep },
		{ id: "preferences", title: "Preferences", component: PreferencesStep },
		{ id: "completion", title: "Complete", component: CompletionStep },
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleStepData = (stepId: string, data: any) => {
		setOnboardingData((prev) => ({
			...prev,
			[`${stepId}Data`]: data,
		}));
	};

	const handleComplete = async () => {
		try {
			setIsSubmitting(true);
			await completeOnboardingFlow(onboardingData);
			// Redirect will happen in the server action
		} catch (error) {
			console.error("Onboarding completion failed:", error);
			setIsSubmitting(false);
		}
	};

	const getCurrentStepComponent = () => {
		const StepComponent = steps[currentStep].component;
		return (
			<StepComponent
				session={session}
				data={onboardingData}
				onDataChange={(data: any) => handleStepData(steps[currentStep].id, data)}
				onNext={handleNext}
				onPrevious={handlePrevious}
				onComplete={handleComplete}
				isLastStep={currentStep === steps.length - 1}
				isSubmitting={isSubmitting}
			/>
		);
	};

	const progressPercentage = ((currentStep + 1) / steps.length) * 100;

	return (
		<div className="min-h-screen flex items-center justify-center p-6">
			<div className="w-full max-w-4xl">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center space-x-2 mb-4">
						<div className={`w-12 h-12 rounded-full ${userTypeConfig?.bgColor} ${userTypeConfig?.color} flex items-center justify-center text-2xl font-bold`}>
							{session.user.name.charAt(0).toUpperCase()}
						</div>
						<div className="text-left">
							<h1 className="text-2xl font-bold text-white">Welcome, {session.user.name}!</h1>
							<p className="text-gray-400 capitalize">Setting up your {session.user.userType} account</p>
						</div>
					</div>

					{/* Progress bar */}
					<div className="mb-6">
						<div className="flex justify-between mb-2">
							{steps.map((step, index) => (
								<div key={step.id} className="flex items-center">
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
											index < currentStep
												? "bg-green-500 text-white"
												: index === currentStep
												? `${userTypeConfig?.bgColor} ${userTypeConfig?.color}`
												: "bg-gray-700 text-gray-400"
										}`}>
										{index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
									</div>
									{index < steps.length - 1 && (
										<ChevronRight className="w-4 h-4 text-gray-600 mx-2" />
									)}
								</div>
							))}
						</div>
						<Progress value={progressPercentage} className="w-full" />
						<p className="text-sm text-gray-400 mt-2">
							Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
						</p>
					</div>
				</div>

				{/* Step Content */}
				<motion.div
					key={currentStep}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					transition={{ duration: 0.3 }}>
					{getCurrentStepComponent()}
				</motion.div>
			</div>
		</div>
	);
}