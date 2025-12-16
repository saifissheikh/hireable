import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Candidate {
  id: string;
  full_name: string;
  bio: string;
  location: string;
  years_of_experience: number;
  skills: string[];
  profile_picture_url: string | null;
}

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {candidate.profile_picture_url ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                <Image
                  src={candidate.profile_picture_url}
                  alt={candidate.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xl">
                {candidate.full_name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold">{candidate.full_name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {candidate.location}
                </span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Briefcase className="w-3 h-3 mr-1" />
            {candidate.years_of_experience} years
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {candidate.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {candidate.skills?.slice(0, 4).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {candidate.skills && candidate.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{candidate.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link
            href={`/dashboard/candidate/${candidate.id}`}
            className="flex-1"
          >
            <Button className="w-full cursor-pointer">
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Button>
          </Link>
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
