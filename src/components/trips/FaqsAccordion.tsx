"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqsAccordionProps {
  faqs: FaqItem[];
}

export function FaqsAccordion({ faqs }: FaqsAccordionProps) {
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  if (!faqs || faqs.length === 0) return null;

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  const toggleFaq = (idx: number) => {
    setOpenMap((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const areAllExpanded = displayedFaqs.every((_, idx) => !!openMap[idx]);

  const toggleAll = () => {
    if (areAllExpanded) {
      setOpenMap({});
    } else {
      const all: Record<number, boolean> = {};
      displayedFaqs.forEach((_, idx) => {
        all[idx] = true;
      });
      setOpenMap(all);
    }
  };

  return (
    <div id="faqs" className="scroll-mt-32 sm:scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading">
          FAQs
        </h2>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-bold text-[#14140f] px-3.5 py-1.5 rounded-lg border border-[#d4d4cb] bg-transparent hover:bg-[#f0f0eb] transition-all cursor-pointer"
        >
          {areAllExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {displayedFaqs.map((faq, idx) => {
          const isOpen = !!openMap[idx];
          return (
            <div
              key={idx}
              className={`border-[1.5px] border-[#e8e8e2] rounded-xl overflow-hidden transition-all ${
                isOpen ? "bg-[#f8f8f5]" : "bg-[#f8f8f5] hover:bg-[#f2f2ed]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-3.5 px-4 sm:px-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
              >
                <span className="font-bold text-sm text-[#14140f] leading-snug">
                  {faq.question}
                </span>
                <span className="shrink-0 text-[#14140f]">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-[14px] text-[#55554d] leading-relaxed pt-1">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show all X questions toggle */}
      {faqs.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 w-full py-3 px-4 text-center text-sm font-bold text-[#14140f] rounded-xl border-[1.5px] border-dashed border-[#d4d4cb] bg-transparent hover:bg-[#f0f0eb] transition-all cursor-pointer"
        >
          {showAll ? "Show fewer questions" : `Show all ${faqs.length} questions`}
        </button>
      )}
    </div>
  );
}
