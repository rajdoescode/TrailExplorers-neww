"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NeonHighlightProps {
  children: React.ReactNode;
  className?: string;
  variant?: "brush" | "pill" | "underline";
}

export const NeonHighlight: React.FC<NeonHighlightProps> = ({
  children,
  className = "",
  variant = "brush",
}) => {
  if (variant === "underline") {
    return (
      <span className={cn("relative inline-block", className)}>
        <span className="relative z-10 text-[#14140f]">{children}</span>
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-2 sm:h-2.5 bg-[#d6ff3f] rounded-full -z-0"
        />
      </span>
    );
  }

  return (
    <span className={cn("relative inline-block whitespace-nowrap z-0", className)}>
      <span className="relative z-10 px-2 sm:px-3 text-[#14140f]">{children}</span>
      {/* Authentic Hand-Drawn Chisel-Tip Marker Pen Stroke SVG with balanced left & right bristle textures */}
      <svg
        aria-hidden="true"
        viewBox="0 0 280 84"
        preserveAspectRatio="none"
        className="absolute -inset-x-2.5 sm:-inset-x-4 -inset-y-1 sm:-inset-y-2 w-[calc(100%+20px)] sm:w-[calc(100%+32px)] h-[calc(100%+8px)] sm:h-[calc(100%+16px)] pointer-events-none -z-0 select-none -rotate-[0.6deg]"
        style={{
          filter: "drop-shadow(0 2px 8px rgba(214, 255, 63, 0.45))",
        }}
      >
        {/* Main Chisel-Tip Marker Stroke with authentic natural bristle serrations on BOTH left and right edges */}
        <path
          d="M 24 14 C 60 12, 100 15, 140 13 C 180 12, 220 14, 252 14 C 262 16, 269 19, 273 24 C 275 27, 269 29, 261 31 C 272 34, 277 38, 278 42 C 278 45, 271 47, 262 48 C 273 51, 277 55, 276 59 C 275 62, 268 64, 260 65 C 270 68, 273 72, 271 75 C 265 77, 258 76, 252 76 C 220 76, 180 74, 140 76 C 100 77, 60 75, 26 76 C 18 76, 11 74, 7 71 C 5 68, 12 65, 19 64 C 9 61, 4 57, 4 53 C 4 50, 11 48, 18 47 C 8 44, 4 40, 5 36 C 6 33, 12 31, 20 30 C 11 27, 7 23, 9 19 C 13 15, 19 14, 24 14 Z"
          fill="#d6ff3f"
        />
        {/* Realistic Marker Ink Saturation Core with matching textured ends */}
        <path
          d="M 32 22 C 70 19, 130 18, 190 19 C 220 20, 240 22, 252 24 C 258 28, 253 32, 247 35 C 256 38, 258 43, 250 47 C 258 51, 256 56, 248 60 C 254 64, 250 67, 242 68 C 210 68, 160 67, 110 68 C 70 69, 45 68, 34 66 C 28 62, 33 58, 38 55 C 30 52, 28 47, 36 43 C 28 39, 30 34, 38 30 C 31 27, 34 23, 40 22 Z"
          fill="#cbf52a"
          opacity="0.35"
        />
      </svg>
    </span>
  );
};
