import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  skills: string[];
  className?: string;
}

export function SkillsSection({ skills, className }: SkillsSectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
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
