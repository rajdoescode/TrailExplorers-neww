"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { TRIPS_DATA } from "@/data/trips";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const CommunityTripsSection: React.FC = () => {
  // Ordered trips matching the reference screenshots exactly
  const trips = [
    {
      id: "trip-carnival",
      title: "Carnival Collective : Manali Winter Carnival Special",
      slug: "carnival-collective-manali-winter-carnival-special-1790406745365",
      image_url: "/assets/images/trips/img_1790406721853_Himachal_Winter_Carnival_2025___Adventure__Culture_and_Celebration_of_Snow.jpg",
      duration_days: 6,
      duration_nights: 5,
      price: "On Request",
      isComingSoon: true,
    },
    {
      id: "trip-spiti-4x4",
      title: "Spiti : Winter 4X4 Expedition",
      slug: "spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930",
      image_url: "/assets/images/trips/trip_103_image_url.jpg",
      duration_days: 9,
      duration_nights: 8,
      price: 25499,
      isComingSoon: false,
    },
    {
      id: "trip-naggar",
      title: "Naggar, Baralacha La & Bijli Mahadev Community Trip...",
      slug: "naggar-baralacha-la-bijli-mahadev-community-trip-ex-delhi-1793300342070",
      image_url: "/assets/images/trips/img_1793340766352____17_.jpg",
      duration_days: 5,
      duration_nights: 4,
      price: 8499,
      isComingSoon: false,
    },
    {
      id: "trip-kasol",
      title: "Kasol & Manali: Offbeat Himalayan Escape",
      slug: "delhi-to-delhi-manali-weekend-escape-1789277670644",
      image_url: "/assets/images/trips/trip_108_image_url.jpg",
      duration_days: 6,
      duration_nights: 5,
      price: 6999,
      isComingSoon: false,
    },
    {
      id: "trip-spiti-valley",
      title: "Spiti Valley Group Trip from Delhi: Winter Expedition (...",
      slug: "spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930",
      image_url: "/assets/images/trips/trip_104_image_url.jpg",
      duration_days: 9,
      duration_nights: 8,
      price: 17499,
      isComingSoon: false,
    },
    {
      id: "trip-zanskar",
      title: "Zanskar From Delhi: Shinku La & Gonbo Rangjon Expedition",
      slug: "zanskar-from-delhi-shinku-la-gonbo-rangjon-expedition-1791270197364",
      image_url: "/assets/images/trips/img_1791366815939_images.jpg",
      duration_days: 5,
      duration_nights: 4,
      price: 8999,
      isComingSoon: false,
    },
    {
      id: "trip-kullu",
      title: "Kullu Dussehra Special Cultural Expedition & Manali Escape",
      slug: "kullu-dussehra-special-cultural-expedition-manali-escape-1790364151734",
      image_url: "/assets/images/trips/img_1791097768369_Kullu-Dussehra-2025__1_.webp",
      duration_days: 5,
      duration_nights: 4,
      price: 7999,
      isComingSoon: false,
    },
  ];

  // Active index (default: Naggar Baralacha at index 2, matching user screenshot)
  const [activeIndex, setActiveIndex] = useState(2);
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevTrip();
      if (e.key === "ArrowRight") nextTrip();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevTrip, nextTrip]);

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden" aria-label="Community Trips">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6">
        {/* Section Head (Exact typography) */}
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0">
            Community Trips
          </h2>
          <p className="text-base text-[#6b6b63] mt-2.5 font-medium">
            Immersive Travel, More human connection.
          </p>
        </div>

        {/* Coverflow Stage Carousel */}
        <div className="relative flex items-center justify-center max-w-full">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={prevTrip}
            aria-label="Previous trip"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 3D Stage Area */}
          <div
            className="carousel-stage relative flex-1 h-[460px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {trips.map((trip, idx) => {
              // Compute shortest circular offset
              let offset = idx - activeIndex;
              if (offset > trips.length / 2) offset -= trips.length;
              if (offset < -trips.length / 2) offset += trips.length;

              const isVisible = Math.abs(offset) <= 2;
              const isCenter = offset === 0;

              // Style transforms based on offset with deep natural elevation shadows
              let transform = "translate(-50%, -50%) scale(0.6)";
              let zIndex = 1;
              let opacity = 0;
              let boxShadow = "none";

              if (offset === 0) {
                transform = "translate(-50%, -50%) scale(1)";
                zIndex = 10;
                opacity = 1;
                boxShadow = "0 28px 56px -12px rgba(20, 20, 15, 0.28), 0 12px 24px -8px rgba(20, 20, 15, 0.16)";
              } else if (offset === 1) {
                transform = "translate(-50%, -50%) translateX(94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 16px 32px rgba(20, 20, 15, 0.13), 0 4px 12px rgba(20, 20, 15, 0.06)";
              } else if (offset === -1) {
                transform = "translate(-50%, -50%) translateX(-94%) scale(0.87)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 16px 32px rgba(20, 20, 15, 0.13), 0 4px 12px rgba(20, 20, 15, 0.06)";
              } else if (offset === 2) {
                transform = "translate(-50%, -50%) translateX(179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 8px 20px rgba(20, 20, 15, 0.08)";
              } else if (offset === -2) {
                transform = "translate(-50%, -50%) translateX(-179.5%) scale(0.73)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 8px 20px rgba(20, 20, 15, 0.08)";
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
                  {/* Card Thumbnail */}
                  <div className="thumb aspect-[4/3] relative overflow-hidden shrink-0 bg-gray-100 rounded-t-[20px]">
                    <Image
                      src={trip.image_url}
                      alt={trip.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    />

                    {/* Coming Soon Pill */}
                    {trip.isComingSoon && (
                      <span className="coming-soon-pill absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-[#14140f] text-[12px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Card Body matching exact reference spacing */}
                  <div className="body p-4 sm:p-[18px] flex flex-col flex-1 min-h-0">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#14140f] leading-snug line-clamp-2 min-h-[42px] m-0">
                      {trip.title}
                    </h3>

                    {/* Duration right under title */}
                    <div
                      className={cn(
                        "meta flex items-center gap-1.5 text-xs font-semibold text-[#6b6b63] mt-2",
                        trip.isComingSoon && "filter blur-[5px] select-none pointer-events-none"
                      )}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {trip.duration_days} Days / {trip.duration_nights} Nights
                      </span>
                    </div>

                    {/* Divider right under duration */}
                    <hr
                      className={cn(
                        "border-t border-[#ecece5] my-2.5",
                        trip.isComingSoon && "filter blur-[5px] select-none pointer-events-none"
                      )}
                    />

                    {/* Price & Action Row pinned to bottom */}
                    <div
                      className={cn(
                        "price-row flex items-center justify-between mt-auto pt-1 pb-0.5",
                        trip.isComingSoon && "filter blur-[5px] select-none pointer-events-none"
                      )}
                    >
                      <div>
                        <span className="price-label text-[11px] font-bold tracking-wider uppercase text-[#6b6b63] block">
                          {trip.isComingSoon ? "Price" : "Starts from"}
                        </span>
                        <span className="price text-[16px] sm:text-[17px] font-extrabold text-[#14140f]">
                          {typeof trip.price === "number" ? formatPrice(trip.price) : trip.price}
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

          {/* Next Arrow Button */}
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
