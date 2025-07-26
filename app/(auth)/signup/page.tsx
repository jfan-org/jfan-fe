import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth.action";
import { SignupFormSchema } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Signup = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SignupFormSchema),
	});

	const onSubmit = async (data: any) => {
		const result = await signUp(undefined, data);
		if (result?.error) {
			setError(result.error);
		} else {
			router.push("/auth/login");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-2xl font-bold">Sign Up</h1>
			{error && <p className="text-red-500">{error}</p>}
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
				<div className="mb-4">
					<Label htmlFor="name">Name</Label>
					<Input id="name" {...register("name")} />
					{errors.name && <p className="text-red-500">{errors.name.message}</p>}
				</div>
				<div className="mb-4">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" {...register("email")} />
					{errors.email && <p className="text-red-500">{errors.email.message}</p>}
				</div>
				<div className="mb-4">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" {...register("password")} />
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
				</div>
				<Button type="submit" className="w-full">
					Sign Up
				</Button>
			</form>
			<p className="mt-4">
				Already have an account?{" "}
				<Link href="/auth/login" className="text-blue-500">
					Log in
				</Link>
			</p>
		</div>
	);
};

export default Signup;
