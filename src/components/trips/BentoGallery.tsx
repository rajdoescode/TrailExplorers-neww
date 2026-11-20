"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useSwipeDownToClose } from "@/hooks/useSwipeDownToClose";

interface BentoGalleryProps {
  images: string[];
  title: string;
}

export function BentoGallery({ images, title }: BentoGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const lightboxOverlayRef = useRef<HTMLDivElement>(null);
  const { sheetRef: lightboxSheetRef } = useSwipeDownToClose({
    isOpen: lightboxOpen,
    onClose: () => setLightboxOpen(false),
    overlayRef: lightboxOverlayRef,
  });

  // Mobile Interactive Flip Stack State
  const [activeStackIdx, setActiveStackIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const totalPhotos = images.length;
  const isFiveTileBento = totalPhotos === 5;

  // Auto-play timer for mobile flip card stack
  const nextStackCard = useCallback(() => {
    if (totalPhotos <= 1) return;
    setActiveStackIdx((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos]);

  const resetStackTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalPhotos <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveStackIdx((prev) => (prev + 1) % totalPhotos);
    }, 3500);
  }, [totalPhotos]);

  useEffect(() => {
    resetStackTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetStackTimer]);

  const handleStackClick = () => {
    nextStackCard();
    resetStackTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleStackClick();
      } else {
        setActiveStackIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos);
        resetStackTimer();
      }
    }
  };

  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos]);

  const prevPhoto = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  }, [totalPhotos]);

  // Global reference-counted scroll lock for fullscreen lightbox
  useScrollLock(lightboxOpen);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, nextPhoto, prevPhoto]);

  return (
    <section className="relative w-full py-2 sm:py-6 bg-white overflow-hidden">
      {/* MOBILE INTERACTIVE FLIP-CARD STACK (Matching Authentic Awara Banjara Design) */}
      <div className="block md:hidden px-4 pt-2 pb-6 text-center overflow-visible">
        <div
          onClick={handleStackClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={0}
          aria-label="Trip photo gallery stack. Tap to flip to next photo"
          className="relative w-[min(280px,74vw)] aspect-[3/4] mx-auto cursor-pointer select-none touch-pan-y active:scale-[0.98] transition-transform duration-200"
        >
          {images.map((img, idx) => {
            const pos = (idx - activeStackIdx + totalPhotos) % totalPhotos;

            let transform = "translateY(12px) translateX(8px) rotate(11deg) scale(0.85)";
            let zIndex = 0;
            let opacity = 0;
            let boxShadow = "none";

            if (pos === 0) {
              transform = "translateY(0) scale(1) rotate(0deg)";
              zIndex = 10;
              opacity = 1;
              boxShadow = "0 24px 50px rgba(20, 20, 15, 0.26)";
            } else if (pos === 1) {
              transform = "translateY(-14px) translateX(28px) rotate(6deg) scale(0.96)";
              zIndex = 8;
              opacity = 0.96;
              boxShadow = "0 16px 36px rgba(20, 20, 15, 0.18)";
            } else if (pos === 2) {
              transform = "translateY(-10px) translateX(-32px) rotate(-7deg) scale(0.92)";
              zIndex = 6;
              opacity = 0.9;
              boxShadow = "0 14px 32px rgba(20, 20, 15, 0.15)";
            } else if (pos === 3 || pos === 4) {
              transform = "translateY(12px) translateX(8px) rotate(11deg) scale(0.85)";
              zIndex = 2;
              opacity = 0.6;
              boxShadow = "0 10px 24px rgba(20, 20, 15, 0.12)";
            }

            return (
              <div
                key={`${img}-${idx}`}
                className="absolute inset-0 rounded-[24px] overflow-hidden bg-[#f6f6f1] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  boxShadow,
                }}
                data-pos={pos}
              >
                <SkeletonImage
                  src={img}
                  alt={`${title} - Photo ${idx + 1}`}
                  fill
                  priority={pos === 0}
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-cover rounded-[24px] pointer-events-none select-none"
                  skeletonClassName="rounded-[24px]"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP BENTO GALLERY */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CASE A: EXACT 5-PHOTO BENTO (Spiti Valley - Screenshots 1 & 2) */}
        {isFiveTileBento ? (
          <div className="relative">
            <div
              className={`relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 transition-all duration-500 ${
                isExpanded
                  ? "h-[480px] sm:h-[540px]"
                  : "h-[380px] sm:h-[440px] overflow-hidden"
              }`}
            >
              {/* Column 1 (Left Tall Tile) */}
              <div
                onClick={() => openLightbox(0)}
                className="relative h-full rounded-2xl overflow-hidden cursor-pointer group bg-[#e8e8e2] border border-[#e2e2dc]"
              >
                <SkeletonImage
                  src={images[0]}
                  alt={`${title} - Photo 1`}
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  skeletonClassName="rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
              </div>

              {/* Column 2 (Stacked 2 Tiles) */}
              <div className="flex flex-col gap-3 sm:gap-4 h-full">
                <div
                  onClick={() => openLightbox(1)}
                  className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer group bg-[#e8e8e2] border border-[#e2e2dc]"
                >
                  <SkeletonImage
                    src={images[1]}
                    alt={`${title} - Photo 2`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    skeletonClassName="rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
                <div
                  onClick={() => openLightbox(2)}
                  className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer group bg-[#e8e8e2] border border-[#e2e2dc]"
                >
                  <SkeletonImage
                    src={images[2]}
                    alt={`${title} - Photo 3`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    skeletonClassName="rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Column 3 (Middle-Right Tall Tile) */}
              <div
                onClick={() => openLightbox(3)}
                className="relative h-full rounded-2xl overflow-hidden cursor-pointer group bg-[#e8e8e2] border border-[#e2e2dc]"
              >
                <SkeletonImage
                  src={images[3]}
                  alt={`${title} - Photo 4`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  skeletonClassName="rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
              </div>

              {/* Column 4 (Right Tall Tile) */}
              <div
                onClick={() => openLightbox(4)}
                className="relative h-full rounded-2xl overflow-hidden cursor-pointer group bg-[#e8e8e2] border border-[#e2e2dc]"
              >
                <SkeletonImage
                  src={images[4]}
                  alt={`${title} - Photo 5`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  skeletonClassName="rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
              </div>
            </div>

            {/* Bottom Gradient Fade when collapsed */}
            {!isExpanded && (
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/95 via-white/60 to-transparent pointer-events-none rounded-b-2xl" />
            )}

            {/* Centered Show all / Show fewer Button */}
            <div
              className={
                isExpanded
                  ? "mt-6 flex justify-center"
                  : "absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
              }
            >
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center justify-center bg-[#14140f] text-[#d6ff3f] hover:bg-black px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer font-heading tracking-wide border border-[#14140f]"
              >
                {isExpanded ? "Show fewer photos" : `Show all ${totalPhotos} photos`}
              </button>
            </div>
          </div>
        ) : (
          /* CASE B: MULTI-PHOTO GALLERY WALL (Naggar 16 photos - Screenshots 3, 4, 5) */
          <div className="relative">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 transition-all duration-500 ${
                isExpanded ? "max-h-none" : "max-h-[460px] overflow-hidden relative"
              }`}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative h-[200px] sm:h-[260px] rounded-2xl overflow-hidden cursor-pointer group bg-[#e8e8e2] border border-[#e2e2dc]"
                >
                  <SkeletonImage
                    src={img}
                    alt={`${title} - Photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                    priority={idx < 4}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    skeletonClassName="rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Bottom Gradient Fade when collapsed */}
            {!isExpanded && (
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-2xl z-10" />
            )}

            {/* Centered Show all / Show fewer Button */}
            <div
              className={
                isExpanded
                  ? "mt-6 flex justify-center"
                  : "absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
              }
            >
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center justify-center bg-[#14140f] text-[#d6ff3f] hover:bg-black px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer font-heading tracking-wide border border-[#14140f]"
              >
                {isExpanded ? "Show fewer photos" : `Show all ${totalPhotos} photos`}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL (When any photo tile is clicked) */}
      {lightboxOpen && (
        <div
          ref={lightboxOverlayRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md touch-none overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div ref={lightboxSheetRef} className="w-full h-full flex flex-col justify-between">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                {title}
              </h3>
              <p className="text-xs text-[#d6ff3f] font-semibold mt-0.5">
                Photo {activeIdx + 1} of {totalPhotos}
              </p>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image View */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <SkeletonImage
                src={images[activeIdx]}
                alt={`${title} - photo ${activeIdx + 1}`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>

            {/* Prev / Next Navigation Buttons */}
            {totalPhotos > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 max-w-4xl mx-auto no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative w-14 h-12 sm:w-16 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeIdx === idx
                    ? "border-[#d6ff3f] scale-105"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <SkeletonImage src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="64px" className="object-cover" skeletonClassName="rounded-lg" />
              </button>
            ))}
          </div>
          </div>
        </div>
      )}
    </section>
  );
}
