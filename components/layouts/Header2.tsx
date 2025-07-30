"use client";
import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
		<header className="sticky top-0 backdrop-blur-sm z-20">
			<div className="flex justify-center items-center py-3 bg-black gap-3">
				<p className="text-white/60 hidden md:block"> Discover Your Next Opportunity</p>
				<div className="inline-flex gap-1 items-center text-white/80">
					<Link href={"/signup"}>Get Started for free</Link>
					<ArrowRight className=" h-4 w-4 inline-flex justify-center items-center" />
				</div>
			</div>
			<div className="py-5">
				<div className="container">
					<div className="flex items-center justify-between">
						<Image src={"/images/logo.jpg"} alt="Sass logo" height={40} width={40} />
						<Menu className="h-5 w-5 md:hidden" />
						<nav className="hidden md:flex gap-6 text-black/60 items-center">
							<Link href={"#"}>About</Link>
							<Link href={"#"}>Features</Link>
							<Link href={"#"}>Customers</Link>
							<Link href={"#"}>Updates</Link>
							<Link href={"#"}>Help</Link>

							<button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
								GEt for free
							</button>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};
