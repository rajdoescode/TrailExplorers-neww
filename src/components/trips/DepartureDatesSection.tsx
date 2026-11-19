"use client";

import React, { useState } from "react";
import { formatPrice } from "@/lib/utils";

interface BatchItem {
  id?: string;
  range?: string;
  startDate?: string;
  status?: string;
  price?: string | number;
}

interface MonthDeparture {
  month: string;
  dates: BatchItem[];
}

interface DepartureDatesSectionProps {
  departureDates?: MonthDeparture[];
  defaultPrice: string | number;
  onSelectBatchAndBook: (batchDate: string, price: string) => void;
}

export function DepartureDatesSection({
  departureDates,
  defaultPrice,
  onSelectBatchAndBook,
}: DepartureDatesSectionProps) {
  // Normalize batches
  const validMonths =
    Array.isArray(departureDates) && departureDates.length > 0
      ? departureDates
      : [
          {
            month: "Upcoming Batches",
            dates: [
              {
                id: "b_req",
                range: "On Request Departure Date",
                status: "Available",
                price: defaultPrice,
              },
            ],
          },
        ];

  const [activeMonthIdx, setActiveMonthIdx] = useState(0);
  const activeMonth = validMonths[activeMonthIdx] || validMonths[0];

  const [selectedBatchIdx, setSelectedBatchIdx] = useState(0);
  const currentBatch = activeMonth?.dates?.[selectedBatchIdx] || activeMonth?.dates?.[0];

  const handleBookBatch = () => {
    const batchLabel = currentBatch?.range || "On Request Departure Date";
    const batchPrice = currentBatch?.price ? String(currentBatch.price) : String(defaultPrice);
    onSelectBatchAndBook(batchLabel, batchPrice);
  };

  return (
    <div id="departure-dates" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
      <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading mb-4">
        Departure Dates
      </h2>

      {/* Month Tabs */}
      {validMonths.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {validMonths.map((m, idx) => {
            const isActive = activeMonthIdx === idx;
            return (
              <button
                key={m.month}
                type="button"
                onClick={() => {
                  setActiveMonthIdx(idx);
                  setSelectedBatchIdx(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#d6ff3f] text-[#14140f] border border-[#14140f] shadow-sm"
                    : "bg-[#f6f6f1] text-[#6b6b63] hover:text-[#14140f] hover:bg-[#e8e8e2] border border-[#e2e2dc]"
                }`}
              >
                {m.month}
              </button>
            );
          })}
        </div>
      )}

      {/* Date Batches List */}
      <div className="flex flex-col gap-3 mb-6">
        {activeMonth?.dates?.map((batch, idx) => {
          const isSelected = selectedBatchIdx === idx;
          const displayPrice = batch.price ? formatPrice(batch.price) : formatPrice(defaultPrice);

          return (
            <div
              key={batch.id || idx}
              onClick={() => setSelectedBatchIdx(idx)}
              className={`p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                isSelected
                  ? "border-[#14140f] bg-[#fafaf7] shadow-sm"
                  : "border-[#e2e2dc] hover:border-[#14140f]/40 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-[#14140f]" : "border-[#c4c4bc]"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#14140f]" />}
                </div>
                <span className="font-extrabold text-sm sm:text-base text-[#14140f]">
                  {batch.range}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-[#e8f7ee] text-[#1b7e3f] text-xs font-bold">
                  {batch.status || "Available"}
                </span>
                <span className="font-extrabold text-sm sm:text-base text-[#14140f] font-heading">
                  {displayPrice}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOOK NOW Action Button */}
      <button
        type="button"
        onClick={handleBookBatch}
        className="w-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl border border-[#14140f] shadow-lime-btn transition-all cursor-pointer font-heading text-center"
      >
        BOOK NOW — {currentBatch?.range || "Select Date"}
      </button>
    </div>
  );
}
