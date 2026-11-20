"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TravellerCounterProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  counterClassName?: string;
  size?: "sm" | "md" | "lg";
}

export const TravellerCounter: React.FC<TravellerCounterProps> = ({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 50,
  step = 1,
  disabled = false,
  className,
  counterClassName,
  size = "md",
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled || value <= min) return;
    onChange(Math.max(min, value - step));
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled || value >= max) return;
    onChange(Math.min(max, value + step));
  };

  const isMin = value <= min;
  const isMax = value >= max;

  const buttonSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-11 h-11 sm:w-12 sm:h-12",
  };

  const valueSizes = {
    sm: "text-sm min-w-[28px]",
    md: "text-base sm:text-lg min-w-[36px] sm:min-w-[42px]",
    lg: "text-lg sm:text-xl min-w-[44px]",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 p-3 sm:p-3.5 rounded-2xl bg-white border-2 border-[#e2e2dc] hover:border-[#14140f] transition-all",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div className="flex flex-col min-w-0 pr-1 select-none">
        <span className="text-xs sm:text-sm font-bold text-[#14140f] leading-snug">
          {label}
        </span>
        {description && (
          <span className="text-[11px] sm:text-xs text-[#6b6b63] font-medium leading-snug mt-0.5">
            {description}
          </span>
        )}
      </div>

      <div
        className={cn(
          "inline-flex items-center border-2 border-[#14140f] rounded-full overflow-hidden bg-white shadow-xs shrink-0 select-none",
          counterClassName
        )}
        role="group"
        aria-label={`${label} counter`}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || isMin}
          aria-label={`Decrease ${label}`}
          className={cn(
            "flex items-center justify-center transition-all cursor-pointer",
            buttonSizes[size],
            isMin || disabled
              ? "opacity-30 cursor-not-allowed bg-transparent text-[#6b6b63]"
              : "text-[#14140f] hover:bg-[#f4f4ee] active:scale-90"
          )}
        >
          <Minus className="w-4 h-4 stroke-[2.5]" />
        </button>

        <span
          className={cn(
            "text-center font-heading font-extrabold text-[#14140f] tabular-nums select-none px-1",
            valueSizes[size]
          )}
          role="status"
          aria-live="polite"
        >
          {value}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || isMax}
          aria-label={`Increase ${label}`}
          className={cn(
            "flex items-center justify-center transition-all cursor-pointer",
            buttonSizes[size],
            isMax || disabled
              ? "opacity-30 cursor-not-allowed bg-transparent text-[#6b6b63]"
              : "text-[#14140f] hover:bg-[#f4f4ee] active:scale-90"
          )}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
