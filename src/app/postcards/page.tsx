"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { PostcardCard } from "@/components/postcards/PostcardCard";
import { Button } from "@/components/ui/Button";
import { POSTCARDS_DATA } from "@/data/postcards";
import { BookOpen, Film, Compass, X } from "lucide-react";
import { Postcard } from "@/types";
import { useScrollLock } from "@/hooks/useScrollLock";

export default function PostcardsPage() {
  const [filterType, setFilterType] = useState<"all" | "reel" | "blog" | "guide">("all");
  const [activeStory, setActiveStory] = useState<Postcard | null>(null);

  // Global reference-counted scroll lock for story reader modal
  useScrollLock(Boolean(activeStory));

  const filtered = useMemo(() => {
    if (filterType === "all") return POSTCARDS_DATA;
    return POSTCARDS_DATA.filter((p) => p.type === filterType);
  }, [filterType]);

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Himalayan Field Journal</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Postcards &amp; Field Guides
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              Expedition dispatches, mountain route guides, cinematic travel reels, and honest field insights written by our leaders on the road.
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[64px] sm:top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-[#e2e2dc] py-3 sm:py-4 shadow-2xs">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: "all", label: "All Dispatches" },
              { id: "reel", label: "Reels & Documentaries" },
              { id: "blog", label: "Stories & Blogs" },
              { id: "guide", label: "Field Guides & Tips" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full min-h-[44px] transition-all duration-200 shrink-0 cursor-pointer active:scale-95 ${
                  filterType === tab.id
                    ? "bg-[#14140f] text-[#d6ff3f] shadow-xs"
                    : "bg-[#f6f6f1] text-[#14140f] hover:bg-[#e4e4dd]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Grid */}
      <Container className="py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((postcard) => (
            <PostcardCard
              key={postcard.id}
              postcard={postcard}
              onClick={(p) => setActiveStory(p)}
            />
          ))}
        </div>
      </Container>

      {/* Modal */}
      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeStory.title}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 touch-none overscroll-contain transition-opacity"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveStory(null);
          }}
        >
          <div className="bg-white rounded-t-[28px] sm:rounded-2xl max-w-2xl w-full p-5 sm:p-8 relative border-t-2 sm:border-2 border-[#14140f] max-h-[88dvh] sm:max-h-[calc(100dvh-32px)] overflow-y-auto overscroll-contain touch-pan-y shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] sm:pb-8">
            {/* Mobile drag handle */}
            <div className="w-10 h-1 bg-[#d5d5cd] rounded-full mx-auto mb-3 block sm:hidden" />

            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center bg-[#f6f6f1] hover:bg-[#d6ff3f] active:scale-95 rounded-full transition-all cursor-pointer"
              aria-label="Close story reader"
            >
              <X className="w-5 h-5 text-[#14140f]" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#d6ff3f] bg-[#14140f] px-3 py-1 rounded-full inline-block mb-3">
              {activeStory.category || "Himalayan Story"}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14140f] mb-3">
              {activeStory.title}
            </h3>

            {activeStory.subtitle && (
              <p className="text-sm text-[#6b6b63] mb-4 font-medium italic">
                {activeStory.subtitle}
              </p>
            )}

            <div className="mt-4 text-sm text-[#14140f] leading-relaxed whitespace-pre-line border-t border-gray-100 pt-4">
              {activeStory.content ||
                "A captivating field report documenting genuine high-altitude experiences across the Indian Himalayas. Trail Explorers champions conscious, slow-paced exploration and authentic human connection."}
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setActiveStory(null)}>
                Close Reader
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
