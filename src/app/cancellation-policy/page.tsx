import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { RefreshCw } from "lucide-react";

export default function CancellationPolicyPage() {
  return (
    <div className="w-full bg-[#fbfbf8] text-[#14140f] min-h-screen relative">
      {/* Single Full-Page Fixed Background - Soft and luminous */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/backgrounds/cancellation-policy-mobile.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/backgrounds/cancellation-policy-desktop.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[right_top] opacity-90 contrast-[1.02]"
          />
        </picture>
      </div>

      <section className="relative z-10 pt-12 pb-6 sm:pt-16 sm:pb-8">
        <Container size="narrow">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4 border border-[#14140f]/10 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Transparent Terms</span>
            </span>
            <Heading level={1} className="text-[#14140f] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-heading tracking-tight">
              Cancellation &amp; Refund Policy
            </Heading>
            <Paragraph className="text-[#6b6b63] text-sm sm:text-base md:text-lg leading-relaxed">
              We know mountain plans can change. Here is our straightforward, transparent cancellation policy.
            </Paragraph>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="relative z-10 pb-16 sm:pb-24">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-[#e2e2dc] shadow-card flex flex-col gap-6 sm:gap-8 text-[#14140f]">
          <div>
            <h3 className="text-lg font-bold mb-2">1. The 10% Booking Token Policy</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              The 10% advance deposit confirms your seat and secures non-refundable homestay and vehicle reservations. In the event of voluntary traveler cancellation, this token may be transferred to a future batch within 6 months, subject to 15 days prior written notice.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">2. Cancellation Refund Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              <div className="bg-[#f6f6f1] p-4 rounded-xl border border-[#e2e2dc]">
                <strong className="text-sm font-bold text-[#2fa84f] block mb-1">30+ Days Prior</strong>
                <p className="text-xs text-[#6b6b63]">90% refund of total trip package amount (minus token processing fee).</p>
              </div>
              <div className="bg-[#f6f6f1] p-4 rounded-xl border border-[#e2e2dc]">
                <strong className="text-sm font-bold text-[#e0455a] block mb-1">15 to 29 Days Prior</strong>
                <p className="text-xs text-[#6b6b63]">50% refund of total package amount after advance deduction.</p>
              </div>
              <div className="bg-[#f6f6f1] p-4 rounded-xl border border-[#e2e2dc]">
                <strong className="text-sm font-bold text-[#e0455a] block mb-1">&lt; 15 Days Prior</strong>
                <p className="text-xs text-[#6b6b63]">No refund due to vehicle contracts and locked homestay blocks.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">3. Replacement &amp; Slot Transfer Policy</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              If you cannot join due to an emergency, you may transfer your booking to a friend or family member at zero penalty fee, provided permit documentation is shared at least 5 days prior.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">4. Cancellations by Trail Explorers</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              If Trail Explorers must cancel a batch due to extreme alpine weather warnings, military restrictions, or failure to meet minimum safety thresholds, travellers receive a 100% full refund or credit voucher for any departure within 12 months.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
