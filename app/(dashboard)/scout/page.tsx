import { getSession } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingUp, Network } from "lucide-react";

export default async function ScoutDashboard() {
	const session = await getSession();

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">
						Welcome back, {session?.user.name}
					</h1>
					<p className="text-gray-400">Your talent scouting dashboard</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Placements</CardTitle>
							<Target className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">23</div>
							<p className="text-xs text-gray-400">+4 this month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Talent Pool</CardTitle>
							<Users className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">456</div>
							<p className="text-xs text-gray-400">32 new this week</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
							<TrendingUp className="h-4 w-4 text-yellow-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">87%</div>
							<p className="text-xs text-gray-400">+5% from last month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Network Size</CardTitle>
							<Network className="h-4 w-4 text-purple-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">1,234</div>
							<p className="text-xs text-gray-400">Growing network</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Top Talent</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Talent management coming soon...</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Placement Analytics</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Analytics dashboard coming soon...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}