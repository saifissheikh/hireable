import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/user-role";
import { CandidatesGrid } from "@/components/dashboard/candidates-grid";
import { CandidateSignupChart } from "@/components/candidate-signup-chart";
import { LandingCTAs } from "@/components/landing-ctas";
import { Users } from "lucide-react";
import { getLocale } from "@/lib/get-locale";
import { getContent } from "@/lib/content";

// Create a Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function Home() {
  const session = await auth();
  const locale = await getLocale();

  // If user is already logged in, redirect based on their role
  if (session) {
    const userRole = await getUserRole();
    if (userRole === "recruiter") {
      redirect("/dashboard");
    } else if (userRole === "candidate") {
      redirect("/profile");
    }
  }

  // Fetch limited candidates for public view
  const { data: candidates, count } = await supabaseAdmin
    .from("candidates")
    .select(
      "id, full_name, job_title, bio, location, years_of_experience, skills, profile_picture_url",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .limit(12);

  const candidatesList = candidates || [];
  const totalCandidates = count || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Hero Section with CTAs and Chart */}
      <section className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-5 items-start">
            {/* Left Column - Hero Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <Users className="w-4 h-4" />
                  {totalCandidates}+{" "}
                  {getContent(
                    "dashboard.publicLanding.activeCandidates",
                    locale
                  )}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {getContent("dashboard.publicLanding.heroTitle", locale)}
                  <span className="text-primary">
                    {" "}
                    {getContent(
                      "dashboard.publicLanding.heroHighlight",
                      locale
                    )}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                  {getContent(
                    "dashboard.publicLanding.heroDescription",
                    locale
                  )}
                </p>
              </div>

              {/* CTA Buttons */}
              <LandingCTAs />

              <p className="text-sm text-muted-foreground">
                Join thousands of professionals finding their next opportunity
              </p>
            </div>

            {/* Right Column - Chart */}
            <div className="lg:col-span-2">
              <CandidateSignupChart />
            </div>
          </div>
        </div>
      </section>

      {/* Candidates Grid Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {getContent(
              "dashboard.publicLanding.browseCandidatesTitle",
              locale
            )}
          </h2>
          <p className="text-muted-foreground">
            {getContent(
              "dashboard.publicLanding.browseCandidatesDescription",
              locale
            )}
          </p>
        </div>

        <CandidatesGrid
          initialCandidates={candidatesList}
          totalCount={totalCandidates}
          initialSearchQuery=""
          isPublicView={true}
        />
      </main>
    </div>
  );
}

// Enable revalidation
export const revalidate = 300;
