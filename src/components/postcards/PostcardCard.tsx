"use client";

import React, { useState } from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { Play, Heart, Calendar, BookOpen, Video, ArrowRight, Camera } from "lucide-react";
import { Postcard } from "@/types";
import { cn } from "@/lib/utils";

export interface PostcardCardProps {
  postcard: Postcard;
  onClick?: (postcard: Postcard) => void;
  priority?: boolean;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({
  postcard,
  onClick,
  priority = false,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isVideo =
    postcard.type === "reel" ||
    postcard.type === "video" ||
    postcard.category === "Instagram Reel" ||
    Boolean(postcard.video_url);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const getReadingOrWatchTime = () => {
    if (isVideo) return "3 min";
    if (postcard.content) {
      const words = postcard.content.split(/\s+/).length;
      const mins = Math.max(2, Math.round(words / 180));
      return `${mins} min read`;
    }
    return "5 min read";
  };

  const getCategoryLabel = () => {
    if (isVideo) return "Video Reel";
    if (postcard.category === "Field Guide") return "Trek Guide";
    if (postcard.category === "Travel Guide") return "Travel Guide";
    if (postcard.type === "attraction") return "Attraction";
    return "Travel Story";
  };

  const getCtaLabel = () => {
    if (isVideo) return "Watch Now";
    if (postcard.category === "Field Guide" || postcard.category === "Travel Guide") {
      return "Read Guide";
    }
    return "Read Now";
  };

  return (
    <article
      onClick={() => onClick && onClick(postcard)}
      className="group bg-white/75 backdrop-blur-md rounded-[20px] border border-white/80 hover:border-white shadow-[0_8px_30px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_18px_40px_rgba(20,20,15,0.12),0_1px_1px_rgba(255,255,255,1)_inset] hover:bg-white/90 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="aspect-[4/3] relative w-full overflow-hidden bg-[#f4f4ee]/70">
        <SkeletonImage
          src={postcard.image_url || "/assets/images/home/hero-poster.jpg"}
          alt={postcard.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-400 ease-out"
        />

        {/* Top Left WATCH pill badge for video reels */}
        {isVideo && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#14140f] text-[11px] font-extrabold uppercase tracking-wider shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-white/80">
              <Play className="w-3 h-3 fill-[#14140f]" />
              <span>WATCH</span>
            </span>
          </div>
        )}

        {/* Top Right Wishlist Heart Button */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#14140f] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/80"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted
                ? "fill-[#e0455a] text-[#e0455a]"
                : "text-[#14140f] hover:text-[#e0455a]"
            )}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Postcard Title */}
          <h3 className="text-[16px] sm:text-[17px] font-bold text-[#14140f] line-clamp-2 leading-[1.3] font-heading min-h-[44px]">
            {postcard.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center gap-1.5 text-[#66665c] text-[13px] font-medium mt-2">
            {isVideo ? (
              <Video className="w-3.5 h-3.5 text-[#66665c] shrink-0" strokeWidth={1.8} />
            ) : postcard.type === "attraction" ? (
              <Camera className="w-3.5 h-3.5 text-[#66665c] shrink-0" strokeWidth={1.8} />
            ) : (
              <BookOpen className="w-3.5 h-3.5 text-[#66665c] shrink-0" strokeWidth={1.8} />
            )}
            <span>
              {getCategoryLabel()} • {getReadingOrWatchTime()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-0 border-t border-[#ecece5] my-0.5" />

        {/* Bottom CTA Row */}
        <div className="flex items-center justify-end mt-auto pt-0.5">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 bg-[#14140f] group-hover:bg-black text-white text-[13px] font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
          >
            <span>{getCtaLabel()}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </article>
  );
};
