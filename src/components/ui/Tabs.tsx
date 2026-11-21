"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "pill" | "underline" | "card";
  className?: string;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "pill",
  className,
  fullWidth = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = -1;
    if (e.key === "ArrowRight") {
      nextIdx = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIdx = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = tabs.length - 1;
    }

    if (nextIdx >= 0 && !tabs[nextIdx].disabled) {
      e.preventDefault();
      onChange(tabs[nextIdx].id);
    }
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 select-none",
        variant === "underline" && "border-b-2 border-[#e2e2dc] gap-2 py-0",
        variant === "pill" && "bg-[#f6f6f1] p-1.5 rounded-full border border-[#e2e2dc]",
        variant === "card" && "bg-white p-1 rounded-2xl border-2 border-[#e2e2dc] shadow-xs gap-1",
        fullWidth && "w-full justify-between",
        className
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;

        // 1. Underline Style
        if (variant === "underline") {
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap -mb-[2px] cursor-pointer",
                isActive
                  ? "border-[#14140f] text-[#14140f]"
                  : "border-transparent text-[#6b6b63] hover:text-[#14140f]",
                tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
                fullWidth && "flex-1 justify-center"
              )}
            >
              {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-extrabold",
                    isActive
                      ? "bg-[#14140f] text-white"
                      : "bg-[#f6f6f1] text-[#6b6b63]"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        // 2. Card / Segmented Style
        if (variant === "card") {
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer",
                isActive
                  ? "bg-[#14140f] text-white shadow-xs"
                  : "text-[#6b6b63] hover:text-[#14140f] hover:bg-[#f6f6f1]",
                tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
                fullWidth && "flex-1 justify-center"
              )}
            >
              {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md font-extrabold",
                    isActive
                      ? "bg-[#d6ff3f] text-[#14140f]"
                      : "bg-[#f6f6f1] text-[#14140f]"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        // 3. Pill Style (Default)
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer",
              isActive
                ? "bg-[#14140f] text-white shadow-sm"
                : "text-[#6b6b63] hover:text-[#14140f] hover:bg-white/80",
              tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
              fullWidth && "flex-1 justify-center"
            )}
          >
            {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-extrabold",
                  isActive
                    ? "bg-[#d6ff3f] text-[#14140f]"
                    : "bg-[#e2e2dc] text-[#14140f]"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
