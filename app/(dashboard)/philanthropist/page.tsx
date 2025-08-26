import { getSession } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TrendingUp, Search, DollarSign } from "lucide-react";

export default async function PhilanthropistDashboard() {
	const session = await getSession();

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">
						Welcome back, {session?.user.name}
					</h1>
					<p className="text-gray-400">Your philanthropic impact dashboard</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Projects Funded</CardTitle>
							<Heart className="h-4 w-4 text-pink-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">15</div>
							<p className="text-xs text-gray-400">3 new this quarter</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Impact Score</CardTitle>
							<TrendingUp className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">8.7</div>
							<p className="text-xs text-gray-400">Out of 10</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Opportunities</CardTitle>
							<Search className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">27</div>
							<p className="text-xs text-gray-400">Matching your interests</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Total Giving</CardTitle>
							<DollarSign className="h-4 w-4 text-yellow-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">$125k</div>
							<p className="text-xs text-gray-400">This year</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Recent Projects</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Project tracking coming soon...</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Impact Metrics</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Impact analytics coming soon...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}