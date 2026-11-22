"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const REGIONS = [
  { name: "LADAKH", href: "/ladakh", icon: "/assets/images/destinations/icons/ladakh.png" },
  { name: "SPITI", href: "/spiti", icon: "/assets/images/destinations/icons/spiti.png" },
  { name: "HIMACHAL", href: "/himachal", icon: "/assets/images/destinations/icons/himachal.png" },
  { name: "KASHMIR", href: "/kashmir", icon: "/assets/images/destinations/icons/kashmir.png" },
  { name: "UTTARAKHAND", href: "/uttarakhand", icon: "/assets/images/destinations/icons/uttarakhand.png" },
];

// Doubled for smooth, seamless infinite loop marquee on mobile screens
const MARQUEE_REGIONS = [...REGIONS, ...REGIONS];

export const RegionIcons: React.FC = () => {
  const router = useRouter();
  const [pickedRegion, setPickedRegion] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setPickedRegion(name);
    setTimeout(() => {
      router.push(href);
    }, 380);
  };

  return (
    <section className="region-icons overflow-hidden py-3 sm:py-5 relative z-20" aria-label="Destinations">
      {/* Centered Glassmorphic Plate */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white/75 backdrop-blur-xl rounded-[26px] sm:rounded-[28px] p-4 sm:p-7 border border-white/80 shadow-[0_12px_40px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.95)_inset]">
          {/* Desktop view: centered grid of 5 destination icons */}
          <div className="hidden md:block">
            <ul className="region-icons-list">
              {REGIONS.map((region) => {
                const isPicked = pickedRegion === region.name;
                return (
                  <li key={region.name} className="region-icon">
                    <Link
                      href={region.href}
                      onClick={(e) => handleClick(e, region.href, region.name)}
                      className={isPicked ? "is-picked" : ""}
                    >
                      <span
                        className="region-icon-art"
                        style={{
                          WebkitMaskImage: `url('${region.icon}')`,
                          maskImage: `url('${region.icon}')`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="region-icon-name">{region.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile view: continuous infinite marquee animation moving left-to-right */}
          <div className="block md:hidden region-marquee-wrapper">
            <div className="region-marquee-track">
              {/* Primary animated group */}
              <ul className="region-marquee-group">
                {MARQUEE_REGIONS.map((region, idx) => {
                  const isPicked = pickedRegion === region.name;
                  return (
                    <li key={`mob-1-${region.name}-${idx}`} className="region-icon shrink-0">
                      <Link
                        href={region.href}
                        onClick={(e) => handleClick(e, region.href, region.name)}
                        className={isPicked ? "is-picked" : ""}
                      >
                        <span
                          className="region-icon-art"
                          style={{
                            WebkitMaskImage: `url('${region.icon}')`,
                            maskImage: `url('${region.icon}')`,
                          }}
                          aria-hidden="true"
                        />
                        <span className="region-icon-name">{region.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Secondary duplicated group for seamless continuous loop */}
              <ul className="region-marquee-group" aria-hidden="true">
                {MARQUEE_REGIONS.map((region, idx) => {
                  const isPicked = pickedRegion === region.name;
                  return (
                    <li key={`mob-2-${region.name}-${idx}`} className="region-icon shrink-0">
                      <Link
                        href={region.href}
                        onClick={(e) => handleClick(e, region.href, region.name)}
                        tabIndex={-1}
                        className={isPicked ? "is-picked" : ""}
                      >
                        <span
                          className="region-icon-art"
                          style={{
                            WebkitMaskImage: `url('${region.icon}')`,
                            maskImage: `url('${region.icon}')`,
                          }}
                          aria-hidden="true"
                        />
                        <span className="region-icon-name">{region.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
