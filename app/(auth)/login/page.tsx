"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/actions/auth.action";
import { LoginFormSchema } from "@/types/auth.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginPage from "@/components/(auth)/Login";

const Login = () => {
	return <LoginPage />;
};

export default Login;
