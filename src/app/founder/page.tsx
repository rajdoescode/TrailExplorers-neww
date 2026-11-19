import { notFound } from "next/navigation";

// Page commented out as requested
export default function FounderPage() {
  notFound();
}

/*
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { TEAM_MEMBERS } from "@/data/team";
import {
  Compass,
  Mountain,
  Flame,
  Leaf,
  Users,
  Backpack,
  Coffee,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Founder's Story — Harsh Thakkar | Trail Explorers",
  description:
    "Harsh Thakkar is the founder & chief explorer behind Trail Explorers. Certified rock climber, mountaineer and adventure enthusiast dedicated to meaningful journeys across the Himalayas.",
  openGraph: {
    title: "Founder's Story — Harsh Thakkar | Trail Explorers",
    description:
      "Harsh Thakkar is the founder & chief explorer behind Trail Explorers. Certified rock climber, mountaineer and adventure enthusiast dedicated to meaningful journeys across the Himalayas.",
    images: [{ url: "/assets/images/about/harsh-thakkar.avif" }],
  },
};

export function OriginalFounderPage() {
  const founder = TEAM_MEMBERS[0];

  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#14140f] pb-20">
      <section className="max-w-[900px] mx-auto px-4 pt-10 sm:pt-14 pb-8 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6b6b63] hover:text-[#14140f] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>About Us</span>
        </Link>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-block text-xs font-extrabold uppercase tracking-[1.5px] text-[#14140f] bg-[#d6ff3f] px-3.5 py-1 rounded-full">
            {founder.badge} · {founder.experience} EXPERIENCE
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-[clamp(32px,5vw,56px)] text-[#14140f] tracking-tight mb-6 leading-tight">
          Beyond Maps &amp; Boundaries, in Search of Our Tribe
        </h1>

        <blockquote className="bg-[#f6f6f1] p-6 sm:p-8 rounded-[24px] border border-[#e2e2dc] text-base sm:text-lg italic text-[#2c2c26] leading-relaxed mb-8 shadow-xs">
          &ldquo;{founder.quote}&rdquo;
        </blockquote>

        <div className="inline-flex items-center gap-4 p-2.5 sm:pr-6 rounded-full bg-[#14140f] text-white shadow-md">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#d6ff3f]">
            <SkeletonImage
              src="/assets/images/about/harsh-thakkar.avif"
              alt={founder.name}
              fill
              sizes="64px"
              className="object-cover"
              skeletonClassName="rounded-full"
            />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
              {founder.name}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#d6ff3f] font-semibold">
              {founder.designation} · {founder.favouriteDestination}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
*/
