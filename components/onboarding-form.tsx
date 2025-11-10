"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BasicInfoStep } from "./onboarding-steps/basic-info-step";
import { ProfessionalInfoStep } from "./onboarding-steps/professional-info-step";
import { ResumeUploadStep } from "./onboarding-steps/resume-upload-step";
import { CheckCircle } from "lucide-react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n-config";

interface OnboardingFormProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  locale: Locale;
}

interface FormData {
  // Basic Info
  fullName: string;
  age: string;
  nationality: string;
  location: string;
  phone: string;
  
  // Professional Info
  yearsOfExperience: string;
  skills: string[];
  bio: string;
  
  // Resume
  resumeFile: File | null;
}

export function OnboardingForm({ user, locale }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: user.name || "",
    age: "",
    nationality: "",
    location: "",
    phone: "",
    yearsOfExperience: "",
    skills: [],
    bio: "",
    resumeFile: null,
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Submit form data to API
      console.log("Submitting:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { 
      number: 1, 
      title: getContent("onboarding.progress.step1.title", locale), 
      description: getContent("onboarding.progress.step1.description", locale) 
    },
    { 
      number: 2, 
      title: getContent("onboarding.progress.step2.title", locale), 
      description: getContent("onboarding.progress.step2.description", locale) 
    },
    { 
      number: 3, 
      title: getContent("onboarding.progress.step3.title", locale), 
      description: getContent("onboarding.progress.step3.description", locale) 
    },
  ];

  return (
    <div className="w-full max-w-3xl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep > step.number
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.number
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="h-[2px] flex-1 mx-2 mt-[-40px]">
                  <div
                    className={`h-full transition-colors ${
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {currentStep === 1 && getContent("onboarding.step1.title", locale)}
            {currentStep === 2 && getContent("onboarding.step2.title", locale)}
            {currentStep === 3 && getContent("onboarding.step3.title", locale)}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && getContent("onboarding.step1.description", locale)}
            {currentStep === 2 && getContent("onboarding.step2.description", locale)}
            {currentStep === 3 && getContent("onboarding.step3.description", locale)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step Content */}
          {currentStep === 1 && (
            <BasicInfoStep formData={formData} updateFormData={updateFormData} locale={locale} />
          )}
          {currentStep === 2 && (
            <ProfessionalInfoStep formData={formData} updateFormData={updateFormData} locale={locale} />
          )}
          {currentStep === 3 && (
            <ResumeUploadStep formData={formData} updateFormData={updateFormData} locale={locale} />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
            >
              {getContent("onboarding.navigation.back", locale)}
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                {getContent("onboarding.navigation.continue", locale)}
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting 
                  ? getContent("onboarding.navigation.submitting", locale)
                  : getContent("onboarding.navigation.submit", locale)
                }
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
