// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// interface AuthLayoutProps {
// 	children: React.ReactNode;
// 	title: string;
// 	subtitle: string;
// 	showBackButton?: boolean;
// 	backHref?: string;
// }

// export function AuthLayout({ children, title, subtitle, showBackButton = false, backHref = "/login" }: AuthLayoutProps) {
// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-800 to-yellow-600 relative overflow-hidden  ">
// 			{/* Background decorative elements */}
// 			<div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
// 			<div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
// 			<div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-400 rounded-full opacity-20"></div>
// 			<div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>

// 			<div className="relative z-10 flex min-h-screen items-center justify-center p-4">
// 				<div className="w-full max-w-md ">
// 					{/* Logo */}
// 					<div className="mb-8 text-center">
// 						<Link href="/" className="inline-flex items-center space-x-2 text-white">
// 							<Image src={"/images/logo.jpg"} alt="JFAN Logo" height={100} width={200} />
// 						</Link>
// 					</div>

// 					{/* Auth Card */}
// 					<div className="rounded-2xl bg-white p-8 shadow-xl">
// 						{showBackButton && (
// 							<Link
// 								href={backHref}
// 								className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
// 								← Back
// 							</Link>
// 						)}

// 						<div className="mb-8 text-center">
// 							<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
// 							<p className="mt-2 text-sm text-gray-600">{subtitle}</p>
// 						</div>

// 						{children}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// components/layout/AuthLayout.tsx
import React from "react";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle?: string;
	showBackToHome?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, showBackToHome = true }) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center p-4">
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200 to-transparent rounded-full opacity-20 blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200 to-transparent rounded-full opacity-20 blur-3xl" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100 to-orange-100 rounded-full opacity-10 blur-3xl" />
			</div>

			<div className="relative w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					{/* Logo */}
					<Link href="/" className="inline-flex items-center justify-center space-x-3 mb-6 group">
						<div className="relative">
							<div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
								<MapPin className="w-7 h-7 text-white" />
							</div>
							<div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
						</div>
						<div>
							<h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
								African Job Atlas
							</h1>
							<p className="text-xs text-muted-foreground">Connecting Africa's Talent</p>
						</div>
					</Link>

					{/* Back to Home */}
					{showBackToHome && (
						<div className="mb-6">
							<Button variant="ghost" size="sm" asChild>
								<Link href="/" className="text-muted-foreground hover:text-foreground">
									<ArrowLeft className="w-4 h-4 mr-2" />
									Back to Home
								</Link>
							</Button>
						</div>
					)}

					{/* Title and Subtitle */}
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-foreground">{title}</h2>
						{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
					</div>
				</div>

				{/* Auth Form Card */}
				<Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
					<CardContent className="p-8">{children}</CardContent>
				</Card>

				{/* Footer Links */}
				<div className="mt-8 text-center">
					<div className="flex justify-center space-x-6 text-sm">
						<Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
							Privacy Policy
						</Link>
						<Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
							Terms of Service
						</Link>
						<Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
							Help
						</Link>
					</div>
					<p className="text-xs text-muted-foreground mt-4">© 2025 African Job Atlas. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};
