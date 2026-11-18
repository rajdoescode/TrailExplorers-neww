import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export const EscapeOrdinaryBanner: React.FC = () => {
  return (
    <section className="w-full py-12 bg-[#ffffff]">
      <Container>
        <div className="rounded-[24px] bg-[#f6f6f1] border-2 border-[#14140f] p-8 sm:p-14 text-center flex flex-col items-center justify-center gap-5 shadow-card">
          <span className="text-xs font-bold uppercase tracking-widest text-[#14140f] bg-[#d6ff3f] px-3.5 py-1 rounded-full border border-[#14140f]">
            Wanderlust Calling
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#14140f] font-heading">
            Escape the ordinary.
          </h2>
          <p className="text-sm sm:text-base text-[#6b6b63] max-w-xl mx-auto leading-relaxed">
            Leave behind crowded tour buses and cookie-cutter tourist traps. Join real travellers who explore with curiosity, respect, and camaraderie.
          </p>
          <div className="pt-2">
            <Button href="/community-trips" variant="primary" size="lg" className="shadow-lime-btn px-8 font-bold">
              Join Our Next Journey
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
