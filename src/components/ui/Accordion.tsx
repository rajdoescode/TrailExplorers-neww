"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  badge?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([items[0]?.id].filter(Boolean)));

  const toggle = (id: string) => {
    const next = new Set(openIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (!allowMultiple) next.clear();
      next.add(id);
    }
    setOpenIds(next);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-[18px] border-2 transition-all overflow-hidden bg-white shadow-xs",
              isOpen ? "border-[#14140f]" : "border-[#e2e2dc] hover:border-[#14140f]"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left select-none"
            >
              <div className="flex items-center gap-2.5 pr-4">
                <span className="text-sm font-extrabold text-[#14140f] font-heading">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#f6f6f1] text-[#14140f]">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#14140f] transition-transform duration-200 flex-shrink-0",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs text-[#6b6b63] leading-relaxed border-t border-[#e2e2dc]/60">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
