// components/layout/LayoutWrapper.tsx
import React from "react";
// import { Header } from "./Header";
import Footer from "./Footer";
import Header from "./Header";

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

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, user, onLogout, showHeader = true, showFooter = true, className = "" }) => {
	return (
		<div className={`min-h-screen flex flex-col ${className}`}>
			{showHeader && <Header user={user} onLogout={onLogout} />}

			<main className="flex-1">{children}</main>

			{showFooter && <Footer />}
		</div>
	);
};

export default LayoutWrapper;
