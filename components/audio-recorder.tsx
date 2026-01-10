"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Pause, Trash2, Download } from "lucide-react";

interface AudioRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
  onAudioRemoved: () => void;
  existingAudio: Blob | null;
}

export function AudioRecorder({
  onAudioRecorded,
  onAudioRemoved,
  existingAudio,
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const MAX_DURATION = 60; // 60 seconds = 1 minute

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  // Update audio element when existingAudio changes
  useEffect(() => {
    if (existingAudio && !audioUrlRef.current) {
      const url = URL.createObjectURL(existingAudio);
      audioUrlRef.current = url;

      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    }
  }, [existingAudio]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        onAudioRecorded(audioBlob);

        // Create URL for playback
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
        }
        const url = URL.createObjectURL(audioBlob);
        audioUrlRef.current = url;

        const audio = new Audio(url);
        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          // Auto-stop at max duration
          if (newTime >= MAX_DURATION) {
            stopRecording();
            return MAX_DURATION;
          }
          return newTime;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  };

  const togglePlayPause = () => {
    if (!audioUrlRef.current) return;

    if (!audioElementRef.current) {
      const audio = new Audio(audioUrlRef.current);
      audioElementRef.current = audio;

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const removeAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setRecordingTime(0);
    onAudioRemoved();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const downloadAudio = () => {
    if (audioUrlRef.current) {
      const a = document.createElement("a");
      a.href = audioUrlRef.current;
      a.download = "audio-introduction.webm";
      a.click();
    }
  };

  // If we have existing audio or just recorded, show player
  if (existingAudio && !isRecording) {
    return (
      <div className="border-2 border-primary/20 rounded-lg p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Audio Introduction</p>
                <p className="text-sm text-muted-foreground">
                  Duration: {formatTime(duration)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={togglePlayPause}
              className="flex-1"
              variant="default"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={downloadAudio}
              variant="outline"
              size="icon"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              onClick={removeAudio}
              variant="outline"
              size="icon"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Recording interface
  if (isRecording) {
    return (
      <div className="border-2 border-red-500/50 rounded-lg p-6 bg-red-50 dark:bg-red-950/20">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-red-500/20 animate-pulse">
              <Mic className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatTime(recordingTime)}
              </p>
              <p className="text-sm text-muted-foreground">
                Recording... (Max: {formatTime(MAX_DURATION)})
              </p>
            </div>
          </div>

          {/* Progress bar showing time left */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all"
              style={{ width: `${(recordingTime / MAX_DURATION) * 100}%` }}
            />
          </div>

          <Button
            type="button"
            onClick={stopRecording}
            className="w-full"
            variant="destructive"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop Recording
          </Button>
        </div>
      </div>
    );
  }

  // Initial state - show record button
  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="p-4 rounded-full bg-primary/10">
          <Mic className="h-8 w-8 text-primary" />
        </div>
        <div>
          <p className="font-medium">Record Audio Introduction</p>
          <p className="text-sm text-muted-foreground mt-1">
            Record up to 1 minute of audio
          </p>
        </div>
        <Button type="button" onClick={startRecording} className="mt-2">
          <Mic className="h-4 w-4 mr-2" />
          Start Recording
        </Button>
      </div>
    </div>
  );
}
