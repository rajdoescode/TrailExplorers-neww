"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const InternationalDestinationsSection: React.FC = () => {
  const destinations = [
    { name: "Dubai", slug: "dubai", image: "/assets/images/destinations/international/dubai.jpg", href: "/tour-packages" },
    { name: "Bhutan", slug: "bhutan", image: "/assets/images/destinations/international/bhutan.jpg", href: "/tour-packages" },
    { name: "Nepal", slug: "nepal", image: "/assets/images/destinations/international/nepal.jpg", href: "/tour-packages" },
    { name: "Bali", slug: "bali", image: "/assets/images/destinations/international/bali.jpg", href: "/tour-packages" },
    { name: "Africa", slug: "africa", image: "/assets/images/destinations/international/africa.jpg", href: "/tour-packages" },
  ];

  const [activeIndex, setActiveIndex] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prevDest = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }, [destinations.length]);

  const nextDest = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      nextDest();
    } else if (distance < -45) {
      prevDest();
    }
  };

  // Auto-scroll every 3.5s
  useEffect(() => {
    const timer = setInterval(nextDest, 3500);
    return () => clearInterval(timer);
  }, [nextDest]);

  return (
    <section className="w-full py-10 sm:py-14 bg-transparent overflow-hidden" id="intl-dest-section">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0">
            International Destinations
          </h2>
        </div>

        {/* 3D Coverflow Stage Carousel */}
        <div className="relative flex items-center justify-center max-w-full">
          <button
            type="button"
            onClick={prevDest}
            aria-label="Previous destination"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div
            className="carousel-stage relative flex-1 h-[440px] sm:h-[460px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {destinations.map((dest, idx) => {
              let offset = idx - activeIndex;
              if (offset > destinations.length / 2) offset -= destinations.length;
              if (offset < -destinations.length / 2) offset += destinations.length;

              const isVisible = Math.abs(offset) <= 2;
              const isCenter = offset === 0;

              let transform = "translate(-50%, -50%) scale(0.6)";
              let zIndex = 1;
              let opacity = 0;
              let boxShadow = "none";

              if (offset === 0) {
                transform = "translate(-50%, -50%) scale(1)";
                zIndex = 10;
                opacity = 1;
                boxShadow = "0 16px 36px -4px rgba(20, 20, 15, 0.22), 0 6px 16px rgba(20, 20, 15, 0.10)";
              } else if (offset === 1) {
                transform = "translate(-50%, -50%) translateX(94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 10px 24px -4px rgba(20, 20, 15, 0.12), 0 4px 10px rgba(20, 20, 15, 0.06)";
              } else if (offset === -1) {
                transform = "translate(-50%, -50%) translateX(-94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 10px 24px -4px rgba(20, 20, 15, 0.12), 0 4px 10px rgba(20, 20, 15, 0.06)";
              } else if (offset === 2) {
                transform = "translate(-50%, -50%) translateX(179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 6px 14px rgba(20, 20, 15, 0.08)";
              } else if (offset === -2) {
                transform = "translate(-50%, -50%) translateX(-179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 6px 14px rgba(20, 20, 15, 0.08)";
              }

              return (
                <Link
                  key={dest.name}
                  href={dest.href}
                  onClick={(e) => {
                    if (!isCenter) {
                      e.preventDefault();
                      setActiveIndex(idx);
                    } else {
                      e.preventDefault();
                      if (typeof window !== "undefined" && window.openTripModal) {
                        window.openTripModal(dest.name, dest.image);
                      }
                    }
                  }}
                  className={cn(
                    "trip-card dest-card-simple absolute left-1/2 top-1/2 w-[clamp(210px,58vw,256px)] h-[370px] sm:h-[380px] rounded-[24px] overflow-hidden block bg-[#14140f] transition-all duration-500 ease-[cubic-bezier(0.22,0.85,0.32,1)]",
                    !isCenter && "cursor-pointer"
                  )}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    boxShadow,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  data-offset={offset}
                >
                  <div className="w-full h-full relative overflow-hidden rounded-[24px] bg-[#14140f]">
                    <SkeletonImage
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 58vw, 256px"
                      className="object-cover rounded-[24px] transition-transform duration-500 hover:scale-105"
                      skeletonClassName="rounded-[24px]"
                    />

                    {/* Top gradient for title readability */}
                    <div className="dest-gradient-top" />

                    <h3 className="dest-top-title">
                      {dest.name}
                    </h3>

                    {/* Watermark logo at bottom */}
                    <div className="dest-watermark">
                      <img
                        src="/assets/images/logo/logo-white.svg"
                        alt="Trail Explorers"
                        className="watermark-logo-img"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextDest}
            aria-label="Next destination"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-2">
          {destinations.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to destination ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer p-0 border-0",
                i === activeIndex ? "w-6 bg-[#14140f]" : "w-1.5 bg-[#d4d4cb]"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
