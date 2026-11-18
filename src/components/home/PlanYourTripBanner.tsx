import React from "react";
import Link from "next/link";
import { Sparkles, MessageSquare } from "lucide-react";

export const PlanYourTripBanner: React.FC = () => {
  return (
    <section className="w-full py-10 sm:py-14 bg-white" id="plan-your-trip-banner">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-8 lg:gap-12 bg-[#14140f] text-white rounded-[28px] p-6 sm:p-10 lg:p-14 overflow-hidden relative shadow-2xl">
          {/* Decorative radial gradient */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial from-[#d6ff3f]/15 to-transparent pointer-events-none" />

          {/* Left Column: Copy */}
          <div className="relative z-10 flex flex-col items-start">
            <span className="inline-block bg-[#d6ff3f] text-[#14140f] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4">
              Private trips
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-white tracking-tight leading-[1.15] mb-4">
              Plan your own Himalayan trip.
            </h2>

            <p className="text-white/80 text-[15px] sm:text-base leading-relaxed max-w-xl mb-7">
              Spiti, Ladakh, Zanskar, Himachal, Kashmir, Uttarakhand or the Northeast. Chat with our trip planner, shape it day by day, and we&apos;ll call you back with a price for your group.
            </p>

            <Link
              href="/plan-your-trip"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-[15px] transition-all duration-180 hover:-translate-y-0.5 shadow-md"
            >
              Chat with our planner
            </Link>
          </div>

          {/* Right Column: Chat Mockup */}
          <div className="relative z-10 flex flex-col gap-2.5 bg-white/[0.06] border border-white/12 rounded-[22px] p-5 text-sm leading-snug shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:rotate-[1.5deg]">
            {/* Chat Header */}
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10 font-bold">
              <div className="w-9 h-9 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-extrabold text-sm shrink-0">
                B
              </div>
              <div>
                <span className="text-white text-sm font-bold block">Banjara</span>
                <span className="text-white/55 text-xs font-normal block">Trip planner</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="self-start max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-xs bg-white/10 text-white text-[13.5px]">
              Hi! Where in the Himalayas are you dreaming of?
            </div>

            <div className="self-end max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-xs bg-[#d6ff3f] text-[#14140f] font-semibold text-[13.5px]">
              8 days in Spiti, 4 friends, late June
            </div>

            <div className="self-start max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-xs bg-white/10 text-white text-[13.5px]">
              <strong className="text-[#d6ff3f]">Got it!</strong> 4x4 or tempo? Monasteries + Chandratal camping?
            </div>

            <div className="self-end max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-xs bg-[#d6ff3f] text-[#14140f] font-semibold text-[13.5px]">
              4x4, mix of homestays &amp; camps
            </div>

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-medium border border-white/10">
                Spiti · 8 days
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-medium border border-white/10">
                4 travelers
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-medium border border-white/10">
                Private 4x4
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
