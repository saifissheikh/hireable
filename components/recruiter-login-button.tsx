"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { signInAsRecruiter } from "@/app/(public)/actions";

export function RecruiterLoginButton() {
  const handleRecruiterLogin = async () => {
    await signInAsRecruiter("google");
  };

  return (
    <form action={handleRecruiterLogin} className="w-full">
      <Button type="submit" size="lg" className="w-full gap-2 cursor-pointer">
        <LogIn className="w-5 h-5" />
        Login as Recruiter
      </Button>
    </form>
  );
}
