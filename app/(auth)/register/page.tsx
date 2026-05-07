"use client";
import { RegistrationFlow } from "@/components/(auth)/RegistrationFlow";
import Header from "@/components/layouts/Header";
import React from "react";

export default function RegisterPage() {
	return (
		<>
			<Header />
			<div className="pb-16"></div>
			<RegistrationFlow />
		</>
	);
}
