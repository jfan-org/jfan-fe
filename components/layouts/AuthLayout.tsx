import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
	showBackButton?: boolean;
	backHref?: string;
}

export function AuthLayout({ children, title, subtitle, showBackButton = false, backHref = "/login" }: AuthLayoutProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-800 to-yellow-600 relative overflow-hidden  ">
			{/* Background decorative elements */}
			<div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
			<div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
			<div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-400 rounded-full opacity-20"></div>
			<div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>

			<div className="relative z-10 flex min-h-screen items-center justify-center p-4">
				<div className="w-full max-w-md ">
					{/* Logo */}
					<div className="mb-8 text-center">
						<Link href="/" className="inline-flex items-center space-x-2 text-white">
							<Image src={"/images/logo.jpg"} alt="JFAN Logo" height={100} width={200} />
						</Link>
					</div>

					{/* Auth Card */}
					<div className="rounded-2xl bg-white p-8 shadow-xl">
						{showBackButton && (
							<Link
								href={backHref}
								className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
								← Back
							</Link>
						)}

						<div className="mb-8 text-center">
							<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
							<p className="mt-2 text-sm text-gray-600">{subtitle}</p>
						</div>

						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
