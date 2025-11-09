import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium">{session.user.name}</span>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {session.user.name}!</h1>
            <p className="text-muted-foreground mt-2">
              Here&apos;s your job search dashboard
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Applied Jobs</CardTitle>
                <CardDescription>Track your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground mt-2">
                  No applications yet
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
                <CardDescription>Your bookmarked positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Start saving jobs you like
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Views</CardTitle>
                <CardDescription>Employer interest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete your profile to get noticed
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Complete these steps to improve your job search</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Complete your profile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span className="text-muted-foreground">Upload your resume</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span className="text-muted-foreground">Add your skills</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span className="text-muted-foreground">Start applying to jobs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
