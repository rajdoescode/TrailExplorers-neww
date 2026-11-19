"use client";

import React from "react";

export interface WhatsAppSocialBarProps {
  className?: string;
  phone?: string;
  whatsappLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  facebookLink?: string;
}

export const WhatsAppSocialBar: React.FC<WhatsAppSocialBarProps> = ({
  className = "",
  phone = "+91 70166 40870",
  whatsappLink = "https://wa.me/917016640870?text=Hi%20Trail%20Explorers!%20%F0%9F%91%8B%20I'm%20interested%20in%20planning%20a%20Himalayan%20trip%20with%20you.",
  instagramLink = "#",
  youtubeLink = "https://www.youtube.com/@Trail_Explorers",
  facebookLink = "#",
}) => {
  const isExternal = (url?: string) => Boolean(url && url !== "#" && url.startsWith("http"));
  return (
    <div
      className={`w-full max-w-[820px] mx-auto bg-white border-[1.5px] border-[#14140f] rounded-full px-5 py-3 sm:px-7 sm:py-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 transition-all duration-200 ${className}`}
    >
      {/* WhatsApp Left Side */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center sm:justify-start gap-3.5 text-[#14140f] no-underline hover:opacity-95 transition-opacity"
      >
        <span className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(37,211,102,0.3)] text-white">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
          </svg>
        </span>
        <span className="flex flex-col text-left">
          <small className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#6b6b63] leading-tight block">
            INSTANT WHATSAPP BOOKING:
          </small>
          <strong className="text-[16px] sm:text-[17px] font-extrabold text-[#14140f] tracking-tight group-hover:text-[#16a34a] transition-colors leading-tight mt-0.5">
            {phone}
          </strong>
        </span>
      </a>

      {/* Social Right Side */}
      <div className="flex items-center gap-3 sm:gap-3.5">
        <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#6b6b63] whitespace-nowrap leading-none">
          FOLLOW TRAILS ON:
        </span>
        <div className="flex items-center gap-2">
          {/* Instagram */}
          <a
            href={instagramLink}
            target={isExternal(instagramLink) ? "_blank" : undefined}
            rel={isExternal(instagramLink) ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!isExternal(instagramLink)) e.preventDefault();
            }}
            aria-label="Instagram"
            className="w-8 h-8 rounded-full border border-[#14140f] bg-white text-[#14140f] inline-flex items-center justify-center hover:bg-[#14140f] hover:text-[#d6ff3f] hover:scale-105 transition-all duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href={youtubeLink}
            target={isExternal(youtubeLink) ? "_blank" : undefined}
            rel={isExternal(youtubeLink) ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!isExternal(youtubeLink)) e.preventDefault();
            }}
            aria-label="YouTube"
            className="w-8 h-8 rounded-full border border-[#14140f] bg-white text-[#14140f] inline-flex items-center justify-center hover:bg-[#14140f] hover:text-[#d6ff3f] hover:scale-105 transition-all duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={facebookLink}
            target={isExternal(facebookLink) ? "_blank" : undefined}
            rel={isExternal(facebookLink) ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!isExternal(facebookLink)) e.preventDefault();
            }}
            aria-label="Facebook"
            className="w-8 h-8 rounded-full border border-[#14140f] bg-white text-[#14140f] inline-flex items-center justify-center hover:bg-[#14140f] hover:text-[#d6ff3f] hover:scale-105 transition-all duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
