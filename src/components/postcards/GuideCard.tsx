"use client";

import React from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { Postcard } from "@/types";
import { normalizePostcardImg } from "./AttractionCard";

export interface GuideCardProps {
  postcard: Postcard;
  onClick?: (postcard: Postcard) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ postcard, onClick }) => {
  const imgSrc = normalizePostcardImg(postcard.image_url);
  const authorAvatar = postcard.author_avatar ? normalizePostcardImg(postcard.author_avatar) : null;
  const authorName = postcard.author || "Team Trail Explorers";
  const readTime = postcard.read_time || "5 min read";

  return (
    <article
      onClick={() => onClick && onClick(postcard)}
      className="group bg-white/75 backdrop-blur-md rounded-[22px] border border-white/80 hover:border-white shadow-[0_8px_30px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_18px_40px_rgba(20,20,15,0.12),0_1px_1px_rgba(255,255,255,1)_inset] hover:bg-white/90 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer select-none h-full"
    >
      {/* Top 4:3 Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f6f1]">
        <SkeletonImage
          src={imgSrc}
          alt={postcard.title}
          fill
          sizes="(max-width: 640px) 76vw, (max-width: 1080px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          skeletonClassName="rounded-t-[22px]"
        />
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Author Row */}
          <div className="flex items-center gap-2 mb-2.5">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover shrink-0 border border-[#e2e2dc]"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-bold text-[10px] shrink-0">
                ✦
              </div>
            )}
            <span className="text-xs font-semibold text-[#6b6b63] truncate">
              {authorName} · {readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] sm:text-base font-bold text-[#14140f] leading-snug line-clamp-2 group-hover:underline">
            {postcard.title}
          </h3>

          {/* Subtitle / Excerpt */}
          {postcard.subtitle && (
            <p className="text-xs sm:text-[13px] text-[#6b6b63] line-clamp-2 mt-1.5 leading-relaxed font-normal">
              {postcard.subtitle}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
