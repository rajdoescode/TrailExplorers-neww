"use client";

import React from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { Play } from "lucide-react";
import { Postcard } from "@/types";
import { normalizePostcardImg } from "./AttractionCard";

export interface ReelCardProps {
  postcard: Postcard;
  onClick?: (postcard: Postcard) => void;
}

export const ReelCard: React.FC<ReelCardProps> = ({ postcard, onClick }) => {
  const imgSrc = normalizePostcardImg(postcard.image_url);
  const watchTime = postcard.read_time || "1 min watch";

  return (
    <article
      onClick={() => onClick && onClick(postcard)}
      className="group relative aspect-[2/3] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#14140f] shadow-[0_4px_16px_rgba(20,20,15,0.12)] hover:shadow-[0_20px_40px_rgba(20,20,15,0.22)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer select-none"
    >
      <SkeletonImage
        src={imgSrc}
        alt={postcard.title}
        fill
        sizes="(max-width: 640px) 58vw, (max-width: 1080px) 33vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        skeletonClassName="rounded-[24px] sm:rounded-[28px]"
      />

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent via-40% to-black/90 pointer-events-none" />

      {/* Top Kicker: ▶ WATCH */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-[10.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          <Play className="w-2.5 h-2.5 fill-current" />
          <span>WATCH</span>
        </span>
      </div>

      {/* Bottom Text */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 text-white flex flex-col justify-end">
        <h3 className="font-extrabold text-white text-base sm:text-[19px] leading-tight line-clamp-3 mb-2 drop-shadow-sm font-heading group-hover:underline">
          {postcard.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-white/85 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d6ff3f] shrink-0" />
          <span>Instagram reel · {watchTime}</span>
        </div>
      </div>
    </article>
  );
};
