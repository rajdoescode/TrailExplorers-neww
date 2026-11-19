"use client";

import React from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { Postcard } from "@/types";

export interface AttractionCardProps {
  postcard: Postcard;
  onClick?: (postcard: Postcard) => void;
}

export function normalizePostcardImg(url?: string): string {
  if (!url) return "/assets/images/home/hero-poster.jpg";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }
  return `/${url}`;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ postcard, onClick }) => {
  const imgSrc = normalizePostcardImg(postcard.image_url);

  return (
    <article
      onClick={() => onClick && onClick(postcard)}
      className="group relative aspect-[4/5] rounded-[24px] sm:rounded-[26px] overflow-hidden bg-[#2a2a24] shadow-[0_4px_16px_rgba(20,20,15,0.08)] hover:shadow-[0_18px_34px_rgba(20,20,15,0.18)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer select-none"
    >
      <SkeletonImage
        src={imgSrc}
        alt={postcard.title}
        fill
        sizes="(max-width: 640px) 76vw, (max-width: 1080px) 33vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        skeletonClassName="rounded-[24px] sm:rounded-[26px]"
      />

      {/* Dark gradient scrim from bottom to middle */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,8,0.92)] via-[rgba(10,10,8,0.48)] to-transparent pointer-events-none" />

      {/* Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
        <h3 className="text-white font-bold text-base sm:text-[18px] leading-[1.28] line-clamp-3 mb-1.5 drop-shadow-xs group-hover:underline">
          {postcard.title}
        </h3>
        {postcard.subtitle && (
          <p className="text-white/85 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2 m-0 font-normal">
            {postcard.subtitle}
          </p>
        )}
      </div>
    </article>
  );
};
