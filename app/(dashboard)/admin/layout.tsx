import { getSession } from "@/actions/session";
import { hasRole } from "@/lib/Authorization";
import { UserRole } from "@/types/auth.types";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	if (!session || !hasRole(session, [UserRole.ADMIN])) {
		redirect("/unauthorized");
	}
	return <>{children}</>;
}
