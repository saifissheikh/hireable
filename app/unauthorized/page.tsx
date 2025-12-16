import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";
import { getDirection } from "@/lib/i18n-config";

export default async function UnauthorizedPage() {
  const locale = await getLocale();
  const dir = getDirection(locale);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-muted/30 to-background"
      dir={dir}
    >
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">
            {getContent("unauthorized.recruiterOnly.title", locale)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            {getContent("unauthorized.recruiterOnly.message", locale)}
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/profile">
                {getContent("unauthorized.recruiterOnly.goToProfile", locale)}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                {getContent("unauthorized.recruiterOnly.goToHome", locale)}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
