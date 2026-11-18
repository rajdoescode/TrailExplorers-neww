import React from "react";
import Link from "next/link";
import Image from "next/image";

const REGIONS = [
  { name: "LADAKH", href: "/ladakh", icon: "/assets/images/destinations/icons/ladakh.png" },
  { name: "SPITI", href: "/spiti", icon: "/assets/images/destinations/icons/spiti.png" },
  { name: "HIMACHAL", href: "/himachal", icon: "/assets/images/destinations/icons/himachal.png" },
  { name: "KASHMIR", href: "/kashmir", icon: "/assets/images/destinations/icons/kashmir.png" },
  { name: "UTTARAKHAND", href: "/uttarakhand", icon: "/assets/images/destinations/icons/uttarakhand.png" },
];

export const RegionIcons: React.FC = () => {
  return (
    <section className="w-full bg-white pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8" aria-label="Destinations">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ul className="list-none m-0 p-0 flex flex-nowrap overflow-x-auto sm:overflow-visible sm:flex-wrap justify-start sm:justify-center items-end gap-5 sm:gap-8 md:gap-12 lg:gap-14 no-scrollbar">
          {REGIONS.map((region) => (
            <li
              key={region.name}
              className="shrink-0 w-[110px] sm:w-[130px] md:w-[150px] lg:w-[170px] flex flex-col items-center"
            >
              <Link
                href={region.href}
                className="group flex flex-col items-center gap-3 sm:gap-3.5 w-full text-inherit no-underline cursor-pointer"
              >
                <div className="relative w-full aspect-square flex items-center justify-center transition-transform duration-250 ease-out group-hover:-translate-y-1.5 group-hover:scale-105">
                  <Image
                    src={region.icon}
                    alt={region.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain pointer-events-none"
                    priority
                  />
                </div>
                <span className="text-[11px] sm:text-[12.5px] md:text-[14px] font-semibold tracking-[0.14em] uppercase text-[#14140f] text-center transition-colors group-hover:text-black">
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
