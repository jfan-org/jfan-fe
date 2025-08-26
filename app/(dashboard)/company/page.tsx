import { getSession } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Briefcase, Users, BarChart } from "lucide-react";

export default async function CompanyDashboard() {
	const session = await getSession();

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">
						Welcome back, {session?.user.name}
					</h1>
					<p className="text-gray-400">Manage your company and job postings</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Active Jobs</CardTitle>
							<Briefcase className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">12</div>
							<p className="text-xs text-gray-400">+2 from last month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Applications</CardTitle>
							<Users className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">248</div>
							<p className="text-xs text-gray-400">+18% from last month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Views</CardTitle>
							<BarChart className="h-4 w-4 text-yellow-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">1,429</div>
							<p className="text-xs text-gray-400">+12% from last month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Hires</CardTitle>
							<Building className="h-4 w-4 text-purple-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">5</div>
							<p className="text-xs text-gray-400">+1 from last month</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Recent Applications</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Application management coming soon...</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Job Performance</CardTitle>
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