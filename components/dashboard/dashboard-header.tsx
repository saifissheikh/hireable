import { Sparkles } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Hireable</h1>
            <p className="text-xs text-muted-foreground">Find Your Next Hire</p>
          </div>
        </div>
      </div>
    </header>
  );
}
