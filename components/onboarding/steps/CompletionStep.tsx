"use client";

import React from "react";
import { Session } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserTypeConfig } from "@/lib/user-types.config";
import { CheckCircle, Loader2, ChevronLeft, Sparkles } from "lucide-react";

interface CompletionStepProps {
	session: Session;
	data: any;
	onPrevious: () => void;
	onComplete: () => void;
	isSubmitting?: boolean;
}

export function CompletionStep({ session, data, onPrevious, onComplete, isSubmitting }: CompletionStepProps) {
	const userTypeConfig = getUserTypeConfig(session.user.userType);

	const getNextSteps = () => {
		switch (session.user.userType) {
			case "company":
				return [
					"Post your first job opening",
					"Browse available talent",
					"Set up your company profile",
					"Explore analytics dashboard"
				];
			case "talent":
				return [
					"Complete your skill assessments",
					"Browse job opportunities",
					"Save interesting positions",
					"Set up job alerts"
				];
			default:
				return [
					"Explore service opportunities",
					"Set up your service offerings",
					"Connect with potential clients",
					"Access industry insights"
				];
		}
	};

	const nextSteps = getNextSteps();

	return (
		<Card className="bg-gray-800 border-gray-700">
			<CardHeader className="text-center">
				<div className={`mx-auto mb-4 ${userTypeConfig?.color}`}>
					<CheckCircle className="w-16 h-16" />
				</div>
				<CardTitle className="text-2xl text-white">You're All Set!</CardTitle>
				<p className="text-gray-400">
					Your {userTypeConfig?.name.toLowerCase()} account is ready to go
				</p>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="bg-gray-700/50 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-white mb-4 flex items-center">
						<Sparkles className={`w-5 h-5 mr-2 ${userTypeConfig?.color}`} />
						What's Next?
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{nextSteps.map((step, index) => (
							<div key={index} className="flex items-start space-x-3">
								<div className={`w-6 h-6 rounded-full ${userTypeConfig?.bgColor} ${userTypeConfig?.color} flex items-center justify-center text-sm font-medium flex-shrink-0`}>
									{index + 1}
								</div>
								<p className="text-gray-300">{step}</p>
							</div>
						))}
					</div>
				</div>

				<div className="text-center">
					<p className="text-gray-400 mb-4">
						Ready to start your JFAN journey? Click below to access your personalized dashboard.
					</p>
				</div>

				<div className="flex justify-between pt-4">
					<Button variant="outline" onClick={onPrevious} disabled={isSubmitting}>
						<ChevronLeft className="w-4 h-4 mr-2" />
						Previous
					</Button>
					<Button 
						onClick={onComplete} 
						disabled={isSubmitting}
						className={`${userTypeConfig?.bgColor} ${userTypeConfig?.color} border-0 hover:opacity-80`}
					>
						{isSubmitting ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Setting up your dashboard...
							</>
						) : (
							<>
								Enter JFAN
								<Sparkles className="w-4 h-4 ml-2" />
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}