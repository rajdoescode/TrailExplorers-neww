"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Search, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/site-config";

interface HeaderProps {
  transparentAtTop?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparentAtTop = false }) => {
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
          "sticky top-0 z-50 transition-all duration-300 w-full border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-[#e6e6df] shadow-xs py-3.5"
            : "bg-white border-[#e6e6df] py-4"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center shrink-0">
            <Image
              src="/assets/images/logo/logo-black-full.png"
              alt="Awara Banjara"
              width={200}
              height={40}
              priority
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[15px] font-medium tracking-tight transition-colors duration-150 relative py-1",
                    isActive
                      ? "text-[#14140f]"
                      : "text-[#14140f]/80 hover:text-[#14140f]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d6ff3f] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Badges (Exact 2 Black Circles) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone Call Circle */}
            <a
              href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
              aria-label="Call Awara Banjara"
              className="w-10 h-10 rounded-full bg-[#14140f] text-white flex items-center justify-center hover:opacity-85 transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 fill-white text-white" />
            </a>

            {/* Search Circle */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search itineraries"
              className="w-10 h-10 rounded-full bg-[#14140f] text-white flex items-center justify-center hover:opacity-85 transition-all shadow-xs cursor-pointer"
            >
              <Search className="w-4 h-4 text-white stroke-[2.2]" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
              aria-label="Call Awara Banjara"
              className="w-9 h-9 rounded-full bg-[#14140f] text-white flex items-center justify-center hover:opacity-85 transition-all shrink-0"
            >
              <Phone className="w-3.5 h-3.5 fill-white text-white" />
            </a>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search itineraries"
              className="w-9 h-9 rounded-full bg-[#14140f] text-white flex items-center justify-center hover:opacity-85 transition-all shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-white stroke-[2.2]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#14140f] hover:bg-[#f6f6f1] rounded-lg transition-colors ml-1"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[108px] z-40 bg-white flex flex-col p-6 overflow-y-auto lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-lg font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 border-b border-[#f0f0eb] flex items-center justify-between text-[#14140f]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#6b6b63]" />
              </Link>
            ))}
            <Link
              href="/winter-spiti"
              className="py-2.5 border-b border-[#f0f0eb] flex items-center justify-between text-[#14140f]"
            >
              <span>❄️ Winter Spiti Expeditions</span>
              <span className="text-xs font-bold bg-[#d6ff3f] text-[#14140f] px-2 py-0.5 rounded-full">
                Active
              </span>
            </Link>
            <Link
              href="/founder"
              className="py-2.5 border-b border-[#f0f0eb] flex items-center justify-between text-[#14140f]"
            >
              <span>Founder&apos;s Story</span>
              <ArrowUpRight className="w-4 h-4 text-[#6b6b63]" />
            </Link>
            <Link
              href="/reviews"
              className="py-2.5 border-b border-[#f0f0eb] flex items-center justify-between text-[#14140f]"
            >
              <span>Traveller Reviews (4.9★)</span>
              <ArrowUpRight className="w-4 h-4 text-[#6b6b63]" />
            </Link>
            <Link
              href="/contact"
              className="py-2.5 border-b border-[#f0f0eb] flex items-center justify-between text-[#14140f]"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4 text-[#6b6b63]" />
            </Link>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Button href="/plan-your-trip" variant="primary" size="lg" fullWidth>
              Build Custom Itinerary
            </Button>
            <Button
              href={`https://wa.me/${SITE_CONFIG.whatsapp_number.replace(/[^0-9]/g, "")}`}
              external
              variant="whatsapp"
              size="lg"
              fullWidth
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl relative border-2 border-[#14140f]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#14140f]">Search Trips & Destinations</h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 hover:bg-[#f6f6f1] rounded-full"
              >
                <X className="w-5 h-5 text-[#14140f]" />
              </button>
            </div>

            <div className="mt-4 relative">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Spiti, Ladakh, Kashmir, Manali, Trek..."
                className="w-full bg-[#f6f6f1] border-2 border-[#14140f] rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#d6ff3f]"
                autoFocus
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs font-bold text-gray-500 mr-2 py-1">Popular:</span>
              {["Winter Spiti", "Zanskar Expedition", "Kashmir Snow", "Hamta Pass", "Bir Billing"].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/community-trips?q=${encodeURIComponent(term)}`}
                    onClick={() => setSearchOpen(false)}
                    className="text-xs font-bold bg-[#f6f6f1] hover:bg-[#d6ff3f] border border-[#14140f] px-3 py-1 rounded-full transition-colors"
                  >
                    {term}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
