import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA } from "@/data/trips";
import { Mountain, Compass, Calendar, CheckCircle } from "lucide-react";

export default function LadakhPage() {
  const ladakhTrips = TRIPS_DATA.filter((t) =>
    t.category.toLowerCase().includes("ladakh") ||
    t.title.toLowerCase().includes("ladakh") ||
    t.title.toLowerCase().includes("zanskar")
  );

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      <section className="relative min-h-[460px] bg-[#14140f] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/trips/trip_100_image_url.jpg"
          alt="Ladakh Tour Packages"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14140f] via-black/40 to-black/60" />

        <Container className="relative z-10 py-16 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
            <Mountain className="w-3.5 h-3.5" />
            <span>Land of High Passes</span>
          </span>
          <Heading level={1} className="text-white text-4xl sm:text-5xl font-extrabold mb-4">
            Ladakh &amp; Zanskar Tour Packages
          </Heading>
          <Paragraph className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            From the turquoise waters of Pangong Tso and Tso Moriri to the towering monolithic monolith of Gonbo Rangjon in remote Zanskar.
          </Paragraph>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="#trips" variant="primary">
              View All Ladakh Expeditions
            </Button>
            <Button href="/plan-your-trip" variant="hero-ghost">
              Customize Private Tour
            </Button>
          </div>
        </Container>
      </section>

      {/* Region Fast Facts */}
      <section className="py-8 bg-white border-b border-[#e2e2dc]">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block">Avg Altitude</span>
              <strong className="text-xl font-extrabold text-[#14140f]">11,500 – 17,500 ft</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block">Best Season</span>
              <strong className="text-xl font-extrabold text-[#14140f]">May – October</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block">High Passes</span>
              <strong className="text-xl font-extrabold text-[#14140f]">Khardung La, Umling La</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block">Permits Included</span>
              <strong className="text-xl font-extrabold text-[#14140f]">100% Arranged</strong>
            </div>
          </div>
        </Container>
      </section>

      {/* Trips Grid */}
      <Container className="py-14" id="trips">
        <div className="mb-8">
          <Heading level={2} className="text-2xl sm:text-3xl font-extrabold">
            Featured Ladakh &amp; Zanskar Departures
          </Heading>
          <p className="text-sm text-[#6b6b63] mt-1">
            Carefully paced itineraries built to maximize safety, oxygen acclimatization, and scenic exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ladakhTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </Container>
    </div>
  );
}
