"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { TripCard } from "@/components/trips/TripCard";
import { TRIPS_DATA } from "@/data/trips";
import { Map, Bike, Mountain, Compass } from "lucide-react";

const REGION_TABS = [
  { id: "all", label: "All Packages", icon: Compass },
  { id: "spiti_tours", label: "Spiti Valley", icon: Map },
  { id: "ladakh_tours", label: "Ladakh & Zanskar", icon: Mountain },
  { id: "himachal_tours", label: "Himachal Pradesh", icon: Map },
  { id: "kashmir_tours", label: "Kashmir", icon: Mountain },
  { id: "bike_tours", label: "Motorbike Expeditions", icon: Bike },
  { id: "treks", label: "Himalayan Treks", icon: Mountain },
];

export default function TourPackagesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPackages = useMemo(() => {
    if (activeTab === "all") return TRIPS_DATA;
    return TRIPS_DATA.filter((t) =>
      t.category.toLowerCase().includes(activeTab) ||
      (t.tags && JSON.stringify(t.tags).toLowerCase().includes(activeTab))
    );
  }, [activeTab]);

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Map className="w-3.5 h-3.5" />
              <span>Complete Catalog</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Himalayan Tour Packages
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              Explore our comprehensive range of fixed group departures, private custom tours, high-altitude motorcycle circuits, and alpine treks across Northern India.
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Tabs Bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-[#e2e2dc] py-4 shadow-2xs">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {REGION_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#14140f] text-[#d6ff3f] shadow-xs"
                      : "bg-[#f6f6f1] text-[#14140f] hover:bg-[#e4e4dd]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Packages Grid */}
      <Container className="py-12">
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-bold text-[#6b6b63]">
            Showing <strong className="text-[#14140f]">{filteredPackages.length}</strong> tour packages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </Container>
    </div>
  );
}
