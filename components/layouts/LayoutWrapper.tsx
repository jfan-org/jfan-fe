// components/layout/LayoutWrapper.tsx
"use client";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
// import { Header } from "./Header2";j
import Header from "./Header";
import { getSession } from "@/actions/session";
import { signOut } from "@/actions/auth.action";

interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

interface LayoutWrapperProps {
	children: React.ReactNode;
	user?: User | null;
	onLogout?: () => Promise<void>;
	showHeader?: boolean;
	showFooter?: boolean;
	className?: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
	children,
	user: propUser,
	onLogout: propOnLogout,
	showHeader = true,
	showFooter = true,
	className = "",
}) => {
	const [sessionUser, setSessionUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch session data on component mount
	useEffect(() => {
		const fetchSession = async () => {
			try {
				const session = await getSession();
				if (session) {
					setSessionUser({
						id: session.user.id,
						name: session.user.name,
						email: session.user.email,
					});
				}
			} catch (error) {
				console.error("Error fetching session:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSession();
	}, []);

	// Handle logout
	const handleLogout = async () => {
		if (propOnLogout) {
			await propOnLogout();
		} else {
			await signOut();
		}
		setSessionUser(null);
	};

	// Use prop user if provided, otherwise use session user
	const user = propUser || sessionUser;

	return (
		<div className={`min-h-screen flex flex-col ${className}`}>
			{showHeader && <Header />}

			<main className="flex-1">{children}</main>

			{showFooter && <Footer />}
		</div>
	);
};

export default LayoutWrapper;
