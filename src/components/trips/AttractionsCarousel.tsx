"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AttractionItem } from "@/lib/trip-helpers";

interface AttractionsCarouselProps {
  attractions: AttractionItem[];
}

export function AttractionsCarousel({ attractions }: AttractionsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!attractions || attractions.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="attractions" className="scroll-mt-32 sm:scroll-mt-36 w-full">
      {/* Header Row (Direct on page, not inside a boxed card) */}
      <div className="flex items-end justify-between gap-4 mb-3 sm:mb-4 px-1 sm:px-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14140f] font-heading tracking-tight">
            Attractions
          </h2>
          <p className="text-xs sm:text-sm text-[#6b6b63] mt-0.5">
            Must-see stops on this itinerary.
          </p>
        </div>

        {/* Carousel Prev/Next Buttons (Hidden on mobile, swipeable) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-[#f0f0ea] hover:bg-[#e2e2dc] text-[#14140f] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Previous attraction"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-[#14140f] hover:bg-[#2c2c24] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Next attraction"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track (Full-width edge-to-edge on mobile with left space and peeking cards) */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-5 sm:mx-0 sm:px-0 scroll-pl-5 sm:scroll-pl-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {attractions.map((attr) => (
          <div
            key={attr.id}
            className="relative w-[76vw] max-w-[280px] min-w-[240px] sm:w-[300px] sm:max-w-none h-[360px] sm:h-[390px] rounded-2xl overflow-hidden shrink-0 snap-start border-2 border-white group bg-[#22221e] shadow-card transition-transform duration-300 hover:-translate-y-1"
          >
            <Image
              src={attr.image_url}
              alt={attr.title}
              fill
              sizes="(max-width: 640px) 76vw, 300px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle natural dark gradient overlay (not harsh black) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-5 text-white">
              <h3 className="font-extrabold text-base sm:text-lg text-white font-heading leading-tight mb-1.5 drop-shadow-xs">
                {attr.title}
              </h3>
              {attr.subtitle && (
                <p className="text-xs sm:text-[13px] text-white/90 line-clamp-2 leading-relaxed">
                  {attr.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
        {/* End spacer for right-edge breathing room on mobile */}
        <div className="w-3 shrink-0 sm:hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
