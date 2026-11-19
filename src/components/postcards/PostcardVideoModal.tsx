"use client";

import React, { useEffect } from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { X, ExternalLink, Play } from "lucide-react";
import { Postcard } from "@/types";
import { normalizePostcardImg } from "./AttractionCard";

export interface PostcardVideoModalProps {
  postcard: Postcard;
  onClose: () => void;
}

export const PostcardVideoModal: React.FC<PostcardVideoModalProps> = ({
  postcard,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const targetUrl = postcard.video_url || postcard.embed_url || "https://instagram.com";
  const imgSrc = normalizePostcardImg(postcard.image_url);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={postcard.title}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 touch-none overscroll-contain transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-sm sm:max-w-md w-full bg-[#14140f] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d6ff3f] animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Himalayan Reel
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close reel"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Video / Embed Content */}
        <div className="relative w-full aspect-[9/16] max-h-[62vh] bg-black overflow-hidden flex items-center justify-center">
          {postcard.embed_url ? (
            <iframe
              src={postcard.embed_url}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={postcard.title}
            />
          ) : (
            <div className="relative w-full h-full">
              <SkeletonImage
                src={imgSrc}
                alt={postcard.title}
                fill
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover"
                skeletonClassName="rounded-none"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info & Action */}
        <div className="p-4 sm:p-5 bg-[#14140f] text-white flex flex-col gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
              {postcard.title}
            </h3>
            <p className="text-xs text-white/60 mt-1">
              Instagram Reel · {postcard.read_time || "1 min watch"}
            </p>
          </div>

          {/* External Instagram redirect link commented out for now as requested */}
          {/*
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-full bg-[#d6ff3f] text-[#14140f] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#c2eb32] transition-colors cursor-pointer"
          >
            <span>Watch Full Reel on Instagram</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          */}
        </div>
      </div>
    </div>
  );
};
