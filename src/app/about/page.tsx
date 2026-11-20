import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { TEAM_MEMBERS } from "@/data/team";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Raised in the Himalayas | Trail Explorers",
  description:
    "Trail Explorers is a Manali-born travel community, raised in the Himalayas. Local crews, local homestays and mountain know-how on every Spiti, Ladakh and Kashmir trip.",
  openGraph: {
    title: "About Us — Raised in the Himalayas | Trail Explorers",
    description:
      "Trail Explorers is a Manali-born travel community, raised in the Himalayas. Local crews, local homestays and mountain know-how on every Spiti, Ladakh and Kashmir trip.",
    images: [{ url: "/assets/images/about/pagoda-hero.jpg" }],
  },
};

export default function AboutPage() {
  const founder = TEAM_MEMBERS[0];

  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#14140f] overflow-x-clip">
      {/* ============ ABOUT US HERO SECTION ============ */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 pt-10 pb-12 text-center">
        <h1 className="font-heading font-extrabold text-[clamp(38px,5.5vw,64px)] text-[#14140f] mb-8 sm:mb-10 tracking-tight">
          About Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr] gap-8 md:gap-12 items-center text-left max-w-[960px] mx-auto mb-8">
          {/* Brand Intro Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block mb-3.5">
              <Image
                src="/assets/images/logo/logo.svg"
                alt="Trail Explorers"
                width={240}
                height={55}
                className="w-[clamp(190px,22vw,240px)] h-auto object-contain"
                priority
              />
            </Link>
            <p className="text-[15px] text-[#6b6b63] leading-relaxed font-medium">
              Curated journeys for curious minds. We handle the details so you can focus on the memory.
            </p>
          </div>

          {/* Intro Narrative Column */}
          <div className="text-center md:text-left">
            <p className="text-[17px] sm:text-[19px] font-bold text-[#14140f] leading-snug mb-2.5">
              Raised in the Himalayas. Built from its soil.
            </p>
            <p className="text-[14.5px] sm:text-[15px] text-[#44443f] leading-[1.7]">
              Trail Explorers isn&apos;t a city company that discovered the mountains on a long weekend.
              We were born in Manali, grew up on these roads, and have worked these valleys all our lives.
              The Himalayas aren&apos;t our destination. They&apos;re home, and we&apos;d love to show you around.
            </p>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="mb-10 sm:mb-14">
          <Link
            href="/tour-packages"
            className="inline-block bg-[#d6ff3f] text-[#14140f] font-extrabold text-[15px] px-11 py-3.5 rounded-full shadow-[0_4px_14px_rgba(214,255,63,0.4)] hover:scale-105 hover:shadow-[0_8px_24px_rgba(214,255,63,0.65)] active:scale-95 transition-all uppercase tracking-[0.5px]"
          >
            JOIN US
          </Link>
        </div>

        {/* Neon Lime Backdrop Frame with Pagoda Hero */}
        <div className="neon-backdrop-frame">
          <Image
            src="/assets/images/about/pagoda-hero.jpg"
            alt="Himalayan Pagoda Temple Architecture"
            width={736}
            height={682}
            priority
            sizes="(max-width: 768px) 100vw, 760px"
            className="w-full h-auto object-contain block mx-auto relative z-10"
          />
        </div>
      </section>

      {/* ============ ROOTED IN THE HIMALAYAS: LOCALS, NOT OUTSIDERS ============ */}
      <section className="max-w-[1200px] mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-heading font-extrabold text-[clamp(28px,3.8vw,44px)] text-[#14140f] tracking-tight">
            Locals, Not Outsiders
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#6b6b63] mt-2 font-medium">
            Plenty of companies sell the Himalayas. We&apos;re from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {/* Card 01 */}
          <div className="rooted-card">
            <span className="rooted-num">01</span>
            <h3 className="font-heading font-bold text-xl text-[#14140f] mb-2">
              Raised in the Valley
            </h3>
            <p className="text-[14.5px] text-[#44443f] leading-[1.65]">
              Our roots run through Manali, the Kullu Valley and the Pir Panjal. We grew up on these passes, so we know the roads, the weather and the people.
            </p>
          </div>

          {/* Card 02 */}
          <div className="rooted-card">
            <span className="rooted-num">02</span>
            <h3 className="font-heading font-bold text-xl text-[#14140f] mb-2">
              Planned on the Ground
            </h3>
            <p className="text-[14.5px] text-[#44443f] leading-[1.65]">
              No one plans our trips from an office in a faraway city. When a pass gets snowed in or a landslide blocks the road, our local network already knows the way around.
            </p>
          </div>

          {/* Card 03 */}
          <div className="rooted-card">
            <span className="rooted-num">03</span>
            <h3 className="font-heading font-bold text-xl text-[#14140f] mb-2">
              Your Trip Stays Local
            </h3>
            <p className="text-[14.5px] text-[#44443f] leading-[1.65]">
              We work with local drivers, guides, homestays, dhabas and village families. When you travel with us, your money stays in the mountains and helps the people who live here.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER TEASER SECTION ============ */}
      <section className="max-w-[1020px] mx-auto px-4 py-8 sm:py-12">
        <div className="founder-teaser">
          <div className="founder-teaser-badge">
            <SkeletonImage
              src="/assets/images/about/harsh-thakkar.avif"
              alt={`${founder.name} - ${founder.designation}`}
              fill
              sizes="(max-width: 640px) 140px, 168px"
              className="rounded-full object-cover"
              skeletonClassName="rounded-full"
            />
            <span className="founder-teaser-pin" aria-hidden="true">
              📍 {founder.favouriteDestination}
            </span>
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="founder-eyebrow text-[12px] font-extrabold uppercase tracking-[1.5px] text-[#d6ff3f]">
                {founder.badge}
              </span>
              <span className="text-white/40 text-xs font-bold">·</span>
              <span className="text-[12px] font-bold text-white/70 uppercase tracking-wider">
                {founder.experience} Experience
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-[clamp(24px,3vw,34px)] text-white mb-2 leading-tight">
              Meet {founder.name}
            </h2>

            <p className="text-[#d6ff3f] text-[15px] font-bold mb-2">
              {founder.designation} — <span className="italic font-normal text-white/90">&ldquo;{founder.headline}&rdquo;</span>
            </p>

            <p className="text-white/85 text-[14.5px] sm:text-[15px] leading-relaxed">
              {founder.description}
            </p>
          </div>
        </div>
      </section>

      {/* ============ ALTERNATING FEATURE SECTIONS ============ */}
      {/* 1. Our Philosophy: Community Over Crowds */}
      <section className="max-w-[1020px] mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full inline-block mb-3">
              Our Ethos
            </span>
            <h2 className="font-heading font-extrabold text-[clamp(26px,3.2vw,38px)] text-[#14140f] mb-2 leading-tight">
              Our Philosophy
            </h2>
            <h3 className="text-lg font-semibold text-[#6b6b63] mb-4">
              Community Over Crowds
            </h3>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7] mb-3">
              We believe travel is best experienced in small, intimate groups where strangers turn into lifelong travel companions. By keeping our group sizes capped, we protect fragile high-altitude ecosystems and foster real camaraderie.
            </p>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7]">
              Instead of overcrowded commercial hubs, we take you deep into remote valleys, sacred mountain passes, and authentic village homestays where warmth and hospitality are genuine.
            </p>
          </div>

          <div className="lime-card-frame">
            <Image
              src="/assets/images/about/community-group.jpg"
              alt="Cheering group of travelers on mountain peak"
              width={520}
              height={310}
              sizes="(max-width: 768px) 100vw, 520px"
              className="w-full h-[250px] sm:h-[310px] object-cover relative z-10 block rounded-[4px]"
            />
          </div>
        </div>
      </section>

      {/* 2. Authentic Exploration vs. Commercial Tourism */}
      <section className="max-w-[1020px] mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center">
          <div className="lime-card-frame left-accent order-last md:order-first">
            <Image
              src="/assets/images/about/cultural-dancers.jpg"
              alt="Authentic exploration and traditional cultural rituals"
              width={520}
              height={310}
              sizes="(max-width: 768px) 100vw, 520px"
              className="w-full h-[250px] sm:h-[310px] object-cover relative z-10 block rounded-[4px]"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full inline-block mb-3">
              Culture First
            </span>
            <h2 className="font-heading font-extrabold text-[clamp(26px,3.2vw,38px)] text-[#14140f] mb-4 leading-tight">
              Authentic Exploration vs. Commercial Tourism
            </h2>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7] mb-3">
              Commercial tourism often reduces rich indigenous cultures into quick photo stops. At Trail Explorers, we immerse you in living traditions, ancient monastic festivals, local folk rituals, and traditional culinary feasts.
            </p>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7]">
              Because we&apos;re from here, these aren&apos;t &ldquo;contacts&rdquo; we found online. They&apos;re our neighbours, the elders and guides we grew up with, and they share their stories, myths and mountain heritage with pride.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Responsible & Impact-Driven Travel */}
      <section className="max-w-[1020px] mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full inline-block mb-3">
              Eco Stewardship
            </span>
            <h2 className="font-heading font-extrabold text-[clamp(26px,3.2vw,38px)] text-[#14140f] mb-4 leading-tight">
              Responsible &amp; Impact-Driven Travel
            </h2>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7] mb-3">
              We practice strict Leave-No-Trace principles across every trek, expedition, and homestay. A significant portion of your booking directly supports remote Himalayan village economies, local porters, and women-led homestay cooperatives.
            </p>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7]">
              We actively minimize single-use plastics, support local eco-sanitation initiatives, and ensure that every footprint we leave leaves the mountains cleaner and greener.
            </p>
          </div>

          <div className="lime-card-frame">
            <Image
              src="/assets/images/about/responsible-puppet.jpg"
              alt="Responsible and community-based sustainable travel"
              width={520}
              height={310}
              sizes="(max-width: 768px) 100vw, 520px"
              className="w-full h-[250px] sm:h-[310px] object-cover relative z-10 block rounded-[4px]"
            />
          </div>
        </div>
      </section>

      {/* 4. Raw Adventure, Premium Execution */}
      <section className="max-w-[1020px] mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center">
          <div className="lime-card-frame left-accent order-last md:order-first">
            <Image
              src="/assets/images/about/raw-adventure-trekkers.jpg"
              alt="Raw adventure expeditions with premium ground execution"
              width={520}
              height={310}
              sizes="(max-width: 768px) 100vw, 520px"
              className="w-full h-[250px] sm:h-[310px] object-cover relative z-10 block rounded-[4px]"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3 py-1 rounded-full inline-block mb-3">
              Field Safety
            </span>
            <h2 className="font-heading font-extrabold text-[clamp(26px,3.2vw,38px)] text-[#14140f] mb-4 leading-tight">
              Raw Adventure, Premium Execution
            </h2>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7] mb-3">
              Adventure requires courage, but execution requires uncompromised safety and precision. Our expeditions are led by certified mountaineers, Wilderness First Responders, and experienced road captains equipped with satellite communication and emergency oxygen.
            </p>
            <p className="text-[14.5px] text-[#44443f] leading-[1.7]">
              From high-grade camping gear and backup support vehicles to curated homestays with hot meals, we handle every detail so you can embrace the raw wild with complete peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CORE PILLARS ============ */}
      <section className="max-w-[1200px] mx-auto px-4 py-16 sm:py-20 border-t border-[#f0f0eb]">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-heading font-extrabold text-[clamp(28px,3.8vw,44px)] text-[#14140f] tracking-tight">
            Core Pillars
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#6b6b63] mt-2 font-medium">
            Why We Are Different
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-6 text-center max-w-[1080px] mx-auto">
          {/* Pillar 1 */}
          <div className="flex flex-col items-center flex-1 min-w-[150px] max-w-[200px]">
            <div className="w-[96px] h-[96px] rounded-full bg-[#14140f] flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(20,20,15,0.18)] hover:-translate-y-1.5 transition-transform cursor-pointer">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h4 className="font-bold text-[12.5px] sm:text-[13px] uppercase tracking-[0.5px] text-[#14140f] leading-snug">
              SAFETY FIRST, ALWAYS
            </h4>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col items-center flex-1 min-w-[150px] max-w-[200px]">
            <div className="w-[96px] h-[96px] rounded-full bg-[#14140f] flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(20,20,15,0.18)] hover:-translate-y-1.5 transition-transform cursor-pointer">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4 className="font-bold text-[12.5px] sm:text-[13px] uppercase tracking-[0.5px] text-[#14140f] leading-snug">
              DEEP CULTURAL ROOTS &amp; LOCAL SUPPORT
            </h4>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col items-center flex-1 min-w-[150px] max-w-[200px]">
            <div className="w-[96px] h-[96px] rounded-full bg-[#14140f] flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(20,20,15,0.18)] hover:-translate-y-1.5 transition-transform cursor-pointer">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 16a3.5 3.5 0 0 0 3.5-3.5c0-1.8-1.5-3.5-3.5-6.5-2 3-3.5 4.7-3.5 6.5A3.5 3.5 0 0 0 12 16z" />
              </svg>
            </div>
            <h4 className="font-bold text-[12.5px] sm:text-[13px] uppercase tracking-[0.5px] text-[#14140f] leading-snug">
              LEAVING NO TRACE BEHIND (ECO TRAVEL)
            </h4>
          </div>

          {/* Pillar 4 */}
          <div className="flex flex-col items-center flex-1 min-w-[150px] max-w-[200px]">
            <div className="w-[96px] h-[96px] rounded-full bg-[#14140f] flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(20,20,15,0.18)] hover:-translate-y-1.5 transition-transform cursor-pointer">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h4 className="font-bold text-[12.5px] sm:text-[13px] uppercase tracking-[0.5px] text-[#14140f] leading-snug">
              100% FINANCIAL TRANSPARENCY
            </h4>
          </div>

          {/* Pillar 5 */}
          <div className="flex flex-col items-center flex-1 min-w-[150px] max-w-[200px]">
            <div className="w-[96px] h-[96px] rounded-full bg-[#14140f] flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(20,20,15,0.18)] hover:-translate-y-1.5 transition-transform cursor-pointer">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d6ff3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
              </svg>
            </div>
            <h4 className="font-bold text-[12.5px] sm:text-[13px] uppercase tracking-[0.5px] text-[#14140f] leading-snug">
              24&times;7 SUPPORT ON EVERY TRIP
            </h4>
          </div>
        </div>
      </section>
    </div>
  );
}
