import React from "react";
import Link from "next/link";
import { SkeletonVideo } from "@/components/ui/SkeletonVideo";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[560px] flex items-center justify-center overflow-hidden bg-[#14140f] text-white text-center">
      {/* Background Video with Skeleton Placeholder */}
      <SkeletonVideo
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/images/home/hero-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        skeletonClassName="bg-[#14140f]"
      >
        <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
      </SkeletonVideo>

      {/* Dark overlay: rgba(20, 20, 15, 0.42) */}
      <div className="absolute inset-0 bg-[#14140f]/[0.42] z-1" />

      {/* Hero Content Box */}
      <div className="relative z-2 max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-6 flex flex-col items-center text-center gap-4 sm:gap-[22px]">
        {/* Hero Title */}
        <h1 className="font-heading font-bold text-white text-[clamp(28px,6.5vw,72px)] leading-[1.1] tracking-[-0.025em] m-0">
          <span className="inline-block">Made by wanderers,</span>
          <br />
          <span className="inline-block">
            for wanderers
            <span className="text-[#d6ff3f] drop-shadow-[0_0_14px_rgba(214,255,63,0.5)]">.</span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-[clamp(14px,2vw,19px)] font-medium text-white/95 m-0 opacity-95 max-w-[400px] sm:max-w-none">
          Community-led trips across the Himalayas.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-2 w-full max-w-[340px] sm:max-w-none sm:w-auto">
          <Link
            href="#community-trips"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center font-heading font-bold text-[15px] px-[28px] py-[12px] rounded-full bg-[#d6ff3f] text-[#14140f] border border-[#14140f] hover:bg-[#ccff00] hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(214,255,63,0.45)] active:scale-95 transition-all duration-180 cursor-pointer shadow-sm"
          >
            Book Now
          </Link>

          <Link
            href="/plan-your-trip"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center font-heading font-bold text-[15px] px-[28px] py-[12px] rounded-full bg-[#14140f]/40 text-white border border-white/80 backdrop-blur-[6px] hover:bg-[#14140f]/70 hover:-translate-y-[1px] active:scale-95 transition-all duration-180"
          >
            Plan your own trip
          </Link>
        </div>
      </div>
    </section>
  );
};
