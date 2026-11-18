import React from "react";
import { Users } from "lucide-react";

export const TrustBar: React.FC = () => {
  return (
    <section className="w-full bg-white border-y border-gray-100 py-4 sm:py-5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Stat 1: Instagram */}
          <a
            href="https://www.instagram.com/awarabanjaracommunity?igsh=MXhpZG11ZnV4MmdhcA=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3.5 py-3 md:py-1 px-4 group hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[17px] font-extrabold text-[#14140f] leading-tight">
                13,000+
              </span>
              <span className="text-xs font-medium text-[#6b6b63]">
                Instagram Community
              </span>
            </div>
          </a>

          {/* Stat 2: Google Reviews */}
          <a
            href="https://share.google/iuuImIepaTHvLgaxm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3.5 py-3 md:py-1 px-4 group hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-xs flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.64v3h3.88c2.27-2.09 3.57-5.17 3.57-8.83z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.73-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z" />
                <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.27a12 12 0 0 0 0 10.76l4-3.09z" />
                <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[17px] font-extrabold text-[#14140f] leading-tight">
                4.9★
              </span>
              <span className="text-xs font-medium text-[#6b6b63]">
                Google Reviews (500+)
              </span>
            </div>
          </a>

          {/* Stat 3: Travellers */}
          <div className="flex items-center justify-center gap-3.5 py-3 md:py-1 px-4">
            <div className="w-10 h-10 rounded-xl bg-[#14140f] flex items-center justify-center shrink-0 shadow-xs text-[#d6ff3f]">
              <Users className="w-5 h-5 text-[#d6ff3f]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[17px] font-extrabold text-[#14140f] leading-tight">
                5,000+
              </span>
              <span className="text-xs font-medium text-[#6b6b63]">
                Happy Travellers Guided
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
