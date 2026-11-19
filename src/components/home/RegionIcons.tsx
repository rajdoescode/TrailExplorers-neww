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
    <section className="region-icons overflow-hidden" aria-label="Destinations">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
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
    </section>
  );
};
