import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { REVIEWS_DATA } from "@/data/reviews";
import { Star, CheckCircle, ShieldCheck } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Verified Traveller Testimonials</span>
            </span>
            <Heading level={1} className="text-white text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Customer Stories &amp; Reviews
            </Heading>
            <Paragraph className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
              Read honest stories and memories shared by adventurers who travelled with us across Spiti, Ladakh, Kashmir, and Himachal Pradesh.
            </Paragraph>

            {/* Scorecard */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold text-[#d6ff3f]">4.9</span>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d6ff3f] text-[#d6ff3f]" />
                    ))}
                  </div>
                  <span className="text-xs text-white/70 font-semibold mt-0.5 block">
                    Based on 500+ Google Reviews
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-white bg-white/10 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#2fa84f]" />
                <span>100% Genuine Verified Bookings</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews Grid */}
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS_DATA.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </div>
  );
}
