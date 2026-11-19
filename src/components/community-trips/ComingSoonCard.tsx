"use client";

import React from "react";
import { CommunityTrip } from "@/data/communityTrips";
import { Button } from "@/components/ui/Button";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

interface ComingSoonCardProps {
  trip: CommunityTrip;
}

export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({ trip }) => {
  return (
    <article className="community-card is-coming-soon">
      <div className="thumb relative overflow-hidden">
        <SkeletonImage
          src={trip.image}
          alt={trip.title || "Coming Soon"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-full"
        />
        <span className="coming-soon-pill">
          <svg
            width="14"
            height="14"
            style={{ width: "14px", height: "14px" }}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          Coming Soon
        </span>
      </div>
      <div className="body">
        <h3>{trip.title}</h3>
        <div className="coming-soon-blur" aria-hidden="true">
          <div className="meta">
            <svg
              width="14"
              height="14"
              style={{ width: "14px", height: "14px" }}
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
              <span className="price-label">Price</span>
              <span className="price">On Request</span>
            </span>
            <Button
              variant="dark"
              size="sm"
              disabled
              className="text-xs font-bold px-[18px] py-2 rounded-full bg-[#14140f] text-white border-2 border-[#14140f] pointer-events-none"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
