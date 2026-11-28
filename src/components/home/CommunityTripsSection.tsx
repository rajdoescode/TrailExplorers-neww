"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const CommunityTripsSection: React.FC = () => {
  // Ordered trips matching the reference screenshots exactly
  const trips = [
    {
      id: "trip-carnival",
      title: "Carnival Collective: Manali Winter Carnival Special",
      slug: "carnival-collective-manali-winter-carnival-special-1790406745365",
      image_url: "/assets/images/trips/img_1790406721853_Himachal_Winter_Carnival_2025___Adventure__Culture_and_Celebration_of_Snow.jpg",
      duration_days: 6,
      duration_nights: 5,
      price: "On Request",
      isComingSoon: true,
    },
    {
      id: "trip-spiti-4x4",
      title: "Spiti: Winter 4X4 Expedition",
      slug: "spiti-tours-spiti-winter-4x4-expedition-103",
      image_url: "/assets/images/trips/trip_103_image_url.jpg",
      duration_days: 9,
      duration_nights: 8,
      price: 25499,
      isComingSoon: false,
    },
    {
      id: "trip-naggar",
      title: "Naggar, Baralacha La & Bijli Mahadev Community Trip",
      slug: "himachal-tours-naggar-baralacha-la-bijli-mahadev-community-trip-ex-delhi-1793300342070",
      image_url: "/assets/images/trips/img_1793340766352____17_.jpg",
      duration_days: 5,
      duration_nights: 4,
      price: 8499,
      isComingSoon: false,
    },
    {
      id: "trip-kasol",
      title: "Kasol & Manali: Offbeat Himalayan Escape",
      slug: "himachal-tours-kasol-manali-offbeat-himalayan-escape-108",
      image_url: "/assets/images/trips/trip_108_image_url.jpg",
      duration_days: 6,
      duration_nights: 5,
      price: 6999,
      isComingSoon: false,
    },
    {
      id: "trip-spiti-valley",
      title: "Spiti Valley Group Trip from Delhi: Winter Expedition (9 Days)",
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
    <section className="w-full py-10 sm:py-14 bg-transparent overflow-hidden" aria-label="Community Trips">
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
        <div className="relative flex items-center justify-center w-full max-w-[1360px] mx-auto px-2 sm:px-4">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={prevTrip}
            aria-label="Previous trip"
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer mr-2 lg:mr-3"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 3D Stage Area */}
          <div
            className="carousel-stage relative flex-1 h-[450px] overflow-hidden"
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

              // Style transforms based on offset with natural elevation shadows & balanced spacing
              let transform = "translate(-50%, -50%) scale(0.6)";
              let zIndex = 1;
              let opacity = 0;
              let boxShadow = "none";

              if (offset === 0) {
                transform = "translate(-50%, -50%) scale(1)";
                zIndex = 10;
                opacity = 1;
                boxShadow = "0 20px 42px -4px rgba(20, 20, 15, 0.20), 0 8px 18px rgba(20, 20, 15, 0.08)";
              } else if (offset === 1) {
                transform = "translate(-50%, -50%) translateX(105%) scale(0.88)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 10px 24px -4px rgba(20, 20, 15, 0.12), 0 4px 10px rgba(20, 20, 15, 0.06)";
              } else if (offset === -1) {
                transform = "translate(-50%, -50%) translateX(-105%) scale(0.88)";
                zIndex = 8;
                opacity = 1;
                boxShadow = "0 10px 24px -4px rgba(20, 20, 15, 0.12), 0 4px 10px rgba(20, 20, 15, 0.06)";
              } else if (offset === 2) {
                transform = "translate(-50%, -50%) translateX(196%) scale(0.74)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 6px 14px rgba(20, 20, 15, 0.08)";
              } else if (offset === -2) {
                transform = "translate(-50%, -50%) translateX(-196%) scale(0.74)";
                zIndex = 6;
                opacity = 0.92;
                boxShadow = "0 6px 14px rgba(20, 20, 15, 0.08)";
              }

              return (
                <article
                  key={trip.id}
                  onClick={() => !isCenter && setActiveIndex(idx)}
                  className={cn(
                    "trip-card absolute left-1/2 top-1/2 w-[clamp(215px,20vw,248px)] h-[376px] bg-white/80 backdrop-blur-md rounded-[18px] border border-white/80 shadow-[0_8px_30px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] hover:bg-white/95 overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,0.85,0.32,1)] group",
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
                  <div className="thumb aspect-[4/3] relative w-full overflow-hidden shrink-0 bg-[#f4f4ee] rounded-t-[17px]">
                    <Link
                      href={isCenter && !trip.isComingSoon ? `/trips/${trip.slug}` : "#"}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          setActiveIndex(idx);
                        }
                      }}
                      className="relative block w-full h-full"
                      tabIndex={isCenter ? 0 : -1}
                    >
                      <SkeletonImage
                        src={trip.image_url}
                        alt={trip.title}
                        fill
                        sizes="(max-width: 768px) 60vw, 250px"
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-400 group-hover:scale-105",
                          trip.isComingSoon && "filter blur-[8px] scale-110 saturate-[0.85]"
                        )}
                        skeletonClassName="rounded-t-[17px]"
                      />
                    </Link>

                    {/* Coming Soon Pill */}
                    {trip.isComingSoon && (
                      <span className="coming-soon-pill absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-[#14140f] text-[11px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap z-10 pointer-events-none backdrop-blur-xs">
                        <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Card Body matching exact reference spacing */}
                  <div className="body p-4 sm:p-[18px] flex flex-col flex-1 justify-between min-h-0">
                    <div className="flex flex-col">
                      <h3 className="text-[15px] sm:text-[16px] font-bold text-[#14140f] leading-snug line-clamp-2 min-h-[42px] m-0">
                        <Link
                          href={isCenter && !trip.isComingSoon ? `/trips/${trip.slug}` : "#"}
                          onClick={(e) => {
                            if (!isCenter) {
                              e.preventDefault();
                              setActiveIndex(idx);
                            }
                          }}
                          className="text-inherit hover:underline decoration-1 underline-offset-2"
                          tabIndex={isCenter ? 0 : -1}
                        >
                          {trip.title}
                        </Link>
                      </h3>

                      {/* Duration right under title */}
                      <div
                        className={cn(
                          "meta flex items-center gap-1.5 text-xs font-semibold text-[#6b6b63] mt-2",
                          trip.isComingSoon && "filter blur-[4px] select-none pointer-events-none"
                        )}
                      >
                        <Clock className="w-3.5 h-3.5 text-[#6b6b63] shrink-0" />
                        <span>
                          {trip.duration_days} Days / {trip.duration_nights} Nights
                        </span>
                      </div>
                    </div>

                    {/* Divider right above price row */}
                    <hr
                      className={cn(
                        "border-0 border-t border-[#ecece5] my-2",
                        trip.isComingSoon && "filter blur-[4px] select-none pointer-events-none"
                      )}
                    />

                    {/* Price & Action Row pinned to bottom */}
                    <div
                      className={cn(
                        "price-row flex items-center justify-between gap-2 pt-0.5",
                        trip.isComingSoon && "filter blur-[4px] select-none pointer-events-none"
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="price-label text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#6b6b63] block">
                          {trip.isComingSoon ? "Price" : "Starts from"}
                        </span>
                        <span className="price text-[16px] sm:text-[17px] font-extrabold text-[#14140f] font-heading leading-tight mt-0.5">
                          {typeof trip.price === "number" ? formatPrice(trip.price) : trip.price}
                        </span>
                      </div>

                      <Link
                        href={trip.isComingSoon ? "#" : `/trips/${trip.slug}`}
                        onClick={(e) => {
                          if (!isCenter) {
                            e.preventDefault();
                            setActiveIndex(idx);
                          }
                        }}
                        className={cn(
                          "btn btn-dark text-xs font-bold px-4 py-2 rounded-full transition-all shrink-0 cursor-pointer shadow-xs",
                          trip.isComingSoon
                            ? "bg-[#14140f]/50 text-white cursor-not-allowed pointer-events-none"
                            : "bg-[#14140f] text-white hover:bg-black active:scale-95 hover:shadow-sm hover:-translate-y-0.5"
                        )}
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
            className="carousel-arrow z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14140f] text-white hidden md:flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(20,20,15,0.22)] hover:scale-110 active:scale-95 transition-all cursor-pointer ml-2 lg:mr-0 lg:ml-3"
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
