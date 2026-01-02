"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface ContactInfoCardProps {
  email: string;
  phone: string;
  location: string;
}

export function ContactInfoCard({
  email,
  phone,
  location,
}: ContactInfoCardProps) {
  const locale = useLocale();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getContent("profile.view.contactInformation", locale)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{getContent("profile.view.email", locale)}</p>
          <a href={`mailto:${email}`} className="text-primary hover:underline">
            {email}
          </a>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{getContent("profile.view.phone", locale)}</p>
          <a href={`tel:${phone}`} className="text-primary hover:underline">
            {phone}
          </a>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{getContent("profile.view.location", locale)}</p>
          <p className="font-medium">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
}
