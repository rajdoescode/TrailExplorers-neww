/**
 * Global Reference-Counted Scroll Lock Manager
 *
 * Prevents background scrolling when any modal, dialog, drawer, or overlay is open.
 * Supports iOS Safari, Android Chrome, and Desktop browsers.
 * Preserves exact scroll position and eliminates layout shift.
 */

let lockCount = 0;
let savedScrollY = 0;
let savedStyles: {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
  paddingRight: string;
  htmlOverflow: string;
} | null = null;

export function lockScroll(): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  lockCount += 1;

  // Only apply lock on the first active modal (reference count 1)
  if (lockCount === 1) {
    savedScrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const body = document.body;
    const html = document.documentElement;

    savedStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    body.classList.add("modal-open");
  }
}

export function unlockScroll(): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (lockCount <= 0) {
    lockCount = 0;
    return;
  }

  lockCount -= 1;

  // Only unlock when all active modals have closed (reference count 0)
  if (lockCount === 0) {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = savedScrollY;

    if (savedStyles) {
      html.style.overflow = savedStyles.htmlOverflow;
      body.style.overflow = savedStyles.overflow;
      body.style.position = savedStyles.position;
      body.style.top = savedStyles.top;
      body.style.left = savedStyles.left;
      body.style.right = savedStyles.right;
      body.style.width = savedStyles.width;
      body.style.paddingRight = savedStyles.paddingRight;
      savedStyles = null;
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "";
    }

    body.classList.remove("modal-open");

    // Instantly restore exact scroll position without smooth jump
    try {
      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    } catch {
      window.scrollTo(0, scrollY);
    }
  }
}

export function isScrollLocked(): boolean {
  return lockCount > 0;
}
