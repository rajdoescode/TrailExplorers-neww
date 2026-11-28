"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { X, ChevronLeft, ChevronRight, Maximize2, Grid, Sparkles, Image as ImageIcon } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useSwipeDownToClose } from "@/hooks/useSwipeDownToClose";

export interface TourGalleryProps {
  images: string[];
  title: string;
  captions?: string[];
}

export function TourGallery({ images, title }: TourGalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Mount check for React Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Active thumbnail ref for auto-scrolling
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Mobile Swipe Hook for Lightbox
  const lightboxOverlayRef = useRef<HTMLDivElement>(null);
  const { sheetRef: lightboxSheetRef } = useSwipeDownToClose({
    isOpen: lightboxOpen,
    onClose: () => setLightboxOpen(false),
    overlayRef: lightboxOverlayRef,
  });

  // Mobile Interactive Flip Stack State for Compact View
  const [activeStackIdx, setActiveStackIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const lightboxTouchStartXRef = useRef<number | null>(null);

  const totalPhotos = images.length;

  // Auto-play timer for mobile flip card stack
  const nextStackCard = useCallback(() => {
    if (totalPhotos <= 1) return;
    setActiveStackIdx((prev) => (prev + 1) % Math.min(totalPhotos, 5));
  }, [totalPhotos]);

  const resetStackTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalPhotos <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveStackIdx((prev) => (prev + 1) % Math.min(totalPhotos, 5));
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
    const stackLimit = Math.min(totalPhotos, 5);
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleStackClick();
      } else {
        setActiveStackIdx((prev) => (prev - 1 + stackLimit) % stackLimit);
        resetStackTimer();
      }
    }
  };

  // Lightbox handlers
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

  // Scroll active thumbnail into view
  useEffect(() => {
    if (lightboxOpen && thumbnailRefs.current[activeIdx]) {
      thumbnailRefs.current[activeIdx]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIdx, lightboxOpen]);

  // Lock background scroll when modal or lightbox is active
  useScrollLock(isModalOpen || lightboxOpen);

  // Global Keyboard Navigation
  useEffect(() => {
    if (!lightboxOpen && !isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          closeLightbox();
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
      if (lightboxOpen) {
        if (e.key === "ArrowRight") nextPhoto();
        if (e.key === "ArrowLeft") prevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, isModalOpen, nextPhoto, prevPhoto]);

  // Lightbox Touch Swipe
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartXRef.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartXRef.current === null) return;
    const diff = lightboxTouchStartXRef.current - e.changedTouches[0].clientX;
    lightboxTouchStartXRef.current = null;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
  };

  // Pinterest-style varied aspect ratios without distortion
  const getMasonryAspect = (idx: number) => {
    const patterns = [
      "aspect-[3/4]",
      "aspect-[4/3]",
      "aspect-[1/1]",
      "aspect-[16/10]",
      "aspect-[3/4]",
      "aspect-[4/3]",
    ];
    return patterns[idx % patterns.length];
  };

  return (
    <section className="relative w-full py-2 sm:py-6 bg-transparent overflow-hidden">
      {/* 1. COMPACT GALLERY: MOBILE INTERACTIVE FLIP-CARD STACK */}
      <div className="block md:hidden px-4 pt-2 pb-4 text-center overflow-visible">
        <div
          onClick={handleStackClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={0}
          aria-label="Trip photo gallery stack. Tap to flip to next photo"
          className="relative w-[min(280px,74vw)] aspect-[3/4] mx-auto cursor-pointer select-none touch-pan-y active:scale-[0.98] transition-transform duration-200"
        >
          {images.slice(0, 5).map((img, idx) => {
            const stackLimit = Math.min(totalPhotos, 5);
            const pos = (idx - activeStackIdx + stackLimit) % stackLimit;

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

        {/* Mobile View All Trigger Button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#14140f] text-[#d6ff3f] hover:bg-black px-5 py-2.5 rounded-full text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer font-heading tracking-wide border border-[#14140f]"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Show all {totalPhotos} photos</span>
          </button>
        </div>
      </div>

      {/* 2. COMPACT GALLERY: DESKTOP ASYMMETRIC 5-TILE BENTO */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 h-[380px] sm:h-[440px] overflow-hidden rounded-2xl">
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
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/95 via-white/60 to-transparent pointer-events-none rounded-b-2xl" />

          {/* Centered Show all Photos Button */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2.5 bg-[#14140f] text-[#d6ff3f] hover:bg-black px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-2xl transition-colors active:scale-[0.98] cursor-pointer font-heading tracking-wide border border-[#14140f]"
            >
              <Grid className="w-4 h-4 text-[#d6ff3f]" />
              <span>Show all {totalPhotos} photos</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. EXPANDED GALLERY MODAL (Mounted via Portal directly to body with z-[99990]) */}
      {mounted && isModalOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99990] bg-[#14140f] flex flex-col overflow-hidden animate-in fade-in duration-200"
        >
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-[99995] bg-[#14140f] border-b border-white/10 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between shadow-2xl shrink-0">
            <div className="flex flex-col gap-0.5 max-w-[65vw] sm:max-w-2xl">
              <h2 className="text-white font-extrabold text-sm sm:text-lg md:text-xl font-heading truncate">
                {title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#d6ff3f] font-semibold bg-[#d6ff3f]/10 px-2.5 py-0.5 rounded-full border border-[#d6ff3f]/25">
                  <Sparkles className="w-3 h-3 text-[#d6ff3f]" />
                  <span>{totalPhotos} Photos</span>
                </span>
                <span className="text-xs text-white/50 hidden sm:inline">
                  Click any photo to open full-screen
                </span>
              </div>
            </div>

            {/* Prominent High-Contrast Close Button with Text & Icon */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="inline-flex items-center gap-1.5 bg-[#d6ff3f] hover:bg-white text-[#14140f] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm shadow-xl transition-colors cursor-pointer font-heading tracking-wide border border-[#14140f]/20 shrink-0"
              aria-label="Close photo gallery"
            >
              <X className="w-4 h-4 text-[#14140f] stroke-[2.5]" />
              <span>Close</span>
            </button>
          </header>

          {/* Masonry / Pinterest Grid Content */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 overscroll-contain">
            <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img, idx) => (
                <div
                  key={`${img}-${idx}`}
                  onClick={() => openLightbox(idx)}
                  className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group bg-[#1c1c16] border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_28px_rgba(214,255,63,0.1)] transition-shadow duration-300"
                >
                  <div className={`relative w-full ${getMasonryAspect(idx)} overflow-hidden`}>
                    <SkeletonImage
                      src={img}
                      alt={`${title} - Photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      skeletonClassName="rounded-2xl"
                    />

                    {/* Gradient overlay & photo badge on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5 pointer-events-none">
                      <span className="text-white text-xs font-bold font-heading drop-shadow-md">
                        Photo {idx + 1}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shadow-md">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>,
        document.body
      )}

      {/* 4. INDIVIDUAL PHOTO VIEWER (Mounted via Portal directly to body with z-[99999]) */}
      {mounted && lightboxOpen && createPortal(
        <div
          ref={lightboxOverlayRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] bg-black/98 flex flex-col justify-between p-3 sm:p-6 backdrop-blur-2xl touch-none overscroll-contain select-none animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div ref={lightboxSheetRef} className="w-full h-full flex flex-col justify-between">
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between text-white z-10 pb-3 border-b border-white/10 shrink-0">
              <div className="max-w-[65vw] sm:max-w-xl">
                <h3 className="text-sm sm:text-base font-bold text-white truncate font-heading">
                  {title}
                </h3>
                <p className="text-xs text-[#d6ff3f] font-semibold mt-0.5">
                  Photo {activeIdx + 1} of {totalPhotos}
                </p>
              </div>

              {/* Permanently visible prominent close button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex items-center gap-1.5 bg-[#d6ff3f] hover:bg-white text-[#14140f] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm shadow-2xl transition-colors cursor-pointer font-heading tracking-wide"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4 text-[#14140f] stroke-[2.5]" />
                <span>Close</span>
              </button>
            </div>

            {/* Lightbox Center Image Stage */}
            <div
              className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden"
              onTouchStart={handleLightboxTouchStart}
              onTouchEnd={handleLightboxTouchEnd}
            >
              <div className="relative w-full h-full max-w-6xl max-h-[72vh] flex items-center justify-center">
                <SkeletonImage
                  src={images[activeIdx]}
                  alt={`${title} - photo ${activeIdx + 1}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>

              {/* Previous / Next Navigation Arrows */}
              {totalPhotos > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black text-white border border-white/25 flex items-center justify-center transition-colors active:scale-[0.97] cursor-pointer shadow-2xl"
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
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black text-white border border-white/25 flex items-center justify-center transition-colors active:scale-[0.97] cursor-pointer shadow-2xl"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Navigation Strip */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2 z-10 max-w-4xl mx-auto no-scrollbar w-full px-2 shrink-0">
              {images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  ref={(el) => {
                    thumbnailRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative w-14 h-12 sm:w-16 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeIdx === idx
                      ? "border-[#d6ff3f] scale-105 shadow-[0_0_14px_rgba(214,255,63,0.45)]"
                      : "border-transparent opacity-50 hover:opacity-100 hover:scale-102"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <SkeletonImage
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                    skeletonClassName="rounded-xl"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

// Re-export as BentoGallery for 100% backward compatibility
export const BentoGallery = TourGallery;
