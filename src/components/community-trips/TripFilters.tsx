"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_PRICE_RANGES,
  COMMUNITY_SORT_OPTIONS,
} from "@/data/communityTrips";

interface TripFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  totalTripsCount: number;
  isFiltered: boolean;
  onResetFilters: () => void;
}

export const TripFilters: React.FC<TripFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  selectedSort,
  onSortChange,
  totalTripsCount,
  isFiltered,
  onResetFilters,
}) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-[#e0e0d8] shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-8">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex flex-col lg:flex-row items-stretch lg:items-end gap-3"
      >
        {/* 1. Search Input using UI Input component */}
        <div className="flex-1 min-w-[220px]">
          <Input
            id="filterSearch"
            label="SEARCH"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by trip name or destination (e.g. Spiti, Ladakh, Zanskar)..."
            leftIcon={<Search className="w-4 h-4 text-[#6b6b63]" />}
            className="bg-[#fcfcf9] border-2 border-[#e0e0d8] rounded-xl h-[44px] text-sm font-semibold text-[#14140f] placeholder:text-[#888880] focus:border-[#14140f] focus:bg-white"
          />
        </div>

        {/* 2. Search Button using UI Button component */}
        <div className="shrink-0 flex items-end">
          <Button
            id="filterSearchBtn"
            type="submit"
            variant="dark"
            size="md"
            className="h-[44px] px-5 rounded-xl bg-[#14140f] text-[#b8ff00] border-2 border-[#14140f] font-extrabold hover:bg-black whitespace-nowrap shadow-sm"
            leftIcon={<Search className="w-4 h-4 text-[#b8ff00]" />}
          >
            Search
          </Button>
        </div>

        {/* 3. Category Select using UI Select component */}
        <div className="w-full sm:w-[175px] lg:w-[170px] shrink-0">
          <Select
            id="filterCategory"
            label="CATEGORY"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={COMMUNITY_CATEGORIES.map((c) => ({
              label: c.label,
              value: c.id,
            }))}
            className="bg-[#fcfcf9] border-2 border-[#e0e0d8] rounded-xl h-[44px] text-sm font-bold text-[#14140f] cursor-pointer focus:border-[#14140f] focus:bg-white"
          />
        </div>

        {/* 4. Price Range Select using UI Select component */}
        <div className="w-full sm:w-[165px] lg:w-[160px] shrink-0">
          <Select
            id="filterPrice"
            label="PRICE RANGE"
            value={selectedPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            options={COMMUNITY_PRICE_RANGES.map((p) => ({
              label: p.label,
              value: p.id,
            }))}
            className="bg-[#fcfcf9] border-2 border-[#e0e0d8] rounded-xl h-[44px] text-sm font-bold text-[#14140f] cursor-pointer focus:border-[#14140f] focus:bg-white"
          />
        </div>

        {/* 5. Sort By Select using UI Select component */}
        <div className="w-full sm:w-[160px] lg:w-[155px] shrink-0">
          <Select
            id="filterSort"
            label="SORT BY"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            options={COMMUNITY_SORT_OPTIONS.map((s) => ({
              label: s.label,
              value: s.id,
            }))}
            className="bg-[#fcfcf9] border-2 border-[#e0e0d8] rounded-xl h-[44px] text-sm font-bold text-[#14140f] cursor-pointer focus:border-[#14140f] focus:bg-white"
          />
        </div>

        {/* 6. Clear Filters Button (shown when active) using UI Button component */}
        {isFiltered && (
          <div className="shrink-0 flex items-end">
            <Button
              id="resetFiltersBtn"
              type="button"
              variant="secondary"
              size="md"
              onClick={onResetFilters}
              className="h-[44px] px-4 rounded-xl text-xs font-extrabold whitespace-nowrap bg-[#14140f] text-[#b8ff00] border-2 border-[#14140f] hover:bg-black shadow-sm"
            >
              ↻ Clear
            </Button>
          </div>
        )}

        {/* 7. Results Count Badge using UI Badge component */}
        <div className="shrink-0 flex items-end">
          <Badge
            id="filterResultsBadge"
            variant="muted"
            className="h-[44px] px-4 text-xs sm:text-sm font-extrabold text-[#14140f] bg-[#f4f4ec] rounded-full whitespace-nowrap border border-[#e0e0d8] shadow-xs flex items-center justify-center normal-case tracking-normal"
          >
            {`Showing ${totalTripsCount} ${totalTripsCount === 1 ? "Trip" : "Trips"}`}
          </Badge>
        </div>
      </form>
    </div>
  );
};
