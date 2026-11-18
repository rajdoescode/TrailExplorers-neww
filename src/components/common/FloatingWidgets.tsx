"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface BubbleLine {
  say: string;
  sub?: string;
  chips?: string[];
}

const BUBBLE_LINES: BubbleLine[] = [
  { say: "Where do you want to go? 🏔️", chips: ["Spiti", "Ladakh", "Kashmir"] },
  { say: "Psst… planning a trip?", sub: "Tap me, let's plan it together!" },
  { say: "Snow peaks or green valleys?", chips: ["Snow peaks", "Green valleys"] },
  { say: "Who's coming along?", chips: ["Friends", "Family", "Just me"] },
  { say: "Got a few days off? 🎒", sub: "Tell me, I'll shape a day-by-day plan." },
];

export const FloatingWidgets: React.FC = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [isHop, setIsHop] = useState(false);
  const [isWiggle, setIsWiggle] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show speech bubble after 2.5 seconds
    const initialTimer = setTimeout(() => {
      if (!dismissed) setBubbleOpen(true);
    }, 2500);

    // Periodic tricks (hop / wiggle / cycle question)
    const interval = setInterval(() => {
      if (dismissed) return;
      // Trigger subtle hop or wiggle trick
      const rand = Math.random();
      if (rand > 0.5) {
        setIsHop(true);
        setTimeout(() => setIsHop(false), 800);
      } else {
        setIsWiggle(true);
        setTimeout(() => setIsWiggle(false), 900);
      }

      // Cycle bubble text
      setLineIndex((prev) => (prev + 1) % BUBBLE_LINES.length);
      setBubbleOpen(true);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  const currentLine = BUBBLE_LINES[lineIndex];

  return (
    <aside
      className="fixed bottom-5 right-5 z-[9001] flex flex-col items-end gap-3 select-none"
      aria-label="Floating contact & assistance"
    >
      {/* Speech Bubble */}
      <div
        className={`relative transition-all duration-300 origin-bottom-right mb-[-2px] ${
          bubbleOpen && !dismissed
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div
          className="relative max-w-[250px] p-3 sm:p-3.5 pr-8 rounded-[16px_16px_4px_16px] bg-white text-[#14140f] border-[1.5px] border-[#14140f] shadow-[0_10px_28px_rgba(20,20,15,0.2)] font-sans"
          onMouseEnter={() => setBubbleOpen(true)}
        >
          <button
            type="button"
            onClick={() => {
              setBubbleOpen(false);
              setDismissed(true);
            }}
            aria-label="Close"
            className="absolute top-1.5 right-2 text-gray-400 hover:text-black font-bold text-base leading-none p-1 cursor-pointer"
          >
            &times;
          </button>

          <p className="font-bold text-[13.5px] leading-tight m-0 text-[#14140f]">
            {currentLine.say}
          </p>

          {currentLine.sub && (
            <p className="text-[11.5px] text-[#55554d] font-normal mt-1 leading-snug">
              {currentLine.sub}
            </p>
          )}

          {currentLine.chips && currentLine.chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {currentLine.chips.map((chip) => (
                <Link
                  key={chip}
                  href={`/plan-your-trip?ask=${encodeURIComponent(chip + " trip")}`}
                  className="px-2.5 py-1 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] text-[11px] font-bold border border-[#14140f] transition-all hover:-translate-y-0.5"
                >
                  {chip}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stack of Floating Launcher Tiles: Banjara Mascot + WhatsApp */}
      <div className="flex flex-col items-center gap-3">
        {/* Top: Banjara Mascot Launcher Tile */}
        <Link
          href="/plan-your-trip"
          aria-label="Plan your trip with Banjara"
          onMouseEnter={() => {
            setIsHop(true);
            setTimeout(() => setIsHop(false), 800);
            setBubbleOpen(true);
          }}
          className={`relative block w-[56px] h-[56px] rounded-[12px] shadow-[0_8px_20px_rgba(20,20,15,0.24),0_2px_6px_rgba(20,20,15,0.14)] hover:shadow-[0_12px_26px_rgba(20,20,15,0.32)] transition-all duration-200 group cursor-pointer ${
            isWiggle ? "animate-banjara-wiggle" : ""
          }`}
          style={{
            background: "radial-gradient(circle at 50% 30%, #3a3a30 0%, #14140f 70%)",
          }}
        >
          {/* Character Peeking Window (overflow clips sides/bottom to 12px, leaves top open for head & cap) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "inset(-56px 0 0 0 round 0 0 12px 12px)",
            }}
          >
            <div
              className={`absolute left-[-22px] top-[-30px] w-[101px] h-[128px] group-hover:-translate-y-1.5 transition-transform duration-300 ${
                isHop ? "animate-banjara-hop" : ""
              }`}
            >
              <div
                className="w-full h-full animate-banjara-breathe"
                style={{
                  backgroundImage: "url('/assets/images/mascot/banjara-idle.webp')",
                  backgroundPosition: "100% 0",
                  backgroundSize: "1400% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>

          {/* Neon-Lime Online Dot */}
          <span
            className="absolute bottom-[5px] right-[5px] w-[10px] h-[10px] rounded-full bg-[#b8ff00] border-2 border-[#14140f] z-20 animate-banjara-online pointer-events-none shadow-sm"
            aria-hidden="true"
          />
        </Link>

        {/* Bottom: WhatsApp Chat Button */}
        <a
          href="https://wa.me/919103910523?text=Hi%20Awara%20Banjara!%20%F0%9F%91%8B%20I'm%20interested%20in%20planning%20a%20Himalayan%20trip%20with%20you.%20Could%20you%20share%20more%20details%3F"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="relative w-[56px] h-[56px] rounded-[12px] bg-[#25d366] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(20,20,15,0.24),0_2px_6px_rgba(20,20,15,0.14)] hover:scale-105 active:scale-95 hover:shadow-[0_12px_26px_rgba(37,211,102,0.36)] transition-all duration-200 group cursor-pointer"
        >
          <svg
            className="w-[32px] h-[32px] fill-current text-white transform group-hover:scale-105 transition-transform"
            viewBox="0 32 448 448"
            aria-hidden="true"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>
      </div>
    </aside>
  );
};
