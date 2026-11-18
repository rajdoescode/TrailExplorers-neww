"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { SITE_CONFIG } from "@/data/site-config";
import { CheckCircle2, Sparkles, Send, MessageSquare } from "lucide-react";

export default function PlanYourTripPage() {
  const [formData, setFormData] = useState({
    destination: "Spiti Valley",
    tripType: "Friends Group",
    duration: "7-9 Days",
    month: "Upcoming Month",
    style: "Comfort Homestays & SUV",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and phone number");
      return;
    }
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = `Hi Awara Banjara! I would like to plan a custom trip:\n- Destination: ${formData.destination}\n- Type: ${formData.tripType}\n- Duration: ${formData.duration}\n- Travel Month: ${formData.month}\n- Name: ${formData.name}\n- Notes: ${formData.notes || "None"}`;
    return `https://wa.me/${SITE_CONFIG.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen py-16">
      <Container size="narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 border border-[#14140f]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor-Made Expeditions</span>
          </span>
          <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Plan Your Himalayan Trip
          </Heading>
          <Paragraph className="text-sm sm:text-base text-[#6b6b63] leading-relaxed">
            Tell us where and how you want to wander. Our valley experts will craft a personalized day-by-day itinerary with verified drivers and boutique stays.
          </Paragraph>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#14140f] shadow-2xl text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#e8f7ed] text-[#2fa84f] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <Heading level={2} className="text-2xl sm:text-3xl font-extrabold">
              Itinerary Request Received!
            </Heading>
            <p className="text-sm text-[#6b6b63] max-w-md leading-relaxed">
              Thank you, <strong>{formData.name}</strong>! One of our senior Himalayan trip planners will review your request and message you on WhatsApp (<strong>{formData.phone}</strong>) within 2-4 hours.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 justify-center">
              <Button href={getWhatsAppLink()} external variant="whatsapp" size="lg" leftIcon={<MessageSquare className="w-5 h-5" />}>
                Chat Instantly on WhatsApp
              </Button>
              <Button onClick={() => setSubmitted(false)} variant="outline" size="lg">
                Edit Request
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#14140f] shadow-card flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                options={[
                  { label: "Spiti Valley", value: "Spiti Valley" },
                  { label: "Ladakh & Zanskar", value: "Ladakh & Zanskar" },
                  { label: "Himachal (Manali, Kasol, Jibhi)", value: "Himachal Pradesh" },
                  { label: "Kashmir (Gulmarg, Dal Lake)", value: "Kashmir" },
                  { label: "Uttarakhand", value: "Uttarakhand" },
                  { label: "Northeast India (Meghalaya, Ziro)", value: "Northeast India" },
                  { label: "Multi-Region / Custom Circuit", value: "Custom Circuit" },
                ]}
              />

              <Select
                label="Who is Traveling?"
                value={formData.tripType}
                onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                options={[
                  { label: "Friends Group (3-8 people)", value: "Friends Group" },
                  { label: "Couple / Honeymoon", value: "Couple" },
                  { label: "Solo Explorer", value: "Solo" },
                  { label: "Family Vacation", value: "Family" },
                  { label: "Corporate / College Group", value: "Corporate Group" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Estimated Duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                options={[
                  { label: "Weekend (3-4 Days)", value: "3-4 Days" },
                  { label: "Standard (5-7 Days)", value: "5-7 Days" },
                  { label: "Deep Circuit (8-10 Days)", value: "8-10 Days" },
                  { label: "Grand Expedition (11+ Days)", value: "11+ Days" },
                ]}
              />

              <Input
                label="Tentative Month / Dates"
                placeholder="e.g. Mid December, or Jan 15-22"
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Your Full Name"
                placeholder="e.g. Rohan Sharma"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                label="WhatsApp Phone Number"
                placeholder="e.g. +91 98765 43210"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <Input
              label="Email Address (Optional)"
              type="email"
              placeholder="e.g. rohan@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Textarea
              label="Special Preferences / Notes"
              placeholder="Tell us about bike rental needs, trekking wishes, dietary preferences, or specific places you want to visit..."
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />

            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Button type="submit" variant="primary" size="lg" fullWidth leftIcon={<Send className="w-4 h-4" />}>
                Submit Itinerary Request
              </Button>
              <Button href={getWhatsAppLink()} external variant="whatsapp" size="lg" fullWidth leftIcon={<MessageSquare className="w-5 h-5" />}>
                Send Directly via WhatsApp
              </Button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
}
