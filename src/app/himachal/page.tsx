import React from "react";
import type { Metadata } from "next";
import { RegionPageTemplate } from "@/components/destinations/RegionPageTemplate";

export const metadata: Metadata = {
  title: "Himachal Tour Packages — Land of Gods | Awara Banjara",
  description:
    "Himachal Pradesh trips with Awara Banjara: community departures, treks and road trips to Manali, Spiti, Kasol, Bir and beyond.",
};

export default function HimachalPage() {
  return (
    <RegionPageTemplate
      regionId="himachal"
      regionName="Himachal"
      title="Himachal Tour Packages"
      tagline="Land of Gods"
      iconSrc="/assets/images/destinations/icons/himachal.png"
      startingPrice="₹4,999"
      tripCount="17 trips"
      lead="Dev Bhoomi, the Land of Gods. Cedar forests and apple orchards in Kullu and Manali, and cold desert monasteries in Spiti, all one overnight bus from Delhi."
      pills={[
        "🗓️ Mar – Oct, snow in winter",
        "🚌 10–14 hrs from Delhi",
        "⛰️ 2,000 – 4,500 m",
      ]}
      story="Every valley here has its own deity, and you feel it in the village temples, the mountain fairs and the prayer flags strung across the passes. In a single trip you can go from the green Kullu and Parvati valleys to the high, bare moonscapes of Spiti and Lahaul."
      facts={[
        {
          label: "Best time",
          value:
            "March – June for the valleys, June – October for Spiti and the high passes, December – February for snow.",
        },
        {
          label: "Getting there",
          value:
            "Overnight Volvo from Delhi to Manali, Shimla or Bir. Our group trips start from Delhi.",
        },
        {
          label: "Altitude",
          value:
            "Around 2,000 m in Manali, 4,500 m+ at Kunzum La and Chandratal. We build in time to acclimatise.",
        },
        {
          label: "Perfect for",
          value: "First Himalayan trips, treks, snow, road trips and slow café days.",
        },
      ]}
      filterCategories={["himachal", "manali", "kasol", "bir", "kullu", "shimla"]}
    />
  );
}
