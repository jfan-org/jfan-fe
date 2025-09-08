import { Suspense } from "react";
import LoginPage from "@/components/(auth)/Login";

const Login = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginPage />
		</Suspense>
	);
};

export default Login;
