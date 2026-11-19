"use client";

import React, { useState } from "react";

export interface DepartureBatch {
  id?: string | number;
  range: string;
  status?: string;
  price?: string | number;
}

export interface DepartureMonth {
  month: string;
  dates: DepartureBatch[];
}

interface DepartureDatesSectionProps {
  departureDates: DepartureMonth[];
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
    departureDates && departureDates.length > 0
      ? departureDates
      : [
          {
            month: "Available Dates",
            dates: [
              { id: "1", range: "On Request Departure Date", status: "Available", price: String(defaultPrice) },
            ],
          },
        ];

  const [activeMonthIdx, setActiveMonthIdx] = useState(0);
  const [selectedBatchIdx, setSelectedBatchIdx] = useState(0);

  const activeMonth = validMonths[activeMonthIdx] || validMonths[0];
  const currentBatch = activeMonth?.dates?.[selectedBatchIdx] || activeMonth?.dates?.[0];

  const formatPrice = (p: string | number) => {
    if (!p) return "On Request";
    const num = String(p).replace(/[^0-9]/g, "");
    if (!num) return String(p);
    return `₹${Number(num).toLocaleString("en-IN")}`;
  };

  const handleBookBatch = () => {
    if (currentBatch) {
      const price = currentBatch.price ? String(currentBatch.price) : String(defaultPrice);
      onSelectBatchAndBook(currentBatch.range, price);
    }
  };

  return (
    <div id="departure-dates" className="scroll-mt-32 sm:scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
      <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading mb-4">
        Departure Dates
      </h2>

      {/* Month Tabs */}
      {validMonths.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-5 -mx-1 px-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
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
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap min-h-[38px] ${
                  isActive
                    ? "bg-[#d6ff3f] text-[#14140f] border-2 border-[#14140f] shadow-sm"
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
      <div className="flex flex-col gap-2.5 mb-6">
        {activeMonth?.dates?.map((batch, idx) => {
          const isSelected = selectedBatchIdx === idx;
          const displayPrice = batch.price ? formatPrice(batch.price) : formatPrice(defaultPrice);
          const isSoldOut = batch.status === "Sold Out";

          const badgeBg =
            batch.status === "Sold Out"
              ? "bg-[#fee2e2] text-[#b91c1c]"
              : batch.status === "Filling Fast"
              ? "bg-[#fef3c7] text-[#d97706]"
              : "bg-[#dcfce7] text-[#15803d]";

          return (
            <div
              key={batch.id || idx}
              onClick={() => {
                if (!isSoldOut) setSelectedBatchIdx(idx);
              }}
              className={`p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 transition-all ${
                isSoldOut
                  ? "opacity-60 cursor-not-allowed bg-white border border-[#e0e0d8]"
                  : "cursor-pointer"
              } ${
                isSelected
                  ? "border-2 border-[#b8ff00] bg-[#fafef0] shadow-[0_0_12px_rgba(184,255,0,0.35)]"
                  : "border border-[#e0e0d8] bg-white hover:border-[#14140f]/40"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-bold text-[13.5px] sm:text-[15px] text-[#14140f] leading-snug">
                  {batch.range}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-1.5 sm:pt-0 border-t border-[#f2f2ec] sm:border-t-0">
                <span className={`px-2 py-0.5 rounded-md text-[11px] sm:text-[12px] font-bold shrink-0 ${badgeBg}`}>
                  {batch.status || "Available"}
                </span>
                <span className="font-extrabold text-sm sm:text-[15px] text-[#14140f] font-heading shrink-0">
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
        className="w-full bg-[#d6ff3f] hover:bg-[#c7f22e] text-[#14140f] font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl border-2 border-[#14140f] shadow-[0_6px_18px_rgba(214,255,63,0.45)] hover:-translate-y-0.5 active:scale-[0.99] transition-all cursor-pointer font-heading text-center min-h-[48px]"
      >
        BOOK NOW — {currentBatch?.range || "Select Date"}
      </button>
    </div>
  );
}
