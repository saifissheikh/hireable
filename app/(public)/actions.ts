"use server";

import { signIn } from "@/auth";

export async function signInAsCandidate(provider: "google" | "linkedin") {
  // Store the intended role in a cookie that will be read after auth
  return await signIn(provider, { 
    redirectTo: "/api/auth/role-handler?role=candidate&redirect=/profile"
  });
}

export async function signInAsRecruiter(provider: "google" | "linkedin") {
  // Store the intended role in a cookie that will be read after auth
  return await signIn(provider, { 
    redirectTo: "/api/auth/role-handler?role=recruiter&redirect=/dashboard"
  });
}
