import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";

export default async function DashboardPage() {
  const session = await auth();
  const locale = await getLocale();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{getContent("dashboard.welcome.title", locale, { name: session.user.name || "User" })}</h1>
        <p className="text-muted-foreground mt-2">
          {getContent("dashboard.welcome.subtitle", locale)}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{getContent("dashboard.stats.appliedJobs.title", locale)}</CardTitle>
            <CardDescription>{getContent("dashboard.stats.appliedJobs.description", locale)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground mt-2">
              {getContent("dashboard.stats.appliedJobs.emptyState", locale)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{getContent("dashboard.stats.savedJobs.title", locale)}</CardTitle>
            <CardDescription>{getContent("dashboard.stats.savedJobs.description", locale)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground mt-2">
              {getContent("dashboard.stats.savedJobs.emptyState", locale)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{getContent("dashboard.stats.profileViews.title", locale)}</CardTitle>
            <CardDescription>{getContent("dashboard.stats.profileViews.description", locale)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground mt-2">
              {getContent("dashboard.stats.profileViews.emptyState", locale)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{getContent("dashboard.gettingStarted.title", locale)}</CardTitle>
            <CardDescription>{getContent("dashboard.gettingStarted.description", locale)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{getContent("dashboard.gettingStarted.steps.completeProfile", locale)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-muted" />
                <span className="text-muted-foreground">{getContent("dashboard.gettingStarted.steps.uploadResume", locale)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-muted" />
                <span className="text-muted-foreground">{getContent("dashboard.gettingStarted.steps.addSkills", locale)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-muted" />
                <span className="text-muted-foreground">{getContent("dashboard.gettingStarted.steps.startApplying", locale)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
