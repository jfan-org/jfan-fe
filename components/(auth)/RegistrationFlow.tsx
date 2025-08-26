"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserType } from "@/types/auth.types";
import { UserTypeSelection } from "./UserTypeSelection";
import { DynamicRegistrationForm } from "./DynamicRegistrationForm";

type RegistrationStep = "userType" | "form" | "success";

export function RegistrationFlow() {
	const [currentStep, setCurrentStep] = useState<RegistrationStep>("userType");
	const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

	const handleUserTypeSelect = (userType: UserType) => {
		setSelectedUserType(userType);
		setCurrentStep("form");
	};

	const handleBack = () => {
		if (currentStep === "form") {
			setCurrentStep("userType");
			setSelectedUserType(null);
		}
	};

	const handleSuccess = () => {
		setCurrentStep("success");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
			<div className="max-w-6xl mx-auto">
				<AnimatePresence mode="wait">
					{currentStep === "userType" && (
						<motion.div
							key="userType"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}>
							<UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
						</motion.div>
					)}

					{currentStep === "form" && selectedUserType && (
						<motion.div
							key="form"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}>
							<DynamicRegistrationForm
								userType={selectedUserType}
								onBack={handleBack}
								onSuccess={handleSuccess}
							/>
						</motion.div>
					)}

					{currentStep === "success" && (
						<motion.div
							key="success"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}>
							<div className="text-center py-16">
								<div className="max-w-md mx-auto">
									<div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
										<svg
											className="w-8 h-8 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<h2 className="text-2xl font-bold text-white mb-4">
										Registration Successful!
									</h2>
									<p className="text-gray-300 mb-6">
										Please check your email for a verification link to complete your
										account setup.
									</p>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
