import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding-form";
import { getLocale } from "@/lib/get-locale";
import { getDirection } from "@/lib/i18n-config";
import { getContent } from "@/lib/content";

export default async function OnboardingPage() {
  const session = await auth();
  const locale = await getLocale();
  const dir = getDirection(locale);

  // Redirect to home if not authenticated
  if (!session?.user) {
    redirect("/");
  }

  // TODO: Check if user already completed onboarding
  // If completed, redirect to dashboard

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background p-4 md:p-8" dir={dir}>
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {getContent("dashboard.welcome.title", locale, { name: session.user.name || "User" })}
          </h1>
          <p className="text-muted-foreground text-lg">
            {getContent("dashboard.welcome.subtitle", locale)}
          </p>
        </div>
        <OnboardingForm user={session.user} locale={locale} />
      </div>
    </div>
  );
}
