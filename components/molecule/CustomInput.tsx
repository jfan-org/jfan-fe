"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const isPassword = type === "password";

	return (
		<div className="space-y-2">
			{label && <label className="text-sm font-medium text-gray-700">{label}</label>}
			<div className="relative">
				<input
					type={isPassword && showPassword ? "text" : type}
					className={cn(
						"flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-red-500 focus-visible:ring-red-500",
						className
					)}
					ref={ref}
					{...props}
				/>
				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
						{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
					</button>
				)}
			</div>
			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
});
CustomInput.displayName = "CustomInput";

export { CustomInput };
