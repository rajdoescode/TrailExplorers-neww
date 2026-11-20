"use client";

import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { cn } from "@/lib/utils";

// ==========================================
// STANDARD CARD BASE COMPONENTS
// ==========================================

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[20px] bg-white border-2 border-[#e2e2dc] shadow-card text-[#14140f] transition-all",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg sm:text-xl font-extrabold font-heading tracking-tight leading-snug", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xs sm:text-sm text-[#6b6b63] leading-relaxed", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 sm:p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-4 sm:p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// ==========================================
// STANDARD SELECTION CARD COMPONENT
// ==========================================

export interface SelectionCardProps {
  selected?: boolean;
  onClick?: () => void;
  title: string;
  description?: string;
  badge?: string;
  image?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  selected = false,
  onClick,
  title,
  description,
  badge,
  image,
  aspectRatio = "auto",
  icon,
  children,
  className,
  disabled = false,
  type = "button",
}) => {
  // If an image card (e.g. destination or trip card)
  if (image) {
    const aspectStyles = {
      video: "aspect-[16/10]",
      square: "aspect-square",
      portrait: "aspect-[4/5]",
      auto: "aspect-[4/3] sm:aspect-[16/11]",
    };

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-pressed={selected}
        className={cn(
          "relative w-full rounded-[18px] sm:rounded-[20px] overflow-hidden text-left p-0 border-[3px] transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d6ff3f]",
          aspectStyles[aspectRatio],
          selected
            ? "border-[#14140f] ring-4 ring-[#d6ff3f] shadow-[0_12px_28px_rgba(20,20,15,0.22)] scale-[1.01]"
            : "border-transparent hover:border-[#14140f]/40 hover:shadow-md",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        <SkeletonImage
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors" />

        {/* Top Badges / Checkmark */}
        <div className="absolute top-2.5 inset-x-2.5 sm:top-3 sm:inset-x-3 flex items-center justify-between z-10 pointer-events-none">
          {badge ? (
            <span className="bg-[#14140f]/80 backdrop-blur-xs text-[#d6ff3f] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
              {badge}
            </span>
          ) : (
            <span />
          )}

          {/* Distinct Selection Checkmark Badge */}
          <div
            className={cn(
              "w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0",
              selected
                ? "bg-[#d6ff3f] border-[#14140f] text-[#14140f] shadow-md scale-105"
                : "bg-black/35 border-white/70 text-transparent group-hover:border-white"
            )}
          >
            <Check className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] transition-transform", selected ? "scale-100" : "scale-0")} />
          </div>
        </div>

        {/* Content Footer */}
        <div className="absolute inset-x-3 bottom-2.5 sm:inset-x-3.5 sm:bottom-3 z-10">
          <strong className="block text-white text-[14px] sm:text-[16px] font-extrabold font-heading leading-tight group-hover:text-[#d6ff3f] transition-colors">
            {title}
          </strong>
          {description && (
            <p className="text-white/85 text-[11px] sm:text-[12px] leading-snug mt-0.5 sm:mt-1 line-clamp-2">
              {description}
            </p>
          )}
          {children}
        </div>
      </button>
    );
  }

  // Text/Icon Selection Card (e.g. Stays, Vehicles, Pace, Group Type)
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col justify-between text-left p-3.5 sm:p-4 rounded-[16px] sm:rounded-[18px] border-2 transition-all duration-200 cursor-pointer outline-none select-none group min-h-[96px]",
        selected
          ? "bg-[#d6ff3f]/15 border-2 border-[#14140f] ring-2 ring-[#d6ff3f]/60 shadow-xs"
          : "bg-white border-[#e2e2dc] hover:border-[#14140f] hover:bg-[#fcfcf9]",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#14140f] shrink-0">{icon}</span>}
          {badge && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#14140f] text-[#d6ff3f]">
              {badge}
            </span>
          )}
        </div>

        {/* Selection Indicator Circle */}
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
            selected
              ? "bg-[#14140f] border-[#14140f] text-[#d6ff3f] scale-105"
              : "border-[#c4c4bc] bg-white group-hover:border-[#14140f]"
          )}
        >
          {selected && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>

      <div className="mt-2">
        <strong className="block text-xs sm:text-sm font-extrabold text-[#14140f] leading-snug">
          {title}
        </strong>
        {description && (
          <p className="text-[11px] sm:text-xs text-[#6b6b63] font-medium leading-snug mt-0.5">
            {description}
          </p>
        )}
      </div>

      {children}
    </button>
  );
};
