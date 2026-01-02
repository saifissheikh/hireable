import { Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  console.log("video url", videoUrl);
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Video className="w-6 h-6 text-primary" />
          Video Introduction
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
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Watch {candidateName.split(" ")[0]}'s 1-minute introduction
        </p>
      </CardContent>
    </Card>
  );
}
