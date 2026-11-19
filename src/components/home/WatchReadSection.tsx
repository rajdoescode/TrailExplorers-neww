"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { POSTCARDS_DATA } from "@/data/postcards";
import { Postcard } from "@/types";
import { cn } from "@/lib/utils";

export const WatchReadSection: React.FC = () => {
  const [selectedPostcard, setSelectedPostcard] = useState<Postcard | null>(null);

  const postcards = POSTCARDS_DATA.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prevReel = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + postcards.length) % postcards.length);
  }, [postcards.length]);

  const nextReel = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % postcards.length);
  }, [postcards.length]);

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
      nextReel();
    } else if (distance < -45) {
      prevReel();
    }
  };

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden" id="watch-read-section">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6">
        {/* Section Head */}
        <div className="flex justify-between items-end flex-wrap gap-4 mb-7 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0">
            Watch &amp; Read
          </h2>
          <Link
            href="/postcards"
            className="font-bold text-sm text-[#14140f] hover:underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        {/* 3D Coverflow Stage Carousel */}
        <div className="relative flex items-center justify-center max-w-full">
          <button
            type="button"
            onClick={prevReel}
            aria-label="Previous reel"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div
            className="carousel-stage relative flex-1 h-[430px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {postcards.map((card, idx) => {
              let offset = idx - activeIndex;
              if (offset > postcards.length / 2) offset -= postcards.length;
              if (offset < -postcards.length / 2) offset += postcards.length;

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
                boxShadow = "0 22px 44px rgba(20, 20, 15, 0.20)";
              } else if (offset === 1) {
                transform = "translate(-50%, -50%) translateX(94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 12px 26px rgba(20, 20, 15, 0.11)";
              } else if (offset === -1) {
                transform = "translate(-50%, -50%) translateX(-94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 12px 26px rgba(20, 20, 15, 0.11)";
              } else if (offset === 2) {
                transform = "translate(-50%, -50%) translateX(179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 8px 18px rgba(20, 20, 15, 0.09)";
              } else if (offset === -2) {
                transform = "translate(-50%, -50%) translateX(-179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 8px 18px rgba(20, 20, 15, 0.09)";
              }

              return (
                <article
                  key={card.id}
                  onClick={() => {
                    if (isCenter) setSelectedPostcard(card);
                    else setActiveIndex(idx);
                  }}
                  className={cn(
                    "trip-card dest-card-simple absolute left-1/2 top-1/2 w-[clamp(210px,58vw,256px)] h-[370px] sm:h-[380px] rounded-[28px] overflow-hidden block bg-[#14140f] transition-all duration-500 ease-[cubic-bezier(0.22,0.85,0.32,1)] cursor-pointer group",
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
                  <div className="thumb w-full h-full relative overflow-hidden rounded-[28px]">
                    <Image
                      src={card.image_url}
                      alt={card.title}
                      fill
                      className="object-cover rounded-[28px] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14140f]/90 via-[#14140f]/20 to-transparent z-1" />

                    {/* Play Icon Badge */}
                    <div className="absolute top-5 right-5 z-2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-5 left-5 right-5 z-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#d6ff3f] block mb-1">
                        {card.author || "Field Report"}
                      </span>
                      <h3 className="text-white text-base font-bold leading-snug line-clamp-2 m-0">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextReel}
            aria-label="Next reel"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Story Reader Modal */}
      {selectedPostcard && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedPostcard(null)}
              className="absolute top-4 right-4 p-2 bg-[#f6f6f1] hover:bg-[#d6ff3f] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-[#14140f]" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full inline-block mb-3">
              {selectedPostcard.author || "Expedition Dispatch"}
            </span>

            <h3 className="text-2xl font-bold text-[#14140f] mb-4">
              {selectedPostcard.title}
            </h3>

            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-6">
              <Image
                src={selectedPostcard.image_url}
                alt={selectedPostcard.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-[#3d3d36] text-base leading-relaxed whitespace-pre-line font-medium">
              {selectedPostcard.content}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
