import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "text"
  | "icon"
  | "white"
  | "dark"
  | "hero-ghost"
  | "whatsapp";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#d6ff3f] text-[#14140f] border-2 border-[#14140f] shadow-sm hover:translate-y-[-2px] hover:shadow-[0_8px_20px_rgba(214,255,63,0.55)] active:translate-y-0 active:shadow-none font-bold",
  secondary:
    "bg-[#f0f0eb] text-[#14140f] border-2 border-[#14140f] hover:bg-[#e4e4dd] hover:translate-y-[-2px] active:translate-y-0 font-bold",
  outline:
    "bg-transparent text-[#14140f] border-2 border-[#14140f] hover:bg-[#14140f] hover:text-white hover:translate-y-[-2px] active:translate-y-0 font-bold",
  ghost:
    "bg-transparent text-[#14140f] border-2 border-transparent hover:bg-[#f6f6f1] active:bg-[#e8e8e2] font-semibold",
  text:
    "bg-transparent text-[#14140f] border-0 hover:underline underline-offset-4 p-0 h-auto font-bold",
  icon:
    "bg-transparent text-[#14140f] border border-[#e2e2dc] hover:border-[#14140f] hover:bg-[#f6f6f1] rounded-full p-2.5",
  white:
    "bg-white text-[#14140f] border-2 border-[#14140f] shadow-card hover:translate-y-[-2px] hover:shadow-[0_12px_24px_rgba(20,20,15,0.12)] active:translate-y-0 font-bold",
  dark:
    "bg-[#14140f] text-white border-2 border-[#14140f] hover:bg-[#282822] hover:translate-y-[-2px] active:translate-y-0 font-bold",
  "hero-ghost":
    "bg-black/30 text-white border-2 border-white backdrop-blur-md hover:bg-white hover:text-[#14140f] hover:translate-y-[-2px] font-bold",
  whatsapp:
    "bg-[#25D366] text-white border-2 border-[#25D366] hover:bg-[#20ba59] hover:border-[#20ba59] hover:translate-y-[-2px] hover:shadow-[0_8px_20px_rgba(37,211,102,0.45)] active:translate-y-0 font-bold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-full gap-2",
  lg: "text-base px-7 py-3 rounded-full gap-2.5",
  xl: "text-lg px-8 py-3.5 rounded-full gap-3",
  icon: "h-10 w-10 p-0 rounded-full flex items-center justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      href,
      external = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center font-heading transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-none",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return (
          <a
            href={href}
            className={baseClasses}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {content}
          </a>
        );
      }

      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
