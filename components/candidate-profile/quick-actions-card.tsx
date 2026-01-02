import { Phone, Mail, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsCardProps {
  phone: string;
  email: string;
  resumeUrl?: string;
}

export function QuickActionsCard({
  phone,
  email,
  resumeUrl,
}: QuickActionsCardProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <a href={`tel:${phone}`} className="block">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            Call Candidate
          </Button>
        </a>
        <a href={`mailto:${email}`} className="block">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </Button>
        </a>
        {resumeUrl && (
          <a href={resumeUrl} download className="block">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
