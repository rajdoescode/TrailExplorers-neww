import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA } from "@/data/trips";
import { Mountain } from "lucide-react";

export default function HimachalPage() {
  const himachalTrips = TRIPS_DATA.filter((t) =>
    t.category.toLowerCase().includes("himachal") ||
    t.title.toLowerCase().includes("himachal") ||
    t.title.toLowerCase().includes("manali") ||
    t.title.toLowerCase().includes("kasol") ||
    t.title.toLowerCase().includes("bir")
  );

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      <section className="relative min-h-[460px] bg-[#14140f] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/destinations/domestic/himachal.jpg"
          alt="Himachal Tour Packages"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14140f] via-black/40 to-black/60" />

        <Container className="relative z-10 py-16 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
            <Mountain className="w-3.5 h-3.5" />
            <span>Land of Gods</span>
          </span>
          <Heading level={1} className="text-white text-4xl sm:text-5xl font-extrabold mb-4">
            Himachal Tour Packages
          </Heading>
          <Paragraph className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            Pristine deodar pine forests, emerald apple orchards of Shanghar, paragliding over Bir Billing, and offbeat river homestays in Tirthan.
          </Paragraph>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="#trips" variant="primary">
              View Himachal Trips
            </Button>
            <Button href="/plan-your-trip" variant="hero-ghost">
              Build Custom Getaway
            </Button>
          </div>
        </Container>
      </section>

      {/* Trips Grid */}
      <Container className="py-14" id="trips">
        <div className="mb-8">
          <Heading level={2} className="text-2xl sm:text-3xl font-extrabold">
            Featured Himachal Departures &amp; Treks
          </Heading>
          <p className="text-sm text-[#6b6b63] mt-1">
            Short weekend getaways, paragliding escapes, and deep offbeat valley retreats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {himachalTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </Container>
    </div>
  );
}
