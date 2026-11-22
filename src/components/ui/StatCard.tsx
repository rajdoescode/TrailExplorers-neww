"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  accent = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-[20px] p-5 sm:p-6 border-2 transition-all relative overflow-hidden group",
        accent
          ? "bg-[#14140f] text-white border-[#14140f] shadow-card hover:shadow-[0_14px_28px_rgba(20,20,15,0.2)]"
          : "bg-white/75 backdrop-blur-md text-[#14140f] border border-white/80 shadow-[0_8px_30px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] hover:bg-white/90 hover:border-white hover:shadow-[0_14px_28px_rgba(20,20,15,0.12)]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-wider",
            accent ? "text-[#d6ff3f]" : "text-[#6b6b63]"
          )}
        >
          {title}
        </span>
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
              accent
                ? "bg-white/10 text-[#d6ff3f]"
                : "bg-[#f6f6f1] text-[#14140f] border border-[#e2e2dc]"
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3 mb-2">
        <h3 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
          {value}
        </h3>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full",
              isPositive
                ? accent
                  ? "bg-[#d6ff3f]/20 text-[#d6ff3f]"
                  : "bg-[#e8f7ed] text-[#2fa84f] border border-[#2fa84f]/20"
                : "bg-[#fdeeed] text-[#e0455a] border border-[#e0455a]/20"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p
          className={cn(
            "text-xs font-medium",
            accent ? "text-gray-300" : "text-[#6b6b63]"
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Subtle neon indicator strip */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1.5 transition-all opacity-0 group-hover:opacity-100",
          accent ? "bg-[#d6ff3f]" : "bg-[#14140f]"
        )}
      />
    </div>
  );
};
