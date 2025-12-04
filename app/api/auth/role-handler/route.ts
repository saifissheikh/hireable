import { auth } from "@/auth";
import { getUserRole, createUserWithRole } from "@/lib/user-role";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return redirect("/");
  }

  const searchParams = request.nextUrl.searchParams;
  const intendedRole = searchParams.get("role") as "candidate" | "recruiter";
  const redirectUrl = searchParams.get("redirect") || "/";

  // Check if user already has a role
  const existingRole = await getUserRole(session.user.email);

  if (!existingRole && intendedRole) {
    // First time signing in - assign the role based on which page they came from
    await createUserWithRole(session.user.email, session.user.name || "", intendedRole);
    return redirect(redirectUrl);
  }

  if (existingRole) {
    // User already has a role - check if it matches the intended role
    if (existingRole === intendedRole) {
      // Role matches - allow access
      return redirect(redirectUrl);
    } else {
      // Role mismatch - redirect to unauthorized page
      if (intendedRole === "recruiter") {
        // Candidate trying to access recruiter page
        return redirect("/unauthorized");
      } else {
        // Recruiter trying to access candidate page
        return redirect("/access-denied");
      }
    }
  }

  // Fallback
  return redirect("/");
}
