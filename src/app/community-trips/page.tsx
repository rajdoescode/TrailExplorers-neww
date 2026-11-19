"use client";

import React, { useState, useMemo } from "react";
import {
  COMMUNITY_TRIPS,
  COMMUNITY_SECTIONS,
  COMMUNITY_PRICE_RANGES,
  CommunityTrip,
} from "@/data/communityTrips";
import { CommunityTripsHero } from "@/components/community-trips/CommunityTripsHero";
import { TripFilters } from "@/components/community-trips/TripFilters";
import { TripCategorySection } from "@/components/community-trips/TripCategorySection";
import { TripEmptyState } from "@/components/community-trips/TripEmptyState";

export default function CommunityTripsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPrice("all");
    setSelectedSort("default");
  };

  const isFiltered = useMemo(() => {
    return (
      searchTerm.trim() !== "" ||
      selectedCategory !== "all" ||
      selectedPrice !== "all" ||
      selectedSort !== "default"
    );
  }, [searchTerm, selectedCategory, selectedPrice, selectedSort]);

  // Filter single trip by search and price
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

    return true;
  };

  // Compute visible sections and their sorted trips
  const visibleSections = useMemo(() => {
    return COMMUNITY_SECTIONS.map((section) => {
      // If a specific category is chosen, only display matching section(s)
      if (
        selectedCategory !== "all" &&
        section.categoryKey !== selectedCategory
      ) {
        return null;
      }

      // Collect section trips in order
      const rawTrips: CommunityTrip[] = [];
      for (const tripId of section.tripIds) {
        const found = COMMUNITY_TRIPS.find((t) => t.id === tripId);
        if (found && checkTripMatches(found)) {
          rawTrips.push(found);
        }
      }

      if (rawTrips.length === 0) return null;

      // Apply sorting if requested
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
  }, [selectedCategory, searchTerm, selectedPrice, selectedSort]);

  // Compute unique visible trips count
  const totalTripsCount = useMemo(() => {
    const uniqueIds = new Set<string>();
    visibleSections.forEach((sec) => {
      sec.trips.forEach((t) => uniqueIds.add(t.id));
    });
    return uniqueIds.size;
  }, [visibleSections]);

  return (
    <div className="w-full bg-white text-[#14140f] min-h-screen">
      {/* Page Hero Title */}
      <div className="max-w-[1280px] mx-auto px-6">
        <CommunityTripsHero />
      </div>

      {/* Filter & Search Controls Section (Unified Single-Line Bar) */}
      <div className="max-w-[1280px] mx-auto px-6 mb-8">
        <TripFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={() => {}}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPrice={selectedPrice}
          onPriceChange={setSelectedPrice}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          totalTripsCount={totalTripsCount}
          isFiltered={isFiltered}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Trips Container */}
      <div className="max-w-[1280px] mx-auto px-6 pb-12" id="communityTripsContainer">
        {visibleSections.length > 0 ? (
          visibleSections.map((sec) => (
            <TripCategorySection
              key={sec.id}
              id={sec.id}
              title={sec.title}
              trips={sec.trips}
            />
          ))
        ) : (
          <TripEmptyState onReset={handleResetFilters} />
        )}
      </div>
    </div>
  );
}
