"use client";

import { Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface AudioSectionProps {
  audioUrl: string;
  candidateName: string;
  className?: string;
}

export function AudioSection({
  audioUrl,
  candidateName,
  className,
}: AudioSectionProps) {
  const locale = useLocale();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Mic className="w-6 h-6 text-primary" />
          Audio Introduction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-2xl">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border-2 border-primary/20">
            <audio
              src={audioUrl}
              controls
              className="w-full"
              preload="metadata"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Listen to {candidateName.split(" ")[0]}'s 1-minute audio
            introduction
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
