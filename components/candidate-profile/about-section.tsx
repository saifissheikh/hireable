import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutSectionProps {
  bio: string;
  className?: string;
}

export function AboutSection({ bio, className }: AboutSectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed text-lg">{bio}</p>
      </CardContent>
    </Card>
  );
}
