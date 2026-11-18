import React from "react";
import Link from "next/link";
import { Snowflake, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export const WinterStripHome: React.FC = () => {
  return (
    <div className="w-full pb-6">
      <Container>
        <Link
          href="/winter-spiti"
          className="group block w-full bg-[#14140f] text-white rounded-2xl p-4 sm:p-5 border-2 border-[#14140f] hover:border-[#d6ff3f] shadow-card hover:shadow-card-hover transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#d6ff3f] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#d6ff3f] group-hover:text-[#14140f] transition-all">
                <Snowflake className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Winter Spiti is open
                </span>
                <span className="hidden sm:inline text-white/40">·</span>
                <span className="text-xs sm:text-sm font-medium text-white/80">
                  Fixed departures &amp; private 4x4 snow expeditions available now.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#d6ff3f] shrink-0 group-hover:translate-x-1 transition-transform">
              <span className="hidden md:inline">View Dates &amp; Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </Container>
    </div>
  );
};
