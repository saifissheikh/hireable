import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Search, Star, Sparkles, UserCircle, TrendingUp, Shield } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { signInAsRecruiter } from "../actions";
import { getUserRole } from "@/lib/user-role";

export default async function RecruitersPage() {
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

  return (
    <>
      {/* Candidate CTA Banner */}
      <div className="border-b bg-linear-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-base sm:text-lg">{getContent("recruiter.landing.topBar.forRecruiters", locale)}</p>
                <p className="text-sm text-muted-foreground">Access our curated talent pool</p>
              </div>
            </div>
            <Link href="/">
              <Button className="w-full sm:w-auto whitespace-nowrap cursor-pointer">
                <UserCircle className="w-4 h-4 mr-2" />
                {getContent("recruiter.landing.topBar.candidateButton", locale)}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-primary/5">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
        
        {/* LEFT COLUMN - Hero Content */}
        <div className="lg:col-span-2 flex flex-col gap-8 order-2 lg:order-1 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-medium shadow-md">
          <Sparkles className="w-4 h-4" />
          {getContent("recruiter.landing.hero.badge", locale)}
          </div>

          {/* Heading */}
          <div className="space-y-4 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
          {getContent("recruiter.landing.hero.title", locale)}
          <span className="block mt-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {getContent("recruiter.landing.hero.titleHighlight", locale)}
          </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
          {getContent("recruiter.landing.hero.description", locale)}
          </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 w-full">
          <Card className="border hover:border-primary/50 transition-all">
          <CardContent className="py-4 px-3 text-center">
          <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2">
          <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">1000+</div>
          <div className="text-xs text-muted-foreground">{getContent("recruiter.landing.stats.candidates", locale)}</div>
          </CardContent>
          </Card>
          <Card className="border hover:border-primary/50 transition-all">
          <CardContent className="py-4 px-3 text-center">
          <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">50+</div>
          <div className="text-xs text-muted-foreground">{getContent("recruiter.landing.stats.skills", locale)}</div>
          </CardContent>
          </Card>
          <Card className="border hover:border-primary/50 transition-all">
          <CardContent className="py-4 px-3 text-center">
          <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2">
          <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">24/7</div>
          <div className="text-xs text-muted-foreground">{getContent("recruiter.landing.stats.access", locale)}</div>
          </CardContent>
          </Card>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2 w-full">
          <Badge variant="secondary" className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all cursor-default">
          <div className="w-2 h-2 rounded-full bg-primary" />
          {getContent("recruiter.landing.pills.instant", locale)}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all cursor-default">
          <div className="w-2 h-2 rounded-full bg-primary" />
          {getContent("recruiter.landing.pills.verified", locale)}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all cursor-default">
          <div className="w-2 h-2 rounded-full bg-primary" />
          {getContent("recruiter.landing.pills.quality", locale)}
          </Badge>
          </div>
        </div>

        {/* RIGHT COLUMN - Login Card */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <Card className="border-2 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
          <CardTitle className="text-2xl font-bold">{getContent("recruiter.landing.auth.card.title", locale)}</CardTitle>
          <CardDescription className="text-sm mt-2">
            {getContent("recruiter.landing.auth.card.description", locale)}
          </CardDescription>
          </div>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
          <form
            action={async () => {
            "use server";
            await signInAsRecruiter("google");
            }}
          >
            <Button type="submit" className="w-full h-11 font-medium shadow-md hover:shadow-lg transition-all cursor-pointer">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
            />
            <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
            />
            <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
            />
            <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
            />
            </svg>
            {getContent("recruiter.landing.auth.form.googleButton", locale)}
            </Button>
          </form>
          <form
            action={async () => {
            "use server";
            await signInAsRecruiter("linkedin");
            }}
          >
            <Button type="submit" className="w-full h-11 font-medium shadow-md hover:shadow-lg transition-all cursor-pointer">
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            {getContent("recruiter.landing.auth.form.linkedinButton", locale)}
            </Button>
          </form>
          </div>

          {/* Trust Badge */}
          <div className="pt-2">
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
            {getContent("recruiter.landing.auth.form.secureNote", locale)}
            </p>
          </div>
          </div>
          </CardContent>
          </Card>
        </div>

        </div>
      </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 border-y">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{getContent("recruiter.landing.features.title", locale)}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {getContent("recruiter.landing.features.subtitle", locale)}
        </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-8 pb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Search className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">{getContent("recruiter.landing.hero.features.advancedSearch.title", locale)}</h3>
          <p className="text-sm text-muted-foreground">{getContent("recruiter.landing.hero.features.advancedSearch.description", locale)}</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-8 pb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">{getContent("recruiter.landing.hero.features.talentPool.title", locale)}</h3>
          <p className="text-sm text-muted-foreground">{getContent("recruiter.landing.hero.features.talentPool.description", locale)}</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-8 pb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">{getContent("recruiter.landing.hero.features.verified.title", locale)}</h3>
          <p className="text-sm text-muted-foreground">{getContent("recruiter.landing.hero.features.verified.description", locale)}</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-8 pb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Star className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">{getContent("recruiter.landing.hero.features.directContact.title", locale)}</h3>
          <p className="text-sm text-muted-foreground">{getContent("recruiter.landing.hero.features.directContact.description", locale)}</p>
          </CardContent>
        </Card>
        </div>
      </div>
      </section>
    </>
  );
}
