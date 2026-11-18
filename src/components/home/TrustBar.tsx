import React from "react";
import { Container } from "@/components/layout/Container";

export const TrustBar: React.FC = () => {
  return (
    <section className="w-full bg-[#fbfbf9] border-b border-[#e6e6df] py-4 sm:py-5">
      <Container>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16">
          {/* Stat 1: Instagram */}
          <a
            className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-semibold text-[#14140f] hover:opacity-85 transition-opacity"
            href="https://www.instagram.com/awarabanjaracommunity?igsh=MXhpZG11ZnV4MmdhcA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="trustIgGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="25%" stopColor="#fa7e1e" />
                  <stop offset="55%" stopColor="#d62976" />
                  <stop offset="80%" stopColor="#962fbf" />
                  <stop offset="100%" stopColor="#4f5bd5" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="6" ry="6" fill="url(#trustIgGradient)" />
              <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.3" fill="#fff" />
            </svg>
            <span>
              <strong className="font-extrabold">13,000+</strong>{" "}
              <span className="font-medium text-[#14140f]/80">Instagram Community</span>
            </span>
          </a>

          {/* Stat 2: Google Reviews */}
          <a
            className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-semibold text-[#14140f] hover:opacity-85 transition-opacity"
            href="https://share.google/iuuImIepaTHvLgaxm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.64v3h3.88c2.27-2.09 3.57-5.17 3.57-8.83z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.73-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.27a12 12 0 0 0 0 10.76l4-3.09z" />
              <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
            </svg>
            <span>
              <strong className="font-extrabold">4.9★</strong>{" "}
              <span className="font-medium text-[#14140f]/80">Google Reviews</span>
            </span>
          </a>

          {/* Stat 3: Travellers */}
          <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-semibold text-[#14140f]">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8.5" cy="8" r="3" />
              <path d="M2 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
              <circle cx="17" cy="8.5" r="2.5" />
              <path d="M15.5 12a4.5 4.5 0 0 1 4.5 4.5V19" />
            </svg>
            <span>
              <strong className="font-extrabold">5,000+</strong>{" "}
              <span className="font-medium text-[#14140f]/80">Travellers</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
