"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export const PlanYourTripBanner: React.FC = () => {
  // Animation state to simulate real-time typing / message sequence
  const [activeStep, setActiveStep] = useState<number>(3); // default full view matching screenshot

  useEffect(() => {
    // Subtle cycle that restarts every 12 seconds to keep the chat dynamic & alive
    const interval = setInterval(() => {
      setActiveStep(1);
      setTimeout(() => setActiveStep(2), 1200);
      setTimeout(() => setActiveStep(3), 2600);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-10 sm:py-16 bg-white" id="plan-your-trip-banner">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 lg:p-14 text-white overflow-hidden shadow-2xl relative"
          style={{
            backgroundColor: "#14140f",
            backgroundImage: "radial-gradient(circle at 100% 0%, rgba(214, 255, 63, 0.14), transparent 45%)",
          }}
        >
          {/* Main 2-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-8 lg:gap-12">
            {/* Left Column: Copy */}
            <div className="flex flex-col items-start z-10">
              <span className="inline-block bg-[#d6ff3f] text-[#14140f] text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 sm:mb-5">
                Private trips
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.12] mb-4">
                Plan your own Himalayan<br className="hidden sm:inline" /> trip.
              </h2>

              <p className="text-white/80 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-[500px] mb-6 sm:mb-8 font-normal">
                Spiti, Ladakh, Zanskar, Himachal, Kashmir, Uttarakhand or the Northeast. Chat with our trip planner, shape it day by day, and we&apos;ll call you back with a price for your group.
              </p>

              <Link
                href="/plan-your-trip"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 shadow-md"
              >
                Chat with our planner
              </Link>
            </div>

            {/* Right Column: Interactive Chat Mockup */}
            <div className="z-10 bg-[#20201a] border border-white/10 rounded-[24px] p-5 sm:p-6 shadow-2xl flex flex-col gap-3.5 font-sans">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-white/10 font-bold">
                <div className="relative w-9 h-9 rounded-full bg-[#d6ff3f] overflow-hidden shrink-0 border border-white/20">
                  <Image
                    src="/assets/images/mascot/banjara-face.webp"
                    alt="Banjara Avatar"
                    fill
                    className="object-cover object-top scale-110"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[14px] font-bold leading-tight">Banjara</span>
                  <span className="text-white/55 text-[12px] font-normal leading-tight">Trip planner</span>
                </div>
              </div>

              {/* Message 1 (Bot) */}
              <div
                className={`self-start max-w-[85%] px-4 py-3 rounded-[18px] rounded-bl-[4px] bg-[#2c2d25] text-white/95 text-[13.5px] sm:text-[14px] leading-snug transition-all duration-300 ${
                  activeStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                Hi! Where in the Himalayas are you dreaming of?
              </div>

              {/* Message 2 (User) */}
              <div
                className={`self-end max-w-[85%] px-4 py-3 rounded-[18px] rounded-br-[4px] bg-[#d6ff3f] text-[#14140f] font-semibold text-[13.5px] sm:text-[14px] leading-snug transition-all duration-300 ${
                  activeStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                8 days in Spiti, 4 friends, late June
              </div>

              {/* Message 3 (Bot Itinerary with Green Highlights) */}
              <div
                className={`self-start max-w-[85%] px-4 py-3 rounded-[18px] rounded-bl-[4px] bg-[#2c2d25] text-white/95 text-[13.5px] sm:text-[14px] leading-relaxed transition-all duration-300 ${
                  activeStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <div>
                  <strong className="text-[#d6ff3f] font-bold">Day 1 </strong>Manali, settle in
                </div>
                <div>
                  <strong className="text-[#d6ff3f] font-bold">Day 2 </strong>Over Kunzum La to Kaza
                </div>
                <div>
                  <strong className="text-[#d6ff3f] font-bold">Day 3 </strong>Key, Kibber &amp; Chicham
                </div>
              </div>

              {/* Animated Typing Bubble */}
              <div className="self-start flex items-center gap-1.5 px-4 py-3 bg-[#2c2d25] rounded-[18px] w-fit">
                <i className="w-1.5 h-1.5 rounded-full bg-white/70 pbc-dot-1 block" />
                <i className="w-1.5 h-1.5 rounded-full bg-white/70 pbc-dot-2 block" />
                <i className="w-1.5 h-1.5 rounded-full bg-white/70 pbc-dot-3 block" />
              </div>
            </div>
          </div>

          {/* Bottom 3-step Row */}
          <ol className="border-t border-white/12 pt-6 sm:pt-8 mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 list-none p-0">
            {/* Step 1 */}
            <li className="flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-[#d6ff3f] text-[#14140f] font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                1
              </span>
              <div className="flex flex-col">
                <strong className="text-white text-[14.5px] sm:text-[15px] font-semibold leading-tight">
                  Tell us your dream trip
                </strong>
                <small className="text-white/65 text-[12.5px] sm:text-[13px] font-normal mt-1 leading-snug">
                  Chat with Banjara, our trip planner
                </small>
              </div>
            </li>

            {/* Step 2 */}
            <li className="flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-[#d6ff3f] text-[#14140f] font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                2
              </span>
              <div className="flex flex-col">
                <strong className="text-white text-[14.5px] sm:text-[15px] font-semibold leading-tight">
                  Get a day-by-day plan
                </strong>
                <small className="text-white/65 text-[12.5px] sm:text-[13px] font-normal mt-1 leading-snug">
                  Shaped around your dates, group and style
                </small>
              </div>
            </li>

            {/* Step 3 */}
            <li className="flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-[#d6ff3f] text-[#14140f] font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm">
                3
              </span>
              <div className="flex flex-col">
                <strong className="text-white text-[14.5px] sm:text-[15px] font-semibold leading-tight">
                  Get a call with a price
                </strong>
                <small className="text-white/65 text-[12.5px] sm:text-[13px] font-normal mt-1 leading-snug">
                  Within 24 hours
                </small>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};
