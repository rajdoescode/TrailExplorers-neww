import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { Review } from "@/types";

interface TripReviewsSectionProps {
  reviews: Review[];
  tripTitle?: string;
}

function normalizeAvatarUrl(url?: string | null): string {
  if (!url || typeof url !== "string") {
    return "/assets/images/reviews/dhruv_shergill_avatar.png";
  }
  const clean = url.trim();
  if (!clean) return "/assets/images/reviews/dhruv_shergill_avatar.png";
  if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("/")) {
    return clean;
  }
  return "/" + clean;
}

export function TripReviewsSection({ reviews, tripTitle }: TripReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section id="reviews" className="scroll-mt-32 sm:scroll-mt-36 trip-reviews-section mt-4 mb-2">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-[#14140f] font-heading">
          Reviews
        </h2>
        <Link
          href="/reviews"
          className="text-[14px] font-bold text-[#14140f] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Sideways-scrolling row on mobile (86% basis so next card peeks), 2-col grid on desktop */}
      <div className="flex md:grid md:grid-cols-2 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory scroll-pl-6">
        {reviews.map((rev, idx) => {
          const bookedTripTitle =
            rev.trip_name || tripTitle || "Spiti Valley Group Trip from Delhi: Winter Expedition (9 Days)";

          return (
            <article
              key={rev.id}
              className={`flex-[0_0_86%] sm:flex-[0_0_80%] md:flex-auto min-w-[280px] bg-white rounded-[22px] border-[1.5px] border-[#e8e8e2] p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:border-[#dcdcd0] transition-all flex flex-col justify-between snap-start ${
                idx === 0 ? "ml-4 sm:ml-0 first:ml-4 sm:first:ml-0" : ""
              } ${
                idx === reviews.length - 1 ? "mr-4 sm:mr-0 last:mr-4 sm:last:mr-0" : ""
              }`}
            >
              <div>
                {/* Header: Avatar, Name + Tag, Booked Title + Arrow */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#e2e2dc] shrink-0 border border-[#ecece5]">
                    <Image
                      src={normalizeAvatarUrl(rev.avatar_url)}
                      alt={rev.customer_name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name + Tag inline */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[15px] sm:text-[16px] font-extrabold text-[#14140f] font-heading leading-tight">
                        {rev.customer_name}
                      </span>
                      {rev.trip_tag && (
                        <span className="text-[12.5px] sm:text-[13px] font-medium text-[#88887c] leading-tight">
                          {rev.trip_tag}
                        </span>
                      )}
                    </div>

                    {/* Booked label */}
                    <span className="text-[12.5px] sm:text-[13px] font-medium text-[#88887c] block mt-1">
                      Booked:
                    </span>

                    {/* Trip title with upward arrow */}
                    <div className="mt-0.5 flex items-start justify-between gap-2">
                      <span className="text-[13.5px] sm:text-[14px] font-extrabold text-[#14140f] leading-snug line-clamp-2">
                        {bookedTripTitle}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#14140f] shrink-0 mt-0.5" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Stars & Date */}
                <div className="flex items-center gap-2.5 my-3">
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <span className="text-[12.5px] sm:text-[13px] font-medium text-[#88887c]">
                    {rev.date_text || "1 month ago"}
                  </span>
                </div>

                {/* Review Quote Text */}
                <p className="text-[13.5px] sm:text-[14px] text-[#3b3b33] leading-relaxed font-normal">
                  &ldquo;{rev.review_text}&rdquo;
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
