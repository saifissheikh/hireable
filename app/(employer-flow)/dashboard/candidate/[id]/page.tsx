import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Phone,
  Mail,
  Download,
  Calendar,
  Globe,
  Video,
  FileText,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateProfilePage({ params }: PageProps) {
  const { id } = await params;

  const { data: candidate, error } = await supabaseAdmin
    .from("candidates")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !candidate) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
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
                    .map((n: string) => n[0])
                    .join("")}
                </div>
              )}
            </div>

            {/* Right: Info & Actions */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-3">
                  {candidate.full_name}
                </h1>
                <div className="flex flex-wrap gap-4 text-lg text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span>
                      {candidate.years_of_experience} years experience
                    </span>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card className="order-1">
              <CardHeader>
                <CardTitle className="text-2xl">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {candidate.bio}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="order-2">
              <CardHeader>
                <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {candidate.skills?.map((skill: string) => (
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

            {/* Video Introduction - Only if exists */}
            {candidate.introduction_video_url && (
              <Card className="order-3">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Video className="w-6 h-6 text-primary" />
                    Video Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[4/3] max-w-2xl bg-black rounded-lg overflow-hidden shadow-lg">
                    <video
                      src={candidate.introduction_video_url}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Watch {candidate.full_name.split(" ")[0]}'s 1-minute
                    introduction
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Resume Preview - Only if exists */}
            {candidate.resume_url && (
              <Card className="order-5 lg:order-4">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={candidate.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full gap-2 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        Open in New Tab
                      </Button>
                    </a>
                    <a href={candidate.resume_url} download className="flex-1">
                      <Button size="lg" className="w-full gap-2 cursor-pointer">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </a>
                  </div>
                  <div className="aspect-[8.5/11] bg-muted rounded-lg overflow-hidden border shadow-inner">
                    <iframe
                      src={candidate.resume_url}
                      className="w-full h-full"
                      title="Resume Preview"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6 order-4 lg:order-none">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${candidate.email}`}
                    className="text-primary hover:underline"
                  >
                    {candidate.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a
                    href={`tel:${candidate.phone}`}
                    className="text-primary hover:underline"
                  >
                    {candidate.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">{candidate.location}</p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Experience
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {candidate.years_of_experience} years
                  </p>
                </div>
                {candidate.nationality && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Nationality
                    </p>
                    <p className="font-medium">{candidate.nationality}</p>
                  </div>
                )}
                {candidate.date_of_birth && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Date of Birth
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium">
                        {new Date(candidate.date_of_birth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Profile Created
                  </p>
                  <p className="font-medium">
                    {new Date(candidate.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href={`tel:${candidate.phone}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Candidate
                  </Button>
                </a>
                <a href={`mailto:${candidate.email}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                </a>
                {candidate.resume_url && (
                  <a href={candidate.resume_url} download className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
