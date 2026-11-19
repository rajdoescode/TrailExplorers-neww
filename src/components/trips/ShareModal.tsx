"use client";

import React, { useState } from "react";
import { X, Copy, Check, MessageSquare } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ShareModal({ isOpen, onClose, title }: ShareModalProps) {
  useScrollLock(isOpen);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = `Check out this Himalayan trip with Trail Explorers: ${title}\n${window.location.href}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm transition-opacity touch-none overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-t-[28px] sm:rounded-2xl p-5 sm:p-7 max-w-md w-full shadow-2xl border border-[#e2e2dc] relative pb-[calc(20px+env(safe-area-inset-bottom,0px))] sm:pb-7 animate-in fade-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 max-h-[calc(100dvh-32px)] overflow-y-auto overscroll-contain touch-pan-y">
        {/* Mobile drag handle */}
        <div className="w-10 h-1 bg-[#d5d5cd] rounded-full mx-auto mb-3 block sm:hidden" />

        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#f0f0eb] mb-4 sm:mb-5">
          <h3 className="font-extrabold text-base sm:text-lg text-[#14140f] font-heading">
            Share this Page
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#f0f0ea] hover:bg-[#e2e2dc] text-[#14140f] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close share modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#6b6b63] mb-5 sm:mb-6 leading-relaxed">
          Share <strong className="text-[#14140f]">{title}</strong> with your travel buddies and plan together.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl border border-[#14140f] bg-[#14140f] text-white hover:bg-[#2c2c24] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#d6ff3f]" />
                <span>Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Trip Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={shareWhatsApp}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl border border-[#25d366] bg-[#25d366]/10 text-[#128c7e] hover:bg-[#25d366]/20 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 text-[#25d366]" />
            <span>Share on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
