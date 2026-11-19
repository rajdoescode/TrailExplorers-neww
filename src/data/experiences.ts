export interface ExperienceTrip {
  id: string;
  title: string;
  slug: string;
  detailUrl: string;
  duration: string;
  price: number | null;
  priceDisplay: string;
  priceLabel: string;
  image: string;
  isComingSoon: boolean;
  category: string;
  route?: string;
  tags?: string;
}

export const EXPERIENCES_DATA: ExperienceTrip[] = [
  {
    id: "1790364151734",
    title: "Kullu Dussehra Special: Cultural Expedition & Manali Escape",
    slug: "himachal-tours-kullu-dussehra-special-cultural-expedition-manali-escape-1790364151734",
    detailUrl: "/trips/himachal-tours-kullu-dussehra-special-cultural-expedition-manali-escape-1790364151734",
    duration: "5 Days / 4 Nights",
    price: 10500,
    priceDisplay: "₹10,500",
    priceLabel: "Starts from",
    image: "/assets/images/trips/img_1791097768369_Kullu-Dussehra-2025__1_.webp",
    isComingSoon: false,
    category: "himachal_tours, festival_tours",
    route: "Delhi — Manali -Naggar— Kullu — Bijli Mahadev — Delhi",
    tags: "HIMACHAL_TOURS, FESTIVAL_TOURS, TREKS",
  },
  {
    id: "1786216631459",
    title: "6 Days Kashmir Snow Experience: Gulmarg Gondola & Houseboat Stay",
    slug: "kashmir-tours-6-days-kashmir-snow-experience-gulmarg-gondola-houseboat-stay-1786216631459",
    detailUrl: "/trips/kashmir-tours-6-days-kashmir-snow-experience-gulmarg-gondola-houseboat-stay-1786216631459",
    duration: "6 Days / 5 Nights",
    price: null,
    priceDisplay: "On Request",
    priceLabel: "Price",
    image: "/assets/images/trips/img_1786216504243_img_1786216398063_Gulmarg__A_delight_for_travelers_on_a_wanderlust_.jpg",
    isComingSoon: false,
    category: "kashmir_tours",
    route: "Srinagar — Gulmarg — Drung — Pahalgam — Aru Valley — Betaab Valley — Chandanwari — Yusmarg / Doodhpathri — Srinagar",
    tags: "Winter Expedition, Snow Experience, Houseboat Stay, Valley Exploration",
  },
];
