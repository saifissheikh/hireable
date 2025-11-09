import Link from "next/link";
import { Briefcase } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { LanguageSwitcher } from "@/components/language-switcher";
import { signOut } from "@/auth";
import { Session } from "next-auth";

interface DashboardHeaderProps {
  session: Session;
}

export async function DashboardHeader({ session }: DashboardHeaderProps) {
  const locale = await getLocale();

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          <span className="text-xl font-bold">{getContent("app.name", locale)}</span>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />
          <div className="flex items-center gap-2">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-sm font-medium">{session.user?.name}</span>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="outline" type="submit">
              {getContent("dashboard.header.signOutButton", locale)}
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
