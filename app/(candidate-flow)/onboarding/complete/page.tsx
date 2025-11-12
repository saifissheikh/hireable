import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Eye, TrendingUp } from "lucide-react";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { getDirection } from "@/lib/i18n-config";

export default async function OnboardingCompletePage() {
  const session = await auth();
  const locale = await getLocale();
  const dir = getDirection(locale);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4" dir={dir}>
      <div className="w-full max-w-2xl">
        <Card className="border-2">
          <CardContent className="pt-12 pb-8 px-6 md:px-12">
            {/* Success Icon with Animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="relative bg-green-500 rounded-full p-6">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                {getContent("onboardingComplete.title", locale)}
              </h1>
              <p className="text-xl font-semibold">
                {getContent("onboardingComplete.subtitle", locale, { name: session.user.name || "User" })}
              </p>
              <p className="text-muted-foreground text-lg">
                {getContent("onboardingComplete.message", locale)}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-4 md:grid-cols-2 mb-8 max-w-lg mx-auto">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5">
                <Eye className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">{getContent("onboardingComplete.feature1", locale)}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5">
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">{getContent("onboardingComplete.feature2", locale)}</p>
              </div>
            </div>

            {/* Encouraging Message */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg">
              <p className="text-lg font-medium mb-2">
                {getContent("onboardingComplete.encouragement", locale)}
              </p>
              <p className="text-muted-foreground">
                {getContent("onboardingComplete.wishMessage", locale)}
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button size="lg" type="submit" variant="outline" className="w-full sm:w-auto px-8 cursor-pointer">
                  {getContent("onboardingComplete.signOut", locale)}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
