"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  viewAllText?: string;
  viewAllHref?: string;
  onViewAllClick?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  viewAllText,
  viewAllHref,
  onViewAllClick,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 mb-6 sm:mb-8",
        className
      )}
    >
      {/* Title with Neon Vertical Bar */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span
          className="w-1.5 sm:w-2 h-6 sm:h-7 bg-[#d6ff3f] rounded-full inline-block shrink-0 shadow-[0_0_8px_rgba(214,255,63,0.6)]"
          aria-hidden="true"
        />
        <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-[#14140f] tracking-tight font-heading">
          {title}
        </h2>
      </div>

      {/* Right Link / Action */}
      {viewAllText && (viewAllHref || onViewAllClick) && (
        viewAllHref ? (
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#14140f] hover:text-black transition-colors"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onViewAllClick}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#14140f] hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        )
      )}
    </div>
  );
};
