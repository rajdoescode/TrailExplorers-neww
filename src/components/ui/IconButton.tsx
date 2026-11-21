"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "dark"
  | "lime"
  | "whatsapp";

export type IconButtonSize = "xs" | "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  title?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary:
    "bg-[#d6ff3f] text-[#14140f] border-2 border-[#14140f] shadow-xs hover:bg-[#cbf536] hover:scale-105 active:scale-95",
  secondary:
    "bg-[#f0f0eb] text-[#14140f] border border-[#e2e2dc] hover:bg-[#e4e4dd] hover:border-[#14140f] active:scale-95",
  outline:
    "bg-transparent text-[#14140f] border-2 border-[#e2e2dc] hover:border-[#14140f] hover:bg-[#f6f6f1] active:scale-95",
  ghost:
    "bg-transparent text-[#6b6b63] hover:text-[#14140f] hover:bg-[#f6f6f1] active:bg-[#e8e8e2] active:scale-95",
  danger:
    "bg-transparent text-[#e0455a] hover:bg-[#fdeeed] hover:text-red-700 active:scale-95",
  dark:
    "bg-[#14140f] text-white hover:bg-[#282822] active:scale-95 shadow-xs",
  lime:
    "bg-[#d6ff3f] text-[#14140f] hover:bg-[#cbf536] active:scale-95 shadow-xs",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-95 shadow-xs",
};

const sizeStyles: Record<IconButtonSize, string> = {
  xs: "w-7 h-7 p-1 rounded-lg text-xs",
  sm: "w-8 h-8 p-1.5 rounded-xl text-xs",
  md: "w-10 h-10 p-2 rounded-xl text-sm",
  lg: "w-12 h-12 p-2.5 rounded-2xl text-base",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "ghost",
      size = "md",
      isLoading = false,
      icon,
      children,
      disabled,
      title,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        title={title}
        aria-label={title}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none shrink-0",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          icon || children
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
