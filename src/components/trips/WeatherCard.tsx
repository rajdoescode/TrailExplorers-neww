import React from "react";
import { WeatherInfo } from "@/lib/trip-helpers";

interface WeatherCardProps {
  weather: WeatherInfo;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e2dc] p-5 sm:p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2fa84f] uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-[#2fa84f] animate-pulse" />
          <span>LIVE {weather.location}</span>
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-[#14140f] font-heading tracking-tight">
          {weather.temp}
        </div>
        <p className="text-xs text-[#6b6b63] mt-1 font-medium">
          {weather.description}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {weather.forecast.map((fc, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border border-[#e2e2dc] bg-[#fafaf7] text-center min-w-[65px] sm:min-w-[75px]"
          >
            <span className="text-[11px] font-bold text-[#6b6b63]">{fc.day}</span>
            <span className="text-lg my-1" aria-hidden="true">
              {fc.icon}
            </span>
            <span className="text-xs font-extrabold text-[#14140f] whitespace-nowrap">
              {fc.temp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
