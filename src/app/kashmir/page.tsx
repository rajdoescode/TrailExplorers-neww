import React from "react";
import type { Metadata } from "next";
import { RegionPageTemplate } from "@/components/destinations/RegionPageTemplate";

export const metadata: Metadata = {
  title: "Kashmir Tour Packages — Paradise on Earth | Awara Banjara",
  description:
    "Curated Kashmir group packages, Great Lakes trek, Dal Lake houseboat stays, and Gulmarg winter snow experiences.",
};

export default function KashmirPage() {
  return (
    <RegionPageTemplate
      regionId="kashmir"
      regionName="Kashmir"
      title="Kashmir Tour Packages"
      tagline="Paradise on Earth"
      iconSrc="/assets/images/destinations/icons/kashmir.png"
      startingPrice="₹16,499"
      tripCount="3 trips"
      lead="Shikaras on Dal Lake, chinar trees turning red and meadows that look painted. Kashmir earns every word of its name."
      pills={[
        "🗓️ Apr – Oct, snow Dec – Feb",
        "✈️ Fly to Srinagar",
        "⛰️ 1,600 – 4,200 m",
      ]}
      story="From a houseboat on Dal Lake to the gondola at Gulmarg and the pine valleys of Pahalgam and Sonamarg, Kashmir mixes slow travel with big mountain days. Trekkers come for the Great Lakes, a chain of alpine lakes under glaciers."
      facts={[
        {
          label: "Best time",
          value:
            "April – June for meadows and blossoms, July – September for the Great Lakes trek, December – February for snow in Gulmarg.",
        },
        {
          label: "Getting there",
          value: "Fly into Srinagar. Most trips start and end there.",
        },
        {
          label: "Altitude",
          value:
            "Srinagar is around 1,600 m. The Great Lakes trek crosses passes above 4,000 m.",
        },
        {
          label: "Perfect for",
          value: "Houseboats, snow, gentle sightseeing and alpine treks.",
        },
      ]}
      filterCategories={["kashmir", "gulmarg", "srinagar", "pahalgam", "sonamarg"]}
    />
  );
}
