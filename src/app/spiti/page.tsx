import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA } from "@/data/trips";
import { Mountain, Compass } from "lucide-react";

export default function SpitiPage() {
  const spitiTrips = TRIPS_DATA.filter((t) =>
    t.category.toLowerCase().includes("spiti") ||
    t.title.toLowerCase().includes("spiti")
  );

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      <section className="relative min-h-[460px] bg-[#14140f] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/trips/trip_103_image_url.jpg"
          alt="Spiti Valley Tour Packages"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14140f] via-black/40 to-black/60" />

        <Container className="relative z-10 py-16 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full mb-4">
            <Mountain className="w-3.5 h-3.5" />
            <span>The Middle Land</span>
          </span>
          <Heading level={1} className="text-white text-4xl sm:text-5xl font-extrabold mb-4">
            Spiti Valley Tour Packages
          </Heading>
          <Paragraph className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            Thousand-year-old cliffside monasteries, lunar fossil landscapes, the world&apos;s highest post office at Hikkim, and sacred crescent waters of Chandratal.
          </Paragraph>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="#trips" variant="primary">
              View Spiti Trips
            </Button>
            <Button href="/winter-spiti" variant="hero-ghost">
              Winter Spiti 4x4
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
              <strong className="text-xl font-extrabold text-[#14140f]">12,500 – 15,000 ft</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block">Best Season</span>
              <strong className="text-xl font-extrabold text-[#14140f]">Summer &amp; Winter</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block">Key Monasteries</span>
              <strong className="text-xl font-extrabold text-[#14140f]">Key, Tabo, Dhankar</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-[#6b6b63] uppercase tracking-wider block">Starting Points</span>
              <strong className="text-xl font-extrabold text-[#14140f]">Delhi &amp; Manali</strong>
            </div>
          </div>
        </Container>
      </section>

      {/* Trips Grid */}
      <Container className="py-14" id="trips">
        <div className="mb-8">
          <Heading level={2} className="text-2xl sm:text-3xl font-extrabold">
            Featured Spiti Valley Circuits
          </Heading>
          <p className="text-sm text-[#6b6b63] mt-1">
            Full summer circuits via Shimla–Kaza–Manali and dedicated sub-zero winter 4x4 expeditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spitiTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </Container>
    </div>
  );
}
