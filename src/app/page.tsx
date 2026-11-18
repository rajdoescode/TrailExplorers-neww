import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { RegionIcons } from "@/components/home/RegionIcons";
import { WinterStripHome } from "@/components/home/WinterStripHome";
import { CommunityTripsSection } from "@/components/home/CommunityTripsSection";
import { PlanYourTripBanner } from "@/components/home/PlanYourTripBanner";
import { HighEndWanderingSection } from "@/components/home/HighEndWanderingSection";
import { ExperiencesSection } from "@/components/home/ExperiencesSection";
import { EscapeOrdinaryBanner } from "@/components/home/EscapeOrdinaryBanner";
import { CorePillarsSection } from "@/components/home/CorePillarsSection";
import { DomesticDestinationsSection } from "@/components/home/DomesticDestinationsSection";
import { InternationalDestinationsSection } from "@/components/home/InternationalDestinationsSection";
import { WatchReadSection } from "@/components/home/WatchReadSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
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
      <HighEndWanderingSection />

      {/* 8. Immersive Experiences */}
      <ExperiencesSection />

      {/* 9. Escape the Ordinary Banner */}
      <EscapeOrdinaryBanner />

      {/* 10. Core Pillars (Safety, Local Support, Eco, Transparency, 24x7) */}
      <CorePillarsSection />

      {/* 11. Domestic Destinations Grid */}
      <DomesticDestinationsSection />

      {/* 12. International Destinations Grid */}
      <InternationalDestinationsSection />

      {/* 13. Watch & Read / Postcards & Video Reels */}
      <WatchReadSection />

      {/* 14. Customer Testimonials & Reviews */}
      <ReviewsSection />
    </div>
  );
}
