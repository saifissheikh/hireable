"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BasicInfoStep } from "./onboarding-steps/basic-info-step";
import { ProfessionalInfoStep } from "./onboarding-steps/professional-info-step";
import { ResumeUploadStep } from "./onboarding-steps/resume-upload-step";
import { CheckCircle, AlertCircle } from "lucide-react";
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
  const [validationError, setValidationError] = useState<string>("");
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

  const validateStep1 = (): boolean => {
    const { fullName, age, nationality, location, phone } = formData;
    
    // Check all required fields are filled
    if (!fullName.trim() || !age || !nationality || !location.trim() || !phone.trim()) {
      setValidationError(getContent("onboarding.validation.fillAllFields", locale));
      return false;
    }

    // Validate name (only letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(fullName)) {
      setValidationError(getContent("onboarding.validation.nameInvalid", locale));
      return false;
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 12 || ageNum > 99) {
      setValidationError(getContent("onboarding.validation.ageRange", locale));
      return false;
    }

    // Validate phone
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      setValidationError(getContent("onboarding.validation.phoneInvalid", locale));
      return false;
    }

    setValidationError("");
    return true;
  };

  const validateStep2 = (): boolean => {
    const { yearsOfExperience, skills, bio } = formData;
    
    if (!yearsOfExperience) {
      setValidationError(getContent("onboarding.validation.experienceRequired", locale));
      return false;
    }

    if (skills.length < 3) {
      setValidationError(getContent("onboarding.validation.skillsMinimum", locale));
      return false;
    }

    if (!bio.trim() || bio.length < 50) {
      setValidationError(getContent("onboarding.validation.bioMinimum", locale));
      return false;
    }

    setValidationError("");
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.resumeFile) {
      setValidationError(getContent("onboarding.validation.resumeRequired", locale));
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      return;
    }

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
    // Validate step 3 before submitting
    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Submit form data to API
      console.log("Submitting:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect to thank you page
      window.location.href = "/onboarding/complete";
    } catch (error) {
      console.error("Error submitting form:", error);
      setValidationError("Failed to submit form. Please try again.");
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
          {/* Validation Error Message */}
          {validationError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-200">{validationError}</p>
            </div>
          )}

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
