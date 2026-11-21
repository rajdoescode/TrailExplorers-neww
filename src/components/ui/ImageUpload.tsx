"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Plus,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Modal } from "./Modal";

export interface ImageUploadProps {
  label?: string;
  helperText?: string;
  value?: string | string[];
  onChange?: (val: any) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  aspectRatio?: "16/9" | "4/3" | "1/1" | "portrait" | "auto";
  disabled?: boolean;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  helperText = "PNG, JPG, WEBP, or AVIF up to 10MB",
  value,
  onChange,
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 10,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"],
  aspectRatio = "auto",
  disabled = false,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);
  const [urlInputModalOpen, setUrlInputModalOpen] = useState(false);
  const [manualUrl, setManualUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Normalize value to array
  const currentImages: string[] = React.useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return [value];
  }, [value]);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Invalid file format (${file.type || "unknown"}). Allowed: JPG, PNG, WEBP, AVIF, SVG.`;
    }
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `File exceeds maximum limit of ${maxSizeMB}MB (${fileSizeMB.toFixed(1)}MB).`;
    }
    return null;
  };

  const handleFiles = useCallback(
    (files: FileList | File[] | null) => {
      if (!files || files.length === 0 || disabled) return;

      const fileList = Array.from(files);
      setErrorMessage(null);

      // Validate each file
      for (const file of fileList) {
        const error = validateFile(file);
        if (error) {
          setErrorMessage(error);
          return;
        }
      }

      setIsUploading(true);
      setUploadProgress(20);

      // Simulate smooth upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 95;
          }
          return prev + 25;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);

        const newUrls: string[] = fileList.map((file) => URL.createObjectURL(file));

        if (multiple) {
          const combined = [...currentImages, ...newUrls].slice(0, maxFiles);
          onChange?.(combined);
        } else {
          onChange?.(newUrls[0]);
        }

        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    },
    [currentImages, disabled, maxFiles, maxSizeMB, multiple, onChange]
  );

  const handleRemoveImage = (indexToRemove: number) => {
    if (multiple) {
      const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
      onChange?.(updated);
    } else {
      onChange?.("");
    }
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    if (multiple) {
      onChange?.([...currentImages, manualUrl.trim()].slice(0, maxFiles));
    } else {
      onChange?.(manualUrl.trim());
    }
    setManualUrl("");
    setUrlInputModalOpen(false);
  };

  const aspectRatioClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "h-40",
  }[aspectRatio];

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {/* Label & Actions */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-xs sm:text-sm font-bold text-[#14140f] flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#6b6b63]" />
            {label}
            {multiple && (
              <span className="text-[11px] font-normal text-[#6b6b63]">
                ({currentImages.length}/{maxFiles})
              </span>
            )}
          </label>
        )}

        <button
          type="button"
          onClick={() => setUrlInputModalOpen(true)}
          className="text-[11px] font-bold text-[#6b6b63] hover:text-[#14140f] flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          Paste URL
        </button>
      </div>

      {/* Upload Zone / Drop Area */}
      {(!currentImages.length || multiple) && currentImages.length < maxFiles && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => {
            if (!disabled && !isUploading) fileInputRef.current?.click();
          }}
          className={cn(
            "relative rounded-[18px] border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 select-none",
            isDragging
              ? "border-[#14140f] bg-[#d6ff3f]/15 scale-[1.01]"
              : "border-[#e2e2dc] bg-[#fbfbf9] hover:border-[#14140f] hover:bg-white",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(",")}
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            disabled={disabled}
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <Loader2 className="w-8 h-8 text-[#14140f] animate-spin" />
              <p className="text-xs font-bold text-[#14140f]">Uploading media... {uploadProgress}%</p>
              <div className="w-48 h-1.5 bg-[#e2e2dc] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#14140f] transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#f6f6f1] border border-[#e2e2dc] flex items-center justify-center text-[#14140f] shadow-xs group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6 text-[#14140f]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-[#14140f]">
                  Click to browse or drag and drop
                </p>
                <p className="text-[11px] text-[#6b6b63] mt-0.5">{helperText}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-[#fdeeed] border border-[#fca5a5] text-xs font-bold text-[#e0455a] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Image Preview Grid */}
      {currentImages.length > 0 && (
        <div
          className={cn(
            multiple
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1"
              : "space-y-2 pt-1"
          )}
        >
          {currentImages.map((imgUrl, idx) => (
            <div
              key={`${imgUrl}-${idx}`}
              className={cn(
                "group relative rounded-[16px] overflow-hidden border-2 border-[#14140f] bg-white shadow-card transition-all hover:shadow-lg",
                multiple ? "aspect-square" : aspectRatioClass
              )}
            >
              <img
                src={imgUrl}
                alt={`Uploaded asset ${idx + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Hover Overlay with Action Buttons */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewModalUrl(imgUrl);
                  }}
                  className="p-2 rounded-full bg-white/90 text-[#14140f] hover:bg-white hover:scale-110 transition-all shadow-xs"
                  title="View Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {!multiple && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="p-2 rounded-full bg-white/90 text-[#14140f] hover:bg-white hover:scale-110 transition-all shadow-xs"
                    title="Replace Image"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(idx);
                  }}
                  className="p-2 rounded-full bg-[#fdeeed] text-[#e0455a] hover:bg-[#e0455a] hover:text-white hover:scale-110 transition-all shadow-xs"
                  title="Remove Image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-2 left-2 pointer-events-none">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#14140f]/80 text-white backdrop-blur-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#d6ff3f]" />
                  {multiple ? `#${idx + 1}` : "Ready"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {previewModalUrl && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewModalUrl(null)}
          title="Image Preview"
          size="lg"
        >
          <div className="w-full max-h-[75vh] flex items-center justify-center rounded-xl overflow-hidden bg-black/5 p-2">
            <img
              src={previewModalUrl}
              alt="Full Preview"
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </Modal>
      )}

      {/* Paste URL Modal */}
      {urlInputModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setUrlInputModalOpen(false)}
          title="Paste Image Asset URL"
          description="Enter a direct image URL or relative path from public assets"
          size="sm"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setUrlInputModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleManualUrlSubmit}>
                Add Image
              </Button>
            </>
          }
        >
          <form onSubmit={handleManualUrlSubmit} className="space-y-3">
            <input
              type="text"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="e.g. /assets/images/destinations/domestic/spiti.jpg"
              className="w-full bg-[#f6f6f1] border-2 border-[#e2e2dc] focus:border-[#14140f] rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none"
              autoFocus
            />
            <p className="text-[11px] text-[#6b6b63]">
              Tip: You can use existing public asset paths or external HTTPS URLs.
            </p>
          </form>
        </Modal>
      )}
    </div>
  );
};
