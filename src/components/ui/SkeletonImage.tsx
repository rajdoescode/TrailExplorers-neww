"use client";

import React, { useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export interface SkeletonImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  skeletonClassName?: string;
  fallbackSrc?: string;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  containerClassName?: string;
}

/**
 * Premium Skeleton Image Component
 * - Shows an animated soft-grey shimmer placeholder (#EAEAEA to #F5F5F5) while loading
 * - Smoothly fades in the image upon successful load
 * - Avoids layout shifts (CLS = 0)
 * - Graceful fallback on error
 * - Zero flash on cached re-renders
 */
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  fill,
  width,
  height,
  className,
  skeletonClassName,
  containerClassName,
  fallbackSrc = "/assets/images/home/hero-poster.jpg",
  priority = false,
  sizes,
  style,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Normalize image source
  const imageSrc = hasError
    ? fallbackSrc
    : typeof src === "string"
    ? src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")
      ? src
      : `/${src}`
    : src;

  // Check if image is already cached/complete on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
    } else {
      setIsLoaded(true); // stop skeleton if fallback also errors
    }
    if (onError) onError(e);
  };

  // Extract corner radius from className if present to match skeleton shape
  const roundedClass =
    (typeof className === "string" &&
      className
        .split(" ")
        .filter((c) => c.startsWith("rounded-"))
        .join(" ")) ||
    "";

  if (fill) {
    return (
      <>
        {/* Shimmer Skeleton Placeholder while loading */}
        {!isLoaded && (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 skeleton-shimmer pointer-events-none transition-opacity duration-300",
              roundedClass,
              skeletonClassName
            )}
          />
        )}

        {/* Fallback Display if Error */}
        {hasError && (
          <div
            className={cn(
              "absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#f0f0eb] text-[#8e8e84] text-xs p-2 text-center",
              roundedClass,
              skeletonClassName
            )}
          >
            <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
            <span className="line-clamp-1 text-[11px] font-medium">{alt || "Image unavailable"}</span>
          </div>
        )}

        {/* Main Image with Smooth Fade-in */}
        <Image
          ref={imgRef}
          src={imageSrc}
          alt={alt || "Image"}
          fill
          priority={priority}
          sizes={sizes || "(max-width: 768px) 100vw, 1200px"}
          className={cn(
            className,
            "transition-opacity duration-500 ease-out",
            isLoaded && !hasError ? "opacity-100" : "opacity-0"
          )}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </>
    );
  }

  // Non-fill (fixed width/height or responsive)
  return (
    <div
      className={cn(
        "relative overflow-hidden inline-block",
        roundedClass,
        containerClassName
      )}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
        height: height ? (typeof height === "number" ? `${height}px` : height) : "auto",
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {/* Shimmer Skeleton Placeholder */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-0 skeleton-shimmer pointer-events-none transition-opacity duration-300",
            roundedClass,
            skeletonClassName
          )}
        />
      )}

      {/* Fallback Display if Error */}
      {hasError && (
        <div
          className={cn(
            "absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#f0f0eb] text-[#8e8e84] text-xs p-2 text-center",
            roundedClass,
            skeletonClassName
          )}
        >
          <ImageIcon className="w-5 h-5 mb-1 opacity-50" />
          <span className="line-clamp-1 text-[10px] font-medium">{alt || "Image unavailable"}</span>
        </div>
      )}

      {/* Main Image */}
      <Image
        ref={imgRef}
        src={imageSrc}
        alt={alt || "Image"}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={cn(
          className,
          "transition-opacity duration-500 ease-out",
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        )}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};
