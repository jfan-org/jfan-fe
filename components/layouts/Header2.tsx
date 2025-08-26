"use client";
import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

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
	const userMenuRef = useRef<HTMLDivElement>(null);

	// Debug: Log user state
	console.log("Header - User state:", user);

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setIsUserMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

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
		<header className="sticky top-0 backdrop-blur-sm z-20 bg-white border-b border-gray-200">
			<div className="flex justify-center items-center py-3 bg-black gap-3">
				<p className="text-white/60 hidden md:block"> Discover Your Next Opportunity</p>
				{!user && (
					<div className="inline-flex gap-1 items-center text-white/80">
						<Link href={"/signup"}>Get Started for free</Link>
						<ArrowRight className=" h-4 w-4 inline-flex justify-center items-center" />
					</div>
				)}
			</div>
			<div className="py-5">
				<div className="container">
					<div className="flex items-center justify-between">
						<Image src={"/images/logo.jpg"} alt="Sass logo" height={40} width={40} />
						<Menu 
							className="h-5 w-5 md:hidden text-gray-700 hover:text-black" 
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						/>
						<nav className="hidden md:flex gap-6 text-gray-700 items-center">
							{navigation.map((item) => (
								<Link key={item.name} href={item.href} className="hover:text-black transition-colors">
									{item.name}
								</Link>
							))}

							{user ? (
								<div className="relative" ref={userMenuRef}>
									<button
										onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
										className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
										<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
											{user.name.charAt(0).toUpperCase()}
										</div>
										<span className="font-medium">{user.name}</span>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
										</svg>
									</button>
									
									{isUserMenuOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
											<Link 
												href="/profile" 
												className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
												onClick={() => setIsUserMenuOpen(false)}>
												<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
												</svg>
												Profile
											</Link>
											<Link 
												href="/dashboard" 
												className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
												onClick={() => setIsUserMenuOpen(false)}>
												<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
												</svg>
												Dashboard
											</Link>
											<hr className="my-1 border-gray-200" />
											<button
												onClick={handleLogout}
												className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
												<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
												</svg>
												Sign out
											</button>
										</div>
									)}
								</div>
							) : (
								<div className="flex items-center space-x-4">
									<Link href="/login" className="text-gray-700 hover:text-black transition-colors">
										Sign in
									</Link>
									<button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-gray-800 transition-colors">
										Get for free
									</button>
								</div>
							)}
						</nav>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-white border-t border-gray-200">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
								onClick={() => setIsMobileMenuOpen(false)}>
								{item.name}
							</Link>
						))}
						
						{user ? (
							<div className="border-t border-gray-200 pt-4">
								<div className="flex items-center px-3 py-2">
									<div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
										{user.name.charAt(0).toUpperCase()}
									</div>
									<div className="ml-3">
										<div className="text-base font-medium text-gray-800">{user.name}</div>
										<div className="text-sm font-medium text-gray-500">{user.email}</div>
									</div>
								</div>
								<Link
									href="/profile"
									className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
									onClick={() => setIsMobileMenuOpen(false)}>
									Profile
								</Link>
								<Link
									href="/dashboard"
									className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
									onClick={() => setIsMobileMenuOpen(false)}>
									Dashboard
								</Link>
								<button
									onClick={() => {
										handleLogout();
										setIsMobileMenuOpen(false);
									}}
									className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
									Sign out
								</button>
							</div>
						) : (
							<div className="border-t border-gray-200 pt-4 space-y-1">
								<Link
									href="/login"
									className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
									onClick={() => setIsMobileMenuOpen(false)}>
									Sign in
								</Link>
								<Link
									href="/signup"
									className="block px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-800 rounded-lg mx-3"
									onClick={() => setIsMobileMenuOpen(false)}>
									Get Started for free
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
};
