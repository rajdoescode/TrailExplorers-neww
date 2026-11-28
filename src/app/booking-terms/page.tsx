import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { FileText, Shield } from "lucide-react";

export default function BookingTermsPage() {
  return (
    <div className="w-full bg-[#fbfbf8] text-[#14140f] min-h-screen relative">
      {/* Single Full-Page Fixed Background - Soft and luminous */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/backgrounds/booking-terms-mobile.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/backgrounds/booking-terms-desktop.webp"
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
              <FileText className="w-3.5 h-3.5" />
              <span>Official Agreement</span>
            </span>
            <Heading level={1} className="text-[#14140f] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-heading tracking-tight">
              Booking Terms &amp; Conditions
            </Heading>
            <Paragraph className="text-[#6b6b63] text-sm sm:text-base md:text-lg leading-relaxed">
              Please review these guidelines before confirming your reservation with Trail Explorers.
            </Paragraph>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="relative z-10 pb-16 sm:pb-24">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-[#e2e2dc] shadow-card flex flex-col gap-6 sm:gap-8 text-[#14140f]">
          <div>
            <h3 className="text-lg font-bold mb-2">1. Age Limit and Eligibility</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              All travellers joining our open community expeditions must be at least 18 years of age at the time of departure. Minors (aged 12–17) are permitted exclusively on private custom tours when accompanied by a legal parent or guardian.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">2. Booking, Payments, and Token Policy</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              A slot is deemed confirmed solely upon receipt of a minimum 10% non-refundable booking token or full package payment. The outstanding balance must be cleared at least 7 days prior to departure date. Failure to remit balance permits Trail Explorers to reassign the slot.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">3. Mountain Adventure, Risks, and Liability</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              High-altitude mountain expeditions (Spiti, Ladakh, Zanskar) are inherently subject to unpredictable alpine weather, cloudbursts, avalanches, military checkpoints, and road blockages. Trail Explorers acts as a facilitator and captain service and is not liable for incidental hotel stays, rerouting costs, or travel delays triggered by Force Majeure.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">4. Medical Fitness &amp; Pre-existing Conditions</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              Travellers are obligated to declare any pre-existing cardiovascular, respiratory, or severe allergic conditions prior to booking. High altitude sickness (AMS) is possible above 9,000 ft; participants must follow captain instructions regarding hydration and acclimatization.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">5. Luggage &amp; Personal Belongings Disclaimer</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              Due to vehicle boot space constraints in Himalayan 4x4s, travellers must limit luggage to 1 backpack/duffle bag (max 15kg) plus 1 small daypack. Trail Explorers is not liable for loss or damage to personal cameras, laptops, or jewelry during travel.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
