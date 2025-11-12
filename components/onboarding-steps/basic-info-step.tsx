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
import { useState } from "react";

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
  const [errors, setErrors] = useState({
    fullName: "",
    age: "",
    phone: "",
  });

  const validateFullName = (value: string) => {
    // Only allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, fullName: getContent("onboarding.validation.nameRequired", locale) }));
      return false;
    }
    if (!nameRegex.test(value)) {
      setErrors(prev => ({ ...prev, fullName: getContent("onboarding.validation.nameInvalid", locale) }));
      return false;
    }
    setErrors(prev => ({ ...prev, fullName: "" }));
    return true;
  };

  const validateAge = (value: string) => {
    const ageNum = parseInt(value);
    if (!value) {
      setErrors(prev => ({ ...prev, age: getContent("onboarding.validation.ageRequired", locale) }));
      return false;
    }
    if (isNaN(ageNum) || ageNum < 12 || ageNum > 99) {
      setErrors(prev => ({ ...prev, age: getContent("onboarding.validation.ageRange", locale) }));
      return false;
    }
    setErrors(prev => ({ ...prev, age: "" }));
    return true;
  };

  const validatePhone = (value: string) => {
    // Allow international phone formats: +, digits, spaces, hyphens, parentheses
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, phone: getContent("onboarding.validation.phoneRequired", locale) }));
      return false;
    }
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      setErrors(prev => ({ ...prev, phone: getContent("onboarding.validation.phoneInvalid", locale) }));
      return false;
    }
    setErrors(prev => ({ ...prev, phone: "" }));
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ fullName: value });
    if (value) validateFullName(value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ age: value });
    if (value) validateAge(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ phone: value });
    if (value) validatePhone(value);
  };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">{getContent("onboarding.step1.fullName", locale)} *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleNameChange}
            onBlur={() => formData.fullName && validateFullName(formData.fullName)}
            required
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">{getContent("onboarding.step1.age", locale)} *</Label>
          <Input
            id="age"
            type="number"
            placeholder="25"
            value={formData.age}
            onChange={handleAgeChange}
            onBlur={() => formData.age && validateAge(formData.age)}
            min="12"
            max="99"
            required
            className={errors.age ? "border-red-500" : ""}
          />
          {errors.age && (
            <p className="text-sm text-red-500">{errors.age}</p>
          )}
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
            onChange={handlePhoneChange}
            onBlur={() => formData.phone && validatePhone(formData.phone)}
            required
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{getContent("onboarding.step1.required", locale)}</p>
    </div>
  );
}
