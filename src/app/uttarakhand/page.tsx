import React from "react";
import type { Metadata } from "next";
import { RegionPageTemplate } from "@/components/destinations/RegionPageTemplate";

export const metadata: Metadata = {
  title: "Uttarakhand Tour Packages — Dev Bhoomi | Awara Banjara",
  description:
    "Uttarakhand tours, Kedarkantha & Chopta Chandrashila treks, Rishikesh adventures, and valley retreats with Awara Banjara.",
};

export default function UttarakhandPage() {
  return (
    <RegionPageTemplate
      regionId="uttarakhand"
      regionName="Uttarakhand"
      title="Uttarakhand Tour Packages"
      tagline="Dev Bhoomi"
      iconSrc="/assets/images/destinations/icons/uttarakhand.png"
      startingPrice="₹21,900"
      tripCount="1 trip"
      lead="The Ganga's home: river towns, temple trails and some of the easiest big-mountain treks in India."
      pills={[
        "🗓️ Mar – Jun, Sep – Dec",
        "🚌 6–10 hrs from Delhi",
        "⛰️ 400 – 4,000 m",
      ]}
      story="Start with rafting and cafés in Rishikesh, then head up into the Garhwal hills for Auli's slopes, the meadows of Chopta and the climb to Tungnath, the highest Shiva temple in the world. Snow trails in winter, rhododendron forests in spring."
      facts={[
        {
          label: "Best time",
          value:
            "March – June and September – December. Auli and Chopta get snow from late December.",
        },
        {
          label: "Getting there",
          value:
            "Overnight bus or train from Delhi to Haridwar or Rishikesh.",
        },
        {
          label: "Altitude",
          value:
            "Rishikesh is around 400 m, Chopta 2,700 m and Chandrashila 4,000 m.",
        },
        {
          label: "Perfect for",
          value: "First treks, rafting, temple trails and quick escapes from Delhi.",
        },
      ]}
      filterCategories={["uttarakhand", "kedarkantha", "chopta", "rishikesh", "auli"]}
    />
  );
}
