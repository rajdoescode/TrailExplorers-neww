import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Compass, Flame, Heart, Quote } from "lucide-react";

export default function FounderPage() {
  return (
    <div className="w-full bg-[#ffffff] min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-[#14140f] text-white py-16 sm:py-24 border-b border-white/10">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Founder&apos;s Journal</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Beyond Maps &amp; Boundaries, in Search of Our Tribe
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg italic">
              By Viru Thakur — Mountaineer, Wanderer &amp; Founder
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Main Narrative & Portrait */}
      <section className="py-16 bg-[#ffffff]">
        <Container size="narrow">
          <div className="flex flex-col md:flex-row gap-10 items-start mb-12">
            <div className="relative w-full md:w-72 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#14140f] shadow-card shrink-0 mx-auto">
              <Image
                src="/assets/images/about/founder-viru.jpg"
                alt="Viru Thakur - Founder of Awara Banjara"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 text-[#14140f]">
              <div className="flex items-center gap-2 text-[#d6ff3f] bg-[#14140f] px-4 py-2 rounded-xl w-fit">
                <Quote className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider">A Word From Viru</span>
              </div>
              <Heading level={2} className="text-2xl sm:text-3xl font-extrabold">
                Born from Mountain Soil
              </Heading>
              <p className="text-base text-[#6b6b63] leading-relaxed">
                I was born in the lap of Himachal Pradesh. Long before Instagram algorithms told people where to travel, the mountains taught me that true wealth is not in corporate ladders, but in cold morning winds, sharing dry roti around a shepherd fire, and watching the sun set over a silent pass at 15,000 feet.
              </p>
              <p className="text-base text-[#6b6b63] leading-relaxed">
                When I started traveling across Ladakh, Spiti, and Kashmir with young backpackers, I noticed everyone was hungry for something that cities could never provide: raw brotherhood, honesty, and the freedom to be totally themselves without masks.
              </p>
            </div>
          </div>

          <div className="border-t border-[#f0f0eb] pt-10 flex flex-col gap-8">
            <div>
              <Heading level={3} className="text-2xl font-bold mb-3">
                So… Why &ldquo;Awara Banjara&rdquo;?
              </Heading>
              <p className="text-base text-[#6b6b63] leading-relaxed">
                &ldquo;Awara&rdquo; means the one who wanders without a rigid itinerary; &ldquo;Banjara&rdquo; is the nomadic spirit who makes wherever they pitch their tent feel like home. We took two words often misunderstood in conventional society and turned them into our badge of honor. To be an Awara Banjara is to care more about the journey than the vanity of the destination.
              </p>
            </div>

            <div className="bg-[#f6f6f1] p-8 rounded-2xl border border-[#e2e2dc] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#14140f] font-bold">
                <Flame className="w-5 h-5 text-[#e0455a]" />
                <span className="text-lg">Campfire Culture Over Corporate Tourism</span>
              </div>
              <p className="text-sm text-[#6b6b63] leading-relaxed">
                Today, Awara Banjara has guided over 5,000 travellers and brought together an online tribe of 13,000+ souls. But our ethos has not shifted an inch: our groups remain small, our captains are certified mountain lovers, and when the campfire is lit at night in Spiti or Zanskar, every wanderer belongs.
              </p>
              <div className="pt-2">
                <Button href="/community-trips" variant="primary">
                  Travel With Our Tribe
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
