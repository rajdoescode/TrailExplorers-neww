import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { DESTINATIONS_DATA } from "@/data/destinations";

export const InternationalDestinationsSection: React.FC = () => {
  const intlDests = DESTINATIONS_DATA.filter((d) => d.category === "international");

  return (
    <section className="w-full py-12 sm:py-16 bg-[#ffffff]" id="intl-dest-section">
      <Container>
        <SectionHeading
          eyebrow="BEYOND BORDERS"
          title="International Destinations"
          subtitle="Curated global expeditions with the signature Awara Banjara small-group camaraderie."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {intlDests.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </Container>
    </section>
  );
};
