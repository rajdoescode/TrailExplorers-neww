import React from "react";
import Link from "next/link";
import { Star, CheckCircle, ArrowUpRight } from "lucide-react";
import { Review } from "@/types";

export interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Generate initials if no avatar
  const initials = review.customer_name
    ? review.customer_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AB";

  return (
    <div className="bg-white/75 backdrop-blur-md rounded-[18px] p-6 border border-white/80 hover:border-white shadow-[0_8px_30px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_18px_40px_rgba(20,20,15,0.12),0_1px_1px_rgba(255,255,255,1)_inset] hover:bg-white/90 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        {/* Header: Avatar, Name, Rating */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#14140f] text-[#d6ff3f] flex items-center justify-center font-bold text-sm tracking-wider shrink-0 border-2 border-[#14140f]">
              {initials}
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#14140f] leading-snug">
                {review.customer_name}
              </h4>
              <div className="flex items-center gap-1 text-[11px] text-[#6b6b63] font-semibold">
                <CheckCircle className="w-3 h-3 text-[#2fa84f]" />
                <span>Verified Wanderer</span>
                {review.date_text && <span>· {review.date_text}</span>}
              </div>
            </div>
          </div>

          {/* 5-Star Row */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#14140f] text-[#14140f]"
              />
            ))}
          </div>
        </div>

        {/* Review Paragraph */}
        <p className="text-[14px] text-[#14140f]/90 leading-relaxed italic">
          &ldquo;{review.review_text}&rdquo;
        </p>
      </div>

      {/* Booked Trip Tag */}
      {review.trip_name && (
        <div className="pt-4 mt-4 border-t border-[#f0f0eb]">
          <span className="text-[11px] uppercase tracking-wider text-[#6b6b63] font-bold block mb-1">
            Booked Experience
          </span>
          <Link
            href={review.trip_url || "/community-trips"}
            className="group/trip inline-flex items-center gap-1 text-xs font-bold text-[#14140f] hover:text-[#d6ff3f] hover:bg-[#14140f] px-2.5 py-1 rounded-md transition-colors"
          >
            <span className="truncate max-w-[240px]">{review.trip_name}</span>
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          </Link>
        </div>
      )}
    </div>
  );
};
