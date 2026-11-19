"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { TripCard } from "@/components/trips/TripCard";
import { TRIPS_DATA } from "@/data/trips";
import { SITE_CONFIG } from "@/data/site-config";
import { formatPrice } from "@/lib/utils";
import {
  getTripWeather,
  getTripGallery,
  getTripAttractions,
  getTripReviews,
  getTripPackingList,
} from "@/lib/trip-helpers";
import { BentoGallery } from "@/components/trips/BentoGallery";
import { WeatherCard } from "@/components/trips/WeatherCard";
import { StickySecondaryNav } from "@/components/trips/StickySecondaryNav";
import { PackingListSection } from "@/components/trips/PackingListSection";
import { DepartureDatesSection } from "@/components/trips/DepartureDatesSection";
import { AttractionsCarousel } from "@/components/trips/AttractionsCarousel";
import { FaqsAccordion } from "@/components/trips/FaqsAccordion";
import { TripReviewsSection } from "@/components/trips/TripReviewsSection";
import { ShareModal } from "@/components/trips/ShareModal";
import { PdfLeadModal } from "@/components/trips/PdfLeadModal";
import {
  Clock,
  MapPin,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Share2,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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

  // Derived datasets
  const weather = useMemo(() => (trip ? getTripWeather(trip) : null), [trip]);
  const galleryImages = useMemo(() => (trip ? getTripGallery(trip) : []), [trip]);
  const attractions = useMemo(() => (trip ? getTripAttractions(trip) : []), [trip]);
  const reviews = useMemo(() => (trip ? getTripReviews(trip) : []), [trip]);
  const packingCategories = useMemo(() => (trip ? getTripPackingList(trip) : []), [trip]);

  // Related trips in the same destination / category (up to 4)
  const relatedTrips = useMemo(() => {
    if (!trip) return [];
    const dest = (trip.category || "").toLowerCase();
    const primary = TRIPS_DATA.filter((t) => t.id !== trip.id && (t.category === trip.category || t.category.includes(dest)));
    if (primary.length >= 4) return primary.slice(0, 4);
    const fallbacks = TRIPS_DATA.filter((t) => t.id !== trip.id && !primary.some((p) => p.id === t.id));
    return [...primary, ...fallbacks].slice(0, 4);
  }, [trip]);

  // Interactive states
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 1: true });
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Selected package option
  const initialPackage = trip?.package_options?.[0]?.title || "Triple/Quad Sharing";
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackage);
  const [selectedPrice, setSelectedPrice] = useState<string>(trip ? String(trip.price) : "0");

  // Selected departure batch
  const initialBatch = trip?.departure_dates?.[0]?.dates?.[0]?.range || "On Request Departure Date";
  const [selectedBatchDate, setSelectedBatchDate] = useState<string>(initialBatch);

  // Modals state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    departureDate: initialBatch,
    travelers: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!trip) {
    return (
      <div className="py-24 text-center">
        <Container>
          <h2 className="text-2xl font-bold text-[#14140f]">Trip Itinerary Not Found</h2>
          <p className="mt-2 text-[#6b6b63]">The requested Himalayan departure could not be loaded.</p>
          <div className="mt-6">
            <Link
              href="/community-trips"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-[#d6ff3f] text-[#14140f] font-bold border border-[#14140f] shadow-lime-btn"
            >
              Browse All Trips
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Handle package selection
  const handlePackageSelect = (pkgTitle: string, pkgPrice: string) => {
    setSelectedPackage(pkgTitle);
    setSelectedPrice(pkgPrice);
  };

  // Handle batch selection & open modal
  const handleSelectBatchAndBook = (batchDate: string, batchPrice: string) => {
    setSelectedBatchDate(batchDate);
    if (batchPrice) setSelectedPrice(batchPrice);
    setBookingForm((prev) => ({ ...prev, departureDate: batchDate }));
    setIsBookModalOpen(true);
  };

  // Toggle day accordion independently
  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const areAllDaysOpen = trip?.itinerary ? trip.itinerary.every((d) => !!openDays[d.day]) : false;

  // Toggle all days
  const toggleAllDays = () => {
    if (areAllDaysOpen) {
      setOpenDays({});
    } else {
      const all: Record<number, boolean> = {};
      trip?.itinerary?.forEach((d) => {
        all[d.day] = true;
      });
      setOpenDays(all);
    }
  };

  const getWhatsAppBookingLink = () => {
    const text = `Hi Awara Banjara! I would like to inquire about booking: "${trip.title}" (${trip.duration}). Selected Package: ${selectedPackage} (${formatPrice(selectedPrice)}). Batch: ${selectedBatchDate}. Please share seat availability.`;
    return `https://wa.me/${SITE_CONFIG.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  const tripTags = Array.isArray(trip.tags)
    ? trip.tags
    : typeof trip.tags === "string" && trip.tags.length > 0
    ? trip.tags.split(",").map((t: string) => t.trim())
    : ["Group Tour", "High Altitude", "Scenic Drive"];

  const destinationLabel = trip.category?.includes("spiti")
    ? "Spiti"
    : trip.category?.includes("kashmir")
    ? "Kashmir"
    : trip.category?.includes("zanskar")
    ? "Zanskar"
    : trip.category?.includes("ladakh")
    ? "Ladakh"
    : "Himachal";

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* 1. Bento Image Gallery with Lightbox */}
      <BentoGallery images={galleryImages} title={trip.title} />

      {/* 2. Secondary Sticky Navigation */}
      <StickySecondaryNav />

      {/* Main Content & Sticky Sidebar Layout */}
      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Column (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* 3. Title Card */}
            <div id="title-card" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card title-card">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-[#6b6b63] font-medium mb-3">
                <Link href="/" className="hover:text-[#14140f]">Home</Link>
                <span>›</span>
                <Link href={`/${destinationLabel.toLowerCase()}`} className="hover:text-[#14140f]">
                  {destinationLabel}
                </Link>
                <span>›</span>
                <span className="text-[#14140f] font-semibold truncate max-w-xs sm:max-w-md">
                  {trip.title}
                </span>
              </nav>

              {/* Meta Duration Row */}
              <div className="flex items-center gap-2 text-xs font-bold text-[#14140f] mb-2.5">
                <Clock className="w-4 h-4 text-[#14140f]" />
                <span>{trip.duration}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14140f] font-heading leading-tight mb-3">
                {trip.title}
              </h1>

              {/* Route */}
              {trip.route && (
                <p className="text-xs sm:text-sm text-[#6b6b63] font-medium leading-relaxed mb-4">
                  {trip.route}
                </p>
              )}

              {/* Tags & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#f0f0eb]">
                <div className="flex flex-wrap items-center gap-2">
                  {tripTags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#f0f0ea] text-[#14140f] text-xs font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsShareModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14140f] text-white text-xs font-bold hover:bg-[#2c2c24] transition-all cursor-pointer shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPdfModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d6ff3f] text-[#14140f] text-xs font-bold hover:bg-[#ccff00] border border-[#14140f] transition-all cursor-pointer shadow-lime-btn"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Weather Card */}
            {weather && <WeatherCard weather={weather} />}

            {/* 5. About This Trip */}
            <div id="about" className="scroll-mt-32 sm:scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
              <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading mb-4">
                About This Trip
              </h2>

              <div
                className={`text-xs sm:text-sm text-[#3b3b33] leading-relaxed transition-all duration-300 ${
                  !isAboutExpanded ? "max-h-[140px] overflow-hidden relative" : ""
                }`}
              >
                {trip.about_text ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: trip.about_text }}
                    className="rich-text flex flex-col gap-3"
                  />
                ) : (
                  <p>
                    An extraordinary Himalayan journey meticulously crafted by Awara Banjara, designed to take you far beyond the ordinary tourist trails. This exclusive expedition is a perfect blend of rich cultural heritage, adrenaline-pumping high-altitude drives, and soul-soothing mountain vistas. Travel with seasoned mountain drivers, certified expedition leaders, and a community of like-minded explorers.
                  </p>
                )}

                {!isAboutExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsAboutExpanded((prev) => !prev)}
                className="mt-3 text-xs sm:text-sm font-extrabold text-[#14140f] hover:underline cursor-pointer"
              >
                {isAboutExpanded ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* 6. Itinerary Accordion */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <div id="itinerary" className="scroll-mt-32 sm:scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading">
                      Itinerary
                    </h2>
                    <span className="text-xs font-semibold text-[#6b6b63]">
                      {trip.itinerary.length} Days Planned
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleAllDays}
                    className="text-xs font-bold text-[#14140f] px-3.5 py-1.5 rounded-lg border border-[#d4d4cb] bg-transparent hover:bg-[#f0f0eb] transition-all cursor-pointer"
                  >
                    {areAllDaysOpen ? "Collapse All" : "Expand All"}
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {trip.itinerary.map((day) => {
                    const isOpen = !!openDays[day.day];
                    const rawText = day.desc || day.description || "";
                    const points =
                      day.points && day.points.length > 0
                        ? day.points
                        : rawText
                            .split(/\n+|\.\s+(?=[A-Z])/)
                            .map((s: string) => s.trim().replace(/\.$/, ""))
                            .filter((s: string) => s.length > 0);

                    return (
                      <div
                        key={day.day}
                        className={`border-2 border-[#14140f] rounded-2xl overflow-hidden transition-all duration-200 ${
                          isOpen
                            ? "bg-[#f8ffe0] shadow-[0_6px_20px_rgba(214,255,63,0.35)]"
                            : "bg-white hover:bg-[#fafaf7]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleDay(day.day)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3.5 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                            <span className="shrink-0 px-3 py-1 border-2 border-[#14140f] rounded-lg bg-[#d6ff3f] text-[#14140f] text-xs sm:text-[13px] font-extrabold whitespace-nowrap shadow-xs">
                              Day {day.day}
                            </span>
                            <span className="font-bold text-sm sm:text-base text-[#14140f] truncate sm:whitespace-normal">
                              {day.title}
                            </span>
                          </div>

                          {/* Square + / - toggle icon matching awarabanjara.in */}
                          <div className="w-6 h-6 shrink-0 rounded-md border-2 border-[#14140f] flex items-center justify-center font-bold text-sm text-[#14140f] bg-transparent">
                            {isOpen ? (
                              <span className="w-2.5 h-0.5 bg-[#14140f]" />
                            ) : (
                              <span className="relative w-2.5 h-2.5 flex items-center justify-center">
                                <span className="absolute w-2.5 h-0.5 bg-[#14140f]" />
                                <span className="absolute h-2.5 w-0.5 bg-[#14140f]" />
                              </span>
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#33332c] leading-relaxed border-t border-[#14140f]/10">
                            {points.length > 0 ? (
                              <ul className="flex flex-col gap-2.5 pt-3">
                                {points.map((pt: string, pIdx: number) => (
                                  <li key={pIdx} className="flex items-start gap-3">
                                    <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#14140f] bg-[radial-gradient(circle,#14140f_0_2.5px,#d6ff3f_3px)] shrink-0 mt-1" />
                                    <span className="leading-relaxed">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="pt-2">{rawText}</p>
                            )}

                            {(day.distance || day.altitude || day.stay || day.meals) && (
                              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#6b6b63] pt-4 mt-3 border-t border-[#14140f]/10">
                                {day.distance && <span>🚗 Distance: {day.distance}</span>}
                                {day.altitude && <span>⛰️ Altitude: {day.altitude}</span>}
                                {day.stay && <span>🏡 Stay: {day.stay}</span>}
                                {day.meals && <span>🍲 Meals: {day.meals}</span>}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reserve Your Seat Banner (Matches live awarabanjara.in) */}
            <div className="bg-[#d6ff3f] border-[2.5px] border-[#14140f] rounded-2xl sm:rounded-[20px] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_24px_rgba(214,255,63,0.45)]">
              <div>
                <h3 className="text-xl sm:text-[22px] font-extrabold text-[#14140f] font-heading mb-1">
                  Reserve your seat now!
                </h3>
                <p className="text-xs sm:text-sm text-[#22221b] font-medium">
                  Limited seats per batch for an intimate group experience.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(true)}
                className="shrink-0 bg-[#14140f] hover:bg-[#25251c] text-white font-bold text-sm sm:text-[15px] py-3 px-7 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer font-heading"
              >
                BOOK NOW
              </button>
            </div>

            {/* 7. Inclusions & Exclusions */}
            <div id="inclusions" className="scroll-mt-32 sm:scroll-mt-36 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e2e2dc] shadow-card">
                <div className="flex items-center gap-2 mb-4 text-[#2fa84f] font-bold">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <h3 className="text-base sm:text-lg text-[#14140f] font-extrabold font-heading">
                    Inclusions
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#14140f]">
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
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#2fa84f] font-bold mt-0.5 shrink-0">✔</span>
                      <span className="leading-relaxed">{String(inc)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e2e2dc] shadow-card">
                <div className="flex items-center gap-2 mb-4 text-[#e0455a] font-bold">
                  <X className="w-5 h-5 stroke-[2.5]" />
                  <h3 className="text-base sm:text-lg text-[#14140f] font-extrabold font-heading">
                    Exclusions
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#14140f]">
                  {(trip.exclusions && trip.exclusions.length > 0
                    ? trip.exclusions
                    : [
                        "5% GST applicable on the total package cost",
                        "Any flights, train tickets, or transit expenses to starting city",
                        "Lunches, midday snacks, and bottled drinking water",
                        "Room heater charges at homestays / hotels",
                        "Personal expenses such as laundry, phone calls, tips",
                        "Unforeseen roadblock evacuation or flight delay costs",
                      ]
                  ).map((exc: any, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#e0455a] font-bold mt-0.5 shrink-0">✘</span>
                      <span className="leading-relaxed">{String(exc)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 8. Package Options */}
            <div id="packages" className="scroll-mt-32 sm:scroll-mt-36 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card">
              <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading mb-4">
                Package Options
              </h2>

              <div className="flex flex-wrap gap-3">
                {(trip.package_options && trip.package_options.length > 0
                  ? trip.package_options
                  : [
                      { title: "Triple/Quad Sharing", price: trip.price },
                    ]
                ).map((pkg: any) => {
                  const isSelected = selectedPackage === pkg.title;
                  return (
                    <button
                      key={pkg.title}
                      type="button"
                      onClick={() => handlePackageSelect(pkg.title, pkg.price)}
                      className={`px-6 py-3 rounded-2xl border-2 border-[#14140f] font-bold text-sm text-[#14140f] cursor-pointer transition-all leading-snug text-center ${
                        isSelected
                          ? "bg-[#d6ff3f] shadow-[0_4px_14px_rgba(214,255,63,0.4)] -translate-y-0.5"
                          : "bg-white hover:bg-[#fafaf7] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)]"
                      }`}
                    >
                      <div>{pkg.title}</div>
                      <div className="text-base font-extrabold mt-0.5">{formatPrice(pkg.price)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 9. What to Pack Section */}
            <PackingListSection categories={packingCategories} tripId={trip.id} />

            {/* 10. Departure Dates Section */}
            <DepartureDatesSection
              departureDates={trip.departure_dates}
              defaultPrice={selectedPrice}
              onSelectBatchAndBook={handleSelectBatchAndBook}
            />

            {/* 11. Attractions Carousel */}
            <AttractionsCarousel attractions={attractions} />

            {/* 12. FAQs Accordion */}
            <FaqsAccordion faqs={trip.faqs} />

            {/* 13. Customer Reviews Section */}
            <TripReviewsSection reviews={reviews} tripTitle={trip.title} />
          </div>

          {/* Sticky Right Booking Sidebar (1 Column) */}
          <div className="sticky top-[135px] sm:top-[140px] flex flex-col gap-5 transition-all">
            <aside className="bg-white rounded-3xl p-6 border-[1.5px] border-[#e8e8e2] shadow-[0_12px_32px_rgba(214,255,63,0.35)] flex flex-col gap-4">
              <div className="text-left">
                <span className="text-[13px] text-[#77776f] font-semibold block">
                  Starting From
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-[34px] font-extrabold text-[#14140f] font-heading leading-tight">
                    {formatPrice(selectedPrice)}
                  </span>
                  <span className="text-[13px] text-[#77776f] font-medium">per person</span>
                </div>
                <span className="text-[13px] text-[#77776f] font-semibold block mt-0.5">
                  + 5% GST
                </span>
              </div>

              {/* BOOK NOW Button */}
              <button
                type="button"
                onClick={() => setIsBookModalOpen(true)}
                className="w-full bg-[#d6ff3f] hover:bg-[#c7f22e] text-[#14140f] font-extrabold text-base py-3.5 px-4 rounded-xl border-2 border-[#14140f] shadow-[0_6px_18px_rgba(214,255,63,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer font-heading text-center"
              >
                BOOK NOW
              </button>

              {/* Private Trip Option */}
              <div className="bg-[#f8f8f5] border-[1.5px] border-[#e8e8e2] rounded-2xl p-4 text-left">
                <h4 className="text-sm font-bold text-[#14140f] mb-1">
                  Private Trip Available
                </h4>
                <p className="text-[12.5px] text-[#66665c] leading-relaxed mb-3">
                  Customized itinerary for groups of 4+ travelers.
                </p>
                <Link
                  href="/plan-your-trip"
                  className="inline-block bg-[#d6ff3f] hover:bg-[#c7f22e] text-[#14140f] text-[13px] font-bold py-2 px-4 rounded-lg border-[1.5px] border-[#14140f] transition-all cursor-pointer text-center"
                >
                  Chat with our Trip Planner
                </Link>
              </div>

              {/* WhatsApp Us Button */}
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border-[1.5px] border-[#14140f] bg-white text-[15px] font-bold text-[#14140f] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(214,255,63,0.3)] hover:-translate-y-0.5 transition-all"
              >
                <MessageSquare className="w-5 h-5 text-[#25d366]" />
                <span>WhatsApp Us</span>
              </a>
            </aside>
          </div>
        </div>

        {/* 14. More Trips in Destination */}
        {relatedTrips.length > 0 && (
          <div id="more-trips" className="mt-16 pt-12 border-t border-[#e2e2dc]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] font-heading">
                More trips in {destinationLabel}
              </h2>
              <Link
                href="/community-trips"
                className="text-xs sm:text-sm font-bold text-[#14140f] hover:underline flex items-center gap-1"
              >
                See all {destinationLabel} trips <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTrips.map((rel) => (
                <TripCard key={rel.id} trip={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* 15. Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e2dc] p-3 px-4 flex items-center justify-between shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[10px] text-[#6b6b63] font-semibold block uppercase">
            Starting From
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-[#14140f] font-heading">
              {formatPrice(selectedPrice)}
            </span>
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

      {/* 16. PLAN YOUR NEXT TRIP MODAL (Exact awarabanjara.in 2-Column Structure) */}
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
                🗓️ {selectedBatchDate}
              </div>
              <div id="bookingSelectedPackage" style={{ fontSize: "12px", fontWeight: 700, marginTop: "2px", opacity: 0.9 }}>
                📦 {selectedPackage}
              </div>
              <div id="bookingSelectedPrice" style={{ fontSize: "17px", fontWeight: 800, color: "#d6ff3f", marginTop: "3px" }}>
                {formatPrice(selectedPrice)}
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
                  trip_price: selectedPrice,
                  selected_package: selectedPackage,
                  customer_name: bookingForm.name,
                  phone: bookingForm.phone,
                  email: bookingForm.email,
                  departure_date: selectedBatchDate,
                  travelers: bookingForm.travelers,
                  requests: bookingForm.message,
                  status: "Pending Lead",
                  created_at: new Date().toISOString(),
                };
                try {
                  const existing = JSON.parse(localStorage.getItem("trip_inquiries") || "[]");
                  existing.push(inquiry);
                  localStorage.setItem("trip_inquiries", JSON.stringify(existing));
                } catch (err) {
                  console.error(err);
                }
                setTimeout(() => {
                  setIsSubmitting(false);
                  setIsBookModalOpen(false);
                  setIsSuccessOpen(true);
                  setBookingForm({
                    name: "",
                    phone: "",
                    email: "",
                    departureDate: selectedBatchDate,
                    travelers: 1,
                    message: "",
                  });
                }, 400);
              }}
            >
              <div className="form-group-popup">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                />
              </div>

              <div className="form-group-popup">
                <input
                  type="tel"
                  required
                  placeholder="+91 Mobile No."
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group-popup">
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                />
              </div>

              <div className="form-row-popup">
                <div className="form-group-popup" style={{ flex: 2 }}>
                  <input
                    type="text"
                    readOnly
                    value={selectedBatchDate}
                    className="bg-[#fafaf7] cursor-not-allowed"
                  />
                </div>
                <div className="form-group-popup" style={{ flex: 1 }}>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    placeholder="Travelers"
                    value={bookingForm.travelers}
                    onChange={(e) => setBookingForm({ ...bookingForm, travelers: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="form-group-popup">
                <textarea
                  rows={2}
                  placeholder="Message (optional)"
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-popup-submit"
                id="submitBookingBtn"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Connect with Expert"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL */}
      {isSuccessOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsSuccessOpen(false)}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-[#e2e2dc]">
            <div className="w-14 h-14 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center mx-auto mb-4 border border-[#14140f] shadow-lime-btn">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h3 className="font-extrabold text-xl text-[#14140f] font-heading mb-2">
              Inquiry Received!
            </h3>
            <p className="text-xs sm:text-sm text-[#6b6b63] mb-6">
              Thank you! Our Himalayan destination lead will call or WhatsApp you within 15 minutes to confirm details.
            </p>
            <button
              type="button"
              onClick={() => setIsSuccessOpen(false)}
              className="w-full bg-[#14140f] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#2c2c24] transition-all cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={trip.title}
      />

      {/* PDF Download Lead Modal */}
      <PdfLeadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        title={trip.title}
      />
    </div>
  );
}
