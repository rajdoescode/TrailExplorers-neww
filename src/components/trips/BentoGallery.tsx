"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface BentoGalleryProps {
  images: string[];
  title: string;
}

export function BentoGallery({ images, title }: BentoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const totalPhotos = images.length;
  const displayImages = images.slice(0, 5);

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

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen, nextPhoto, prevPhoto]);

  return (
    <section className="relative w-full py-4 bg-white border-b border-[#e2e2dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <div className="relative rounded-2xl overflow-hidden border border-[#e2e2dc] bg-[#f6f6f1] h-[340px] sm:h-[420px] md:h-[460px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-full p-2">
            {/* Primary Main Photo (col-span-2 or 3) */}
            <div
              onClick={() => openLightbox(0)}
              className="md:col-span-2 lg:col-span-3 relative h-full rounded-xl overflow-hidden cursor-pointer group bg-[#e8e8e2]"
            >
              <Image
                src={displayImages[0] || "/assets/images/home/hero-poster.jpg"}
                alt={`${title} - Main photo`}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right Stack (2 images on medium, or hidden on small) */}
            <div className="hidden md:grid grid-rows-2 gap-2 h-full lg:col-span-1">
              <div
                onClick={() => openLightbox(1)}
                className="relative h-full rounded-xl overflow-hidden cursor-pointer group bg-[#e8e8e2]"
              >
                <Image
                  src={displayImages[1] || displayImages[0]}
                  alt={`${title} - Photo 2`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div
                onClick={() => openLightbox(2)}
                className="relative h-full rounded-xl overflow-hidden cursor-pointer group bg-[#e8e8e2]"
              >
                <Image
                  src={displayImages[2] || displayImages[0]}
                  alt={`${title} - Photo 3`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
          </div>

          {/* Show all photos Button Pill */}
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 inline-flex items-center gap-2 bg-[#14140f]/90 hover:bg-[#14140f] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#d6ff3f]" />
            <span>Show all {totalPhotos} photos</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">{title}</h3>
              <p className="text-xs text-white/70">
                Photo {activeIdx + 1} of {totalPhotos}
              </p>
            </div>
            <button
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
              <Image
                src={images[activeIdx]}
                alt={`${title} - photo ${activeIdx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>

            {/* Prev / Next Buttons */}
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
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 max-w-4xl mx-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative w-14 h-12 sm:w-16 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeIdx === idx ? "border-[#d6ff3f] scale-105" : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
