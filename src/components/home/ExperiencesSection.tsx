"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { cn } from "@/lib/utils";

export const ExperiencesSection: React.FC = () => {
  const experiences = [
    {
      id: "exp-1",
      title: "6 Days Kashmir Snow Experience: Gulmarg Gondola & Houseboat Stay",
      price: "On Request",
      href: "/trips/kashmir-tours-6-days-kashmir-snow-experience-gulmarg-gondola-houseboat-stay-1786216631459",
      image_url: "/assets/images/trips/img_1786216504243_img_1786216398063_Gulmarg__A_delight_for_travelers_on_a_wanderlust_.jpg",
    },
    {
      id: "exp-2",
      title: "Kullu Dussehra Special: Cultural Expedition & Manali Escape",
      price: "₹10,500",
      href: "/trips/himachal-tours-kullu-dussehra-special-cultural-expedition-manali-escape-1790364151734",
      image_url: "/assets/images/trips/img_1791097768369_Kullu-Dussehra-2025__1_.webp",
    },
    {
      id: "exp-3",
      title: "Offbeat Himachal: Manali, Kasol, Shanghar & Jibhi (7 Days)",
      price: "₹14,999",
      href: "/trips/offbeat-himachal-group-tour-manali-kasol-shanghar-jibhi-7-days-1793037184499",
      image_url: "/assets/images/trips/img_1793032123059_Shangarh.jpg",
    },
    {
      id: "exp-4",
      title: "Spiti Full Summer Circuit & Chandratal Lake Camping",
      price: "₹19,499",
      href: "/trips/spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930",
      image_url: "/assets/images/trips/trip_106_image_url.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const activeExp = experiences[activeIndex];

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden" id="experiences-section">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Head */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0">
            Experiences
          </h2>
          <p className="text-base text-[#6b6b63] mt-2 font-medium">
            Trips built around a moment, not a map.
          </p>
          <Link
            href="/experiences"
            className="inline-block mt-2 text-sm font-bold text-[#14140f] hover:underline underline-offset-4"
          >
            See all experiences →
          </Link>
        </div>

        {/* Featured Banner with Interactive Flip Stack */}
        <div className="text-center py-6 sm:py-8 overflow-visible">
          {/* Card Stack Deck */}
          <div
            onClick={nextCard}
            role="button"
            tabIndex={0}
            aria-label="Show next experience (tap to flip)"
            className="card-stack relative w-[min(680px,88vw)] aspect-[1.5/1] sm:aspect-[1.55/1] mx-auto cursor-pointer select-none active:scale-[0.98] transition-transform"
          >
            {experiences.map((exp, idx) => {
              let pos = (idx - activeIndex + experiences.length) % experiences.length;

              let transform = "translateY(0) scale(1) rotate(0deg)";
              let zIndex = 1;
              let opacity = 0.5;

              if (pos === 0) {
                transform = "translateY(0) scale(1) rotate(0deg)";
                zIndex = 10;
                opacity = 1;
              } else if (pos === 1) {
                transform = "translateY(-8px) sm:translateY(-14px) translateX(14px) sm:translateX(28px) rotate(4deg) sm:rotate(6deg) scale(0.96)";
                zIndex = 8;
                opacity = 0.95;
              } else if (pos === 2) {
                transform = "translateY(-6px) sm:translateY(-10px) translateX(-16px) sm:translateX(-32px) rotate(-4deg) sm:rotate(-7deg) scale(0.92)";
                zIndex = 6;
                opacity = 0.9;
              } else if (pos === 3) {
                transform = "translateY(8px) sm:translateY(12px) translateX(6px) sm:translateX(8px) rotate(6deg) sm:rotate(11deg) scale(0.85)";
                zIndex = 4;
                opacity = 0.6;
              }

              return (
                <div
                  key={exp.id}
                  className="card-stack-item absolute inset-0 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_14px_38px_rgba(20,20,15,0.18)] transition-all duration-450 ease-[cubic-bezier(0.25,1,0.5,1)] bg-[#f6f6f1]"
                  style={{ transform, zIndex, opacity }}
                  data-pos={pos}
                >
                  <SkeletonImage
                    src={exp.image_url}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 88vw, 680px"
                    className="w-full h-full object-cover rounded-[20px] sm:rounded-[24px]"
                    skeletonClassName="rounded-[20px] sm:rounded-[24px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Indicator dots */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {experiences.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Show experience ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer p-0 border-0",
                  i === activeIndex ? "w-6 bg-[#14140f]" : "w-1.5 bg-[#d4d4cb]"
                )}
              />
            ))}
          </div>

          {/* Caption Below Stack */}
          <div className="mt-8 max-w-xl mx-auto px-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#14140f] leading-tight">
              {activeExp.title}
            </h3>
            <p className="text-[#6b6b63] mt-1.5 text-sm font-semibold">
              <strong className="text-base text-[#14140f]">{activeExp.price}</strong>
            </p>
            <div className="mt-4">
              <Link
                href={activeExp.href}
                className="inline-flex items-center px-8 py-2.5 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-sm transition-all shadow-sm hover:scale-105"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
