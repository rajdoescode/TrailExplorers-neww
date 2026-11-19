"use client";

import React, { useState, useEffect } from "react";
import { PackingCategory } from "@/lib/trip-helpers";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface PackingListSectionProps {
  categories: PackingCategory[];
  tripId: string | number;
}

export function PackingListSection({ categories, tripId }: PackingListSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

  // Compute total items count
  const totalItemsCount = categories.reduce((sum, cat) => sum + cat.items.length, 0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`packing_trip_${tripId}`);
      if (stored) {
        setCheckedItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load packing list state", err);
    }
  }, [tripId]);

  const toggleItem = (itemKey: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [itemKey]: !prev[itemKey] };
      try {
        localStorage.setItem(`packing_trip_${tripId}`, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save packing list state", err);
      }
      return updated;
    });
  };

  const toggleCategory = (idx: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const areAllExpanded = categories.every((_, idx) => !!expandedCategories[idx]);

  const toggleAll = () => {
    if (areAllExpanded) {
      setExpandedCategories({});
    } else {
      const all: Record<number, boolean> = {};
      categories.forEach((_, idx) => {
        all[idx] = true;
      });
      setExpandedCategories(all);
    }
  };

  // Count total checked items
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div id="what-to-pack" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#f0f0eb]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading">
            What to Pack
          </h2>
          <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
            Tick things off as they go in your bag. We&apos;ll remember your list on this device.
          </p>
          <button
            type="button"
            onClick={toggleAll}
            className="mt-2.5 inline-flex items-center text-xs font-bold text-[#14140f] hover:text-black px-3 py-1.5 rounded-lg border border-[#e2e2dc] bg-[#fafaf7] hover:bg-[#f0f0ea] transition-all cursor-pointer"
          >
            {areAllExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {/* Packed Progress Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-2xl border border-[#e2e2dc] bg-[#fafaf7] shadow-sm">
          <span className="text-2xl" role="img" aria-label="Backpack">
            🎒
          </span>
          <div className="flex flex-col text-left">
            <span className="text-xs text-[#6b6b63] font-semibold">Packed</span>
            <span className="text-sm font-extrabold text-[#14140f]">
              <strong className="text-[#2fa84f]">{totalChecked}</strong> / {totalItemsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {categories.map((cat, catIdx) => {
          const isExpanded = !!expandedCategories[catIdx];
          const catCheckedCount = cat.items.filter((it) => !!checkedItems[`${catIdx}_${it.name}`]).length;

          return (
            <div
              key={cat.category}
              className="border border-[#e2e2dc] rounded-xl overflow-hidden transition-all bg-[#fafaf7]/50"
            >
              {/* Category Header Card */}
              <button
                type="button"
                onClick={() => toggleCategory(catIdx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-[#f0f0ea] transition-colors cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      {cat.icon}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-[#14140f]">
                      {cat.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#14140f] text-[#d6ff3f] text-[11px] font-extrabold">
                      {cat.items.length}
                    </span>
                  </div>
                  <span className="text-xs text-[#6b6b63] font-medium pl-7">
                    {catCheckedCount} of {cat.items.length} packed
                  </span>
                </div>

                <div className="shrink-0 text-[#6b6b63]">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#14140f]" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Items List */}
              {isExpanded && (
                <div className="p-4 pt-2 bg-white border-t border-[#e2e2dc] flex flex-col gap-2.5">
                  {cat.items.map((it) => {
                    const itemKey = `${catIdx}_${it.name}`;
                    const isChecked = !!checkedItems[itemKey];

                    return (
                      <label
                        key={it.name}
                        onClick={() => toggleItem(itemKey)}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#fafaf7] transition-colors cursor-pointer group select-none"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isChecked
                              ? "bg-[#2fa84f] border-[#2fa84f] text-white"
                              : "border-[#c4c4bc] bg-white group-hover:border-[#14140f]"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        {it.icon && (
                          <span className="text-sm shrink-0" aria-hidden="true">
                            {it.icon}
                          </span>
                        )}
                        <span
                          className={`text-xs sm:text-sm leading-relaxed transition-all ${
                            isChecked
                              ? "text-[#8e8e84] line-through"
                              : "text-[#14140f] font-medium"
                          }`}
                        >
                          {it.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
