import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { RefreshCw } from "lucide-react";

export default function CancellationPolicyPage() {
  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container size="narrow">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Transparent Terms</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Cancellation &amp; Refund Policy
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              We know mountain plans can change. Here is our straightforward, transparent cancellation policy.
            </Paragraph>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="py-14">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2e2dc] shadow-card flex flex-col gap-8 text-[#14140f]">
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
