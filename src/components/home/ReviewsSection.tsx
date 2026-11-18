import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle, Quote } from "lucide-react";
import { REVIEWS_DATA } from "@/data/reviews";

export const ReviewsSection: React.FC = () => {
  const reviews = REVIEWS_DATA.slice(0, 6);

  return (
    <section className="w-full py-12 sm:py-16 bg-[#f6f6f1]" id="reviews">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Head */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0 mb-3">
              Reviews
            </h2>
            <div className="flex items-center gap-3.5 flex-wrap">
              {/* Badge 1: Average Rating */}
              <div className="bg-[#14140f] text-white rounded-full px-5 py-3 inline-flex items-center gap-3 shadow-md">
                <Star className="w-5 h-5 fill-[#d6ff3f] text-[#d6ff3f]" />
                <span className="flex flex-col text-left">
                  <strong className="text-lg font-extrabold leading-none text-white">4.9</strong>
                  <small className="text-[11px] font-semibold text-white/70">Average Rating</small>
                </span>
              </div>

              {/* Badge 2: Verified Reviews */}
              <div className="bg-[#14140f] text-white rounded-full px-5 py-3 inline-flex items-center gap-3 shadow-md">
                <CheckCircle className="w-5 h-5 text-[#d6ff3f]" />
                <span className="flex flex-col text-left">
                  <strong className="text-lg font-extrabold leading-none text-white">240+</strong>
                  <small className="text-[11px] font-semibold text-white/70">Verified Reviews</small>
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/reviews"
            className="font-bold text-sm text-[#14140f] hover:underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-[20px] p-6 shadow-sm border border-[#e6e6df] flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3 text-[#d6ff3f]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#14140f] text-[#14140f]"
                    />
                  ))}
                </div>

                <p className="text-[14.5px] text-[#3d3d36] leading-relaxed line-clamp-4 font-normal">
                  &ldquo;{rev.review_text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
                  <Image
                    src={rev.avatar_url || "/assets/images/reviews/faiz.jpg"}
                    alt={rev.customer_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#14140f] truncate m-0">
                    {rev.customer_name}
                  </h4>
                  <span className="text-xs text-[#6b6b63] truncate block">
                    {rev.trip_name || "Verified Traveler"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
