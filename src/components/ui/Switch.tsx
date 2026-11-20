"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
  size = "md",
}) => {
  const isSmall = size === "sm";

  return (
    <label
      className={cn(
        "flex items-start gap-3 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative inline-flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "rounded-full transition-colors duration-200 border-2",
            isSmall ? "w-9 h-5" : "w-11 h-6",
            checked
              ? "bg-[#14140f] border-[#14140f]"
              : "bg-[#e2e2dc] border-[#e2e2dc]"
          )}
        >
          <div
            className={cn(
              "rounded-full transition-transform duration-200 transform shadow-xs",
              isSmall ? "w-3.5 h-3.5 mt-[1px] ml-[1px]" : "w-4.5 h-4.5 mt-[1px] ml-[1px]",
              checked
                ? isSmall
                  ? "translate-x-4 bg-[#d6ff3f]"
                  : "translate-x-5 bg-[#d6ff3f]"
                : "translate-x-0 bg-white"
            )}
          />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs sm:text-sm font-bold text-[#14140f] leading-tight">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] sm:text-xs text-[#6b6b63] mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
