import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/trips/TripCard";
import { TRIPS_DATA } from "@/data/trips";
import { Snowflake, ShieldCheck, ThermometerSnowflake, Car, CheckCircle, ArrowRight } from "lucide-react";

export default function WinterSpitiPage() {
  const winterTrips = TRIPS_DATA.filter((t) =>
    t.title.toLowerCase().includes("winter") ||
    t.title.toLowerCase().includes("spiti")
  ).slice(0, 4);

  return (
    <div className="w-full bg-[#ffffff] min-h-screen pb-20">
      {/* High-Impact Snowy Hero */}
      <section className="relative min-h-[500px] sm:min-h-[580px] bg-[#14140f] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/trips/trip_103_image_url.jpg"
          alt="Winter Spiti Expedition"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14140f] via-black/40 to-black/60" />

        <Container className="relative z-10 py-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#d6ff3f] text-[#14140f] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-glow">
            <Snowflake className="w-4 h-4 animate-spin" />
            <span>SEASON 2026–2027 NOW OPEN</span>
          </div>

          <Heading level={1} className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Winter Spiti Expedition
          </Heading>

          <Paragraph className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Experience the Middle Land blanketed in pure white snow. Sub-zero temperatures, frozen waterfalls, heated 4x4 vehicles, and warm traditional homestays with local tandoors.
          </Paragraph>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="#departures" variant="primary" size="lg" className="shadow-lime-btn font-extrabold px-8">
              Explore 9-Day Expedition
            </Button>
            <Button href="/plan-your-trip" variant="hero-ghost" size="lg">
              Custom 4x4 Private Tour
            </Button>
          </div>
        </Container>
      </section>

      {/* Month-by-Month Guide */}
      <section className="py-16 bg-[#f6f6f1] border-b border-[#e2e2dc]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3.5 py-1 rounded-full">
              Season Breakdown
            </span>
            <Heading level={2} className="text-2xl sm:text-3xl font-extrabold mt-3">
              Spiti in Winter, Month by Month
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                month: "December",
                title: "First Snow, Clear Skies",
                temp: "-10°C to -15°C",
                desc: "Fresh powdery snow blankets the valleys. Clear starry skies, minimal crowd, and crisp high-altitude air.",
              },
              {
                month: "January",
                title: "Deep Winter & Frozen Rivers",
                temp: "-20°C to -25°C",
                desc: "Pin Valley freezes into crystalline ice. Snow leopard sightings increase in Kibber Wildlife Sanctuary.",
              },
              {
                month: "February",
                title: "Ice Caves & Starlit Nights",
                temp: "-15°C to -20°C",
                desc: "Frozen waterfalls turn into majestic ice walls. Traditional local Losar festival celebrations in high monasteries.",
              },
              {
                month: "March",
                title: "Golden Glaciers & Thaw",
                temp: "-5°C to -12°C",
                desc: "Longer daylight hours, intense mountain sun reflecting off snowfields, and active alpine wildlife.",
              },
            ].map((m, idx) => (
              <div key={idx} className="bg-white rounded-[18px] p-6 border border-[#e2e2dc] shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-extrabold text-[#14140f] bg-[#f0f0eb] px-3 py-1 rounded-md">
                      {m.month}
                    </span>
                    <span className="text-xs font-bold text-[#e0455a] flex items-center gap-1">
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                      {m.temp}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#14140f] mb-2">{m.title}</h3>
                  <p className="text-xs text-[#6b6b63] leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4x4 Fleet & Safety Standard */}
      <section className="py-16 bg-[#ffffff]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full w-fit">
                Zero Compromise Safety
              </span>
              <Heading level={2} className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Heated 4x4 Expeditions with Veteran Snow Pilots
              </Heading>
              <Paragraph className="text-sm sm:text-base text-[#6b6b63] leading-relaxed">
                Winter in Spiti requires specialized all-wheel-drive machinery and drivers born in the high cold desert. Every Awara Banjara winter convoy is backed by comprehensive safety protocols.
              </Paragraph>

              <div className="flex flex-col gap-3 pt-2">
                {[
                  "Specially modified 4WD vehicles (Force Urbania & 4x4 Bolero / Scorpio)",
                  "Tire chains & sub-zero antifreeze lubricants equipped on all vehicles",
                  "Portable medical grade oxygen cylinders for high altitude pass crossings",
                  "Cozy heated homestays with Bukhari wood fire tandoors & traditional butter tea",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-[#14140f]">
                    <CheckCircle className="w-4 h-4 text-[#2fa84f] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#14140f] shadow-card">
              <Image
                src="/assets/images/trips/trip_104_image_url.jpg"
                alt="Spiti Winter Snow Vehicle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Departures Grid */}
      <section className="py-16 bg-[#f6f6f1]" id="departures">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Heading level={2} className="text-2xl sm:text-3xl font-extrabold">
              Featured Winter Spiti Departures
            </Heading>
            <p className="text-sm text-[#6b6b63] mt-2">
              Limited seats per batch to preserve authentic experience and safety on snow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {winterTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
