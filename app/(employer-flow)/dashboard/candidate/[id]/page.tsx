import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileHeroSection } from "@/components/candidate-profile/profile-hero-section";
import { AboutSection } from "@/components/candidate-profile/about-section";
import { SkillsSection } from "@/components/candidate-profile/skills-section";
import { VideoSection } from "@/components/candidate-profile/video-section";
import { AudioSection } from "@/components/candidate-profile/audio-section";
import { ResumeSection } from "@/components/candidate-profile/resume-section";
import { ContactInfoCard } from "@/components/candidate-profile/contact-info-card";
import { ProfessionalDetailsCard } from "@/components/candidate-profile/professional-details-card";
import { QuickActionsCard } from "@/components/candidate-profile/quick-actions-card";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateProfilePage({ params }: PageProps) {
  const { id } = await params;
  const locale = await getLocale();

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
              {getContent("profile.view.backToDashboard", locale)}
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <ProfileHeroSection candidate={candidate} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <AboutSection bio={candidate.bio} className="order-1" />

            <SkillsSection skills={candidate.skills} className="order-2" />

            {candidate.introduction_video_url && (
              <VideoSection
                videoUrl={candidate.introduction_video_url}
                candidateName={candidate.full_name}
                className="order-3"
              />
            )}

            {candidate.introduction_audio_url && (
              <AudioSection
                audioUrl={candidate.introduction_audio_url}
                candidateName={candidate.full_name}
                className="order-3"
              />
            )}

            {candidate.resume_url && (
              <ResumeSection
                resumeUrl={candidate.resume_url}
                className="order-5 lg:order-4"
              />
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6 order-4 lg:order-none">
            <ContactInfoCard
              email={candidate.email}
              phone={candidate.phone}
              location={candidate.location}
            />

            <ProfessionalDetailsCard
              yearsOfExperience={candidate.years_of_experience}
              nationality={candidate.nationality}
              dateOfBirth={candidate.date_of_birth}
              createdAt={candidate.created_at}
            />

            <QuickActionsCard
              phone={candidate.phone}
              email={candidate.email}
              resumeUrl={candidate.resume_url}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
