import { getSession } from "@/actions/session";
import { hasRole } from "@/lib/Authorization";
import { Role } from "@/types/auth.type";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	if (!session || !hasRole(session, [Role.ADMIN])) {
		redirect("/unauthorized");
	}
	return <>{children}</>;
}
