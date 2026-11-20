"use client";

import { useEffect, useRef } from "react";

export interface SwipeDownOptions {
  isOpen: boolean;
  onClose: () => void;
  /** Distance in pixels to trigger dismiss (default: 75px) */
  threshold?: number;
  /** Optional overlay element to fade out during swipe */
  overlayRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Reusable hook that enables native Android/iOS style pull/swipe-down-to-close
 * gesture on mobile bottom-sheets and dialog modals.
 *
 * Supports:
 * - Direct drag on the top drag handle (with pointer capture for mouse & touch)
 * - Natural swipe-down anywhere on the sheet when scrolled to top (scrollTop <= 0)
 * - Smooth 1:1 real-time drag tracking with 0 lag
 * - Velocity-based fling detection (quick downward flick closes even before threshold)
 * - Elastic snap-back if released before threshold
 * - Automatic background scroll prevention during active pull
 */
export function useSwipeDownToClose<T extends HTMLElement = HTMLDivElement>({
  isOpen,
  onClose,
  threshold = 75,
  overlayRef,
}: SwipeDownOptions) {
  const sheetRef = useRef<T | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet || !isOpen) return;

    let startY = 0;
    let startX = 0;
    let currentY = 0;
    let startTime = 0;
    let isPulling = false;
    let canPull = false;
    let isPointerDragging = false;
    let animTimeout: ReturnType<typeof setTimeout> | null = null;

    // Reset inline styles whenever modal opens
    sheet.style.transform = "";
    sheet.style.transition = "";
    if (overlayRef?.current) {
      overlayRef.current.style.opacity = "";
      overlayRef.current.style.transition = "";
    }

    const startDrag = (clientY: number, clientX: number, isDirectHandle: boolean) => {
      startY = clientY;
      startX = clientX;
      currentY = clientY;
      startTime = Date.now();
      isPulling = false;

      if (isDirectHandle) {
        canPull = true;
        return;
      }

      // Check if sheet or any scrollable child is scrolled down
      let isAtTop = sheet.scrollTop <= 0;
      let target: HTMLElement | null = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
      while (target && target !== sheet.parentElement) {
        if (target.scrollTop > 0) {
          isAtTop = false;
          break;
        }
        target = target.parentElement;
      }

      canPull = isAtTop;
    };

    const updateDrag = (clientY: number, clientX: number, cancelable: boolean, preventDefault: () => void) => {
      if (!canPull) return;

      currentY = clientY;
      const deltaY = currentY - startY;
      const deltaX = clientX - startX;

      // Ignore horizontal gestures (e.g. swipes inside horizontal carousels)
      if (!isPulling && Math.abs(deltaX) > Math.abs(deltaY)) {
        canPull = false;
        return;
      }

      if (deltaY > 0) {
        isPulling = true;
        if (cancelable) preventDefault();

        sheet.style.transition = "none";
        sheet.style.transform = `translateY(${deltaY}px)`;

        if (overlayRef?.current) {
          const fadeProgress = Math.min(deltaY / 320, 0.7);
          overlayRef.current.style.transition = "none";
          overlayRef.current.style.opacity = `${Math.max(0.15, 1 - fadeProgress)}`;
        }
      } else if (isPulling) {
        // Slight resistance when pushed back up
        sheet.style.transform = `translateY(${deltaY * 0.15}px)`;
      }
    };

    const finishDrag = () => {
      if (!isPulling) {
        canPull = false;
        isPointerDragging = false;
        return;
      }

      const deltaY = currentY - startY;
      const duration = Math.max(1, Date.now() - startTime);
      const velocity = deltaY / duration; // px per ms

      // Dismiss if pulled past threshold OR flicked down with velocity
      if (deltaY > threshold || (deltaY > 30 && velocity > 0.35)) {
        sheet.style.transition = "transform 0.22s cubic-bezier(0.32, 1, 0.23, 1)";
        sheet.style.transform = "translateY(100%)";

        if (overlayRef?.current) {
          overlayRef.current.style.transition = "opacity 0.22s ease-out";
          overlayRef.current.style.opacity = "0";
        }

        animTimeout = setTimeout(() => {
          onClose();
          if (sheet) {
            sheet.style.transform = "";
            sheet.style.transition = "";
          }
          if (overlayRef?.current) {
            overlayRef.current.style.opacity = "";
            overlayRef.current.style.transition = "";
          }
        }, 220);
      } else {
        // Snap back to open position
        sheet.style.transition = "transform 0.2s cubic-bezier(0.32, 1, 0.23, 1)";
        sheet.style.transform = "";

        if (overlayRef?.current) {
          overlayRef.current.style.transition = "opacity 0.2s ease-out";
          overlayRef.current.style.opacity = "";
        }
      }

      isPulling = false;
      canPull = false;
      isPointerDragging = false;
    };

    // --- Touch Handlers (for mobile phones / touch screens) ---
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const isHandle = Boolean(
        dragHandleRef.current &&
          (dragHandleRef.current === e.target || dragHandleRef.current.contains(e.target as Node))
      );
      startDrag(t.clientY, t.clientX, isHandle);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      updateDrag(t.clientY, t.clientX, e.cancelable, () => e.preventDefault());
    };

    const onTouchEnd = () => {
      finishDrag();
    };

    // --- Pointer Handlers (on drag handle for mouse / stylus drag) ---
    const dragHandle = dragHandleRef.current;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (dragHandle) {
        try {
          dragHandle.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
      isPointerDragging = true;
      startDrag(e.clientY, e.clientX, true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDragging) return;
      updateDrag(e.clientY, e.clientX, e.cancelable, () => e.preventDefault());
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isPointerDragging) return;
      if (dragHandle) {
        try {
          dragHandle.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
      finishDrag();
    };

    sheet.addEventListener("touchstart", onTouchStart, { passive: true });
    sheet.addEventListener("touchmove", onTouchMove, { passive: false });
    sheet.addEventListener("touchend", onTouchEnd, { passive: true });
    sheet.addEventListener("touchcancel", onTouchEnd, { passive: true });

    if (dragHandle) {
      dragHandle.addEventListener("pointerdown", onPointerDown);
      dragHandle.addEventListener("pointermove", onPointerMove);
      dragHandle.addEventListener("pointerup", onPointerUp);
      dragHandle.addEventListener("pointercancel", onPointerUp);
    }

    return () => {
      sheet.removeEventListener("touchstart", onTouchStart);
      sheet.removeEventListener("touchmove", onTouchMove);
      sheet.removeEventListener("touchend", onTouchEnd);
      sheet.removeEventListener("touchcancel", onTouchEnd);

      if (dragHandle) {
        dragHandle.removeEventListener("pointerdown", onPointerDown);
        dragHandle.removeEventListener("pointermove", onPointerMove);
        dragHandle.removeEventListener("pointerup", onPointerUp);
        dragHandle.removeEventListener("pointercancel", onPointerUp);
      }

      if (animTimeout) clearTimeout(animTimeout);
      sheet.style.transform = "";
      sheet.style.transition = "";
      if (overlayRef?.current) {
        overlayRef.current.style.opacity = "";
        overlayRef.current.style.transition = "";
      }
    };
  }, [isOpen, onClose, threshold, overlayRef]);

  return { sheetRef, dragHandleRef };
}
