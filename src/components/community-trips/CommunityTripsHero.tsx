import React from "react";

export interface CommunityTripsHeroProps {
  title?: string;
  subtitle?: string;
}

export const CommunityTripsHero: React.FC<CommunityTripsHeroProps> = ({
  title = "Community Trips",
  subtitle = "Immersive Travel, More human connection.",
}) => {
  return (
    <div className="packages-hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};
