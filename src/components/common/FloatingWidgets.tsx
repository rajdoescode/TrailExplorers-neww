"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BubbleLine {
  say: string;
  sub?: string;
  chips?: string[];
}

const LINES: BubbleLine[] = [
  { say: "Where do you want to go? 🏔️", chips: ["Spiti", "Ladakh", "Kashmir"] },
  { say: "Psst… planning a trip?", sub: "Tap me, let's plan it together!" },
  { say: "Snow peaks or green valleys?", chips: ["Snow peaks", "Green valleys"] },
  { say: "Who's coming along?", chips: ["Friends", "Family", "Just me"] },
  { say: "Got a few days off? 🎒", sub: "Tell me, I'll shape a day-by-day plan." },
  { say: "Bike, road trip or trek?", chips: ["Bike trip", "Road trip", "Trek"] },
  { say: "Chai and a mountain view? ☕", sub: "Chat with me about your dream trip." },
];

const CHIP_ASK: Record<string, string> = {
  Spiti: "Spiti Valley road trip",
  Ladakh: "Ladakh trip",
  Kashmir: "Kashmir trip",
  "Snow peaks": "I want a trip with snow peaks",
  "Green valleys": "I want a trip through green valleys",
  Friends: "A Himalayan trip with friends",
  Family: "A Himalayan trip with family",
  "Just me": "A solo Himalayan trip",
  "Bike trip": "A Himalayan bike trip",
  "Road trip": "A Himalayan road trip",
  Trek: "A Himalayan trek",
};

const FRAMES = 14;
const STAND = 13;
const TRICKS = ["is-hop", "is-spin", "is-wiggle", "look", "is-hop"];

export const FloatingWidgets: React.FC = () => {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [activeTrick, setActiveTrick] = useState<string | null>(null);
  const [spriteFrame, setSpriteFrame] = useState(STAND);
  const [dismissed, setDismissed] = useState(false);

  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const queueRef = useRef<number[]>([]);
  const lineIdxRef = useRef(0);
  const lastTrickRef = useRef(-1);

  // Don't show on /plan-your-trip page (it has its own in-app chat mascot)
  if (pathname === "/plan-your-trip") return null;

  // 1. Scroll visibility toggle
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 80;
      setIsVisible(show);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Sprite fidgeting & lookAround animation
  const lookAround = () => {
    const q: number[] = [];
    for (let i = STAND - 1; i >= 0; i--) q.push(i);
    for (let j = 1; j <= STAND; j++) q.push(j);
    queueRef.current = q;
  };

  useEffect(() => {
    let animId: number;
    let lastTime = 0;
    const fps = 15;
    const step = 1000 / fps;
    let nextFidget = performance.now() + 3000;

    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);
      if (!isVisible || document.hidden) return;

      if (now - lastTime < step) return;
      lastTime = now;

      if (queueRef.current.length > 0) {
        const nextFrame = queueRef.current.shift()!;
        setSpriteFrame(nextFrame);
      } else if (now > nextFidget) {
        nextFidget = now + 6000 + Math.random() * 5000;
        lookAround();
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

  // 3. Periodic tricks (hop, spin, wiggle)
  const triggerTrick = (cls: string, ms = 900) => {
    setActiveTrick(cls);
    setTimeout(() => setActiveTrick(null), ms);
  };

  useEffect(() => {
    if (!isVisible) return;

    const trickInterval = setInterval(() => {
      if (document.hidden) return;
      let t: number;
      do {
        t = Math.floor(Math.random() * TRICKS.length);
      } while (t === lastTrickRef.current);
      lastTrickRef.current = t;

      const chosen = TRICKS[t];
      if (chosen === "look") {
        lookAround();
      } else {
        triggerTrick(chosen, 900);
      }
    }, 7000);

    return () => clearInterval(trickInterval);
  }, [isVisible]);

  // 4. Speech bubble typing & cycling sequence
  const showLine = (line: BubbleLine) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setIsTyping(false);
    setBubbleOpen(true);
    // Chips need more time to read and tap (9s), plain lines move sooner (6s)
    bubbleTimerRef.current = setTimeout(hideLine, line.chips ? 9000 : 6000);
  };

  const hideLine = () => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setBubbleOpen(false);
    setIsTyping(false);
    if (!dismissed) {
      bubbleTimerRef.current = setTimeout(nextLine, 4500);
    }
  };

  const nextLine = () => {
    if (dismissed || !isVisible) return;
    const nextIdx = lineIdxRef.current % LINES.length;
    lineIdxRef.current += 1;
    setLineIndex(nextIdx);

    // 1. Show typing dots pill first (1.1s)
    setBubbleOpen(true);
    setIsTyping(true);

    bubbleTimerRef.current = setTimeout(() => {
      showLine(LINES[nextIdx]);
      triggerTrick("is-hop", 850);
    }, 1100);
  };

  useEffect(() => {
    if (isVisible && !dismissed) {
      const initialTimer = setTimeout(nextLine, 1200);
      return () => clearTimeout(initialTimer);
    }
  }, [isVisible, dismissed]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setBubbleOpen(false);
    setIsTyping(false);
  };

  const currentLine = LINES[lineIndex];

  return (
    <>
      {/* Floating Mascot Widget */}
      <div
        className={`banjara-float is-loaded ${isVisible ? "is-visible" : ""}`}
        aria-label="Ask Trail Explorers"
      >
        {/* Speech Bubble (pops up to the left of the avatar) */}
        <div
          className={`banjara-float__bubble ${bubbleOpen ? "is-open" : ""} ${
            isTyping ? "is-typing" : ""
          }`}
          role="status"
          aria-live="polite"
          onMouseEnter={() => {
            if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
          }}
          onMouseLeave={() => {
            if (bubbleOpen && !isTyping) {
              bubbleTimerRef.current = setTimeout(hideLine, 3000);
            }
          }}
        >
          {/* Animated 3 Dots for typing state */}
          <span className="banjara-float__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>

          {/* Question Text */}
          <p className="banjara-float__text">
            {currentLine.say}
            {currentLine.sub && <small>{currentLine.sub}</small>}
          </p>

          {/* Quick Choice Chips */}
          {currentLine.chips && currentLine.chips.length > 0 && (
            <div className="banjara-float__chips">
              {currentLine.chips.map((chip) => (
                <Link
                  key={chip}
                  href={`/plan-your-trip?ask=${encodeURIComponent(CHIP_ASK[chip] || chip)}`}
                  className="banjara-float__chip"
                >
                  {chip}
                </Link>
              ))}
            </div>
          )}

          {/* Close X Button */}
          <button
            type="button"
            onClick={handleClose}
            className="banjara-float__close"
            aria-label="Hide questions"
          >
            &times;
          </button>
        </div>

        {/* Mascot Avatar Launcher Tile */}
        <Link
          href="/plan-your-trip"
          className={`banjara-float__avatar ${activeTrick || ""}`}
          aria-label="Plan your trip with Trail Explorers, our trip planner"
          onMouseEnter={() => {
            triggerTrick("is-hop", 850);
          }}
        >
          <span className="banjara-float__window">
            <span className="banjara-float__peek">
              <span
                className="banjara-float__sprite"
                style={{
                  backgroundPosition: `${(spriteFrame / (FRAMES - 1)) * 100}% 0`,
                }}
              />
            </span>
          </span>
        </Link>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917016640870?text=Hi%20Trail%20Explorers!%20%F0%9F%91%8B%20I'm%20interested%20in%20planning%20a%20Himalayan%20trip%20with%20you.%20Could%20you%20share%20more%20details%3F"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="floating-whatsapp"
      >
        <svg
          className="w-[30px] h-[30px] fill-current text-white"
          viewBox="0 32 448 448"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </>
  );
};
