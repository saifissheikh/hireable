import Link from "next/link";
import { Briefcase } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOut } from "@/auth";
import { Session } from "next-auth";

interface ProfileHeaderProps {
  session: Session;
  homeUrl?: string;
}

export async function ProfileHeader({
  session,
  homeUrl = "/profile",
}: ProfileHeaderProps) {
  const locale = await getLocale();

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        {/* Logo */}
        <Link href={homeUrl} className="flex items-center gap-2 shrink-0">
          <Briefcase className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-lg md:text-xl font-bold">
            {getContent("app.name", locale)}
          </span>
        </Link>

        {/* Right Side Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
          {/* Theme and Language Toggles */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* User Info - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-sm font-medium max-w-[120px] truncate">
              {session.user?.name}
            </span>
          </div>

          {/* Sign Out Button */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button
              variant="outline"
              type="submit"
              size="sm"
              className="text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">
                {getContent("app.header.signOutButton", locale)}
              </span>
              <span className="sm:hidden">Sign Out</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
