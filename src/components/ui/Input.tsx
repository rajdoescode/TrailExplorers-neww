"use client";

import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefixText?: string;
  suffixText?: string;
  inputSize?: "sm" | "md" | "lg";
  variant?: "default" | "pill" | "white";
  clearable?: boolean;
  onClear?: () => void;
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
      inputSize = "md",
      variant = "default",
      clearable = false,
      onClear,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const computedType = isPassword ? (showPassword ? "text" : "password") : type;

    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs min-h-[34px]",
      md: "px-4 py-2.5 sm:py-3 text-xs sm:text-sm min-h-[42px]",
      lg: "px-4 py-3 sm:py-3.5 text-sm sm:text-base min-h-[48px]",
    };

    const variantClasses = {
      default: "bg-[#f6f6f1] border-2 border-[#e2e2dc] focus:bg-white",
      white: "bg-white border-2 border-[#e2e2dc] focus:bg-white shadow-xs",
      pill: "bg-white border-2 border-[#e2e2dc] rounded-full focus:bg-white shadow-xs",
    };

    const isPill = variant === "pill";

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs sm:text-sm font-bold text-[#14140f] flex items-center justify-between select-none">
            <span>
              {label}
              {props.required && <span className="text-[#e0455a] ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {/* Prefix Text */}
          {prefixText && (
            <span className={cn(
              "inline-flex items-center px-3 border-y-2 border-l-2 border-[#e2e2dc] bg-[#e4e4dd]/50 text-xs font-bold text-[#6b6b63] select-none",
              isPill ? "rounded-l-full" : "rounded-l-xl",
              inputSize === "sm" ? "py-1.5" : "py-2.5 sm:py-3"
            )}>
              {prefixText}
            </span>
          )}

          {/* Left Icon */}
          {leftIcon && !prefixText && (
            <div className="absolute left-3.5 text-[#14140f] pointer-events-none flex items-center z-10">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={computedType}
            value={value}
            className={cn(
              "w-full text-[#14140f] placeholder:text-[#6b6b63]/60 transition-all duration-200 outline-none focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/50 disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClasses[inputSize],
              variantClasses[variant],
              !isPill && (prefixText ? "rounded-r-xl" : suffixText ? "rounded-l-xl" : "rounded-xl"),
              isPill && (prefixText ? "rounded-r-full" : suffixText ? "rounded-l-full" : "rounded-full"),
              leftIcon && !prefixText && (inputSize === "sm" ? "pl-9" : "pl-10"),
              (rightIcon || isPassword || clearable) && !suffixText && (inputSize === "sm" ? "pr-9" : "pr-10"),
              error && "border-[#e0455a] focus:border-[#e0455a] focus:ring-red-100",
              className
            )}
            {...props}
          />

          {/* Suffix Text */}
          {suffixText && (
            <span className={cn(
              "inline-flex items-center px-3 border-y-2 border-r-2 border-[#e2e2dc] bg-[#e4e4dd]/50 text-xs font-bold text-[#6b6b63] select-none",
              isPill ? "rounded-r-full" : "rounded-r-xl",
              inputSize === "sm" ? "py-1.5" : "py-2.5 sm:py-3"
            )}>
              {suffixText}
            </span>
          )}

          {/* Clear Button */}
          {clearable && Boolean(value) && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3.5 text-[#6b6b63] hover:text-[#14140f] p-1 rounded-full hover:bg-black/5 transition-colors"
              title="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </button>
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
            !clearable && rightIcon && !suffixText && (
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
