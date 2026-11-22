"use client";

import React, { useState, useEffect } from "react";
import { PackingCategory } from "@/lib/trip-helpers";

interface PackingListSectionProps {
  categories: PackingCategory[];
  tripId: string | number;
}

export function PackingListSection({ categories, tripId }: PackingListSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  // Start with all categories collapsed by default
  const [collapsedCategories, setCollapsedCategories] = useState<Record<number, boolean>>({});

  const totalItemsCount = categories.reduce((sum, cat) => sum + cat.items.length, 0);

  // Load from localStorage on mount (using trailexplorers_packed_ prefix)
  useEffect(() => {
    try {
      const storageKey = `trailexplorers_packed_${tripId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const keys: string[] = JSON.parse(stored);
        const map: Record<string, boolean> = {};
        keys.forEach((k) => {
          map[k] = true;
        });
        setCheckedItems(map);
      }
    } catch (err) {
      console.error("Failed to load packing list state", err);
    }
  }, [tripId]);

  const toggleItem = (itemKey: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [itemKey]: !prev[itemKey] };
      try {
        const storageKey = `trailexplorers_packed_${tripId}`;
        const activeKeys = Object.keys(updated).filter((k) => updated[k]);
        localStorage.setItem(storageKey, JSON.stringify(activeKeys));
      } catch (err) {
        console.error("Failed to save packing list state", err);
      }
      return updated;
    });
  };

  const toggleCategory = (idx: number) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Check if all are collapsed
  const isAnyExpanded = categories.some((_, idx) => collapsedCategories[idx] === false);

  const toggleAll = () => {
    if (isAnyExpanded) {
      // Collapse all
      const all: Record<number, boolean> = {};
      categories.forEach((_, idx) => {
        all[idx] = true; // true means collapsed
      });
      setCollapsedCategories(all);
    } else {
      // Expand all
      const all: Record<number, boolean> = {};
      categories.forEach((_, idx) => {
        all[idx] = false; // false means open
      });
      setCollapsedCategories(all);
    }
  };

  const unpackAll = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem(`trailexplorers_packed_${tripId}`);
    } catch {}
  };

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const progressRatio = totalItemsCount > 0 ? totalChecked / totalItemsCount : 0;
  const isAllPacked = totalItemsCount > 0 && totalChecked === totalItemsCount;

  return (
    <div
      id="what-to-pack"
      className="scroll-mt-32 sm:scroll-mt-36 bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/80 shadow-[0_12px_36px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] packing-card"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading mb-1">
            What to Pack
          </h2>
          <p className="text-xs sm:text-[13.5px] text-[#6b6b63] mb-3">
            Tick things off as they go in your bag. We&apos;ll remember your list on this device.
          </p>
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center text-xs font-bold text-[#14140f] px-3.5 py-1.5 rounded-lg border border-[#d4d4cb] bg-transparent hover:bg-[#f0f0eb] transition-all cursor-pointer"
          >
            {isAnyExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {/* Circular Donut Progress Meter (Exact trailexplorers.in style) */}
        <div
          className={`shrink-0 w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rounded-full flex flex-col items-center justify-center transition-transform ${
            isAllPacked ? "scale-105" : ""
          }`}
          style={{
            background: `radial-gradient(closest-side, #ffffff 78%, transparent 80%), conic-gradient(#d6ff3f ${
              progressRatio * 360
            }deg, #ecece4 0)`,
          }}
          role="img"
          aria-label={`${totalChecked} of ${totalItemsCount} items packed`}
        >
          <span className="text-[20px] sm:text-[22px] leading-none select-none" aria-hidden="true">
            🎒
          </span>
          <span className="text-[11px] sm:text-[12px] text-[#6b6b63] font-semibold mt-0.5 leading-none">
            <strong className="text-[#14140f] text-[13px] sm:text-[14px] font-extrabold">{totalChecked}</strong>
            /{totalItemsCount}
          </span>
        </div>
      </div>

      {/* Categories Grid (Stitched Pouches) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
        {categories.map((cat, catIdx) => {
          // If not in state, default to collapsed (true)
          const isCollapsed = collapsedCategories[catIdx] !== false;
          const groupCheckedCount = cat.items.filter((it) => !!checkedItems[`${cat.category}|${it.name}`.toLowerCase()]).length;
          const isGroupComplete = cat.items.length > 0 && groupCheckedCount === cat.items.length;

          return (
            <div
              key={cat.category}
              className={`relative bg-[#f6f6f1] rounded-[18px] p-4 pt-6 transition-all ${
                isCollapsed ? "pb-4" : "pb-5"
              }`}
            >
              {/* Inner dashed stitching */}
              <div
                className="absolute inset-1.5 border-[1.5px] border-dashed border-[#d4d4cb] rounded-[13px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Rotated Black Pill Tag */}
              <button
                type="button"
                onClick={() => toggleCategory(catIdx)}
                className="absolute -top-3 left-4 inline-flex items-center gap-1.5 bg-[#14140f] text-[#d6ff3f] text-[13px] font-bold px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(20,20,15,0.15)] -rotate-2 hover:rotate-0 hover:-translate-y-0.5 transition-transform cursor-pointer select-none z-10"
                aria-expanded={!isCollapsed}
              >
                <span aria-hidden="true">{cat.icon}</span>
                <span>{cat.category}</span>
                <span className="bg-[#d6ff3f] text-[#14140f] rounded-full text-[11px] font-extrabold px-1.5 py-0 min-w-[18px] text-center">
                  {cat.items.length}
                </span>
                {/* Chevron */}
                <span
                  className={`w-1.5 h-1.5 border-r-2 border-b-2 border-current transition-transform ml-0.5 ${
                    isCollapsed ? "translate-y-[-1px] rotate-45" : "translate-y-[1px] -rotate-[135deg]"
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Summary shown when collapsed */}
              {isCollapsed ? (
                <div
                  onClick={() => toggleCategory(catIdx)}
                  className="mt-2 text-[13.5px] text-[#6b6b63] cursor-pointer hover:text-[#14140f] transition-colors select-none pl-1"
                >
                  {isGroupComplete ? (
                    <span className="text-[#14140f] font-bold">
                      <span className="text-[#a9cc2a]">✓ </span>
                      {cat.items.length} of {cat.items.length} packed
                    </span>
                  ) : (
                    <span>
                      <strong className="text-[#14140f] font-semibold">{groupCheckedCount}</strong> of {cat.items.length} packed
                    </span>
                  )}
                </div>
              ) : (
                /* Items List shown when expanded */
                <ul className="mt-2 space-y-1 relative z-10">
                  {cat.items.map((it) => {
                    const key = `${cat.category}|${it.name}`.toLowerCase();
                    const isChecked = !!checkedItems[key];

                    return (
                      <li key={it.name}>
                        <label
                          onClick={() => toggleItem(key)}
                          className="flex items-center gap-2.5 p-1.5 rounded-[10px] hover:bg-[rgba(214,255,63,0.22)] transition-colors cursor-pointer select-none group"
                        >
                          {/* Custom 20x20px Checkbox */}
                          <div
                            className={`w-5 h-5 rounded-[6px] border-2 border-[#14140f] flex items-center justify-center shrink-0 transition-colors ${
                              isChecked ? "bg-[#d6ff3f]" : "bg-white"
                            }`}
                          >
                            {isChecked && (
                              <svg
                                viewBox="0 0 24 24"
                                className="w-3.5 h-3.5 stroke-[#14140f] fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>

                          {/* Item Icon */}
                          <span
                            className={`text-[17px] leading-none transition-all ${
                              isChecked ? "scale-90 opacity-60 -rotate-6" : ""
                            }`}
                            aria-hidden="true"
                          >
                            {it.icon || "✨"}
                          </span>

                          {/* Item Text */}
                          <span
                            className={`text-[14px] leading-tight transition-colors ${
                              isChecked
                                ? "text-[#9a9a90] line-through decoration-[#a9cc2a] decoration-2"
                                : "text-[#33332c]"
                            }`}
                          >
                            {it.name}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer controls: All packed banner or Unpack all button */}
      {(totalChecked > 0 || isAllPacked) && (
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-[#f0f0eb]">
          {isAllPacked ? (
            <p className="text-[14px] font-bold text-[#14140f] bg-[#d6ff3f] px-3.5 py-1.5 rounded-full shadow-sm animate-pulse">
              All packed. The mountains are waiting!
            </p>
          ) : (
            <div />
          )}

          {totalChecked > 0 && (
            <button
              type="button"
              onClick={unpackAll}
              className="text-xs font-semibold text-[#6b6b63] hover:text-[#14140f] underline ml-auto cursor-pointer"
            >
              Unpack all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
