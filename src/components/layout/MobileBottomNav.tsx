"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Hide on trip detail pages and plan-your-trip (dedicated full-screen views / action bars)
  if (pathname.startsWith("/trips/") || pathname === "/plan-your-trip") {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isTripsActive = pathname === "/community-trips";
  const isPackagesActive = pathname === "/tour-packages";

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed left-3.5 right-3.5 z-40 max-w-[420px] mx-auto overflow-visible select-none pointer-events-auto"
      style={{
        bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Pill Container */}
      <div className="relative bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] h-[64px] px-2 flex items-center justify-around border border-black/[0.04]">
        {/* 1. Home */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full py-1 transition-all active:scale-95 group",
            isHomeActive ? "text-[#111827]" : "text-[#4b5563] hover:text-[#111827]"
          )}
          aria-label="Home"
        >
          <svg
            className={cn(
              "w-6 h-6 transition-transform group-hover:scale-105",
              isHomeActive ? "stroke-[2.4]" : "stroke-[2.1]"
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10.5L12 3l9 7.5" />
            <path d="M5.5 9v11.5h4v-5a2.5 2.5 0 0 1 5 0v5h4V9" />
          </svg>
          <span
            className={cn(
              "text-[10.5px] mt-1 tracking-tight leading-none",
              isHomeActive ? "font-bold text-[#111827]" : "font-semibold text-[#111827]"
            )}
          >
            Home
          </span>
        </Link>

        {/* 2. Trips */}
        <Link
          href="/community-trips"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full py-1 transition-all active:scale-95 group",
            isTripsActive ? "text-[#111827]" : "text-[#4b5563] hover:text-[#111827]"
          )}
          aria-label="Trips"
        >
          <svg
            className={cn(
              "w-6 h-6 transition-transform group-hover:scale-105",
              isTripsActive ? "text-[#111827]" : "text-[#111827]"
            )}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12.5 8 12.5s8-7.25 8-12.5c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            />
          </svg>
          <span
            className={cn(
              "text-[10.5px] mt-1 tracking-tight leading-none",
              isTripsActive ? "font-bold text-[#111827]" : "font-semibold text-[#111827]"
            )}
          >
            Trips
          </span>
        </Link>

        {/* 3. Plan Trip (Center Elevated Button) */}
        <div className="relative flex flex-col items-center justify-center px-1">
          <Link
            href="/plan-your-trip"
            className="flex flex-col items-center justify-center -mt-5 w-[64px] h-[64px] rounded-full bg-[#14140f] text-white transition-transform active:scale-95 hover:scale-105 cursor-pointer relative z-10"
            style={{
              boxShadow:
                "0 0 0 3px rgba(214, 255, 63, 0.4), 0 0 18px rgba(214, 255, 63, 0.7), 0 4px 12px rgba(0, 0, 0, 0.35)",
            }}
            aria-label="Plan Trip"
          >
            {/* Map with Neon Lime Green Pin Icon */}
            <svg
              className="w-7 h-7 -mt-0.5"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              {/* 3-Panel Folded Map in White */}
              <path
                d="M3.5 7L10 3.5L18 7.5L24.5 4V21L18 24.5L10 20.5L3.5 24V7Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 3.5V20.5"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 7.5V24.5"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Neon Lime Green Location Pin on Right Panel */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 2C19.34 2 18 3.34 18 5C18 7.3 21 10.5 21 10.5C21 10.5 24 7.3 24 5C24 3.34 22.66 2 21 2ZM21 6.3C20.28 6.3 19.7 5.72 19.7 5C19.7 4.28 20.28 3.7 21 3.7C21.72 3.7 22.3 4.28 22.3 5C22.3 5.72 21.72 6.3 21 6.3Z"
                fill="#d6ff3f"
              />
            </svg>
            <span className="text-[10px] font-bold text-white tracking-tight mt-0.5 leading-none">
              Plan Trip
            </span>
          </Link>
        </div>

        {/* 4. Packages */}
        <Link
          href="/tour-packages"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full py-1 transition-all active:scale-95 group",
            isPackagesActive ? "text-[#111827]" : "text-[#4b5563] hover:text-[#111827]"
          )}
          aria-label="Packages"
        >
          <svg
            className={cn(
              "w-6 h-6 transition-transform group-hover:scale-105",
              isPackagesActive ? "stroke-[2.4]" : "stroke-[2.1]"
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.6-.1-1.2.2-1.5.7l-.6 1 5.8 3.5-3 3-2.2-.4c-.4-.1-.8.1-1 .4l-.6.9 3.2 2 2 3.2.9-.6c.3-.2.5-.6.4-1l-.4-2.2 3-3 3.5 5.8 1-.6c.5-.3.8-.9.7-1.5z" />
          </svg>
          <span
            className={cn(
              "text-[10.5px] mt-1 tracking-tight leading-none",
              isPackagesActive ? "font-bold text-[#111827]" : "font-semibold text-[#111827]"
            )}
          >
            Packages
          </span>
        </Link>

        {/* 5. WhatsApp */}
        <a
          href="https://wa.me/917016640870?text=Hi%20Trail%20Explorers!%20%F0%9F%91%8B%20I'm%20interested%20in%20planning%20a%20Himalayan%20trip%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 h-full py-1 transition-transform active:scale-95 group"
          aria-label="Chat on WhatsApp"
        >
          <svg
            className="w-[34px] h-[34px] transition-transform group-hover:scale-105"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {/* WhatsApp Speech Bubble Outline */}
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.17-1.31A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.57 0-3.04-.44-4.3-1.21l-.31-.19-3.07.78.82-2.94-.2-.33A8.16 8.16 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2z"
              fill="#25D366"
            />
            {/* Phone Handset inside bubble */}
            <path
              d="M17.5 14.38c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51-.18 0-.38-.02-.58-.02-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z"
              fill="#25D366"
            />
          </svg>
        </a>
      </div>
    </nav>
  );
};
