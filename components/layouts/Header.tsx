// components/Layout/Header.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { africanCountries } from "../../lib/constants";
import { NavItem } from "../../types";
import Image from "next/image";

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
							<Image src="/images/logo.svg" alt="JFAN Logo" width={150} height={10} />
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
