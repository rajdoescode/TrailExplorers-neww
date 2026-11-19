"use client";

import React from "react";
import { CommunityTrip } from "@/data/communityTrips";
import { CommunityTripCard } from "./CommunityTripCard";

interface TripCategorySectionProps {
  id: string;
  title: string;
  trips: CommunityTrip[];
}

export const TripCategorySection: React.FC<TripCategorySectionProps> = ({
  id,
  title,
  trips,
}) => {
  if (trips.length === 0) return null;

  return (
    <section className="category-section" id={id}>
      <h2 className="category-title">{title}</h2>
      <div className="packages-grid">
        {trips.map((trip, idx) => (
          <CommunityTripCard key={`${trip.id}-${idx}`} trip={trip} />
        ))}
      </div>
    </section>
  );
};
