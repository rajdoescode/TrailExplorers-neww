import React from "react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[560px] flex items-center justify-center overflow-hidden bg-[#14140f] text-white text-center">
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

      {/* Dark overlay: rgba(20, 20, 15, 0.42) */}
      <div className="absolute inset-0 bg-[#14140f]/[0.42] z-1" />

      {/* Hero Content Box */}
      <div className="relative z-2 max-w-[1100px] w-full mx-auto px-6 py-6 flex flex-col items-center text-center gap-[22px]">
        {/* Hero Title */}
        <h1
          className="font-heading font-bold text-white text-[clamp(34px,5.5vw,72px)] leading-[1.05] tracking-[-0.025em] m-0"
          style={{ fontFamily: "'Plus Jakarta Sans', 'Poppins', -apple-system, sans-serif" }}
        >
          <span className="inline-block whitespace-nowrap sm:whitespace-normal">Made by wanderers,</span>
          <br />
          <span className="inline-block">
            for wanderers
            <span className="text-[#d6ff3f] drop-shadow-[0_0_14px_rgba(214,255,63,0.5)]">.</span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-[clamp(15px,2vw,19px)] font-medium text-white/95 m-0 opacity-95">
          Community-led trips across the Himalayas.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap justify-center items-center gap-[12px] mt-1">
          <button
            type="button"
            id="heroBookNowBtn"
            className="inline-flex items-center justify-center font-heading font-bold text-[15px] px-[28px] py-[12px] rounded-full bg-[#d6ff3f] text-[#14140f] border border-[#14140f] hover:bg-[#ccff00] hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(214,255,63,0.45)] transition-all duration-180 cursor-pointer"
          >
            Book Now
          </button>

          <Link
            href="/plan-your-trip"
            className="inline-flex items-center justify-center font-heading font-bold text-[15px] px-[28px] py-[12px] rounded-full bg-[#14140f]/35 text-white border border-white backdrop-blur-[4px] hover:bg-[#14140f]/65 hover:-translate-y-[1px] transition-all duration-180"
          >
            Plan your own trip
          </Link>
        </div>
      </div>
    </section>
  );
};
