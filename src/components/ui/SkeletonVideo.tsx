"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  skeletonClassName?: string;
  posterSrc?: string;
}

/**
 * Premium Skeleton Video Component
 * - Pure skeleton loading with animated dark shimmer
 * - No play icons or video player controls
 * - Smooth fade-in once video is ready and playing
 * - Clean mobile & desktop presentation
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
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      if (videoRef.current.readyState >= 3) {
        setIsReady(true);
      }
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay prevented by browser
        });
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

  const handlePlaying = () => {
    setIsReady(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setHasError(true);
    setIsReady(true);
    if (onError) onError(e);
  };

  const effectivePoster = poster || posterSrc;

  return (
    <>
      {/* Dark Shimmer Skeleton Loading (NO video player buttons or icons) */}
      {!isReady && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-0 bg-[#14140f] skeleton-shimmer-dark flex items-center justify-center transition-opacity duration-500 pointer-events-none",
            skeletonClassName
          )}
          style={{
            backgroundImage: effectivePoster ? `url(${effectivePoster})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Main Video Element with Smooth Fade-in */}
      <video
        ref={videoRef}
        poster={effectivePoster}
        onLoadedData={handleReady}
        onCanPlay={handleCanPlay}
        onPlaying={handlePlaying}
        onError={handleError}
        playsInline
        muted
        autoPlay
        loop
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        className={cn(
          className,
          "pointer-events-none transition-opacity duration-700 ease-out",
          isReady && !hasError ? "opacity-100" : "opacity-0"
        )}
        {...props}
      >
        {children}
      </video>
    </>
  );
};
