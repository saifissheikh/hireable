"use client";

import { Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface VideoSectionProps {
  videoUrl: string;
  candidateName: string;
  className?: string;
}

export function VideoSection({
  videoUrl,
  candidateName,
  className,
}: VideoSectionProps) {
  const locale = useLocale();
  console.log("video url", videoUrl);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Video className="w-6 h-6 text-primary" />
          {getContent("profile.view.videoIntroduction", locale)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[4/3] max-w-2xl bg-black rounded-lg overflow-hidden shadow-lg">
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
            preload="metadata"
          >
            {getContent("profile.view.videoNotSupported", locale)}
          </video>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          {getContent("profile.view.watchIntro", locale, { name: candidateName.split(" ")[0] })}
        </p>
      </CardContent>
    </Card>
  );
}
