"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NotFoundViewProps {
  customPath?: string;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ customPath }) => {
  const currentPathname = usePathname();
  const [displayPath, setDisplayPath] = useState<string>(
    customPath || "/trips/himachal-tours-kullu-dussehra-special-cultural-expedition-manali-escape-17903641517345"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      if (p && p !== "/" && p !== "/404" && p !== "/404.html") {
        try {
          setDisplayPath(decodeURIComponent(p).slice(0, 90));
        } catch {
          setDisplayPath(p.slice(0, 90));
        }
      } else if (currentPathname && currentPathname !== "/" && currentPathname !== "/404") {
        setDisplayPath(currentPathname.slice(0, 90));
      }
    }
  }, [currentPathname]);

  const roads = [
    { label: "Ladakh", href: "/ladakh" },
    { label: "Spiti", href: "/spiti" },
    { label: "Himachal", href: "/himachal" },
    { label: "Kashmir", href: "/kashmir" },
    { label: "Uttarakhand", href: "/uttarakhand" },
    { label: "Winter Spiti", href: "/winter-spiti" },
  ];

  return (
    <main className="w-full bg-white">
      {/* ============ LOST HERO ============ */}
      <section className="nf-hero">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 nf-inner">
          <div className="nf-copy">
            <span className="nf-eyebrow">Error 404 · Off the map</span>
            <h1>
              You&apos;ve wandered <mark>off the trail.</mark>
            </h1>
            <p>
              This page doesn&apos;t exist. Maybe the link is old, or the road got washed out.
              Even the best banjaras take a wrong turn.
            </p>
            {displayPath && (
              <p className="nf-missing mt-2">
                We looked everywhere for <span className="nf-path">{displayPath}</span>
              </p>
            )}
            <div className="nf-actions">
              <a href="/" className="btn btn-primary cursor-pointer">
                Take me home
              </a>
              <a href="/community-trips" className="btn btn-outline cursor-pointer">
                Browse all trips
              </a>
            </div>
          </div>

          {/* Himalayan Roadside Milestone 404 */}
          <div className="nf-stone" aria-hidden="true">
            <div className="nf-stone-body">
              <div className="nf-stone-cap">Nowhere</div>
              <div className="nf-stone-num">404</div>
              <div className="nf-stone-unit">km</div>
            </div>
            <div className="nf-stone-foot"></div>
          </div>
        </div>

        {/* Ridge line with a trail that wanders off the edge */}
        <svg
          className="nf-ridge"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 120 L140 70 L230 105 L380 25 L520 110 L640 60 L760 115 L900 35 L1040 100 L1150 55 L1290 112 L1440 50 L1440 200 L0 200 Z"
            fill="#14140f"
            opacity="0.12"
          />
          <path
            d="M0 160 L120 125 L260 150 L420 92 L560 148 L700 110 L860 155 L1010 100 L1160 150 L1300 118 L1440 140 L1440 200 L0 200 Z"
            fill="#14140f"
          />
          <path
            d="M120 196 C 300 180, 420 186, 560 176 S 820 182, 980 170 S 1240 150, 1380 186"
            fill="none"
            stroke="#d6ff3f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="2 14"
          />
        </svg>
      </section>

      {/* ============ WAYS BACK ============ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 nf-roads">
        <div className="nf-roads-head">
          <h2>Pick a road instead</h2>
          <p>Every one of these goes somewhere.</p>
        </div>

        <ul className="nf-road-list">
          {roads.map((road) => (
            <li key={road.href}>
              <a href={road.href} className="cursor-pointer">
                {road.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nf-links">
          <a href="/plan-your-trip" className="nf-link cursor-pointer">
            <strong>Plan your trip</strong>
            <span>Build your own Himalayan route in a few taps.</span>
          </a>
          <a href="/tour-packages" className="nf-link cursor-pointer">
            <strong>Tour packages</strong>
            <span>Private, group and educational trips.</span>
          </a>
          <a
            href="https://wa.me/919103910523"
            target="_blank"
            rel="noopener noreferrer"
            className="nf-link nf-link-wa cursor-pointer"
          >
            <strong>Ask a local on WhatsApp</strong>
            <span>Looking for a specific trip? We&apos;ll point the way.</span>
          </a>
        </div>
      </section>
    </main>
  );
};
