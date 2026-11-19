import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Mountain, Users, HeartHandshake, Shield, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#ffffff] min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-[#14140f] text-white py-16 sm:py-24 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Mountain className="w-3.5 h-3.5" />
              <span>Native Valley Roots</span>
            </span>
            <Heading level={1} className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Locals, Not Outsiders.
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              We did not start this company sitting in an air-conditioned metro office looking at tourism data. We were born with the sound of pine trees, high snow passes, and roaring rivers.
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Narrative Section with 3 Pillars */}
      <section className="py-16 bg-[#f6f6f1]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-[#e2e2dc] shadow-card flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-[#d6ff3f] bg-[#14140f] w-12 h-12 rounded-xl flex items-center justify-center font-heading">
                01
              </span>
              <h3 className="text-xl font-bold text-[#14140f]">Raised in the Valley</h3>
              <p className="text-sm text-[#6b6b63] leading-relaxed">
                Our founders and team leaders grew up navigating these treacherous passes before highways were paved. We know every hairpin turn, every local elder, and every seasonal river crossing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#e2e2dc] shadow-card flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-[#d6ff3f] bg-[#14140f] w-12 h-12 rounded-xl flex items-center justify-center font-heading">
                02
              </span>
              <h3 className="text-xl font-bold text-[#14140f]">Planned on the Ground</h3>
              <p className="text-sm text-[#6b6b63] leading-relaxed">
                We do not resell third-party aggregated packages. Every single itinerary is scouted personally by our team, tested through harsh winters and heavy rains before a traveller ever sets foot.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#e2e2dc] shadow-card flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-[#d6ff3f] bg-[#14140f] w-12 h-12 rounded-xl flex items-center justify-center font-heading">
                03
              </span>
              <h3 className="text-xl font-bold text-[#14140f]">Your Trip Stays Local</h3>
              <p className="text-sm text-[#6b6b63] leading-relaxed">
                When you travel with Trail Explorers, your money directly funds indigenous homestay mothers, local mechanics, mountain youth guides, and village cooperative kitchens.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ FOUNDER TEASER ============ */}
      <section className="py-12 bg-white">
        <Container>
          <Link
            href="/founder"
            className="group block p-6 sm:p-8 rounded-[24px] bg-[#f8f8f5] border border-[#e2e2dc] hover:border-[#14140f] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-[20px] overflow-hidden shrink-0 border-2 border-[#14140f]">
                <Image
                  src="/assets/images/about/founder-viru.jpg"
                  alt="Viru Thakur - Founder of Trail Explorers"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-[#14140f]/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  📍 Manali
                </span>
              </div>

              <div className="flex flex-col items-start gap-2 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full">
                  Founder&apos;s Note
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f] group-hover:text-black transition-colors m-0">
                  Meet the Lead Explorer
                </h2>
                <p className="text-sm sm:text-base text-[#6b6b63] leading-relaxed m-0">
                  Viru Thakur grew up in Manali watching travellers rush past the mountains he called home. They left with full camera rolls and empty hearts, so he started a company to change that. Here&apos;s his story, and the passion behind the journeys.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#14140f] group-hover:translate-x-1 transition-transform mt-2">
                  <span>Meet Viru Thakur, our founder</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* Story & Visual Gallery */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#14140f] shadow-card">
              <Image
                src="/assets/images/about/community-group.jpg"
                alt="Trail Explorers Campfire Community"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3.5 py-1 rounded-full w-fit">
                Our Philosophy
              </span>
              <Heading level={2} className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Travel That Creates Brothers, Not Just Photos.
              </Heading>
              <Paragraph className="text-sm sm:text-base text-[#6b6b63] leading-relaxed">
                Modern tourism has reduced journeys to checklist selfies and rush tours. We believe travel should be raw, unhurried, and deeply restorative. Sitting around a crackling woodfire under the Milky Way with strangers who quickly become family is at the very core of what we do.
              </Paragraph>
              <div className="pt-2">
                <Button href="/community-trips" variant="primary" size="lg" className="shadow-lime-btn font-bold">
                  Explore Our Group Departures
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
