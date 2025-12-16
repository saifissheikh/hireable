import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, MapPin } from "lucide-react";

interface StatsCardsProps {
  totalCandidates: number;
  totalSkills: number;
  totalLocations: number;
}

export function StatsCards({
  totalCandidates,
  totalSkills,
  totalLocations,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalCandidates}</p>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalSkills}+</p>
              <p className="text-sm text-muted-foreground">Skills Available</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalLocations}</p>
              <p className="text-sm text-muted-foreground">Locations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
