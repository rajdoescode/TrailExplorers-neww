"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface TripEmptyStateProps {
  onReset: () => void;
}

export const TripEmptyState: React.FC<TripEmptyStateProps> = ({ onReset }) => {
  return (
    <div className="w-full bg-white/75 backdrop-blur-md rounded-2xl p-12 text-center border border-white/80 my-8 shadow-[0_12px_36px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset]">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#f4f4ec] flex items-center justify-center text-2xl">
        🔍
      </div>
      <h3 className="text-xl font-extrabold text-[#14140f] mb-2">
        No trips found
      </h3>
      <p className="text-sm font-medium text-[#666666] max-w-md mx-auto mb-6">
        No community trips matched your current search and filter criteria. Try
        searching for a different destination or clear your filters to view all trips.
      </p>
      <Button
        type="button"
        onClick={onReset}
        variant="dark"
        size="md"
        className="px-6 py-3 rounded-full bg-[#14140f] text-[#b8ff00] text-sm font-extrabold border-2 border-[#14140f] hover:bg-black transition-all shadow-[0_4px_12px_rgba(20,20,15,0.1)]"
      >
        ↻ Reset All Filters
      </Button>
    </div>
  );
};
