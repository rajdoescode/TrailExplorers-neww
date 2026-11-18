"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const InternationalDestinationsSection: React.FC = () => {
  const destinations = [
    { name: "Dubai", slug: "dubai", image: "/assets/images/destinations/international/dubai.jpg", href: "/tour-packages" },
    { name: "Bhutan", slug: "bhutan", image: "/assets/images/destinations/international/bhutan.jpg", href: "/tour-packages" },
    { name: "Nepal", slug: "nepal", image: "/assets/images/destinations/international/nepal.jpg", href: "/tour-packages" },
    { name: "Bali", slug: "bali", image: "/assets/images/destinations/international/bali.jpg", href: "/tour-packages" },
    { name: "Africa", slug: "africa", image: "/assets/images/destinations/international/africa.jpg", href: "/tour-packages" },
  ];

  const [activeIndex, setActiveIndex] = useState(2);

  const prevDest = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }, [destinations.length]);

  const nextDest = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  // Auto-scroll every 3.5s
  useEffect(() => {
    const timer = setInterval(nextDest, 3500);
    return () => clearInterval(timer);
  }, [nextDest]);

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden" id="intl-dest-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0">
            International Destinations
          </h2>
        </div>

        {/* 3D Coverflow Stage Carousel */}
        <div className="relative flex items-center justify-center gap-2 max-w-full">
          <button
            type="button"
            onClick={prevDest}
            aria-label="Previous destination"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div className="relative flex-1 h-[430px] overflow-hidden">
            {destinations.map((dest, idx) => {
              let offset = idx - activeIndex;
              if (offset > destinations.length / 2) offset -= destinations.length;
              if (offset < -destinations.length / 2) offset += destinations.length;

              const isVisible = Math.abs(offset) <= 2;
              const isCenter = offset === 0;

              let transform = "translate(-50%, -50%) scale(0.6)";
              let zIndex = 1;
              let opacity = 0;
              let boxShadow = "none";

              if (offset === 0) {
                transform = "translate(-50%, -50%) scale(1)";
                zIndex = 10;
                opacity = 1;
                boxShadow = "0 22px 44px rgba(20, 20, 15, 0.20)";
              } else if (offset === 1) {
                transform = "translate(-50%, -50%) translateX(96.5%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 12px 26px rgba(20, 20, 15, 0.11)";
              } else if (offset === -1) {
                transform = "translate(-50%, -50%) translateX(-96.5%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 12px 26px rgba(20, 20, 15, 0.11)";
              } else if (offset === 2) {
                transform = "translate(-50%, -50%) translateX(179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 8px 18px rgba(20, 20, 15, 0.09)";
              } else if (offset === -2) {
                transform = "translate(-50%, -50%) translateX(-179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 8px 18px rgba(20, 20, 15, 0.09)";
              }

              return (
                <Link
                  key={dest.name}
                  href={dest.href}
                  onClick={(e) => {
                    if (!isCenter) {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  className={cn(
                    "trip-card dest-card-simple absolute left-1/2 top-1/2 w-[clamp(240px,20vw,256px)] h-[380px] rounded-[28px] overflow-hidden block bg-[#14140f] transition-all duration-500 ease-[cubic-bezier(0.22,0.85,0.32,1)]",
                    !isCenter && "cursor-pointer"
                  )}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    boxShadow,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  data-offset={offset}
                >
                  <div className="thumb w-full h-full relative overflow-hidden rounded-[28px]">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover rounded-[28px] transition-transform duration-500 hover:scale-105"
                    />

                    {/* Top gradient for title readability */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#14140f]/75 via-[#14140f]/30 to-transparent z-1" />

                    <h3 className="dest-top-title absolute top-6 left-6 right-6 text-white text-2xl font-extrabold z-2 drop-shadow-md">
                      {dest.name}
                    </h3>

                    {/* Watermark logo at bottom */}
                    <div className="dest-watermark absolute bottom-5 left-6 right-6 z-2 opacity-85">
                      <Image
                        src="/assets/images/logo/logo-white-full.png"
                        alt="Awara Banjara"
                        width={120}
                        height={24}
                        className="h-5 w-auto object-contain"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextDest}
            aria-label="Next destination"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
