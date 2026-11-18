"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/data/site-config";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // On /plan-your-trip, only the sleek minimal copyright line appears on top of the mountain backdrop
  if (pathname === "/plan-your-trip") {
    return (
      <footer className="w-full py-5 text-center text-xs text-white/60 tracking-wider bg-transparent border-0 select-none">
        © 2026 Awara Banjara · Made in India ✦
      </footer>
    );
  }

  return (
    <footer className="bg-[#14140f] text-white pt-16 pb-12 border-t border-white/10">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Brand Info (2 Columns on large screens) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/images/logo/logo-white-full.png"
                alt="Awara Banjara"
                width={230}
                height={46}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#a0a09a] leading-relaxed max-w-sm">
              India&apos;s premier youth travel community. Curated Himalayan bike expeditions,
              Spiti Valley road trips, treks, festival journeys, and women-only departures.
              Built by wanderers, for wanderers.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-[#a0a09a] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d6ff3f] shrink-0" />
                <span>Awara Banjara Adventure (OPC) Pvt. Ltd. · Himachal Pradesh & Delhi</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d6ff3f] shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.site_phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d6ff3f] shrink-0" />
                <a
                  href="mailto:hello@awarabanjara.in"
                  className="hover:text-white transition-colors"
                >
                  hello@awarabanjara.in
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/awarabanjaracommunity?igsh=MXhpZG11ZnV4MmdhcA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d6ff3f] hover:text-[#14140f] flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@awarabanjara"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d6ff3f] hover:text-[#14140f] flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/awarabanjara"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d6ff3f] hover:text-[#14140f] flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-heading">
              Himalayan Hubs
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#a0a09a]">
              <li>
                <Link href="/spiti" className="hover:text-[#d6ff3f] transition-colors">
                  Spiti Valley
                </Link>
              </li>
              <li>
                <Link href="/ladakh" className="hover:text-[#d6ff3f] transition-colors">
                  Ladakh & Zanskar
                </Link>
              </li>
              <li>
                <Link href="/himachal" className="hover:text-[#d6ff3f] transition-colors">
                  Himachal Pradesh
                </Link>
              </li>
              <li>
                <Link href="/kashmir" className="hover:text-[#d6ff3f] transition-colors">
                  Kashmir Paradise
                </Link>
              </li>
              <li>
                <Link href="/uttarakhand" className="hover:text-[#d6ff3f] transition-colors">
                  Uttarakhand Devbhoomi
                </Link>
              </li>
              <li>
                <Link
                  href="/winter-spiti"
                  className="inline-flex items-center gap-1 text-[#d6ff3f] font-bold hover:underline"
                >
                  <span>Winter Spiti 2026-27</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Experiences & Trips */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-heading">
              Adventures
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#a0a09a]">
              <li>
                <Link href="/community-trips" className="hover:text-[#d6ff3f] transition-colors">
                  Community Group Trips
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#d6ff3f] transition-colors">
                  Experiential Journeys
                </Link>
              </li>
              <li>
                <Link href="/tour-packages" className="hover:text-[#d6ff3f] transition-colors">
                  All Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/plan-your-trip" className="hover:text-[#d6ff3f] transition-colors">
                  Custom Itinerary Builder
                </Link>
              </li>
              <li>
                <Link href="/postcards" className="hover:text-[#d6ff3f] transition-colors">
                  Watch & Read / Postcards
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#d6ff3f] transition-colors">
                  Customer Reviews (4.9★)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Policies */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-heading">
              Company & Legal
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#a0a09a]">
              <li>
                <Link href="/about" className="hover:text-[#d6ff3f] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-[#d6ff3f] transition-colors">
                  Founder&apos;s Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d6ff3f] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#d6ff3f] transition-colors">
                  Careers & Trip Leaders
                </Link>
              </li>
              <li>
                <Link href="/booking-terms" className="hover:text-[#d6ff3f] transition-colors">
                  Booking Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-[#d6ff3f] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#d6ff3f] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/payment-details" className="hover:text-[#d6ff3f] transition-colors">
                  Payment & Bank Details
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a0a09a]">
          <p>© {new Date().getFullYear()} Awara Banjara Adventure (OPC) Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Made with passion for wanderers in the Indian Himalayas.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};
