import React from "react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[560px] sm:min-h-[620px] md:min-h-[680px] flex items-center justify-center overflow-hidden bg-[#14140f] text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/images/home/hero-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay matching authentic reference rgba(0, 0, 0, 0.45) */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Hero Content Box */}
      <div className="relative z-20 max-w-[1100px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        {/* Hero Title */}
        <h1 className="font-heading font-bold text-white text-[clamp(34px,5.5vw,72px)] leading-[1.08] tracking-tight text-balance">
          <span className="inline-block whitespace-nowrap sm:whitespace-normal">Made by wanderers,</span>
          <br />
          <span className="inline-block">
            for wanderers<span className="text-[#d6ff3f] drop-shadow-[0_0_14px_rgba(214,255,63,0.5)]">.</span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 sm:mt-5 text-[clamp(15px,2vw,19px)] font-medium text-white/95 max-w-2xl">
          Community-led trips across the Himalayas.
        </p>

        {/* Hero Actions */}
        <div className="mt-7 sm:mt-8 flex items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
          <Link
            href="/community-trips"
            id="heroBookNowBtn"
            className="px-7 sm:px-8 py-3 rounded-full bg-[#d6ff3f] hover:bg-[#c6f030] text-[#14140f] font-bold text-[14.5px] sm:text-[15px] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Now
          </Link>

          <Link
            href="/plan-your-trip"
            className="px-7 sm:px-8 py-3 rounded-full bg-[#14140f]/35 hover:bg-[#14140f]/60 text-white border border-white/80 backdrop-blur-xs font-medium text-[14.5px] sm:text-[15px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Plan your own trip
          </Link>
        </div>
      </div>
    </section>
  );
};
