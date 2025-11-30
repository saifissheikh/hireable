"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, StopCircle, Play, Trash2 } from "lucide-react";

interface VideoRecorderProps {
  onVideoRecorded: (videoBlob: Blob) => void;
  onVideoRemoved: () => void;
  existingVideo?: Blob | null;
}

export function VideoRecorder({ onVideoRecorded, onVideoRemoved, existingVideo }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(existingVideo || null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(60);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopStream();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Mute during recording to avoid feedback
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { 
          type: MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4'
        });
        setRecordedVideo(blob);
        onVideoRecorded(blob);
        
        // Create URL for preview
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        
        stopStream();
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
          videoRef.current.muted = false;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setCountdown(60);

      // Start countdown timer
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError('Unable to access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const removeVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setRecordedVideo(null);
    setVideoUrl(null);
    setCountdown(60);
    onVideoRemoved();
    
    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Preview */}
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay={isRecording}
          playsInline
          controls={!isRecording && recordedVideo !== null}
          className="w-full h-full object-cover"
        />
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">{countdown}s</span>
          </div>
        )}
        
        {/* Empty state */}
        {!isRecording && !recordedVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Video className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">No video recorded yet</p>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        {!isRecording && !recordedVideo && (
          <Button 
            type="button"
            onClick={startRecording} 
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Recording (1 min max)
          </Button>
        )}

        {isRecording && (
          <Button 
            type="button"
            onClick={stopRecording} 
            variant="destructive" 
            className="flex-1"
          >
            <StopCircle className="w-4 h-4 mr-2" />
            Stop Recording
          </Button>
        )}

        {!isRecording && recordedVideo && (
          <>
            <Button 
              type="button"
              onClick={removeVideo} 
              variant="outline"
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove & Re-record
            </Button>
          </>
        )}
      </div>

      {/* Info text */}
      <p className="text-xs text-muted-foreground">
        {recordedVideo 
          ? "Video recorded successfully. You can remove and re-record if needed."
          : "Record a 1-minute video introduction about yourself. The recording will automatically stop after 60 seconds."
        }
      </p>
    </div>
  );
}
