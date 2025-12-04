import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import { createUserWithRole, getUserRole } from "@/lib/user-role";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // Check if user already has a role
      const existingRole = await getUserRole(user.email);

      if (!existingRole) {
        // New user - default to candidate role
        // The actual role will be determined by which page they're signing in from
        // This is handled in the signin page action
        await createUserWithRole(user.email, user.name || "", "candidate");
      }

      return true;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
