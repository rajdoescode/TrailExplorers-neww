"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TRIPS_DATA } from "@/data/trips";
import { TripCard } from "@/components/trips/TripCard";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";

export interface RegionPageProps {
  regionId: string;
  regionName: string;
  title: string;
  tagline: string;
  iconSrc: string;
  startingPrice: string;
  tripCount: string;
  lead: string;
  pills: string[];
  story: string;
  facts: { label: string; value: string }[];
  showWinterStrip?: boolean;
  filterCategories: string[];
  modalImage?: string;
}

export const RegionPageTemplate: React.FC<RegionPageProps> = ({
  regionId,
  regionName,
  title,
  tagline,
  iconSrc,
  startingPrice,
  tripCount,
  lead,
  pills,
  story,
  facts,
  showWinterStrip,
  filterCategories,
  modalImage = "/assets/images/home/escape-ordinary.webp",
}) => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Filter trips for this region
  const regionTrips = TRIPS_DATA.filter((trip) => {
    const tripCat = (trip.category || "").toLowerCase();
    const tripTitle = (trip.title || "").toLowerCase();
    const tripRoute = (trip.route || "").toLowerCase();
    const nameMatch = regionName.toLowerCase();

    return (
      filterCategories.some((cat) => tripCat.includes(cat.toLowerCase())) ||
      tripTitle.includes(nameMatch) ||
      tripRoute.includes(nameMatch)
    );
  });

  // Separate into community trips (or departures) and general packages
  const communityTrips = regionTrips.filter(
    (t) =>
      t.category.includes("community") ||
      t.title.toLowerCase().includes("group trip") ||
      t.title.toLowerCase().includes("community trip") ||
      t.title.toLowerCase().includes("expedition")
  );

  const otherTrips = regionTrips.filter(
    (t) => !communityTrips.some((c) => c.title === t.title)
  );

  const displayCommunity = communityTrips.length > 0 ? communityTrips : regionTrips.slice(0, 4);
  const displayAll = otherTrips.length > 0 ? otherTrips : regionTrips;

  const handleOpenBookModal = () => {
    if (typeof window !== "undefined" && window.openTripModal) {
      window.openTripModal(regionName, modalImage);
    }
  };

  return (
    <div className="w-full bg-[#fdfdfc] text-[#14140f]">
      {/* ============ REGION HERO ============ */}
      <section className="text-center pt-[clamp(48px,7vw,88px)] pb-[clamp(16px,3vw,32px)] px-4">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center">
          <div className="relative w-[clamp(80px,10vw,120px)] h-auto aspect-square mb-3.5">
            <Image
              src={iconSrc}
              alt={title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="font-heading font-extrabold text-[clamp(34px,6vw,72px)] tracking-[-0.03em] leading-none text-[#14140f] m-0">
            {title}
          </h1>

          <p className="mt-3 text-[clamp(14px,1.6vw,18px)] font-semibold tracking-[0.22em] uppercase text-[#14140f]">
            {tagline}
          </p>

          <div className="inline-flex items-center flex-wrap justify-center gap-1.5 mt-5 px-3.5 py-1.5 rounded-full bg-[#d6ff3f] text-[#14140f] text-[13px] font-semibold border border-[#14140f] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14140f]" aria-hidden="true" />
            <span>
              Trips starting from <strong className="text-[15px] font-extrabold">{startingPrice}</strong>
            </span>
            <span className="font-medium text-[12px] pl-2 border-l border-[#14140f]/30">
              {tripCount}
            </span>
          </div>
        </div>
      </section>

      {/* ============ ABOUT THIS REGION ============ */}
      <section className="pt-[clamp(28px,4vw,44px)] px-4">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="text-[clamp(17px,2vw,20px)] leading-[1.6] text-[#3d3d36] text-balance">
            {lead}
          </p>

          <ul className="list-none m-0 mt-5 p-0 flex flex-wrap justify-center gap-2">
            {pills.map((pill, idx) => (
              <li
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f4ee] border border-[#e6e6df] text-[13px] font-semibold text-[#14140f]"
              >
                {pill}
              </li>
            ))}
          </ul>

          {/* Expandable story and facts */}
          <div
            className={`grid transition-all duration-400 ease-in-out ${
              isAboutExpanded ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr] mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-2 text-left">
                <p className="text-[15px] leading-[1.7] text-[#3d3d36] mb-5">
                  {story}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {facts.map((fact, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 rounded-[14px] bg-[#f4f4ee]">
                      <span className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#14140f] mb-1">
                        {fact.label}
                      </span>
                      <p className="text-[14px] leading-[1.5] text-[#6b6b63] m-0">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="inline-flex items-center gap-1.5 mt-4 px-2 py-1 bg-transparent border-0 font-heading font-bold text-[14px] text-[#14140f] cursor-pointer hover:opacity-70 transition-opacity"
          >
            <span>{isAboutExpanded ? `Show less about ${regionName}` : `Read more about ${regionName}`}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isAboutExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </section>

      {/* ============ WINTER SPITI STRIP (if applicable) ============ */}
      {showWinterStrip && (
        <section className="max-w-[1200px] mx-auto px-4 mt-8">
          <Link
            href="/winter-spiti"
            className="group flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-2.5 rounded-[24px] sm:rounded-full bg-[#14140f] text-white hover:bg-black transition-all shadow-md"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shrink-0 self-start mt-0.5 sm:self-center sm:mt-0">
              <span className="text-[17px] leading-none">❄️</span>
            </div>

            <div className="flex-1 min-w-0 pr-1 sm:pr-0">
              <div className="hidden sm:block text-[15px] truncate">
                <strong className="font-extrabold text-white">Winter Spiti is open</strong>
                <span className="text-white/75 font-normal ml-1.5">
                  · Group trips from Delhi ·{" "}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold text-xs">
                    Nov – Mar
                  </span>{" "}
                  ·{" "}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d6ff3f]/15 text-[#d6ff3f] font-bold text-xs">
                    from ₹17,499
                  </span>
                </span>
              </div>

              <div className="block sm:hidden">
                <h3 className="text-[16px] font-extrabold text-white leading-tight m-0">
                  Winter Spiti is open
                </h3>
                <p className="text-[13px] text-[#a3a39e] font-medium leading-tight mt-1 mb-1.5">
                  Group trips from Delhi
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-semibold">
                    Nov – Mar
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d6ff3f]/15 text-[#d6ff3f] text-[11px] font-bold">
                    from ₹17,499
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <span className="w-11 h-11 sm:w-auto sm:h-auto sm:px-5 sm:py-2 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center text-xs sm:text-sm font-bold group-hover:bg-[#ccff00] transition-colors shadow-sm">
                <span className="hidden sm:inline mr-1.5">Explore</span>
                <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ============ COMMUNITY TRIPS IN THIS REGION ============ */}
      <section className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] tracking-[-0.02em] text-[#14140f] m-0">
            {regionName} Community Trips
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6b6b63] mt-1 m-0">
            Join a group departure. Arrive as strangers, leave as friends.
          </p>
        </div>

        {displayCommunity.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {displayCommunity.map((trip, idx) => (
              <TripCard key={trip.id || idx} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 sm:p-12 border-2 border-dashed border-[#e0e0d8] rounded-[20px] text-[#6b6b63]">
            New community departures are on the way. Ask us about the next batch.
          </div>
        )}
      </section>

      {/* ============ ALL TRIPS IN THIS REGION ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12 sm:pb-16">
        <div className="mb-8">
          <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] tracking-[-0.02em] text-[#14140f] m-0">
            All {regionName} Trips
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6b6b63] mt-1 m-0">
            Treks, road trips and private tours you can book on your dates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayAll.map((trip, idx) => (
            <TripCard key={trip.id || idx} trip={trip} />
          ))}
        </div>
      </section>

      {/* ============ TRAIL EXPLORERS PLANNER BANNER ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12 sm:pb-16">
        <div className="relative bg-[#14140f] text-white rounded-[24px] p-6 sm:p-8 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-black/10">
          <div className="relative z-10 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#d6ff3f] text-[#14140f] text-[11px] font-bold uppercase tracking-wider mb-3">
              Private Trip Planner
            </span>
            <h3 className="font-heading font-extrabold text-[22px] sm:text-[28px] text-white leading-tight m-0">
              Need a custom {regionName} itinerary?
            </h3>
            <p className="text-white/75 text-[14px] sm:text-[15px] mt-2 mb-5 leading-relaxed">
              Tell us where and when you want to travel, and our trip planner shapes a customized day-by-day plan with immediate pricing.
            </p>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d6ff3f] text-[#14140f] font-bold text-[14px] hover:bg-[#ccff00] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative shrink-0 flex items-center justify-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <Image
                src="/assets/images/mascot/explorer-standing.webp"
                alt="Trail Explorers Trip Planner"
                fill
                className="object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/images/mascot/explorer-face.webp";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ BOOK CTA ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-16">
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-[clamp(20px,4vw,48px)] p-[clamp(28px,5vw,56px)] rounded-[28px] bg-[#14140f] text-white overflow-hidden">
          {/* Radial lime glow */}
          <div
            className="absolute -right-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(closest-side, rgba(214, 255, 63, 0.18), rgba(214, 255, 63, 0))",
            }}
          />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1.5 rounded-full bg-[#d6ff3f] text-[#14140f] text-[12px] font-bold tracking-[0.12em] uppercase mb-4">
              Book your {regionName} trip
            </span>

            <h2 className="font-heading font-extrabold text-[clamp(28px,4vw,46px)] leading-[1.08] text-white text-balance m-0">
              Ready for the mountains?
            </h2>

            <p className="text-white/75 text-[15px] sm:text-[16px] my-3.5 mb-6 max-w-[460px] leading-relaxed">
              Tell us when you want to go and we&apos;ll call you back with the right {regionName} trip.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                id="regionBookBtn"
                onClick={handleOpenBookModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#d6ff3f] text-[#14140f] font-heading font-extrabold text-[15px] border border-[#d6ff3f] hover:bg-[#ccff00] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_4px_16px_rgba(214,255,63,0.3)] min-h-[48px] flex items-center justify-center"
              >
                Book Now
              </button>

              <a
                href={`https://wa.me/917016640870?text=Hi%20Trail%20Explorers!%20%F0%9F%91%8B%20I'm%20interested%20in%20a%20${regionName}%20trip.%20Could%20you%20share%20the%20details%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/5 transition-all text-[14px] font-bold min-h-[48px] active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#25d366]" />
                <span>WhatsApp us</span>
              </a>
            </div>

            <ul className="list-none m-0 mt-7 pt-4 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/60">
              <li>
                <strong className="text-white font-bold mr-1">4.9★</strong> Google reviews
              </li>
              <li>
                <strong className="text-white font-bold mr-1">5,000+</strong> travellers
              </li>
              <li>
                <strong className="text-white font-bold mr-1">24/7</strong> support
              </li>
            </ul>
          </div>

          <div className="relative z-10 shrink-0 flex items-center justify-center order-first md:order-last">
            <div className="relative w-[110px] sm:w-[clamp(160px,22vw,240px)] aspect-square filter invert opacity-90">
              <Image
                src={iconSrc}
                alt={regionName}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHATSAPP / SOCIAL BAR ============ */}
      <div className="max-w-[1200px] mx-auto px-4 pb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[18px] bg-white border border-[#e2e2dc] shadow-sm">
          <a
            href="https://wa.me/917016640870"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#14140f] hover:opacity-80 transition-opacity"
          >
            <span className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center text-white shrink-0 shadow-sm">
              <MessageCircle className="w-5 h-5 fill-white" />
            </span>
            <span className="flex flex-col text-left">
              <small className="text-[11px] text-[#6b6b63] font-semibold">Instant WhatsApp Booking:</small>
              <strong className="text-[15px] font-bold text-[#14140f]">+91 70166 40870</strong>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6b63]">
              FOLLOW TRAILS ON:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/trail_explorers_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#f4f4ee] flex items-center justify-center text-[#14140f] hover:bg-[#d6ff3f] active:scale-95 transition-all"
              >
                📸
              </a>
              <a
                href="https://www.youtube.com/@Trail_Explorers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#f4f4ee] flex items-center justify-center text-[#14140f] hover:bg-[#d6ff3f] active:scale-95 transition-all"
              >
                ▶️
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
