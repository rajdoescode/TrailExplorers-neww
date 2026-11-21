"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSwipeDownToClose } from "@/hooks/useSwipeDownToClose";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const { sheetRef, dragHandleRef } = useSwipeDownToClose({
    isOpen: true,
    onClose,
    overlayRef,
  });

  const imgSrc = normalizePostcardImg(postcard.image_url);
  const videoSrc = postcard.video_url || (postcard.embed_url?.endsWith(".mp4") ? postcard.embed_url : "");

  const togglePlay = () => {
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

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={postcard.title}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 touch-none overscroll-contain transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        className="relative max-w-sm sm:max-w-md w-full bg-[#14140f] border border-white/10 rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[92dvh] pb-[calc(16px+env(safe-area-inset-bottom,0px))] sm:pb-0"
      >
        {/* Mobile drag handle */}
        <div
          ref={dragHandleRef}
          className="w-12 h-1.5 bg-white/30 hover:bg-white/50 rounded-full mx-auto my-2.5 block sm:hidden cursor-grab active:cursor-grabbing touch-none select-none transition-colors"
          title="Drag down to close"
          aria-label="Drag down to close"
        />

        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff3f] animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {postcard.category || "Himalayan Reel"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {videoSrc && (
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#d6ff3f]" />
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close reel"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Video / Player Content */}
        <div className="relative w-full aspect-[9/16] max-h-[66vh] bg-black overflow-hidden flex items-center justify-center">
          {videoSrc ? (
            <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
              <video
                ref={videoRef}
                src={videoSrc}
                poster={imgSrc}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover"
              />
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#14140f]/90 text-[#d6ff3f] border-2 border-[#d6ff3f] flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 ml-1 fill-[#d6ff3f]" />
                  </div>
                </div>
              )}
            </div>
          ) : postcard.embed_url ? (
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
                <div className="w-16 h-16 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shadow-2xl">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info & Action */}
        <div className="p-4 sm:p-5 bg-[#14140f] text-white flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{postcard.author || "Trail Explorers Tribe"}</span>
            <span>{postcard.read_time || "0:45"}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
            {postcard.title}
          </h3>
          {postcard.subtitle && (
            <p className="text-xs text-white/80 line-clamp-2">
              {postcard.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
