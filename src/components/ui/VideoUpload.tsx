"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Film,
  UploadCloud,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RefreshCw,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Modal } from "./Modal";

export interface VideoUploadProps {
  label?: string;
  helperText?: string;
  value?: string;
  onChange?: (val: string) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  aspectRatio?: "reel" | "16/9" | "4/3" | "1/1" | "auto";
  disabled?: boolean;
  className?: string;
  posterUrl?: string;
  onDurationChange?: (durationStr: string, durationSec: number) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  label,
  helperText = "MP4, WebM, or MOV up to 100MB (9:16 vertical reel recommended)",
  value,
  onChange,
  maxSizeMB = 100,
  acceptedFormats = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/ogg",
    "video/x-m4v",
  ],
  aspectRatio = "reel",
  disabled = false,
  className,
  posterUrl,
  onDurationChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [fullscreenPreview, setFullscreenPreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = value || "";

  // Format seconds to M:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const vidDuration = videoRef.current.duration;
      setDuration(vidDuration);
      if (onDurationChange && !isNaN(vidDuration)) {
        onDurationChange(formatTime(vidDuration), Math.round(vidDuration));
      }
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Validate file
  const validateFile = (file: File): string | null => {
    // Check mime type or file extension
    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowedExts = ["mp4", "webm", "mov", "m4v", "ogg"];
    const isValidFormat =
      acceptedFormats.includes(file.type) ||
      (extension && allowedExts.includes(extension));

    if (!isValidFormat) {
      return `Invalid format (${file.type || extension}). Allowed: MP4, WebM, MOV.`;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `Video size (${fileSizeMB.toFixed(1)}MB) exceeds limit of ${maxSizeMB}MB.`;
    }

    return null;
  };

  // Handle uploaded files
  const handleFiles = useCallback(
    (files: FileList | File[] | null) => {
      if (!files || files.length === 0 || disabled) return;
      const file = files[0];
      setErrorMessage(null);

      const err = validateFile(file);
      if (err) {
        setErrorMessage(err);
        return;
      }

      setIsUploading(true);
      setUploadProgress(15);

      // Smooth simulated upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 85) {
            clearInterval(interval);
            return 92;
          }
          return prev + 18;
        });
      }, 120);

      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);

        const objectUrl = URL.createObjectURL(file);
        onChange?.(objectUrl);

        setIsUploading(false);
        setUploadProgress(0);
        setIsPlaying(true);
      }, 700);
    },
    [disabled, maxSizeMB, acceptedFormats, onChange]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    onChange?.(manualUrl.trim());
    setManualUrl("");
    setUrlModalOpen(false);
  };

  const handleUsePreset = (presetUrl: string) => {
    onChange?.(presetUrl);
    setUrlModalOpen(false);
  };

  // Aspect ratio classes for dropzone and preview
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case "reel":
        return "aspect-[9/16] max-w-[280px]";
      case "16/9":
        return "aspect-video max-w-xl";
      case "4/3":
        return "aspect-[4/3] max-w-md";
      case "1/1":
        return "aspect-square max-w-[320px]";
      case "auto":
      default:
        return "min-h-[260px] max-w-full";
    }
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#14140f] tracking-wide uppercase">
            {label}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUrlModalOpen(true)}
              className="text-xs text-[#6b6b63] hover:text-[#14140f] flex items-center gap-1 font-semibold transition-colors"
            >
              <LinkIcon className="w-3 h-3" />
              <span>Paste URL</span>
            </button>
            <button
              type="button"
              onClick={() => handleUsePreset("/assets/videos/hero-loop.mp4")}
              className="text-xs text-[#14140f] bg-[#d6ff3f] hover:bg-[#c4ed32] px-2 py-0.5 rounded-md flex items-center gap-1 font-bold transition-colors"
              title="Quickly fill with default Himalayan Expedition sample video"
            >
              <Sparkles className="w-3 h-3" />
              <span>Use Sample Reel</span>
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        accept={acceptedFormats.join(",")}
        className="hidden"
        disabled={disabled}
      />

      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fdeeed] border border-[#f7c8c5] text-[#b91c1c] text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-[#b91c1c] hover:opacity-75"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Uploading Progress State */}
      {isUploading ? (
        <div className="p-8 border-2 border-[#14140f] rounded-2xl bg-[#f6f6f1] flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#14140f] text-[#d6ff3f] flex items-center justify-center shadow-md animate-pulse">
            <Film className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#14140f]">
              Processing Video Reel... {uploadProgress}%
            </h4>
            <p className="text-xs text-[#6b6b63] mt-1">
              Validating bitrate, audio track, and generating optimized stream preview
            </p>
          </div>
          <div className="w-full max-w-xs bg-[#e2e2dc] rounded-full h-2.5 overflow-hidden border border-[#d2d2cc]">
            <div
              className="bg-[#14140f] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : currentVideo ? (
        /* Video Preview State */
        <div className="space-y-3">
          <div
            className={cn(
              "relative mx-auto rounded-[24px] overflow-hidden bg-black border-4 border-[#14140f] shadow-2xl group transition-all",
              getAspectRatioClasses()
            )}
          >
            {/* The HTML5 Video Element */}
            <video
              ref={videoRef}
              src={currentVideo}
              poster={posterUrl}
              loop
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Top Badges / Overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                <Film className="w-3 h-3 text-[#d6ff3f]" />
                {aspectRatio === "reel" ? "9:16 Reel" : "Video"}
              </span>

              <div className="flex items-center gap-1 pointer-events-auto">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors border border-white/20"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#d6ff3f]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenPreview(true);
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors border border-white/20"
                  title="Expand Full Preview"
                >
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Center Play/Pause Splash Icon Overlay */}
            <div
              onClick={togglePlay}
              className={cn(
                "absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity z-10",
                isPlaying
                  ? "opacity-0 group-hover:opacity-80 bg-black/20"
                  : "opacity-100 bg-black/40"
              )}
            >
              <div className="w-16 h-16 rounded-full bg-[#14140f]/90 text-[#d6ff3f] border-2 border-[#d6ff3f] flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110">
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-[#d6ff3f]" />
                ) : (
                  <Play className="w-7 h-7 ml-1 fill-[#d6ff3f]" />
                )}
              </div>
            </div>

            {/* Bottom Scrubber & Time Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 z-10 flex flex-col gap-1.5 pointer-events-auto">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#d6ff3f]"
              />
              <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                <span>{formatTime(currentTime)}</span>
                <span className="text-white/60">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Below Video */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Replace Video
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUrlModalOpen(true)}
              leftIcon={<LinkIcon className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Change URL
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                setIsPlaying(false);
                onChange?.("");
              }}
              leftIcon={<X className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        /* Empty Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative border-2 border-dashed rounded-[22px] p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 select-none bg-[#fdfdfc]",
            isDragging
              ? "border-[#14140f] bg-[#eef8bb]"
              : "border-[#d2d2cc] hover:border-[#14140f] hover:bg-[#f6f6f1]",
            disabled && "opacity-50 cursor-not-allowed hover:border-[#d2d2cc] hover:bg-[#fdfdfc]"
          )}
        >
          <div className="w-14 h-14 rounded-full bg-[#14140f] text-[#d6ff3f] flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="text-sm font-bold text-[#14140f]">
            Drop travel video or reel here, or{" "}
            <span className="text-[#14140f] underline decoration-2 decoration-[#d6ff3f] underline-offset-4">
              browse files
            </span>
          </p>

          <p className="text-xs text-[#6b6b63] mt-1.5 max-w-sm">
            {helperText}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              leftIcon={<Film className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Choose Video File
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setUrlModalOpen(true);
              }}
              leftIcon={<LinkIcon className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Paste Stream URL
            </Button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUsePreset("/assets/videos/hero-loop.mp4");
              }}
              className="text-xs text-[#14140f] bg-[#d6ff3f] hover:bg-[#c4ed32] px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use Hero Loop Reel</span>
            </button>
          </div>
        </div>
      )}

      {/* Manual URL Input Modal */}
      {urlModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setUrlModalOpen(false)}
          title="Provide Video Stream URL"
          size="sm"
        >
          <form onSubmit={handleManualUrlSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#14140f] mb-1.5">
                Video CDN or Stream Link (MP4 / WebM)
              </label>
              <input
                type="text"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="https://.../reel.mp4 or /assets/videos/hero-loop.mp4"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#e2e2dc] focus:border-[#14140f] text-sm text-[#14140f] outline-none"
                autoFocus
              />
            </div>

            <div className="p-3 bg-[#f6f6f1] rounded-xl border border-[#e2e2dc] space-y-2">
              <span className="text-[11px] font-bold text-[#6b6b63] uppercase tracking-wider block">
                Quick Sample Presets
              </span>
              <button
                type="button"
                onClick={() => handleUsePreset("/assets/videos/hero-loop.mp4")}
                className="w-full text-left text-xs font-bold text-[#14140f] hover:text-[#000] p-2 rounded-lg bg-white border border-[#e2e2dc] hover:border-[#14140f] flex items-center justify-between transition-colors"
              >
                <span>Himalayan Expedition Reel (/assets/videos/hero-loop.mp4)</span>
                <span className="text-[10px] bg-[#d6ff3f] text-[#14140f] px-1.5 py-0.5 rounded font-extrabold">
                  Sample
                </span>
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setUrlModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!manualUrl.trim()}
              >
                Set Video URL
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Fullscreen Reel Preview Modal */}
      {fullscreenPreview && currentVideo && (
        <Modal
          isOpen={true}
          onClose={() => setFullscreenPreview(false)}
          title="Video Reel Preview"
          size="md"
        >
          <div className="flex flex-col items-center justify-center p-2">
            <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[36px] bg-black overflow-hidden border-[6px] border-[#14140f] shadow-2xl">
              <video
                ref={modalVideoRef}
                src={currentVideo}
                poster={posterUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
