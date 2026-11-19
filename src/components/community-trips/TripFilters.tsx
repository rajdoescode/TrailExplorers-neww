"use client";

import React from "react";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_PRICE_RANGES,
  COMMUNITY_SORT_OPTIONS,
} from "@/data/communityTrips";
import { cn } from "@/lib/utils";

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

  const hasDropdownFilters =
    selectedCategory !== "all" ||
    selectedPrice !== "all" ||
    selectedSort !== "default";

  return (
    <div className="w-full bg-white p-3.5 sm:p-5 rounded-2xl border border-[#e0e0d8] shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-6 sm:mb-8 relative">
      {/* Clear Button (Top-Right of the filter card) */}
      {(hasDropdownFilters || searchTerm.length > 0) && (
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3.5 z-20">
          <Button
            id="resetFiltersBtn"
            type="button"
            variant="dark"
            size="icon"
            onClick={onResetFilters}
            title="Clear all filters"
            aria-label="Clear all filters"
            className="w-7 h-7 min-w-7 min-h-7 rounded-full bg-[#14140f] text-white hover:bg-[#d6ff3f] hover:text-[#14140f] border-0 shadow-xs transition-transform duration-200 hover:rotate-90 p-0 flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </Button>
        </div>
      )}

      {/* Mobile Quick Category Horizontal Pills */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-2.5 border-b border-[#f0f0eb] -mx-1 px-1">
        {COMMUNITY_CATEGORIES.map((c) => {
          const isSelected = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onCategoryChange(c.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[34px] flex items-center justify-center",
                isSelected
                  ? "bg-[#14140f] text-[#d6ff3f] shadow-xs"
                  : "bg-[#f6f6f1] text-[#6b6b63] hover:text-[#14140f] hover:bg-[#eaeae2]"
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex flex-col lg:flex-row items-stretch lg:items-end gap-3"
      >
        {/* Search Row */}
        <div className="flex items-end gap-2 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <label
                htmlFor="filterSearch"
                className="text-xs sm:text-sm font-bold text-[#14140f] tracking-wide"
              >
                SEARCH
              </label>
              <Badge
                id="filterResultsBadge"
                variant="muted"
                className="h-[22px] px-2.5 text-[11px] font-extrabold text-[#14140f] bg-[#f4f4ec] rounded-full border border-[#e0e0d8] shadow-xs inline-flex items-center normal-case tracking-normal"
              >
                {`Showing ${totalTripsCount} ${totalTripsCount === 1 ? "Trip" : "Trips"}`}
              </Badge>
            </div>
            <Input
              id="filterSearch"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Spiti, Ladakh, Zanskar..."
              leftIcon={<Search className="w-4 h-4 text-[#6b6b63]" />}
              rightIcon={
                searchTerm.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    title="Clear search"
                    aria-label="Clear search"
                    className="w-5 h-5 rounded-full bg-[#14140f] text-white hover:bg-[#d6ff3f] hover:text-[#14140f] flex items-center justify-center cursor-pointer transition-colors p-0 shadow-xs"
                  >
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </button>
                ) : undefined
              }
              className="bg-[#fcfcf9] border-2 border-[#e0e0d8] rounded-xl h-[44px] text-sm font-semibold text-[#14140f] placeholder:text-[#888880] focus:border-[#14140f] focus:bg-white"
            />
          </div>

          {/* Search Button */}
          <div className="shrink-0 flex items-end">
            <Button
              id="filterSearchBtn"
              type="submit"
              variant="dark"
              size="icon"
              title="Search"
              aria-label="Search"
              className="w-[44px] h-[44px] min-w-[44px] rounded-xl bg-[#14140f] text-[#b8ff00] border-2 border-[#14140f] font-extrabold hover:bg-black shadow-sm flex items-center justify-center p-0 cursor-pointer"
            >
              <Search className="w-5 h-5 text-[#b8ff00] stroke-[2.5]" />
            </Button>
          </div>
        </div>

        {/* Dropdowns Row on Mobile (Grid of 2 or 3) / Inline on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-end gap-2.5 sm:gap-3 w-full lg:w-auto">
          {/* Category Select (hidden on small mobile since quick pills are visible above) */}
          <div className="hidden sm:block lg:block w-full sm:w-auto lg:w-[180px] shrink-0">
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

          {/* Price Range Select */}
          <div className="w-full sm:w-auto lg:w-[170px] shrink-0">
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

          {/* Sort By Select */}
          <div className="w-full sm:w-auto lg:w-[165px] shrink-0">
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
        </div>
      </form>
    </div>
  );
};
