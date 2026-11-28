"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/data/site-config";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { WhatsAppSocialBar } from "@/components/common/WhatsAppSocialBar";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and phone number");
      return;
    }
    setSent(true);
  };

  return (
    <div className="w-full bg-[#fbfbf8] text-[#14140f] min-h-screen py-10 sm:py-16 relative overflow-hidden">
      {/* Single Full-Page Fixed Background - Soft and luminous */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/backgrounds/contact-mobile.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/backgrounds/contact-desktop.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[right_top] opacity-90 contrast-[1.02]"
          />
        </picture>
      </div>

      {/* Ambient Glassmorphism Glow Spheres */}
      <div
        className="absolute top-10 left-10 w-[420px] h-[420px] bg-[#d6ff3f]/25 rounded-full blur-[120px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-20 w-[460px] h-[460px] bg-[#d6ff3f]/18 rounded-full blur-[130px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-emerald-400/12 rounded-full blur-[110px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-md text-[#14140f] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3.5 border border-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_1px_rgba(255,255,255,0.9)_inset]">
            <Sparkles className="w-3.5 h-3.5 text-[#a9cc2a]" />
            <span>We Are Here For You</span>
          </span>
          <Heading
            level={1}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14140f] tracking-tight mb-3 sm:mb-4"
          >
            Contact Us
          </Heading>
          <Paragraph className="text-sm sm:text-base text-[#6b6b63] leading-relaxed">
            Have questions about high-altitude acclimatization, booking tokens, or bike expeditions?
            Speak directly with our Himalayan base crew.
          </Paragraph>
        </div>

        {/* 2-Column Glass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 items-start">
          
          {/* LEFT: Contact Details Card (Dark Luxury Glassmorphism) */}
          <div className="lg:col-span-2 bg-[#14140f]/90 backdrop-blur-2xl text-white rounded-[28px] p-6 sm:p-8 md:p-9 border-2 border-[#14140f] shadow-[0_20px_50px_rgba(20,20,15,0.25),0_1px_1px_rgba(255,255,255,0.18)_inset] relative overflow-hidden flex flex-col gap-6 sm:gap-7">
            {/* Subtle internal glow orb */}
            <div
              className="absolute -top-16 -right-16 w-44 h-44 bg-[#d6ff3f]/15 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Header info */}
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d6ff3f] mb-2 bg-[#d6ff3f]/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#d6ff3f]/25">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Registered Office</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1.5">
                Trail Explorers
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Registered Tourism Enterprise &amp; Himalayan Adventure Expeditions Operator.
              </p>
            </div>

            {/* Frosted Detail Blocks */}
            <div className="flex flex-col gap-3.5 text-sm text-white/90">
              {/* Address */}
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/[0.1] hover:border-white/20 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#d6ff3f]/15 flex items-center justify-center shrink-0 border border-[#d6ff3f]/30">
                  <MapPin className="w-4 h-4 text-[#d6ff3f]" />
                </div>
                <div>
                  <strong className="block text-white/90 text-xs uppercase tracking-wider mb-0.5">
                    Office Address
                  </strong>
                  <span className="text-xs sm:text-sm text-white/80 leading-relaxed block">
                    01 Rachana Society, Opp. Residency Hotel, Deesa, Gujarat 385535, India
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/[0.1] hover:border-white/20 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#d6ff3f]/15 flex items-center justify-center shrink-0 border border-[#d6ff3f]/30">
                  <Phone className="w-4 h-4 text-[#d6ff3f]" />
                </div>
                <div>
                  <strong className="block text-white/90 text-xs uppercase tracking-wider mb-0.5">
                    Phone / WhatsApp
                  </strong>
                  <a
                    href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-[#d6ff3f] transition-colors block"
                  >
                    {SITE_CONFIG.site_phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/[0.1] hover:border-white/20 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#d6ff3f]/15 flex items-center justify-center shrink-0 border border-[#d6ff3f]/30">
                  <Mail className="w-4 h-4 text-[#d6ff3f]" />
                </div>
                <div>
                  <strong className="block text-white/90 text-xs uppercase tracking-wider mb-0.5">
                    Official Email
                  </strong>
                  <a
                    href="mailto:trailexplorers@gmail.com"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-[#d6ff3f] transition-colors block"
                  >
                    trailexplorers@gmail.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white/[0.1] hover:border-white/20 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#d6ff3f]/15 flex items-center justify-center shrink-0 border border-[#d6ff3f]/30">
                  <Clock className="w-4 h-4 text-[#d6ff3f]" />
                </div>
                <div>
                  <strong className="block text-white/90 text-xs uppercase tracking-wider mb-0.5">
                    Hours of Operation
                  </strong>
                  <span className="text-xs sm:text-sm text-white/80 leading-relaxed block">
                    Mon – Sat: 9:00 AM – 8:00 PM IST
                    <br />
                    <span className="text-white/60 text-[11px]">Sunday: Emergency Mountain Dispatch Only</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-2">
              <Button
                href={`https://wa.me/${SITE_CONFIG.whatsapp_number.replace(/[^0-9]/g, "")}?text=Hi%20Trail%20Explorers!%20%F0%9F%91%8B%20I%20have%20a%20query%20regarding%20an%20expedition.`}
                external
                variant="whatsapp"
                size="md"
                fullWidth
                leftIcon={<WhatsAppIcon className="w-5 h-5 fill-current text-white shrink-0" />}
                className="shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] font-bold text-sm"
              >
                Chat on WhatsApp Now
              </Button>
            </div>
          </div>

          {/* RIGHT: Interactive Contact Form (Light Luxury Glassmorphism) */}
          <div className="lg:col-span-3 bg-white/80 backdrop-blur-2xl rounded-[28px] p-6 sm:p-8 md:p-10 border-2 border-[#14140f] shadow-[0_20px_50px_rgba(214,255,63,0.32),0_8px_24px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.95)_inset]">
            {sent ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#d6ff3f]/30 border border-[#d6ff3f] text-[#14140f] flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-[#2fa84f]" />
                </div>
                <Heading level={2} className="text-2xl font-bold text-[#14140f]">
                  Message Dispatched!
                </Heading>
                <p className="text-sm text-[#6b6b63] max-w-sm leading-relaxed">
                  Thank you for reaching out! A trip captain or advisor will review your message
                  and reply via WhatsApp or Phone within a few hours.
                </p>
                <Button
                  onClick={() => setSent(false)}
                  variant="primary"
                  className="mt-4 shadow-lime-btn"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <div>
                    <Heading level={3} className="text-2xl sm:text-[26px] font-extrabold text-[#14140f]">
                      Send Us a Direct Message
                    </Heading>
                    <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
                      Fill in your details and we will get back to you promptly.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#d6ff3f]/40 text-[#14140f] px-3 py-1 rounded-full border border-[#14140f]/20">
                    <Clock className="w-3.5 h-3.5 text-[#14140f]" />
                    <span>Avg Response &lt; 2 hrs</span>
                  </span>
                </div>

                {/* Form Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#14140f]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-white/70 backdrop-blur-md border-2 border-[#e2e2dc]/90 hover:border-[#14140f]/40 focus:border-[#14140f] focus:bg-white focus:shadow-[0_0_0_3px_rgba(214,255,63,0.45)] outline-none transition-all placeholder:text-[#94a3b8] text-[#14140f] font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#14140f]">
                      Phone Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-white/70 backdrop-blur-md border-2 border-[#e2e2dc]/90 hover:border-[#14140f]/40 focus:border-[#14140f] focus:bg-white focus:shadow-[0_0_0_3px_rgba(214,255,63,0.45)] outline-none transition-all placeholder:text-[#94a3b8] text-[#14140f] font-medium"
                    />
                  </div>
                </div>

                {/* Form Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#14140f]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-white/70 backdrop-blur-md border-2 border-[#e2e2dc]/90 hover:border-[#14140f]/40 focus:border-[#14140f] focus:bg-white focus:shadow-[0_0_0_3px_rgba(214,255,63,0.45)] outline-none transition-all placeholder:text-[#94a3b8] text-[#14140f] font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#14140f]">
                      Interested Region / Trip
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Winter Spiti or Zanskar"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-white/70 backdrop-blur-md border-2 border-[#e2e2dc]/90 hover:border-[#14140f]/40 focus:border-[#14140f] focus:bg-white focus:shadow-[0_0_0_3px_rgba(214,255,63,0.45)] outline-none transition-all placeholder:text-[#94a3b8] text-[#14140f] font-medium"
                    />
                  </div>
                </div>

                {/* Query / Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-bold text-[#14140f]">
                    Your Query / Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can our mountain team assist you?"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white/70 backdrop-blur-md border-2 border-[#e2e2dc]/90 hover:border-[#14140f]/40 focus:border-[#14140f] focus:bg-white focus:shadow-[0_0_0_3px_rgba(214,255,63,0.45)] outline-none transition-all placeholder:text-[#94a3b8] text-[#14140f] font-medium resize-none"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  leftIcon={<Send className="w-4 h-4" />}
                  className="shadow-lime-btn font-extrabold mt-2 hover:-translate-y-0.5 transition-all text-base py-3.5"
                >
                  Submit Message
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* WhatsApp & Social Support Bar */}
        <div className="mt-12 sm:mt-16">
          <WhatsAppSocialBar
            phone="+91 70166 40870"
            whatsappLink="https://wa.me/917016640870?text=Hi%20Trail%20Explorers!%20%F0%9F%91%8B%20I'm%20reaching%20out%20from%20the%20contact%20page."
            instagramLink="https://www.instagram.com/trail_explorers_"
            youtubeLink="https://www.youtube.com/@Trail_Explorers"
            facebookLink="https://facebook.com"
          />
        </div>
      </Container>
    </div>
  );
}
