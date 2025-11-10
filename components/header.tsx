import Link from "next/link";
import { Briefcase } from "lucide-react";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { getDirection } from "@/lib/i18n-config";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export async function Header() {
  const locale = await getLocale();
  const dir = getDirection(locale);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 bg-background z-50">
      <Link className="flex items-center justify-center" href="/">
        <Briefcase className="h-6 w-6 mr-2" />
        <span className="font-bold">{getContent("app.name", locale)}</span>
      </Link>
      <nav className={`${dir === 'rtl' ? 'mr-auto' : 'ml-auto'} flex gap-4 sm:gap-6 items-center`}>
        <ThemeToggle />
        <LanguageSwitcher currentLocale={locale} />
      </nav>
    </header>
  );
}
