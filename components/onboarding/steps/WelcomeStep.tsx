"use client";

import React from "react";
import { Session } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserTypeConfig } from "@/lib/user-types.config";
import { ChevronRight, Star, Target, Heart, Shield, Award, Users, Building } from "lucide-react";

interface WelcomeStepProps {
	session: Session;
	onNext: () => void;
}

export function WelcomeStep({ session, onNext }: WelcomeStepProps) {
	const userTypeConfig = getUserTypeConfig(session.user.userType);

	const getWelcomeIcon = () => {
		const iconMap = {
			company: Building,
			talent: Star,
			"cyber-agent": Shield,
			scout: Target,
			professional: Award,
			mentor: Users,
			philanthropist: Heart,
		};
		
		const IconComponent = iconMap[session.user.userType as keyof typeof iconMap] || Star;
		return <IconComponent className="w-16 h-16" />;
	};

	return (
		<Card className="bg-gray-800 border-gray-700">
			<CardHeader className="text-center">
				<div className={`mx-auto mb-4 ${userTypeConfig?.color}`}>
					{getWelcomeIcon()}
				</div>
				<CardTitle className={`text-2xl ${userTypeConfig?.color}`}>
					Welcome to JFAN as a {userTypeConfig?.name}!
				</CardTitle>
				<p className="text-gray-400 text-lg">{userTypeConfig?.description}</p>
			</CardHeader>

			<CardContent className="space-y-6">
				<div>
					<h3 className="text-lg font-semibold text-white mb-3">What you'll get:</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{userTypeConfig?.features.map((feature, index) => (
							<div key={index} className="flex items-start space-x-3">
								<div className={`w-2 h-2 rounded-full ${userTypeConfig.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
								<p className="text-gray-300">{feature}</p>
							</div>
						))}
					</div>
				</div>

				<div className="bg-gray-700/50 rounded-lg p-4">
					<h4 className="text-white font-medium mb-2">Next Steps:</h4>
					<p className="text-gray-400 text-sm">
						We'll help you set up your profile, preferences, and get you ready to make the most of your JFAN experience.
						This will only take a few minutes!
					</p>
				</div>

				<div className="flex justify-end">
					<Button onClick={onNext} className={`${userTypeConfig?.bgColor} ${userTypeConfig?.color} border-0 hover:opacity-80`}>
						Let's Get Started
						<ChevronRight className="w-4 h-4 ml-2" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}