"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Search, Menu, X, ArrowUpRight, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn, formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/site-config";
import { TRIPS_DATA } from "@/data/trips";
import { useScrollLock } from "@/hooks/useScrollLock";

const POPULAR_DESTINATIONS = [
  { name: "Winter Spiti 4 x 4", href: "/winter-spiti" },
  { name: "Spiti Valley", href: "/spiti" },
  { name: "Leh Ladakh", href: "/ladakh" },
  { name: "Kashmir Valleys", href: "/kashmir" },
  { name: "Himachal Escapes", href: "/himachal" },
  { name: "Alpine Treks", href: "/tour-packages" },
];

interface HeaderProps {
  transparentAtTop?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // ESC key to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [searchOpen]);

  // Filter trips and destinations in real time
  const filteredTrips = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return TRIPS_DATA.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const cat = (t.category || "").toLowerCase();
      const loc = (t.pickup_location || "").toLowerCase();
      return title.includes(q) || cat.includes(q) || loc.includes(q);
    }).slice(0, 8);
  }, [searchQuery]);

  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return POPULAR_DESTINATIONS.filter((d) => d.name.toLowerCase().includes(q));
  }, [searchQuery]);

  // Lock body scroll when mobile menu or search is open (iOS/Android touch & desktop wheel safe)
  useScrollLock(mobileMenuOpen || searchOpen);

  // Listen for custom open-mobile-menu event from bottom nav
  useEffect(() => {
    const handleCustomOpen = () => setMobileMenuOpen(true);
    window.addEventListener("open-mobile-menu", handleCustomOpen);
    return () => window.removeEventListener("open-mobile-menu", handleCustomOpen);
  }, []);

  const navLinks = [
    { label: "Community Trips", href: "/community-trips" },
    { label: "Experiences", href: "/experiences" },
    { label: "Tour Packages", href: "/tour-packages" },
    { label: "About Us", href: "/about" },
    { label: "Postcards", href: "/postcards" },
  ];

  const quickDestinations = [
    { label: "Spiti", href: "/spiti" },
    { label: "Winter Spiti", href: "/winter-spiti" },
    { label: "Ladakh", href: "/ladakh" },
    { label: "Kashmir", href: "/kashmir" },
    { label: "Himachal", href: "/himachal" },
    { label: "Uttarakhand", href: "/uttarakhand" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-200 w-full bg-white border-b border-[#e6e6df]",
          isScrolled ? "shadow-[0_4px_20px_rgba(20,20,15,0.06)]" : "shadow-none"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="logo inline-flex items-center shrink-0 transition-opacity hover:opacity-80 active:opacity-70 p-1 -ml-1 overflow-visible"
          >
            <Image
              src="/assets/images/logo/logo.svg"
              alt="Trail Explorers"
              width={160}
              height={38}
              priority
              className="h-[34px] sm:h-[40px] w-auto block object-contain overflow-visible"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[28px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-medium text-[15px] pb-1 border-b-2 transition-all duration-180",
                    isActive
                      ? "text-[#14140f] border-[#d6ff3f]"
                      : "text-[#14140f] border-transparent hover:border-[#d6ff3f]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Badges (Desktop) */}
          <div className="hidden lg:flex items-center gap-[12px] shrink-0">
            <a
              href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
              aria-label="Call Trail Explorers"
              className="inline-flex items-center gap-2.5 font-bold text-[14.5px] text-[#14140f] hover:opacity-85 transition-opacity"
            >
              <span className="w-[38px] h-[38px] rounded-full bg-[#14140f] text-white inline-flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(20,20,15,0.15)]">
                <Phone className="w-4 h-4 text-white stroke-[2.2]" />
              </span>
              <span className="font-bold text-[14.5px] tracking-tight text-[#14140f] whitespace-nowrap">
                {SITE_CONFIG.site_phone}
              </span>
            </a>
          </div>

          {/* Mobile Right Controls (Touch targets >= 44px) */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {pathname !== "/plan-your-trip" && (
              <>
                <a
                  href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
                  aria-label="Call Trail Explorers"
                  className="w-[44px] h-[44px] rounded-full bg-[#14140f] text-white inline-flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(20,20,15,0.15)] active:scale-90 transition-transform"
                >
                  <Phone className="w-[17px] h-[17px] text-white stroke-[2.2]" />
                </a>

                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search itineraries"
                  className="w-[44px] h-[44px] rounded-full bg-[#f6f6f1] text-[#14140f] hover:bg-[#ecece5] border border-[#e2e2dc] inline-flex items-center justify-center shrink-0 active:scale-90 transition-transform cursor-pointer"
                >
                  <Search className="w-[17px] h-[17px] text-[#14140f] stroke-[2.2]" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[44px] h-[44px] border border-[#e2e2dc] rounded-full flex items-center justify-center text-[#14140f] hover:bg-[#f6f6f1] active:scale-90 transition-transform cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.4]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Native App Bottom Sheet Layout) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation drawer"
          className="fixed inset-0 z-[9999] lg:hidden bg-black/60 backdrop-blur-xs flex flex-col justify-end transition-opacity touch-none overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div
            className="bg-white rounded-t-[28px] p-5 sm:p-6 shadow-2xl flex flex-col gap-5 animate-in slide-in-from-bottom duration-300 max-h-[calc(100dvh-32px)] overflow-y-auto overscroll-contain touch-pan-y"
            style={{
              paddingBottom: "max(24px, env(safe-area-inset-bottom, 24px))",
            }}
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 rounded-full bg-[#e2e2dc] mx-auto -mt-1 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="overflow-visible">
                <Image
                  src="/assets/images/logo/logo.svg"
                  alt="Trail Explorers"
                  width={140}
                  height={32}
                  className="h-[30px] w-auto object-contain overflow-visible"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black rounded-full hover:bg-gray-100 active:scale-90 transition-transform cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* Main Navigation Links */}
            <nav className="flex flex-col gap-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6b6b63] px-3 mb-1">
                Explore Trails
              </span>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-[16px] font-bold py-2.5 px-3.5 rounded-xl transition-all flex items-center justify-between min-h-[44px]",
                      isActive
                        ? "bg-[#d6ff3f] text-[#14140f]"
                        : "text-[#14140f] hover:bg-[#f6f6f1] active:bg-[#eeeeea]"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            {/* Quick Regional Destinations */}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6b6b63] px-3">
                Destinations
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickDestinations.map((dest) => (
                  <Link
                    key={dest.href}
                    href={dest.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f8f8f5] hover:bg-[#d6ff3f] text-[#14140f] text-xs font-bold transition-colors min-h-[44px]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#14140f] shrink-0" />
                    <span>{dest.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Secondary Links & Actions */}
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-2 text-xs font-semibold text-[#6b6b63]">
                <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">
                  Reviews (4.9★)
                </Link>
                <Link href="/founder" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">
                  Founder Story
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">
                  Contact
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <a
                  href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-2 w-full py-3 px-3 rounded-full bg-[#14140f] text-white font-bold text-xs min-h-[44px] active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5 stroke-[2.2]" />
                  Call Support
                </a>
                <Link
                  href="/plan-your-trip"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-3 px-3 rounded-full bg-[#d6ff3f] text-[#14140f] font-bold text-xs min-h-[44px] active:scale-95 transition-transform shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Plan Your Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search destinations and itineraries"
          className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-sm flex items-start justify-center pt-14 sm:pt-20 px-3.5 sm:px-4 touch-none overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="bg-white rounded-[32px] sm:rounded-[36px] w-full max-w-[520px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] p-5 sm:p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200 overscroll-contain flex flex-col">
            {/* Top Row: Capsule Search Bar + Standalone X Close Button */}
            <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
              {/* Search Pill */}
              <div className="flex-1 flex items-center bg-[#f0f3f6] rounded-full px-4 sm:px-5 py-3 sm:py-3.5 gap-2.5 transition-colors">
                <Search className="w-5 h-5 text-[#0f172a] shrink-0 stroke-[2.2]" />
                <input
                  type="text"
                  placeholder="Search Spiti, Ladakh, Kashmir, Treks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-0 outline-none p-0 text-[13.5px] sm:text-[14.5px] font-medium text-[#0f172a] placeholder:text-[#64748b]"
                  style={{
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 flex items-center justify-center shrink-0 ml-1 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </button>
                )}
              </div>

              {/* Standalone Close X Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-[#0f172a] hover:opacity-70 transition-opacity shrink-0 cursor-pointer p-0"
                aria-label="Close search"
              >
                <X className="w-6 h-6 stroke-[2]" />
              </button>
            </div>

            {/* Results or Default Popular Destinations */}
            {searchQuery.trim() === "" ? (
              <div>
                {/* Popular Destinations Header with Lime Pin and Trailing Line */}
                <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
                  <svg className="w-4 h-4 text-[#a3e635] shrink-0" viewBox="0 0 24 24" fill="#a3e635">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#a3e635" />
                    <circle cx="12" cy="9" r="2.5" fill="#ffffff" />
                  </svg>
                  <h3 className="text-[12px] sm:text-[12.5px] font-extrabold uppercase tracking-wide text-[#0f172a] m-0">
                    POPULAR DESTINATIONS
                  </h3>
                  <div className="flex-1 h-[1px] bg-[#eef0f4] ml-2" />
                </div>

                {/* 2-Column Pill Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {POPULAR_DESTINATIONS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-full bg-[#f4f6f9] hover:bg-[#ebf0f5] active:scale-98 text-[#0f172a] transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#e8ecf2] flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-[#0f172a] stroke-[2.2]" />
                        </div>
                        <span className="font-bold text-[12px] sm:text-[13px] text-[#0f172a] truncate">
                          {item.name}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8e9ba9] group-hover:text-[#0f172a] transition-colors shrink-0 ml-1 stroke-[2]" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5 max-h-[calc(100dvh-200px)] sm:max-h-[55vh] overflow-y-auto overscroll-contain touch-pan-y pr-1">
                {/* Matching Destinations */}
                {filteredDestinations.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <h4 className="text-[11.5px] font-extrabold uppercase tracking-wide text-[#64748b] m-0">
                        DESTINATIONS
                      </h4>
                      <div className="flex-1 h-[1px] bg-[#eef0f4] ml-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredDestinations.map((d) => (
                        <Link
                          key={d.href}
                          href={d.href}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between px-3.5 py-2.5 rounded-full bg-[#f4f6f9] hover:bg-[#ebf0f5] text-[#0f172a] font-bold text-xs transition-colors group"
                        >
                          <span className="truncate">{d.name}</span>
                          <ChevronRight className="w-4 h-4 text-[#8e9ba9] group-hover:text-[#0f172a] shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching Expeditions */}
                {filteredTrips.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <h4 className="text-[11.5px] font-extrabold uppercase tracking-wide text-[#64748b] m-0">
                        MATCHING EXPEDITIONS ({filteredTrips.length})
                      </h4>
                      <div className="flex-1 h-[1px] bg-[#eef0f4] ml-2" />
                    </div>
                    <div className="flex flex-col gap-2">
                      {filteredTrips.map((trip) => (
                        <Link
                          key={trip.id}
                          href={`/trips/${trip.slug || trip.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#f4f6f9] hover:bg-[#ebf0f5] active:scale-[0.99] transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#e2e6ec] shrink-0">
                              <img
                                src={trip.image_url || "/assets/images/home/hero-poster.jpg"}
                                alt={trip.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "/assets/images/home/hero-poster.jpg";
                                }}
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-xs sm:text-[13.5px] text-[#0f172a] truncate group-hover:text-black">
                                {trip.title}
                              </span>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#64748b] font-medium">
                                {trip.duration && <span>{trip.duration}</span>}
                                {trip.duration && <span>•</span>}
                                <span className="text-[#0f172a] font-bold">
                                  {formatPrice(trip.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#8e9ba9] group-hover:text-[#0f172a] transition-colors shrink-0 ml-2" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : filteredDestinations.length === 0 ? (
                  <div className="py-8 text-center flex flex-col items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#f0f3f6] flex items-center justify-center mb-2.5 text-[#64748b]">
                      <Search className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#0f172a] m-0">No matching expeditions</h4>
                    <p className="text-xs text-[#64748b] mt-1 max-w-xs m-0">
                      We couldn&apos;t find any trips matching &ldquo;{searchQuery}&rdquo;. Try searching for Spiti, Ladakh, Manali, or Kashmir.
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
