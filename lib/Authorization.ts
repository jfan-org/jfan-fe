import { Role } from "@/types/auth.type";
import { Session } from "@/actions/session";

export function hasRole(session: Session | null, allowed: Role[]) {
	if (!session) return false;
	return allowed.includes(session.user.role);
}
