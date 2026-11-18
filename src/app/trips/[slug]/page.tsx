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
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedSharing, setSelectedSharing] = useState<string>("quad");

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

          {/* Sticky Booking Sidebar (1 Col) */}
          <div className="sticky top-[100px] flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#14140f] shadow-2xl flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6b63] block">
                  Guaranteed Departure
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#14140f]">
                    {formatPrice(trip.price)}
                  </span>
                  <span className="text-xs text-[#6b6b63] font-semibold">/ per person</span>
                </div>
              </div>

              {/* Occupancy Selector */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#f0f0eb]">
                <label className="text-xs font-bold text-[#14140f]">Select Sharing Occupancy:</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {[
                    { id: "quad", label: "Quad", tag: "Best Value" },
                    { id: "triple", label: "Triple", tag: "Popular" },
                    { id: "double", label: "Double", tag: "Private" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSharing(s.id)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedSharing === s.id
                          ? "bg-[#14140f] text-[#d6ff3f] border-[#14140f]"
                          : "bg-[#f6f6f1] text-[#14140f] border-[#e2e2dc] hover:bg-[#e8e8e2]"
                      }`}
                    >
                      <div>{s.label}</div>
                      <div className="text-[10px] font-medium opacity-80">{s.tag}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={() => setReserveModalOpen(true)}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="shadow-lime-btn font-extrabold text-sm sm:text-base py-3.5"
                >
                  Reserve Your Spot (10% Token)
                </Button>

                <Button
                  href={getWhatsAppBookingLink()}
                  external
                  variant="whatsapp"
                  size="md"
                  fullWidth
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  Quick Inquire on WhatsApp
                </Button>
              </div>

              {/* Guarantee badges */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[#f0f0eb] text-xs text-[#6b6b63]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2fa84f]" />
                  <span>Lock seat with only 10% advance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2fa84f]" />
                  <span>Full refund up to 30 days before departure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2fa84f]" />
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

      {/* Reservation Modal */}
      {reserveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative border-2 border-[#14140f] shadow-2xl">
            <button
              onClick={() => setReserveModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-[#f6f6f1] hover:bg-[#d6ff3f] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#14140f]" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#d6ff3f] bg-[#14140f] px-3 py-1 rounded-full inline-block mb-3">
              Seat Reservation
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#14140f] mb-1">
              Lock Your Seat: {trip.title}
            </h3>
            <p className="text-xs text-[#6b6b63] mb-6">
              Lock your departure date with a flexible 10% token. Balance payable 7 days before departure.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your booking reservation request has been dispatched to our booking desk.");
                setReserveModalOpen(false);
              }}
              className="flex flex-col gap-4 text-left"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#14140f] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-[#f6f6f1] border border-[#e2e2dc] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#14140f]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#14140f] block mb-1">WhatsApp No.</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#f6f6f1] border border-[#e2e2dc] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#14140f]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#14140f] block mb-1">Preferred Travel Month / Batch</label>
                <input
                  type="text"
                  placeholder="e.g. Next upcoming weekend or Dec 15"
                  className="w-full bg-[#f6f6f1] border border-[#e2e2dc] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#14140f]"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" fullWidth className="font-extrabold shadow-lime-btn">
                  Confirm Reservation Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
