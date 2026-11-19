"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TRIPS_DATA } from "@/data/trips";
import { TripCard } from "@/components/trips/TripCard";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";

export default function WinterSpitiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const winterTrips = TRIPS_DATA.filter((t) =>
    t.title.toLowerCase().includes("winter") ||
    t.category.toLowerCase().includes("winter") ||
    (t.category.toLowerCase().includes("spiti") && t.title.toLowerCase().includes("expedition"))
  );

  const gatewayTrip = TRIPS_DATA.find((t) =>
    t.title.toLowerCase().includes("spiti valley group trip from delhi: winter expedition")
  ) || winterTrips[0] || TRIPS_DATA[0];

  const handleOpenBookModal = () => {
    if (typeof window !== "undefined" && window.openTripModal) {
      window.openTripModal("Winter Spiti", "/assets/images/trips/zanskar-monastery-gathering.jpg");
    }
  };

  const faqs = [
    {
      q: "Is Spiti open in winter?",
      a: "Yes. The Shimla–Kinnaur road into Spiti stays open all winter. The Manali side over Kunzum Pass closes for the season, so winter trips go via Shimla, Kinnaur, Nako and Tabo to Kaza.",
    },
    {
      q: "What is the best month for a winter Spiti trip?",
      a: "November is easiest for a first trip: first snow and mostly clear roads. December to February is full winter, with the most snow and the coldest nights. March brings warmer days with snow still on the ground.",
    },
    {
      q: "How many days do I need for winter Spiti?",
      a: "Plan on 8 to 9 days from Delhi. The Kinnaur route is longer than the Manali one, and the extra days help you acclimatise before Kaza.",
    },
    {
      q: "Is winter Spiti safe for first-timers?",
      a: "Yes, if you are in good health, follow the layering guidelines and acclimatise slowly. Our group trips go with an experienced winter mountain driver, a trip captain, a first-aid kit and backup oxygen.",
    },
    {
      q: "Can I travel to Spiti solo in winter?",
      a: "Yes. Joining a group departure is the easiest way: you share transport, stays and a trip captain with fellow travellers, and rooms are on a sharing basis.",
    },
    {
      q: "Which places can I visit in Spiti in winter?",
      a: "Chitkul, Nako Lake, the Gue mummy, Tabo and Dhankar monasteries, Kaza, Key Monastery, Chicham Bridge, Kibber, and the high villages of Hikkim, Komic and Langza. Chandratal and Kunzum Pass are closed in winter.",
    },
  ];

  return (
    <div className="w-full bg-[#fdfdfc] text-[#14140f]">
      {/* ============ HERO ============ */}
      <section className="text-center pt-[clamp(36px,5vw,64px)] pb-[clamp(16px,3vw,32px)] px-4">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center">
          <nav className="mb-4 text-[13px] font-semibold text-[#6b6b63]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#14140f] hover:underline">
              Home
            </Link>{" "}
            <span aria-hidden="true" className="mx-1">
              ›
            </span>{" "}
            <Link href="/spiti" className="hover:text-[#14140f] hover:underline">
              Spiti
            </Link>{" "}
            <span aria-hidden="true" className="mx-1">
              ›
            </span>{" "}
            <span className="text-[#14140f]">Winter Spiti</span>
          </nav>

          <div className="relative w-[clamp(80px,10vw,120px)] h-auto aspect-square mb-3.5">
            <Image
              src="/assets/images/destinations/icons/spiti.png"
              alt="Winter Spiti"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="font-heading font-extrabold text-[clamp(34px,6vw,72px)] tracking-[-0.03em] leading-none text-[#14140f] m-0">
            Winter Spiti Trip
          </h1>

          <p className="mt-3 text-[clamp(14px,1.6vw,18px)] font-semibold tracking-[0.22em] uppercase text-[#14140f]">
            The white desert · November to March
          </p>

          <div className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full bg-[#d6ff3f] text-[#14140f] text-[13px] font-semibold border border-[#14140f] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14140f]" aria-hidden="true" />
            <span>
              Winter trips from <strong className="text-[15px] font-extrabold">₹17,499</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="pt-[clamp(24px,3.5vw,40px)] px-4">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="text-[clamp(17px,2vw,20px)] leading-[1.6] text-[#3d3d36] text-balance">
            In winter, Spiti Valley turns into a frozen cold desert: snow on the mud-walled villages, frozen waterfalls, thousand-year-old monasteries and almost no other travellers. The Manali side closes for the season, so every winter Spiti trip goes the long way, from Shimla through Kinnaur.
          </p>
          <ul className="list-none m-0 mt-5 p-0 flex flex-wrap justify-center gap-2">
            <li className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f4ee] border border-[#e6e6df] text-[13px] font-semibold text-[#14140f]">
              ❄️ Open all winter via Kinnaur
            </li>
            <li className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f4ee] border border-[#e6e6df] text-[13px] font-semibold text-[#14140f]">
              🚐 Group departures from Delhi
            </li>
            <li className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f4ee] border border-[#e6e6df] text-[13px] font-semibold text-[#14140f]">
              🏔️ Kaza, Key, Hikkim, Langza
            </li>
          </ul>
        </div>
      </section>

      {/* ============ START HERE ============ */}
      <section className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] tracking-[-0.02em] text-[#14140f] m-0">
            New to winter Spiti? Start with the Spiti Group Trip
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6b6b63] mt-1 m-0">
            Our most affordable winter trip and the easiest way to see Spiti in snow: from Delhi and back, with a trip captain all the way.
          </p>
        </div>

        {gatewayTrip && (
          <article className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] overflow-hidden border-2 border-[#14140f] rounded-[28px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <Link
              href={`/trips/${gatewayTrip.slug || "spiti-tours-spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930"}`}
              className="relative min-h-[260px] sm:min-h-[320px] block"
            >
              <Image
                src={gatewayTrip.image_url || "/assets/images/trips/trip_103_image_url.jpg"}
                alt={gatewayTrip.title}
                fill
                className="object-cover"
              />
            </Link>

            <div className="flex flex-col items-start justify-between gap-3 p-[clamp(24px,4vw,40px)]">
              <span className="inline-block px-3 py-1 rounded-full bg-[#d6ff3f] border border-[#14140f] text-[12px] font-extrabold tracking-[0.08em] uppercase text-[#14140f]">
                Start here
              </span>

              <h3 className="font-heading font-extrabold text-[clamp(24px,3vw,34px)] leading-tight text-[#14140f] m-0">
                <Link
                  href={`/trips/${gatewayTrip.slug || "spiti-tours-spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930"}`}
                  className="hover:underline"
                >
                  {gatewayTrip.title}
                </Link>
              </h3>

              <p className="text-[14px] text-[#6b6b63] leading-relaxed m-0">
                {gatewayTrip.duration} · Delhi — Shimla — Sangla — Chitkul — Tabo — Kaza — Langza — Komic — Hikkim — Key — Chicham — Kalpa — Shimla — Delhi
              </p>

              <div className="flex items-center gap-2 text-[13px] my-1">
                <span className="text-[#6b6b63]">Next departures:</span>
                <strong className="px-2 py-0.5 rounded bg-[#f0f0eb] text-[#14140f] font-bold">20 Nov</strong>
                <strong className="px-2 py-0.5 rounded bg-[#f0f0eb] text-[#14140f] font-bold">8 Dec</strong>
              </div>

              <div className="w-full flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[#e2e2dc]">
                <div>
                  <small className="block text-[11px] text-[#6b6b63] uppercase font-bold">Starts from</small>
                  <strong className="text-[22px] font-extrabold text-[#14140f]">₹17,499</strong>
                </div>

                <Link
                  href={`/trips/${gatewayTrip.slug || "spiti-tours-spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930"}`}
                  className="px-6 py-2.5 rounded-full bg-[#d6ff3f] text-[#14140f] font-heading font-extrabold text-[14px] border border-[#14140f] hover:bg-[#ccff00] hover:scale-105 active:scale-95 transition-all"
                >
                  See itinerary &amp; dates
                </Link>
              </div>
            </div>
          </article>
        )}
      </section>

      {/* ============ MONTH BY MONTH ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12 sm:pb-16">
        <div className="mb-8">
          <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] tracking-[-0.02em] text-[#14140f] m-0">
            Spiti in winter, month by month
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6b6b63] mt-1 m-0">
            Pick your month for the kind of winter you want.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 m-0">
          {[
            {
              month: "November",
              title: "First snow, clear skies",
              desc: "The tourist season is over and the first snow dusts the high villages, but the roads are usually clear. Cold nights, bright days. The easiest winter month for a first trip.",
            },
            {
              month: "December",
              title: "Snow settles in",
              desc: "The valley turns white, streams start to freeze and nights drop well below -15°C. Monasteries and villages are at their quietest.",
            },
            {
              month: "January – February",
              title: "Deep winter",
              desc: "The heaviest snow, frozen waterfalls and the coldest nights. Snow leopard season around Kibber, though sightings are never guaranteed. Expect the odd road delay after fresh snowfall.",
            },
            {
              month: "March",
              title: "The thaw begins",
              desc: "Snow is still on the ground, but the days are warmer and longer. A good month if you want snow without the deepest cold.",
            },
          ].map((m, idx) => (
            <li key={idx} className="p-6 rounded-[20px] bg-[#f8f8f5] border border-[#e2e2dc] flex flex-col">
              <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full self-start mb-3">
                {m.month}
              </span>
              <h3 className="font-heading font-extrabold text-[18px] text-[#14140f] mb-2 leading-snug">
                {m.title}
              </h3>
              <p className="text-[14px] text-[#6b6b63] leading-relaxed m-0 flex-1">
                {m.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ ROUTE + COLD FACTS ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#e2e2dc] shadow-sm">
            <h2 className="font-heading font-extrabold text-[22px] sm:text-[26px] text-[#14140f] mb-4">
              How to reach Spiti in winter
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#6b6b63] leading-relaxed mb-4">
              From Delhi, take an overnight bus to Shimla, then drive along the Sutlej through Kinnaur: Sangla and Chitkul, Nako, Tabo and on to Kaza. This road stays open through winter, though fresh snow can slow it down for a day.
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#6b6b63] leading-relaxed m-0">
              The Manali route over Kunzum Pass closes with the first heavy snow, usually by November, and stays shut until late spring. Chandratal Lake can&apos;t be reached in winter.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#e2e2dc] shadow-sm">
            <h2 className="font-heading font-extrabold text-[22px] sm:text-[26px] text-[#14140f] mb-4">
              How cold does Spiti get?
            </h2>
            <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-[#6b6b63] p-0 list-none m-0">
              <li>
                <strong className="text-[#14140f] font-bold">Days:</strong> about -5°C to 5°C, with strong sun.
              </li>
              <li>
                <strong className="text-[#14140f] font-bold">Nights:</strong> -15°C to -25°C in December to February.
              </li>
              <li>
                <strong className="text-[#14140f] font-bold">Water:</strong> pipes freeze, so homestays use dry toilets and heat water in buckets.
              </li>
              <li>
                <strong className="text-[#14140f] font-bold">Network:</strong> postpaid Jio and BSNL work best. Carry cash, as ATMs rarely work in winter.
              </li>
              <li>
                <strong className="text-[#14140f] font-bold">Pack:</strong> thermal layers, a -20°C down jacket, waterproof snow boots, gloves, a balaclava and UV sunglasses.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ ALL WINTER TRIPS ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12 sm:pb-16">
        <div className="mb-8">
          <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] tracking-[-0.02em] text-[#14140f] m-0">
            All winter Spiti trips
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6b6b63] mt-1 m-0">
            Group departures from Delhi, from our most affordable trip to the full 4x4 expedition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {winterTrips.map((trip, idx) => (
            <TripCard key={trip.id || idx} trip={trip} />
          ))}
        </div>

        <p className="mt-8 text-center sm:text-left">
          <Link href="/spiti" className="inline-flex items-center gap-1.5 font-bold text-[14px] text-[#14140f] hover:underline">
            <span>See every Spiti trip, summer and winter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      </section>

      {/* ============ FAQ ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] tracking-[-0.02em] text-[#14140f] m-0">
            Winter Spiti FAQs
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#e2e2dc] rounded-[16px] bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-heading font-bold text-[16px] text-[#14140f] cursor-pointer hover:bg-[#fafaf7]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-250 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-[14px] sm:text-[15px] text-[#6b6b63] leading-relaxed border-t border-[#f0f0eb] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ BOOK CTA ============ */}
      <section className="max-w-[1200px] mx-auto px-4 pb-16">
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-[clamp(20px,4vw,48px)] p-[clamp(28px,5vw,56px)] rounded-[28px] bg-[#14140f] text-white overflow-hidden">
          <div
            className="absolute -right-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(closest-side, rgba(214, 255, 63, 0.18), rgba(214, 255, 63, 0))",
            }}
          />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1.5 rounded-full bg-[#d6ff3f] text-[#14140f] text-[12px] font-bold tracking-[0.12em] uppercase mb-4">
              Book your winter Spiti trip
            </span>

            <h2 className="font-heading font-extrabold text-[clamp(28px,4vw,46px)] leading-[1.08] text-white text-balance m-0">
              Ready for the white desert?
            </h2>

            <p className="text-white/75 text-[15px] sm:text-[16px] my-3.5 mb-6 max-w-[460px] leading-relaxed">
              Tell us your month and group size. We&apos;ll call you back within 24 hours with dates and a price.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                id="winterBookBtn"
                onClick={handleOpenBookModal}
                className="px-8 py-3 rounded-full bg-[#d6ff3f] text-[#14140f] font-heading font-extrabold text-[15px] border border-[#d6ff3f] hover:bg-[#ccff00] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_4px_16px_rgba(214,255,63,0.3)]"
              >
                Book Now
              </button>

              <a
                href="https://wa.me/919103910523?text=Hi%20Awara%20Banjara!%20%F0%9F%91%8B%20I'm%20interested%20in%20a%20winter%20Spiti%20trip.%20Could%20you%20share%20the%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/5 transition-all text-[14px] font-bold"
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
                src="/assets/images/destinations/icons/spiti.png"
                alt="Winter Spiti"
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
            href="https://wa.me/919103910523"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#14140f] hover:opacity-80 transition-opacity"
          >
            <span className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center text-white shrink-0 shadow-sm">
              <MessageCircle className="w-5 h-5 fill-white" />
            </span>
            <span className="flex flex-col text-left">
              <small className="text-[11px] text-[#6b6b63] font-semibold">Instant WhatsApp Booking:</small>
              <strong className="text-[15px] font-bold text-[#14140f]">+91-91 03 910 523</strong>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6b63]">
              FOLLOW TRAILS ON:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/awarabanjaracommunity?igsh=MXhpZG11ZnV4MmdhcA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#f4f4ee] flex items-center justify-center text-[#14140f] hover:bg-[#d6ff3f] transition-colors"
              >
                📸
              </a>
              <a
                href="https://youtube.com/@awarabanjara.travel?si=pvucdi12kuNIf2Z8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#f4f4ee] flex items-center justify-center text-[#14140f] hover:bg-[#d6ff3f] transition-colors"
              >
                ▶️
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
