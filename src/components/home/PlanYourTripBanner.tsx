import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Compass, Sparkles } from "lucide-react";

export const PlanYourTripBanner: React.FC = () => {
  return (
    <section className="w-full py-8" id="plan-your-trip-banner">
      <Container>
        <div className="relative rounded-[24px] bg-[#14140f] text-white p-8 sm:p-12 md:p-16 overflow-hidden border-2 border-[#14140f] shadow-2xl">
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d6ff3f]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#25d366]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#d6ff3f] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored For You</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading leading-tight">
              Plan your own <span className="text-[#d6ff3f]">Himalayan trip.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Customised private itineraries for couples, families, and solo explorers. Choose your own dates, pace, vehicle, and stay preferences with our valley experts.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                href="/plan-your-trip"
                variant="primary"
                size="lg"
                leftIcon={<Compass className="w-4 h-4" />}
                className="font-extrabold px-8 py-3.5 shadow-lime-btn"
              >
                Plan Your Trip
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
