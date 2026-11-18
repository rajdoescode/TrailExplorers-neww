"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Search, Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/site-config";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Community Trips", href: "/community-trips" },
    { label: "Experiences", href: "/experiences" },
    { label: "Tour Packages", href: "/tour-packages" },
    { label: "About Us", href: "/about" },
    { label: "Postcards", href: "/postcards" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-250 w-full bg-white border-b border-[#e6e6df]",
          isScrolled ? "shadow-[0_6px_20px_rgba(20,20,15,0.08)]" : "shadow-none"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="logo inline-flex items-center shrink-0 transition-opacity hover:opacity-75">
            <Image
              src="/assets/images/logo/logo-black-full.png"
              alt="Awara Banjara"
              width={200}
              height={40}
              priority
              className="h-[40px] w-auto block object-contain"
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

          {/* Right Action Badges */}
          <div className="hidden lg:flex items-center gap-[12px] shrink-0">
            {/* Phone Call Button / Pill */}
            <a
              href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
              aria-label="Call Awara Banjara"
              className={cn(
                "inline-flex items-center transition-all duration-200",
                pathname === "/plan-your-trip"
                  ? "gap-2.5 font-bold text-[15px] text-[#14140f] hover:opacity-85"
                  : "w-[40px] h-[40px] rounded-full bg-[#14140f] text-white justify-center shadow-[0_4px_12px_rgba(20,20,15,0.15)] hover:scale-105"
              )}
            >
              <span className="w-[40px] h-[40px] rounded-full bg-[#14140f] text-white inline-flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(20,20,15,0.15)]">
                <Phone className="w-[18px] h-[18px] text-white stroke-[2.2]" />
              </span>
              {pathname === "/plan-your-trip" && (
                <span className="font-bold text-[15px] tracking-tight text-[#14140f] whitespace-nowrap">
                  +91- 9103910523
                </span>
              )}
            </a>

            {/* Search Circle (hidden on plan-your-trip to match screenshot) */}
            {pathname !== "/plan-your-trip" && (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search itineraries"
                className="w-[40px] h-[40px] rounded-full bg-[#14140f] text-white inline-flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(20,20,15,0.15)] hover:scale-105 transition-transform cursor-pointer border-none"
              >
                <Search className="w-[18px] h-[18px] text-white stroke-[2.2]" />
              </button>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
              aria-label="Call Awara Banjara"
              className="w-[36px] h-[36px] rounded-full bg-[#14140f] text-white inline-flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(20,20,15,0.15)]"
            >
              <Phone className="w-[16px] h-[16px] text-white stroke-[2.2]" />
            </a>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search itineraries"
              className="w-[36px] h-[36px] rounded-full bg-[#14140f] text-white inline-flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(20,20,15,0.15)]"
            >
              <Search className="w-[16px] h-[16px] text-white stroke-[2.2]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#14140f] hover:bg-[#f6f6f1] rounded-lg transition-colors ml-1"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-6 shadow-2xl flex flex-col gap-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <Image
                src="/assets/images/logo/logo-black-full.png"
                alt="Awara Banjara"
                width={160}
                height={32}
                className="h-[32px] w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-bold text-[#14140f] py-2 px-3 rounded-lg hover:bg-[#f6f6f1] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <a
                href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#14140f] text-white font-bold text-sm"
              >
                <Phone className="w-4 h-4 stroke-[2.2]" />
                Call Us: {SITE_CONFIG.site_phone}
              </a>
              <Link
                href="/plan-your-trip"
                className="flex items-center justify-center w-full py-3 rounded-full bg-[#d6ff3f] text-[#14140f] font-bold text-sm"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0 stroke-[2.2]" />
              <input
                type="text"
                placeholder="Search Spiti, Ladakh, Kashmir, Treks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base font-medium outline-hidden text-[#14140f]"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Start typing destination, state, or trek name to search expeditions...
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 py-1">
                    Quick Destinations
                  </div>
                  {[
                    { name: "Winter Spiti 4x4 Expedition", href: "/winter-spiti" },
                    { name: "Spiti Valley Community Trips", href: "/spiti" },
                    { name: "Leh Ladakh Bike Tours", href: "/ladakh" },
                    { name: "Kashmir Great Lakes & Valleys", href: "/kashmir" },
                    { name: "Himachal Offbeat Escapes", href: "/himachal" },
                    { name: "Uttarakhand Spiritual Treks", href: "/uttarakhand" },
                  ]
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f6f6f1] transition-colors group"
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
