"use client";

import React, { useState, useEffect, useRef } from "react";

function useCountUp(target: number, start: number = 1000, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic / easeOutExpo combination for snappy start and smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (target - start) * easeProgress);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, start, duration, trigger]);

  return count;
}

function useFloatCountUp(target: number, start: number = 3.5, duration: number = 1800, trigger: boolean = true) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Number((start + (target - start) * easeProgress).toFixed(1));
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, start, duration, trigger]);

  return count;
}

export const TrustBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is available, observe; otherwise trigger immediately
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, []);

  const igCount = useCountUp(13000, 1000, 2200, isVisible);
  const ratingCount = useFloatCountUp(4.9, 3.5, 1800, isVisible);
  const travellersCount = useCountUp(5000, 1000, 2200, isVisible);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#f6f6f1] border-b border-[#e6e6df] overflow-x-auto no-scrollbar"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 py-3.5 sm:py-5">
        <div className="flex flex-nowrap sm:flex-wrap justify-center items-center gap-4 sm:gap-x-12 sm:gap-y-5 text-[14px] sm:text-[15px] font-semibold text-[#14140f] whitespace-nowrap mx-auto">
          {/* Stat 1: Instagram */}
          <a
            href="https://www.instagram.com/awarabanjaracommunity?igsh=MXhpZG11ZnV4MmdhcA=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-2.5 text-inherit no-underline hover:opacity-85 transition-opacity"
          >
            <svg
              width="28"
              height="28"
              style={{ width: "28px", height: "28px" }}
              className="w-5 h-5 sm:w-7 sm:h-7 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="trustIgGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="25%" stopColor="#fa7e1e" />
                  <stop offset="55%" stopColor="#d62976" />
                  <stop offset="80%" stopColor="#962fbf" />
                  <stop offset="100%" stopColor="#4f5bd5" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="6" ry="6" fill="url(#trustIgGradient)" />
              <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.3" fill="#fff" />
            </svg>
            <span>
              <strong className="font-extrabold text-[14px] sm:text-[15px] tabular-nums">
                {igCount.toLocaleString("en-IN")}+
              </strong>{" "}
              <span className="font-medium text-[#14140f] hidden sm:inline">Instagram Community</span>
            </span>
          </a>

          {/* Stat 2: Google Reviews */}
          <a
            href="https://share.google/iuuImIepaTHvLgaxm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-2.5 text-inherit no-underline hover:opacity-85 transition-opacity"
          >
            <svg
              width="28"
              height="28"
              style={{ width: "28px", height: "28px" }}
              className="w-5 h-5 sm:w-7 sm:h-7 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.64v3h3.88c2.27-2.09 3.57-5.17 3.57-8.83z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.73-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.27a12 12 0 0 0 0 10.76l4-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.09C6.22 6.86 8.87 4.75 12 4.75z"
              />
            </svg>
            <span>
              <strong className="font-extrabold text-[14px] sm:text-[15px] tabular-nums">
                {ratingCount.toFixed(1)}★
              </strong>{" "}
              <span className="font-medium text-[#14140f] hidden sm:inline">Google Reviews</span>
            </span>
          </a>

          {/* Stat 3: Travellers */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5">
            <svg
              width="28"
              height="28"
              style={{ width: "28px", height: "28px" }}
              className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-[#14140f]"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8.5" cy="8" r="3" />
              <path d="M2 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
              <circle cx="17" cy="8.5" r="2.5" />
              <path d="M15.5 12a4.5 4.5 0 0 1 4.5 4.5V19" />
            </svg>
            <span>
              <strong className="font-extrabold text-[14px] sm:text-[15px] tabular-nums">
                {travellersCount.toLocaleString("en-IN")}+
              </strong>{" "}
              <span className="font-medium text-[#14140f] hidden sm:inline">Travellers</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
