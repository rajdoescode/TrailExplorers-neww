import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ShieldCheck, HeartHandshake, Leaf, ReceiptText, Headphones } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "SAFETY FIRST, ALWAYS",
    description:
      "Certified mountain captains, emergency oxygen cylinders on high altitude passes, and comprehensive medical kits on all trips.",
  },
  {
    icon: HeartHandshake,
    title: "DEEP CULTURAL ROOTS & LOCAL SUPPORT",
    description:
      "We partner directly with native Himalayan village hosts and local drivers, ensuring your travel spend directly benefits native valley families.",
  },
  {
    icon: Leaf,
    title: "LEAVING NO TRACE BEHIND (ECO TRAVEL)",
    description:
      "Zero single-use plastic policy on trails. We practice strict eco-habits and educate our travellers to preserve fragile Himalayan ecology.",
  },
  {
    icon: ReceiptText,
    title: "100% FINANCIAL TRANSPARENCY",
    description:
      "No surprise charges or hidden add-ons. Clear token confirmations, guaranteed vehicle standards, and transparent refund schedules.",
  },
  {
    icon: Headphones,
    title: "24×7 SUPPORT ON EVERY TRIP",
    description:
      "Live operational desk in Manali and Delhi tracking weather, roadblocks, and permits with round-the-clock emergency assistance.",
  },
];

export const CorePillarsSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-[#f6f6f1]">
      <Container>
        <SectionHeading
          eyebrow="OUR COMMITMENT"
          title="Core Pillars"
          subtitle="The non-negotiable principles guiding every single departure across the mountains."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-[18px] p-7 border border-[#e2e2dc] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#14140f] text-[#d6ff3f] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#14140f] font-heading mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6b6b63] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
