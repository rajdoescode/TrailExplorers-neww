"use client";

import React from "react";
import Link from "next/link";
import { CommunityTrip } from "@/data/communityTrips";
import { Button } from "@/components/ui/Button";
import { ComingSoonCard } from "./ComingSoonCard";

interface CommunityTripCardProps {
  trip: CommunityTrip;
}

export const CommunityTripCard: React.FC<CommunityTripCardProps> = ({ trip }) => {
  if (trip.isComingSoon) {
    return <ComingSoonCard trip={trip} />;
  }

  return (
    <article className="community-card">
      <div className="thumb">
        <Link href={trip.detailUrl}>
          <img
            src={trip.image}
            alt={trip.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/home/hero-poster.jpg";
            }}
          />
        </Link>
      </div>
      <div className="body">
        <h3>
          <Link
            href={trip.detailUrl}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {trip.title}
          </Link>
        </h3>
        <div className="meta">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>{trip.duration}</span>
        </div>
        <hr />
        <div className="price-row">
          <span>
            <span className="price-label">{trip.priceLabel || "Starts from"}</span>
            <span className="price">{trip.priceDisplay}</span>
          </span>
          <Button
            href={trip.detailUrl}
            variant="dark"
            size="sm"
            className="text-xs font-bold px-[18px] py-2 rounded-full bg-[#14140f] text-white hover:bg-black border-2 border-[#14140f] shadow-xs"
          >
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
};
