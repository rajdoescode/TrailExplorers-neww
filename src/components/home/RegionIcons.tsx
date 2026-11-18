import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

const REGIONS = [
  { name: "Ladakh", href: "/ladakh", icon: "/assets/images/destinations/icons/ladakh.png" },
  { name: "Spiti", href: "/spiti", icon: "/assets/images/destinations/icons/spiti.png" },
  { name: "Himachal", href: "/himachal", icon: "/assets/images/destinations/icons/himachal.png" },
  { name: "Kashmir", href: "/kashmir", icon: "/assets/images/destinations/icons/kashmir.png" },
  { name: "Uttarakhand", href: "/uttarakhand", icon: "/assets/images/destinations/icons/uttarakhand.png" },
];

export const RegionIcons: React.FC = () => {
  return (
    <section className="w-full py-8 bg-[#ffffff]">
      <Container>
        <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-10 md:gap-16 overflow-x-auto no-scrollbar py-2">
          {REGIONS.map((region) => (
            <Link
              key={region.name}
              href={region.href}
              className="flex flex-col items-center gap-2 group shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f6f6f1] border-2 border-[#14140f] flex items-center justify-center p-3 shadow-sm group-hover:scale-110 group-hover:bg-[#d6ff3f] transition-all duration-200">
                <Image
                  src={region.icon}
                  alt={region.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain filter group-hover:brightness-90 transition-all"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#14140f] tracking-tight group-hover:underline underline-offset-2">
                {region.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
