"use client";

import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefixText?: string;
  suffixText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      prefixText,
      suffixText,
      type = "text",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const computedType = isPassword ? (showPassword ? "text" : "password") : type;

    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs sm:text-sm font-bold text-[#14140f] flex items-center justify-between">
            <span>
              {label}
              {props.required && <span className="text-[#e0455a] ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {/* Prefix Text */}
          {prefixText && (
            <span className="inline-flex items-center px-3 py-3 rounded-l-xl border-y-2 border-l-2 border-[#e2e2dc] bg-[#e4e4dd]/50 text-xs font-bold text-[#6b6b63] select-none">
              {prefixText}
            </span>
          )}

          {/* Left Icon */}
          {leftIcon && !prefixText && (
            <div className="absolute left-3.5 text-[#6b6b63] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={computedType}
            className={cn(
              "w-full bg-[#f6f6f1] border-2 border-[#e2e2dc] px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#14140f] placeholder:text-[#6b6b63]/60 transition-all duration-200 outline-none focus:border-[#14140f] focus:bg-white focus:ring-2 focus:ring-[#d6ff3f]/50 disabled:opacity-50 disabled:cursor-not-allowed",
              prefixText ? "rounded-r-xl" : suffixText ? "rounded-l-xl" : "rounded-xl",
              leftIcon && !prefixText && "pl-10",
              (rightIcon || isPassword) && !suffixText && "pr-10",
              error && "border-[#e0455a] focus:border-[#e0455a] focus:ring-red-100",
              className
            )}
            {...props}
          />

          {/* Suffix Text */}
          {suffixText && (
            <span className="inline-flex items-center px-3 py-3 rounded-r-xl border-y-2 border-r-2 border-[#e2e2dc] bg-[#e4e4dd]/50 text-xs font-bold text-[#6b6b63] select-none">
              {suffixText}
            </span>
          )}

          {/* Right Icon / Password Toggle */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-[#6b6b63] hover:text-[#14140f] transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : (
            rightIcon &&
            !suffixText && (
              <div className="absolute right-3.5 text-[#6b6b63] flex items-center pointer-events-none">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {error && <span className="text-xs font-semibold text-[#e0455a]">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-[#6b6b63]">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
