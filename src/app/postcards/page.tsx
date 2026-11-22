"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Play,
  Camera,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { POSTCARDS_DATA } from "@/data/postcards";
import { Postcard } from "@/types";
import { useScrollLock } from "@/hooks/useScrollLock";
import { PostcardCard } from "@/components/postcards/PostcardCard";
import { PostcardReaderModal } from "@/components/postcards/PostcardReaderModal";
import { PostcardVideoModal } from "@/components/postcards/PostcardVideoModal";
import { PageHeroSection } from "@/components/common/PageHeroSection";
import { NeonHighlight } from "@/components/common/NeonHighlight";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "video" | "attraction" | "travel_guide" | "field_guide";

export default function PostcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [activeStory, setActiveStory] = useState<Postcard | null>(null);
  const [activeVideo, setActiveVideo] = useState<Postcard | null>(null);

  // Global reference-counted scroll lock for modals
  useScrollLock(Boolean(activeStory || activeVideo));

  // Partition postcards
  const attractions = useMemo(
    () =>
      POSTCARDS_DATA.filter(
        (p) => p.type === "attraction" || p.category === "Attraction"
      ),
    []
  );

  const travelGuides = useMemo(
    () =>
      POSTCARDS_DATA.filter(
        (p) =>
          p.category === "Travel Guide" ||
          (p.type === "blog" && p.category !== "Field Guide")
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
        (p) =>
          p.type === "reel" ||
          p.type === "video" ||
          p.category === "Instagram Reel" ||
          Boolean(p.video_url)
      ),
    []
  );

  const filterChips: {
    id: CategoryFilter;
    label: string;
    icon: React.ReactNode;
    count: number;
  }[] = [
    {
      id: "all",
      label: "All",
      icon: null,
      count:
        attractions.length +
        travelGuides.length +
        fieldGuides.length +
        videos.length,
    },
    {
      id: "video",
      label: "Video Reels",
      icon: <Play className="w-3.5 h-3.5 fill-current" />,
      count: videos.length,
    },
    {
      id: "attraction",
      label: "Attractions",
      icon: <Camera className="w-3.5 h-3.5" />,
      count: attractions.length,
    },
    {
      id: "travel_guide",
      label: "Travel Guide",
      icon: <BookOpen className="w-3.5 h-3.5" />,
      count: travelGuides.length,
    },
    {
      id: "field_guide",
      label: "Field Guide",
      icon: <Compass className="w-3.5 h-3.5" />,
      count: fieldGuides.length,
    },
  ];

  const handleCardClick = (postcard: Postcard) => {
    if (
      postcard.type === "reel" ||
      postcard.video_url ||
      postcard.category === "Instagram Reel"
    ) {
      setActiveVideo(postcard);
    } else {
      setActiveStory(postcard);
    }
  };

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
        return POSTCARDS_DATA;
    }
  }, [selectedCategory, videos, attractions, travelGuides, fieldGuides]);

  return (
    <div className="w-full bg-[#fbfbf8] text-[#14140f] min-h-screen relative">
      {/* Single Full-Page Fixed Background - Soft and luminous */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/hero_pack/Postcards/03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP/02_Postcards_on_Rocky_Ledge_mobile_fade.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/hero_pack/Postcards/01_DESKTOP_1920x900_WHITE_FADE_WEBP/02_Postcards_on_Rocky_Ledge_desktop.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[right_top] opacity-75 brightness-[1.06] contrast-[0.95]"
          />
        </picture>
        {/* Soft light overlay so background is subtle, bright and light */}
        <div className="absolute inset-0 bg-white/25 pointer-events-none" />
      </div>

      {/* Himalayan Hero Header with Physical Postcards on Rock Ledge WebP */}
      <PageHeroSection
        title={<NeonHighlight>Postcards</NeonHighlight>}
      >
        {/* Floating Category Pills Bar on the Hero Image with Glassmorphism */}
        <div className="w-full bg-white/45 backdrop-blur-xl sm:backdrop-blur-2xl p-4 sm:p-5 rounded-[22px] sm:rounded-[26px] border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.85)_inset,0_0_0_1px_rgba(255,255,255,0.35)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            {/* Category Bar Heading */}
            <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#14140f] font-heading shrink-0">
              BROWSE BY CATEGORY
            </span>

            {/* Category Pills List */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-2 px-2 py-0.5">
              {filterChips.map((chip) => {
                const isActive = selectedCategory === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setSelectedCategory(chip.id)}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer select-none active:scale-95 whitespace-nowrap",
                      isActive
                        ? "bg-[#14140f] text-[#d6ff3f] border border-[#14140f] shadow-sm"
                        : "bg-white/55 backdrop-blur-md text-[#2a2a24] border border-white/70 hover:text-[#14140f] hover:bg-white/85 shadow-xs"
                    )}
                  >
                    {chip.icon}
                    <span>{chip.label}</span>
                    <span
                      className={cn(
                        "text-[11px] font-semibold ml-0.5",
                        isActive ? "text-[#d6ff3f]/80" : "text-[#7a7a72]"
                      )}
                    >
                      ({chip.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PageHeroSection>

      <Container className="relative z-10 pt-4 sm:pt-6">
        {/* Postcards Cards Grid */}
        <div id="postcardsContainer" className="pb-4 sm:pb-6">
          <SectionHeader
            title={
              selectedCategory === "all"
                ? "Latest Postcards"
                : filterChips.find((c) => c.id === selectedCategory)?.label || "Postcards"
            }
            viewAllText={selectedCategory !== "all" ? "View All Postcards" : undefined}
            onViewAllClick={() => setSelectedCategory("all")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {activeList.map((postcard) => (
              <PostcardCard
                key={postcard.id}
                postcard={postcard}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
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
