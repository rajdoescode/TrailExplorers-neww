"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const FloatingWidgets: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Banjara Avatar Trip Planner Launcher */}
      <Link
        href="/plan-your-trip"
        className="relative w-14 h-14 rounded-2xl bg-[#14140f] border-2 border-white/20 p-1 flex items-center justify-center shadow-[0_8px_24px_rgba(20,20,15,0.35)] hover:scale-110 active:scale-95 transition-all duration-200 group"
        aria-label="Plan your trip with Banjara"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1f201a]">
          <Image
            src="/assets/images/mascot/banjara-sprite.webp"
            alt="Banjara Mascot"
            fill
            className="object-cover object-top scale-110 group-hover:scale-115 transition-transform"
          />
        </div>
        {/* Online Status Dot */}
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#d6ff3f] rounded-full border-2 border-[#14140f] shadow-sm" />
      </Link>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919103910523?text=Hi%20Awara%20Banjara!%20%F0%9F%91%8B%20I'm%20interested%20in%20planning%20a%20Himalayan%20trip%20with%20you.%20Could%20you%20share%20more%20details%3F"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="w-13 h-13 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <svg
          className="w-7 h-7 text-white fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.115.549 4.106 1.517 5.839l-1.611 5.882 6.046-1.587c1.674.912 3.585 1.433 5.617 1.433 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
        </svg>
      </a>
    </div>
  );
};
