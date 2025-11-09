import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, CheckCircle, Users, TrendingUp } from "lucide-react";
import { auth } from "@/auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  
  // If user is already logged in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">Hireable</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

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
                  Now Hiring
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Find Your Dream Job
                <span className="text-primary"> Today</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Connect with top employers and discover opportunities that match your skills and aspirations. 
                Your next career move starts here.
              </p>
              
              {/* Features List */}
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Smart Matching</h3>
                    <p className="text-sm text-muted-foreground">AI-powered job recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Top Employers</h3>
                    <p className="text-sm text-muted-foreground">Connect with leading companies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Career Growth</h3>
                    <p className="text-sm text-muted-foreground">Track your progress and grow</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Quick Apply</h3>
                    <p className="text-sm text-muted-foreground">Apply to jobs in seconds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Login Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to your account to continue your job search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
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
                          Google
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
                          LinkedIn
                        </Button>
                      </form>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="font-medium text-primary hover:underline"
                      >
                        Sign up
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span className="text-sm font-semibold">Hireable</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              © 2025 Hireable. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
