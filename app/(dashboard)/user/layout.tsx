import { getSession } from "@/actions/session";
import { hasRole } from "@/lib/Authorization";
import { Role } from "@/types/auth.type";
import { redirect } from "next/navigation";

export default async function UserEmployeeLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	console.log(session, "user session in User DAshboard");
	if (!session || !hasRole(session, [Role.USER])) {
		redirect("/unauthorized");
	}
	return <>{children}</>;
}
