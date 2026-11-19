import React from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { Play, BookOpen, ArrowUpRight } from "lucide-react";
import { Postcard } from "@/types";

export interface PostcardCardProps {
  postcard: Postcard;
  onClick?: (postcard: Postcard) => void;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({ postcard, onClick }) => {
  const isVideo = postcard.type === "reel" || postcard.type === "video";

  return (
    <article
      onClick={() => onClick && onClick(postcard)}
      className="group bg-white rounded-[18px] border border-[#e2e2dc] shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f6f1]">
        <SkeletonImage
          src={postcard.image_url || "/assets/images/home/hero-poster.jpg"}
          alt={postcard.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 bg-[#14140f] text-[#d6ff3f] text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
            {isVideo ? <Play className="w-3 h-3 fill-current" /> : <BookOpen className="w-3 h-3" />}
            <span>{postcard.type}</span>
          </span>
        </div>

        {/* Video Play Overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6b63] block mb-1">
            {postcard.category || "Himalayan Story"}
          </span>
          <h3 className="text-base font-bold text-[#14140f] line-clamp-2 leading-snug group-hover:underline">
            {postcard.title}
          </h3>
          {postcard.subtitle && (
            <p className="text-xs text-[#6b6b63] line-clamp-2 mt-1">
              {postcard.subtitle}
            </p>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-[#f0f0eb] flex items-center justify-between text-xs font-bold text-[#14140f]">
          <span>{isVideo ? "Watch Reel" : "Read Postcard"}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#6b6b63] group-hover:text-[#14140f]" />
        </div>
      </div>
    </article>
  );
};
