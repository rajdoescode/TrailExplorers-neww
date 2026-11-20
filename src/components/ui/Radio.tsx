import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, error, disabled, id, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-start gap-3 select-none transition-opacity",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"
          )}
        >
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              id={inputId}
              ref={ref}
              type="radio"
              disabled={disabled}
              className="peer sr-only"
              {...props}
            />
            {/* Custom Styled Radio Circle */}
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                "border-[#14140f] bg-white group-hover:border-black",
                "peer-checked:border-[#14140f] peer-checked:bg-white",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[#d6ff3f] peer-focus-visible:ring-offset-2",
                error && "border-red-500",
                disabled && "bg-[#f6f6f1] border-[#e2e2dc]"
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#14140f] scale-0 peer-checked:scale-100 transition-transform duration-150" />
            </div>
          </div>

          {(label || description) && (
            <div className="flex flex-col gap-0.5 min-w-0">
              {label && (
                <span className="text-xs sm:text-sm font-bold text-[#14140f] leading-snug">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-[11px] sm:text-xs text-[#6b6b63] leading-snug">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {error && <span className="text-xs font-semibold text-red-500 ml-8">{error}</span>}
      </div>
    );
  }
);

Radio.displayName = "Radio";
