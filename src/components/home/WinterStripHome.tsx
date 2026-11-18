import React from "react";
import Link from "next/link";
import { Snowflake, ArrowRight } from "lucide-react";

export const WinterStripHome: React.FC = () => {
  return (
    <div className="w-full pb-8 pt-2">
      <div className="max-w-[1280px] mx-auto px-6">
        <Link
          href="/winter-spiti"
          className="group flex items-center justify-between gap-4 p-2 sm:p-2.5 rounded-full bg-[#14140f] text-white hover:bg-black transition-all shadow-md"
        >
          {/* Left Icon + Text */}
          <div className="flex items-center gap-3.5 pl-1.5 sm:pl-2 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shrink-0">
              <Snowflake className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-[14px] sm:text-[15px] truncate">
              <strong className="font-bold text-white">Winter Spiti is open</strong>
              <span className="text-white/75 font-normal ml-1.5 hidden sm:inline">
                · Group trips from Delhi · Nov - Mar · from ₹17,499
              </span>
            </div>
          </div>

          {/* Right Explore Button */}
          <div className="shrink-0 pr-1">
            <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#d6ff3f] text-[#14140f] text-xs sm:text-sm font-bold group-hover:bg-[#ccff00] transition-colors">
              Explore
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
