"use client";

import React, { useState } from "react";
import { X, Download, Check } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";

interface PdfLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function PdfLeadModal({ isOpen, onClose, title }: PdfLeadModalProps) {
  useScrollLock(isOpen);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.print();
      }
    }, 600);
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
          <div className="min-w-0 pr-3">
            <h3 className="font-extrabold text-base sm:text-lg text-[#14140f] font-heading leading-tight">
              Get the Itinerary
            </h3>
            <p className="text-xs text-[#6b6b63] mt-0.5 truncate max-w-[240px] sm:max-w-[280px]">
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#f0f0ea] hover:bg-[#e2e2dc] text-[#14140f] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {downloaded ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-[#e8f7ee] text-[#2fa84f] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="font-extrabold text-base text-[#14140f] mb-1">
              Itinerary Ready!
            </h4>
            <p className="text-xs text-[#6b6b63] mb-5">
              Opening print preview / save as PDF...
            </p>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 rounded-xl border border-[#14140f] bg-[#14140f] text-white text-xs sm:text-sm font-bold min-h-[44px] cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#14140f] mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-[#e2e2dc] focus:border-[#14140f] text-xs sm:text-sm outline-none transition-colors min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14140f] mb-1">
                WhatsApp / Mobile No.
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-[#e2e2dc] focus:border-[#14140f] text-xs sm:text-sm outline-none transition-colors min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14140f] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="rahul@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-[#e2e2dc] focus:border-[#14140f] text-xs sm:text-sm outline-none transition-colors min-h-[44px]"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full min-h-[48px] py-3.5 px-4 rounded-xl border border-[#14140f] bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lime-btn transition-all cursor-pointer font-heading active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Itinerary</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
