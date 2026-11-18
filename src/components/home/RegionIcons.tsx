import React from "react";
import Link from "next/link";
import Image from "next/image";

const REGIONS = [
  { name: "Ladakh", href: "/ladakh", icon: "/assets/images/destinations/icons/ladakh.png" },
  { name: "Spiti", href: "/spiti", icon: "/assets/images/destinations/icons/spiti.png" },
  { name: "Himachal", href: "/himachal", icon: "/assets/images/destinations/icons/himachal.png" },
  { name: "Kashmir", href: "/kashmir", icon: "/assets/images/destinations/icons/kashmir.png" },
  { name: "Uttarakhand", href: "/uttarakhand", icon: "/assets/images/destinations/icons/uttarakhand.png" },
];

export const RegionIcons: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-10" aria-label="Destinations">
      <div className="max-w-[1280px] mx-auto px-6">
        <ul className="list-none m-0 p-0 flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14">
          {REGIONS.map((region) => (
            <li key={region.name} className="flex flex-col items-center">
              <Link
                href={region.href}
                className="group flex flex-col items-center gap-2.5 text-inherit no-underline"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-black bg-white flex items-center justify-center p-3 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-sm">
                  <Image
                    src={region.icon}
                    alt={region.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-[#14140f] text-center">
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
