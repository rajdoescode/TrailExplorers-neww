"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SITE_CONFIG } from "@/data/site-config";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

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
    <div className="w-full bg-[#f6f6f1] min-h-screen py-10 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 border border-[#14140f]">
            <Phone className="w-3.5 h-3.5" />
            <span>We Are Here For You</span>
          </span>
          <Heading level={1} className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            Contact Us
          </Heading>
          <Paragraph className="text-sm sm:text-base text-[#6b6b63] leading-relaxed">
            Have questions about high-altitude acclimatization, booking tokens, or bike rentals? Speak directly with our Himalayan base team.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 items-start">
          {/* Contact Details Card (2 Cols) */}
          <div className="lg:col-span-2 bg-[#14140f] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border-2 border-[#14140f] shadow-2xl flex flex-col gap-6 sm:gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#d6ff3f] block mb-2">
                Registered Office
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Trail Explorers
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Registered Tourism Enterprise &amp; Adventure Expeditions Operator.
              </p>
            </div>

            <div className="flex flex-col gap-6 text-sm text-white/90">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#d6ff3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Office Address</strong>
                  <span>01 Rachana Society, Opp. Residency Hotel, Deesa, Gujarat 385535, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#d6ff3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Phone / WhatsApp</strong>
                  <a href={`tel:${SITE_CONFIG.site_phone.replace(/[^0-9+]/g, "")}`} className="hover:text-[#d6ff3f] transition-colors block">
                    {SITE_CONFIG.site_phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#d6ff3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Official Email</strong>
                  <a href="mailto:trailexplorers@gmail.com" className="hover:text-[#d6ff3f] transition-colors block">
                    trailexplorers@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#d6ff3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider">Hours of Operation</strong>
                  <span>Mon – Sat: 9:00 AM – 8:00 PM IST<br />Sunday: Emergency Dispatch Only</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                href={`https://wa.me/${SITE_CONFIG.whatsapp_number.replace(/[^0-9]/g, "")}`}
                external
                variant="whatsapp"
                size="md"
                fullWidth
                leftIcon={<WhatsAppIcon className="w-5 h-5 fill-current text-white shrink-0" />}
              >
                Chat on WhatsApp Now
              </Button>
            </div>
          </div>

          {/* Interactive Contact Form (3 Cols) */}
          <div className="lg:col-span-3 bg-white/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border-2 border-[#14140f] shadow-[0_12px_40px_rgba(20,20,15,0.08),0_1px_1px_rgba(255,255,255,0.9)_inset]">
            {sent ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#e8f7ed] text-[#2fa84f] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <Heading level={2} className="text-2xl font-bold">
                  Message Dispatched!
                </Heading>
                <p className="text-sm text-[#6b6b63] max-w-sm leading-relaxed">
                  Thank you for reaching out! A trip advisor will review your message and reply via WhatsApp or Phone within a few hours.
                </p>
                <Button onClick={() => setSent(false)} variant="primary" className="mt-4">
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Heading level={3} className="text-2xl font-bold text-[#14140f] mb-1">
                  Send Us a Direct Message
                </Heading>
                <p className="text-xs text-[#6b6b63] -mt-2 mb-2">
                  Fill in your details and we will get back to you promptly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Phone Number (WhatsApp)"
                    placeholder="+91 98765 43210"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    label="Interested Region / Trip"
                    placeholder="e.g. Winter Spiti or Zanskar"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                </div>

                <Textarea
                  label="Your Query / Message"
                  placeholder="How can our mountain team assist you?"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button type="submit" variant="primary" size="lg" leftIcon={<Send className="w-4 h-4" />} className="shadow-lime-btn font-extrabold mt-2">
                  Submit Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
