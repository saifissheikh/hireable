"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { getContent } from "@/lib/content";
import { Locale } from "@/lib/i18n-config";

interface ResumeUploadStepProps {
  formData: {
    resumeFile: File | null;
  };
  updateFormData: (data: { resumeFile: File | null }) => void;
  locale: Locale;
}

export function ResumeUploadStep({ formData, updateFormData, locale }: ResumeUploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      updateFormData({ resumeFile: file });
    } else {
      alert(getContent("onboarding.validation.invalidFile", locale));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      updateFormData({ resumeFile: file });
    } else {
      alert(getContent("onboarding.validation.invalidFile", locale));
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const removeFile = () => {
    updateFormData({ resumeFile: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{getContent("onboarding.step3.resume", locale)}</Label>
        
        {!formData.resumeFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{getContent("onboarding.step3.dropzone", locale)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {getContent("onboarding.step3.fileTypes", locale)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {getContent("onboarding.step3.chooseFile", locale)}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="p-2 rounded bg-primary/10">
                  <File className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{formData.resumeFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(formData.resumeFile.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 hover:bg-destructive/10 rounded transition-colors"
                >
                  <X className="h-5 w-5 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {getContent("onboarding.step3.hint", locale)}
        </p>
      </div>
    </div>
  );
}
