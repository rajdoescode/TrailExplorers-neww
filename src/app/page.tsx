import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { RegionIcons } from "@/components/home/RegionIcons";
import { WinterStripHome } from "@/components/home/WinterStripHome";
import { CommunityTripsSection } from "@/components/home/CommunityTripsSection";
import { PlanYourTripBanner } from "@/components/home/PlanYourTripBanner";

const HighEndWanderingSection = dynamic(() =>
  import("@/components/home/HighEndWanderingSection").then((m) => m.HighEndWanderingSection)
);
const ExperiencesSection = dynamic(() =>
  import("@/components/home/ExperiencesSection").then((m) => m.ExperiencesSection)
);
const EscapeOrdinaryBanner = dynamic(() =>
  import("@/components/home/EscapeOrdinaryBanner").then((m) => m.EscapeOrdinaryBanner)
);
const CorePillarsSection = dynamic(() =>
  import("@/components/home/CorePillarsSection").then((m) => m.CorePillarsSection)
);
const DomesticDestinationsSection = dynamic(() =>
  import("@/components/home/DomesticDestinationsSection").then((m) => m.DomesticDestinationsSection)
);
const InternationalDestinationsSection = dynamic(() =>
  import("@/components/home/InternationalDestinationsSection").then((m) => m.InternationalDestinationsSection)
);
const WatchReadSection = dynamic(() =>
  import("@/components/home/WatchReadSection").then((m) => m.WatchReadSection)
);
const ReviewsSection = dynamic(() =>
  import("@/components/home/ReviewsSection").then((m) => m.ReviewsSection)
);

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#fbfbf8] text-[#14140f] min-h-screen relative">
      {/* Ambient Mountain Background extending behind the content below - Himalayan Suspension Bridge Trek */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/home/home-bridge-mobile.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/hero_pack/Community_Trips/01_DESKTOP_1920x900_WHITE_FADE_WEBP/06_Suspension_Bridge_Hike_desktop.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="low"
            className="w-full h-full object-cover object-[right_top] opacity-75 brightness-[1.06] contrast-[0.95]"
          />
        </picture>
        {/* Soft light overlay so background is subtle, bright and light */}
        <div className="absolute inset-0 bg-white/25 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col w-full">
        {/* 1. Hero Section with Video */}
        <HeroSection />

        {/* 2. Trust Bar (Instagram, Google 4.9★, Travellers) */}
        <TrustBar />

        {/* 3. Regional Destinations Icons */}
        <RegionIcons />

        {/* 4. Winter Spiti Announcement Strip */}
        <WinterStripHome />

        {/* 5. Community Trips Carousel */}
        <CommunityTripsSection />

        {/* 6. Plan Your Trip Custom Banner */}
        <PlanYourTripBanner />

        {/* 7. High-End Wandering on a Lemonade Budget */}
        <div className="below-fold-section">
          <HighEndWanderingSection />
        </div>

        {/* 8. Immersive Experiences */}
        <div className="below-fold-section">
          <ExperiencesSection />
        </div>

        {/* 9. Escape the Ordinary Banner */}
        <div className="below-fold-section">
          <EscapeOrdinaryBanner />
        </div>

        {/* 10. Core Pillars (Safety, Local Support, Eco, Transparency, 24x7) */}
        <div className="below-fold-section">
          <CorePillarsSection />
        </div>

        {/* 11. Domestic Destinations Grid */}
        <div className="below-fold-section">
          <DomesticDestinationsSection />
        </div>

        {/* 12. International Destinations Grid */}
        <div className="below-fold-section">
          <InternationalDestinationsSection />
        </div>

        {/* 13. Watch & Read / Postcards & Video Reels */}
        <div className="below-fold-section">
          <WatchReadSection />
        </div>

        {/* 14. Customer Testimonials & Reviews */}
        <div className="below-fold-section">
          <ReviewsSection />
        </div>
      </div>
    </div>
  );
}
