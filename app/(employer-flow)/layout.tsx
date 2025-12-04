import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile-header";
import { getUserRole } from "@/lib/user-role";

export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // Check if user is a recruiter
  const userRole = await getUserRole();
  
  if (userRole === "candidate") {
    // Candidates cannot access employer routes
    redirect("/unauthorized");
  }

  if (!userRole) {
    // No role assigned yet - shouldn't happen, but redirect to home
    redirect("/");
  }

  return (
    <>
      <ProfileHeader session={session} homeUrl="/dashboard" />
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}
