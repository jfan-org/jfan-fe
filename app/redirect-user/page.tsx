import { getSession } from "@/actions/session";
import { Role } from "@/types/auth.type";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
	const session = await getSession();
	console.log(session, "SEssion from REdicred");
	if (!session) {
		redirect("/auth/login");
	}
	switch (session.user.role) {
		case Role.ADMIN:
			redirect("/admin");
		case Role.EMPLOYER:
			redirect("/employer");
		case Role.USER:
			redirect("/user");
		default:
			redirect("/");
	}
}
