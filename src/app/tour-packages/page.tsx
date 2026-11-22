"use client";

import React, { useState, useMemo } from "react";
import {
  COMMUNITY_TRIPS,
  COMMUNITY_SECTIONS,
  COMMUNITY_CATEGORIES,
  COMMUNITY_PRICE_RANGES,
  COMMUNITY_SORT_OPTIONS,
  CommunityTrip,
} from "@/data/communityTrips";
import { PageHeroSection } from "@/components/common/PageHeroSection";
import { NeonHighlight } from "@/components/common/NeonHighlight";
import { TripFilters, FilterOption } from "@/components/community-trips/TripFilters";
import { TripCategorySection } from "@/components/community-trips/TripCategorySection";
import { TripEmptyState } from "@/components/community-trips/TripEmptyState";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CommunityTripCard } from "@/components/community-trips/CommunityTripCard";
import { Container } from "@/components/layout/Container";

const DURATION_OPTIONS: FilterOption[] = [
  { id: "all", label: "Any Duration" },
  { id: "short", label: "1 — 4 Days" },
  { id: "medium", label: "5 — 7 Days" },
  { id: "long", label: "8+ Days" },
];

export default function TourPackagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPrice("all");
    setSelectedDuration("all");
    setSelectedSort("default");
  };

  const isFiltered = useMemo(() => {
    return (
      searchTerm.trim() !== "" ||
      selectedCategory !== "all" ||
      selectedPrice !== "all" ||
      selectedDuration !== "all" ||
      selectedSort !== "default"
    );
  }, [searchTerm, selectedCategory, selectedPrice, selectedDuration, selectedSort]);

  // Parse days from duration string (e.g. "9 Days / 8 Nights" -> 9)
  const extractDays = (durationStr: string): number => {
    const match = durationStr.match(/(\d+)\s*Days?/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Filter single trip
  const checkTripMatches = (trip: CommunityTrip): boolean => {
    // 1. Search filter
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase().trim();
      const inTitle = trip.title.toLowerCase().includes(q);
      const inDest = trip.destinations.some((d) => d.toLowerCase().includes(q));
      const inTags = trip.tags ? trip.tags.toLowerCase().includes(q) : false;
      const inRoute = trip.route ? trip.route.toLowerCase().includes(q) : false;
      const inCat = trip.categories.some((c) => c.toLowerCase().includes(q));
      if (!inTitle && !inDest && !inTags && !inRoute && !inCat) {
        return false;
      }
    }

    // 2. Price filter
    if (selectedPrice !== "all") {
      const priceOption = COMMUNITY_PRICE_RANGES.find(
        (p) => p.id === selectedPrice
      );
      if (priceOption) {
        if (priceOption.isOnRequest) {
          if (!trip.isComingSoon && trip.price !== null) return false;
        } else {
          if (trip.price === null) return false;
          if (priceOption.min !== undefined && trip.price < priceOption.min) {
            return false;
          }
          if (priceOption.max !== undefined && trip.price > priceOption.max) {
            return false;
          }
        }
      }
    }

    // 3. Duration filter
    if (selectedDuration !== "all") {
      const days = extractDays(trip.duration);
      if (selectedDuration === "short" && (days < 1 || days > 4)) return false;
      if (selectedDuration === "medium" && (days < 5 || days > 7)) return false;
      if (selectedDuration === "long" && days < 8) return false;
    }

    return true;
  };

  // Compute visible sections
  const visibleSections = useMemo(() => {
    return COMMUNITY_SECTIONS.map((section) => {
      if (
        selectedCategory !== "all" &&
        section.categoryKey !== selectedCategory
      ) {
        return null;
      }

      const rawTrips: CommunityTrip[] = [];
      for (const tripId of section.tripIds) {
        const found = COMMUNITY_TRIPS.find((t) => t.id === tripId);
        if (found && checkTripMatches(found)) {
          rawTrips.push(found);
        }
      }

      if (rawTrips.length === 0) return null;

      let sortedTrips = [...rawTrips];
      if (selectedSort === "price_low_high") {
        sortedTrips.sort((a, b) => {
          if (a.price === null && b.price === null) return 0;
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
      } else if (selectedSort === "price_high_low") {
        sortedTrips.sort((a, b) => {
          if (a.price === null && b.price === null) return 0;
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
      }

      return {
        id: section.id,
        title: section.title,
        trips: sortedTrips,
      };
    }).filter(
      (s): s is { id: string; title: string; trips: CommunityTrip[] } =>
        s !== null
    );
  }, [selectedCategory, searchTerm, selectedPrice, selectedDuration, selectedSort]);

  // Compute unique visible trips count
  const totalTripsCount = useMemo(() => {
    const uniqueIds = new Set<string>();
    visibleSections.forEach((sec) => {
      sec.trips.forEach((t) => uniqueIds.add(t.id));
    });
    return uniqueIds.size;
  }, [visibleSections]);

  return (
    <div className="w-full bg-[#fbfbf8] text-[#14140f] min-h-screen relative">
      {/* Single Full-Page Fixed Background - Soft and luminous */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/hero_pack/Tour_Packages/03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP/01_Offroad_Himalayan_Road_Trip_mobile_fade.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/hero_pack/Tour_Packages/01_DESKTOP_1920x900_WHITE_FADE_WEBP/01_Offroad_Himalayan_Road_Trip_desktop.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[right_top] opacity-75 brightness-[1.06] contrast-[0.95]"
          />
        </picture>
        {/* Soft light overlay so background is subtle, bright and light */}
        <div className="absolute inset-0 bg-white/25 pointer-events-none" />
      </div>

      {/* Himalayan Hero Header with Offroad Expedition WebP */}
      <PageHeroSection
        title={
          <span className="inline-flex items-center flex-wrap gap-x-2.5 sm:gap-x-3.5">
            <span>Tour</span>
            <NeonHighlight>Packages</NeonHighlight>
          </span>
        }
      >
        {/* Floating Search & Filter Bar on the Hero Image */}
        <TripFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={() => {}}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryOptions={COMMUNITY_CATEGORIES}
          selectedPrice={selectedPrice}
          onPriceChange={setSelectedPrice}
          priceOptions={COMMUNITY_PRICE_RANGES}
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
          durationOptions={DURATION_OPTIONS}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          sortOptions={COMMUNITY_SORT_OPTIONS}
          totalTripsCount={totalTripsCount}
          isFiltered={isFiltered}
          onResetFilters={handleResetFilters}
          searchLabel="SEARCH"
          searchButtonText="Search"
          placeholder="Search Spiti, Manali, Ladakh..."
          itemNoun="Packages"
        />
      </PageHeroSection>

      <Container className="relative z-10 pt-4 sm:pt-6">
        {/* Packages Container */}
        <div id="tourPackagesContainer" className="pb-4 sm:pb-6">
          {visibleSections.length > 0 ? (
            visibleSections.map((sec) => (
              <TripCategorySection
                key={sec.id}
                id={sec.id}
                title={sec.title === "Spiti Tours" ? "All Tour Packages" : sec.title}
                trips={sec.trips}
              />
            ))
          ) : (
            <TripEmptyState onReset={handleResetFilters} />
          )}
        </div>
      </Container>
    </div>
  );
}
