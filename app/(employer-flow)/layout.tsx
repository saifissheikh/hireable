import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile-header";

export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // TODO: Check if user is an employer
  // If not employer, redirect appropriately

  return (
    <>
      <ProfileHeader session={session} />
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}
