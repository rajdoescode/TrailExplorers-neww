import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs sm:text-sm font-bold text-[#14140f]">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#6b6b63] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-[#f6f6f1] border-2 border-[#e2e2dc] rounded-xl px-4 py-3 text-sm text-[#14140f] placeholder:text-[#6b6b63]/60 transition-all duration-200 outline-none focus:border-[#14140f] focus:bg-white focus:ring-2 focus:ring-[#d6ff3f]/50 disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-200",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#6b6b63] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-[#6b6b63]">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
