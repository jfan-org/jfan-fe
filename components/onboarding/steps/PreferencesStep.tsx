"use client";

import React, { useState } from "react";
import { Session } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserTypeConfig } from "@/lib/user-types.config";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface PreferencesStepProps {
	session: Session;
	data: any;
	onDataChange: (data: any) => void;
	onNext: () => void;
	onPrevious: () => void;
}

export function PreferencesStep({ session, data, onDataChange, onNext, onPrevious }: PreferencesStepProps) {
	const userTypeConfig = getUserTypeConfig(session.user.userType);
	const [formData, setFormData] = useState(data.preferencesData || {});

	const handleCheckboxChange = (category: string, option: string, checked: boolean) => {
		const currentOptions = formData[category] || [];
		const newOptions = checked
			? [...currentOptions, option]
			: currentOptions.filter((item: string) => item !== option);
		
		const newData = { ...formData, [category]: newOptions };
		setFormData(newData);
		onDataChange(newData);
	};

	const getPreferencesByUserType = () => {
		switch (session.user.userType) {
			case "company":
				return {
					"Hiring Preferences": [
						"Remote candidates",
						"Local candidates only",
						"Contract workers",
						"Full-time employees",
						"Part-time employees",
						"Interns"
					],
					"Communication": [
						"Email notifications",
						"SMS updates",
						"Weekly digest",
						"Real-time alerts"
					]
				};
			case "talent":
				return {
					"Job Preferences": [
						"Remote work",
						"Hybrid work",
						"On-site work",
						"Full-time positions",
						"Part-time positions",
						"Contract work",
						"Freelance opportunities"
					],
					"Communication": [
						"Job alerts",
						"Application updates",
						"Career insights",
						"Weekly opportunities digest"
					]
				};
			default:
				return {
					"Service Preferences": [
						"Individual clients",
						"Enterprise clients",
						"Short-term projects",
						"Long-term engagements",
						"Remote collaboration",
						"On-site visits"
					],
					"Communication": [
						"Project opportunities",
						"Client inquiries",
						"Industry updates",
						"Monthly newsletter"
					]
				};
		}
	};

	const preferences = getPreferencesByUserType();

	return (
		<Card className="bg-gray-800 border-gray-700">
			<CardHeader>
				<CardTitle className="text-white">Set Your Preferences</CardTitle>
				<p className="text-gray-400">Customize your JFAN experience</p>
			</CardHeader>

			<CardContent className="space-y-6">
				{Object.entries(preferences).map(([category, options]) => (
					<div key={category}>
						<Label className="text-white text-lg font-medium mb-3 block">{category}</Label>
						<div className="space-y-2">
							{options.map((option) => (
								<div key={option} className="flex items-center space-x-2">
									<Checkbox
										id={`${category}-${option}`}
										checked={(formData[category] || []).includes(option)}
										onCheckedChange={(checked) => 
											handleCheckboxChange(category, option, checked as boolean)
										}
									/>
									<Label 
										htmlFor={`${category}-${option}`}
										className="text-gray-300 cursor-pointer"
									>
										{option}
									</Label>
								</div>
							))}
						</div>
					</div>
				))}

				<div className="bg-gray-700/50 rounded-lg p-4">
					<h4 className="text-white font-medium mb-2">Privacy Note</h4>
					<p className="text-gray-400 text-sm">
						You can change these preferences anytime in your account settings. 
						We respect your privacy and will only send communications you've opted into.
					</p>
				</div>

				<div className="flex justify-between pt-4">
					<Button variant="outline" onClick={onPrevious}>
						<ChevronLeft className="w-4 h-4 mr-2" />
						Previous
					</Button>
					<Button onClick={onNext} className={`${userTypeConfig?.bgColor} ${userTypeConfig?.color} border-0 hover:opacity-80`}>
						Continue
						<ChevronRight className="w-4 h-4 ml-2" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}