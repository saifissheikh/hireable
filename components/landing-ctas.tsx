"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, LogIn } from "lucide-react";
import { signInAsCandidate, signInAsRecruiter } from "@/app/(public)/actions";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

export function LandingCTAs() {
  const locale = useLocale();

  const handleCandidateSignup = async () => {
    await signInAsCandidate("google");
  };

  const handleRecruiterLogin = async () => {
    await signInAsRecruiter("google");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <form action={handleCandidateSignup} className="flex-1 sm:flex-initial">
        <Button
          type="submit"
          size="lg"
          className="w-full gap-2 shadow-lg cursor-pointer"
        >
          <UserPlus className="w-5 h-5" />
          {getContent("landingCTAs.signUpCandidate", locale)}
        </Button>
      </form>
      <form action={handleRecruiterLogin} className="flex-1 sm:flex-initial">
        <Button
          type="submit"
          size="lg"
          variant="outline"
          className="w-full gap-2 cursor-pointer"
        >
          <LogIn className="w-5 h-5" />
          {getContent("landingCTAs.loginRecruiter", locale)}
        </Button>
      </form>
    </div>
  );
}
