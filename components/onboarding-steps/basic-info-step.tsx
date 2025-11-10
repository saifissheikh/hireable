import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n-config";
import { countries } from "@/lib/countries";

interface BasicInfoStepProps {
  formData: {
    fullName: string;
    age: string;
    nationality: string;
    location: string;
    phone: string;
  };
  updateFormData: (data: Partial<BasicInfoStepProps['formData']>) => void;
  locale: Locale;
}

export function BasicInfoStep({ formData, updateFormData, locale }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">{getContent("onboarding.step1.fullName", locale)} *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">{getContent("onboarding.step1.age", locale)} *</Label>
          <Input
            id="age"
            type="number"
            placeholder="25"
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
            min="18"
            max="100"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">{getContent("onboarding.step1.nationality", locale)} *</Label>
          <Select
            value={formData.nationality}
            onValueChange={(value) => updateFormData({ nationality: value })}
          >
            <SelectTrigger id="nationality">
              <SelectValue placeholder={getContent("onboarding.step1.nationalityPlaceholder", locale)} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.name}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">{getContent("onboarding.step1.location", locale)} *</Label>
          <Input
            id="location"
            placeholder={getContent("onboarding.step1.locationPlaceholder", locale)}
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="phone">{getContent("onboarding.step1.phone", locale)} *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={getContent("onboarding.step1.phonePlaceholder", locale)}
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            required
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{getContent("onboarding.step1.required", locale)}</p>
    </div>
  );
}
