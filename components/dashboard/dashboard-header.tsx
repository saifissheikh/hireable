"use client";

import { Sparkles } from "lucide-react";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

export function DashboardHeader() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {getContent("dashboard.header.title", locale)}
            </h1>
            <p className="text-xs text-muted-foreground">
              {getContent("dashboard.header.subtitle", locale)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
