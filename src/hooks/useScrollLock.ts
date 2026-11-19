"use client";

import { useEffect } from "react";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/**
 * Global React hook to lock background page scrolling when a modal,
 * dialog, bottom sheet drawer, or lightbox is open.
 *
 * Supports nested modals through reference counting, preserves exact
 * scroll position, and blocks background touch scrolling on iOS Safari
 * and Android Chrome.
 *
 * @param locked Boolean indicating whether the modal/drawer is open
 */
export function useScrollLock(locked: boolean = true): void {
  useEffect(() => {
    if (!locked) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [locked]);
}
