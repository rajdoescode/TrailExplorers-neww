"use client";

import React, { useState, useMemo } from "react";
import { EXPERIENCES_DATA } from "@/data/experiences";
import {
  COMMUNITY_PRICE_RANGES,
  COMMUNITY_SORT_OPTIONS,
} from "@/data/communityTrips";
import { PageHeroSection } from "@/components/common/PageHeroSection";
import { NeonHighlight } from "@/components/common/NeonHighlight";
import { TripFilters, FilterOption } from "@/components/community-trips/TripFilters";
import { TripCategorySection } from "@/components/community-trips/TripCategorySection";
import { TripEmptyState } from "@/components/community-trips/TripEmptyState";
import { Container } from "@/components/layout/Container";

const EXPERIENCES_CATEGORIES: FilterOption[] = [
  { id: "all", label: "All Categories" },
  { id: "festivals_cultural", label: "Festivals & Cultural" },
  { id: "winter_expeditions", label: "Winter Expeditions" },
  { id: "himachal_experiences", label: "Himachal Experiences" },
];

export default function ExperiencesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPrice("all");
    setSelectedSort("default");
  };

  const isFiltered =
    searchTerm.trim().length > 0 ||
    selectedCategory !== "all" ||
    selectedPrice !== "all" ||
    selectedSort !== "default";

  const filteredExperiences = useMemo(() => {
    return EXPERIENCES_DATA.filter((trip) => {
      // 1. Search Query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesTitle = trip.title.toLowerCase().includes(query);
        const matchesDest = trip.destinations?.some((d) =>
          d.toLowerCase().includes(query)
        );
        const matchesRoute = trip.route?.toLowerCase().includes(query);
        const matchesTags = trip.tags?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDest && !matchesRoute && !matchesTags) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "festivals_cultural") {
          const match =
            trip.categories?.includes("festival_tours") ||
            trip.tags?.toLowerCase().includes("festival") ||
            trip.tags?.toLowerCase().includes("cultural");
          if (!match) return false;
        } else if (selectedCategory === "winter_expeditions") {
          const match =
            trip.tags?.toLowerCase().includes("winter") ||
            trip.tags?.toLowerCase().includes("snow") ||
            trip.tags?.toLowerCase().includes("expedition");
          if (!match) return false;
        } else if (selectedCategory === "himachal_experiences") {
          const match =
            trip.categories?.includes("himachal_tours") ||
            trip.destinations?.some((d) => d.toLowerCase().includes("himachal"));
          if (!match) return false;
        } else {
          const match =
            trip.categories?.includes(selectedCategory) ||
            trip.slug.toLowerCase().includes(selectedCategory);
          if (!match) return false;
        }
      }

      // 3. Price Filter
      if (selectedPrice !== "all") {
        const p = trip.price;
        if (selectedPrice === "under_15000") {
          if (p === null || p >= 15000) return false;
        } else if (selectedPrice === "15000_25000") {
          if (p === null || p < 15000 || p > 25000) return false;
        } else if (selectedPrice === "above_25000") {
          if (p === null || p <= 25000) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === "price_asc") {
        return (a.price ?? 999999) - (b.price ?? 999999);
      }
      if (selectedSort === "price_desc") {
        return (b.price ?? 0) - (a.price ?? 0);
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedPrice, selectedSort]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Trail Explorers Experiences",
    numberOfItems: EXPERIENCES_DATA.length,
    itemListElement: EXPERIENCES_DATA.map((trip, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: trip.title,
      url: `https://trailexplorers.in${trip.detailUrl}`,
    })),
  };

  return (
    <div className="w-full bg-[#fbfbf8] text-[#14140f] min-h-screen relative">
      {/* Single Full-Page Fixed Background - Soft and luminous */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/hero_pack/Experiences/03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP/01_Kullu_Festival_Grand_Procession_mobile_fade.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/hero_pack/Experiences/01_DESKTOP_1920x900_WHITE_FADE_WEBP/01_Kullu_Festival_Grand_Procession_desktop.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[right_top] opacity-75 brightness-[1.06] contrast-[0.95]"
          />
        </picture>
        {/* Soft light overlay so background is subtle, bright and light */}
        <div className="absolute inset-0 bg-white/25 pointer-events-none" />
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Himalayan Hero Header with Kullu Dussehra Cultural Procession WebP */}
      <PageHeroSection
        title={<NeonHighlight>Experiences</NeonHighlight>}
      >
        {/* Floating Search & Filter Bar on the Hero Image */}
        <TripFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={() => {}}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryOptions={EXPERIENCES_CATEGORIES}
          selectedPrice={selectedPrice}
          onPriceChange={setSelectedPrice}
          priceOptions={COMMUNITY_PRICE_RANGES}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          sortOptions={COMMUNITY_SORT_OPTIONS}
          totalTripsCount={filteredExperiences.length}
          isFiltered={isFiltered}
          onResetFilters={handleResetFilters}
          searchLabel="SEARCH"
          searchButtonText="Search"
          placeholder="Search festivals, carnivals, expeditions..."
          itemNoun="Experiences"
        />
      </PageHeroSection>

      <Container className="relative z-10 pt-4 sm:pt-6">
        {/* Experiences Section */}
        <div id="experiencesContainer" className="pb-4 sm:pb-6">
          {filteredExperiences.length > 0 ? (
            <TripCategorySection
              id="experiences-list"
              title="Experiences"
              trips={filteredExperiences}
            />
          ) : (
            <TripEmptyState onReset={handleResetFilters} />
          )}
        </div>
      </Container>
    </div>
  );
}
