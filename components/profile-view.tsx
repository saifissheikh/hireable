"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SkillsInput } from "@/components/skills-input";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n-config";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  Calendar,
  FileText,
  Download,
  Edit,
  Globe,
  Save,
  X,
  Upload
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Candidate {
  id: string;
  email: string;
  full_name: string;
  age: number;
  nationality: string;
  location: string;
  phone: string;
  years_of_experience: number;
  skills: string[];
  bio: string;
  resume_url: string | null;
  resume_filename: string | null;
  profile_picture_url: string | null;
  created_at: string;
}

interface ProfileViewProps {
  candidate: Candidate;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  locale: Locale;
}

export function ProfileView({ candidate, user, locale }: ProfileViewProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    bio: candidate.bio,
    skills: candidate.skills,
    phone: candidate.phone,
    location: candidate.location,
    yearsOfExperience: candidate.years_of_experience,
    resume: null as File | null,
  });

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      bio: candidate.bio,
      skills: candidate.skills,
      phone: candidate.phone,
      location: candidate.location,
      yearsOfExperience: candidate.years_of_experience,
      resume: null,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('skills', formData.skills.join(','));
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('yearsOfExperience', formData.yearsOfExperience.toString());
      
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('/api/candidates', {
        method: 'PATCH',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Refresh the page to show updated data
      router.refresh();
      setIsEditing(false);
      setFormData(prev => ({ ...prev, resume: null }));
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Header Card */}
      <Card>
        <CardHeader className="pb-3 space-y-4">
          {/* Profile Image and Name */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {candidate.profile_picture_url ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-primary/20 shrink-0 overflow-hidden bg-muted">
                  <Image 
                    src={candidate.profile_picture_url} 
                    alt={candidate.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : user.image ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-primary/20 shrink-0 overflow-hidden">
                  <Image 
                    src={user.image} 
                    alt={candidate.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-4 border-primary/20">
                  <User className="w-12 h-12 text-primary" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <CardTitle className="text-2xl sm:text-3xl mb-1 wrap-break-word">{candidate.full_name}</CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">{candidate.years_of_experience} {candidate.years_of_experience === 1 ? getContent("profile.year", locale) : getContent("profile.years", locale)} {getContent("profile.experience", locale).toLowerCase()}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Edit/Save/Cancel Buttons */}
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full sm:w-auto shrink-0"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {getContent("profile.editProfile", locale)}
              </Button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{getContent("profile.about", locale)}</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  className="min-h-[120px]"
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {candidate.bio}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{getContent("profile.skills", locale)}</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <SkillsInput 
                  skills={formData.skills}
                  onChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
                  placeholder="Type a skill and press Enter..."
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resume Section */}
          {(candidate.resume_url || isEditing) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{getContent("profile.resume", locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    {/* Current Resume Display */}
                    {candidate.resume_url && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium truncate text-sm">Current: {candidate.resume_filename}</p>
                            <p className="text-xs text-muted-foreground">{getContent("profile.pdfDocument", locale)}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild className="w-full sm:w-auto shrink-0">
                          <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" />
                            View
                          </a>
                        </Button>
                      </div>
                    )}
                    
                    {/* Upload New Resume */}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {formData.resume ? `Selected: ${formData.resume.name}` : 'Upload New Resume'}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formData.resume ? 'New resume will be uploaded when you save' : 'PDF, DOC, or DOCX (Max 5MB)'}
                      </p>
                    </div>
                  </div>
                ) : candidate.resume_url ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{candidate.resume_filename}</p>
                        <p className="text-xs text-muted-foreground">{getContent("profile.pdfDocument", locale)}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full sm:w-auto shrink-0">
                      <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        {getContent("profile.download", locale)}
                      </a>
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{getContent("profile.contactInformation", locale)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.email", locale)}</p>
                  <p className="font-medium break-all text-sm md:text-base">{candidate.email}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.phone", locale)}</p>
                  {isEditing ? (
                    <Input 
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone number"
                      className="text-sm md:text-base"
                    />
                  ) : (
                    <p className="font-medium text-sm md:text-base">{candidate.phone}</p>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.location", locale)}</p>
                  {isEditing ? (
                    <Input 
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location"
                      className="text-sm md:text-base"
                    />
                  ) : (
                    <p className="font-medium text-sm md:text-base">{candidate.location}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{getContent("profile.personalDetails", locale)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.age", locale)}</p>
                  <p className="font-medium text-sm md:text-base">{candidate.age} {getContent("profile.yearsOld", locale)}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.nationality", locale)}</p>
                  <p className="font-medium text-sm md:text-base">{candidate.nationality}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{getContent("profile.experience", locale)}</p>
                  {isEditing ? (
                    <Input 
                      type="number"
                      min="0"
                      max="50"
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: parseInt(e.target.value) || 0 }))}
                      className="text-sm md:text-base"
                    />
                  ) : (
                    <p className="font-medium text-sm md:text-base">
                      {candidate.years_of_experience} {candidate.years_of_experience === 1 ? getContent("profile.year", locale) : getContent("profile.years", locale)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
