import Link from "next/link";
import { Briefcase, Zap } from "lucide-react";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { getDirection } from "@/lib/i18n-config";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export async function Header() {
  const locale = await getLocale();
  const dir = getDirection(locale);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <Link className="flex items-center justify-center gap-2" href="/">
        <Briefcase className="h-6 w-6" />
        <span className="font-bold">{getContent("app.name", locale)}</span>
      </Link>
      <nav
        className={`${
          dir === "rtl" ? "mr-auto" : "ml-auto"
        } flex gap-4 sm:gap-6 items-center`}
      >
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold text-primary hover:text-primary hover:bg-primary/10 transition-all"
          asChild
        >
          <Link href="/pricing" className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            {getContent("footer.product.pricing", locale)}
          </Link>
        </Button>
        <ThemeToggle />
        <LanguageSwitcher currentLocale={locale} />
      </nav>
    </header>
  );
}
