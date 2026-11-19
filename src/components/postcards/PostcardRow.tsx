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

  // Mouse drag-to-scroll support for desktop testing & DevTools device simulation
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasDragged = useRef(false);

  const checkScroll = useCallback(() => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 6);
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

  const handleArrowScroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    isDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - rowRef.current.offsetLeft;
    scrollLeftPos.current = rowRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !rowRef.current) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    rowRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDown.current = false;
  };

  const handleCardClickSafe = (postcard: Postcard) => {
    if (hasDragged.current) return; // prevent modal trigger when user was dragging
    onCardClick(postcard);
  };

  const isReels = categoryKey === "reel" || categoryKey === "video";
  const isAttractions = categoryKey === "attraction";

  return (
    <section className="mb-10 sm:mb-14">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-[26px] md:text-[28px] font-bold text-[#14140f] flex items-baseline gap-2 font-heading tracking-tight">
          <span>{title}</span>
          <span className="text-xs sm:text-sm font-semibold text-[#8e8e86] font-sans">
            {count}
          </span>
        </h2>

        <div className="flex items-center gap-3 shrink-0">
          {items.length > 4 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleArrowScroll("left")}
                disabled={!canScrollLeft}
                aria-label={`Scroll ${title} left`}
                className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#14140f] text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => handleArrowScroll("right")}
                disabled={!canScrollRight}
                aria-label={`Scroll ${title} right`}
                className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#14140f] text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
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

      {/* Sideways Scroll Row - Responsive Mobile Bleed with Touch & Drag Support */}
      <div
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="flex gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-pl-4 sm:scroll-pl-0 select-none cursor-grab active:cursor-grabbing"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x pan-y",
          overscrollBehaviorX: "contain",
          scrollbarWidth: "none",
        }}
      >
        {items.map((postcard) => (
          <div
            key={postcard.id}
            className={`shrink-0 snap-start transition-transform ${
              isReels
                ? "flex-[0_0_56%] max-w-[240px] sm:flex-[0_0_calc((100%-40px)/3)] lg:flex-[0_0_calc((100%-60px)/4)]"
                : "flex-[0_0_74%] max-w-[320px] sm:flex-[0_0_calc((100%-40px)/3)] lg:flex-[0_0_calc((100%-60px)/4)]"
            }`}
          >
            {isAttractions ? (
              <AttractionCard postcard={postcard} onClick={handleCardClickSafe} />
            ) : isReels ? (
              <ReelCard postcard={postcard} onClick={handleCardClickSafe} />
            ) : (
              <GuideCard postcard={postcard} onClick={handleCardClickSafe} />
            )}
          </div>
        ))}
        {/* End breathing space for mobile swipe */}
        <div className="w-2 shrink-0 sm:hidden" aria-hidden="true" />
      </div>
    </section>
  );
};
