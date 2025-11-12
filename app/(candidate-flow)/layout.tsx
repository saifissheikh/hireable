import { ProfileHeader } from "@/components/profile-header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
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
