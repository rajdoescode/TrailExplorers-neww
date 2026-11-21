"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { POSTCARDS_DATA } from "@/data/postcards";
import { Postcard } from "@/types";
import { useScrollLock } from "@/hooks/useScrollLock";
import { PostcardRow } from "@/components/postcards/PostcardRow";
import { AttractionCard } from "@/components/postcards/AttractionCard";
import { GuideCard } from "@/components/postcards/GuideCard";
import { ReelCard } from "@/components/postcards/ReelCard";
import { PostcardReaderModal } from "@/components/postcards/PostcardReaderModal";
import { PostcardVideoModal } from "@/components/postcards/PostcardVideoModal";
import { ArrowLeft } from "lucide-react";

type CategoryFilter = "all" | "attraction" | "travel_guide" | "field_guide" | "video";

export default function PostcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [activeStory, setActiveStory] = useState<Postcard | null>(null);
  const [activeVideo, setActiveVideo] = useState<Postcard | null>(null);

  // Global reference-counted scroll lock for modals
  useScrollLock(Boolean(activeStory || activeVideo));

  // Partition postcards according to their category / type
  const attractions = useMemo(
    () => POSTCARDS_DATA.filter((p) => p.type === "attraction" || p.category === "Attraction"),
    []
  );

  const travelGuides = useMemo(
    () =>
      POSTCARDS_DATA.filter(
        (p) => p.category === "Travel Guide" || (p.type === "blog" && p.category !== "Field Guide")
      ),
    []
  );

  const fieldGuides = useMemo(
    () => POSTCARDS_DATA.filter((p) => p.category === "Field Guide"),
    []
  );

  const videos = useMemo(
    () =>
      POSTCARDS_DATA.filter(
        (p) => p.type === "reel" || p.type === "video" || p.category === "Instagram Reel" || Boolean(p.video_url)
      ),
    []
  );

  const filterChips: { id: CategoryFilter; label: string; count: number }[] = [
    { id: "all", label: "All", count: attractions.length + travelGuides.length + fieldGuides.length + videos.length },
    { id: "video", label: "Video Reels", count: videos.length },
    { id: "attraction", label: "Attractions", count: attractions.length },
    { id: "travel_guide", label: "Travel Guide", count: travelGuides.length },
    { id: "field_guide", label: "Field Guide", count: fieldGuides.length },
  ];

  const handleCardClick = (postcard: Postcard) => {
    if (postcard.type === "reel" || postcard.video_url || postcard.category === "Instagram Reel") {
      setActiveVideo(postcard);
    } else {
      setActiveStory(postcard);
    }
  };

  // Get current filtered list when a specific category is active
  const activeList = useMemo(() => {
    switch (selectedCategory) {
      case "video":
        return videos;
      case "attraction":
        return attractions;
      case "travel_guide":
        return travelGuides;
      case "field_guide":
        return fieldGuides;
      default:
        return [...videos, ...attractions, ...travelGuides, ...fieldGuides];
    }
  }, [selectedCategory, videos, attractions, travelGuides, fieldGuides]);

  const currentCategoryInfo = filterChips.find((c) => c.id === selectedCategory);

  return (
    <div className="w-full bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <section className="pt-10 sm:pt-14 md:pt-16 pb-6 text-center">
        <Container>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#14140f] tracking-tight font-heading mb-2.5">
            Postcards
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#6b6b63] max-w-xl mx-auto font-medium">
            Perspectives, guides, video reels, and untold stories from the frontier.
          </p>

          {/* Category Chips Bar */}
          <div
            className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pt-6 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-pl-4 select-none cursor-grab active:cursor-grabbing"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x pan-y",
              overscrollBehaviorX: "contain",
              scrollbarWidth: "none",
            }}
          >
            {filterChips.map((chip) => {
              const isActive = selectedCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all duration-200 shrink-0 cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? "bg-[#14140f] text-white border-[#14140f] shadow-xs"
                      : "bg-white text-[#14140f] border-[#e2e2da] hover:border-[#14140f]"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`text-[11px] sm:text-xs font-semibold ${
                      isActive ? "text-white/70" : "text-[#777]"
                    }`}
                  >
                    {chip.count}
                  </span>
                </button>
              );
            })}
            {/* End spacer for chips bar */}
            <div className="w-2 shrink-0 sm:hidden" aria-hidden="true" />
          </div>
        </Container>
      </section>

      {/* Main Browse Area */}
      <Container className="pt-4 sm:pt-6">
        {selectedCategory === "all" ? (
          /* Multi-Row Browse View */
          <div>
            {/* Section 1: Travel Video Reels */}
            {videos.length > 0 && (
              <PostcardRow
                title="Travel Video Reels"
                count={videos.length}
                items={videos}
                categoryKey="video"
                onViewAll={() => setSelectedCategory("video")}
                onCardClick={handleCardClick}
              />
            )}

            {/* Section 2: Attractions */}
            <PostcardRow
              title="Attractions"
              count={attractions.length}
              items={attractions}
              categoryKey="attraction"
              onViewAll={() => setSelectedCategory("attraction")}
              onCardClick={handleCardClick}
            />

            {/* Section 3: Travel Guide */}
            <PostcardRow
              title="Travel Guide"
              count={travelGuides.length}
              items={travelGuides}
              categoryKey="travel_guide"
              onViewAll={() => setSelectedCategory("travel_guide")}
              onCardClick={handleCardClick}
            />

            {/* Section 4: Field Guide */}
            <PostcardRow
              title="Field Guide"
              count={fieldGuides.length}
              items={fieldGuides}
              categoryKey="field_guide"
              onViewAll={() => setSelectedCategory("field_guide")}
              onCardClick={handleCardClick}
            />
          </div>
        ) : (
          /* Filtered Category Grid View */
          <div>
            {/* Breadcrumb / Back button & Title */}
            <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#f0f0ea]">
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6b6b63] hover:text-[#14140f] transition-colors mb-2 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to all postcards</span>
                </button>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f] flex items-baseline gap-2.5 font-heading">
                  <span>{currentCategoryInfo?.label}</span>
                  <span className="text-sm sm:text-base font-semibold text-[#8e8e86] font-sans">
                    ({activeList.length})
                  </span>
                </h2>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {activeList.map((postcard) => {
                if (postcard.type === "reel" || postcard.video_url || postcard.category === "Instagram Reel") {
                  return (
                    <ReelCard
                      key={postcard.id}
                      postcard={postcard}
                      onClick={handleCardClick}
                    />
                  );
                }
                if (selectedCategory === "attraction") {
                  return (
                    <AttractionCard
                      key={postcard.id}
                      postcard={postcard}
                      onClick={handleCardClick}
                    />
                  );
                }
                return (
                  <GuideCard
                    key={postcard.id}
                    postcard={postcard}
                    onClick={handleCardClick}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Container>

      {/* Story Reader Modal */}
      {activeStory && (
        <PostcardReaderModal
          postcard={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}

      {/* Video Reel Modal */}
      {activeVideo && (
        <PostcardVideoModal
          postcard={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
