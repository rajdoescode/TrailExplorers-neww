import React from "react";
import type { Metadata } from "next";
import { RegionPageTemplate } from "@/components/destinations/RegionPageTemplate";

export const metadata: Metadata = {
  title: "Ladakh Tour Packages — Land of High Passes | Trail Explorers",
  description:
    "Explore Leh Ladakh road trips, bike expeditions, Pangong Tso, Nubra Valley, and Zanskar with Trail Explorers' travel community.",
};

export default function LadakhPage() {
  return (
    <RegionPageTemplate
      regionId="ladakh"
      regionName="Ladakh"
      title="Ladakh Tour Packages"
      tagline="Land of High Passes"
      iconSrc="/assets/images/destinations/icons/ladakh.png"
      startingPrice="₹8,999"
      tripCount="6 trips"
      lead="Moonscapes, turquoise lakes and monasteries on the edge of the sky. Ladakh is the Himalayan road trip everyone dreams of."
      pills={[
        "🗓️ May – Sep",
        "✈️ Fly to Leh or drive in",
        "⛰️ 3,500 – 5,600 m",
      ]}
      story="Ladakh sits in the rain shadow of the Himalayas: a high desert of prayer flags, whitewashed gompas and roads that climb over some of the highest passes in the world. Nubra's dunes, Pangong's changing blues and the wild Zanskar valley are all within reach."
      facts={[
        {
          label: "Best time",
          value:
            "May – September, when the passes are open. Zanskar's frozen-river season is January – February.",
        },
        {
          label: "Getting there",
          value:
            "Fly into Leh, or drive in from Manali or Srinagar over two days.",
        },
        {
          label: "Altitude",
          value:
            "Leh is around 3,500 m and passes go past 5,300 m. Plan a full day to acclimatise.",
        },
        {
          label: "Perfect for",
          value:
            "Road trips, bike expeditions, monasteries and big landscapes.",
        },
      ]}
      filterCategories={["ladakh", "leh", "zanskar", "nubra", "pangong"]}
    />
  );
}
