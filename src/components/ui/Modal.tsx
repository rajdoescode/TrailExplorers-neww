"use client";

import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useSwipeDownToClose } from "@/hooks/useSwipeDownToClose";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  isBottomSheetOnMobile?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  size = "md",
  showCloseButton = true,
  isBottomSheetOnMobile = true,
}) => {
  // Global reference-counted scroll lock
  useScrollLock(isOpen);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Swipe-down to close on mobile devices
  const { sheetRef, dragHandleRef } = useSwipeDownToClose({
    isOpen,
    onClose,
    overlayRef,
  });

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "sm:max-w-md",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-4xl",
    full: "sm:max-w-[calc(100vw-32px)] sm:h-[calc(100vh-32px)]",
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain animate-in fade-in duration-200"
    >
      <div
        ref={sheetRef}
        className={cn(
          "w-full bg-white text-[#14140f] border border-[#e2e2dc] shadow-2xl overflow-hidden flex flex-col overscroll-contain transition-transform duration-200",
          isBottomSheetOnMobile
            ? "rounded-t-[26px] sm:rounded-[26px] max-h-[90dvh] sm:max-h-[calc(100dvh-48px)]"
            : "rounded-[26px] max-h-[calc(100dvh-32px)] m-3",
          sizeClasses[size],
          className
        )}
      >
        {/* Mobile Swipe-Down Drag Handle */}
        {isBottomSheetOnMobile && (
          <div
            ref={dragHandleRef}
            className="w-12 h-1.5 bg-[#e2e2dc] hover:bg-[#14140f]/30 rounded-full mx-auto my-2.5 block sm:hidden cursor-grab active:cursor-grabbing touch-none select-none transition-colors"
            title="Drag down to close"
            aria-label="Drag down to close"
          />
        )}

        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-[#ecece6] shrink-0">
            <div className="flex flex-col gap-1 min-w-0">
              {title && (
                <h3 className="text-lg sm:text-xl font-extrabold font-heading text-[#14140f] leading-snug">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs sm:text-sm text-[#6b6b63] leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full border border-[#e2e2dc] hover:border-[#14140f] hover:bg-[#f6f6f1] text-[#14140f] flex items-center justify-center transition-all cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 chat-scroll">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-4 sm:p-6 border-t border-[#ecece6] bg-[#fafaf8] shrink-0 pb-[calc(16px+env(safe-area-inset-bottom,0px))] sm:pb-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
