"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/actions/auth.action";
import { LoginFormSchema } from "@/types/auth.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
	const router = useRouter();
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validation = LoginFormSchema.safeParse(formState);

		if (!validation.success) {
			setError(validation.error.flatten().fieldErrors);
			return;
		}

		const result = await signIn(undefined, new FormData(e.target));

		console.log(result);
		if (result?.message) {
			setError(result.message);
		} else {
			router.push("/");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-2xl font-bold">Login</h1>
			<form onSubmit={handleSubmit} className="w-full max-w-sm">
				{error && <div className="text-red-500">{error}</div>}
				<div className="mb-4">
					<Label htmlFor="email">Email</Label>
					<Input type="email" name="email" id="email" value={formState.email} onChange={handleChange} required />
				</div>
				<div className="mb-4">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						name="password"
						id="password"
						value={formState.password}
						onChange={handleChange}
						required
					/>
				</div>
				<Button type="submit" className="w-full">
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;
