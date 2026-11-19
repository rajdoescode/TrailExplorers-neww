import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { FileText, Shield } from "lucide-react";

export default function BookingTermsPage() {
  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container size="narrow">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Agreement</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Booking Terms &amp; Conditions
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              Please review these guidelines before confirming your reservation with Trail Explorers.
            </Paragraph>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="py-14">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2e2dc] shadow-card flex flex-col gap-8 text-[#14140f]">
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
