import React from "react";
import Link from "next/link";

const REGIONS = [
  { name: "Ladakh", href: "/ladakh", icon: "/assets/images/destinations/icons/ladakh.png" },
  { name: "Spiti", href: "/spiti", icon: "/assets/images/destinations/icons/spiti.png" },
  { name: "Himachal", href: "/himachal", icon: "/assets/images/destinations/icons/himachal.png" },
  { name: "Kashmir", href: "/kashmir", icon: "/assets/images/destinations/icons/kashmir.png" },
  { name: "Uttarakhand", href: "/uttarakhand", icon: "/assets/images/destinations/icons/uttarakhand.png" },
];

export const RegionIcons: React.FC = () => {
  return (
    <section
      className="w-full bg-white pt-[clamp(40px,6vw,72px)] pb-[clamp(32px,4vw,56px)]"
      aria-label="Destinations"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <ul className="list-none m-0 p-0 flex flex-wrap justify-center items-center gap-[clamp(16px,4vw,56px)]">
          {REGIONS.map((region) => (
            <li
              key={region.name}
              className="flex flex-col items-center gap-[14px] w-[clamp(96px,14vw,170px)] shrink-0"
            >
              <Link
                href={region.href}
                className="group flex flex-col items-center gap-[14px] w-full text-inherit no-underline"
              >
                <span
                  className="block w-full aspect-square bg-[#14140f] transition-transform duration-250 ease-out group-hover:-translate-y-1"
                  style={{
                    WebkitMask: `url('${region.icon}') center / contain no-repeat`,
                    mask: `url('${region.icon}') center / contain no-repeat`,
                  }}
                  aria-hidden="true"
                />
                <span className="text-[clamp(12px,1.4vw,17px)] font-medium tracking-[0.12em] uppercase text-[#14140f] text-center">
                  {region.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
