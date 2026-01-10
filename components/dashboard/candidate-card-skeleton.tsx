import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CandidateCardSkeleton() {
  return (
    <Card className="border-2">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Avatar skeleton */}
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              {/* Name skeleton */}
              <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
              {/* Badge skeleton */}
              <div className="h-5 bg-muted rounded animate-pulse w-1/2" />
              {/* Job title skeleton */}
              <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
              {/* Location skeleton */}
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
            </div>
          </div>
          {/* Experience badge skeleton */}
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bio skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
          <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
        </div>

        {/* Skills skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-muted rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="h-9 flex-1 bg-muted rounded animate-pulse" />
          <div className="h-9 w-9 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
