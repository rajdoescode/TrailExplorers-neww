export interface CommunityTrip {
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
  categories: string[];
  destinations: string[];
  route?: string;
  tags?: string;
}

export interface CommunityCategoryOption {
  id: string;
  label: string;
}

export interface CommunityPriceOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
  isOnRequest?: boolean;
}

export interface CommunitySortOption {
  id: string;
  label: string;
}

export interface CommunitySection {
  id: string;
  title: string;
  categoryKey: string;
  tripIds: string[];
}

export const COMMUNITY_TRIPS: CommunityTrip[] = [
  {
    id: "1790411548930",
    title: "Spiti Valley Group Trip from Delhi: Winter Expedition (9 Days)",
    slug: "spiti-tours-spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930",
    detailUrl: "/trips/spiti-tours-spiti-valley-group-trip-from-delhi-winter-expedition-9-days-1790411548930",
    duration: "9 Days / 8 Nights",
    price: 17499,
    priceDisplay: "₹17,499",
    priceLabel: "Starts from",
    image: "/assets/images/trips/img_1793091363548____2_.jpg",
    isComingSoon: false,
    categories: ["spiti_tours", "himachal_tours"],
    destinations: ["Spiti", "Spiti Valley", "Himachal", "Delhi", "Kaza", "Chitkul"],
    route: "Delhi — Shimla — Sangla — Chitkul — Tabo — Kaza — Langza — Komic — Hikkim — Key — Chicham — Kalpa — Shimla — Delhi",
    tags: "Group Tour, Winter Expedition, High Altitude, Snow Drive",
  },
  {
    id: "1790406745365",
    title: "Carnival Collective : Manali Winter Carnival Special",
    slug: "carnival-collective-manali-winter-carnival-special-1790406745365",
    detailUrl: "#",
    duration: "5 Days / 4 Nights",
    price: null,
    priceDisplay: "On Request",
    priceLabel: "Price",
    image: "/assets/images/trips/img_1790406721853_Himachal_Winter_Carnival_2025___Adventure__Culture_and_Celebration_of_Snow.jpg",
    isComingSoon: true,
    categories: ["spiti_tours", "himachal_tours", "festival_tours"],
    destinations: ["Manali", "Himachal", "Delhi"],
    route: "Delhi — Manali — Solang Valley — Atal Tunnel — Sissu — Delhi",
    tags: "Winter Carnival, Snow, Culture, Manali, Festival",
  },
  {
    id: "103",
    title: "Spiti : Winter 4X4 Expedition",
    slug: "spiti-tours-spiti-winter-4x4-expedition-103",
    detailUrl: "/trips/spiti-tours-spiti-winter-4x4-expedition-103",
    duration: "9 Days / 8Nights",
    price: 25499,
    priceDisplay: "₹25,499",
    priceLabel: "Starts from",
    image: "/assets/images/trips/trip_103_image_url.jpg",
    isComingSoon: false,
    categories: ["spiti_tours", "himachal_tours", "women_only_tours", "corporate_tours"],
    destinations: ["Spiti", "Spiti Valley", "Himachal", "Delhi", "Key Monastery"],
    route: "Delhi - Shimla — Chitkul — Nako — Tabo — Hikkim — Komic — Langza — Key Monastery — Chicham Bridge — Kalpa - Shimla - Delhi",
    tags: "Winter Expedition, 4x4 Expedition, Spiti Valley, High Altitude",
  },
  {
    id: "1793300342070",
    title: "Naggar, Baralacha La & Bijli Mahadev  Community Trip - Ex Delhi",
    slug: "himachal-tours-naggar-baralacha-la-bijli-mahadev-community-trip-ex-delhi-1793300342070",
    detailUrl: "/trips/himachal-tours-naggar-baralacha-la-bijli-mahadev-community-trip-ex-delhi-1793300342070",
    duration: "5 Days / 4 Nights",
    price: 8499,
    priceDisplay: "₹8,499",
    priceLabel: "Starts from",
    image: "/assets/images/trips/img_1793340766352____17_.jpg",
    isComingSoon: false,
    categories: ["himachal_tours", "women_only_tours", "treks", "corporate_tours", "educational_trips"],
    destinations: ["Naggar", "Baralacha La", "Bijli Mahadev", "Himachal", "Delhi", "Kullu", "Manali"],
    route: "Delhi — Naggar Castle — Baralacha La Pass — Bijli Mahadev Trek — Kullu — Delhi",
    tags: "Naggar, Baralacha La, Bijli Mahadev, Community Trip, Offbeat Himachal",
  },
  {
    id: "1789277670644",
    title: "Delhi to Delhi: Manali Weekend Escape",
    slug: "himachal-tours-delhi-to-delhi-manali-weekend-escape-1789277670644",
    detailUrl: "/trips/himachal-tours-delhi-to-delhi-manali-weekend-escape-1789277670644",
    duration: "3 Days / 2 Nights",
    price: 4999,
    priceDisplay: "₹4,999",
    priceLabel: "Starts from",
    image: "/assets/images/trips/img_1789393701594_Manali_weather___.jpg",
    isComingSoon: false,
    categories: ["himachal_tours", "women_only_tours", "corporate_tours"],
    destinations: ["Manali", "Himachal", "Delhi", "Solang Valley", "Atal Tunnel"],
    route: "Delhi — Manali — Solang Valley — Atal Tunnel — Sissu — Old Manali Cafes — Delhi",
    tags: "Weekend Escape, Manali, Sissu, Atal Tunnel, Budget Trip",
  },
  {
    id: "108",
    title: "Kasol & Manali: Offbeat Himalayan Escape",
    slug: "himachal-tours-kasol-manali-offbeat-himalayan-escape-108",
    detailUrl: "/trips/himachal-tours-kasol-manali-offbeat-himalayan-escape-108",
    duration: "6 Days / 5 Nights",
    price: 6999,
    priceDisplay: "₹6,999",
    priceLabel: "Starts from",
    image: "/assets/images/trips/trip_108_image_url.jpg",
    isComingSoon: false,
    categories: ["himachal_tours"],
    destinations: ["Kasol", "Manali", "Himachal", "Parvati Valley", "Delhi"],
    route: "Delhi — Manali — Atal Tunnel — Sissu — Solang Valley — Kullu — Kasol — Manikaran — Delhi",
    tags: "Himachal, Kasol, Manali, Offbeat Escape, Budget Trip, Group Tour",
  },
  {
    id: "118",
    title: "Buran Ghati: Where The Trail Ends",
    slug: "himachal-tours-buran-ghati-where-the-trail-ends-118",
    detailUrl: "#",
    duration: "7 Days / 6 Nights",
    price: null,
    priceDisplay: "On Request",
    priceLabel: "Price",
    image: "/assets/images/trips/trip_118_image_url.jpg",
    isComingSoon: true,
    categories: ["himachal_tours", "women_only_tours", "treks"],
    destinations: ["Buran Ghati", "Himachal", "Shimla", "Janglik"],
    route: "Shimla — Janglik — Dayara Thachh — Litham — Chandernahan — Dhunda — Buran Pass — Barua — Shimla",
    tags: "Himalayan Trek, High Altitude, Pass Crossing, Snow Rappelling, Shimla, Kinnaur, Adventure",
  },
  {
    id: "120",
    title: "Bir Billing Escape: Paragliding, Rajgundha Valley & Prashar Lake",
    slug: "himachal-tours-bir-billing-escape-paragliding-rajgundha-valley-prashar-lake-120",
    detailUrl: "/trips/himachal-tours-bir-billing-escape-paragliding-rajgundha-valley-prashar-lake-120",
    duration: "3 Days / 2 Nights",
    price: 10499,
    priceDisplay: "₹10,499",
    priceLabel: "Starts from",
    image: "/assets/images/trips/trip_120_image_url.jpg",
    isComingSoon: false,
    categories: ["himachal_tours", "women_only_tours", "treks", "corporate_tours"],
    destinations: ["Bir Billing", "Rajgundha", "Prashar Lake", "Himachal", "Delhi"],
    route: "Delhi — Bir — Billing — Rajgundha Valley — Hanumangarh — Prashar Lake — Mandi — Delhi",
    tags: "Himachal, Paragliding, Bir Billing, Prashar Lake, Rajgundha, Weekend Getaway, Trekking, Camping",
  },
  {
    id: "1791270197364",
    title: "Zanskar From Delhi: Shinku La & Gonbo Rangjon Expedition",
    slug: "ladakh-tours-zanskar-from-delhi-shinku-la-gonbo-rangjon-expedition-1791270197364",
    detailUrl: "/trips/ladakh-tours-zanskar-from-delhi-shinku-la-gonbo-rangjon-expedition-1791270197364",
    duration: "5 Days / 4 Nights",
    price: 8999,
    priceDisplay: "₹8,999",
    priceLabel: "Starts from",
    image: "/assets/images/trips/img_1791366815939_images.jpg",
    isComingSoon: false,
    categories: ["ladakh_tours"],
    destinations: ["Zanskar", "Ladakh", "Shinku La", "Gonbo Rangjon", "Delhi", "Padum"],
    route: "Delhi — Manali — Atal Tunnel — Keylong — Darcha — Shinku La — Kurgiakh — Gonbo Rangjon — Padum — Delhi",
    tags: "Ladakh, Zanskar, Shinku La, Gonbo Rangjon, Expedition",
  },
  {
    id: "104",
    title: "Udaipur & Kumbhalgarh Expedition",
    slug: "rajasthan-tours-udaipur-kumbhalgarh-expedition-104",
    detailUrl: "#",
    duration: "3 Days / 2 Nights",
    price: null,
    priceDisplay: "On Request",
    priceLabel: "Price",
    image: "/assets/images/trips/trip_104_image_url.jpg",
    isComingSoon: true,
    categories: ["rajasthan_tours"],
    destinations: ["Udaipur", "Kumbhalgarh", "Rajasthan"],
    route: "Udaipur — Lake Pichola — City Palace — Kumbhalgarh Fort — Saheliyon Ki Bari — Fateh Sagar Lake",
    tags: "Royal Rajasthan, Cultural Tour, Weekend Getaway, Forts & Palaces, Lake City",
  },
  {
    id: "1786216631459",
    title: "6 Days Kashmir Snow Experience: Gulmarg Gondola & Houseboat Stay",
    slug: "6-days-kashmir-snow-experience-gulmarg-gondola-houseboat-stay-1786216631459",
    detailUrl: "/trips/6-days-kashmir-snow-experience-gulmarg-gondola-houseboat-stay-1786216631459",
    duration: "6 Days / 5 Nights",
    price: null,
    priceDisplay: "On Request",
    priceLabel: "Price",
    image: "/assets/images/trips/img_1786216504243_img_1786216398063_Gulmarg__A_delight_for_travelers_on_a_wanderlust_.jpg",
    isComingSoon: false,
    categories: ["kashmir_tours"],
    destinations: ["Kashmir", "Srinagar", "Gulmarg", "Pahalgam", "Drung", "Aru Valley"],
    route: "Srinagar — Gulmarg — Drung — Pahalgam — Aru Valley — Betaab Valley — Chandanwari — Srinagar",
    tags: "Winter Expedition, Snow Experience, Houseboat Stay, Valley Exploration, Kashmir",
  },
];

export const COMMUNITY_CATEGORIES: CommunityCategoryOption[] = [
  { id: "all", label: "All Categories" },
  { id: "spiti_tours", label: "Spiti Tours" },
  { id: "himachal_tours", label: "Himachal Tours" },
  { id: "kashmir_tours", label: "Kashmir Tours" },
  { id: "ladakh_tours", label: "Ladakh Tours" },
  { id: "heart_of_india_tours", label: "Heart of India Tours" },
  { id: "northeast_india_tours", label: "North-East India Tours" },
  { id: "south_india_tours", label: "South India Tours" },
  { id: "goa_tours", label: "Goa Tours" },
  { id: "rajasthan_tours", label: "Rajasthan Tours" },
  { id: "uttarakhand_tours", label: "Uttarakhand Tours" },
  { id: "international_tours", label: "International Tours" },
  { id: "women_only_tours", label: "Women Only Tours" },
  { id: "treks", label: "Treks" },
  { id: "bike_tours", label: "Bike Tours" },
  { id: "festival_tours", label: "Festival Tours" },
  { id: "corporate_tours", label: "Corporate Tours" },
  { id: "educational_trips", label: "Educational Trips" },
];

export const COMMUNITY_PRICE_RANGES: CommunityPriceOption[] = [
  { id: "all", label: "All Prices" },
  { id: "under_10k", label: "Under ₹10,000", min: 0, max: 9999 },
  { id: "10k_20k", label: "₹10,000 — ₹20,000", min: 10000, max: 20000 },
  { id: "20k_30k", label: "₹20,000 — ₹30,000", min: 20001, max: 30000 },
  { id: "above_30k", label: "Above ₹30,000", min: 30001, max: Infinity },
  { id: "on_request", label: "On Request", isOnRequest: true },
];

export const COMMUNITY_SORT_OPTIONS: CommunitySortOption[] = [
  { id: "default", label: "Featured / Default" },
  { id: "price_low_high", label: "Price: Low to High" },
  { id: "price_high_low", label: "Price: High to Low" },
];

export const COMMUNITY_SECTIONS: CommunitySection[] = [
  {
    id: "spiti-tours",
    title: "Spiti Tours",
    categoryKey: "spiti_tours",
    tripIds: ["1790411548930", "1790406745365", "103"],
  },
  {
    id: "himachal-tours",
    title: "Himachal Tours",
    categoryKey: "himachal_tours",
    tripIds: ["1793300342070", "1790411548930", "1789277670644", "108", "118", "103", "120"],
  },
  {
    id: "kashmir-tours",
    title: "Kashmir Tours",
    categoryKey: "kashmir_tours",
    tripIds: ["1786216631459"],
  },
  {
    id: "ladakh-tours",
    title: "Ladakh Tours",
    categoryKey: "ladakh_tours",
    tripIds: ["1791270197364"],
  },
  {
    id: "rajasthan_tours",
    title: "Rajasthan Tours",
    categoryKey: "rajasthan_tours",
    tripIds: ["104"],
  },
  {
    id: "women-special",
    title: "Women Only Tours",
    categoryKey: "women_only_tours",
    tripIds: ["1793300342070", "1789277670644", "118", "103", "120"],
  },
  {
    id: "treks",
    title: "Treks",
    categoryKey: "treks",
    tripIds: ["1793300342070", "118", "120"],
  },
  {
    id: "corporate-tours",
    title: "Corporate Tours",
    categoryKey: "corporate_tours",
    tripIds: ["1793300342070", "1789277670644", "103", "120"],
  },
  {
    id: "educational-trips",
    title: "Educational Trips",
    categoryKey: "educational_trips",
    tripIds: ["1793300342070"],
  },
];
