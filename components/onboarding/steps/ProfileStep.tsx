"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Session } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUserTypeConfig } from "@/lib/user-types.config";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ProfileStepProps {
	session: Session;
	data: any;
	onDataChange: (data: any) => void;
	onNext: () => void;
	onPrevious: () => void;
}

export function ProfileStep({ session, data, onDataChange, onNext, onPrevious }: ProfileStepProps) {
	const userTypeConfig = getUserTypeConfig(session.user.userType);
	const [formData, setFormData] = useState(data.profileData || {});

	const handleInputChange = (field: string, value: string) => {
		const newData = { ...formData, [field]: value };
		setFormData(newData);
		onDataChange(newData);
	};

	const handleNext = () => {
		// Basic validation could be added here
		onNext();
	};

	const renderUserTypeSpecificFields = () => {
		switch (session.user.userType) {
			case "company":
				return (
					<>
						<div>
							<Label className="text-white">Company Size</Label>
							<select
								className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
								value={formData.companySize || ""}
								onChange={(e) => handleInputChange("companySize", e.target.value)}>
								<option value="">Select company size</option>
								<option value="1-10">1-10 employees</option>
								<option value="11-50">11-50 employees</option>
								<option value="51-100">51-100 employees</option>
								<option value="101-500">101-500 employees</option>
								<option value="501-1000">501-1000 employees</option>
								<option value="1000+">1000+ employees</option>
							</select>
						</div>
						<div>
							<Label className="text-white">Industry Focus</Label>
							<Input
								className="bg-gray-700 border-gray-600 text-white"
								placeholder="e.g., Technology, Healthcare, Finance"
								value={formData.industryFocus || ""}
								onChange={(e) => handleInputChange("industryFocus", e.target.value)}
							/>
						</div>
					</>
				);
			case "talent":
				return (
					<>
						<div>
							<Label className="text-white">Current Experience Level</Label>
							<select
								className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
								value={formData.experienceLevel || ""}
								onChange={(e) => handleInputChange("experienceLevel", e.target.value)}>
								<option value="">Select experience level</option>
								<option value="Entry-level">Entry-level (0-2 years)</option>
								<option value="Mid-level">Mid-level (2-5 years)</option>
								<option value="Senior-level">Senior-level (5+ years)</option>
								<option value="Executive">Executive (10+ years)</option>
							</select>
						</div>
						<div>
							<Label className="text-white">Key Skills</Label>
							<Textarea
								className="bg-gray-700 border-gray-600 text-white"
								placeholder="List your key skills, separated by commas"
								value={formData.keySkills || ""}
								onChange={(e) => handleInputChange("keySkills", e.target.value)}
							/>
						</div>
					</>
				);
			default:
				return (
					<div>
						<Label className="text-white">Areas of Expertise</Label>
						<Textarea
							className="bg-gray-700 border-gray-600 text-white"
							placeholder="Describe your areas of expertise"
							value={formData.expertise || ""}
							onChange={(e) => handleInputChange("expertise", e.target.value)}
						/>
					</div>
				);
		}
	};

	return (
		<Card className="bg-gray-800 border-gray-700">
			<CardHeader>
				<CardTitle className="text-white">Complete Your Profile</CardTitle>
				<p className="text-gray-400">Help us understand your background and goals</p>
			</CardHeader>

			<CardContent className="space-y-4">
				<div>
					<Label className="text-white">Professional Bio</Label>
					<Textarea
						className="bg-gray-700 border-gray-600 text-white"
						placeholder="Tell us about yourself and your professional background"
						value={formData.bio || ""}
						onChange={(e) => handleInputChange("bio", e.target.value)}
					/>
				</div>

				{renderUserTypeSpecificFields()}

				<div>
					<Label className="text-white">Goals on JFAN</Label>
					<Textarea
						className="bg-gray-700 border-gray-600 text-white"
						placeholder="What do you hope to achieve on JFAN?"
						value={formData.goals || ""}
						onChange={(e) => handleInputChange("goals", e.target.value)}
					/>
				</div>

				<div className="flex justify-between pt-4">
					<Button variant="outline" onClick={onPrevious}>
						<ChevronLeft className="w-4 h-4 mr-2" />
						Previous
					</Button>
					<Button onClick={handleNext} className={`${userTypeConfig?.bgColor} ${userTypeConfig?.color} border-0 hover:opacity-80`}>
						Continue
						<ChevronRight className="w-4 h-4 ml-2" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}