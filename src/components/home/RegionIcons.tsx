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
    <section className="w-full pt-10 sm:pt-14 md:pt-16 pb-10 bg-white" aria-label="Destinations">
      <Container>
        <ul className="list-none m-0 p-0 flex flex-nowrap sm:flex-wrap justify-between sm:justify-center items-center gap-4 sm:gap-8 md:gap-14 overflow-x-auto no-scrollbar py-2">
          {REGIONS.map((region) => (
            <li key={region.name} className="flex-none sm:flex-1 max-w-[150px] min-w-[90px] text-center">
              <Link
                href={region.href}
                className="group flex flex-col items-center gap-3 text-inherit no-underline"
              >
                <div className="w-full aspect-square relative transition-transform duration-250 ease-out group-hover:-translate-y-1.5">
                  <Image
                    src={region.icon}
                    alt={region.name}
                    width={170}
                    height={170}
                    className="w-full h-full object-contain filter group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <span className="text-[clamp(12px,1.3vw,16px)] font-medium tracking-[0.12em] uppercase text-[#14140f] group-hover:text-black transition-colors">
                  {region.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
