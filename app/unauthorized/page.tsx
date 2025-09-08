import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<AlertTriangle className="h-6 w-6 text-red-600" />
					</div>
					<CardTitle className="text-2xl font-bold text-gray-900">Access Denied</CardTitle>
					<CardDescription className="text-gray-600">You don&apos;t have permission to access this page.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-gray-500 text-center">
						This page is restricted to certain user types or roles. Please contact your administrator if you
						believe this is an error.
					</p>
					<div className="flex flex-col gap-2">
						<Button asChild className="w-full">
							<Link href="/redirect-user">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Go to Dashboard
							</Link>
						</Button>
						<Button variant="outline" asChild className="w-full">
							<Link href="/">Go to Home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
