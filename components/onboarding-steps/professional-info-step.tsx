"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n-config";

interface ProfessionalInfoStepProps {
  formData: {
    jobTitle: string;
    yearsOfExperience: string;
    skills: string[];
    bio: string;
  };
  updateFormData: (
    data: Partial<ProfessionalInfoStepProps["formData"]>
  ) => void;
  locale: Locale;
}

export function ProfessionalInfoStep({
  formData,
  updateFormData,
  locale,
}: ProfessionalInfoStepProps) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      updateFormData({ skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData({
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="jobTitle">
          {getContent("onboarding.step2.jobTitle", locale)}
        </Label>
        <Input
          id="jobTitle"
          type="text"
          placeholder={getContent(
            "onboarding.step2.jobTitlePlaceholder",
            locale
          )}
          value={formData.jobTitle}
          onChange={(e) => updateFormData({ jobTitle: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsOfExperience">
          {getContent("onboarding.step2.experience", locale)}
        </Label>
        <Input
          id="yearsOfExperience"
          type="number"
          placeholder={getContent(
            "onboarding.step2.experiencePlaceholder",
            locale
          )}
          value={formData.yearsOfExperience}
          onChange={(e) =>
            updateFormData({ yearsOfExperience: e.target.value })
          }
          min="0"
          max="50"
          required
        />
        <p className="text-xs text-muted-foreground">
          {getContent("onboarding.step2.experienceHint", locale)}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">
          {getContent("onboarding.step2.skills", locale)}
        </Label>
        <div className="flex gap-2">
          <Input
            id="skills"
            placeholder={getContent(
              "onboarding.step2.skillsPlaceholder",
              locale
            )}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            {getContent("onboarding.step2.addButton", locale)}
          </button>
        </div>
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          {getContent("onboarding.step2.skillsHint", locale)}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          {getContent("onboarding.step2.bio", locale)}
        </Label>
        <Textarea
          id="bio"
          placeholder={getContent("onboarding.step2.bioPlaceholder", locale)}
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          rows={6}
          required
        />
        <p className="text-xs text-muted-foreground">
          {getContent("onboarding.step2.bioCount", locale, {
            count: formData.bio.length.toString(),
          })}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        {getContent("onboarding.step2.required", locale)}
      </p>
    </div>
  );
}
