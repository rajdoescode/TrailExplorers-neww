"use client";

import React, { useState } from "react";
import { X, Download, Check } from "lucide-react";

interface PdfLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function PdfLeadModal({ isOpen, onClose, title }: PdfLeadModalProps) {
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
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#e2e2dc] relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f0eb] mb-5">
          <div>
            <h3 className="font-extrabold text-lg text-[#14140f] font-heading">
              Get the Itinerary
            </h3>
            <p className="text-xs text-[#6b6b63] mt-0.5 truncate max-w-[280px]">
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f0ea] hover:bg-[#e2e2dc] text-[#14140f] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
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
              className="py-2 px-5 rounded-xl border border-[#14140f] bg-[#14140f] text-white text-xs font-bold"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e2dc] focus:border-[#14140f] text-xs sm:text-sm outline-none transition-colors"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e2dc] focus:border-[#14140f] text-xs sm:text-sm outline-none transition-colors"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e2dc] focus:border-[#14140f] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 px-4 rounded-xl border border-[#14140f] bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lime-btn transition-all cursor-pointer font-heading"
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
