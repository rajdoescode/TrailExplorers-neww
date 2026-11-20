"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useSwipeDownToClose } from "@/hooks/useSwipeDownToClose";
import { CustomCalendarPicker } from "@/components/ui/CustomCalendarPicker";

interface TripModalDetail {
  title?: string;
  image?: string;
}

declare global {
  interface Window {
    openTripModal?: (title?: string, imgSrc?: string) => void;
  }
}

export const TripModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [title, setTitle] = useState("Escape the ordinary.");
  const [imageSrc, setImageSrc] = useState("/assets/images/home/escape-ordinary.webp");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    destination: "",
    date: "",
    phone: "",
    email: "",
  });

  // Global reference-counted scroll lock for booking modal & success modal
  useScrollLock(isOpen || isSuccessOpen);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setIsSuccessOpen(false);
  }, []);

  const openModal = useCallback((newTitle?: string, newImgSrc?: string) => {
    setTitle(newTitle || "Let's Plan Your Next Journey.");
    setImageSrc(newImgSrc || "/assets/images/home/escape-ordinary.webp");
    setIsOpen(true);
    try {
      localStorage.setItem("trailexplorers_auto_book_shown", "1");
    } catch {
      // ignore
    }
  }, []);

  // Swipe-down-to-close hooks for mobile bottom sheets (Android/iOS native feel)
  const tripModalOverlayRef = useRef<HTMLDivElement>(null);
  const { sheetRef: tripModalSheetRef, dragHandleRef: tripModalHandleRef } = useSwipeDownToClose({
    isOpen,
    onClose: closeModal,
    overlayRef: tripModalOverlayRef,
  });

  const successOverlayRef = useRef<HTMLDivElement>(null);
  const { sheetRef: successSheetRef, dragHandleRef: successHandleRef } = useSwipeDownToClose({
    isOpen: isSuccessOpen,
    onClose: closeSuccessModal,
    overlayRef: successOverlayRef,
  });

  // Expose openTripModal globally and listen for custom events
  useEffect(() => {
    window.openTripModal = (modalTitle?: string, imgSrc?: string) => {
      openModal(modalTitle, imgSrc);
    };

    const handleCustomOpen = (e: CustomEvent<TripModalDetail>) => {
      openModal(e.detail?.title, e.detail?.image);
    };

    window.addEventListener("open-trip-modal" as any, handleCustomOpen);

    // Global click listener for .btn-connect-expert or [data-open-trip-modal]
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Connect with expert buttons anywhere on page
      const expertBtn = target.closest(".btn-connect-expert, [data-open-trip-modal]");
      if (
        expertBtn &&
        expertBtn.id !== "tripModalSubmitBtn" &&
        !expertBtn.closest("#tripModalForm") &&
        !expertBtn.closest("#bookingForm")
      ) {
        e.preventDefault();
        const customTitle = expertBtn.getAttribute("data-modal-title") || "Plan Your Custom Trip";
        const customImg = expertBtn.getAttribute("data-modal-image") || "/assets/images/home/escape-ordinary.webp";
        openModal(customTitle, customImg);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        closeSuccessModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-trip-modal" as any, handleCustomOpen);
      document.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal, closeModal, closeSuccessModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let cleanPhone = formData.phone.trim();
    if (cleanPhone && !cleanPhone.startsWith("+")) {
      cleanPhone = "+91-" + cleanPhone.replace(/[^0-9]/g, "");
    }

    const payload = {
      id: "INQ_" + Date.now(),
      type: "journey_popup",
      trip_title: title,
      customer_name: formData.name.trim(),
      customer_city: formData.city.trim() || "N/A",
      destination: formData.destination,
      phone: cleanPhone,
      email: formData.email.trim() || "N/A",
      created_at: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("trailexplorers_inquiries") || "[]");
      existing.push(payload);
      localStorage.setItem("trailexplorers_inquiries", JSON.stringify(existing));
    } catch {
      // ignore
    }

    // Simulate short network delay for authentic response feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    closeModal();
    setFormData({
      name: "",
      city: "",
      destination: "",
      date: "",
      phone: "",
      email: "",
    });
    setIsSuccessOpen(true);
  };

  return (
    <>
      {/* ============ TRIP PLANNING MODAL POPUP ============ */}
      <div
        id="tripModal"
        ref={tripModalOverlayRef}
        className={`fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-5 bg-[#0f121a]/[0.72] backdrop-blur-[8px] transition-all duration-300 touch-none overscroll-contain ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div
          ref={tripModalSheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalDestTitle"
          className={`relative bg-white rounded-t-[28px] sm:rounded-[24px] rounded-b-none sm:rounded-b-[24px] max-w-[840px] w-full shadow-[0_24px_60px_rgba(0,0,0,0.38)] overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] overscroll-contain ${
            isOpen ? "scale-100 translate-y-0" : "scale-[0.95] translate-y-8 sm:translate-y-5"
          }`}
        >
          {/* Mobile drag handle with native pull-to-close */}
          <div
            ref={tripModalHandleRef}
            className="w-12 h-1.5 bg-[#d5d5cd] hover:bg-[#b0b0a8] rounded-full mx-auto my-2.5 block sm:hidden cursor-grab active:cursor-grabbing touch-none select-none transition-colors"
            title="Drag down to close"
            aria-label="Drag down to close"
          />

          {/* Close button */}
          <button
            type="button"
            id="closeTripModal"
            aria-label="Close modal"
            onClick={closeModal}
            className="absolute top-3.5 right-4 w-11 h-11 min-w-[44px] min-h-[44px] bg-transparent border-0 text-[28px] leading-none text-[#14140f] cursor-pointer z-20 flex items-center justify-center rounded-full hover:bg-black/8 hover:scale-110 active:scale-95 transition-all duration-200"
          >
            &times;
          </button>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] p-3.5 sm:p-4 gap-3 sm:gap-5 max-h-[85dvh] overflow-y-auto md:max-h-none md:overflow-visible pb-[calc(18px+env(safe-area-inset-bottom,0px))] md:pb-4">
            {/* Left Side: Visual Destination Card */}
            <div className="relative rounded-[18px] overflow-hidden min-h-[170px] sm:min-h-[190px] md:min-h-[440px] bg-[#14140f]">
              <SkeletonImage
                key={imageSrc}
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                fallbackSrc="/assets/images/home/escape-ordinary.webp"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {/* Scrim gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/75 pointer-events-none z-[1]" />

              {/* Destination Heading */}
              <h2
                id="modalDestTitle"
                className="absolute top-4 md:top-7 left-1/2 -translate-x-1/2 z-[3] text-white font-heading font-extrabold text-[18px] md:text-[clamp(24px,3.5vw,32px)] leading-[1.25] md:leading-[1.15] tracking-[-0.02em] text-center w-[90%] m-0 drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]"
              >
                {title}
              </h2>

              {/* Subtitle */}
              <div className="absolute bottom-10 md:bottom-6 left-3.5 md:left-6 z-[3] text-white text-[12px] md:text-[15px] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Don&apos;t just dream travel! 🔥
              </div>

              {/* Mobile Tagline */}
              <p className="block md:hidden absolute bottom-3 left-3.5 z-[3] w-[85%] text-white text-[11.5px] font-medium leading-[1.3] text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] m-0">
                Tell us where you&apos;d like to go. We will take care of the rest!
              </p>
            </div>

            {/* Right Side: Trip Planning Form */}
            <div className="p-1 sm:p-4 md:py-4 md:pr-4 md:pl-2 flex flex-col justify-center">
              <form id="tripModalForm" onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-3.5">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="tripModalName"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full border-[1.5px] border-[#e2e2dc] rounded-[10px] px-3.5 py-3 text-[14px] text-[#14140f] bg-white outline-none placeholder:text-[#a0a098] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/40 transition-all duration-200 min-h-[44px]"
                  />
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    id="tripModalCity"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Your City"
                    className="w-full border-[1.5px] border-[#e2e2dc] rounded-[10px] px-3.5 py-3 text-[14px] text-[#14140f] bg-white outline-none placeholder:text-[#a0a098] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/40 transition-all duration-200 min-h-[44px]"
                  />
                </div>

                <div className="relative w-full">
                  <select
                    id="tripModalDestination"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full border-[1.5px] border-[#e2e2dc] rounded-[10px] px-3.5 py-3 text-[14px] text-[#14140f] bg-white outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_viewBox=%270_0_24_24%27_fill=%27none%27_stroke=%27%23666660%27_stroke-width=%272.4%27_stroke-linecap=%27round%27_stroke-linejoin=%27round%27%3E%3Cpath_d=%27M6_9l6_6_6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:16px] pr-9 focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/40 transition-all duration-200 min-h-[44px]"
                  >
                    <option value="" disabled>Preferred Destination</option>
                    <option value="spiti_tours">Spiti</option>
                    <option value="himachal_tours">Himachal</option>
                    <option value="kashmir_tours">Kashmir</option>
                    <option value="ladakh_tours">Ladakh</option>
                    <option value="heart_of_india_tours">Heart of India</option>
                    <option value="northeast_india_tours">North-East India</option>
                    <option value="south_india_tours">South India</option>
                    <option value="goa_tours">Goa</option>
                    <option value="rajasthan_tours">Rajasthan</option>
                    <option value="uttarakhand_tours">Uttarakhand</option>
                    <option value="international_tours">International</option>
                    <option value="women_only_tours">Women Only</option>
                    <option value="treks">Treks</option>
                    <option value="bike_tours">Bike</option>
                    <option value="festival_tours">Festival</option>
                    <option value="corporate_tours">Corporate</option>
                    <option value="educational_trips">Educational</option>
                  </select>
                </div>

                <div className="relative w-full">
                  <CustomCalendarPicker
                    value={formData.date}
                    onChange={(newDate) => setFormData({ ...formData, date: newDate })}
                    placeholder="Expected Travel Date (optional)"
                    format="ordinal"
                    inputClassName="border-[1.5px] border-[#e2e2dc] rounded-[10px] px-3.5 py-3 text-[14px] min-h-[44px]"
                  />
                </div>

                <label className="block text-[12px] sm:text-[13px] font-semibold text-[#14140f] m-0">
                  Allow us to call you back!
                </label>

                <div className="relative w-full flex items-center">
                  <span className="px-3 py-3 text-[14px] font-bold text-[#14140f] border-[1.5px] border-[#e2e2dc] border-r-0 rounded-l-[10px] bg-[#f8f8f5] flex items-center justify-center shrink-0 min-h-[44px]">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="tripModalPhone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile No."
                    className="w-full border-[1.5px] border-[#e2e2dc] rounded-r-[10px] rounded-l-0 px-3.5 py-3 text-[14px] text-[#14140f] bg-white outline-none placeholder:text-[#a0a098] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/40 transition-all duration-200 min-h-[44px]"
                  />
                </div>

                <div className="relative w-full">
                  <input
                    type="email"
                    id="tripModalEmail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email (optional)"
                    className="w-full border-[1.5px] border-[#e2e2dc] rounded-[10px] px-3.5 py-3 text-[14px] text-[#14140f] bg-white outline-none placeholder:text-[#a0a098] focus:border-[#14140f] focus:ring-2 focus:ring-[#d6ff3f]/40 transition-all duration-200 min-h-[44px]"
                  />
                </div>

                <button
                  type="submit"
                  id="tripModalSubmitBtn"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] bg-[#d6ff3f] text-[#14140f] font-extrabold text-[15px] sm:text-[16px] py-3.5 sm:py-[15px] rounded-[12px] border-none cursor-pointer mt-1 sm:mt-1.5 shadow-[0_6px_20px_rgba(214,255,63,0.45)] hover:bg-[#c7f22e] hover:text-black hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending…" : "Connect with Expert"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ============ INQUIRY SUCCESS CONFIRMATION MODAL ============ */}
      <div
        id="inquirySuccessModal"
        ref={successOverlayRef}
        role="dialog"
        aria-hidden={!isSuccessOpen}
        className={`fixed inset-0 z-[999999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0f121a]/[0.68] backdrop-blur-[6px] transition-all duration-250 touch-none overscroll-contain ${
          isSuccessOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeSuccessModal();
        }}
      >
        <div
          ref={successSheetRef}
          className={`relative bg-white rounded-t-[28px] sm:rounded-[28px] max-w-[480px] w-full sm:w-[92%] p-6 sm:p-9 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pb-[calc(24px+env(safe-area-inset-bottom,0px))] sm:pb-9 ${
            isSuccessOpen ? "scale-100 translate-y-0" : "scale-[0.92] translate-y-4"
          }`}
        >
          {/* Mobile drag handle */}
          <div
            ref={successHandleRef}
            className="w-12 h-1.5 bg-[#d5d5cd] hover:bg-[#b0b0a8] rounded-full mx-auto mb-4 block sm:hidden cursor-grab active:cursor-grabbing touch-none select-none transition-colors"
            title="Drag down to close"
            aria-label="Drag down to close"
          />
          <div className="text-[48px] sm:text-[54px] mb-3 select-none">🎉</div>
          <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#0f172a] mb-2 sm:mb-3 tracking-[-0.3px]">
            Thank You for Contacting!
          </h3>
          <p
            id="successModalText"
            className="text-[13.5px] sm:text-[15px] text-[#475569] leading-relaxed mb-6 font-medium"
          >
            Thank you for contacting, you will get a call back soon from our expert with your itinerary.
          </p>
          <button
            type="button"
            id="closeSuccessModalBtn"
            onClick={closeSuccessModal}
            className="w-full sm:w-auto px-7 py-3.5 min-h-[46px] font-extrabold cursor-pointer rounded-[12px] border-none bg-[#b8ff00] text-[#14140f] hover:bg-[#a5e600] active:scale-95 transition-all duration-200"
          >
            OK, GOT IT
          </button>
        </div>
      </div>
    </>
  );
};
