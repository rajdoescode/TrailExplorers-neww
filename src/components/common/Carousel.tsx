"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  children: React.ReactNode[];
  itemClassName?: string;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  itemClassName = "w-[85%] sm:w-[50%] md:w-[33.333%] lg:w-[25%]",
  className,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const childWidth = containerRef.current.firstElementChild?.clientWidth || clientWidth;
    const currentIdx = Math.round(scrollLeft / childWidth);
    setActiveIndex(currentIdx);
  }, []);

  useEffect(() => {
    checkScroll();
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (ref) ref.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({ left: clientWidth * 0.75, behavior: "smooth" });
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval]);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const clientWidth = containerRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToDot = (idx: number) => {
    if (!containerRef.current) return;
    const childWidth = containerRef.current.children[idx]?.getBoundingClientRect().width || 300;
    containerRef.current.scrollTo({ left: idx * childWidth, behavior: "smooth" });
  };

  return (
    <div className={cn("relative group/carousel w-full", className)}>
      {/* Scrollable Container with Snap */}
      <div
        ref={containerRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={cn("shrink-0 snap-start", itemClassName)}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showArrows && (
        <>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous slide"
            className={cn(
              "absolute -left-3 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border-2 border-[#14140f] shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-[#d6ff3f] disabled:opacity-0 disabled:pointer-events-none",
              !canScrollLeft && "hidden md:flex opacity-30 cursor-not-allowed hover:bg-white"
            )}
          >
            <ChevronLeft className="w-5 h-5 text-[#14140f]" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next slide"
            className={cn(
              "absolute -right-3 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border-2 border-[#14140f] shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-[#d6ff3f] disabled:opacity-0 disabled:pointer-events-none",
              !canScrollRight && "hidden md:flex opacity-30 cursor-not-allowed hover:bg-white"
            )}
          >
            <ChevronRight className="w-5 h-5 text-[#14140f]" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showDots && children.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {children.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                activeIndex === i
                  ? "w-6 bg-[#14140f]"
                  : "w-2 bg-[#14140f]/20 hover:bg-[#14140f]/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
