import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">{children}</div>
		</div>
	);
}
