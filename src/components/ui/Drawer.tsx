"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: "right" | "left" | "bottom";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
  className,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEsc = true,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !mounted) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen, mounted, onClose, closeOnEsc]);

  if (!isOpen || !mounted) return null;

  const sizeStyles = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
  };

  const sideAnimation = {
    right: "inset-y-0 right-0 animate-slide-left",
    left: "inset-y-0 left-0 animate-slide-right",
    bottom: "inset-x-0 bottom-0 max-h-[85vh] animate-slide-up rounded-t-[26px]",
  };

  const drawerContent = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        zIndex: 9990,
      }}
      className="fixed inset-0 w-screen h-screen min-h-[100dvh] bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in"
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={cn(
          "w-full bg-white flex flex-col shadow-2xl border-l-2 border-[#14140f] z-50 outline-none",
          sideAnimation[side],
          side !== "bottom" && sizeStyles[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#e2e2dc] bg-[#fdfdfc] shrink-0">
          <div className="space-y-1 pr-4">
            {title && (
              <h3 className="text-lg sm:text-xl font-extrabold text-[#14140f] font-heading tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-[#6b6b63]">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f6f6f1] text-[#6b6b63] hover:text-[#14140f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d6ff3f]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 overscroll-contain">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-[#e2e2dc] bg-[#f6f6f1]/60 flex items-center justify-end gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};
