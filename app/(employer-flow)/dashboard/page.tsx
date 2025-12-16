import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CandidatesGrid } from "@/components/dashboard/candidates-grid";

// Create a Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CANDIDATES_PER_PAGE = 12;

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function EmployerDashboard({ searchParams }: PageProps) {
  const session = await auth();

  if (!session) {
    redirect("/recruiters");
  }

  const params = await searchParams;
  const searchQuery = params.search || "";

  // Build query with optimized field selection
  let query = supabaseAdmin
    .from("candidates")
    .select(
      "id, full_name, bio, location, years_of_experience, skills, profile_picture_url",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .limit(CANDIDATES_PER_PAGE);

  // Server-side search
  if (searchQuery) {
    query = query.or(
      `full_name.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,skills.cs.{${searchQuery}}`
    );
  }

  const { data: candidates, error, count } = await query;

  if (error) {
    console.error("Error fetching candidates:", error);
  }

  const candidatesList = candidates || [];
  const totalCandidates = count || 0;

  // Calculate stats from all candidates (for accurate numbers)
  const { data: allCandidates } = await supabaseAdmin
    .from("candidates")
    .select("skills, location");

  const allSkills = new Set(
    allCandidates?.flatMap((c) => c.skills || []) || []
  );
  const totalSkills = allSkills.size;

  const allLocations = new Set(
    allCandidates?.map((c) => c.location).filter(Boolean) || []
  );
  const totalLocations = allLocations.size;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <WelcomeSection
          userName={session.user?.name?.split(" ")[0] || "Recruiter"}
          totalCandidates={totalCandidates}
        />

        <StatsCards
          totalCandidates={totalCandidates}
          totalSkills={totalSkills}
          totalLocations={totalLocations}
        />

        <CandidatesGrid
          initialCandidates={candidatesList}
          totalCount={totalCandidates}
          initialSearchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

// Enable revalidation for better performance
export const revalidate = 300; // Cache for 5 minutes
