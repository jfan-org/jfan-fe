import { getSession } from "@/actions/session";
import { hasRole } from "@/lib/Authorization";
import { redirect } from "next/navigation";
import { Role } from "@/types/auth.type";
export default async function EmployerLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	if (!session || !hasRole(session, [Role.EMPLOYER])) {
		redirect("/unauthorized");
	}
	return <>{children}</>;
}
