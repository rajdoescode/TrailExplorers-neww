"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "packages", label: "Packages" },
  { id: "what-to-pack", label: "Packing" },
  { id: "departure-dates", label: "Dates" },
  { id: "attractions", label: "Attractions" },
  { id: "faqs", label: "FAQs" },
  { id: "reviews", label: "Reviews" },
];

export function StickySecondaryNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("about");
  const [headerHeight, setHeaderHeight] = useState<number>(73);
  const listRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef<boolean>(false);
  const jumpTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Measure header height dynamically
  const updateLayout = useCallback(() => {
    const headerEl = document.querySelector("header");
    if (headerEl) {
      const h = headerEl.getBoundingClientRect().height;
      if (h > 0) setHeaderHeight(h);
    }
  }, []);

  // Center active tab horizontally in scroll container (especially on mobile)
  const centerActiveTab = useCallback((tabId: string, smooth = true) => {
    if (!listRef.current) return;
    const activeBtn = listRef.current.querySelector<HTMLElement>(`[data-tab-id="${tabId}"]`);
    if (activeBtn) {
      const container = listRef.current;
      const left = activeBtn.offsetLeft - (container.clientWidth - activeBtn.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, left),
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  // Handle scroll detection and active section detection
  useEffect(() => {
    updateLayout();

    const onScroll = () => {
      // If user clicked a tab, let smooth scroll finish without jitter
      if (isJumpingRef.current) return;

      const titleCard = document.getElementById("title-card") || document.querySelector(".title-card");
      const navH = 50;
      const navBottom = headerHeight + navH;

      // Reveal once visitor scrolls past the bottom of the title card
      if (titleCard) {
        const titleBottom = titleCard.getBoundingClientRect().bottom;
        const visible = titleBottom < navBottom + 50;
        setIsVisible(visible);
        if (!visible) return;
      } else {
        // Fallback: reveal after 380px scroll
        const visible = window.scrollY > 380;
        setIsVisible(visible);
        if (!visible) return;
      }

      // Find the last section whose top has reached near navBottom
      let currentId = activeId;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetHeight > 0) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navBottom + 30) {
            currentId = item.id;
          }
        }
      }

      if (currentId !== activeId) {
        setActiveId(currentId);
        centerActiveTab(currentId, true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateLayout, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateLayout);
      if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
    };
  }, [headerHeight, activeId, centerActiveTab, updateLayout]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    isJumpingRef.current = true;
    setActiveId(id);
    centerActiveTab(id, true);

    const navH = 50;
    const navOffset = headerHeight + navH + 12;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });

    if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = setTimeout(() => {
      isJumpingRef.current = false;
    }, 400);
  };

  return (
    <nav
      aria-label="Trip sections"
      style={{ top: `${headerHeight}px` }}
      className={`fixed left-0 right-0 z-40 bg-white/85 backdrop-blur-xl border-b border-white/80 shadow-[0_6px_20px_rgba(20,20,15,0.06)] transition-all duration-250 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 visible pointer-events-auto"
          : "opacity-0 -translate-y-3 invisible pointer-events-none"
      }`}
    >
      <div
        ref={listRef}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center gap-[22px] sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-tab-id={item.id}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`shrink-0 text-sm sm:text-[15px] pt-3.5 pb-2.5 sm:pt-3.5 sm:pb-2.5 border-b-[3px] transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-[#14140f] font-bold border-[#a9cc2a]"
                  : "text-[#6b6b63] font-semibold border-transparent hover:text-[#14140f]"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
