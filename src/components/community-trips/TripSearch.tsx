"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface TripSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
}

export const TripSearch: React.FC<TripSearchProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-end gap-2.5 mb-4"
    >
      <div className="flex-1 min-w-[200px]">
        <Input
          id="filterSearch"
          label="SEARCH"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by trip name or destination (e.g. Spiti, Ladakh, Zanskar)..."
          leftIcon={<Search className="w-4 h-4 text-[#6b6b63]" />}
          className="bg-white border-2 border-[#e0e0d8] rounded-xl h-[44px] text-sm font-semibold text-[#14140f] placeholder:text-[#888880] focus:border-[#14140f]"
        />
      </div>
      <Button
        id="filterSearchBtn"
        type="submit"
        variant="dark"
        size="md"
        className="h-[44px] px-6 rounded-xl bg-[#14140f] text-[#b8ff00] border-2 border-[#14140f] font-extrabold hover:bg-black whitespace-nowrap shadow-sm"
        leftIcon={<Search className="w-4 h-4 text-[#b8ff00]" />}
      >
        Search
      </Button>
    </form>
  );
};
