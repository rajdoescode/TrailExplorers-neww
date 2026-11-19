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

      {/* ============ PLAN YOUR NEXT TRIP MODAL (Exact awarabanjara.in Structure & Styling) ============ */}
      <div
        className={`share-modal-overlay ${isBookModalOpen ? "active" : ""}`}
        id="bookingModal"
        role="dialog"
        aria-hidden={!isBookModalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsBookModalOpen(false);
        }}
      >
        <div className="booking-popup-card">
          {/* LEFT COLUMN: Dynamic Hero Card */}
          <div
            className="booking-popup-hero"
            id="bookingPopupHero"
            style={{
              backgroundImage: `url(${trip.image_url || "/assets/images/home/hero-poster.jpg"})`,
            }}
          >
            <h2 className="booking-popup-headline">
              Escape the<br />ordinary.
            </h2>
            <div className="booking-popup-badge" id="bookingHeroBadge">
              <div style={{ fontSize: "11px", opacity: 0.85, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Selected Batch
              </div>
              <div id="bookingSelectedBatch" style={{ fontSize: "14px", fontWeight: 800, marginTop: "2px" }}>
                🗓️ On Request Departure Date
              </div>
              <div id="bookingSelectedPackage" style={{ fontSize: "12px", fontWeight: 700, marginTop: "2px", opacity: 0.9 }}>
                📦 Triple/Quad Sharing
              </div>
              <div id="bookingSelectedPrice" style={{ fontSize: "17px", fontWeight: 800, color: "#d6ff3f", marginTop: "3px" }}>
                {formatPrice(trip.price)}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Inputs */}
          <div className="booking-popup-form">
            <div className="booking-popup-header">
              <h3 className="booking-popup-title">Plan Your Next Trip</h3>
              <button
                type="button"
                className="share-modal-close"
                id="closeBookingModal"
                aria-label="Close modal"
                onClick={() => setIsBookModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form
              id="bookingForm"
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
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div className="booking-field-group">
                <input
                  type="text"
                  id="custName"
                  className="booking-input"
                  required
                  placeholder="Your Name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                />
              </div>

              <div className="booking-field-group">
                <div className="phone-input-group">
                  <span className="country-code-tag">+91</span>
                  <input
                    type="tel"
                    id="custPhone"
                    className="booking-input"
                    required
                    placeholder="Mobile No."
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="booking-field-group">
                <input
                  type="email"
                  id="custEmail"
                  className="booking-input"
                  placeholder="Email (optional)"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                />
              </div>

              <div className="booking-grid-2 booking-field-group">
                <div>
                  <input
                    type="text"
                    id="custDateDisplay"
                    className="booking-input"
                    readOnly
                    value="On Request Departure Date"
                    style={{ background: "#f8fafc", fontWeight: 700 }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    id="custTravelers"
                    className="booking-input"
                    min={1}
                    max={20}
                    value={bookingForm.travelers}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        travelers: parseInt(e.target.value) || 1,
                      })
                    }
                    placeholder="No. of Travelers"
                    title="Number of Travelers"
                  />
                </div>
              </div>

              <div className="booking-field-group">
                <textarea
                  id="custRequests"
                  className="booking-input"
                  rows={3}
                  placeholder="Message (optional)"
                  style={{ resize: "none" }}
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                id="submitBookingBtn"
                className="btn-popup-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Connecting..." : "Connect with Expert"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ============ INQUIRY SUCCESS CONFIRMATION MODAL ============ */}
      <div
        className={`share-modal-overlay ${isSuccessOpen ? "active" : ""}`}
        id="inquirySuccessModal"
        role="dialog"
        aria-hidden={!isSuccessOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsSuccessOpen(false);
        }}
      >
        <div className="inquiry-success-card">
          <div style={{ fontSize: "54px", marginBottom: "12px" }}>🎉</div>
          <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.3px", fontFamily: "var(--font-heading)" }}>
            Thank You for Contacting!
          </h3>
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.6, marginBottom: "24px", fontWeight: 500 }}>
            Thank you for contacting, you will get a call back soon from our expert with your itinerary for <strong>{trip.title}</strong>.
          </p>
          <button
            type="button"
            id="closeSuccessModalBtn"
            className="btn-popup-submit"
            style={{ marginTop: 0 }}
            onClick={() => setIsSuccessOpen(false)}
          >
            OK, GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}
