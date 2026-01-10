"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Upload, File, X, CheckCircle, User } from "lucide-react";
import { getContent } from "@/lib/content";
import { Locale } from "@/lib/i18n-config";
import Image from "next/image";
import { VideoRecorder } from "@/components/video-recorder";
import { AudioRecorder } from "@/components/audio-recorder";

interface ResumeUploadStepProps {
  formData: {
    resumeFile: File | null;
    profilePicture: File | null;
    introductionVideo: Blob | null;
    introductionAudio: Blob | null;
  };
  updateFormData: (data: {
    resumeFile?: File | null;
    profilePicture?: File | null;
    introductionVideo?: Blob | null;
    introductionAudio?: Blob | null;
  }) => void;
  locale: Locale;
}

export function ResumeUploadStep({
  formData,
  updateFormData,
  locale,
}: ResumeUploadStepProps) {
  const [isDraggingResume, setIsDraggingResume] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Generate image preview when profile picture changes
  useEffect(() => {
    if (formData.profilePicture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(formData.profilePicture);
    }
    return () => {
      if (!formData.profilePicture) {
        setImagePreview(null);
      }
    };
  }, [formData.profilePicture]);

  // Resume handlers
  const handleResumeDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingResume(true);
  };

  const handleResumeDragLeave = () => {
    setIsDraggingResume(false);
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingResume(false);

    const file = e.dataTransfer.files[0];
    if (file && isValidResumeFile(file)) {
      updateFormData({ resumeFile: file });
    } else {
      alert(getContent("onboarding.validation.invalidFile", locale));
    }
  };

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidResumeFile(file)) {
      updateFormData({ resumeFile: file });
    } else {
      alert(getContent("onboarding.validation.invalidFile", locale));
    }
  };

  // Profile picture handlers
  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(true);
  };

  const handleImageDragLeave = () => {
    setIsDraggingImage(false);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(false);

    const file = e.dataTransfer.files[0];
    if (file && isValidImageFile(file)) {
      updateFormData({ profilePicture: file });
    } else {
      alert("Please upload a valid image file (JPG, PNG, max 2MB)");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidImageFile(file)) {
      updateFormData({ profilePicture: file });
    } else {
      alert("Please upload a valid image file (JPG, PNG, max 2MB)");
    }
  };

  const isValidResumeFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const isValidImageFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const removeResume = () => {
    updateFormData({ resumeFile: null });
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    updateFormData({ profilePicture: null });
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Picture Upload */}
      <div className="space-y-2">
        <Label className="text-base">Profile Picture *</Label>

        {!formData.profilePicture ? (
          <div
            onDragOver={handleImageDragOver}
            onDragLeave={handleImageDragLeave}
            onDrop={handleImageDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDraggingImage
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 rounded-full bg-muted">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Upload your profile picture</p>
                <p className="text-sm text-muted-foreground mt-1">
                  JPG or PNG (max 2MB)
                </p>
              </div>
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Choose Photo
              </button>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {formData.profilePicture.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(formData.profilePicture.size)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-1 hover:bg-destructive/10 rounded transition-colors"
                >
                  <X className="h-5 w-5 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          This will be shown on your profile and to recruiters
        </p>
      </div>

      {/* Resume Upload */}
      <div className="space-y-2">
        <Label className="text-base">
          {getContent("onboarding.step3.resume", locale)}
        </Label>

        {!formData.resumeFile ? (
          <div
            onDragOver={handleResumeDragOver}
            onDragLeave={handleResumeDragLeave}
            onDrop={handleResumeDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDraggingResume
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">
                  {getContent("onboarding.step3.dropzone", locale)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {getContent("onboarding.step3.fileTypes", locale)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {getContent("onboarding.step3.chooseFile", locale)}
              </button>
            </div>
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeSelect}
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
                  <p className="font-medium truncate">
                    {formData.resumeFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(formData.resumeFile.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <button
                  type="button"
                  onClick={removeResume}
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

      {/* Video OR Audio Introduction (Optional) */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Label className="text-base">
              {getContent("onboarding.step3.introductionMedia", locale)}
            </Label>
            <span className="text-xs text-muted-foreground">
              {getContent("onboarding.step3.optionalChooseOne", locale)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {getContent("onboarding.step3.introMediaDescription", locale)}
          </p>
        </div>

        {/* Video Option */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {getContent("onboarding.step3.videoIntroduction", locale)}
          </Label>
          {formData.introductionAudio ? (
            <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/50">
              <p className="text-sm text-muted-foreground">
                {getContent("onboarding.step3.videoDisabled", locale)}
              </p>
            </div>
          ) : (
            <VideoRecorder
              onVideoRecorded={(videoBlob) =>
                updateFormData({ introductionVideo: videoBlob })
              }
              onVideoRemoved={() => updateFormData({ introductionVideo: null })}
              existingVideo={formData.introductionVideo}
            />
          )}
        </div>

        {/* Audio Option */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {getContent("onboarding.step3.audioIntroduction", locale)}
          </Label>
          {formData.introductionVideo ? (
            <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/50">
              <p className="text-sm text-muted-foreground">
                {getContent("onboarding.step3.audioDisabled", locale)}
              </p>
            </div>
          ) : (
            <AudioRecorder
              onAudioRecorded={(audioBlob) =>
                updateFormData({ introductionAudio: audioBlob })
              }
              onAudioRemoved={() => updateFormData({ introductionAudio: null })}
              existingAudio={formData.introductionAudio}
            />
          )}
        </div>
      </div>
    </div>
  );
}
