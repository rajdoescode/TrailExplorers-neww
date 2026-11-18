"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA } from "@/data/trips";
import { Users, Shield, HeartHandshake, Sparkles, Filter } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Community Trips" },
  { id: "spiti", label: "Spiti Valley" },
  { id: "ladakh", label: "Ladakh & Zanskar" },
  { id: "himachal", label: "Himachal Pradesh" },
  { id: "kashmir", label: "Kashmir" },
  { id: "uttarakhand", label: "Uttarakhand" },
  { id: "weekend", label: "Weekend Escapes" },
];

export default function CommunityTripsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTrips = useMemo(() => {
    if (activeCategory === "all") return TRIPS_DATA;
    return TRIPS_DATA.filter((t) => {
      const cat = t.category.toLowerCase();
      const title = t.title.toLowerCase();
      if (activeCategory === "spiti") return cat.includes("spiti") || title.includes("spiti");
      if (activeCategory === "ladakh") return cat.includes("ladakh") || title.includes("ladakh") || title.includes("zanskar");
      if (activeCategory === "himachal") return cat.includes("himachal") || title.includes("manali") || title.includes("kasol");
      if (activeCategory === "kashmir") return cat.includes("kashmir") || title.includes("kashmir") || title.includes("gulmarg");
      if (activeCategory === "uttarakhand") return cat.includes("uttarakhand") || title.includes("uttarakhand");
      if (activeCategory === "weekend") return title.includes("weekend") || title.includes("escape") || t.duration.includes("3") || t.duration.includes("4");
      return true;
    });
  }, [activeCategory]);

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>The Tribe Experience</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Community Trips
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              Curated small-group departures designed for solo travellers, couples, and friends. No strangers, just future lifelong friends sharing campfires, mountain passes, and raw conversations.
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Filter Category Bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-[#e2e2dc] py-4 shadow-2xs">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#6b6b63] mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#14140f] text-[#d6ff3f] shadow-xs"
                    : "bg-[#f6f6f1] text-[#14140f] hover:bg-[#e4e4dd]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Trips Grid */}
      <Container className="py-12">
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-bold text-[#6b6b63]">
            Showing <strong className="text-[#14140f]">{filteredTrips.length}</strong> upcoming departures
          </span>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e2e2dc]">
            <p className="text-lg font-bold text-[#14140f] mb-2">No trips found in this category</p>
            <p className="text-sm text-[#6b6b63] mb-6">Try selecting another region or request a custom itinerary.</p>
            <Button onClick={() => setActiveCategory("all")} variant="primary">
              View All Trips
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        {/* Why Awara Banjara Community Banner */}
        <div className="mt-16 bg-white rounded-[24px] p-8 sm:p-12 border-2 border-[#14140f] shadow-card">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3.5 py-1 rounded-full">
              What Sets Us Apart
            </span>
            <Heading level={2} className="text-2xl sm:text-3xl font-extrabold">
              Why Join an Awara Banjara Group?
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-6">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center font-bold">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#14140f]">Certified Captains</h4>
                <p className="text-xs text-[#6b6b63] leading-relaxed">
                  Every trip is spearheaded by experienced local mountain leaders with first-aid &amp; mountain safety training.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#14140f]">Curated Circles</h4>
                <p className="text-xs text-[#6b6b63] leading-relaxed">
                  We maintain balanced group sizes of 12-16 wanderers to guarantee genuine connection and safety on roads.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#14140f]">Village Homestays</h4>
                <p className="text-xs text-[#6b6b63] leading-relaxed">
                  Warm tandoor evenings, fresh mountain food, and authentic family stays rooted in local Himalayan villages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
