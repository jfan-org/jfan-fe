import { getSession } from "@/actions/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, Folder, AlertTriangle } from "lucide-react";

export default async function CyberAgentDashboard() {
	const session = await getSession();

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-2">
						Welcome back, {session?.user.name}
					</h1>
					<p className="text-gray-400">Your cybersecurity services dashboard</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Active Services</CardTitle>
							<Shield className="h-4 w-4 text-purple-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">8</div>
							<p className="text-xs text-gray-400">+2 this month</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Assessments</CardTitle>
							<CheckCircle className="h-4 w-4 text-green-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">24</div>
							<p className="text-xs text-gray-400">3 pending</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Projects</CardTitle>
							<Folder className="h-4 w-4 text-blue-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">12</div>
							<p className="text-xs text-gray-400">5 in progress</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">Alerts</CardTitle>
							<AlertTriangle className="h-4 w-4 text-red-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-white">3</div>
							<p className="text-xs text-gray-400">Require attention</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Recent Projects</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Project management coming soon...</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-800 border-gray-700">
						<CardHeader>
							<CardTitle className="text-white">Security Metrics</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-400">Security dashboard coming soon...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}