import { ProfileHeader } from "@/components/profile-header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/user-role";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // Check if user is a candidate
  const userRole = await getUserRole();
  
  if (userRole === "recruiter") {
    // Recruiters cannot access candidate routes
    redirect("/access-denied");
  }

  if (!userRole) {
    // No role assigned yet - shouldn't happen, but redirect to home
    redirect("/");
  }

  return (
    <>
      <ProfileHeader session={session} />
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}
