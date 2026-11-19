"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WhatsAppSocialBar } from "@/components/common/WhatsAppSocialBar";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // On /plan-your-trip, minimal footer is rendered inside the mountain page container
  if (pathname === "/plan-your-trip") {
    return null;
  }

  const isTripDetailPage = pathname?.startsWith("/trips/");

  return (
    <>
      {/* ============ WHATSAPP / SOCIAL BAR ============ */}
      {!isTripDetailPage && (
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-10 sm:my-14">
          <WhatsAppSocialBar />
        </div>
      )}

      {/* ============ FOOTER ============ */}
      <footer className="site-footer">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="footer-top">
            <div className="footer-brand">
              <Link href="/" className="logo">
                <Image
                  src="/assets/images/logo/logo.svg"
                  alt="Trail Explorers"
                  width={180}
                  height={44}
                  className="h-[40px] sm:h-[44px] w-auto object-contain"
                />
              </Link>
              <p>Curated journeys for curious minds. We handle the details; you make the memories.</p>
            </div>

            <div className="footer-links">
              <div className="footer-col">
                <h4>Explore</h4>
                <ul>
                  <li>
                    <Link href="/community-trips">Community Trips</Link>
                  </li>
                  <li>
                    <Link href="/experiences">Experiences</Link>
                  </li>
                  <li>
                    <Link href="/tour-packages">Group Trips</Link>
                  </li>
                  <li>
                    <Link href="/tour-packages#educational-trips">Educational Trips</Link>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Destinations</h4>
                <ul>
                  <li>
                    <Link href="/ladakh">Ladakh</Link>
                  </li>
                  <li>
                    <Link href="/spiti">Spiti</Link>
                  </li>
                  <li>
                    <Link href="/himachal">Himachal</Link>
                  </li>
                  <li>
                    <Link href="/kashmir">Kashmir</Link>
                  </li>
                  <li>
                    <Link href="/uttarakhand">Uttarakhand</Link>
                  </li>
                  <li>
                    <Link href="/winter-spiti">Winter Spiti</Link>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  {/* <li>
                    <Link href="/founder">Founder&apos;s Story</Link>
                  </li>
                  <li>
                    <Link href="/postcards">Postcards</Link>
                  </li>
                  <li>
                    <Link href="/careers">Careers</Link>
                  </li> */}
                </ul>
              </div>

              <div className="footer-col">
                <h4>Help</h4>
                <ul>
                  <li>
                    <Link href="/booking-terms">Booking T&amp;C</Link>
                  </li>
                  <li>
                    <Link href="/cancellation-policy">Cancellation Policy</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/payment-details">Payment Details</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`footer-bottom ${!isTripDetailPage ? "pb-20 md:pb-4" : "pb-4"}`}>
            © 2026 Trail Explorers · Made in India ✦
          </div>
        </div>
      </footer>
    </>
  );
};
