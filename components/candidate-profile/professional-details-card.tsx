import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Experience</p>
          <p className="text-2xl font-bold text-primary">
            {yearsOfExperience} years
          </p>
        </div>
        {nationality && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Nationality</p>
            <p className="font-medium">{nationality}</p>
          </div>
        )}
        {dateOfBirth && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
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
          <p className="text-sm text-muted-foreground mb-1">Profile Created</p>
          <p className="font-medium">
            {new Date(createdAt).toLocaleDateString("en-US", {
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
