"use client";

import { FileText, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

interface ResumeSectionProps {
  resumeUrl: string;
  className?: string;
}

export function ResumeSection({ resumeUrl, className }: ResumeSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const locale = useLocale();

  const handleDownload = () => {
    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInNewTab = () => {
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            {getContent("profile.view.resume", locale)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            {getContent("profile.view.viewDownloadResume", locale)}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 gap-2 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <Eye className="w-4 h-4" />
              {getContent("profile.view.viewResume", locale)}
            </Button>
            <Button
              size="lg"
              className="flex-1 gap-2 cursor-pointer"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              {getContent("profile.view.download", locale)}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resume Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {getContent("profile.view.resumePreview", locale)}
              </DialogTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleViewInNewTab}
                  className="gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  {getContent("profile.view.openInNewTab", locale)}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {getContent("profile.view.download", locale)}
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 p-6 overflow-auto">
            <div className="w-full h-full bg-muted rounded-lg overflow-hidden">
              <iframe
                src={resumeUrl}
                className="w-full h-full min-h-[600px]"
                title="Resume Preview"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
