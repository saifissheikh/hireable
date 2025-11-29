"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n-config";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  Calendar,
  FileText,
  Download,
  Edit,
  Globe
} from "lucide-react";

interface Candidate {
  id: string;
  email: string;
  full_name: string;
  age: number;
  nationality: string;
  location: string;
  phone: string;
  years_of_experience: number;
  skills: string[];
  bio: string;
  resume_url: string | null;
  resume_filename: string | null;
  profile_picture_url: string | null;
  created_at: string;
}

interface ProfileViewProps {
  candidate: Candidate;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  locale: Locale;
}

export function ProfileView({ candidate, user, locale }: ProfileViewProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Header Card */}
      <Card>
        <CardHeader className="pb-3 space-y-4">
          {/* Profile Image and Name */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {candidate.profile_picture_url ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-primary/20 shrink-0 overflow-hidden bg-muted">
                  <Image 
                    src={candidate.profile_picture_url} 
                    alt={candidate.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : user.image ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-primary/20 shrink-0 overflow-hidden">
                  <Image 
                    src={user.image} 
                    alt={candidate.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-4 border-primary/20">
                  <User className="w-12 h-12 text-primary" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <CardTitle className="text-2xl sm:text-3xl mb-1 wrap-break-word">{candidate.full_name}</CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">{candidate.years_of_experience} {candidate.years_of_experience === 1 ? getContent("profile.year", locale) : getContent("profile.years", locale)} {getContent("profile.experience", locale).toLowerCase()}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Edit Button */}
            <Button variant="outline" size="sm" className="w-full sm:w-auto shrink-0">
              <Edit className="w-4 h-4 mr-2" />
              {getContent("profile.editProfile", locale)}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{getContent("profile.about", locale)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {candidate.bio}
              </p>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{getContent("profile.skills", locale)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resume Section */}
          {candidate.resume_url && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{getContent("profile.resume", locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{candidate.resume_filename}</p>
                      <p className="text-xs text-muted-foreground">{getContent("profile.pdfDocument", locale)}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto shrink-0">
                    <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      {getContent("profile.download", locale)}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{getContent("profile.contactInformation", locale)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.email", locale)}</p>
                  <p className="font-medium break-all text-sm md:text-base">{candidate.email}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.phone", locale)}</p>
                  <p className="font-medium text-sm md:text-base">{candidate.phone}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.location", locale)}</p>
                  <p className="font-medium text-sm md:text-base">{candidate.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{getContent("profile.personalDetails", locale)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.age", locale)}</p>
                  <p className="font-medium text-sm md:text-base">{candidate.age} {getContent("profile.yearsOld", locale)}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.nationality", locale)}</p>
                  <p className="font-medium text-sm md:text-base">{candidate.nationality}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.experience", locale)}</p>
                  <p className="font-medium text-sm md:text-base">
                    {candidate.years_of_experience} {candidate.years_of_experience === 1 ? getContent("profile.year", locale) : getContent("profile.years", locale)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
