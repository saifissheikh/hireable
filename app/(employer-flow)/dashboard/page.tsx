import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EmployerDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // TODO: Implement employer dashboard
  // - Browse candidates
  // - Filter by skills, experience, location
  // - View candidate profiles and resumes

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Employer Dashboard
        </h1>
        <p className="text-muted-foreground">
          Browse and connect with talented candidates
        </p>
      </div>
      
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Employer dashboard coming soon...
        </p>
      </div>
    </div>
  );
}
