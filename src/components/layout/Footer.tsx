"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Youtube, Facebook } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // On /plan-your-trip, minimal footer is rendered inside the mountain page container
  if (pathname === "/plan-your-trip") {
    return null;
  }

  return (
    <>
      {/* ============ WHATSAPP / SOCIAL BAR ============ */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-10 sm:my-14">
        <div className="whatsapp-bar w-full">
          <a
            href="https://wa.me/917016640870"
            target="_blank"
            rel="noopener noreferrer"
            className="wa-left"
          >
            <span className="icon-badge" style={{ background: "#25d366" }}>
              <svg viewBox="0 0 24 24" fill="#fff" className="w-5 h-5" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
              </svg>
            </span>
            <span>
              <small>Instant WhatsApp Booking:</small>
              <strong>+91 70166 40870</strong>
            </span>
          </a>

          <div className="wa-right">
            <span className="label">FOLLOW TRAILS ON:</span>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/trail_explorers_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@Trail_Explorers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

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
                  <li>
                    <Link href="/founder">Founder&apos;s Story</Link>
                  </li>
                  <li>
                    <Link href="/postcards">Postcards</Link>
                  </li>
                  <li>
                    <Link href="/careers">Careers</Link>
                  </li>
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

          <div className="footer-bottom">
            © 2026 Trail Explorers · Made in India ✦
          </div>
        </div>
      </footer>
    </>
  );
};
