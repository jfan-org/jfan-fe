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
			<div className="text-center mb-16">
				{/* <div className="text-6xl mb-6">Registration Page</div> */}
				<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
					Join JFAN Community
				</h1>
				<p className="text-xl text-gray-300 max-w-3xl mx-auto">
					Choose your role and become part of Africa&apos;s largest professional network. Connect, collaborate, and
					contribute to economic growth across the continent.
				</p>
			</div>

			{/* User Types Grid */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{userTypesConfig.map((userTypeConfig) => (
					<Card
						key={userTypeConfig.id}
						className={`${userTypeConfig.bgColor} hover:border-green-400 cursor-pointer bg-gray-800 border-gray-700 transition-all duration-300 hover:scale-105`}
						onClick={() => onUserTypeSelect(userTypeConfig.id)}>
						<CardContent className="p-6">
							<div className="text-center mb-6">
								<div className={`${userTypeConfig.color} mb-4 flex justify-center`}>
									<DynamicIcon iconName={userTypeConfig.icon} className="w-8 h-8" />
								</div>
								<h3 className={`text-xl font-bold ${userTypeConfig.color} mb-2`}>
									{userTypeConfig.name}
								</h3>
								<p className="text-gray-300 text-sm mb-4">{userTypeConfig.description}</p>
							</div>

							<div className="space-y-2 mb-6">
								{userTypeConfig.features.map((feature, index) => (
									<div
										key={index}
										className="flex items-center space-x-2 text-sm text-gray-400">
										<Check className="w-3 h-3 text-green-400" />
										<span>{feature}</span>
									</div>
								))}
							</div>

							<Button className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90">
								Register as {userTypeConfig.name}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</motion.div>
	);
}
