import React from "react";
import { ShieldCheck, Users, Compass, HeartHandshake, IndianRupee } from "lucide-react";

export const CorePillarsSection: React.FC = () => {
  const pillars = [
    {
      title: "SAFETY FIRST, ALWAYS",
      icon: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "GENUINE COMMUNITY",
      icon: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "RAW & OFFBEAT",
      icon: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      title: "RESPONSIBLE WANDERING",
      icon: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      title: "TRANSPARENT PRICING",
      icon: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-white text-center">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Head */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#14140f] tracking-tight m-0">
            Core Pillars
          </h2>
          <p className="text-base sm:text-lg text-[#6b6b63] font-semibold mt-2.5">
            Why We Are Different
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 md:gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group flex flex-col items-center flex-1 min-w-[140px] max-w-[200px]"
            >
              <div className="w-[100px] h-[100px] rounded-full bg-[#14140f] flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(20,20,15,0.18)] transition-transform duration-250 group-hover:-translate-y-1 group-hover:scale-105">
                {pillar.icon}
              </div>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.5px] text-[#14140f] leading-snug max-w-[180px]">
                {pillar.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
