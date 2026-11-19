"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { PostcardCard } from "@/components/postcards/PostcardCard";
import { Button } from "@/components/ui/Button";
import { POSTCARDS_DATA } from "@/data/postcards";
import { BookOpen, Film, Compass, X } from "lucide-react";
import { Postcard } from "@/types";

export default function PostcardsPage() {
  const [filterType, setFilterType] = useState<"all" | "reel" | "blog" | "guide">("all");
  const [activeStory, setActiveStory] = useState<Postcard | null>(null);

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
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-[#e2e2dc] py-4 shadow-2xs">
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
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
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
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative border-2 border-[#14140f] max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 p-2 bg-[#f6f6f1] hover:bg-[#d6ff3f] rounded-full transition-colors"
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
