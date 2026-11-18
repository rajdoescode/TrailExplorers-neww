import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Compass } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#14140f] text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/images/home/hero-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Dual Gradient Scrim Overlay for Enhanced Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/75 z-10" />

      {/* Hero Content Box */}
      <div className="relative z-20 max-w-[1100px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 text-[#d6ff3f] text-xs sm:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Compass className="w-4 h-4 text-[#d6ff3f]" />
          <span>India&apos;s Premier Himalayan Travel Community</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-4xl text-balance">
          Made by wanderers,<br />
          <span className="text-[#d6ff3f]">for wanderers.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-white/85 font-medium max-w-2xl leading-relaxed">
          Curated Himalayan Escapes, Motorbike Expeditions &amp; Offbeat Group Trips. Small circles, certified captains, authentic local homestays.
        </p>

        {/* CTA Button Row */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/community-trips"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shadow-lime-btn text-sm sm:text-base font-extrabold px-8 py-3.5"
          >
            Explore Trips
          </Button>

          <Button
            href="/plan-your-trip"
            variant="hero-ghost"
            size="lg"
            className="text-sm sm:text-base font-bold px-8 py-3.5"
          >
            Plan Your Own Trip
          </Button>
        </div>
      </div>
    </section>
  );
};
