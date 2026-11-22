"use client";

import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { CommunityTrip } from "@/data/communityTrips";
import { ComingSoonCard } from "./ComingSoonCard";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

interface CommunityTripCardProps {
  trip: CommunityTrip;
  priority?: boolean;
}

export const CommunityTripCard: React.FC<CommunityTripCardProps> = ({
  trip,
  priority = false,
}) => {
  if (trip.isComingSoon) {
    return <ComingSoonCard trip={trip} />;
  }

  const isEnquiry =
    trip.price === null ||
    trip.priceDisplay.toLowerCase().includes("request") ||
    (trip.priceLabel ? trip.priceLabel.toLowerCase().includes("price") : false);

  return (
    <article className="group bg-white/75 backdrop-blur-md rounded-[20px] border border-white/80 hover:border-white shadow-[0_8px_30px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_18px_40px_rgba(20,20,15,0.12),0_1px_1px_rgba(255,255,255,1)_inset] hover:bg-white/90 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="aspect-[4/3] relative w-full overflow-hidden bg-[#f4f4ee]/70">
        <Link href={trip.detailUrl} className="relative block w-full h-full">
          <SkeletonImage
            src={trip.image}
            alt={trip.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-400 ease-out"
          />
        </Link>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Trip Title */}
          <h3 className="text-[16px] sm:text-[17px] font-bold text-[#14140f] line-clamp-2 leading-[1.3] font-heading min-h-[44px]">
            <Link
              href={trip.detailUrl}
              className="text-inherit hover:underline decoration-1 underline-offset-2"
            >
              {trip.title}
            </Link>
          </h3>

          {/* Duration */}
          <div className="flex items-center gap-1.5 text-[#66665c] text-[13px] font-medium mt-2">
            <Clock className="w-3.5 h-3.5 text-[#66665c] shrink-0" strokeWidth={1.8} />
            <span>{trip.duration}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-0 border-t border-[#ecece5] my-0.5" />

        {/* Price & CTA Row */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-0.5">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a7a72] leading-tight truncate">
              {isEnquiry ? "PRICE" : "STARTS FROM"}
            </span>
            <span className="text-[17px] sm:text-[18px] font-extrabold text-[#14140f] leading-tight mt-0.5 font-heading">
              {isEnquiry ? "On Request" : trip.priceDisplay}
            </span>
          </div>

          <Link
            href={trip.detailUrl}
            className="inline-flex items-center justify-center bg-[#14140f] hover:bg-black text-white text-[13px] font-bold px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-xs hover:-translate-y-0.5 hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
};
