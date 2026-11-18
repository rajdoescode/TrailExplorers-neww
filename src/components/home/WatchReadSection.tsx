"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Carousel } from "@/components/common/Carousel";
import { PostcardCard } from "@/components/postcards/PostcardCard";
import { Button } from "@/components/ui/Button";
import { POSTCARDS_DATA } from "@/data/postcards";
import { ArrowRight, X } from "lucide-react";
import { Postcard } from "@/types";

export const WatchReadSection: React.FC = () => {
  const [selectedPostcard, setSelectedPostcard] = useState<Postcard | null>(null);

  // Take top 6 visual postcards / reels
  const featuredPostcards = POSTCARDS_DATA.slice(0, 6);

  return (
    <section className="w-full py-12 sm:py-16 bg-[#f6f6f1]" id="watch-read-section">
      <Container>
        <SectionHeading
          eyebrow="STORIES FROM THE ROAD"
          title="Watch & Read"
          subtitle="Cinematic travel films, road reels, and honest field guides written by our expedition leaders."
          action={
            <Button
              href="/postcards"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              All Postcards &amp; Stories
            </Button>
          }
        />

        <Carousel itemClassName="w-[85%] sm:w-[48%] lg:w-[24%]">
          {featuredPostcards.map((postcard) => (
            <PostcardCard
              key={postcard.id}
              postcard={postcard}
              onClick={(p) => setSelectedPostcard(p)}
            />
          ))}
        </Carousel>
      </Container>

      {/* Story Reader Modal */}
      {selectedPostcard && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative border-2 border-[#14140f] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPostcard(null)}
              className="absolute top-4 right-4 p-2 bg-[#f6f6f1] hover:bg-[#d6ff3f] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#14140f]" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#d6ff3f] bg-[#14140f] px-3 py-1 rounded-full inline-block mb-3">
              {selectedPostcard.category || "Himalayan Story"}
            </span>

            <h3 className="text-2xl font-bold text-[#14140f] mb-3">
              {selectedPostcard.title}
            </h3>

            {selectedPostcard.subtitle && (
              <p className="text-sm text-[#6b6b63] mb-4 font-medium italic">
                {selectedPostcard.subtitle}
              </p>
            )}

            <div className="mt-4 text-sm text-[#14140f] leading-relaxed whitespace-pre-line border-t border-gray-100 pt-4">
              {selectedPostcard.content ||
                "A captivating visual journey through the high passes and deep valleys of the Himalayas. Awara Banjara documents every mile with authenticity, capturing untamed trails, starry night camps, and local warmth."}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedPostcard(null)}
              >
                Close Story
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
