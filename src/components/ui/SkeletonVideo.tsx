"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

export interface SkeletonVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  skeletonClassName?: string;
  posterSrc?: string;
}

/**
 * Premium Skeleton Video Component
 * - Shows an animated skeleton matching video dimensions
 * - Subtle animated play icon in center while buffering/loading
 * - Smooth fade-in once video is ready to play
 * - Preserves aspect ratios and layout
 */
export const SkeletonVideo: React.FC<SkeletonVideoProps> = ({
  className,
  skeletonClassName,
  posterSrc,
  poster,
  onLoadedData,
  onCanPlay,
  onError,
  children,
  ...props
}) => {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check if video is already ready on mount (e.g. cached)
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 2) {
        setIsReady(true);
      }
    }
  }, []);

  const handleReady = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsReady(true);
    if (onLoadedData) onLoadedData(e);
  };

  const handleCanPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsReady(true);
    if (onCanPlay) onCanPlay(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setHasError(true);
    setIsReady(true);
    if (onError) onError(e);
  };

  const effectivePoster = poster || posterSrc;

  return (
    <>
      {/* Animated Skeleton with Centered Play Icon Placeholder */}
      {!isReady && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-0 skeleton-shimmer flex items-center justify-center transition-opacity duration-500 pointer-events-none",
            skeletonClassName
          )}
          style={{
            backgroundImage: effectivePoster ? `url(${effectivePoster})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Subtle animated play icon placeholder */}
          <div className="relative z-1 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white/80 animate-pulse shadow-lg">
            <Play className="w-6 h-6 fill-white/80 ml-1 opacity-90" />
          </div>
        </div>
      )}

      {/* Main Video Element with Smooth Fade-in */}
      <video
        ref={videoRef}
        poster={effectivePoster}
        onLoadedData={handleReady}
        onCanPlay={handleCanPlay}
        onError={handleError}
        className={cn(
          className,
          "transition-opacity duration-600 ease-out",
          isReady && !hasError ? "opacity-100" : "opacity-0"
        )}
        {...props}
      >
        {children}
      </video>
    </>
  );
};
