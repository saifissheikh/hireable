import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Users, TrendingUp, Briefcase } from "lucide-react";
import { auth } from "@/auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";

export default async function Home() {
  const session = await auth();
  const locale = await getLocale();
  
  // If user is already logged in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
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
                  <Briefcase className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{getContent("landing.hero.features.quickApply.title", locale)}</h3>
                    <p className="text-sm text-muted-foreground">{getContent("landing.hero.features.quickApply.description", locale)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Login Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>{getContent("landing.auth.card.title", locale)}</CardTitle>
                  <CardDescription>
                    {getContent("landing.auth.card.description", locale)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{getContent("landing.auth.form.emailLabel", locale)}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={getContent("landing.auth.form.emailPlaceholder", locale)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">{getContent("landing.auth.form.passwordLabel", locale)}</Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {getContent("landing.auth.form.forgotPassword", locale)}
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder={getContent("landing.auth.form.passwordPlaceholder", locale)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {getContent("landing.auth.form.signInButton", locale)}
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          {getContent("landing.auth.form.orContinueWith", locale)}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <form
                        action={async () => {
                          "use server";
                          await signIn("google", { redirectTo: "/dashboard" });
                        }}
                      >
                        <Button variant="outline" type="submit" className="w-full">
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
                          await signIn("linkedin", { redirectTo: "/dashboard" });
                        }}
                      >
                        <Button variant="outline" type="submit" className="w-full">
                          <svg className="mr-2 h-4 w-4" fill="#0A66C2" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          {getContent("landing.auth.form.linkedinButton", locale)}
                        </Button>
                      </form>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {getContent("landing.auth.form.noAccount", locale)}{" "}
                      <Link
                        href="/signup"
                        className="font-medium text-primary hover:underline"
                      >
                        {getContent("landing.auth.form.signUpLink", locale)}
                      </Link>
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
