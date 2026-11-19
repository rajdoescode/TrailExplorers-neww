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
    <div id="reviews" className="scroll-mt-32 sm:scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading">
          Reviews
        </h2>
        <Link
          href="/reviews"
          className="text-xs sm:text-sm font-bold text-[#14140f] hover:underline flex items-center gap-1"
        >
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {reviews.map((rev) => (
          <article
            key={rev.id}
            className="p-5 sm:p-6 rounded-xl border border-[#e2e2dc] bg-[#fafaf7] flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar, Name, Tag */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#e2e2dc] shrink-0 border border-[#c4c4bc]">
                  <Image
                    src={normalizeAvatarUrl(rev.avatar_url)}
                    alt={rev.customer_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-[#14140f]">
                      {rev.customer_name}
                    </strong>
                    {rev.trip_tag && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#e8e8e2] text-[#6b6b63]">
                        {rev.trip_tag}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#6b6b63] truncate max-w-[220px] sm:max-w-[280px]">
                    <span className="font-semibold">Booked:</span>{" "}
                    <span className="text-[#14140f]">{rev.trip_name || tripTitle || "Himalayan Expedition"}</span>
                  </div>
                </div>
              </div>

              {/* Stars & Date */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5 text-[#facc15]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#facc15] text-[#facc15]" />
                  ))}
                </div>
                <span className="text-xs text-[#8e8e84]">
                  {rev.date_text || "1 month ago"}
                </span>
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-[#4a4a42] leading-relaxed italic">
                &ldquo;{rev.review_text}&rdquo;
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
