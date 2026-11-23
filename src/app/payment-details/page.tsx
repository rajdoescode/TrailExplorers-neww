"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, MapPin, Mail, Phone, Sparkles } from "lucide-react";

export default function PaymentDetailsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    }
  };

  return (
    <div className="w-full bg-[#fbfbf9] min-h-screen py-10 sm:py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Ambient Glassmorphic Glow Orbs */}
      <div
        className="absolute top-12 left-1/4 w-[420px] h-[420px] bg-[#d6ff3f]/20 rounded-full blur-[110px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-24 w-[480px] h-[480px] bg-[#d6ff3f]/15 rounded-full blur-[130px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-10 w-[360px] h-[360px] bg-[#a9cc2a]/15 rounded-full blur-[100px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Title */}
      <div className="relative z-10 text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/90 text-xs font-bold text-[#14140f] uppercase tracking-wider mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Sparkles className="w-3.5 h-3.5 text-[#a9cc2a]" />
          <span>Verified Payment Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold text-[#14140f] tracking-tight">
          Payment Details
        </h1>
      </div>

      {/* Main Glass Stack */}
      <div className="max-w-[860px] mx-auto flex flex-col gap-8 relative z-10">
        
        {/* CARD 1: BANK TRANSFER (Glassmorphism) */}
        <div className="bg-white/80 backdrop-blur-xl border-2 border-[#14140f] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(214,255,63,0.35),0_4px_16px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.95)_inset] hover:shadow-[0_20px_50px_rgba(214,255,63,0.48),0_8px_24px_rgba(20,20,15,0.08)] hover:-translate-y-1 transition-all duration-300">
          {/* Header */}
          <div className="px-5 sm:px-7 py-4 border-b border-[#14140f] bg-white/50 backdrop-blur-md flex items-center gap-3.5">
            <svg
              className="w-5 h-5 text-[#14140f] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
            </svg>
            <h2 className="text-[17px] sm:text-[19px] font-bold text-[#14140f] flex items-center flex-wrap gap-2 m-0">
              <span>Bank Transfer</span>
              <span className="text-xs sm:text-[13px] text-[#73736c] font-normal tracking-wide">
                NEFT / RTGS / IMPS
              </span>
            </h2>
          </div>

          {/* Table Rows */}
          <div className="w-full divide-y divide-[#ecece5]/80">
            {/* Account Name */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 hover:bg-white/60 transition-colors gap-1 sm:gap-4">
              <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] shrink-0">
                Account Name
              </span>
              <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] text-left sm:text-right">
                Trail Explorers Private Limited
              </span>
            </div>

            {/* Account Number */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 hover:bg-white/60 transition-colors gap-1 sm:gap-4 group">
              <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] shrink-0">
                Account Number
              </span>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] font-mono tracking-wide">
                  50200084920194
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("50200084920194", "accountNumber")}
                  className="p-1 rounded-md text-[#73736c] hover:text-[#14140f] hover:bg-white/90 backdrop-blur-sm border border-transparent hover:border-black/10 transition-colors"
                  title="Copy Account Number"
                  aria-label="Copy Account Number"
                >
                  {copiedKey === "accountNumber" ? (
                    <span className="flex items-center text-xs text-green-700 font-bold gap-1 bg-green-50/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-green-200">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* IFSC Code */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 hover:bg-white/60 transition-colors gap-1 sm:gap-4 group">
              <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] shrink-0">
                IFSC Code
              </span>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] font-mono tracking-wider">
                  HDFC0001234
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("HDFC0001234", "ifsc")}
                  className="p-1 rounded-md text-[#73736c] hover:text-[#14140f] hover:bg-white/90 backdrop-blur-sm border border-transparent hover:border-black/10 transition-colors"
                  title="Copy IFSC Code"
                  aria-label="Copy IFSC Code"
                >
                  {copiedKey === "ifsc" ? (
                    <span className="flex items-center text-xs text-green-700 font-bold gap-1 bg-green-50/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-green-200">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Bank Name */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 hover:bg-white/60 transition-colors gap-1 sm:gap-4">
              <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] shrink-0">
                Bank Name
              </span>
              <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] text-left sm:text-right">
                HDFC Bank Ltd.
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: UPI PAYMENTS (Glassmorphism) */}
        <div className="bg-white/80 backdrop-blur-xl border-2 border-[#14140f] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(214,255,63,0.35),0_4px_16px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.95)_inset] hover:shadow-[0_20px_50px_rgba(214,255,63,0.48),0_8px_24px_rgba(20,20,15,0.08)] hover:-translate-y-1 transition-all duration-300">
          {/* Header */}
          <div className="px-5 sm:px-7 py-4 border-b border-[#14140f] bg-white/50 backdrop-blur-md flex items-center gap-3.5">
            <svg
              className="w-5 h-5 text-[#14140f] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="6" width="20" height="14" rx="2" />
              <circle cx="16" cy="13" r="1.5" fill="currentColor" />
              <path d="M4 7V5a2 2 0 0 1 2-2h12" />
            </svg>
            <h2 className="text-[17px] sm:text-[19px] font-bold text-[#14140f] flex items-center flex-wrap gap-2 m-0">
              <span>UPI Payments</span>
              <span className="text-xs sm:text-[13px] text-[#73736c] font-normal tracking-wide">
                Google Pay / PhonePe / BHIM / Paytm
              </span>
            </h2>
          </div>

          {/* QR Code Scan Area */}
          <div className="pt-7 pb-6 px-5 sm:px-7 flex flex-col items-center justify-center border-b border-[#ecece5]/80 bg-white/30 backdrop-blur-sm">
            <span className="text-[14px] text-[#73736c] font-medium mb-3.5">
              Scan to Pay
            </span>
            <div className="p-2.5 bg-white/90 backdrop-blur-md border border-[#e0e0d8] rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06),0_1px_1px_rgba(255,255,255,1)_inset] mb-3">
              <Image
                src="/assets/images/payment/trail-explorers-upi-qr.png"
                alt="Trail Explorers UPI QR Code"
                width={180}
                height={180}
                className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] object-contain rounded-xl"
                priority
              />
            </div>
            {/* UPI Logo */}
            <div className="flex items-center justify-center">
              <svg width="68" height="22" viewBox="0 0 120 40" fill="none" aria-label="UPI">
                <path d="M15 10L25 30H5L15 10Z" fill="#7C2529" />
                <path d="M35 10L45 30H25L35 10Z" fill="#0F7A3E" />
                <text
                  x="52"
                  y="26"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="800"
                  fontSize="20"
                  fill="#14140f"
                >
                  UPI
                </text>
              </svg>
            </div>
          </div>

          {/* UPI ID Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 border-b border-[#ecece5]/80 hover:bg-white/60 transition-colors gap-1 sm:gap-4 group">
            <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] shrink-0">
              UPI ID
            </span>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] font-mono tracking-wide">
                trailexplorers@hdfcbank
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard("trailexplorers@hdfcbank", "upiId")}
                className="p-1 rounded-md text-[#73736c] hover:text-[#14140f] hover:bg-white/90 backdrop-blur-sm border border-transparent hover:border-black/10 transition-colors shrink-0"
                title="Copy UPI ID"
                aria-label="Copy UPI ID"
              >
                {copiedKey === "upiId" ? (
                  <span className="flex items-center text-xs text-green-700 font-bold gap-1 bg-green-50/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-green-200">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* UPI Name Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 hover:bg-white/60 transition-colors gap-1 sm:gap-4 group">
            <span className="text-sm sm:text-[14.5px] font-semibold text-[#14140f] shrink-0">
              UPI Name
            </span>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs sm:text-[14.5px] font-semibold text-[#14140f] tracking-wide text-left sm:text-right">
                TRAIL EXPLORERS PRIVATE LIMITED
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    "TRAIL EXPLORERS PRIVATE LIMITED",
                    "upiName"
                  )
                }
                className="p-1 rounded-md text-[#73736c] hover:text-[#14140f] hover:bg-white/90 backdrop-blur-sm border border-transparent hover:border-black/10 transition-colors shrink-0"
                title="Copy UPI Name"
                aria-label="Copy UPI Name"
              >
                {copiedKey === "upiName" ? (
                  <span className="flex items-center text-xs text-green-700 font-bold gap-1 bg-green-50/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-green-200">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* CARD 3: IMPORTANT (Glassmorphism) */}
        <div className="bg-white/80 backdrop-blur-xl border-2 border-[#14140f] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(214,255,63,0.35),0_4px_16px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.95)_inset] hover:shadow-[0_20px_50px_rgba(214,255,63,0.48),0_8px_24px_rgba(20,20,15,0.08)] hover:-translate-y-1 transition-all duration-300">
          {/* Header */}
          <div className="px-5 sm:px-7 py-4 border-b border-[#14140f] bg-white/50 backdrop-blur-md flex items-center gap-3.5">
            <svg
              className="w-5 h-5 text-[#14140f] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h2 className="text-[17px] sm:text-[19px] font-bold text-[#14140f] m-0">
              Important
            </h2>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-7 bg-white/30 backdrop-blur-sm">
            <ul className="list-disc pl-5 space-y-3.5 text-xs sm:text-[14px] text-[#14140f] leading-relaxed">
              <li>
                Please make payments only to the official bank account and UPI details
                mentioned on this page.{" "}
                <strong className="font-bold">
                  TRAIL EXPLORERS PRIVATE LIMITED
                </strong>{" "}
                will not be responsible for any payments made to unauthorized
                accounts. Always verify the details before making a transaction.
              </li>
              <li>
                In case of any questions or concerns, please contact us on{" "}
                <strong className="font-bold">+91 70166 40870</strong> or email{" "}
                <strong className="font-bold">trailexplorers@gmail.com</strong>
              </li>
            </ul>

            {/* Registered Office Details */}
            <div className="mt-5 pt-4 border-t border-[#ecece5]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#73736c]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#14140f] shrink-0" />
                <span>
                  <strong>Registered Office:</strong> 01 Rachana Society, Opp. Residency Hotel, Deesa, Gujarat 385535, India
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href="mailto:trailexplorers@gmail.com"
                  className="inline-flex items-center gap-1.5 hover:text-[#14140f] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>trailexplorers@gmail.com</span>
                </a>
                <a
                  href="tel:+917016640870"
                  className="inline-flex items-center gap-1.5 hover:text-[#14140f] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 70166 40870</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
