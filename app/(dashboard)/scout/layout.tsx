import { getSession } from "@/actions/session";
import { hasUserType, hasRole } from "@/lib/Authorization";
import { UserType, UserRole } from "@/types/auth.types";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export default async function ScoutDashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	
	if (!session || (!hasUserType(session, [UserType.SCOUT]) && !hasRole(session, [UserRole.ADMIN]))) {
		redirect("/unauthorized");
	}
	
	return (
		<DashboardLayout session={session}>
			{children}
		</DashboardLayout>
	);
}