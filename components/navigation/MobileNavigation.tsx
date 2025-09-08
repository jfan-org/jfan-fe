"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Settings, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Session } from "@/actions/session";
import { getFullNavigation, NavigationItem, NavigationSection } from "@/lib/navigation.config";
import { getUserTypeConfig } from "@/lib/user-types.config";

interface MobileNavigationProps {
	session: Session;
	onLogout?: () => void;
}

// Icon mapping for navigation items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	Home,
	User,
	Settings,
	Menu,
	X,
	// Add more icons as needed
};

function NavigationIcon({ iconName, className }: { iconName: string; className?: string }) {
	const IconComponent = iconMap[iconName] || Home;
	return <IconComponent className={className} />;
}

function MobileNavigationItem({ item, isActive, onItemClick }: { item: NavigationItem; isActive: boolean; onItemClick: () => void }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const hasChildren = item.children && item.children.length > 0;

	return (
		<div className="space-y-1">
			<Link
				href={item.href}
				onClick={onItemClick}
				className={cn(
					"flex items-center justify-between w-full p-3 rounded-lg text-left transition-all duration-200 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1",
					isActive ? "bg-green-100 text-green-700 font-medium" : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
				)}
				aria-current={isActive ? "page" : undefined}
				aria-describedby={item.description ? `${item.name.replace(/\s+/g, "-").toLowerCase()}-desc` : undefined}>
				<div className="flex items-center space-x-3">
					<NavigationIcon iconName={item.icon} className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
					<div className="flex-1 min-w-0">
						<p className="mobile-text-base font-medium truncate">{item.name}</p>
						{item.description && (
							<p
								id={`${item.name.replace(/\s+/g, "-").toLowerCase()}-desc`}
								className="mobile-text-sm text-gray-500 truncate">
								{item.description}
							</p>
						)}
					</div>
				</div>
				{hasChildren && (
					<button
						onClick={(e) => {
							e.preventDefault();
							setIsExpanded(!isExpanded);
						}}
						className="p-1 rounded-md hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1"
						aria-expanded={isExpanded}
						aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.name} submenu`}>
						{isExpanded ? (
							<ChevronDown className="w-4 h-4" aria-hidden="true" />
						) : (
							<ChevronRight className="w-4 h-4" aria-hidden="true" />
						)}
					</button>
				)}
				{item.badge && (
					<span
						className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full"
						aria-label={`${item.badge} notifications`}>
						{item.badge}
					</span>
				)}
			</Link>

			{/* Children items */}
			<AnimatePresence>
				{hasChildren && isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="ml-8 space-y-1 overflow-hidden">
						{item.children?.map((child) => (
							<MobileNavigationItem
								key={child.href}
								item={child}
								isActive={isActive}
								onItemClick={onItemClick}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function NavigationSection({ section, currentPath, onItemClick }: { section: NavigationSection; currentPath: string; onItemClick: () => void }) {
	return (
		<div className="space-y-2">
			<h3 className="px-3 mobile-text-sm font-semibold text-gray-500 uppercase tracking-wider">{section.title}</h3>
			<div className="space-y-1">
				{section.items.map((item) => (
					<MobileNavigationItem
						key={item.href}
						item={item}
						isActive={currentPath === item.href}
						onItemClick={onItemClick}
					/>
				))}
			</div>
		</div>
	);
}

export function MobileNavigation({ session, onLogout }: MobileNavigationProps) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const userTypeConfig = getUserTypeConfig(session.user.userType);
	const navigation = getFullNavigation(session.user.userType);

	const handleItemClick = () => {
		setIsOpen(false);
	};

	const handleLogout = () => {
		setIsOpen(false);
		onLogout?.();
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="min-h-[44px] min-w-[44px] flex items-center justify-center md:hidden"
					aria-label="Open navigation menu">
					<Menu className="w-6 h-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-80 p-0 overflow-y-auto">
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="p-4 border-b border-gray-200">
						<div className="flex items-center space-x-3">
							<div
								className={cn(
									"w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
									userTypeConfig?.bgColor || "bg-gray-500"
								)}>
								{session.user.name.charAt(0).toUpperCase()}
							</div>
							<div className="flex-1 min-w-0">
								<p className="mobile-text-base font-semibold text-gray-900 truncate">
									{session.user.name}
								</p>
								<p className="mobile-text-sm text-gray-500 truncate capitalize">
									{session.user.userType}
								</p>
							</div>
						</div>
					</div>

					{/* Navigation Content */}
					<div className="flex-1 p-4 space-y-6">
						{/* Base Navigation */}
						<div className="space-y-1">
							{navigation.base.map((item) => (
								<MobileNavigationItem
									key={item.href}
									item={item}
									isActive={pathname === item.href}
									onItemClick={handleItemClick}
								/>
							))}
						</div>

						{/* User Type Sections */}
						{navigation.sections.map((section) => (
							<div key={section.title}>
								<Separator className="mb-4" />
								<NavigationSection
									section={section}
									currentPath={pathname}
									onItemClick={handleItemClick}
								/>
							</div>
						))}

						{/* Settings */}
						{navigation.settings.length > 0 && (
							<div>
								<Separator className="mb-4" />
								<div className="space-y-1">
									{navigation.settings.map((item) => (
										<MobileNavigationItem
											key={item.href}
											item={item}
											isActive={pathname === item.href}
											onItemClick={handleItemClick}
										/>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="p-4 border-t border-gray-200">
						<Button
							variant="ghost"
							onClick={handleLogout}
							className="w-full justify-start min-h-[44px] min-w-[44px] flex items-center text-red-600 hover:text-red-700 hover:bg-red-50">
							<LogOut className="w-5 h-5 mr-3" />
							<span className="mobile-text-base">Sign Out</span>
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

// Bottom navigation for mobile (alternative approach)
export function MobileBottomNavigation({ session }: { session: Session }) {
	const pathname = usePathname();
	const navigation = getFullNavigation(session.user.userType);

	// Get the most important navigation items for bottom nav
	const bottomNavItems = [
		...navigation.base.slice(0, 2), // Dashboard and Profile
		...navigation.sections.flatMap((section) => section.items).slice(0, 2), // First 2 from sections
		...navigation.settings.slice(0, 1), // Settings
	].slice(0, 5); // Max 5 items for bottom nav

	return (
		<div className="mobile-nav md:hidden">
			<div className="flex justify-around">
				{bottomNavItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"mobile-nav-item",
								isActive
									? "text-green-600 bg-green-50"
									: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
							)}>
							<NavigationIcon iconName={item.icon} className="w-5 h-5 mb-1" />
							<span className="truncate max-w-[60px]">{item.name}</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
