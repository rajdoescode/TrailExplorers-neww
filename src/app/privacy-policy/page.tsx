import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#fbfbf8] text-[#14140f] min-h-screen relative">
      {/* Single Full-Page Fixed Background - Soft and luminous */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/backgrounds/privacy-policy-mobile.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/backgrounds/privacy-policy-desktop.webp"
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
              <Lock className="w-3.5 h-3.5" />
              <span>Data Protection</span>
            </span>
            <Heading level={1} className="text-[#14140f] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-heading tracking-tight">
              Privacy Policy
            </Heading>
            <Paragraph className="text-[#6b6b63] text-sm sm:text-base md:text-lg leading-relaxed">
              How Trail Explorers collects, safeguards, and uses your personal details.
            </Paragraph>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="relative z-10 pb-16 sm:pb-24">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-[#e2e2dc] shadow-card flex flex-col gap-6 sm:gap-8 text-[#14140f]">
          <div>
            <h3 className="text-lg font-bold mb-2">1. Information We Collect</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              To operate remote mountain expeditions and secure protected area permits (ILP), we collect your legal name, contact telephone, email address, government photo identification (Aadhaar/Passport/Voter ID), emergency kin contact, and voluntary health disclosures.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">2. How We Use Your Information</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              Your data is utilized solely for: securing environmental checkpost permits from district magistrates; reserving verified homestays; booking transport; and maintaining emergency contact protocols during extreme weather. We never sell or license your contact records to commercial marketers.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">3. Media, Photography, and Marketing Data</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              During open community expeditions, our trip captains and videographers periodically capture ambient group photography and video reels for social community storytelling. If any wanderer prefers not to appear in public reels, notifying your trip leader at departure will ensure complete exclusion.
            </p>
          </div>

          <div className="border-t border-[#f0f0eb] pt-6">
            <h3 className="text-lg font-bold mb-2">4. Data Protection &amp; Retention</h3>
            <p className="text-sm text-[#6b6b63] leading-relaxed">
              Government identification shared for border permits is encrypted and retained only as required under Indian tourism statutory obligations, after which digital identity copies are securely purged.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
