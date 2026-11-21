"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  bodyClassName?: string;
  headerClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "auto";
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  raw?: boolean;
  zIndex?: number;
}

let openModalsCount = 0;
let previousBodyOverflow = "";
let previousBodyPaddingRight = "";
let previousActiveElement: HTMLElement | null = null;

const lockBodyScroll = () => {
  if (typeof document === "undefined") return;
  if (openModalsCount === 0) {
    previousActiveElement = (document.activeElement as HTMLElement) || null;
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  }
  openModalsCount++;
};

const unlockBodyScroll = () => {
  if (typeof document === "undefined") return;
  openModalsCount = Math.max(0, openModalsCount - 1);
  if (openModalsCount === 0) {
    document.body.style.overflow = previousBodyOverflow || "";
    document.body.style.paddingRight = previousBodyPaddingRight || "";
    if (previousActiveElement && typeof previousActiveElement.focus === "function") {
      try {
        previousActiveElement.focus();
      } catch {
        // Ignore focus error if element was removed
      }
      previousActiveElement = null;
    }
  }
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  overlayClassName,
  bodyClassName,
  headerClassName,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  raw = false,
  zIndex,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [layerIndex, setLayerIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !mounted) return;

    lockBodyScroll();
    setLayerIndex(openModalsCount - 1);

    const focusTimer = setTimeout(() => {
      if (dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          dialogRef.current.focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      unlockBodyScroll();
    };
  }, [isOpen, mounted, onClose, closeOnEsc]);

  if (!isOpen || !mounted) return null;

  const baseZIndex = zIndex ?? (9990 + layerIndex * 10);

  const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "w-[calc(100vw-24px)] sm:w-[calc(100vw-48px)] max-w-7xl max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-48px)]",
    auto: "max-w-fit",
  };

  const modalNode = (
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
        zIndex: baseZIndex,
      }}
      className={cn(
        "fixed inset-0 w-screen h-screen min-h-[100dvh] flex items-center justify-center p-3 sm:p-6",
        "bg-black/60 backdrop-blur-sm transition-all duration-200 overflow-y-auto overscroll-contain animate-fade-in",
        overlayClassName
      )}
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      {raw ? (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className={cn("relative my-auto outline-none animate-modal-in", className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      ) : (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className={cn(
            "w-full bg-white rounded-[22px] border-2 border-[#14140f] shadow-2xl flex flex-col max-h-[min(90vh,90dvh)] overflow-hidden my-auto outline-none animate-modal-in transition-all",
            sizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                "flex items-start justify-between px-6 py-4 sm:py-5 border-b border-[#e2e2dc] bg-[#fdfdfc] shrink-0",
                headerClassName
              )}
            >
              <div className="space-y-1 pr-4">
                {title && (
                  <h3 className="text-xl font-extrabold text-[#14140f] font-heading tracking-tight">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs sm:text-sm text-[#6b6b63]">{description}</p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-[#f6f6f1] text-[#6b6b63] hover:text-[#14140f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d6ff3f]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Content Body */}
          <div
            className={cn(
              "flex-1 overflow-y-auto px-6 py-5 overscroll-contain",
              bodyClassName
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-[#e2e2dc] bg-[#f6f6f1]/60 flex items-center justify-end gap-3 shrink-0">
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return createPortal(modalNode, document.body);
};
