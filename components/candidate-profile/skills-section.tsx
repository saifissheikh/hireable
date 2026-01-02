"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface SkillsSectionProps {
  skills: string[];
  className?: string;
}

export function SkillsSection({ skills, className }: SkillsSectionProps) {
  const locale = useLocale();
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">{getContent("profile.view.skillsExpertise", locale)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {skills?.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-base py-2 px-4 font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
