import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Rocket } from "lucide-react";

export default async function EmployerDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/recruiters");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Animated Rocket */}
        <div className="relative">
          <div className="mx-auto w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <Rocket className="w-16 h-16 text-primary animate-bounce" />
          </div>
        </div>

        {/* Coming Soon Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Employer Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
