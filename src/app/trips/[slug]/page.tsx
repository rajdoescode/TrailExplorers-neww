"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TripCard } from "@/components/trips/TripCard";
import { TRIPS_DATA } from "@/data/trips";
import { SITE_CONFIG } from "@/data/site-config";
import { formatPrice } from "@/lib/utils";
import {
  Clock,
  MapPin,
  Mountain,
  Calendar,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Share2,
  Users,
} from "lucide-react";

export default function TripDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Find trip by slug or ID
  const trip = useMemo(() => {
    if (!slug) return null;
    return (
      TRIPS_DATA.find((t) => t.slug === slug || String(t.id) === slug) ||
      TRIPS_DATA.find((t) => t.slug?.includes(slug) || slug.includes(String(t.id)))
    );
  }, [slug]);

  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    departureDate: "On Request Departure Date",
    travelers: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSharing, setSelectedSharing] = useState<string>("triple");

  if (!trip) {
    return (
      <div className="py-24 text-center">
        <Container>
          <Heading level={2}>Trip Itinerary Not Found</Heading>
          <p className="mt-2 text-[#6b6b63]">The requested Himalayan departure could not be loaded.</p>
          <div className="mt-6">
            <Button href="/community-trips" variant="primary">
              Browse All Trips
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Related trips
  const relatedTrips = TRIPS_DATA.filter(
    (t) => t.id !== trip.id && (t.category === trip.category || t.category.includes("spiti"))
  ).slice(0, 3);

  const toggleDay = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  const getWhatsAppBookingLink = () => {
    const text = `Hi Awara Banjara! I would like to inquire about booking: "${trip.title}" (${trip.duration}). Starting price: ${trip.price}. Please share upcoming batch dates and seat availability.`;
    return `https://wa.me/${SITE_CONFIG.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#e2e2dc] py-3">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-[#6b6b63] font-semibold">
            <Link href="/" className="hover:text-[#14140f]">Home</Link>
            <span>/</span>
            <Link href="/community-trips" className="hover:text-[#14140f]">Trips</Link>
            <span>/</span>
            <span className="text-[#14140f] truncate max-w-sm">{trip.title}</span>
          </nav>
        </Container>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-[#e2e2dc] py-8 sm:py-12">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="lime" size="md">
                Verified Departure
              </Badge>
              <Badge variant="dark" size="md">
                Small Group
              </Badge>
              {trip.route && (
                <span className="text-xs text-[#6b6b63] font-bold flex items-center gap-1 ml-2">
                  <MapPin className="w-3.5 h-3.5 text-[#14140f]" />
                  <span>{trip.route}</span>
                </span>
              )}
            </div>

            <Heading level={1} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14140f] leading-tight">
              {trip.title}
            </Heading>

            {/* Quick Meta Row */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-semibold text-[#14140f]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#d6ff3f] fill-[#14140f]" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#14140f]" />
                <span>12 - 16 Wanderers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2fa84f]" />
                <span>Certified Mountain Captain</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Image Gallery Bento Grid */}
      <section className="py-6 bg-white border-b border-[#e2e2dc]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[340px] sm:h-[440px]">
            {/* Primary Main Image */}
            <div className="md:col-span-3 relative h-full rounded-2xl overflow-hidden border border-[#e2e2dc]">
              <Image
                src={trip.image_url || "/assets/images/home/hero-poster.jpg"}
                alt={trip.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            {/* Secondary Thumbnail Stacks */}
            <div className="hidden md:flex flex-col gap-4 h-full">
              <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#e2e2dc]">
                <Image
                  src={trip.bento_img_1 || trip.image_url || "/assets/images/destinations/domestic/himachal.jpg"}
                  alt="Trip highlight 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#e2e2dc]">
                <Image
                  src={trip.bento_img_2 || "/assets/images/about/community-group.jpg"}
                  alt="Trip highlight 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content & Sticky Sidebar Container */}
      <Container className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Column (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* About / Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
              <Heading level={2} className="text-xl sm:text-2xl font-bold mb-4">
                About This Expedition
              </Heading>
              <div className="text-sm text-[#14140f] leading-relaxed whitespace-pre-line">
                {trip.about_text ||
                  "A masterfully planned Himalayan odyssey designed to immerse you into raw alpine landscapes, ancient valley traditions, and high altitude thrills. Accompanied by certified mountain leaders and experienced native drivers."}
              </div>
            </div>

            {/* Day-by-Day Accordion Itinerary */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <Heading level={2} className="text-xl sm:text-2xl font-bold">
                    Detailed Day-by-Day Itinerary
                  </Heading>
                  <span className="text-xs font-bold text-[#6b6b63]">
                    {trip.itinerary.length} Days Planned
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {trip.itinerary.map((day) => {
                    const isExpanded = expandedDay === day.day;
                    return (
                      <div
                        key={day.day}
                        className="border border-[#e2e2dc] rounded-xl overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleDay(day.day)}
                          className="w-full p-4 sm:p-5 text-left bg-[#fcfcf9] hover:bg-[#f6f6f1] flex items-center justify-between gap-4 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#14140f] text-[#d6ff3f] flex items-center justify-center font-extrabold text-xs shrink-0">
                              D{day.day}
                            </span>
                            <span className="font-bold text-sm sm:text-base text-[#14140f]">
                              {day.title}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-[#14140f] shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[#6b6b63] shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-5 bg-white border-t border-[#e2e2dc] text-sm text-[#14140f] leading-relaxed">
                            <p className="mb-3">{day.desc || day.description}</p>
                            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#6b6b63] pt-2 border-t border-[#f0f0eb]">
                              {day.distance && <span>🚗 Distance: {day.distance}</span>}
                              {day.altitude && <span>⛰️ Altitude: {day.altitude}</span>}
                              {day.stay && <span>🏡 Stay: {day.stay}</span>}
                              {day.meals && <span>🍲 Meals: {day.meals}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2e2dc] shadow-card">
                <div className="flex items-center gap-2 mb-4 text-[#2fa84f] font-bold">
                  <Check className="w-5 h-5" />
                  <h3 className="text-base text-[#14140f] font-bold">What&apos;s Included</h3>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#14140f]">
                  {(trip.inclusions && trip.inclusions.length > 0
                    ? trip.inclusions
                    : [
                        "All accommodation in handpicked village homestays / premium camps",
                        "Breakfast and dinner freshly prepared at stays",
                        "Dedicated high-ground vehicle with veteran mountain driver",
                        "Certified local mountain captain & first aid coordinator",
                        "Inner line permits and environmental passes",
                        "Emergency oxygen cylinder support on high passes",
                      ]
                  ).map((inc: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#2fa84f] shrink-0 mt-0.5" />
                      <span>{String(inc)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2e2dc] shadow-card">
                <div className="flex items-center gap-2 mb-4 text-[#e0455a] font-bold">
                  <X className="w-5 h-5" />
                  <h3 className="text-base text-[#14140f] font-bold">What&apos;s Excluded</h3>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#14140f]">
                  {(trip.exclusions && trip.exclusions.length > 0
                    ? trip.exclusions
                    : [
                        "Personal meals or café lunches en route",
                        "Personal shopping, laundry, and heating charges",
                        "Adventure activity tickets (paragliding, rafting)",
                        "Unforeseen roadblock evacuation or flight delay costs",
                      ]
                  ).map((exc: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[#e0455a] shrink-0 mt-0.5" />
                      <span>{String(exc)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            {trip.faqs && trip.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
                <Heading level={2} className="text-xl sm:text-2xl font-bold mb-6">
                  Frequently Asked Questions
                </Heading>
                <div className="flex flex-col gap-4">
                  {trip.faqs.map((faq: any, i: number) => (
                    <div key={i} className="border-b border-[#f0f0eb] pb-4">
                      <h4 className="text-sm font-bold text-[#14140f] mb-1.5">{faq.question}</h4>
                      <p className="text-xs sm:text-sm text-[#6b6b63] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar (1 Col) matching Live Reference */}
          <div className="sticky top-[100px] flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e2e2dc] shadow-card flex flex-col gap-4">
              <div>
                <span className="text-xs text-[#6b6b63] font-medium block">
                  Starting From
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#14140f] font-heading">
                    {formatPrice(trip.price)}
                  </span>
                  <span className="text-xs text-[#6b6b63] font-medium">per person</span>
                </div>
                <span className="text-[11px] text-[#6b6b63] font-semibold block mt-0.5">
                  + 5% GST
                </span>
              </div>

              {/* BOOK NOW Primary Button */}
              <button
                type="button"
                onClick={() => setIsBookModalOpen(true)}
                className="w-full bg-[#d6ff3f] text-[#14140f] font-extrabold text-base py-3.5 rounded-xl border border-[#14140f] shadow-lime-btn hover:bg-[#ccff00] hover:shadow-lg transition-all cursor-pointer text-center font-heading"
              >
                BOOK NOW
              </button>

              {/* Private Trip Option */}
              <div className="pt-3 border-t border-[#f0f0eb] text-left">
                <span className="text-xs font-bold text-[#14140f] block">
                  Private Trip Available
                </span>
                <span className="text-[11px] text-[#6b6b63] block mt-0.5">
                  Customised itinerary for groups of 4+ travelers
                </span>
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(true)}
                  className="mt-2 w-full py-2.5 px-3 rounded-xl border border-[#14140f] text-xs font-bold text-[#14140f] hover:bg-[#14140f] hover:text-[#d6ff3f] transition-all cursor-pointer text-center"
                >
                  Chat with our Trip Planner
                </button>
              </div>

              {/* WhatsApp Us Button */}
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl border border-[#e2e2dc] text-xs font-bold text-[#14140f] flex items-center justify-center gap-2 hover:bg-[#f6f6f1] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#25d366]" />
                <span>WhatsApp Us</span>
              </a>

              {/* Guarantee badges */}
              <div className="flex flex-col gap-2 pt-3 border-t border-[#f0f0eb] text-xs text-[#6b6b63]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2fa84f] shrink-0" />
                  <span>Lock seat with only 10% advance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2fa84f] shrink-0" />
                  <span>Full refund up to 30 days before departure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2fa84f] shrink-0" />
                  <span>Zero hidden costs or permit charges</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Departures */}
        {relatedTrips.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#e2e2dc]">
            <Heading level={2} className="text-2xl font-bold mb-6">
              You May Also Like
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedTrips.map((rel) => (
                <TripCard key={rel.id} trip={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e2dc] p-3 px-4 flex items-center justify-between shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[10px] text-[#6b6b63] font-semibold block uppercase">Starting From</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-[#14140f] font-heading">{formatPrice(trip.price)}</span>
            <span className="text-[10px] text-[#6b6b63]">/ person</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsBookModalOpen(true)}
          className="bg-[#d6ff3f] text-[#14140f] font-extrabold text-sm px-6 py-2.5 rounded-full border border-[#14140f] shadow-lime-btn hover:bg-[#ccff00] cursor-pointer font-heading"
        >
          BOOK NOW
        </button>
      </div>

      {/* ============ PLAN YOUR NEXT TRIP MODAL (Matching awarabanjara.in) ============ */}
      {isBookModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsBookModalOpen(false);
          }}
        >
          <div className="relative bg-white rounded-[24px] sm:rounded-[28px] max-w-[800px] w-full shadow-[0_24px_60px_rgba(0,0,0,0.38)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
            {/* Close Button Top Right */}
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-3.5 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#14140f] hover:bg-black/5 transition-all z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-[#14140f]" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 p-3 sm:p-4 gap-3 sm:gap-4 max-h-[90dvh] overflow-y-auto md:max-h-none md:overflow-visible">
              {/* Left Column: Visual Trip Card */}
              <div className="relative rounded-[18px] sm:rounded-[22px] overflow-hidden min-h-[260px] md:min-h-[440px] bg-[#14140f] flex flex-col justify-between p-5">
                <Image
                  src={trip.image_url || "/assets/images/home/hero-poster.jpg"}
                  alt={trip.title}
                  fill
                  priority
                  className="object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />

                {/* Heading Top */}
                <div className="relative z-10 text-left">
                  <h2 className="text-white font-extrabold text-2xl sm:text-3xl leading-[1.15] font-heading drop-shadow-md">
                    Escape the<br />ordinary.
                  </h2>
                </div>

                {/* Bottom Selected Batch Box */}
                <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-white text-left shadow-lg">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block mb-1">
                    SELECTED BATCH
                  </span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white">
                    <span>🗓️</span>
                    <span>{bookingForm.departureDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-200 mt-1">
                    <span>📦</span>
                    <span>Triple/Quad Sharing</span>
                  </div>
                  <div className="text-[#d6ff3f] text-xl sm:text-2xl font-extrabold mt-1.5 font-heading">
                    {formatPrice(trip.price)}
                  </div>
                </div>
              </div>

              {/* Right Column: Trip Planning Form */}
              <div className="p-2 sm:p-3 md:py-2 md:pr-2 flex flex-col justify-center">
                <div className="mb-3 text-left">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#14140f] font-heading">
                    Plan Your Next Trip
                  </h3>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const inquiry = {
                      id: "TRIP_INQ_" + Date.now(),
                      trip_title: trip.title,
                      trip_price: trip.price,
                      customer_name: bookingForm.name,
                      phone: bookingForm.phone,
                      email: bookingForm.email,
                      departure_date: bookingForm.departureDate,
                      travelers: bookingForm.travelers,
                      message: bookingForm.message,
                      created_at: new Date().toISOString(),
                    };
                    try {
                      const list = JSON.parse(localStorage.getItem("awara_inquiries") || "[]");
                      list.push(inquiry);
                      localStorage.setItem("awara_inquiries", JSON.stringify(list));
                    } catch {}
                    await new Promise((r) => setTimeout(r, 600));
                    setIsSubmitting(false);
                    setIsBookModalOpen(false);
                    setIsSuccessOpen(true);
                  }}
                  className="flex flex-col gap-2.5 sm:gap-3 text-left"
                >
                  {/* Your Name */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full border border-[#e2e2dc] rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#14140f] bg-white outline-none placeholder:text-gray-400 focus:border-[#14140f] transition-all"
                    />
                  </div>

                  {/* Mobile No. */}
                  <div className="flex items-center border border-[#e2e2dc] rounded-xl overflow-hidden focus-within:border-[#14140f] transition-all bg-white">
                    <span className="px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-gray-700 bg-[#f8f8f5] border-r border-[#e2e2dc] shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile No."
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#14140f] placeholder:text-gray-400 outline-none bg-transparent"
                    />
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full border border-[#e2e2dc] rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#14140f] bg-white outline-none placeholder:text-gray-400 focus:border-[#14140f] transition-all"
                    />
                  </div>

                  {/* Date & Travelers Count */}
                  <div className="grid grid-cols-[1fr_88px] gap-2">
                    <input
                      type="text"
                      readOnly
                      value={bookingForm.departureDate}
                      className="w-full bg-[#f8f8f5] border border-[#e2e2dc] rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#14140f] outline-none"
                    />
                    <div className="flex items-center justify-between border border-[#e2e2dc] rounded-xl px-2.5 py-2 bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          setBookingForm({
                            ...bookingForm,
                            travelers: Math.max(1, bookingForm.travelers - 1),
                          })
                        }
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black font-bold text-base cursor-pointer select-none"
                      >
                        -
                      </button>
                      <span className="font-bold text-xs sm:text-sm text-[#14140f]">
                        {bookingForm.travelers}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setBookingForm({
                            ...bookingForm,
                            travelers: bookingForm.travelers + 1,
                          })
                        }
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black font-bold text-base cursor-pointer select-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Message (optional) */}
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Message (optional)"
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                      className="w-full border border-[#e2e2dc] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#14140f] bg-white outline-none placeholder:text-gray-400 focus:border-[#14140f] resize-none transition-all"
                    />
                  </div>

                  {/* Connect with Expert Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d6ff3f] text-[#14140f] font-extrabold text-sm sm:text-base py-3 sm:py-3.5 rounded-xl border border-[#14140f] shadow-lime-btn hover:bg-[#ccff00] hover:shadow-lg transition-all cursor-pointer flex items-center justify-center font-heading mt-1"
                  >
                    {isSubmitting ? "Connecting..." : "Connect with Expert"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ INQUIRY SUCCESS CONFIRMATION MODAL ============ */}
      {isSuccessOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSuccessOpen(false);
          }}
        >
          <div className="relative bg-white rounded-[28px] max-w-[460px] w-[92%] p-7 sm:p-9 text-center shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="text-[52px] mb-3 select-none">🎉</div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#14140f] mb-2 font-heading">
              Thank You for Contacting!
            </h3>
            <p className="text-xs sm:text-sm text-[#6b6b63] leading-relaxed mb-6 font-medium">
              We have received your booking inquiry for <strong>{trip.title}</strong>. Our Himalayan expedition specialist will reach out to you shortly via WhatsApp / call.
            </p>
            <button
              type="button"
              onClick={() => setIsSuccessOpen(false)}
              className="w-full sm:w-auto px-8 py-3 font-extrabold cursor-pointer rounded-xl bg-[#d6ff3f] text-[#14140f] border border-[#14140f] hover:bg-[#ccff00] transition-all font-heading"
            >
              OK, GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
