"use client";

import React, { useState } from "react";
import { X, Copy, Check, MessageSquare } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ShareModal({ isOpen, onClose, title }: ShareModalProps) {
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
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#e2e2dc] relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f0eb] mb-5">
          <h3 className="font-extrabold text-lg text-[#14140f] font-heading">
            Share this Page
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f0ea] hover:bg-[#e2e2dc] text-[#14140f] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close share modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#6b6b63] mb-6">
          Share <strong className="text-[#14140f]">{title}</strong> with your travel buddies and plan together.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl border border-[#14140f] bg-[#14140f] text-white hover:bg-[#2c2c24] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
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
            className="w-full py-3 px-4 rounded-xl border border-[#25d366] bg-[#25d366]/10 text-[#128c7e] hover:bg-[#25d366]/20 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25d366]" />
            <span>Share on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
