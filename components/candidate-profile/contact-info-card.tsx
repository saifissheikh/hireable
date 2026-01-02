import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactInfoCardProps {
  email: string;
  phone: string;
  location: string;
}

export function ContactInfoCard({
  email,
  phone,
  location,
}: ContactInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Email</p>
          <a href={`mailto:${email}`} className="text-primary hover:underline">
            {email}
          </a>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Phone</p>
          <a href={`tel:${phone}`} className="text-primary hover:underline">
            {phone}
          </a>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Location</p>
          <p className="font-medium">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
}
