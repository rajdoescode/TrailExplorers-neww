"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Postcard } from "@/types";
import { AttractionCard } from "./AttractionCard";
import { GuideCard } from "./GuideCard";
import { ReelCard } from "./ReelCard";

export interface PostcardRowProps {
  title: string;
  count: number;
  items: Postcard[];
  categoryKey: string;
  onViewAll: () => void;
  onCardClick: (postcard: Postcard) => void;
}

export const PostcardRow: React.FC<PostcardRowProps> = ({
  title,
  count,
  items,
  categoryKey,
  onViewAll,
  onCardClick,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, items]);

  const handleScroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const isReels = categoryKey === "reel" || categoryKey === "video";
  const isAttractions = categoryKey === "attraction";

  return (
    <section className="mb-12 sm:mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-[#14140f] flex items-baseline gap-2.5 font-heading tracking-tight">
          <span>{title}</span>
          <span className="text-xs sm:text-sm font-semibold text-[#8e8e86] font-sans">
            {count}
          </span>
        </h2>

        <div className="flex items-center gap-3.5 shrink-0">
          {items.length > 4 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label={`Scroll ${title} left`}
                className="w-[38px] h-[38px] rounded-full bg-[#14140f] text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label={`Scroll ${title} right`}
                className="w-[38px] h-[38px] rounded-full bg-[#14140f] text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs sm:text-sm font-bold text-[#14140f] underline underline-offset-4 hover:text-[#555] transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>
      </div>

      {/* Sideways Scroll Row */}
      <div
        ref={rowRef}
        className="flex gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((postcard) => (
          <div
            key={postcard.id}
            className={`shrink-0 snap-start transition-transform ${
              isReels
                ? "w-[58%] sm:w-[calc((100%-40px)/3)] lg:w-[calc((100%-60px)/4)] min-w-[190px] sm:min-w-[220px]"
                : "w-[76%] sm:w-[calc((100%-40px)/3)] lg:w-[calc((100%-60px)/4)] min-w-[220px] sm:min-w-[240px]"
            }`}
          >
            {isAttractions ? (
              <AttractionCard postcard={postcard} onClick={onCardClick} />
            ) : isReels ? (
              <ReelCard postcard={postcard} onClick={onCardClick} />
            ) : (
              <GuideCard postcard={postcard} onClick={onCardClick} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
