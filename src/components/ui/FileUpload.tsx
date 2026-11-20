"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, X, File, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  accept?: string;
  maxSizeMB?: number;
  value?: string;
  onChange?: (fileUrl: string) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  helperText = "PNG, JPG, WEBP, or MP4 up to 50MB",
  accept = "image/*,video/*",
  maxSizeMB = 50,
  value,
  onChange,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setFileName(file.name);
    if (onChange) {
      onChange(previewUrl);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClear = () => {
    setPreview(undefined);
    setFileName("");
    if (onChange) onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <label className="text-xs sm:text-sm font-bold text-[#14140f] block">
          {label}
        </label>
      )}

      {preview ? (
        <div className="rounded-[18px] border-2 border-[#14140f] bg-white p-3 flex items-center justify-between gap-3 shadow-card">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 relative border border-[#e2e2dc]">
              {preview.includes(".mp4") || preview.includes("video") ? (
                <div className="w-full h-full flex items-center justify-center bg-[#14140f] text-white">
                  <File className="w-6 h-6" />
                </div>
              ) : (
                <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-[#14140f] truncate">
                {fileName || "Uploaded Media Asset"}
              </p>
              <span className="text-[10px] text-[#2fa84f] font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                Ready to use
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-full hover:bg-[#fdeeed] text-[#e0455a] transition-colors"
            title="Remove media"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "rounded-[18px] border-2 border-dashed p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
            isDragging
              ? "border-[#14140f] bg-[#d6ff3f]/10"
              : "border-[#e2e2dc] bg-[#f6f6f1] hover:border-[#14140f] hover:bg-white"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-white border border-[#e2e2dc] flex items-center justify-center text-[#14140f] shadow-xs">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#14140f]">
              Click to upload or drag & drop asset
            </p>
            <p className="text-[11px] text-[#6b6b63] mt-0.5">{helperText}</p>
          </div>
        </div>
      )}
    </div>
  );
};
