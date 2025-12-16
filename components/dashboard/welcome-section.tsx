interface WelcomeSectionProps {
  userName: string;
  totalCandidates: number;
}

export function WelcomeSection({
  userName,
  totalCandidates,
}: WelcomeSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
      <p className="text-muted-foreground text-lg">
        Browse through our talent pool of {totalCandidates} verified candidates
      </p>
    </div>
  );
}
