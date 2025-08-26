import { getSession } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, MessageCircle } from "lucide-react";

export default async function MentorDashboard() {
	const session = await getSession();

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">
						Welcome back, {session?.user.name}
					</h1>
					<p className="text-gray-400">Your mentorship dashboard</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Mentees</CardTitle>
							<Users className="h-4 w-4 text-orange-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">12</div>
							<p className="text-xs text-gray-400">2 new this month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Programs</CardTitle>
							<BookOpen className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">4</div>
							<p className="text-xs text-gray-400">Active programs</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
							<TrendingUp className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">94%</div>
							<p className="text-xs text-gray-400">Goal completion</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Sessions</CardTitle>
							<MessageCircle className="h-4 w-4 text-purple-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">48</div>
							<p className="text-xs text-gray-400">This month</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Active Mentees</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Mentee management coming soon...</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Progress Tracking</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Progress analytics coming soon...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}