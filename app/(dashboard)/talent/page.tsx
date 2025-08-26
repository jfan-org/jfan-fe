import { getSession } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Search, Bookmark, FileText } from "lucide-react";

export default async function TalentDashboard() {
	const session = await getSession();

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">
						Welcome back, {session?.user.name}
					</h1>
					<p className="text-gray-400">Discover opportunities that match your skills</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Profile Views</CardTitle>
							<Star className="h-4 w-4 text-yellow-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">89</div>
							<p className="text-xs text-gray-400">+12% from last week</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Applications</CardTitle>
							<FileText className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">7</div>
							<p className="text-xs text-gray-400">3 pending reviews</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Saved Jobs</CardTitle>
							<Bookmark className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">15</div>
							<p className="text-xs text-gray-400">5 new matches</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Job Matches</CardTitle>
							<Search className="h-4 w-4 text-purple-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">24</div>
							<p className="text-xs text-gray-400">Based on your skills</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Recommended Jobs</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Job recommendations coming soon...</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Application Status</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Application tracking coming soon...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}