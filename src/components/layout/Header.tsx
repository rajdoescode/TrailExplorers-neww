"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Search, Menu, X, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/site-config";
import { useScrollLock } from "@/hooks/useScrollLock";

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
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 touch-none overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 overscroll-contain">
            <div className="p-3.5 sm:p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0 stroke-[2.2]" />
              <input
                type="text"
                placeholder="Search Spiti, Ladakh, Kashmir, Treks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base font-semibold outline-hidden text-[#14140f] placeholder:text-gray-400 min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-gray-400 hover:text-black rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[calc(100dvh-140px)] sm:max-h-[65vh] overflow-y-auto overscroll-contain touch-pan-y">
              {searchQuery.trim() === "" ? (
                <div className="py-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 mb-3">
                    Popular Destinations
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Winter Spiti 4x4", href: "/winter-spiti" },
                      { name: "Spiti Valley", href: "/spiti" },
                      { name: "Leh Ladakh", href: "/ladakh" },
                      { name: "Kashmir Valleys", href: "/kashmir" },
                      { name: "Himachal Escapes", href: "/himachal" },
                      { name: "Alpine Treks", href: "/tour-packages" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-2 p-3 rounded-xl bg-[#f8f8f5] hover:bg-[#d6ff3f] text-[#14140f] font-bold text-xs transition-colors min-h-[44px]"
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 py-1">
                    Matching Expeditions
                  </div>
                  {[
                    { name: "Winter Spiti 4x4 Expedition", href: "/winter-spiti" },
                    { name: "Spiti Valley Community Trips", href: "/spiti" },
                    { name: "Leh Ladakh Bike Tours", href: "/ladakh" },
                    { name: "Kashmir Great Lakes & Valleys", href: "/kashmir" },
                    { name: "Himachal Offbeat Escapes", href: "/himachal" },
                    { name: "Uttarakhand Spiritual Treks", href: "/uttarakhand" },
                    { name: "Manali to Leh Highway Expedition", href: "/tour-packages" },
                    { name: "Naggar, Baralacha La & Bijli Mahadev", href: "/community-trips" },
                  ]
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f6f6f1] active:bg-[#ecece5] transition-colors group min-h-[44px]"
                      >
                        <span className="font-semibold text-sm text-[#14140f]">
                          {item.name}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
