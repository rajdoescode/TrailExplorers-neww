import React from "react";
import { WeatherInfo } from "@/lib/trip-helpers";
import { Cloud, Snowflake, Sun, CloudRain } from "lucide-react";

interface WeatherCardProps {
  weather: WeatherInfo;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  if (!weather) return null;

  // Split temp like "-5°C" into number "-5" and unit "°c"
  const match = (weather.temp || "").match(/^([+-]?\d+)(.*)$/);
  const tempNum = match ? match[1] : weather.temp;
  const rawUnit = match ? match[2] : "°c";
  const tempUnit = rawUnit.toLowerCase() === "°c" ? "°c" : rawUnit;

  const renderIcon = (iconStr: string) => {
    const s = (iconStr || "").toLowerCase();
    if (s.includes("sun") || s === "☀️" || s.includes("clear")) {
      return <Sun className="w-5 h-5 text-[#e0a100]" strokeWidth={2} />;
    }
    if (s.includes("snow") || s === "❄️" || s.includes("ice")) {
      return <Snowflake className="w-5 h-5 text-[#378add]" strokeWidth={2} />;
    }
    if (s.includes("rain") || s === "🌧️" || s.includes("storm") || s === "⛈️") {
      return <CloudRain className="w-5 h-5 text-[#185fa5]" strokeWidth={2} />;
    }
    return <Cloud className="w-5 h-5 text-[#14140f]" strokeWidth={2} />;
  };

  return (
    <div className="trip-weather-card bg-white rounded-[26px] border-[1.5px] border-[#e8e8e2] p-6 sm:p-7 shadow-[0_8px_24px_rgba(214,255,63,0.08),0_4px_14px_rgba(20,20,15,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
      {/* Left Info Column */}
      <div className="flex-1">
        {/* Top Header Row: LIVE Badge + Location */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d6ff3f] text-[#14140f] text-[11px] font-extrabold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14140f] animate-pulse" />
            LIVE
          </span>
          <span className="text-[12.5px] sm:text-[13px] font-extrabold text-[#14140f] uppercase tracking-wider font-heading">
            {weather.location}
          </span>
        </div>

        {/* Big Temperature Display with small °C top-aligned */}
        <div className="font-extrabold text-[#14140f] tracking-tight font-heading leading-none my-2 text-[46px] sm:text-[54px] flex items-baseline">
          <span>{tempNum}</span>
          <span className="text-[22px] sm:text-[24px] font-bold text-[#14140f] self-start relative top-[2px] ml-0.5">
            {tempUnit}
          </span>
        </div>

        {/* Weather Facts / Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-[#66665c] font-medium leading-normal">
          {weather.description}
        </p>
      </div>

      {/* Right Column: 4 Forecast Day Cards */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full md:w-auto">
        {weather.forecast.map((fc, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 rounded-[18px] bg-[#f8f8f5] border border-[#ecece5] text-center min-w-0 md:min-w-[76px] shadow-xs"
          >
            <span className="text-[12px] sm:text-[13px] font-semibold text-[#66665c] leading-tight">
              {fc.day}
            </span>
            <div className="my-2 flex items-center justify-center text-[#14140f]" aria-hidden="true">
              {renderIcon(fc.icon)}
            </div>
            <span className="text-[11.5px] sm:text-[12.5px] font-bold text-[#14140f] leading-tight whitespace-nowrap">
              {fc.temp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
