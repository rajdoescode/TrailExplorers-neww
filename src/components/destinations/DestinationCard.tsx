import React from "react";
import Link from "next/link";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { ArrowUpRight } from "lucide-react";
import { Destination } from "@/types";

export interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const targetHref = destination.title.toLowerCase().includes("himachal")
    ? "/himachal"
    : destination.title.toLowerCase().includes("ladakh")
    ? "/ladakh"
    : destination.title.toLowerCase().includes("spiti")
    ? "/spiti"
    : destination.title.toLowerCase().includes("kashmir")
    ? "/kashmir"
    : destination.title.toLowerCase().includes("uttarakhand")
    ? "/uttarakhand"
    : `/tour-packages?dest=${encodeURIComponent(destination.title.toLowerCase())}`;

  return (
    <Link
      href={targetHref}
      className="group relative block aspect-[4/3] rounded-[18px] overflow-hidden border border-[#e2e2dc] shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <SkeletonImage
        src={destination.image_url}
        alt={destination.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        skeletonClassName="rounded-[18px]"
      />

      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity group-hover:from-black/85" />

      {/* Content Pin */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d6ff3f] block mb-1">
              {destination.subtitle}
            </span>
            <h3 className="text-xl font-bold text-white leading-tight">
              {destination.title}
            </h3>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#d6ff3f] group-hover:text-[#14140f] transition-all duration-200 shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
