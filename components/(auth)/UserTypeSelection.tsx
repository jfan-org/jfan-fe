"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Building, Star, Shield, Target, Award, Users, Heart, Circle } from "lucide-react";
import { UserType } from "@/types/auth.types";
import { userTypesConfig } from "@/lib/user-types.config";

interface UserTypeSelectionProps {
	onUserTypeSelect: (userType: UserType) => void;
}

// Dynamic icon component
const DynamicIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
	const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
		Building,
		Star,
		Shield,
		Target,
		Award,
		Users,
		Heart,
	};

	const IconComponent = iconMap[iconName];

	if (!IconComponent) {
		return <Circle className={className} />;
	}

	return <IconComponent className={className} />;
};

export function UserTypeSelection({ onUserTypeSelect }: UserTypeSelectionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="text-center mb-12 md:mb-16">
				{/* <div className="text-6xl mb-6">Registration Page</div> */}
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent px-4">
					Join JFAN Community
				</h1>
				<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
					Choose your role and become part of Africa&apos;s largest professional network. Connect, collaborate, and
					contribute to economic growth across the continent.
				</p>
			</div>

			{/* User Types Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
				{userTypesConfig.map((userTypeConfig) => (
					<Card
						key={userTypeConfig.id}
						className={`${userTypeConfig.bgColor} hover:border-green-400 cursor-pointer bg-gray-800 border-gray-700 transition-all duration-300 hover:scale-105`}
						onClick={() => onUserTypeSelect(userTypeConfig.id)}>
						<CardContent className="p-4 sm:p-6">
							<div className="text-center mb-4 sm:mb-6">
								<div className={`${userTypeConfig.color} mb-3 sm:mb-4 flex justify-center`}>
									<DynamicIcon iconName={userTypeConfig.icon} className="w-6 h-6 sm:w-8 sm:h-8" />
								</div>
								<h3 className={`text-lg sm:text-xl font-bold ${userTypeConfig.color} mb-2`}>
									{userTypeConfig.name}
								</h3>
								<p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{userTypeConfig.description}</p>
							</div>

							<div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
								{userTypeConfig.features.map((feature, index) => (
									<div
										key={index}
										className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
										<Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400 flex-shrink-0" />
										<span className="leading-relaxed">{feature}</span>
									</div>
								))}
							</div>

							<Button className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90 text-sm sm:text-base py-2 sm:py-3">
								Register as {userTypeConfig.name}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</motion.div>
	);
}
