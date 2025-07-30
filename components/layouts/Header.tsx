// components/layout/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Menu, X, Bell, User, Settings, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

interface HeaderProps {
	user?: User | null;
	onLogout?: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		if (onLogout) {
			await onLogout();
		}
		setIsUserMenuOpen(false);
	};

	const navigation = [
		{ name: "Browse Jobs", href: "/jobs" },
		{ name: "Companies", href: "/companies" },
		{ name: "Career Advice", href: "/career-advice" },
		{ name: "Salary Guide", href: "/salary-guide" },
	];

	return (
		<header className="shadow-sm border-b sticky top-0 z-40 backdrop-blur-xl">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-3 group">
						<Image src={"/images/logo.svg"} width={200} height={100} alt="jfan logo" />
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group">
								{item.name}
								<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
							</Link>
						))}
					</nav>

					{/* Right side */}
					<div className="flex items-center space-x-4">
						{user ? (
							// Authenticated user menu
							<div className="flex items-center space-x-3">
								{/* Quick search for authenticated users */}
								<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
									<Search className="w-5 h-5" />
								</button>

								{/* Notifications */}
								<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
									<Bell className="w-5 h-5" />
									<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
										3
									</span>
								</button>

								{/* User dropdown */}
								<div className="relative">
									<button
										onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
										className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
										{user.avatar ? (
											<Image
												src={user.avatar}
												alt={user.name}
												fill
												className="w-8 h-8 rounded-lg object-cover"
											/>
										) : (
											<div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-lg flex items-center justify-center">
												<User className="w-4 h-4 text-white" />
											</div>
										)}
										<span className="hidden sm:block text-sm font-medium text-gray-700">
											{user.name.split(" ")[0]}
										</span>
									</button>

									{/* Dropdown menu */}
									{isUserMenuOpen && (
										<>
											<div
												className="fixed inset-0 z-10"
												onClick={() => setIsUserMenuOpen(false)}
											/>
											<div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
												<div className="px-4 py-3 border-b border-gray-100">
													<p className="text-sm font-medium text-gray-900">
														{user.name}
													</p>
													<p className="text-sm text-gray-500 truncate">
														{user.email}
													</p>
												</div>

												<Link
													href="/dashboard"
													className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
													onClick={() => setIsUserMenuOpen(false)}>
													<User className="w-4 h-4 mr-3" />
													Dashboard
												</Link>

												<Link
													href="/profile"
													className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
													onClick={() => setIsUserMenuOpen(false)}>
													<Settings className="w-4 h-4 mr-3" />
													Profile Settings
												</Link>

												<button
													onClick={handleLogout}
													className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
													<LogOut className="w-4 h-4 mr-3" />
													Sign Out
												</button>
											</div>
										</>
									)}
								</div>
							</div>
						) : (
							// Guest user buttons
							<div className="flex items-center space-x-3">
								<Link
									href="/login"
									className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
									Sign In
								</Link>
								<Link
									href="/signup"
									className="bg-gradient-to-r from-emerald-500 to-amber-400 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
									Join Now
								</Link>
							</div>
						)}

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="md:hidden p-2 text-gray-600 hover:text-gray-900">
							{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden border-t border-gray-200 py-4">
						<nav className="space-y-2">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}>
									{item.name}
								</Link>
							))}

							{!user && (
								<div className="px-4 pt-4 border-t border-gray-200 mt-4 space-y-2">
									<Link
										href="/login"
										className="block w-full text-center py-2 text-gray-600 hover:text-gray-900 font-medium"
										onClick={() => setIsMobileMenuOpen(false)}>
										Sign In
									</Link>
									<Link
										href="/signup"
										className="block w-full text-center py-2 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-lg font-medium"
										onClick={() => setIsMobileMenuOpen(false)}>
										Join Now
									</Link>
								</div>
							)}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
