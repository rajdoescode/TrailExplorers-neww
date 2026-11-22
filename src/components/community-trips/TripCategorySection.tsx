"use client";

import React from "react";
import { CommunityTrip } from "@/data/communityTrips";
import { CommunityTripCard } from "./CommunityTripCard";
import { SectionHeader } from "@/components/common/SectionHeader";

interface TripCategorySectionProps {
  id: string;
  title: string;
  trips: CommunityTrip[];
  viewAllHref?: string;
  onViewAllClick?: () => void;
}

export const TripCategorySection: React.FC<TripCategorySectionProps> = ({
  id,
  title,
  trips,
  viewAllHref,
  onViewAllClick,
}) => {
  if (trips.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-10 last:mb-0 scroll-mt-24" id={id}>
      <SectionHeader
        title={title}
        viewAllText="View All Trips"
        viewAllHref={viewAllHref}
        onViewAllClick={onViewAllClick}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {trips.map((trip, idx) => (
          <CommunityTripCard key={`${trip.id}-${idx}`} trip={trip} />
        ))}
      </div>
    </section>
  );
};
