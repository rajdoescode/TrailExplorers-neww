import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { TripCard } from "@/components/trips/TripCard";
import { TRIPS_DATA } from "@/data/trips";
import { Sparkles, Flame, Snowflake, Compass } from "lucide-react";

export default function ExperiencesPage() {
  const experiences = TRIPS_DATA.filter((t) =>
    t.category.toLowerCase().includes("festival") ||
    t.title.toLowerCase().includes("experience") ||
    t.title.toLowerCase().includes("special") ||
    t.title.toLowerCase().includes("snow") ||
    t.title.toLowerCase().includes("carnival")
  );

  return (
    <div className="w-full bg-[#ffffff] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Beyond Sightseeing</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Experiences
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              Step out of ordinary tourist itineraries. Walk through ancient monastic festivals, ride into sub-zero winter kingdoms, sleep on heritage Kashmiri houseboats, and taste authentic mountain culture.
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Highlights Strip */}
      <section className="py-8 bg-[#f6f6f1] border-b border-[#e2e2dc]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#e2e2dc]">
              <div className="w-12 h-12 rounded-xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center shrink-0">
                <Snowflake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#14140f]">Winter &amp; Snow Trails</h4>
                <p className="text-xs text-[#6b6b63]">Sub-zero 4x4 trails, frozen rivers, and snow leopards.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#e2e2dc]">
              <div className="w-12 h-12 rounded-xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#14140f]">Cultural Festivals</h4>
                <p className="text-xs text-[#6b6b63]">Kullu Dussehra, Manali Carnival, and Ziro Valley.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#e2e2dc]">
              <div className="w-12 h-12 rounded-xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#14140f]">Offbeat Expeditions</h4>
                <p className="text-xs text-[#6b6b63]">Secret valley homestays away from crowds.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid of Experiences */}
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(experiences.length > 0 ? experiences : TRIPS_DATA.slice(0, 9)).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </Container>
    </div>
  );
}
