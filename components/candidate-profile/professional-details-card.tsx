"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface ProfessionalDetailsCardProps {
  yearsOfExperience: number;
  nationality?: string;
  dateOfBirth?: string;
  createdAt: string;
}

export function ProfessionalDetailsCard({
  yearsOfExperience,
  nationality,
  dateOfBirth,
  createdAt,
}: ProfessionalDetailsCardProps) {
  const locale = useLocale();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getContent("profile.view.professionalDetails", locale)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{getContent("profile.view.experience", locale)}</p>
          <p className="text-2xl font-bold text-primary">
            {yearsOfExperience} {getContent("profile.view.years", locale)}
          </p>
        </div>
        {nationality && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">{getContent("profile.view.nationality", locale)}</p>
            <p className="font-medium">{nationality}</p>
          </div>
        )}
        {dateOfBirth && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">{getContent("profile.view.dateOfBirth", locale)}</p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="font-medium">
                {new Date(dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground mb-1">{getContent("profile.view.profileCreated", locale)}</p>
          <p className="font-medium">
            {new Date(createdAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
