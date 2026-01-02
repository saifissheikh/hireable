import { MapPin, Briefcase, Phone, Mail, Download, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Candidate {
  full_name: string;
  profile_picture_url?: string;
  location: string;
  years_of_experience: number;
  nationality?: string;
  phone: string;
  email: string;
  resume_url?: string;
}

interface ProfileHeroSectionProps {
  candidate: Candidate;
}

export function ProfileHeroSection({ candidate }: ProfileHeroSectionProps) {
  return (
    <div className="bg-linear-to-r from-primary/10 via-primary/5 to-background border-b">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Profile Picture & Name */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            {candidate.profile_picture_url ? (
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                <Image
                  src={candidate.profile_picture_url}
                  alt={candidate.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-40 h-40 rounded-2xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-5xl shadow-xl border-4 border-background">
                {candidate.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-3">{candidate.full_name}</h1>
              <div className="flex flex-wrap gap-4 text-lg text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span>{candidate.years_of_experience} years experience</span>
                </div>
                {candidate.nationality && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>{candidate.nationality}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${candidate.phone}`}>
                <Button size="lg" className="gap-2 shadow-lg cursor-pointer">
                  <Phone className="w-4 h-4" />
                  {candidate.phone}
                </Button>
              </a>
              <a href={`mailto:${candidate.email}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </Button>
              </a>
              {candidate.resume_url && (
                <a href={candidate.resume_url} download>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
