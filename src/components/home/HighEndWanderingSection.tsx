import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Carousel } from "@/components/common/Carousel";
import { TripCard } from "@/components/trips/TripCard";
import { TRIPS_DATA } from "@/data/trips";

export const HighEndWanderingSection: React.FC = () => {
  // Trips featured under the lemonade budget collection
  const budgetTrips = TRIPS_DATA.filter((t) =>
    t.is_featured_lemonade ||
    t.title.toLowerCase().includes("escape") ||
    t.title.toLowerCase().includes("weekend") ||
    t.title.toLowerCase().includes("trek")
  ).slice(0, 8);

  return (
    <section className="w-full py-12 sm:py-16 bg-[#f6f6f1]">
      <Container>
        <SectionHeading
          eyebrow="BEST VALUE ADVENTURES"
          title="High-End Wandering on a Lemonade Budget"
          subtitle="You do not need deep pockets to explore pristine high passes. Handpicked boutique homestays, verified vehicles, and transparent pricing."
        />

        <Carousel itemClassName="w-[85%] sm:w-[48%] lg:w-[31.5%]">
          {budgetTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
