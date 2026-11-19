"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Check } from "lucide-react";

interface FeaturedReview {
  id: string;
  customer_name: string;
  trip_tag: string;
  trip_name: string;
  trip_url: string;
  rating: number;
  date_text: string;
  review_text: string;
  avatar_url: string;
  has_read_more?: boolean;
}

const FEATURED_HOME_REVIEWS: FeaturedReview[] = [
  {
    id: "rev_1786958542074",
    customer_name: "Samarth Rana",
    trip_tag: "Joined Group Trip",
    trip_name: "Zanskar Valley Expedition with Padum & Drang Drung",
    trip_url: "/tour-packages",
    rating: 5,
    date_text: "Recently",
    review_text:
      "Honestly, Zanskar felt like another world! Standing in front of Gombo Rangzan and doing the hike to Phuktal Monastery were absolute highlights. The roads are rugged, but our trip...",
    avatar_url: "/assets/images/trips/img_1789394320854_download__2_.jpg",
    has_read_more: true,
  },
  {
    id: "rev_201",
    customer_name: "Sachin Kumar",
    trip_tag: "Joined Group Trip",
    trip_name: "Dev Roopa Trek: Path of the Gods Expedition",
    trip_url: "/tour-packages",
    rating: 5,
    date_text: "1 month ago",
    review_text:
      "Best stay for anyone looking for a quiet, beautiful getaway — the whole crew knew the mountains and valleys inside out.",
    avatar_url: "/assets/images/trips/img_1786712111070_WhatsApp_Image_2026-08-14_at_18.13.04.jpg",
  },
  {
    id: "rev_203",
    customer_name: "Divya Sharma",
    trip_tag: "Joined Group Trip",
    trip_name: "Ladakh: High Passes & Blue Waters Expedition",
    trip_url: "/ladakh",
    rating: 5,
    date_text: "1 month ago",
    review_text:
      "I would like to express my sincere appreciation to the Trail Explorers team for their excellent support and guidance throughout the travel process. They were professional, responsive, supportive...",
    avatar_url: "/assets/images/trips/img_1786712094274____3_.jpg",
  },
  {
    id: "rev_204",
    customer_name: "Dhruv Shergill",
    trip_tag: "Joined Solo Trip",
    trip_name: "Spiti : Full Summer Circuit",
    trip_url: "/spiti",
    rating: 5,
    date_text: "1 month ago",
    review_text:
      "The spiti valley road trip with Trail Explorers was very good. It was my first ever solo trip but it did not feel like one as everyone in the group was very welcoming and hospitable...",
    avatar_url: "/assets/images/trips/img_1789394338505_download__1_.jpg",
  },
];

export const ReviewsSection: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="section w-full bg-white py-12 sm:py-16" id="reviews">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Head matching live site */}
        <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14140f] tracking-tight mb-2.5">
              Reviews
            </h2>
            <div className="rating-badges">
              <div className="rating-badge">
                <Star className="w-5 h-5 fill-[#ccff00] text-[#ccff00]" />
                <span>
                  <strong>4.9</strong>
                  <small>Average Rating</small>
                </span>
              </div>
              <div className="rating-badge">
                <Check className="w-5 h-5 text-[#ccff00] stroke-[3]" />
                <span>
                  <strong>240+</strong>
                  <small>Verified Reviews</small>
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/reviews"
            className="font-bold text-sm text-[#14140f] hover:opacity-75 transition-opacity pb-1"
          >
            View All
          </Link>
        </div>

        {/* 2-Column Reviews Grid (4 Cards) matching screenshot */}
        <div className="reviews-grid" id="homeReviewsContainer">
          {FEATURED_HOME_REVIEWS.map((rev) => (
            <article key={rev.id} className="review-card-modern">
              <div className="rev-card-header">
                <div className="rev-avatar-img w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                  <Image
                    src={rev.avatar_url}
                    alt={rev.customer_name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="rev-header-info">
                  <div className="rev-author-name-row">
                    <strong className="rev-author-name">{rev.customer_name}</strong>
                    <span className="rev-trip-tag">{rev.trip_tag}</span>
                  </div>
                  <div className="rev-booked-row">
                    <span className="booked-label">Booked:</span>
                    <Link href={rev.trip_url} className="booked-trip-link">
                      <strong>{rev.trip_name}</strong>
                      <span className="arrow">↗</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rev-rating-date-row">
                <div className="stars flex gap-0.5 text-[#facc15]" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      style={{ width: "16px", height: "16px" }}
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-[#facc15]"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="rev-date-text">{rev.date_text}</span>
              </div>

              <p className="rev-quote-body">
                &ldquo;
                {rev.id === "rev_1786958542074" && expanded[rev.id]
                  ? "Honestly, Zanskar felt like another world! Standing in front of Gombo Rangzan and doing the hike to Phuktal Monastery were absolute highlights. The roads are rugged, but our trip lead and drivers handled everything so smoothly. Warm homestays, great food, and amazing group vibes throughout. Truly grateful to the Trail Explorers team!"
                  : rev.review_text}
                &rdquo;
                {rev.has_read_more && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(rev.id)}
                    className="read-more"
                  >
                    {expanded[rev.id] ? " Show Less" : " Read More"}
                  </button>
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
