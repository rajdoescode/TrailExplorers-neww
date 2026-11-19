"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";

export const HighEndWanderingSection: React.FC = () => {
  const trips = [
    {
      id: "trip-spiti-winter",
      title: "Spiti Valley Group Trip from Delhi: Winter Expedition (9 Days)",
      slug: "spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930",
      image_url: "/assets/images/trips/img_1793091363548____2_.jpg",
      duration_days: 9,
      duration_nights: 8,
      price: 17499,
    },
    {
      id: "trip-naggar",
      title: "Naggar, Baralacha La & Bijli Mahadev Community Trip Ex-Delhi",
      slug: "naggar-baralacha-la-bijli-mahadev-community-trip-ex-delhi-1793300342070",
      image_url: "/assets/images/trips/img_1793340766352____17_.jpg",
      duration_days: 5,
      duration_nights: 4,
      price: 8499,
    },
    {
      id: "trip-kasol",
      title: "Delhi to Delhi Manali Weekend Escape",
      slug: "delhi-to-delhi-manali-weekend-escape-1789277670644",
      image_url: "/assets/images/trips/img_1789393701594_Manali_weather___.jpg",
      duration_days: 4,
      duration_nights: 3,
      price: 6999,
    },
    {
      id: "trip-zanskar",
      title: "Zanskar From Delhi: Shinku La & Gonbo Rangjon Expedition",
      slug: "zanskar-from-delhi-shinku-la-gonbo-rangjon-expedition-1791270197364",
      image_url: "/assets/images/trips/img_1791366815939_images.jpg",
      duration_days: 5,
      duration_nights: 4,
      price: 8999,
    },
    {
      id: "trip-kullu",
      title: "Kullu Dussehra Special Cultural Expedition & Manali Escape",
      slug: "kullu-dussehra-special-cultural-expedition-manali-escape-1790364151734",
      image_url: "/assets/images/trips/img_1791097768369_Kullu-Dussehra-2025__1_.webp",
      duration_days: 5,
      duration_nights: 4,
      price: 7999,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prevTrip = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + trips.length) % trips.length);
  }, [trips.length]);

  const nextTrip = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % trips.length);
  }, [trips.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      nextTrip();
    } else if (distance < -45) {
      prevTrip();
    }
  };

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6">
        {/* Section Head */}
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0">
            High-End Wandering on a Lemonade Budget
          </h2>
          <p className="text-base text-[#6b6b63] mt-2.5 font-medium">
            Explore trips under ₹19,999
          </p>
        </div>

        {/* 3D Coverflow Stage Carousel */}
        <div className="relative flex items-center justify-center max-w-full">
          <button
            type="button"
            onClick={prevTrip}
            aria-label="Previous trip"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div
            className="carousel-stage relative flex-1 h-[460px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {trips.map((trip, idx) => {
              let offset = idx - activeIndex;
              if (offset > trips.length / 2) offset -= trips.length;
              if (offset < -trips.length / 2) offset += trips.length;

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
                boxShadow = "0 16px 36px -4px rgba(20, 20, 15, 0.22), 0 6px 16px rgba(20, 20, 15, 0.10)";
              } else if (offset === 1) {
                transform = "translate(-50%, -50%) translateX(94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 10px 24px -4px rgba(20, 20, 15, 0.12), 0 4px 10px rgba(20, 20, 15, 0.06)";
              } else if (offset === -1) {
                transform = "translate(-50%, -50%) translateX(-94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 10px 24px -4px rgba(20, 20, 15, 0.12), 0 4px 10px rgba(20, 20, 15, 0.06)";
              } else if (offset === 2) {
                transform = "translate(-50%, -50%) translateX(179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 6px 14px rgba(20, 20, 15, 0.08)";
              } else if (offset === -2) {
                transform = "translate(-50%, -50%) translateX(-179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 6px 14px rgba(20, 20, 15, 0.08)";
              }

              return (
                <article
                  key={trip.id}
                  onClick={() => !isCenter && setActiveIndex(idx)}
                  className={cn(
                    "trip-card absolute left-1/2 top-1/2 w-[clamp(215px,58vw,252px)] h-[384px] bg-white rounded-[20px] overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,0.85,0.32,1)] border-0",
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
                  <div className="thumb aspect-[4/3] relative overflow-hidden shrink-0 bg-gray-100 rounded-t-[20px]">
                    <SkeletonImage
                      src={trip.image_url}
                      alt={trip.title}
                      fill
                      sizes="300px"
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                      skeletonClassName="rounded-t-[20px]"
                    />
                  </div>

                  <div className="body p-4 sm:p-[18px] flex flex-col flex-1 min-h-0">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#14140f] leading-snug line-clamp-2 min-h-[42px] m-0">
                      {trip.title}
                    </h3>

                    <div className="meta flex items-center gap-1.5 text-xs font-semibold text-[#6b6b63] mt-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {trip.duration_days} Days / {trip.duration_nights} Nights
                      </span>
                    </div>

                    <hr className="border-t border-[#ecece5] my-2.5" />

                    <div className="price-row flex items-center justify-between mt-auto pt-1 pb-0.5">
                      <div>
                        <span className="price-label text-[11px] font-bold tracking-wider uppercase text-[#6b6b63] block">
                          Starts from
                        </span>
                        <span className="price text-[16px] sm:text-[17px] font-extrabold text-[#14140f]">
                          {formatPrice(trip.price)}
                        </span>
                      </div>

                      <Link
                        href={`/trips/${trip.slug}`}
                        className="btn btn-dark text-xs font-bold px-4 py-2 rounded-full bg-[#14140f] text-white hover:bg-black transition-colors shrink-0"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextTrip}
            aria-label="Next trip"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-2">
          {trips.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to trip ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer p-0 border-0",
                i === activeIndex ? "w-6 bg-[#14140f]" : "w-1.5 bg-[#d4d4cb]"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
