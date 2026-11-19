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
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div id="attractions" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading">
            Attractions
          </h2>
          <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
            Must-see stops on this itinerary.
          </p>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-[#f0f0ea] hover:bg-[#e2e2dc] text-[#14140f] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous attraction"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-[#14140f] hover:bg-[#2c2c24] text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next attraction"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
      >
        {attractions.map((attr) => (
          <div
            key={attr.id}
            className="relative w-[280px] sm:w-[320px] h-[360px] sm:h-[380px] rounded-2xl overflow-hidden shrink-0 border border-[#e2e2dc] group bg-[#14140f]"
          >
            <Image
              src={attr.image_url}
              alt={attr.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
              <h3 className="font-extrabold text-base sm:text-lg text-white font-heading leading-tight mb-2">
                {attr.title}
              </h3>
              {attr.subtitle && (
                <p className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                  {attr.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
