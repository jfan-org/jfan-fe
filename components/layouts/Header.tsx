// // components/layout/Header.tsx
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { MapPin, Menu, X, Bell, User, Settings, LogOut, Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// interface User {
// 	id: string;
// 	name: string;
// 	email: string;
// 	avatar?: string;
// }

// interface HeaderProps {
// 	user?: User | null;
// 	onLogout?: () => Promise<void>;
// }

// export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
// 	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// 	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
// 	const router = useRouter();

// 	const handleLogout = async () => {
// 		if (onLogout) {
// 			await onLogout();
// 		}
// 		setIsUserMenuOpen(false);
// 	};

// 	const navigation = [
// 		{ name: "Browse Jobs", href: "/jobs" },
// 		{ name: "Companies", href: "/companies" },
// 		{ name: "Career Advice", href: "/career-advice" },
// 		{ name: "Salary Guide", href: "/salary-guide" },
// 	];

// 	return (
// 		<header className="shadow-sm border-b sticky top-0 z-40 backdrop-blur-xl">
// 			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// 				<div className="flex justify-between items-center h-16">
// 					{/* Logo */}
// 					<Link href="/" className="flex items-center space-x-3 group">
// 						<Image src={"/images/logo.svg"} width={200} height={100} alt="jfan logo" />
// 					</Link>

// 					{/* Desktop Navigation */}
// 					<nav className="hidden md:flex items-center space-x-8">
// 						{navigation.map((item) => (
// 							<Link
// 								key={item.name}
// 								href={item.href}
// 								className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group">
// 								{item.name}
// 								<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
// 							</Link>
// 						))}
// 					</nav>

// 					{/* Right side */}
// 					<div className="flex items-center space-x-4">
// 						{user ? (
// 							// Authenticated user menu
// 							<div className="flex items-center space-x-3">
// 								{/* Quick search for authenticated users */}
// 								<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
// 									<Search className="w-5 h-5" />
// 								</button>

// 								{/* Notifications */}
// 								<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
// 									<Bell className="w-5 h-5" />
// 									<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
// 										3
// 									</span>
// 								</button>

// 								{/* User dropdown */}
// 								<div className="relative">
// 									<button
// 										onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
// 										className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
// 										{user.avatar ? (
// 											<Image
// 												src={user.avatar}
// 												alt={user.name}
// 												fill
// 												className="w-8 h-8 rounded-lg object-cover"
// 											/>
// 										) : (
// 											<div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-lg flex items-center justify-center">
// 												<User className="w-4 h-4 text-white" />
// 											</div>
// 										)}
// 										<span className="hidden sm:block text-sm font-medium text-gray-700">
// 											{user.name.split(" ")[0]}
// 										</span>
// 									</button>

// 									{/* Dropdown menu */}
// 									{isUserMenuOpen && (
// 										<>
// 											<div
// 												className="fixed inset-0 z-10"
// 												onClick={() => setIsUserMenuOpen(false)}
// 											/>
// 											<div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
// 												<div className="px-4 py-3 border-b border-gray-100">
// 													<p className="text-sm font-medium text-gray-900">
// 														{user.name}
// 													</p>
// 													<p className="text-sm text-gray-500 truncate">
// 														{user.email}
// 													</p>
// 												</div>

// 												<Link
// 													href="/dashboard"
// 													className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
// 													onClick={() => setIsUserMenuOpen(false)}>
// 													<User className="w-4 h-4 mr-3" />
// 													Dashboard
// 												</Link>

// 												<Link
// 													href="/profile"
// 													className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
// 													onClick={() => setIsUserMenuOpen(false)}>
// 													<Settings className="w-4 h-4 mr-3" />
// 													Profile Settings
// 												</Link>

// 												<button
// 													onClick={handleLogout}
// 													className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
// 													<LogOut className="w-4 h-4 mr-3" />
// 													Sign Out
// 												</button>
// 											</div>
// 										</>
// 									)}
// 								</div>
// 							</div>
// 						) : (
// 							// Guest user buttons
// 							<div className="flex items-center space-x-3">
// 								<Link
// 									href="/login"
// 									className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
// 									Sign In
// 								</Link>
// 								<Link
// 									href="/signup"
// 									className="bg-gradient-to-r from-emerald-500 to-amber-400 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
// 									Join Now
// 								</Link>
// 							</div>
// 						)}

// 						{/* Mobile menu button */}
// 						<button
// 							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// 							className="md:hidden p-2 text-gray-600 hover:text-gray-900">
// 							{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// 						</button>
// 					</div>
// 				</div>

// 				{/* Mobile menu */}
// 				{isMobileMenuOpen && (
// 					<div className="md:hidden border-t border-gray-200 py-4">
// 						<nav className="space-y-2">
// 							{navigation.map((item) => (
// 								<Link
// 									key={item.name}
// 									href={item.href}
// 									className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
// 									onClick={() => setIsMobileMenuOpen(false)}>
// 									{item.name}
// 								</Link>
// 							))}

// 							{!user && (
// 								<div className="px-4 pt-4 border-t border-gray-200 mt-4 space-y-2">
// 									<Link
// 										href="/login"
// 										className="block w-full text-center py-2 text-gray-600 hover:text-gray-900 font-medium"
// 										onClick={() => setIsMobileMenuOpen(false)}>
// 										Sign In
// 									</Link>
// 									<Link
// 										href="/signup"
// 										className="block w-full text-center py-2 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-lg font-medium"
// 										onClick={() => setIsMobileMenuOpen(false)}>
// 										Join Now
// 									</Link>
// 								</div>
// 							)}
// 						</nav>
// 					</div>
// 				)}
// 			</div>
// 		</header>
// 	);
// };

// export default Header;

// components/Layout/Header.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { africanCountries } from "../../lib/constants";
import { NavItem } from "../../types";

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
	const [selectedCountry, setSelectedCountry] = useState<string>("");

	const navItems: NavItem[] = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Regions", href: "/regions" },
		{ name: "Communities", href: "/communities" },
		{ name: "Jobs", href: "/jobs" },
		{ name: "Contact", href: "/contact" },
		{ name: "Register", href: "/register" },
	];

	const handleCountrySelect = (country: string): void => {
		setSelectedCountry(country);
		setShowCountryDropdown(false);
	};

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/">
						<motion.div className="flex items-center space-x-3 cursor-pointer" whileHover={{ scale: 1.05 }}>
							<div className="w-10 h-10 bg-gradient-to-br from-green-400 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-gray-900">
								JF
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
								JFAN
							</span>
						</motion.div>
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item: NavItem) => (
							<Link key={item.name} href={item.href}>
								<motion.span
									className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									{item.name}
								</motion.span>
							</Link>
						))}

						{/* Country Selector */}
						<div className="relative">
							<motion.button
								onClick={() => setShowCountryDropdown(!showCountryDropdown)}
								className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800"
								whileHover={{ scale: 1.05 }}>
								<Globe className="w-4 h-4" />
								<span>Countries</span>
								<ChevronDown className="w-4 h-4" />
							</motion.button>

							<AnimatePresence>
								{showCountryDropdown && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
										{africanCountries.map((country: string) => (
											<button
												key={country}
												onClick={() => handleCountrySelect(country)}
												className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
												{country}
											</button>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
							{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-gray-800 border-t border-gray-700">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navItems.map((item: NavItem) => (
								<Link key={item.name} href={item.href}>
									<span
										className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
										onClick={() => setIsMenuOpen(false)}>
										{item.name}
									</span>
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
};

export default Header;
