import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Briefcase, 
  Download, 
  Eye,
  Search,
  Filter,
  Sparkles,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

// Create a Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function EmployerDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/recruiters");
  }

  // Fetch real candidates from Supabase
  const { data: candidates, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching candidates:', error);
  }

  const candidatesList = candidates || [];
  const totalCandidates = candidatesList.length;
  
  // Calculate unique skills count
  const allSkills = new Set(candidatesList.flatMap(c => c.skills || []));
  const totalSkills = allSkills.size;
  
  // Calculate unique locations count
  const allLocations = new Set(candidatesList.map(c => c.location).filter(Boolean));
  const totalLocations = allLocations.size;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Hireable</h1>
              <p className="text-xs text-muted-foreground">Find Your Next Hire</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {session.user?.name?.split(" ")[0] || "Recruiter"}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse through our talent pool of {totalCandidates} verified candidates
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name, skills, or location..." 
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 cursor-pointer">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
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

        {/* Candidates Grid */}
        {candidatesList.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">No candidates yet</h3>
                <p className="text-muted-foreground">
                  Check back soon as talented candidates complete their profiles!
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {candidatesList.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
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
                        {candidate.full_name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{candidate.full_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{candidate.location}</span>
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
                  <Button className="flex-1 cursor-pointer">
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" className="cursor-pointer">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}
      </main>
    </div>
  );
}
