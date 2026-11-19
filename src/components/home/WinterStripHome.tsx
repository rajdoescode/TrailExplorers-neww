import React from "react";
import Link from "next/link";
import { Snowflake, ArrowRight } from "lucide-react";

export const WinterStripHome: React.FC = () => {
  return (
    <div className="w-full pb-8 pt-2">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <Link
          href="/winter-spiti"
          className="group flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-2.5 rounded-[24px] sm:rounded-full bg-[#14140f] text-white hover:bg-black transition-all shadow-md"
        >
          {/* Left Icon (Snowflake in neon circle) */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shrink-0 self-start mt-0.5 sm:self-center sm:mt-0">
            <Snowflake className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Center Text Block */}
          <div className="flex-1 min-w-0 pr-1 sm:pr-0">
            {/* Desktop single line view */}
            <div className="hidden sm:block text-[15px] truncate">
              <strong className="font-extrabold text-white">Winter Spiti is open</strong>
              <span className="text-white/75 font-normal ml-1.5">
                · Group trips from Delhi ·{" "}
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold text-xs">
                  Nov – Mar
                </span>{" "}
                ·{" "}
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d6ff3f]/15 text-[#d6ff3f] font-bold text-xs">
                  from ₹17,499
                </span>
              </span>
            </div>

            {/* Mobile stacked card view matching exact reference screenshot */}
            <div className="block sm:hidden">
              <h3 className="text-[16px] font-extrabold text-white leading-tight m-0">
                Winter Spiti is open
              </h3>
              <p className="text-[13px] text-[#a3a39e] font-medium leading-tight mt-1 mb-1.5">
                Group trips from Delhi
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-semibold">
                  Nov – Mar
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#d6ff3f]/15 text-[#d6ff3f] text-[11px] font-bold">
                  from ₹17,499
                </span>
              </div>
            </div>
          </div>

          {/* Right Explore Button (Arrow circle on mobile, pill on desktop) */}
          <div className="shrink-0">
            <span className="w-11 h-11 sm:w-auto sm:h-auto sm:px-5 sm:py-2 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center text-xs sm:text-sm font-bold group-hover:bg-[#ccff00] transition-colors shadow-sm">
              <span className="hidden sm:inline mr-1.5">Explore</span>
              <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
