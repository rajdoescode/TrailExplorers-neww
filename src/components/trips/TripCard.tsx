import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Trip } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface TripCardProps {
  trip: Trip;
  priority?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, priority = false }) => {
  const tripSlug = trip.slug || `${trip.id}`;
  const displayImage = trip.image_url || "/assets/images/home/hero-poster.jpg";

  // Category display tag
  const categoryTag = trip.tags
    ? Array.isArray(trip.tags)
      ? trip.tags[0]
      : trip.tags.split(",")[0].trim()
    : trip.category
    ? trip.category.replace(/_/g, " ").replace(/tours/g, "").trim()
    : "Himalayan Expedition";

  return (
    <article className="group bg-white rounded-[18px] border border-[#e2e2dc] shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Thumbnail Container */}
      <Link
        href={`/trips/${tripSlug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#f6f6f1]"
      >
        <Image
          src={displayImage}
          alt={trip.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-[#d6ff3f] text-[#14140f] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-[#14140f] shadow-xs">
            {categoryTag}
          </span>
        </div>

        {/* Gradient Scrim at bottom of image for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Duration Chip on Image */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-black/75 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-[#d6ff3f]" />
          <span>{trip.duration || "Multi-Day Tour"}</span>
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Route or Pickup */}
          {trip.route && (
            <div className="flex items-center gap-1.5 text-xs text-[#6b6b63] font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#14140f] shrink-0" />
              <span className="truncate">{trip.route}</span>
            </div>
          )}

          {/* Trip Title */}
          <Link href={`/trips/${tripSlug}`}>
            <h3 className="text-[17px] font-bold text-[#14140f] line-clamp-2 leading-snug group-hover:text-[#14140f] group-hover:underline underline-offset-2 transition-colors">
              {trip.title}
            </h3>
          </Link>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#f0f0eb] flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase font-bold text-[#6b6b63] tracking-wider">
              Starting From
            </span>
            <span className="text-lg font-extrabold text-[#14140f]">
              {formatPrice(trip.price)}
            </span>
          </div>

          <Button
            href={`/trips/${tripSlug}`}
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="text-xs font-bold px-4 py-2"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
};
