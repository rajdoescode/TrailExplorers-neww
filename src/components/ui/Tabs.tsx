"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "pill" | "underline";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "pill",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1",
        variant === "underline" ? "border-b border-[#e2e2dc]" : "bg-[#f6f6f1] p-1.5 rounded-full border border-[#e2e2dc]",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        if (variant === "pill") {
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap",
                isActive
                  ? "bg-[#14140f] text-white shadow-sm"
                  : "text-[#6b6b63] hover:text-[#14140f] hover:bg-white/80"
              )}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-extrabold",
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
        }

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap -mb-[2px]",
              isActive
                ? "border-[#14140f] text-[#14140f]"
                : "border-transparent text-[#6b6b63] hover:text-[#14140f]"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span className="text-xs bg-[#f6f6f1] text-[#6b6b63] px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
