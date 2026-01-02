"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface AboutSectionProps {
  bio: string;
  className?: string;
}

export function AboutSection({ bio, className }: AboutSectionProps) {
  const locale = useLocale();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {getContent("profile.view.about", locale)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed text-lg">{bio}</p>
      </CardContent>
    </Card>
  );
}
