"use client";

import React, { useState, useEffect } from "react";

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
  const [activeId, setActiveId] = useState("about");

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-[#e2e2dc] py-2.5 sm:py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`shrink-0 text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#14140f] text-[#d6ff3f] px-5 py-2 rounded-full shadow-sm"
                  : "text-[#555550] hover:text-[#14140f] py-2"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
