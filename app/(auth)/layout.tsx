import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-0 bg-gray-100">
			<div className="w-full   bg-white rounded-lg shadow-md">{children}</div>
		</div>
	);
}
