import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Carousel } from "@/components/common/Carousel";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA } from "@/data/trips";
import { ArrowRight } from "lucide-react";

export const CommunityTripsSection: React.FC = () => {
  // Select top community trips (e.g. Spiti, Zanskar, Manali, Udaipur, Kasol)
  const communityTrips = TRIPS_DATA.filter((t) =>
    t.category.toLowerCase().includes("himachal") ||
    t.category.toLowerCase().includes("spiti") ||
    t.category.toLowerCase().includes("ladakh") ||
    t.is_featured_reels ||
    t.is_featured_stack
  ).slice(0, 8);

  return (
    <section className="w-full py-12 sm:py-16 bg-[#ffffff]">
      <Container>
        <SectionHeading
          eyebrow="COMMUNITY TRIPS"
          title="Curated Small-Group Expeditions"
          subtitle="Travel with an intimate circle of wanderers. Certified mountain leaders, homestays, campfires, and raw roads."
          action={
            <Button
              href="/community-trips"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Trips
            </Button>
          }
        />

        <Carousel itemClassName="w-[85%] sm:w-[48%] lg:w-[31.5%]">
          {communityTrips.map((trip, idx) => (
            <TripCard key={trip.id} trip={trip} priority={idx < 3} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
