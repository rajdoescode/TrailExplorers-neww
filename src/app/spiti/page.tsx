import React from "react";
import type { Metadata } from "next";
import { RegionPageTemplate } from "@/components/destinations/RegionPageTemplate";

export const metadata: Metadata = {
  title: "Spiti Valley Tour Packages — The Middle Land | Awara Banjara",
  description:
    "Curated Spiti Valley road trips, winter 4x4 expeditions, and community group tours from Delhi. Experience high-altitude monasteries, homestays, and Chandratal.",
};

export default function SpitiPage() {
  return (
    <RegionPageTemplate
      regionId="spiti"
      regionName="Spiti"
      title="Spiti Valley Tour Packages"
      tagline="The Middle Land"
      iconSrc="/assets/images/destinations/icons/spiti.png"
      startingPrice="₹12,499"
      tripCount="7 trips"
      lead="A cold desert between Tibet and India: cliff-top monasteries, fossil villages and a sky full of stars."
      pills={[
        "🗓️ Jun – Oct, winter trips too",
        "🚙 Via Shimla or Manali",
        "⛰️ 3,000 – 4,600 m",
      ]}
      story="Spiti means &quot;the middle land&quot;, and it feels like one. The road winds through Kinnaur into a valley of mud-walled villages, ancient gompas like Key and Tabo, and some of the highest inhabited villages in the world."
      facts={[
        {
          label: "Best time",
          value:
            "June – October for the full circuit and Chandratal. December – March for the snowbound winter expedition.",
        },
        {
          label: "Getting there",
          value:
            "By road from Delhi via Shimla and Kinnaur, or via Manali and Kunzum La in summer.",
        },
        {
          label: "Altitude",
          value:
            "Kaza is around 3,800 m and Kunzum La 4,590 m. We go up slowly through Kinnaur to acclimatise.",
        },
        {
          label: "Perfect for",
          value: "Road trips, stargazing, monasteries and winter adventures.",
        },
      ]}
      showWinterStrip={true}
      filterCategories={["spiti", "winter spiti"]}
    />
  );
}
