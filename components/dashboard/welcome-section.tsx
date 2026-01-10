"use client";

import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface WelcomeSectionProps {
  userName: string;
}

export function WelcomeSection({ userName }: WelcomeSectionProps) {
  const locale = useLocale();

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-2">
        {getContent("dashboard.welcome.title", locale, { name: userName })}
      </h2>
      <p className="text-muted-foreground text-lg">
        {getContent("dashboard.welcome.subtitle")}
      </p>
    </div>
  );
}
