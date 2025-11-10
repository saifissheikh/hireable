import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding-form";
import { getLocale } from "@/lib/get-locale";
import { getDirection } from "@/lib/i18n-config";

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
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background flex items-center justify-center p-4" dir={dir}>
      <OnboardingForm user={session.user} locale={locale} />
    </div>
  );
}
