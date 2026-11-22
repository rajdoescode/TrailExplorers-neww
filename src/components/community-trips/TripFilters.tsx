"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
}

interface TripFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categoryOptions?: FilterOption[];
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  priceOptions?: FilterOption[];
  selectedSort: string;
  onSortChange: (sort: string) => void;
  sortOptions?: FilterOption[];
  selectedDuration?: string;
  onDurationChange?: (duration: string) => void;
  durationOptions?: FilterOption[];
  totalTripsCount: number;
  isFiltered: boolean;
  onResetFilters: () => void;
  searchLabel?: string;
  searchButtonText?: string;
  placeholder?: string;
  itemNoun?: string;
  className?: string;
}

export const TripFilters: React.FC<TripFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  selectedCategory,
  onCategoryChange,
  categoryOptions = [],
  selectedPrice,
  onPriceChange,
  priceOptions = [],
  selectedSort,
  onSortChange,
  sortOptions = [],
  selectedDuration,
  onDurationChange,
  durationOptions,
  totalTripsCount,
  isFiltered,
  onResetFilters,
  searchLabel = "SEARCH",
  searchButtonText = "Search",
  placeholder = "Search Spiti, Ladakh, Zanskar...",
  itemNoun = "Trips",
  className = "",
}) => {
  // Dynamic Typewriter / Text Writing placeholder animation
  const words = useMemo(() => {
    if (placeholder && !placeholder.toLowerCase().includes("spiti")) {
      return [
        placeholder,
        "Search destinations...",
        "Search tours & circuits...",
      ];
    }
    return [
      "Search Spiti, Manali, Ladakh...",
      "Search Zanskar 4x4 Expedition...",
      "Search Kashmir Snow Experience...",
      "Search Winter Carnivals...",
      "Search Offroad Himalayan Trips...",
    ];
  }, [placeholder]);

  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setDisplayText("");
      return;
    }

    const currentWord = words[wordIndex % words.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      timer = setTimeout(() => {}, 300);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, searchTerm]);

  const animatedPlaceholder = displayText || placeholder;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <div
      className={cn(
        "w-full bg-white/45 backdrop-blur-xl sm:backdrop-blur-2xl p-3.5 sm:p-5 rounded-[22px] sm:rounded-[26px] border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.85)_inset,0_0_0_1px_rgba(255,255,255,0.35)] relative z-30 transition-all",
        className
      )}
    >
      {/* Clear/Reset Button (Top Right corner) */}
      {isFiltered && (
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3.5 z-20">
          <Button
            id="resetFiltersBtn"
            type="button"
            variant="dark"
            size="icon"
            onClick={onResetFilters}
            title="Clear all filters"
            aria-label="Clear all filters"
            className="w-7 h-7 min-w-7 min-h-7 rounded-full bg-[#14140f] text-white hover:bg-[#d6ff3f] hover:text-[#14140f] border border-white/40 shadow-xs transition-transform duration-200 hover:rotate-90 p-0 flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </Button>
        </div>
      )}

      {/* Quick Category Horizontal Pills (Mobile only: on desktop we show Category Select dropdown) */}
      {categoryOptions.length > 0 && (
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-3 border-b border-black/[0.08] -mx-1 px-1">
          {categoryOptions.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onCategoryChange(c.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[34px] flex items-center justify-center",
                  isSelected
                    ? "bg-[#14140f] text-[#d6ff3f] border border-[#14140f] shadow-sm"
                    : "bg-white/55 backdrop-blur-md text-[#2a2a24] border border-white/70 hover:text-[#14140f] hover:bg-white/85 shadow-xs"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      )}

      <form onSubmit={handleSearchSubmit} className="w-full">
        {/* Desktop Layout (>= 1024px) */}
        <div className="hidden lg:flex items-end gap-3 w-full">
          {/* Search Input Field */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 h-[22px]">
              <label
                htmlFor="filterSearchDesktop"
                className="text-xs sm:text-sm font-bold text-[#14140f] tracking-wide uppercase font-heading"
              >
                {searchLabel}
              </label>
              <Badge
                variant="muted"
                className="h-[22px] px-2.5 text-[11px] font-extrabold text-[#14140f] bg-white/70 backdrop-blur-md rounded-full border border-white/80 shadow-xs inline-flex items-center normal-case tracking-normal"
              >
                {`Showing ${totalTripsCount} ${totalTripsCount === 1 ? itemNoun.replace(/s$/, "") : itemNoun}`}
              </Badge>
            </div>
            <Input
              id="filterSearchDesktop"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={animatedPlaceholder}
              leftIcon={<Search className="w-4 h-4 text-[#14140f] stroke-[2.5]" />}
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
              className="bg-white/90 backdrop-blur-md border-2 border-[#14140f] ring-2 ring-[#d6ff3f]/50 rounded-xl h-[44px] text-sm font-semibold text-[#14140f] placeholder:text-[#6a6a62] focus:bg-white focus:ring-[#d6ff3f] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
            />
          </div>

          {/* Search Button Icon */}
          <div className="shrink-0 flex items-end">
            <Button
              id="filterSearchBtnDesktop"
              type="submit"
              variant="dark"
              size="icon"
              title="Search"
              aria-label="Search"
              className="w-[44px] h-[44px] min-w-[44px] rounded-xl bg-[#14140f] text-[#d6ff3f] border-2 border-[#14140f] font-extrabold hover:bg-black hover:scale-[1.02] shadow-sm flex items-center justify-center p-0 cursor-pointer transition-transform"
            >
              <Search className="w-5 h-5 text-[#d6ff3f] stroke-[2.6]" />
            </Button>
          </div>

          {/* Category Dropdown (Desktop) */}
          {categoryOptions.length > 0 && (
            <div className="w-[170px] xl:w-[190px] shrink-0">
              <Select
                id="filterCategoryDesktop"
                label="CATEGORY"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                options={categoryOptions.map((c) => ({
                  label: c.label,
                  value: c.id,
                }))}
                className="w-full"
                triggerClassName="bg-white/60 backdrop-blur-md border border-white/80 rounded-xl h-[44px] min-h-[44px] text-sm font-bold text-[#14140f] cursor-pointer hover:bg-white/75 hover:border-[#14140f] focus:border-[#14140f] focus:bg-white/95 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>
          )}

          {/* Price Range Dropdown (Desktop) */}
          {priceOptions.length > 0 && (
            <div className="w-[160px] xl:w-[170px] shrink-0">
              <Select
                id="filterPriceDesktop"
                label="PRICE RANGE"
                value={selectedPrice}
                onChange={(e) => onPriceChange(e.target.value)}
                options={priceOptions.map((p) => ({
                  label: p.label,
                  value: p.id,
                }))}
                className="w-full"
                triggerClassName="bg-white/60 backdrop-blur-md border border-white/80 rounded-xl h-[44px] min-h-[44px] text-sm font-bold text-[#14140f] cursor-pointer hover:bg-white/75 hover:border-[#14140f] focus:border-[#14140f] focus:bg-white/95 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>
          )}

          {/* Duration Dropdown (Desktop - Tour Packages) */}
          {durationOptions && onDurationChange && (
            <div className="w-[150px] xl:w-[160px] shrink-0">
              <Select
                id="filterDurationDesktop"
                label="DURATION"
                value={selectedDuration || "all"}
                onChange={(e) => onDurationChange(e.target.value)}
                options={durationOptions.map((d) => ({
                  label: d.label,
                  value: d.id,
                }))}
                className="w-full"
                triggerClassName="bg-white/60 backdrop-blur-md border border-white/80 rounded-xl h-[44px] min-h-[44px] text-sm font-bold text-[#14140f] cursor-pointer hover:bg-white/75 hover:border-[#14140f] focus:border-[#14140f] focus:bg-white/95 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>
          )}

          {/* Sort By Dropdown (Desktop) */}
          {sortOptions.length > 0 && (
            <div className="w-[170px] xl:w-[185px] shrink-0">
              <Select
                id="filterSortDesktop"
                label="SORT BY"
                align="right"
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                options={sortOptions.map((s) => ({
                  label: s.label,
                  value: s.id,
                }))}
                className="w-full"
                triggerClassName="bg-white/60 backdrop-blur-md border border-white/80 rounded-xl h-[44px] min-h-[44px] text-sm font-bold text-[#14140f] cursor-pointer hover:bg-white/75 hover:border-[#14140f] focus:border-[#14140f] focus:bg-white/95 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>
          )}
        </div>

        {/* Mobile / Responsive Layout (< 1024px) - Exactly matching user screenshot */}
        <div className="flex flex-col gap-3 lg:hidden w-full">
          {/* Search Header Label + Count Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#14140f] tracking-wide uppercase font-heading">
              {searchLabel}
            </span>
            <Badge
              variant="muted"
              className="h-[22px] px-2.5 text-[11px] font-extrabold text-[#14140f] bg-white/70 backdrop-blur-md rounded-full border border-white/80 shadow-xs inline-flex items-center normal-case tracking-normal"
            >
              {`Showing ${totalTripsCount} ${totalTripsCount === 1 ? itemNoun.replace(/s$/, "") : itemNoun}`}
            </Badge>
          </div>

          {/* Search Field + Black Search Button side-by-side */}
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 min-w-0">
              <Input
                id="filterSearchMobile"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={animatedPlaceholder}
                leftIcon={<Search className="w-4 h-4 text-[#14140f] stroke-[2.5]" />}
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
                className="bg-white/90 backdrop-blur-md border-2 border-[#14140f] ring-2 ring-[#d6ff3f]/50 rounded-xl h-[44px] text-sm font-semibold text-[#14140f] placeholder:text-[#6a6a62] focus:bg-white focus:ring-[#d6ff3f] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
              />
            </div>

            <Button
              id="filterSearchBtnMobile"
              type="submit"
              variant="dark"
              size="icon"
              title="Search"
              aria-label="Search"
              className="w-[44px] h-[44px] min-w-[44px] rounded-xl bg-[#14140f] text-[#d6ff3f] border-2 border-[#14140f] font-extrabold hover:bg-black hover:scale-[1.02] shadow-sm flex items-center justify-center p-0 cursor-pointer shrink-0 transition-transform"
            >
              <Search className="w-5 h-5 text-[#d6ff3f] stroke-[2.6]" />
            </Button>
          </div>

          {/* 2-Column Grid: PRICE RANGE & SORT BY (or Duration) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
            {/* Price Range */}
            {priceOptions.length > 0 && (
              <div className="w-full">
                <Select
                  id="filterPriceMobile"
                  label="PRICE RANGE"
                  value={selectedPrice}
                  onChange={(e) => onPriceChange(e.target.value)}
                  options={priceOptions.map((p) => ({
                    label: p.label,
                    value: p.id,
                  }))}
                  className="w-full"
                  triggerClassName="bg-white/60 backdrop-blur-md border border-white/80 rounded-xl h-[44px] min-h-[44px] text-[11.5px] sm:text-sm px-2.5 sm:px-3 font-bold text-[#14140f] cursor-pointer hover:bg-white/75 hover:border-[#14140f] focus:border-[#14140f] focus:bg-white/95 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
                />
              </div>
            )}

            {/* Sort By */}
            {sortOptions.length > 0 && (
              <div className="w-full">
                <Select
                  id="filterSortMobile"
                  label="SORT BY"
                  align="right"
                  value={selectedSort}
                  onChange={(e) => onSortChange(e.target.value)}
                  options={sortOptions.map((s) => ({
                    label: s.label,
                    value: s.id,
                  }))}
                  className="w-full"
                  triggerClassName="bg-white/60 backdrop-blur-md border border-white/80 rounded-xl h-[44px] min-h-[44px] text-[11.5px] sm:text-sm px-2.5 sm:px-3 font-bold text-[#14140f] cursor-pointer hover:bg-white/75 hover:border-[#14140f] focus:border-[#14140f] focus:bg-white/95 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
                />
              </div>
            )}

            {/* Duration if present */}
            {durationOptions && onDurationChange && (
              <div className="col-span-2 w-full mt-0.5">
                <Select
                  id="filterDurationMobile"
                  label="DURATION"
                  value={selectedDuration || "all"}
                  onChange={(e) => onDurationChange(e.target.value)}
                  options={durationOptions.map((d) => ({
                    label: d.label,
                    value: d.id,
                  }))}
                  className="w-full"
                  triggerClassName="bg-white/60 backdrop-blur-md border border-white/80 rounded-xl h-[44px] min-h-[44px] text-xs sm:text-sm font-bold text-[#14140f] cursor-pointer hover:bg-white/75 hover:border-[#14140f] focus:border-[#14140f] focus:bg-white/95 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
