import { getSession } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Folder, DollarSign } from "lucide-react";

export default async function ProfessionalDashboard() {
	const session = await getSession();

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">
						Welcome back, {session?.user.name}
					</h1>
					<p className="text-gray-400">Your professional services dashboard</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Services</CardTitle>
							<Award className="h-4 w-4 text-indigo-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">6</div>
							<p className="text-xs text-gray-400">Active offerings</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Clients</CardTitle>
							<Users className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">18</div>
							<p className="text-xs text-gray-400">3 new this month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Projects</CardTitle>
							<Folder className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">12</div>
							<p className="text-xs text-gray-400">8 in progress</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Revenue</CardTitle>
							<DollarSign className="h-4 w-4 text-yellow-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">$12.5k</div>
							<p className="text-xs text-gray-400">This month</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Active Projects</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Project management coming soon...</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Client Feedback</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Client reviews coming soon...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}