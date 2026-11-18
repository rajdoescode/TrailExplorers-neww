import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Carousel } from "@/components/common/Carousel";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA } from "@/data/trips";
import { ArrowRight } from "lucide-react";

export const ExperiencesSection: React.FC = () => {
  const experiences = TRIPS_DATA.filter(
    (t) =>
      t.category.toLowerCase().includes("festival") ||
      t.title.toLowerCase().includes("experience") ||
      t.title.toLowerCase().includes("festival") ||
      t.title.toLowerCase().includes("special")
  );

  return (
    <section className="w-full py-12 sm:py-16 bg-[#ffffff]" id="experiences-section">
      <Container>
        <SectionHeading
          eyebrow="IMMERSIVE TRAVEL"
          title="Curated Himalayan Experiences"
          subtitle="Beyond ordinary sightseeing. Step onto frozen alpine rivers, camp under starlit Himalayan skies, and join tribal festival celebrations."
          action={
            <Button
              href="/experiences"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              All Experiences
            </Button>
          }
        />

        <Carousel itemClassName="w-[85%] sm:w-[48%] lg:w-[31.5%]">
          {(experiences.length > 0 ? experiences : TRIPS_DATA.slice(0, 6)).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
