import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, TrendingUp, Eye, Briefcase } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { signInAsCandidate } from "./actions";
import { getUserRole } from "@/lib/user-role";

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
  return (
    <>
      {/* Recruiter CTA Banner */}
      <div className="border-b bg-linear-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-base sm:text-lg">{getContent("landing.recruiterBanner.title", locale)}</p>
                <p className="text-sm text-muted-foreground">{getContent("landing.recruiterBanner.description", locale)}</p>
              </div>
            </div>
            <Link href="/recruiters">
              <Button className="w-full sm:w-auto whitespace-nowrap">
                <Briefcase className="w-4 h-4 mr-2" />
                {getContent("landing.recruiterBanner.button", locale)}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col gap-6">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {getContent("landing.hero.badge", locale)}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {getContent("landing.hero.title", locale)}
                <span className="text-primary"> {getContent("landing.hero.titleHighlight", locale)}</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {getContent("landing.hero.description", locale)}
              </p>
              
              {/* Features List */}
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{getContent("landing.hero.features.smartMatching.title", locale)}</h3>
                    <p className="text-sm text-muted-foreground">{getContent("landing.hero.features.smartMatching.description", locale)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{getContent("landing.hero.features.topEmployers.title", locale)}</h3>
                    <p className="text-sm text-muted-foreground">{getContent("landing.hero.features.topEmployers.description", locale)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{getContent("landing.hero.features.careerGrowth.title", locale)}</h3>
                    <p className="text-sm text-muted-foreground">{getContent("landing.hero.features.careerGrowth.description", locale)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{getContent("landing.hero.features.profileVisibility.title", locale)}</h3>
                    <p className="text-sm text-muted-foreground">{getContent("landing.hero.features.profileVisibility.description", locale)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Login Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{getContent("landing.auth.card.title", locale)}</CardTitle>
                  <CardDescription className="text-base">
                    {getContent("landing.auth.card.description", locale)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* OAuth Buttons */}
                    <div className="space-y-3">
                      <form
                        action={async () => {
                          "use server";
                          await signInAsCandidate("google");
                        }}
                      >
                        <Button variant="outline" type="submit" className="w-full h-11 text-base">
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
                          {getContent("landing.auth.form.googleButton", locale)}
                        </Button>
                      </form>
                      <form
                        action={async () => {
                          "use server";
                          await signInAsCandidate("linkedin");
                        }}
                      >
                        <Button variant="outline" type="submit" className="w-full h-11 text-base">
                          <svg className="mr-2 h-5 w-5" fill="#0A66C2" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          {getContent("landing.auth.form.linkedinButton", locale)}
                        </Button>
                      </form>
                    </div>

                    {/* Info Text */}
                    <div className="pt-4 border-t">
                      <p className="text-sm text-center text-muted-foreground leading-relaxed">
                        {getContent("landing.auth.form.secureNote", locale)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
