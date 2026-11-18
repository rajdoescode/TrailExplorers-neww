import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lime" | "dark" | "outline" | "white" | "muted" | "success" | "danger";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "lime",
  size = "sm",
  children,
  ...props
}) => {
  const variantStyles = {
    lime: "bg-[#d6ff3f] text-[#14140f] border border-[#14140f] font-bold shadow-xs",
    dark: "bg-[#14140f] text-white font-bold",
    outline: "bg-transparent text-[#14140f] border border-[#14140f] font-semibold",
    white: "bg-white text-[#14140f] border border-[#e2e2dc] shadow-xs font-semibold",
    muted: "bg-[#f0f0eb] text-[#6b6b63] font-semibold",
    success: "bg-[#e8f7ed] text-[#2fa84f] border border-[#2fa84f]/30 font-bold",
    danger: "bg-[#fdeeed] text-[#e0455a] border border-[#e0455a]/30 font-bold",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 rounded-full tracking-wide",
    md: "text-xs px-3 py-1 rounded-full tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center uppercase transition-all select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
