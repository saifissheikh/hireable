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

export default async function EmployerDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/recruiters");
  }

  // Mock data - will replace with Supabase later
  const mockCandidates = [
    {
      id: 1,
      name: "Sarah Ahmed",
      bio: "Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      experience: 5,
      location: "Dubai, UAE",
      age: 28,
      nationality: "Emirati"
    },
    {
      id: 2,
      name: "Mohammed Ali",
      bio: "Senior frontend developer specializing in modern web applications and user experiences.",
      skills: ["Vue.js", "JavaScript", "CSS", "Tailwind", "Figma"],
      experience: 4,
      location: "Abu Dhabi, UAE",
      age: 30,
      nationality: "Egyptian"
    },
    {
      id: 3,
      name: "Lisa Chen",
      bio: "Data scientist with expertise in machine learning and AI-driven solutions.",
      skills: ["Python", "TensorFlow", "SQL", "R", "Machine Learning"],
      experience: 6,
      location: "Dubai, UAE",
      age: 32,
      nationality: "Chinese"
    },
    {
      id: 4,
      name: "Omar Hassan",
      bio: "DevOps engineer passionate about automation, CI/CD, and cloud infrastructure.",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Linux"],
      experience: 3,
      location: "Sharjah, UAE",
      age: 27,
      nationality: "Jordanian"
    },
    {
      id: 5,
      name: "Emma Wilson",
      bio: "UX/UI designer focused on creating intuitive and beautiful digital experiences.",
      skills: ["Figma", "Adobe XD", "Sketch", "Design Systems", "Prototyping"],
      experience: 4,
      location: "Dubai, UAE",
      age: 29,
      nationality: "British"
    },
    {
      id: 6,
      name: "Ahmed Ibrahim",
      bio: "Backend engineer with strong experience in microservices and distributed systems.",
      skills: ["Java", "Spring Boot", "Microservices", "Redis", "PostgreSQL"],
      experience: 7,
      location: "Dubai, UAE",
      age: 34,
      nationality: "Saudi Arabian"
    }
  ];

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
            Browse through our talent pool of {mockCandidates.length} verified candidates
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
                  <p className="text-2xl font-bold">{mockCandidates.length}</p>
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
                  <p className="text-2xl font-bold">25+</p>
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
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">UAE Locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {candidate.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{candidate.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{candidate.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {candidate.experience} years
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {candidate.bio}
                </p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 4 && (
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
      </main>
    </div>
  );
}
