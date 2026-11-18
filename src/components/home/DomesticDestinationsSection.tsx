import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { DESTINATIONS_DATA } from "@/data/destinations";

export const DomesticDestinationsSection: React.FC = () => {
  const domesticDests = DESTINATIONS_DATA.filter((d) => d.category === "domestic");

  return (
    <section className="w-full py-12 sm:py-16 bg-[#ffffff]" id="domestic-dest-section">
      <Container>
        <SectionHeading
          eyebrow="EXPLORE INDIA"
          title="Domestic Destinations"
          subtitle="From high Himalayan peaks and royal desert forts to tranquil backwaters and ancient river ghats."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {domesticDests.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </Container>
    </section>
  );
};
