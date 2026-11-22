"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Phone,
  Calendar as CalendarIcon,
  Plus,
  Minus,
  ArrowDown,
  X,
  Compass,
  MapPin,
  Users,
  Sparkles,
  Ticket,
  SlidersHorizontal,
  Clock,
  Car,
  Bed,
  Layers,
  CheckCircle2,
  Share2,
  Trash2,
  MessageCircleMore,
  ListOrdered,
} from "lucide-react";

import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  TravellerCounter,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SelectionCard,
  Modal,
  CustomCalendarPicker,
  Badge,
  Heading,
  SkeletonImage,
} from "@/components/ui";

import {
  ExplorerChatMascot,
  ExplorerMascotHandle,
} from "@/components/chat/ExplorerChatMascot";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useSwipeDownToClose } from "@/hooks/useSwipeDownToClose";

// ==========================================
// CHAT MODE DATA TYPES & PRESETS
// ==========================================

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  chips?: string[];
  planUpdate?: {
    days: number;
    title: string;
    route: string;
  };
  showBudgetCard?: boolean;
}

interface ItineraryDay {
  day: number;
  title: string;
  stops: string;
  desc: string;
  night: string;
}

interface ItineraryData {
  title: string;
  region: string;
  days: number;
  stage: number;
  route?: string[];
  facts: {
    when?: string;
    length?: string;
    who?: string;
    from?: string;
    transport?: string;
    stays?: string;
    budget?: string;
    wishlist?: string;
  };
  itinerary?: ItineraryDay[];
}

const PRESETS: Record<
  string,
  {
    title: string;
    region: string;
    days: number;
    when: string;
    route: string[];
    facts: {
      transport: string;
      stays: string;
    };
    itinerary: ItineraryDay[];
  }
> = {
  ladakh: {
    title: "Ladakh Summer Expedition",
    region: "Ladakh",
    days: 8,
    when: "July (Best: June – September)",
    route: ["Delhi", "Leh", "Nubra Valley (Hunder)", "Pangong Tso", "Leh"],
    facts: {
      transport: "Private 4x4 SUV",
      stays: "Comfort Hotels & Luxury Swiss Camps",
    },
    itinerary: [
      {
        day: 1,
        title: "Fly Delhi to Leh & Complete Acclimatization",
        stops: "Leh Airport · Shanti Stupa evening view",
        desc: "Morning flight over snow peaks into Leh (11,500 ft). Strict complete rest day to acclimatize to high altitude with garlic soup and herbal tea.",
        night: "Leh Hotel",
      },
      {
        day: 2,
        title: "Leh Local Culture & Ancient Monasteries",
        stops: "Hall of Fame · Magnetic Hill · Sangam Point (Indus & Zanskar) · Pathar Sahib",
        desc: "Witness the gravity-defying Magnetic Hill and emerald-mud confluence of Indus and Zanskar rivers. Visit sacred Gurudwara Pathar Sahib.",
        night: "Leh Hotel",
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La",
        stops: "Khardung La (17,982 ft) · North Pullu · Diskit Monastery · Hunder Sand Dunes",
        desc: "Ascend the iconic Khardung La pass into the dramatic valley of Nubra. Double-humped Bactrian camel safari among white sand dunes at sunset.",
        night: "Hunder Luxury Camp",
      },
      {
        day: 4,
        title: "Nubra Valley to Pangong Tso via Shyok River",
        stops: "Diskit Giant Maitreya Buddha · Shyok Valley · Durbuk · Tangtse",
        desc: "Breathtaking drive along the untamed Shyok river route directly reaching the world-famous color-changing Pangong Lake at 14,270 ft.",
        night: "Pangong Lake Camp / Cottage",
      },
      {
        day: 5,
        title: "Pangong Tso Sunrise & Return to Leh via Chang La",
        stops: "Pangong Sunrise · Chang La (17,688 ft) · Thiksey Monastery · Shey Palace",
        desc: "Early morning reflection photography at Pangong Lake. Cross over dramatic snowbound Chang La pass and explore Thiksey monastery.",
        night: "Leh Hotel",
      },
      {
        day: 6,
        title: "Sham Valley Heritage & Apricot Orchards",
        stops: "Alchi Monastery (11th Century) · Likir Monastery · Basgo Fort Ruins",
        desc: "Scenic excursion along lower Indus valley visiting Alchi's UNESCO-worthy Kashmiri wood carvings and ancient apricot orchards.",
        night: "Leh Hotel",
      },
      {
        day: 7,
        title: "Leh Market Leisure & Souvenir Shopping",
        stops: "Leh Main Bazaar · Tibetan Handicrafts · Local Cafés · Sunset viewpoint",
        desc: "Leisure day to explore bohemian Tibetan market, pick authentic pashmina and sea buckthorn tea, and enjoy German bakery treats.",
        night: "Leh Hotel",
      },
      {
        day: 8,
        title: "Fly Leh to Delhi with Himalayan Memories",
        stops: "Kushok Bakula Rimpochee Airport",
        desc: "Early morning transfer to airport. Aerial views of Zanskar and Pir Panjal ranges as you head back home with cherished memories.",
        night: "Departure",
      },
    ],
  },
  spiti: {
    title: "Spiti Valley Full Circuit",
    region: "Spiti Valley",
    days: 8,
    when: "July (June – October)",
    route: ["Delhi", "Narkanda", "Sangla", "Tabo", "Kaza", "Chandratal", "Manali", "Delhi"],
    facts: {
      transport: "Private 4x4 SUV",
      stays: "Comfort Homestays & Lakeside Swiss Camps",
    },
    itinerary: [
      {
        day: 1,
        title: "Delhi to Narkanda via Apple Country",
        stops: "Himalayan Expressway · Shimla · Fagu · Narkanda",
        desc: "Scenic drive from Delhi through lush green pine forests and apple orchards to peaceful Narkanda.",
        night: "Narkanda",
      },
      {
        day: 2,
        title: "Narkanda to Sangla & Chitkul Village",
        stops: "Rampur Bushahr · Kinnaur Cliff Gate · Baspa Valley · Chitkul",
        desc: "Drive through the cliff-hewn Kinnaur road into Baspa Valley, reaching India's last inhabited village before Tibet border.",
        night: "Chitkul Homestay",
      },
      {
        day: 3,
        title: "Chitkul to Nako & 1000-Year-Old Tabo",
        stops: "Khab Confluence · Nako Lake & Monastery · Gue Mummy · Tabo",
        desc: "Witness the 540-year-old naturally preserved monk mummy at Gue, followed by evening meditation in Tabo Monastery.",
        night: "Tabo Homestay",
      },
      {
        day: 4,
        title: "Tabo to Dhankar Fort & Kaza Capital",
        stops: "Dhankar Cliff Monastery · Pin Valley (Mudh) · Lingti · Kaza",
        desc: "Visit the gravity-defying cliff monastery of Dhankar and drive into the frozen colored canyon of Pin Valley.",
        night: "Kaza Hotel",
      },
      {
        day: 5,
        title: "High Spiti Villages: Key, Kibber, Hikkim & Chicham",
        stops: "Key Monastery · World's Highest Post Office Hikkim · Komic · Chicham Bridge",
        desc: "Post a postcard from 14,567 ft at Hikkim, stand on Asia's highest gorge bridge at Chicham, and meet lamas at Key.",
        night: "Kaza Hotel",
      },
      {
        day: 6,
        title: "Kaza to Chandratal via Kunzum Pass",
        stops: "Losar Village · Kunzum La (14,931 ft) · Chandratal Lake",
        desc: "Ascend Kunzum Pass with panoramic views of Bara Shigri glacier, followed by sunset hike around crescent Moon Lake.",
        night: "Chandratal Camp",
      },
      {
        day: 7,
        title: "Chandratal to Manali via Atal Tunnel",
        stops: "Batal Chacha Chachi Dhaba · Gramphu · Rohtang foothills · Atal Tunnel",
        desc: "Off-road mountain trail through river crossings and Chandra Valley, passing through engineering marvel Atal Tunnel to Manali.",
        night: "Old Manali",
      },
      {
        day: 8,
        title: "Manali to Delhi Return Journey",
        stops: "Kullu Valley · Beas River · Murthal dhabas",
        desc: "Drive down the Himalayan foothills and back to Delhi with revitalized mountain energy and unforgettable stories.",
        night: "Departure",
      },
    ],
  },
  kashmir: {
    title: "Kashmir Family Paradise",
    region: "Kashmir",
    days: 7,
    when: "Summer (Year-Round)",
    route: ["Delhi", "Srinagar Houseboat", "Gulmarg", "Pahalgam", "Sonamarg", "Srinagar"],
    facts: {
      transport: "Comfortable Innova Crysta",
      stays: "Deluxe Houseboat & 4-Star Mountain Resorts",
    },
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival & Heritage Dal Lake Houseboat",
        stops: "Dal Lake · Mughal Gardens · Sunset Shikara",
        desc: "Traditional Kashmiri welcome with warm saffron Kehwa. Evening relaxing shikara cruise past floating lotus gardens.",
        night: "Srinagar Houseboat",
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg Meadow of Flowers",
        stops: "Tangmarg · Gulmarg Golf Course · Apharwat Peak",
        desc: "Ride the world's second-highest cable car, Gulmarg Gondola Phase 1 & 2, with breathtaking panoramic snow views.",
        night: "Gulmarg Resort",
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam Valley of Shepherds",
        stops: "Pampore Saffron Fields · Awantipora Temple Ruins · Lidder River",
        desc: "Drive through fragrant saffron fields, stop at 9th-century Avantishwar temple ruins, and check into riverside resort.",
        night: "Pahalgam Resort",
      },
      {
        day: 4,
        title: "Pahalgam Valleys: Betaab, Aru & Mini Switzerland",
        stops: "Betaab Valley · Aru Wildlife Sanctuary · Baisaran Meadow",
        desc: "Pony ride up to lush pine meadows of Baisaran, visit crystal-clear turquoise waters of Betaab Valley where Bollywood classics were shot.",
        night: "Pahalgam Resort",
      },
      {
        day: 5,
        title: "Pahalgam to Sonamarg Meadow of Gold",
        stops: "Sindh Valley · Thajiwas Glacier · Nilagrad River",
        desc: "Scenic drive alongside turquoise Sindh river to glacier-ringed Sonamarg. Sledge ride on snow in Thajiwas.",
        night: "Srinagar Hotel",
      },
      {
        day: 6,
        title: "Old Srinagar Heritage & Local Markets",
        stops: "Jamia Masjid · Shah Hamdan Shrine · Lal Chowk Dry Fruit Bazaars",
        desc: "Heritage walk through wood-carved Old City bridges, copperware shopping, and tasting Wazwan culinary feast.",
        night: "Srinagar Hotel",
      },
      {
        day: 7,
        title: "Srinagar Airport Departure",
        stops: "Sheikh ul-Alam International Airport",
        desc: "Transfer to airport with Kashmiri saffron and walnut gifts, carrying lifetime paradise memories.",
        night: "Departure",
      },
    ],
  },
  himachal: {
    title: "Offbeat Himachal & Parvati Valley",
    region: "Himachal",
    days: 6,
    when: "Spring & Summer",
    route: ["Delhi", "Manali", "Kasol", "Jibhi", "Tirthan Valley", "Delhi"],
    facts: {
      transport: "Private Urban Cruiser",
      stays: "Riverside Cedar Wood Cottages",
    },
    itinerary: [
      {
        day: 1,
        title: "Delhi to Old Manali Overnight Drive",
        stops: "Sundernagar Lake · Pandoh Dam · Beas River",
        desc: "Ascend into the lush green cedar forests of Kullu Valley, arriving in bohemian Old Manali.",
        night: "Old Manali Cottage",
      },
      {
        day: 2,
        title: "Old Manali Cafés, Jogini Waterfalls & Solang",
        stops: "Hadimba Temple · Vashisht Hot Springs · Jogini Falls",
        desc: "Pine forest hike to Jogini falls, dip in natural sulfur hot springs, and evening riverside live acoustic music.",
        night: "Old Manali Cottage",
      },
      {
        day: 3,
        title: "Manali to Kasol & Chalal Village",
        stops: "Naggar Castle · Manikaran Sahib Gurudwara · Parvati River",
        desc: "Visit historic Naggar wood architecture, sacred Manikaran hot springs, and cross the suspension bridge into peaceful Chalal.",
        night: "Kasol Riverside Camp",
      },
      {
        day: 4,
        title: "Kasol to Jibhi & Jalori Pass",
        stops: "Aut Tunnel · Banjar Valley · Jalori Pass (10,800 ft) · Serolsar Lake",
        desc: "Cross over Jalori Pass with dense oak & rhododendron forest hike to mystical Serolsar Lake.",
        night: "Jibhi Treehouse",
      },
      {
        day: 5,
        title: "Jibhi Waterfalls & Tirthan Valley Riverside",
        stops: "Jibhi Wooden Bridges · Chehni Kothi Fort Tower · Tirthan River",
        desc: "Relax by the trout streams of UNESCO Great Himalayan National Park buffer zone in Tirthan Valley.",
        night: "Tirthan Riverside Home",
      },
      {
        day: 6,
        title: "Return Drive to Delhi",
        stops: "Chandigarh bypass · Murthal dhabas",
        desc: "Drive down the Himalayan foothills and back to Delhi with revitalized mountain energy.",
        night: "Departure",
      },
    ],
  },
};

const STARTS = [
  {
    id: "spiti",
    title: "Spiti Valley road trip",
    sub: "Cold desert & monasteries",
    image: "/assets/images/destinations/domestic/spiti.jpg",
    say: "Spiti Valley road trip",
  },
  {
    id: "ladakh",
    title: "Ladakh in summer",
    sub: "High passes & blue lakes",
    image: "/assets/images/trips/trip_117_image_url.jpg",
    say: "Ladakh in summer",
  },
  {
    id: "kashmir",
    title: "Kashmir with family",
    sub: "Houseboats & meadows",
    image: "/assets/images/trips/trip_115_image_url.jpg",
    say: "Kashmir with family",
  },
  {
    id: "himachal",
    title: "Surprise me",
    sub: "Tell us your vibe",
    image: "/assets/images/destinations/domestic/himachal.jpg",
    say: "Not sure yet, suggest something",
  },
];

// ==========================================
// STEP-BY-STEP BUILDER DATA
// ==========================================

const BUILDER_REGIONS = [
  {
    id: "himachal",
    name: "Himachal",
    tagline: "Pine valleys, cafés & easy mountain escapes",
    image: "/assets/images/destinations/domestic/himachal.jpg",
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    tagline: "Cold desert, ancient monasteries, highest villages",
    image: "/assets/images/destinations/domestic/spiti.jpg",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    tagline: "High passes, blue lakes, endless roads",
    image: "/assets/images/trips/trip_117_image_url.jpg",
  },
  {
    id: "zanskar",
    name: "Zanskar",
    tagline: "Remotest valleys, glaciers & cliff monasteries",
    image: "/assets/images/trips/img_1786811162446_Drang_Drung_Glacier_.jpg",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    tagline: "Houseboats, meadows & snow in Gulmarg",
    image: "/assets/images/trips/trip_115_image_url.jpg",
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    tagline: "Temples, alpine treks & the Ganga",
    image: "/assets/images/trips/trip_119_image_url.jpg",
  },
  {
    id: "northeast",
    name: "Northeast",
    tagline: "Living root bridges, monasteries & waterfalls",
    image: "/assets/images/trips/trip_114_image_url.jpg",
  },
];

const CURATED_TRIP_STARTERS = [
  {
    id: "spiti-circuit",
    title: "Spiti Valley Full Circuit",
    regionId: "spiti",
    days: 8,
    badge: "Most Popular",
    tagline: "Kunzum Pass, Chandratal Lake & High Monasteries",
    image: "/assets/images/destinations/domestic/spiti.jpg",
    stays: "comfort",
    vehicle: "4x4",
  },
  {
    id: "ladakh-expedition",
    title: "Ladakh High Passes & Lakes",
    regionId: "ladakh",
    days: 8,
    badge: "Summer Classic",
    tagline: "Khardung La, Nubra Dunes & Pangong Tso",
    image: "/assets/images/trips/trip_117_image_url.jpg",
    stays: "comfort",
    vehicle: "suv",
  },
  {
    id: "kashmir-paradise",
    title: "Kashmir Family & Houseboat",
    regionId: "kashmir",
    days: 7,
    badge: "Scenic & Relaxed",
    tagline: "Dal Lake, Gulmarg Gondola & Pahalgam Valleys",
    image: "/assets/images/trips/trip_115_image_url.jpg",
    stays: "premium",
    vehicle: "suv",
  },
  {
    id: "himachal-offbeat",
    title: "Offbeat Himachal & Parvati",
    regionId: "himachal",
    days: 6,
    badge: "Youth & Couples",
    tagline: "Old Manali, Kasol, Jibhi Treehouses & Tirthan",
    image: "/assets/images/destinations/domestic/himachal.jpg",
    stays: "comfort",
    vehicle: "suv",
  },
  {
    id: "zanskar-remote",
    title: "Wild Zanskar & Suru Valley",
    regionId: "zanskar",
    days: 8,
    badge: "Off-Road",
    tagline: "Drang Drung Glacier, Cliff Monasteries & Padum",
    image: "/assets/images/trips/img_1786811162446_Drang_Drung_Glacier_.jpg",
    stays: "camps",
    vehicle: "4x4",
  },
  {
    id: "uttarakhand-treks",
    title: "Uttarakhand Peaks & Ganga",
    regionId: "uttarakhand",
    days: 7,
    badge: "Culture & Treks",
    tagline: "Rishikesh, Chopta Tungnath & Auli Meadows",
    image: "/assets/images/trips/trip_119_image_url.jpg",
    stays: "comfort",
    vehicle: "suv",
  },
];

const BUILDER_STAYS = [
  { id: "budget", label: "Budget", desc: "Clean guesthouses, hostels & homestays" },
  { id: "comfort", label: "Comfort", desc: "3-star hotels & good homestays" },
  { id: "premium", label: "Premium", desc: "Boutique stays & the best in each town" },
  { id: "camps", label: "Mix with camps", desc: "Hotels plus a few nights under canvas" },
];

const BUILDER_VEHICLES = [
  { id: "tempo", label: "Tempo Traveller", desc: "Best for 6+ people" },
  { id: "suv", label: "SUV / Innova", desc: "Comfortable for up to 6" },
  { id: "4x4", label: "4x4", desc: "Snow, rough roads, winter Spiti" },
  { id: "bikes", label: "Royal Enfield bikes", desc: "With a backup vehicle" },
  { id: "suggest", label: "Suggest for me", desc: "We will pick the right one" },
];

const BUILDER_PACES = [
  { id: "relaxed", label: "Relaxed", desc: "Short drives, slow mornings" },
  { id: "balanced", label: "Balanced", desc: "A good mix of both" },
  { id: "packed", label: "Action-packed", desc: "See as much as possible" },
];

const BUILDER_ACTIVITIES = [
  "Paragliding",
  "River rafting",
  "Camping",
  "Snow activities",
  "Day hikes",
  "Multi-day trek",
  "Monasteries & culture",
  "Stargazing",
  "Photography help",
  "Local food trail",
  "Village homestay",
  "Festival visit",
  "Jeep safari",
  "Hot springs",
];

const BUILDER_START_CITIES = [
  "Delhi",
  "Chandigarh",
  "Manali",
  "Leh",
  "Srinagar",
  "Dehradun",
  "Guwahati",
  "Bagdogra",
  "Other",
];

const GROUP_TYPES = [
  { id: "Friends", label: "Friends", desc: "Adventure & group fun" },
  { id: "Family", label: "Family", desc: "Kids & comfortable pace" },
  { id: "Couple", label: "Couple", desc: "Romance & private stays" },
  { id: "Solo", label: "Solo", desc: "Freedom & community vibes" },
  { id: "Office / Corporate", label: "Corporate", desc: "Team offsite & bonding" },
  { id: "School / College", label: "College Group", desc: "Budget & exploration" },
];

interface BuilderDayItem {
  id: string;
  dayNum: number;
  dateStr: string;
  title: string;
  night: string;
  stops: string[];
  notes: string;
}

// Helper to generate realistic itineraries based on chosen region and days
function buildDefaultItinerary(regions: string[], daysCount: number, startDateStr: string): BuilderDayItem[] {
  const primary = regions[0] || "himachal";

  const getDayDateStr = (dayIdx: number) => {
    try {
      const base = new Date(startDateStr);
      if (!isNaN(base.getTime())) {
        const current = new Date(base.getTime() + dayIdx * 24 * 60 * 60 * 1000);
        return current.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
      }
    } catch {
      // ignore
    }
    return `Day ${dayIdx + 1}`;
  };

  const templates: Record<string, { title: string; night: string }[]> = {
    spiti: [
      { title: "Delhi / Chandigarh → Narkanda Apple Country", night: "Narkanda" },
      { title: "Narkanda → Sangla & Chitkul Village (Last Indian Village)", night: "Chitkul Homestay" },
      { title: "Chitkul → Nako Lake & 1000-Year Tabo Monastery", night: "Tabo Homestay" },
      { title: "Tabo → Dhankar Fort & Pin Valley (Mudh)", night: "Kaza Hotel" },
      { title: "High Spiti: Key Monastery, Hikkim & Chicham Bridge", night: "Kaza Hotel" },
      { title: "Kaza → Kunzum Pass (14,931 ft) & Chandratal Lake", night: "Chandratal Swiss Camp" },
      { title: "Chandratal → Atal Tunnel → Old Manali", night: "Old Manali Cottage" },
      { title: "Manali → Delhi Return Journey", night: "Departure" },
    ],
    ladakh: [
      { title: "Fly Delhi to Leh · Complete Acclimatization Rest", night: "Leh Hotel" },
      { title: "Leh Culture: Magnetic Hill, Sangam & Pathar Sahib", night: "Leh Hotel" },
      { title: "Leh → Nubra Valley via Khardung La (17,982 ft)", night: "Hunder Luxury Camp" },
      { title: "Hunder Sand Dunes Safari → Pangong Tso via Shyok", night: "Pangong Lake Camp" },
      { title: "Pangong Sunrise → Chang La Pass → Thiksey Monastery", night: "Leh Hotel" },
      { title: "Sham Valley Heritage: Alchi & Apricot Orchards", night: "Leh Hotel" },
      { title: "Leh Main Bazaar Leisure & Souvenir Shopping", night: "Leh Hotel" },
      { title: "Leh Airport Departure with Himalayan Memories", night: "Departure" },
    ],
    kashmir: [
      { title: "Srinagar Arrival & Heritage Dal Lake Houseboat", night: "Srinagar Houseboat" },
      { title: "Srinagar to Gulmarg Meadow of Flowers & Gondola", night: "Gulmarg Mountain Resort" },
      { title: "Gulmarg to Pahalgam via Saffron Fields", night: "Pahalgam Riverside Resort" },
      { title: "Pahalgam Valleys: Betaab, Aru & Baisaran", night: "Pahalgam Riverside Resort" },
      { title: "Pahalgam to Sonamarg Meadow of Gold & Glacier", night: "Srinagar Hotel" },
      { title: "Old Srinagar Heritage Walk & Mughal Gardens", night: "Srinagar Hotel" },
      { title: "Srinagar Airport Departure", night: "Departure" },
    ],
    himachal: [
      { title: "Chandigarh / Delhi → Old Manali Scenic Drive", night: "Old Manali Cottage" },
      { title: "Explore Old Manali, Hadimba Temple & Jogini Falls", night: "Old Manali Cottage" },
      { title: "Manali → Solang Valley & Atal Tunnel to Sissu", night: "Sissu / Manali" },
      { title: "Manali → Kasol & Chalal Riverside Village", night: "Kasol Riverside Camp" },
      { title: "Kasol → Manikaran Hot Springs & Jibhi Valley", night: "Jibhi Treehouse" },
      { title: "Jibhi → Jalori Pass & Serolsar Lake Hike", night: "Tirthan Valley Home" },
      { title: "Tirthan Valley → Bir Billing Paragliding Takeoff", night: "Bir Billing" },
      { title: "Bir Billing → Dharamshala & Return Drive", night: "Departure" },
    ],
  };

  const chosenTemplate = templates[primary] || templates.himachal;
  const days: BuilderDayItem[] = [];

  for (let i = 0; i < daysCount; i++) {
    const templateItem = chosenTemplate[i % chosenTemplate.length];
    const isLast = i === daysCount - 1;
    days.push({
      id: `d-${i + 1}-${Date.now()}`,
      dayNum: i + 1,
      dateStr: getDayDateStr(i),
      title: isLast && daysCount > 1 ? `Return journey with mountain memories` : templateItem.title,
      night: isLast && daysCount > 1 ? "Departure" : templateItem.night,
      stops: [],
      notes: "",
    });
  }

  return days;
}

export default function PlanYourTripPage() {
  // Mode toggle: false = Chat mode, true = 5-step Builder form
  const [stepMode, setStepMode] = useState(false);

  // ------------------------------------------
  // Chat Mode State
  // ------------------------------------------
  const [welcomeKey, setWelcomeKey] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-1", sender: "bot", text: "Hey! I'm your Trail Explorers trip planner 👋" },
    { id: "msg-2", sender: "bot", text: "Where are the mountains calling you?" },
    {
      id: "msg-3",
      sender: "bot",
      text: "Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price.",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState<number>(0);
  const [activeTrip, setActiveTrip] = useState<ItineraryData | null>(null);

  const stageRef = useRef(0);
  const regionRef = useRef("ladakh");
  const mascotRef = useRef<ExplorerMascotHandle>(null);
  const welcomeMascotRef = useRef<ExplorerMascotHandle>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [mobileTicketOpen, setMobileTicketOpen] = useState(false);

  // Global reference-counted scroll lock for mobile ticket sheet & inquiry modal
  useScrollLock(mobileTicketOpen || modalOpen);

  const ticketOverlayRef = useRef<HTMLDivElement>(null);
  const { sheetRef: ticketSheetRef, dragHandleRef: ticketHandleRef } = useSwipeDownToClose({
    isOpen: mobileTicketOpen,
    onClose: () => setMobileTicketOpen(false),
    overlayRef: ticketOverlayRef,
  });

  const dialogOverlayRef = useRef<HTMLDivElement>(null);
  const { sheetRef: dialogSheetRef, dragHandleRef: dialogHandleRef } = useSwipeDownToClose({
    isOpen: modalOpen,
    onClose: () => {
      setModalOpen(false);
      setInquirySubmitted(false);
    },
    overlayRef: dialogOverlayRef,
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [ticketFlash, setTicketFlash] = useState(false);
  const [budgetVal, setBudgetVal] = useState(30000);

  // ------------------------------------------
  // Step-by-Step Wizard State
  // ------------------------------------------
  const [wizardStep, setWizardStep] = useState<number>(0); // 0 = Where, 1 = When & who, 2 = Style, 3 = Day by day, 4 = Send
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["himachal"]);
  const [selectedCuratedTrip, setSelectedCuratedTrip] = useState<string | null>(null);
  const [step1ViewMode, setStep1ViewMode] = useState<"trips" | "regions">("trips");

  // Step 2 state
  const [startDate, setStartDate] = useState("2026-11-20");
  const [flexibleDates, setFlexibleDates] = useState(true);
  const [numDays, setNumDays] = useState(8);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [groupType, setGroupType] = useState("Friends");
  const [startCity, setStartCity] = useState("Chandigarh");

  // Step 3 state
  const [stayStyle, setStayStyle] = useState("comfort");
  const [transportStyle, setTransportStyle] = useState("suggest");
  const [paceStyle, setPaceStyle] = useState("balanced");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // Step 4 state
  const [builderDays, setBuilderDays] = useState<BuilderDayItem[]>(() =>
    buildDefaultItinerary(["himachal"], 8, "2026-11-20")
  );

  // Step 5 state (Contact Form)
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custCallTime, setCustCallTime] = useState("As soon as possible");
  const [custNotes, setCustNotes] = useState("");
  const [builderSubmitted, setBuilderSubmitted] = useState(false);
  const [builderRef, setBuilderRef] = useState("AB-9182");

  // Mobile Bottom Sheet for live ticket in Builder Mode
  const [builderTicketDrawerOpen, setBuilderTicketDrawerOpen] = useState(false);

  const threadEndRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Reset builder state back to defaults
  const handleResetBuilder = () => {
    setSelectedRegions(["himachal"]);
    setSelectedCuratedTrip(null);
    setStartDate("2026-11-20");
    setFlexibleDates(true);
    setNumDays(8);
    setAdults(2);
    setChildren(0);
    setGroupType("Friends");
    setStartCity("Chandigarh");
    setStayStyle("comfort");
    setTransportStyle("suggest");
    setPaceStyle("balanced");
    setSelectedActivities([]);
    setBuilderDays(buildDefaultItinerary(["himachal"], 8, "2026-11-20"));
    setCustName("");
    setCustPhone("");
    setCustEmail("");
    setCustNotes("");
    setBuilderSubmitted(false);
    setWizardStep(0);
  };

  // Sync body class: .pc-mode-chat in Chat mode, standard clean background in Step mode
  useEffect(() => {
    if (!stepMode) {
      document.body.classList.add("pc-mode-chat");
    } else {
      document.body.classList.remove("pc-mode-chat");
    }
    return () => {
      document.body.classList.remove("pc-mode-chat");
    };
  }, [stepMode]);

  useEffect(() => {
    if (conversationStage > 0 || messages.length > 3 || isTyping) {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTo({
          top: chatScrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isTyping, conversationStage]);

  // Toggle region selection in step 1
  const toggleRegion = (id: string) => {
    setSelectedRegions((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least one
        updated = prev.filter((r) => r !== id);
      } else {
        updated = [...prev, id];
      }
      setSelectedCuratedTrip(null);
      // auto refresh itinerary template
      setBuilderDays(buildDefaultItinerary(updated, numDays, startDate));
      return updated;
    });
  };

  // Select curated trip in step 1
  const selectCuratedTrip = (trip: (typeof CURATED_TRIP_STARTERS)[0]) => {
    setSelectedCuratedTrip(trip.id);
    setSelectedRegions([trip.regionId]);
    setNumDays(trip.days);
    if (trip.stays) setStayStyle(trip.stays);
    if (trip.vehicle) setTransportStyle(trip.vehicle);
    setBuilderDays(buildDefaultItinerary([trip.regionId], trip.days, startDate));
  };

  // Toggle activity chip in step 3
  const toggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  // Re-sync days count
  const syncDaysCount = (newCount: number) => {
    setNumDays(newCount);
    setBuilderDays(buildDefaultItinerary(selectedRegions, newCount, startDate));
  };

  // Move day up/down in step 4
  const moveDay = (index: number, direction: "up" | "down") => {
    setBuilderDays((prev) => {
      const copy = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy.map((item, idx) => ({ ...item, dayNum: idx + 1 }));
    });
  };

  // Delete day in step 4
  const deleteDay = (index: number) => {
    setBuilderDays((prev) => {
      if (prev.length <= 1) return prev;
      const copy = prev.filter((_, idx) => idx !== index);
      return copy.map((item, idx) => ({ ...item, dayNum: idx + 1 }));
    });
    setNumDays((prev) => Math.max(1, prev - 1));
  };

  // Add a day in step 4
  const addDay = () => {
    setBuilderDays((prev) => {
      const nextNum = prev.length + 1;
      return [
        ...prev,
        {
          id: `d-${Date.now()}`,
          dayNum: nextNum,
          dateStr: `Day ${nextNum}`,
          title: `Explore ${selectedRegions[0] || "Himalayas"}`,
          night: "Local Stay",
          stops: [],
          notes: "",
        },
      ];
    });
    setNumDays((prev) => prev + 1);
  };

  // Step 5 Submit
  const handleBuilderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;
    const refCode = "TE-" + Math.floor(1000 + Math.random() * 9000);
    setBuilderRef(refCode);
    setBuilderSubmitted(true);
  };

  // ------------------------------------------
  // Chat Actions
  // ------------------------------------------
  const handleSelectTrip = (start: (typeof STARTS)[0]) => {
    const key = start.id;
    regionRef.current = key;
    setConversationStage(1);
    stageRef.current = 1;

    setMessages((prev) => [...prev, { id: "user-" + Date.now(), sender: "user", text: start.say }]);
    setIsTyping(true);
    mascotRef.current?.sit();

    const preset = PRESETS[key] || PRESETS.ladakh;

    setActiveTrip({
      title: preset.title,
      region: preset.region,
      days: preset.days,
      stage: 1,
      facts: {
        when:
          key === "spiti"
            ? "June – October"
            : key === "ladakh"
            ? "Summer"
            : key === "kashmir"
            ? "Year-Round"
            : "Spring & Summer",
      },
    });

    setTicketFlash(true);
    setTimeout(() => setTicketFlash(false), 900);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      let chips: string[] = [];

      if (key === "ladakh") {
        replyText =
          "Ladakh in summer is incredible—blue skies, high passes like Khardung La, and stunning lakes like Pangong Tso! Which month are you planning to travel, and how many days do you have in mind?";
        chips = ["June", "July", "August", "September"];
      } else if (key === "spiti") {
        replyText =
          "Spiti Valley is breathtaking! The full circuit via Kunzum Pass is open June to October. Which month are you planning to head out?";
        chips = ["June", "July", "August", "September", "Winter 4x4"];
      } else if (key === "kashmir") {
        replyText =
          "Magical choice! Kashmir with family offers peaceful houseboats on Dal Lake and snow meadows in Gulmarg. Which season suits your family best?";
        chips = ["Spring / Tulips", "Summer", "Autumn", "Winter Snow"];
      } else {
        replyText =
          "Awesome! We have offbeat valley escapes across Himachal, Parvati, and Jibhi. What vibe are you looking for?";
        chips = [
          "Peaceful pine forests & cafés",
          "High adventure & roads",
          "Snow & glaciers",
          "Offbeat culture",
        ];
      }

      setMessages((prev) => [...prev, { id: "bot-" + Date.now(), sender: "bot", text: replyText, chips }]);
      mascotRef.current?.rise(true);
    }, 700);
  };

  const handleChipClick = (chip: string) => {
    setMessages((prev) => [...prev, { id: "user-" + Date.now(), sender: "user", text: chip }]);
    setIsTyping(true);
    mascotRef.current?.sit();

    const currentKey = regionRef.current;
    const preset = PRESETS[currentKey] || PRESETS.ladakh;
    const curStage = stageRef.current;

    setTimeout(() => {
      setIsTyping(false);

      if (curStage === 1) {
        stageRef.current = 2;
        setConversationStage(2);
        setActiveTrip((prev) => ({
          title: prev?.title || preset.title,
          region: prev?.region || preset.region,
          days: preset.days,
          stage: 2,
          facts: { ...prev?.facts, when: chip },
        }));
        setTicketFlash(true);
        setTimeout(() => setTicketFlash(false), 800);

        setMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `${chip} is a fantastic time for ${preset.region} as all the high mountain passes and roads are fully open. How many days are you planning for this trip, and how many people are travelling?`,
            chips: ["6 Days", "8 Days", "10 Days", "Couple trip"],
          },
        ]);
      } else if (curStage === 2) {
        stageRef.current = 3;
        setConversationStage(3);
        const daysNum = chip.includes("6") ? 6 : chip.includes("10") ? 10 : 8;

        setActiveTrip((prev) => ({
          title: prev?.title || preset.title,
          region: prev?.region || preset.region,
          days: daysNum,
          stage: 3,
          facts: { ...prev?.facts, length: `${daysNum} days` },
        }));
        setTicketFlash(true);
        setTimeout(() => setTicketFlash(false), 800);

        setMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `${daysNum} days is a great length for ${preset.region}. Who is travelling with you (e.g. friends, family, couple), and which city will you be starting your journey from?`,
            chips: ["Group of friends", "Couple trip", "Family with kids", "Solo trip"],
          },
        ]);
      } else if (curStage === 3) {
        stageRef.current = 4;
        setConversationStage(4);
        const whoText = chip.includes("friend")
          ? "4 adults · friends"
          : chip.includes("Couple")
          ? "2 adults · couple"
          : chip.includes("Family")
          ? "Family with kids"
          : "Solo traveler";

        setActiveTrip((prev) => ({
          title: prev?.title || preset.title,
          region: prev?.region || preset.region,
          days: prev?.days || preset.days,
          stage: 4,
          facts: { ...prev?.facts, who: whoText },
        }));
        setTicketFlash(true);
        setTimeout(() => setTicketFlash(false), 800);

        setMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `Awesome, a ${chip.toLowerCase()} to ${preset.region} will be unforgettable! Which city will you be starting from?`,
            chips: [
              "Starting from Delhi",
              "Starting from Chandigarh",
              "Fly direct into Leh / Srinagar",
              "Starting from Mumbai",
            ],
          },
        ]);
      } else if (curStage === 4) {
        stageRef.current = 5;
        setConversationStage(5);
        const fromCity = chip.includes("Delhi")
          ? "Delhi"
          : chip.includes("Chandigarh")
          ? "Chandigarh"
          : chip.includes("Mumbai")
          ? "Mumbai"
          : "Leh / Srinagar";

        setActiveTrip((prev) => ({
          title: prev?.title || preset.title,
          region: prev?.region || preset.region,
          days: prev?.days || preset.days,
          stage: 5,
          facts: { ...prev?.facts, from: fromCity },
        }));
        setTicketFlash(true);
        setTimeout(() => setTicketFlash(false), 800);

        setMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `Starting from ${fromCity} works great! Would you prefer comfortable hotels, traditional homestays, or a mix of both?`,
            chips: [
              "Traditional homestays",
              "Comfortable hotels",
              "Mix of homestays & hotels",
              "Camping along the way",
            ],
          },
        ]);
      } else if (curStage === 5) {
        stageRef.current = 6;
        setConversationStage(6);
        const staysVal = chip.includes("homestay")
          ? "Traditional Homestays & Camps"
          : chip.includes("hotel")
          ? "Comfortable Hotels & Resorts"
          : "Mix of Homestays & Hotels";

        setActiveTrip((prev) => ({
          title: prev?.title || preset.title,
          region: prev?.region || preset.region,
          days: prev?.days || preset.days,
          stage: 5,
          facts: { ...prev?.facts, stays: staysVal },
        }));
        setTicketFlash(true);
        setTimeout(() => setTicketFlash(false), 800);

        setMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `${chip} give you the best local experience in ${preset.region}! Since you're traveling for ${
              activeTrip?.days || preset.days
            } days, would you prefer an SUV like a Scorpio / Xylo or a Tempo Traveller for your group?`,
            chips: ["SUV (Scorpio / Xylo)", "Tempo Traveller", "Private 4x4 Fortuner"],
          },
        ]);
      } else {
        stageRef.current = 7;
        setConversationStage(7);
        const transportVal = chip.includes("Tempo") ? "Tempo Traveller" : "SUV (Scorpio / Xylo)";

        setActiveTrip((prev) => ({
          title: preset.title,
          region: preset.region,
          days: prev?.days || preset.days,
          stage: 6,
          route: preset.route,
          facts: {
            when: prev?.facts.when || preset.when,
            length: `${prev?.days || preset.days} days`,
            who: prev?.facts.who || "4 adults · friends",
            from: prev?.facts.from || "Delhi",
            transport: transportVal,
            stays: prev?.facts.stays || preset.facts.stays,
          },
          itinerary: preset.itinerary,
        }));
        setTicketFlash(true);
        setTimeout(() => setTicketFlash(false), 1200);

        const daysCount = activeTrip?.days || preset.days;
        const routeSummary = `${preset.route[0]} → ${preset.route[preset.route.length - 1]}`;

        setMessages((prev) => [
          ...prev,
          {
            id: "bot-" + Date.now(),
            sender: "bot",
            text: `Here is an ${daysCount}-day itinerary for your group, covering ${preset.region}'s highest passes, scenic valleys and blue lakes with ${
              activeTrip?.facts.stays || preset.facts.stays
            } and a ${transportVal}.\n\nYour day-by-day plan is now updated on your trip ticket! What do you think of this route?`,
            planUpdate: {
              days: daysCount,
              title: preset.title,
              route: routeSummary,
            },
            showBudgetCard: true,
            chips: ["Looks perfect! Lock it in", "Add Turtuk village", "Customise stops", "Change duration"],
          },
        ]);
      }
      mascotRef.current?.rise(true);
    }, 700);
  };

  const handleSetBudget = () => {
    setActiveTrip((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        facts: { ...prev.facts, budget: `₹${budgetVal.toLocaleString("en-IN")} per person` },
      };
    });
    setTicketFlash(true);
    setTimeout(() => setTicketFlash(false), 800);

    setMessages((prev) => [
      ...prev,
      {
        id: "user-" + Date.now(),
        sender: "user",
        text: `Budget: ₹${budgetVal.toLocaleString("en-IN")} per person`,
      },
      {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: `Got it! I've set your budget to ₹${budgetVal.toLocaleString(
          "en-IN"
        )} per person. Tap "Send to our team →" whenever you're ready and our trip expert will call you with the exact customized group quote!`,
        chips: ["Send to our team →", "Ask a question", "Change stops"],
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const query = inputText.trim();
    setInputText("");

    if (stageRef.current === 0) {
      let matched = STARTS[1];
      const lower = query.toLowerCase();
      if (lower.includes("spiti")) matched = STARTS[0];
      else if (lower.includes("kashmir")) matched = STARTS[2];
      else if (lower.includes("himachal") || lower.includes("manali")) matched = STARTS[3];
      handleSelectTrip(matched);
    } else {
      handleChipClick(query);
    }
  };

  const handleRestart = () => {
    setWelcomeKey((prev) => prev + 1);
    setMessages([
      { id: "msg-1", sender: "bot", text: "Hey! I'm your Trail Explorers trip planner 👋" },
      { id: "msg-2", sender: "bot", text: "Where are the mountains calling you?" },
      {
        id: "msg-3",
        sender: "bot",
        text: "Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price.",
      },
    ]);
    setActiveTrip(null);
    setConversationStage(0);
    stageRef.current = 0;
    regionRef.current = "ladakh";
    setInputText("");
    setIsTyping(false);
    setMobileTicketOpen(false);
    mascotRef.current?.idle();
    welcomeMascotRef.current?.idle();
  };

  // Reusable ticket body component for desktop right column and mobile slide-up sheet
  const renderTicketContent = () => (
    <>
      {!activeTrip ? (
        <div className="my-auto text-center py-10 px-2 flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-10 mx-auto mb-2 flex items-center justify-center">
            <svg viewBox="0 0 48 38" className="w-full h-full text-white/90" fill="none">
              <path d="M18 4L2 34H34L18 4Z" fill="#505045" />
              <path d="M32 10L18 34H46L32 10Z" fill="#383830" />
              <path d="M18 4L12 15L15 14L18 17L21 13L24 15L18 4Z" fill="#ffffff" />
              <path d="M32 10L27 19L29.5 18L32 21L34.5 18L37 19L32 10Z" fill="#ffffff" />
            </svg>
          </div>
          <p className="text-[13.5px] text-white/65 max-w-[240px] leading-relaxed mx-auto">
            Tell our trip planner where and when you want to go.
            <br />
            Your route, dates and day-by-day plan appear here as you chat.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-pc-pop">
          {activeTrip.stage === 6 && activeTrip.route && (
            <div className="flex flex-wrap items-center gap-1.5">
              {activeTrip.route.map((stop, i) => (
                <React.Fragment key={i}>
                  <span
                    className={`text-[11px] sm:text-[11.5px] font-bold px-2.5 py-1 rounded-full border ${
                      i === 0 || i === (activeTrip.route?.length || 0) - 1
                        ? "bg-[#d6ff3f] text-[#14140f] border-[#d6ff3f]"
                        : "bg-white/10 text-white/90 border-white/15"
                    }`}
                  >
                    {stop}
                  </span>
                  {i < (activeTrip.route?.length || 0) - 1 && (
                    <span className="w-2.5 h-[1.5px] bg-white/30 rounded-full" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs">
            {activeTrip.facts.when && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">When</span>
                <strong className="text-white text-xs mt-0.5 block">{activeTrip.facts.when}</strong>
              </div>
            )}
            {activeTrip.facts.length && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Length</span>
                <strong className="text-white text-xs mt-0.5 block">{activeTrip.facts.length}</strong>
              </div>
            )}
            {activeTrip.facts.who && (
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Who</span>
                <strong className="text-white text-xs mt-0.5 block">{activeTrip.facts.who}</strong>
              </div>
            )}
            {activeTrip.facts.from && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">From</span>
                <strong className="text-white text-xs mt-0.5 block">{activeTrip.facts.from}</strong>
              </div>
            )}
            {activeTrip.facts.transport && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Transport</span>
                <strong className="text-white text-xs mt-0.5 block">{activeTrip.facts.transport}</strong>
              </div>
            )}
            {activeTrip.facts.stays && (
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Stays</span>
                <strong className="text-white text-xs mt-0.5 block truncate">{activeTrip.facts.stays}</strong>
              </div>
            )}
            {activeTrip.facts.budget && (
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6ff3f] block">Budget</span>
                <strong className="text-[#d6ff3f] text-xs mt-0.5 block">{activeTrip.facts.budget}</strong>
              </div>
            )}
          </div>

          {activeTrip.stage === 6 && activeTrip.itinerary && (
            <div>
              <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-white/50 block mb-2">
                Day by day
              </span>
              <div className="flex flex-col gap-2">
                {activeTrip.itinerary.map((dayItem) => (
                  <details
                    key={dayItem.day}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <summary className="flex items-center gap-2.5 p-2.5 text-[12.5px] sm:text-[13px] font-bold list-none group-open:bg-white/10 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-[#d6ff3f] text-[#14140f] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                        {dayItem.day}
                      </span>
                      <span className="flex-1 text-white leading-tight">{dayItem.title}</span>
                    </summary>
                    <div className="px-3 pb-3 pt-1 text-[11.5px] sm:text-[12px] text-white/75 flex flex-col gap-1 border-t border-white/5">
                      <div>
                        <em className="not-italic font-bold text-white/95 mr-1.5">Stops:</em>
                        <span>{dayItem.stops}</span>
                      </div>
                      <p className="m-0 leading-relaxed text-white/70">{dayItem.desc}</p>
                      <div>
                        <em className="not-italic font-bold text-white/95 mr-1.5">Night:</em>
                        <span className="text-[#d6ff3f]">{dayItem.night}</span>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  // Computed names for wizard mode
  const activeRegionNames = useMemo(
    () => selectedRegions.map((id) => BUILDER_REGIONS.find((r) => r.id === id)?.name || id).join(" + "),
    [selectedRegions]
  );
  const stayLabel = BUILDER_STAYS.find((s) => s.id === stayStyle)?.label || "Comfort";
  const transportLabel = BUILDER_VEHICLES.find((t) => t.id === transportStyle)?.label || "Suggest for me";
  const paceLabel = BUILDER_PACES.find((p) => p.id === paceStyle)?.label || "Balanced";

  // Reusable Builder Live Ticket Card Body (for desktop right column & mobile sheet)
  const renderBuilderLiveTicket = () => (
    <div className="flex flex-col gap-4 text-white">
      {/* Route & Regions pill badge */}
      <div className="flex items-center gap-2">
        <Badge variant="lime" size="sm" className="font-extrabold">
          {numDays} Days
        </Badge>
        <span className="text-xs font-bold text-white/90 truncate">{activeRegionNames}</span>
      </div>

      {/* Facts grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Start Date</span>
          <strong className="text-white text-xs mt-0.5 block truncate">
            {startDate} {flexibleDates && <span className="text-[#d6ff3f] font-normal">(Flexible)</span>}
          </strong>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Travellers</span>
          <strong className="text-white text-xs mt-0.5 block truncate">
            {adults} Adults{children > 0 ? `, ${children} Ch.` : ""}
          </strong>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Group Type</span>
          <strong className="text-white text-xs mt-0.5 block truncate">{groupType}</strong>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">From</span>
          <strong className="text-white text-xs mt-0.5 block truncate">{startCity}</strong>
        </div>

        <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Style & Transport</span>
          <strong className="text-white text-xs mt-0.5 block truncate">
            {stayLabel} Stays · {transportLabel} · {paceLabel}
          </strong>
        </div>

        {selectedActivities.length > 0 && (
          <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
              Activities ({selectedActivities.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {selectedActivities.slice(0, 4).map((act) => (
                <span key={act} className="text-[10.5px] px-2 py-0.5 rounded-full bg-white/10 text-white/90">
                  {act}
                </span>
              ))}
              {selectedActivities.length > 4 && (
                <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-white/10 text-[#d6ff3f]">
                  +{selectedActivities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Days Outline */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-white/50 block">
            Day-by-Day Outline ({builderDays.length} days)
          </span>
          <button
            type="button"
            onClick={() => {
              setWizardStep(3);
              setBuilderTicketDrawerOpen(false);
            }}
            className="text-[11px] font-bold text-[#d6ff3f] hover:underline cursor-pointer"
          >
            Edit days →
          </button>
        </div>

        <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto ticket-scroll pr-1">
          {builderDays.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-[#d6ff3f] text-[#14140f] font-extrabold text-[10px] flex items-center justify-center shrink-0">
                {d.dayNum}
              </span>
              <span className="text-white/90 font-medium truncate flex-1">{d.title}</span>
              {d.night && <span className="text-[10.5px] text-[#d6ff3f] shrink-0">{d.night}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==========================================
  // RENDER: STEP-BY-STEP BUILDER WIZARD MODE
  // ==========================================
  if (stepMode) {
    return (
      <div className="min-h-screen bg-[#fbfbf8] text-[#14140f] font-sans pb-24 sm:pb-16 selection:bg-[#d6ff3f] selection:text-[#14140f] relative">
        {/* Single Full-Page Fixed Background */}
        <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
          <picture className="w-full h-full block">
            <source
              media="(max-width: 767px)"
              srcSet="/assets/images/hero_pack/Community_Trips/03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP/05_Group_Resting_Viewpoint_mobile_fade.webp"
              type="image/webp"
            />
            <img
              src="/assets/images/hero_pack/Community_Trips/01_DESKTOP_1920x900_WHITE_FADE_WEBP/05_Group_Resting_Viewpoint_desktop.webp"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-[right_top]"
            />
          </picture>
        </div>

        <div className="relative z-10">
          {/* Intro Header & Planner Mode Switcher */}
          <section className="pt-8 sm:pt-14 pb-6 px-4 text-center max-w-[860px] mx-auto select-none">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-block bg-[#14140f] text-[#d6ff3f] text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs">
                Private trip planner
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#14140f] font-heading leading-tight">
              Plan your Himalayan trip<span className="text-[#a9cc2a]">.</span>
            </h1>

            <p className="mt-2.5 text-xs sm:text-sm md:text-base text-[#6b6b63] max-w-xl mx-auto leading-relaxed">
              Shape your custom itinerary step by step. Our trip expert will review your route, timings, and preferences,
              then call you with an exact customized price for your group.
            </p>

            {/* Mode Switcher Tabs & Reset Action */}
            <div className="mt-5 inline-flex items-center gap-2 flex-wrap justify-center">
              <div className="inline-flex items-center p-1 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset]">
                <button
                  type="button"
                  onClick={() => setStepMode(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all text-[#6b6b63] hover:text-[#14140f] cursor-pointer"
                >
                  <MessageCircleMore className="w-4 h-4" />
                  <span>Chat Planner</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStepMode(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all bg-[#14140f] text-[#d6ff3f] shadow-sm cursor-default"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>Step-by-Step Form</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetBuilder}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#14140f] hover:bg-white/80 border border-white/80 bg-white/60 backdrop-blur-md transition-all cursor-pointer shadow-xs"
                title="Reset all selections and start fresh"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset plan</span>
              </button>
            </div>
          </section>

        {/* Wizard Main Shell */}
        <div className="max-w-[1240px] mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
            {/* Left Column: Form & Stepper */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-[24px] sm:rounded-[28px] shadow-[0_16px_45px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] p-4 sm:p-8 md:p-10 min-w-0">
              {/* Responsive Progress Stepper */}
              <div className="mb-6 sm:mb-8">
                {/* Mobile View: Step Count Pill & Continuous Line (<640px) */}
                <div className="sm:hidden flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#6b6b63]">
                      Step {wizardStep + 1} of 5
                    </span>
                    <strong className="text-xs font-bold text-[#14140f]">
                      {[
                        "Where to go",
                        "When & who's coming",
                        "Travel style & pace",
                        "Day by day itinerary",
                        "Review & quote",
                      ][wizardStep]}
                    </strong>
                  </div>

                  <div className="w-full bg-[#f0f0eb] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#14140f] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${((wizardStep + 1) / 5) * 100}%` }}
                    />
                  </div>

                  {/* Horizontal Touch Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
                    {[
                      { num: 1, label: "Where" },
                      { num: 2, label: "When & Who" },
                      { num: 3, label: "Style" },
                      { num: 4, label: "Days" },
                      { num: 5, label: "Send" },
                    ].map((st, idx) => {
                      const isActive = wizardStep === idx;
                      const isDone = wizardStep > idx;
                      return (
                        <button
                          key={st.num}
                          type="button"
                          onClick={() => isDone && setWizardStep(idx)}
                          disabled={!isDone && !isActive}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                            isActive
                              ? "bg-[#14140f] text-white"
                              : isDone
                              ? "bg-[#f0f0eb] text-[#14140f] hover:bg-[#e4e4dd]"
                              : "text-[#a0a095] cursor-not-allowed opacity-50"
                          }`}
                        >
                          {isDone ? `✓ ${st.label}` : `${st.num}. ${st.label}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tablet / Desktop Stepper (>=640px) */}
                <ol className="hidden sm:grid grid-cols-5 gap-2 md:gap-3 list-none p-0">
                  {[
                    { num: 1, label: "Where" },
                    { num: 2, label: "When & who" },
                    { num: 3, label: "Style" },
                    { num: 4, label: "Day by day" },
                    { num: 5, label: "Send & Quote" },
                  ].map((step, idx) => {
                    const isActive = wizardStep === idx;
                    const isDone = wizardStep > idx;
                    return (
                      <li
                        key={step.num}
                        onClick={() => {
                          if (isDone) setWizardStep(idx);
                        }}
                        className={`pt-2.5 border-t-[3.5px] transition-all ${
                          isActive
                            ? "border-[#14140f] text-[#14140f]"
                            : isDone
                            ? "border-[#d6ff3f] text-[#14140f] cursor-pointer"
                            : "border-[#e6e6df] text-[#a0a095]"
                        }`}
                      >
                        <span className="text-xs md:text-[13px] font-bold block truncate">
                          {isDone ? "✓ " : `${step.num}. `}
                          {step.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* STEP 1: WHERE / EXPERIENCES & DESTINATIONS */}
              {wizardStep === 0 && (
                <div className="flex flex-col gap-6 animate-pc-pop">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#14140f] font-heading">
                      Where in the Himalayas?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
                      Choose from our curated trip routes, or handpick one or more destinations to create your own
                      circuit.
                    </p>
                  </div>

                  {/* Sub-Tabs: Curated Trips vs Browse by Region */}
                  <div className="flex items-center gap-2 p-1 bg-[#f6f6f1] rounded-xl w-fit border border-[#e2e2dc]">
                    <button
                      type="button"
                      onClick={() => setStep1ViewMode("trips")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        step1ViewMode === "trips"
                          ? "bg-white text-[#14140f] shadow-xs"
                          : "text-[#6b6b63] hover:text-[#14140f]"
                      }`}
                    >
                      Popular Trip Starters
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep1ViewMode("regions")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        step1ViewMode === "regions"
                          ? "bg-white text-[#14140f] shadow-xs"
                          : "text-[#6b6b63] hover:text-[#14140f]"
                      }`}
                    >
                      Browse by Destination ({selectedRegions.length} picked)
                    </button>
                  </div>

                  {/* View 1: Curated Trip Cards */}
                  {step1ViewMode === "trips" && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {CURATED_TRIP_STARTERS.map((trip) => {
                          const isSelected = selectedCuratedTrip === trip.id;
                          return (
                            <SelectionCard
                              key={trip.id}
                              selected={isSelected}
                              onClick={() => selectCuratedTrip(trip)}
                              title={trip.title}
                              description={trip.tagline}
                              badge={trip.badge}
                              image={trip.image}
                              aspectRatio="auto"
                            />
                          );
                        })}
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#f6f6f1] border border-[#e2e2dc] flex items-center justify-between text-xs">
                        <span className="text-[#6b6b63]">Want to select specific destinations instead?</span>
                        <button
                          type="button"
                          onClick={() => setStep1ViewMode("regions")}
                          className="font-bold text-[#14140f] hover:underline cursor-pointer"
                        >
                          View all destinations →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* View 2: Destination Cards */}
                  {step1ViewMode === "regions" && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5">
                        {BUILDER_REGIONS.map((reg) => {
                          const isSelected = selectedRegions.includes(reg.id);
                          return (
                            <SelectionCard
                              key={reg.id}
                              selected={isSelected}
                              onClick={() => toggleRegion(reg.id)}
                              title={reg.name}
                              description={reg.tagline}
                              image={reg.image}
                              aspectRatio="auto"
                            />
                          );
                        })}
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#f6f6f1] border border-[#e2e2dc] flex items-center justify-between text-xs">
                        <span className="font-bold text-[#14140f]">
                          Selected: {activeRegionNames} ({selectedRegions.length} destination
                          {selectedRegions.length > 1 ? "s" : ""})
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep1ViewMode("trips")}
                          className="font-bold text-[#6b6b63] hover:text-black cursor-pointer"
                        >
                          Back to trips
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step Action Bar */}
                  <div className="flex justify-end pt-6 border-t border-[#f0f0eb] mt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setWizardStep(1)}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Next: Dates & Travellers
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: WHEN & WHO */}
              {wizardStep === 1 && (
                <div className="flex flex-col gap-6 animate-pc-pop">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#14140f] font-heading">
                      When, how long & who&apos;s coming?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
                      Choose your preferred dates, total duration, and traveller count.
                    </p>
                  </div>

                  {/* Row 1: Start date & Flexible Checkbox */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <CustomCalendarPicker
                        label="When do you want to start?"
                        value={startDate}
                        onChange={(newDate: string) => {
                          setStartDate(newDate);
                          setBuilderDays(buildDefaultItinerary(selectedRegions, numDays, newDate));
                        }}
                        placeholder="Select start date"
                        format="iso"
                      />

                      <Checkbox
                        checked={flexibleDates}
                        onCheckedChange={setFlexibleDates}
                        label="My travel dates are flexible (±3 days)"
                        description="Helps us find the best weather windows & group rates"
                        className="mt-1"
                      />
                    </div>

                    {/* Trip Duration Slider & Presets */}
                    <div className="flex flex-col justify-between gap-3 p-4 rounded-2xl bg-[#f6f6f1] border-2 border-[#e2e2dc]">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#14140f] uppercase tracking-wider">Trip Duration</span>
                        <Badge variant="lime" size="md">
                          {numDays} Days
                        </Badge>
                      </div>

                      <input
                        type="range"
                        min={2}
                        max={21}
                        value={numDays}
                        onChange={(e) => syncDaysCount(Number(e.target.value))}
                        className="w-full h-2.5 bg-[#e2e2dc] rounded-lg appearance-none cursor-pointer accent-[#14140f]"
                      />

                      {/* Quick Presets */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[5, 7, 8, 10, 12, 14].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => syncDaysCount(d)}
                            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-colors cursor-pointer ${
                              numDays === d
                                ? "bg-[#14140f] text-white border-[#14140f]"
                                : "bg-white text-[#14140f] border-[#e2e2dc] hover:border-black"
                            }`}
                          >
                            {d}D
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Standard Traveller Counters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <TravellerCounter
                      label="Adults"
                      description="Age 12+"
                      value={adults}
                      onChange={setAdults}
                      min={1}
                      max={30}
                    />

                    <TravellerCounter
                      label="Children"
                      description="Under 12 years"
                      value={children}
                      onChange={setChildren}
                      min={0}
                      max={20}
                    />
                  </div>

                  {/* Row 3: Who's travelling Selection */}
                  <div className="flex flex-col gap-2.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-[#14140f]">Who&apos;s travelling?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {GROUP_TYPES.map((type) => {
                        const isSel = groupType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setGroupType(type.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                              isSel
                                ? "bg-[#14140f] text-white border-[#14140f] shadow-xs"
                                : "bg-white text-[#14140f] border-[#e2e2dc] hover:border-black"
                            }`}
                          >
                            <span className="text-xs font-bold">{type.label}</span>
                            <span className={`text-[10px] mt-0.5 ${isSel ? "text-white/70" : "text-[#6b6b63]"}`}>
                              {type.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Standard Select for Starting City */}
                  <div className="pt-1 max-w-md">
                    <Select
                      label="Where will you start from?"
                      value={startCity}
                      onChange={(e) => setStartCity(e.target.value)}
                      options={BUILDER_START_CITIES.map((c) => ({ label: c, value: c }))}
                    />
                  </div>

                  {/* Step Action Bar */}
                  <div className="flex justify-between items-center pt-6 border-t border-[#f0f0eb] mt-2">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setWizardStep(0)}
                      leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setWizardStep(2)}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Next: Travel Style
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: STYLE */}
              {wizardStep === 2 && (
                <div className="flex flex-col gap-6 animate-pc-pop">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#14140f] font-heading">
                      How do you like to travel?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
                      Customize your accommodation tier, vehicle preference, pace, and wishlist activities.
                    </p>
                  </div>

                  {/* Section 1: Stays using Standard SelectionCard */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-bold text-[#14140f] uppercase tracking-wider flex items-center gap-1.5">
                      <Bed className="w-4 h-4" />
                      <span>Stay Style</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {BUILDER_STAYS.map((s) => (
                        <SelectionCard
                          key={s.id}
                          selected={stayStyle === s.id}
                          onClick={() => setStayStyle(s.id)}
                          title={s.label}
                          description={s.desc}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Getting around using Standard SelectionCard */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <span className="text-xs font-bold text-[#14140f] uppercase tracking-wider flex items-center gap-1.5">
                      <Car className="w-4 h-4" />
                      <span>Getting Around (Vehicle)</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                      {BUILDER_VEHICLES.map((v) => (
                        <SelectionCard
                          key={v.id}
                          selected={transportStyle === v.id}
                          onClick={() => setTransportStyle(v.id)}
                          title={v.label}
                          description={v.desc}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Pace using Standard SelectionCard */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <span className="text-xs font-bold text-[#14140f] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Travel Pace</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {BUILDER_PACES.map((p) => (
                        <SelectionCard
                          key={p.id}
                          selected={paceStyle === p.id}
                          onClick={() => setPaceStyle(p.id)}
                          title={p.label}
                          description={p.desc}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Activities Chips */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <span className="text-xs font-bold text-[#14140f] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#2fa84f]" />
                      <span>Things you&apos;d love to do (optional)</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {BUILDER_ACTIVITIES.map((act) => {
                        const isSel = selectedActivities.includes(act);
                        return (
                          <button
                            key={act}
                            type="button"
                            onClick={() => toggleActivity(act)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border-2 transition-all cursor-pointer ${
                              isSel
                                ? "bg-[#14140f] text-[#d6ff3f] border-[#14140f] shadow-xs"
                                : "bg-white text-[#14140f] border-[#e2e2dc] hover:border-black"
                            }`}
                          >
                            {isSel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            <span>{act}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step Action Bar */}
                  <div className="flex justify-between items-center pt-6 border-t border-[#f0f0eb] mt-2">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setWizardStep(1)}
                      leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setWizardStep(3)}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Next: Day by Day Plan
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 4: DAY BY DAY ITINERARY BUILDER */}
              {wizardStep === 3 && (
                <div className="flex flex-col gap-6 animate-pc-pop">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#14140f] font-heading">
                      Shape it day by day
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
                      Start from our suggested route and tweak nights, activities or notes. Our expert will fine-tune
                      timings with you on the call.
                    </p>
                  </div>

                  {/* Quick Starter Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setBuilderDays(buildDefaultItinerary(selectedRegions, numDays, startDate))}
                      className="p-3.5 rounded-xl border-2 border-dashed border-[#c9c9bf] hover:border-black text-left flex flex-col gap-1 bg-[#fcfcf9] transition-colors cursor-pointer"
                    >
                      <strong className="text-xs sm:text-sm font-bold text-[#14140f]">Reset to classic route</strong>
                      <span className="text-[11px] text-[#6b6b63]">Auto-fills based on places you picked</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const ladakhPlan = buildDefaultItinerary(["ladakh"], numDays, startDate);
                        setBuilderDays(ladakhPlan);
                      }}
                      className="p-3.5 rounded-xl border-2 border-dashed border-[#c9c9bf] hover:border-black text-left flex flex-col gap-1 bg-[#fcfcf9] transition-colors cursor-pointer"
                    >
                      <strong className="text-xs sm:text-sm font-bold text-[#14140f]">Load Ladakh circuit</strong>
                      <span className="text-[11px] text-[#6b6b63]">Leh, Nubra Dunes & Pangong Tso</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setBuilderDays((prev) =>
                          prev.map((d) => ({
                            ...d,
                            title: `Custom Day ${d.dayNum}`,
                            night: "",
                            notes: "",
                          }))
                        );
                      }}
                      className="p-3.5 rounded-xl border-2 border-dashed border-[#c9c9bf] hover:border-black text-left flex flex-col gap-1 bg-[#fcfcf9] transition-colors cursor-pointer"
                    >
                      <strong className="text-xs sm:text-sm font-bold text-[#14140f]">Start clean</strong>
                      <span className="text-[11px] text-[#6b6b63]">Write your own daily stops</span>
                    </button>
                  </div>

                  {/* Day Cards List */}
                  <div className="flex flex-col gap-3.5">
                    {builderDays.map((dayItem, idx) => (
                      <Card key={dayItem.id} className="overflow-hidden border-2 border-[#e2e2dc] bg-white">
                        {/* Day Header */}
                        <div className="flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2.5 bg-[#f6f6f1] border-b border-[#e2e2dc]">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-[#14140f] text-[#d6ff3f] text-xs font-extrabold">
                              Day {dayItem.dayNum}
                            </span>
                            <span className="text-[11px] sm:text-xs text-[#6b6b63] font-semibold">
                              {dayItem.dateStr}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0 mx-2">
                            <input
                              type="text"
                              value={dayItem.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setBuilderDays((prev) =>
                                  prev.map((d, i) => (i === idx ? { ...d, title: val } : d))
                                );
                              }}
                              placeholder="Title of this day"
                              className="w-full font-bold text-xs sm:text-sm text-[#14140f] bg-transparent border-b border-transparent hover:border-[#14140f] focus:border-[#14140f] outline-none px-1 py-0.5 truncate"
                            />
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveDay(idx, "up")}
                              title="Move day up"
                              className="w-8 h-8 rounded-lg border border-[#e2e2dc] flex items-center justify-center text-xs hover:border-black hover:bg-white disabled:opacity-30 cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === builderDays.length - 1}
                              onClick={() => moveDay(idx, "down")}
                              title="Move day down"
                              className="w-8 h-8 rounded-lg border border-[#e2e2dc] flex items-center justify-center text-xs hover:border-black hover:bg-white disabled:opacity-30 cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteDay(idx)}
                              title="Delete day"
                              className="w-8 h-8 rounded-lg border border-[#e2e2dc] flex items-center justify-center text-xs hover:border-red-500 hover:bg-red-50 text-red-500 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Day Content Body */}
                        <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <Input
                            label="Night stay"
                            value={dayItem.night}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBuilderDays((prev) =>
                                prev.map((d, i) => (i === idx ? { ...d, night: val } : d))
                              );
                            }}
                            placeholder="Town or hotel location"
                          />

                          <Input
                            label="Places & things to do"
                            placeholder="Add places or activities"
                            defaultValue={dayItem.stops.join(", ")}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBuilderDays((prev) =>
                                prev.map((d, i) =>
                                  i === idx
                                    ? {
                                        ...d,
                                        stops: val
                                          .split(",")
                                          .map((s) => s.trim())
                                          .filter(Boolean),
                                      }
                                    : d
                                )
                              );
                            }}
                          />

                          <div className="sm:col-span-2">
                            <Textarea
                              label="Notes"
                              rows={2}
                              value={dayItem.notes}
                              onChange={(e) => {
                                const val = e.target.value;
                                setBuilderDays((prev) =>
                                  prev.map((d, i) => (i === idx ? { ...d, notes: val } : d))
                                );
                              }}
                              placeholder="Anything special for this day (altitude acclimatization, birthday surprise, special stops)..."
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={addDay}
                      leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
                    >
                      Add a Day
                    </Button>
                  </div>

                  {/* Step Action Bar */}
                  <div className="flex justify-between items-center pt-6 border-t border-[#f0f0eb] mt-2">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setWizardStep(2)}
                      leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setWizardStep(4)}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Next: Review & Quote
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & SEND */}
              {wizardStep === 4 && (
                <div className="flex flex-col gap-6 animate-pc-pop">
                  {!builderSubmitted ? (
                    <form onSubmit={handleBuilderSubmit} className="flex flex-col gap-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#14140f] font-heading">
                          Your trip, ready to send
                        </h2>
                        <p className="text-xs sm:text-sm text-[#6b6b63] mt-1">
                          Review your customized itinerary summary, tell us how to reach you, and our expert will call
                          with the group price.
                        </p>
                      </div>

                      {/* Summary Review Boarding Pass */}
                      <Card className="border-2 border-[#14140f] overflow-hidden bg-white text-xs shadow-card">
                        <div className="p-3.5 sm:p-4 bg-[#14140f] text-white flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-[#d6ff3f]" />
                            <span className="font-extrabold uppercase tracking-wider text-[11px] text-[#d6ff3f]">
                              Trip Summary Review
                            </span>
                          </div>
                          <span className="text-xs text-white/70 font-semibold">{numDays} Days Itinerary</span>
                        </div>

                        <div className="divide-y divide-[#eeeee7]">
                          <div className="flex items-center justify-between p-3.5 sm:p-4">
                            <span className="font-bold text-[#6b6b63] w-24">Destination</span>
                            <strong className="flex-1 text-[#14140f] font-bold text-xs sm:text-sm">
                              {activeRegionNames}
                            </strong>
                            <button
                              type="button"
                              onClick={() => setWizardStep(0)}
                              className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer text-[#14140f]"
                            >
                              Edit
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-3.5 sm:p-4">
                            <span className="font-bold text-[#6b6b63] w-24">When</span>
                            <span className="flex-1 text-[#14140f] font-medium text-xs">
                              {startDate} · {numDays} days {flexibleDates ? "(Dates flexible)" : ""}
                            </span>
                            <button
                              type="button"
                              onClick={() => setWizardStep(1)}
                              className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer text-[#14140f]"
                            >
                              Edit
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-3.5 sm:p-4">
                            <span className="font-bold text-[#6b6b63] w-24">Who</span>
                            <span className="flex-1 text-[#14140f] font-medium text-xs">
                              {adults} adults{children > 0 ? `, ${children} child` : ""} · {groupType} · starting from{" "}
                              {startCity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setWizardStep(1)}
                              className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer text-[#14140f]"
                            >
                              Edit
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-3.5 sm:p-4">
                            <span className="font-bold text-[#6b6b63] w-24">Style</span>
                            <span className="flex-1 text-[#14140f] font-medium text-xs truncate">
                              {stayLabel} stays · {transportLabel} · {paceLabel} pace
                            </span>
                            <button
                              type="button"
                              onClick={() => setWizardStep(2)}
                              className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer text-[#14140f]"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </Card>

                      {/* Day by Day Vertical Timeline Preview */}
                      <div className="flex flex-col gap-2 pt-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm sm:text-base text-[#14140f]">Day by day breakdown</h3>
                          <button
                            type="button"
                            onClick={() => setWizardStep(3)}
                            className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer"
                          >
                            Edit days
                          </button>
                        </div>

                        <ol className="relative border-l-2 border-[#14140f] ml-3 pl-4 space-y-3.5 my-2 text-xs">
                          {builderDays.map((d) => (
                            <li key={d.id} className="relative">
                              <span className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#d6ff3f] border-2 border-[#14140f]" />
                              <span className="text-[10px] font-bold text-[#6b6b63] uppercase tracking-wider block">
                                DAY {d.dayNum} · {d.dateStr}
                              </span>
                              <strong className="block text-xs sm:text-sm font-bold text-[#14140f] leading-tight mt-0.5">
                                {d.title}
                              </strong>
                              {d.night && (
                                <span className="text-[#6b6b63] text-[11px] block mt-0.5">
                                  Night: <strong>{d.night}</strong>
                                </span>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Contact Form with Standard Form Controls */}
                      <div className="border-t border-[#e6e6df] pt-6 flex flex-col gap-4 text-xs">
                        <h3 className="text-base sm:text-lg font-bold text-[#14140f]">
                          Where should our trip expert call you?
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="Your Name"
                            required
                            value={custName}
                            onChange={(e) => setCustName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                          />

                          <Input
                            label="WhatsApp / Phone"
                            required
                            type="tel"
                            value={custPhone}
                            onChange={(e) => setCustPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                          />

                          <Input
                            label="Email (optional)"
                            type="email"
                            value={custEmail}
                            onChange={(e) => setCustEmail(e.target.value)}
                            placeholder="rahul@example.com"
                          />

                          <Select
                            label="Best time to call"
                            value={custCallTime}
                            onChange={(e) => setCustCallTime(e.target.value)}
                            options={[
                              { label: "As soon as possible", value: "As soon as possible" },
                              { label: "Morning (10 AM – 1 PM)", value: "Morning (10 AM – 1 PM)" },
                              { label: "Afternoon (1 – 4 PM)", value: "Afternoon (1 – 4 PM)" },
                              { label: "Evening (4 – 7 PM)", value: "Evening (4 – 7 PM)" },
                            ]}
                          />

                          <div className="sm:col-span-2">
                            <Textarea
                              label="Anything else we should know? (optional)"
                              rows={3}
                              value={custNotes}
                              onChange={(e) => setCustNotes(e.target.value)}
                              placeholder="Budget in mind, a birthday on the trip, elderly parents, dietary needs, special photography requests..."
                            />
                          </div>
                        </div>

                        {/* Callback promise banner */}
                        <div className="bg-[#14140f] text-white p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold shadow-xs">
                          <Phone className="w-5 h-5 text-[#d6ff3f] shrink-0" />
                          <span>
                            Our Himalayan trip expert will call you within 24 hours with a customized price and day-by-day
                            route for your group.
                          </span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex justify-between items-center pt-6 border-t border-[#f0f0eb] mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="md"
                          onClick={() => setWizardStep(3)}
                          leftIcon={<ChevronLeft className="w-4 h-4" />}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          rightIcon={<ArrowUpRight className="w-4 h-4 stroke-[2.5]" />}
                        >
                          Send My Itinerary
                        </Button>
                      </div>
                    </form>
                  ) : (
                    /* Done Confirmation Screen */
                    <div className="text-center py-10 flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#d6ff3f] border-2 border-[#14140f] text-[#14140f] flex items-center justify-center font-bold text-3xl shadow-lg">
                        ✓
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f] font-heading">
                        Plan sent to our team!
                      </h2>
                      <p className="text-sm sm:text-base text-[#14140f] max-w-md font-medium leading-relaxed">
                        Our Himalayan trip expert will call you at <strong>{custPhone}</strong>{" "}
                        {custCallTime.toLowerCase()} with a customized price for your {numDays}-day {activeRegionNames}{" "}
                        trip.
                      </p>
                      <span className="text-xs font-bold text-[#6b6b63] bg-[#f0f0eb] px-3 py-1 rounded-full">
                        Reference Code: {builderRef}
                      </span>

                      <div className="flex flex-wrap gap-3 mt-4">
                        <Button
                          variant="dark"
                          size="md"
                          onClick={() => {
                            setBuilderSubmitted(false);
                            setStepMode(false);
                          }}
                        >
                          Back to Trip Planner
                        </Button>
                        <Button
                          variant="whatsapp"
                          size="md"
                          href={`https://wa.me/919876543210?text=Hi%20Trail%20Explorers%2C%20I%20just%20submitted%20trip%20inquiry%20${builderRef}%20for%20${numDays}%20days%20in%20${encodeURIComponent(
                            activeRegionNames
                          )}.`}
                          external
                        >
                          Chat on WhatsApp
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Live Sticky Trip Ticket (Desktop view) */}
            <aside className="hidden lg:block sticky top-24 select-none">
              <div className="bg-[#14140f] text-white rounded-[24px] border-2 border-[#14140f] shadow-2xl overflow-hidden">
                {/* Ticket Head with Cutout Notches */}
                <div className="relative p-5 border-b-2 border-dashed border-white/20">
                  <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#fafaf8] block z-10" />
                  <span className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-[#fafaf8] block z-10" />

                  <div className="flex flex-col gap-1">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#d6ff3f]">
                      Your Live Trip Ticket
                    </span>
                    <strong className="text-lg font-bold text-white leading-tight">
                      {activeRegionNames} Custom Trip
                    </strong>
                    <small className="text-xs text-white/60">
                      {numDays} days · {adults} adults · {stayLabel}
                    </small>
                  </div>
                </div>

                <div className="p-5">{renderBuilderLiveTicket()}</div>

                <div className="p-4 border-t border-white/10 bg-black/30 text-center">
                  <button
                    type="button"
                    onClick={() => setWizardStep(4)}
                    className="w-full py-3 px-4 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Proceed to Review & Quote →
                  </button>
                  <span className="text-[10.5px] text-white/50 block mt-2">
                    No payment required now · expert quote in 24h
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile Sticky Bottom Floating Action Bar (<1024px) */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-2xl border-t border-white/80 p-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] z-40 shadow-[0_-8px_24px_rgba(20,20,15,0.08),0_1px_1px_rgba(255,255,255,0.9)_inset] flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setBuilderTicketDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#14140f] text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-[#d6ff3f]" />
              <span>
                Ticket: {numDays}D · {selectedRegions.length} dest.
              </span>
            </button>

            <div className="flex items-center gap-2">
              {wizardStep > 0 && (
                <button
                  type="button"
                  onClick={() => setWizardStep((prev) => prev - 1)}
                  className="px-4 py-2 rounded-full border-2 border-[#14140f] text-xs font-bold text-[#14140f] bg-white cursor-pointer"
                >
                  Back
                </button>
              )}
              {wizardStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep((prev) => prev + 1)}
                  className="px-5 py-2 rounded-full bg-[#d6ff3f] border-2 border-[#14140f] text-xs font-bold text-[#14140f] shadow-xs cursor-pointer"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBuilderSubmit}
                  className="px-5 py-2 rounded-full bg-[#d6ff3f] border-2 border-[#14140f] text-xs font-bold text-[#14140f] shadow-xs cursor-pointer"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Sheet Modal for Live Ticket */}
        <Modal
          isOpen={builderTicketDrawerOpen}
          onClose={() => setBuilderTicketDrawerOpen(false)}
          title="Your Trip Ticket"
          description="Live summary of your choices so far"
          footer={
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setBuilderTicketDrawerOpen(false);
                setWizardStep(4);
              }}
            >
              Go to Final Review & Quote →
            </Button>
          }
        >
          <div className="bg-[#14140f] p-4 rounded-2xl border border-white/10">{renderBuilderLiveTicket()}</div>
        </Modal>

        {/* Step Mode Full Standard Footer */}
        <footer className="max-w-[1240px] mx-auto px-4 mt-16 pt-10 border-t border-[#e6e6df] text-[#14140f]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#e6e6df]">
            <div className="flex flex-col gap-2.5">
              <Image
                src="/assets/images/logo/logo.svg"
                alt="Trail Explorers"
                width={150}
                height={30}
                className="h-7 w-auto object-contain"
              />
              <p className="text-[11.5px] text-[#6b6b63] leading-relaxed">
                Curated journeys for curious minds. We handle the details so you can focus on the memory.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#6b6b63] mb-2.5">Explore</h4>
              <ul className="space-y-1.5 text-xs text-[#6b6b63] font-medium">
                <li>
                  <Link href="/community-trips" className="hover:text-black">
                    Community Trips
                  </Link>
                </li>
                <li>
                  <Link href="/experiences" className="hover:text-black">
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/plan-your-trip" className="hover:text-black">
                    Plan Your Trip
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#6b6b63] mb-2.5">Company</h4>
              <ul className="space-y-1.5 text-xs text-[#6b6b63] font-medium">
                <li>
                  <Link href="/" className="hover:text-black">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-black">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#6b6b63] mb-2.5">Help</h4>
              <ul className="space-y-1.5 text-xs text-[#6b6b63] font-medium">
                <li>
                  <Link href="/booking-terms" className="hover:text-black">
                    Booking T&amp;C
                  </Link>
                </li>
                <li>
                  <Link href="/cancellation-policy" className="hover:text-black">
                    Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-black">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/payment-details" className="hover:text-black">
                    Payment Details
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-[#6b6b63] pt-6">© 2026 Trail Explorers · Made in India ✦</p>
        </footer>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: CHAT PLANNER MODE (DEFAULT)
  // ==========================================
  return (
    <div className="min-h-screen w-full flex flex-col justify-between font-sans selection:bg-[#d6ff3f] selection:text-[#14140f] relative bg-[#fbfbf8] text-[#14140f]">
      {/* Single Full-Page Fixed Background */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/hero_pack/Community_Trips/03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP/05_Group_Resting_Viewpoint_mobile_fade.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/hero_pack/Community_Trips/01_DESKTOP_1920x900_WHITE_FADE_WEBP/05_Group_Resting_Viewpoint_desktop.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[right_top]"
          />
        </picture>
      </div>

      <div className="relative z-10 flex flex-col justify-between min-h-screen w-full">
        {/* Stage Head - Clean and Responsive matching Mobile & Desktop */}
        <section className="text-center text-[#14140f] pt-3 sm:pt-8 pb-2 sm:pb-3 px-4 select-none shrink-0">
          <span className="hidden sm:inline-block bg-[#14140f] text-[#d6ff3f] text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            Private trip planner
          </span>
          <h1 className="text-[22px] sm:text-4xl lg:text-[46px] font-extrabold text-[#14140f] font-heading tracking-tight leading-tight">
            Plan your Himalayan trip<span className="text-[#a9cc2a]">.</span>
          </h1>
          <p className="hidden sm:block mt-2 text-sm sm:text-base text-[#6b6b63] max-w-xl mx-auto font-normal">
            Chat with our trip planner, shape it day by day, and our trip expert calls you with the price.
          </p>
        </section>

        {/* Main App Frame */}
        <main className="max-w-[1180px] w-full mx-auto px-2 sm:px-4 pb-2 sm:pb-4 flex-1 flex flex-col justify-center">
          {/* App Container: Single Column on Mobile, Two Columns on Desktop */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-[22px] sm:rounded-[28px] overflow-hidden border border-white/80 shadow-[0_24px_60px_rgba(20,20,15,0.08),0_1px_1px_rgba(255,255,255,0.95)_inset] grid grid-cols-1 lg:grid-cols-[1fr_360px] h-[calc(100dvh-130px)] sm:h-[min(780px,calc(100vh-120px))] min-h-[460px] sm:min-h-[560px] relative">
            {/* Left Column: Chat App */}
            <div className="flex flex-col min-w-0 min-h-0 h-full bg-white/70 backdrop-blur-xl">
              {/* Chat Header */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-white/80 shrink-0 bg-white/75 backdrop-blur-xl">
                <div className="relative w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-full bg-[#14140f] overflow-hidden shrink-0 border-[1.5px] border-[#14140f] shadow-xs">
                  <SkeletonImage
                    src="/assets/images/mascot/explorer-face.webp"
                    alt="Trip Planner Avatar"
                    fill
                    sizes="(max-width: 640px) 36px, 44px"
                    className="object-cover object-top scale-110"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <strong className="text-[#14140f] text-[15px] sm:text-[15.5px] font-bold leading-tight">
                    Trip Planner
                  </strong>
                  <small className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-gray-500 leading-tight">
                    <span className="w-2 h-2 rounded-full bg-[#b8ff00] border border-[#14140f] animate-explorer-online" />
                    Trip planner · usually replies in seconds
                  </small>
                </div>

                {/* Step mode toggle shortcut in chat header */}
                <button
                  type="button"
                  onClick={() => setStepMode(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 border border-white/80 bg-white/80 hover:bg-white text-[#14140f] rounded-full px-3 py-1.5 text-[11.5px] font-bold transition-all cursor-pointer mr-1 shadow-xs"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>Step Form</span>
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  title="Start a new trip"
                  className="inline-flex items-center justify-center gap-1.5 border border-white/80 bg-white/80 hover:bg-white text-[#14140f] rounded-full p-2 sm:px-3 sm:py-1.5 text-[12px] font-bold transition-all cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New trip</span>
                </button>
              </div>

              {/* Chat Messages Thread */}
              <div className="relative flex-1 min-h-0 flex flex-col bg-transparent">
                <div
                  ref={chatScrollRef}
                  className="chat-scroll flex-1 min-h-0 overflow-y-auto px-3.5 sm:px-6 py-3 sm:py-4 flex flex-col gap-2.5 sm:gap-3 bg-transparent"
                >
                {conversationStage === 0 ? (
                  <div key={welcomeKey} className="flex flex-col gap-2.5 sm:gap-3">
                    {/* Standing Animated Character in Welcome State */}
                    <div className="mx-auto my-1 flex justify-center">
                      <ExplorerChatMascot ref={welcomeMascotRef} variant="lg" />
                    </div>

                    {/* Sender label */}
                    <span className="text-[11px] sm:text-[11.5px] text-gray-400 font-bold ml-1 sm:ml-2 mb-[-4px]">
                      Trip Planner
                    </span>

                    {/* Bubble 1 */}
                    <div className="pc-pop-1 max-w-[88%] sm:max-w-[80%] self-start">
                      <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13.5px] sm:text-[14.5px] leading-relaxed bg-white/85 backdrop-blur-md text-[#14140f] rounded-[18px] rounded-bl-[4px] border border-white/80 shadow-xs">
                        Hey! I'm your Trail Explorers trip planner 👋
                      </div>
                    </div>

                    {/* Bubble 2 */}
                    <div className="pc-pop-2 max-w-[88%] sm:max-w-[80%] self-start">
                      <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13.5px] sm:text-[14.5px] font-bold leading-relaxed bg-white/85 backdrop-blur-md text-[#14140f] rounded-[18px] rounded-bl-[4px] border border-white/80 shadow-xs">
                        Where are the mountains calling you?
                      </div>
                    </div>

                    {/* Bubble 3 */}
                    <div className="pc-pop-3 max-w-[88%] sm:max-w-[80%] self-start">
                      <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13.5px] sm:text-[14.5px] leading-relaxed bg-white/85 backdrop-blur-md text-[#14140f] rounded-[18px] rounded-bl-[4px] border border-white/80 shadow-xs">
                        Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert
                        then calls you with the price.
                      </div>
                    </div>

                    {/* Initial 4 Suggestion Cards */}
                    <div className="pc-pop-starts flex flex-row overflow-x-auto gap-2.5 py-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:overflow-visible no-scrollbar mt-1">
                      {STARTS.map((start) => (
                        <button
                          key={start.id}
                          type="button"
                          onClick={() => handleSelectTrip(start)}
                          className="relative shrink-0 min-w-[124px] w-[124px] h-[124px] sm:min-w-0 sm:w-auto sm:aspect-[4/5] sm:min-h-[190px] rounded-[16px] sm:rounded-[18px] overflow-hidden p-0 text-left bg-[#14140f] text-white shadow-[0_10px_24px_-14px_rgba(20,20,15,0.6)] hover:-translate-y-1 transition-all duration-200 group cursor-pointer border-none"
                        >
                          <SkeletonImage
                            src={start.image}
                            alt={start.title}
                            fill
                            sizes="(max-width: 640px) 124px, 200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                          <div className="absolute inset-x-2.5 bottom-2 sm:inset-x-3 sm:bottom-3 z-10">
                            <span className="font-bold text-[12px] sm:text-[13.5px] leading-tight block text-white">
                              {start.title}
                            </span>
                            <small className="block font-medium text-[10px] sm:text-[11px] text-white/80 mt-0.5 sm:mt-1 line-clamp-1">
                              {start.sub}
                            </small>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Sender label */}
                    <span className="text-[11px] sm:text-[11.5px] text-gray-400 font-bold ml-1 sm:ml-2 mb-[-4px]">
                      Trip Planner
                    </span>

                    {/* Message Bubbles in Active Chat */}
                    {messages.map((msg) => {
                      const isInitialBotMsg = ["msg-1", "msg-2", "msg-3"].includes(msg.id);
                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-2 max-w-[88%] sm:max-w-[80%] animate-pc-pop ${
                            msg.sender === "user" ? "self-end flex-row-reverse" : "self-start items-end"
                          }`}
                        >
                          {/* Bot Avatar Icon */}
                          {msg.sender === "bot" && !isInitialBotMsg && (
                            <div className="w-7 h-7 rounded-full bg-[#14140f] overflow-hidden shrink-0 mb-1 border border-[#14140f] shadow-xs relative">
                              <SkeletonImage
                                src="/assets/images/mascot/explorer-face.webp"
                                alt="Trip Planner"
                                fill
                                sizes="28px"
                                className="object-cover object-top scale-110"
                              />
                            </div>
                          )}

                          <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                            <div
                              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13.5px] sm:text-[14.5px] leading-relaxed whitespace-pre-line ${
                                msg.sender === "user"
                                  ? "bg-[#d6ff3f] text-[#14140f] font-semibold rounded-[18px] rounded-br-[4px] shadow-xs"
                                  : msg.id === "msg-2"
                                  ? "bg-white/85 backdrop-blur-md text-[#14140f] font-bold rounded-[18px] rounded-bl-[4px] border border-white/80 shadow-xs"
                                  : "bg-white/85 backdrop-blur-md text-[#14140f] rounded-[18px] rounded-bl-[4px] border border-white/80 shadow-xs"
                              }`}
                            >
                              {msg.text}
                            </div>

                            {/* Plan Update Toast Badge */}
                            {msg.planUpdate && (
                              <div className="w-full my-2">
                                <button
                                  type="button"
                                  onClick={() => setMobileTicketOpen(true)}
                                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#14140f] text-white hover:bg-black transition-all shadow-md group cursor-pointer"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-lg">🗺</span>
                                    <div className="text-left">
                                      <strong className="block text-[13px] font-bold text-white leading-tight">
                                        Plan updated · {msg.planUpdate.days} days
                                      </strong>
                                      <small className="text-[11px] text-white/70">{msg.planUpdate.route}</small>
                                    </div>
                                  </div>
                                  <span className="text-[12px] font-bold text-[#d6ff3f] group-hover:translate-x-1 transition-transform">
                                    View →
                                  </span>
                                </button>
                              </div>
                            )}

                            {/* In-Chat Budget Slider Card */}
                            {msg.showBudgetCard && (
                              <div className="w-full my-2.5 p-3.5 sm:p-4 rounded-2xl bg-[#14140f] text-white flex flex-col gap-3 shadow-lg">
                                <div>
                                  <strong className="block text-[13.5px] sm:text-[14px] font-bold text-[#d6ff3f]">
                                    Your budget per person
                                  </strong>
                                  <p className="text-[11px] sm:text-[11.5px] text-white/70 mt-0.5">
                                    Slide to roughly what each person would like to spend, excluding travel to the
                                    starting city.
                                  </p>
                                </div>

                                {/* Value Output */}
                                <div className="text-center font-bold text-sm sm:text-base text-[#d6ff3f] py-1 bg-white/5 rounded-lg border border-white/10">
                                  ₹{budgetVal.toLocaleString("en-IN")}
                                  {budgetVal >= 200000 ? "+" : ""} per person
                                </div>

                                {/* Range Slider */}
                                <div className="flex flex-col gap-1">
                                  <input
                                    type="range"
                                    min={5000}
                                    max={200000}
                                    step={1000}
                                    value={budgetVal}
                                    onChange={(e) => setBudgetVal(Number(e.target.value))}
                                    className="w-full pc-budget-range h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d6ff3f]"
                                  />
                                  <div className="flex justify-between text-[10.5px] text-white/50 font-bold px-0.5">
                                    <span>₹5,000</span>
                                    <span>₹2,00,000+</span>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={handleSetBudget}
                                    className="flex-1 py-2 px-3 bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-[12px] sm:text-[12.5px] rounded-full transition-transform active:scale-95 cursor-pointer"
                                  >
                                    Set my budget
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleChipClick("Not sure about the budget yet")}
                                    className="py-2 px-3 bg-white/10 hover:bg-white/15 text-white/80 font-bold text-[11.5px] sm:text-[12px] rounded-full transition-colors cursor-pointer"
                                  >
                                    Not sure yet
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Quick Reply Chips */}
                            {msg.chips && msg.chips.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2 no-scrollbar">
                                {msg.chips.map((chip, chipIdx) => (
                                  <button
                                    key={chipIdx}
                                    type="button"
                                    onClick={() => handleChipClick(chip)}
                                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#d6ff3f] text-[#14140f] text-[11.5px] sm:text-[12px] font-bold border border-[#14140f] shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
                                  >
                                    {chip}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* Animated Typing Bubble */}
                {isTyping && (
                  <div className="self-start flex items-center gap-1.5 px-3.5 py-2 bg-white/85 backdrop-blur-md border border-white/80 shadow-xs rounded-[18px] w-fit animate-pc-pop">
                    <span className="text-[11.5px] font-semibold text-gray-500 mr-1.5">Mapping your route…</span>
                    <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-1 block" />
                    <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-2 block" />
                    <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-3 block" />
                  </div>
                )}

                {/* Bottom Spacer so chat messages and chips sit comfortably above the docked mascot */}
                {conversationStage > 0 && (
                  <div className="h-[135px] sm:h-[145px] w-full shrink-0 pointer-events-none" aria-hidden="true" />
                )}

                <div ref={threadEndRef} />
              </div>

              {/* Soft floor fade and docked animated Explorer mascot (active chat mode) */}
              {conversationStage > 0 && (
                <>
                  <div className="absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none z-[5]" />
                  <ExplorerChatMascot ref={mascotRef} variant="dock" />
                </>
              )}
            </div>

            {/* Composer */}
            <div className="p-2.5 sm:p-4 pb-[calc(10px+env(safe-area-inset-bottom,0px))] sm:pb-4 bg-white/75 backdrop-blur-xl border-t border-white/80 shrink-0">
              {/* Mobile Drawer Pill: "Your trip so far ↑" pinned above input */}
              {activeTrip && (
                <div className="lg:hidden flex items-center justify-start pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileTicketOpen(true)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14140f] text-white hover:bg-black font-bold text-[12px] shadow-md border border-white/10 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#d6ff3f]" />
                    <span>
                      {activeTrip.stage === 6 && activeTrip.days
                        ? `Your trip · ${activeTrip.days} days ↑`
                        : "Your trip so far ↑"}
                    </span>
                  </button>
                </div>
              )}

              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full p-1 pl-4 sm:pl-5 border border-white/80 shadow-[0_4px_16px_rgba(20,20,15,0.06),0_1px_1px_rgba(255,255,255,0.9)_inset] focus-within:border-[#14140f] focus-within:bg-white transition-all"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tell us about your trip…"
                  className="flex-1 bg-transparent border-none outline-hidden text-[#14140f] text-[14.5px] sm:text-[16px] placeholder-gray-400 py-1.5 sm:py-2"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#14140f] hover:bg-black text-[#d6ff3f] flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer border-none"
                >
                  <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
                </button>
              </form>

              <p className="text-center text-[11.5px] sm:text-[12px] text-gray-500 mt-2">
                <span className="hidden sm:inline">Enter to send · Shift + Enter for a new line · </span>
                Prefer clicking?{" "}
                <button
                  type="button"
                  onClick={() => setStepMode(true)}
                  className="font-bold text-[#14140f] underline underline-offset-2 cursor-pointer bg-transparent border-none p-0"
                >
                  Use the step-by-step form
                </button>
              </p>
            </div>
          </div>

          {/* Desktop Right Column: Your Trip Ticket */}
          <aside className="hidden lg:flex bg-[#14140f] text-white flex-col min-h-0 h-full relative select-none">
            {/* Ticket Head with Cutout Notches */}
            <div
              className={`relative p-5 sm:p-6 border-b-2 border-dashed border-white/15 shrink-0 transition-all ${
                ticketFlash ? "bg-white/10" : ""
              }`}
            >
              <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 rounded-full bg-white block z-10" />
              <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full bg-white block z-10" />

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#d6ff3f]">
                  Your trip ticket
                </span>
                <strong className="text-[19px] sm:text-[20px] font-bold text-white leading-tight">
                  {activeTrip ? activeTrip.title : "Your trip"}
                </strong>
                <small className="text-[12.5px] text-white/60">
                  {activeTrip?.stage === 6
                    ? `${activeTrip.days} days · ${activeTrip.region}`
                    : activeTrip
                    ? activeTrip.region
                    : "Taking shape as you chat"}
                </small>
              </div>
            </div>

            {/* Ticket Scroll Body */}
            <div className="ticket-scroll flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
              {renderTicketContent()}
            </div>

            {/* Ticket Footer Action */}
            <div className="p-4 sm:p-5 border-t border-white/10 shrink-0 flex flex-col gap-2 text-center bg-[#14140f]">
              <button
                type="button"
                disabled={activeTrip?.stage !== 6}
                onClick={() => setModalOpen(true)}
                className={`w-full py-3 sm:py-3.5 px-4 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTrip?.stage === 6
                    ? "bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] shadow-[0_8px_20px_-6px_rgba(214,255,63,0.7)]"
                    : "bg-white/10 text-white/40 cursor-not-allowed border-none"
                }`}
              >
                {activeTrip?.stage === 6 ? "Send to our team →" : "Plan a few days first"}
              </button>
              <small className="text-[11px] text-white/50">
                No payment now · our expert calls you with the exact price
              </small>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Slide-up Ticket Sheet */}
      <div
        ref={ticketOverlayRef}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileTicketOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileTicketOpen(false);
        }}
      >
        <aside
          ref={ticketSheetRef}
          className={`absolute inset-x-0 bottom-0 max-h-[88dvh] bg-[#14140f] text-white rounded-t-[28px] shadow-2xl flex flex-col transition-transform duration-300 ease-out z-10 overscroll-contain touch-pan-y ${
            mobileTicketOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Mobile drag handle */}
          <div
            ref={ticketHandleRef}
            className="w-12 h-1.5 bg-white/30 hover:bg-white/50 rounded-full mx-auto my-2.5 block cursor-grab active:cursor-grabbing touch-none select-none transition-colors"
            title="Drag down to close"
            aria-label="Drag down to close"
          />

          <div className="relative p-5 pt-2 border-b-2 border-dashed border-white/15 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#d6ff3f]">
                Your trip ticket
              </span>
              <strong className="text-[18px] font-bold text-white leading-tight">
                {activeTrip ? activeTrip.title : "Your trip"}
              </strong>
              <small className="text-[12px] text-white/60">
                {activeTrip?.stage === 6
                  ? `${activeTrip.days} days · ${activeTrip.region}`
                  : activeTrip
                  ? activeTrip.region
                  : "Taking shape as you chat"}
              </small>
            </div>
            <button
              type="button"
              onClick={() => setMobileTicketOpen(false)}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer shrink-0"
              aria-label="Close ticket sheet"
            >
              ✕
            </button>
          </div>

          <div className="ticket-scroll flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4">
            {renderTicketContent()}
          </div>

          <div className="p-4 pb-[calc(18px+env(safe-area-inset-bottom,0px))] border-t border-white/10 flex flex-col gap-1.5 text-center bg-[#14140f]">
            <button
              type="button"
              disabled={activeTrip?.stage !== 6}
              onClick={() => {
                setMobileTicketOpen(false);
                setModalOpen(true);
              }}
              className={`w-full py-3.5 px-4 rounded-full font-bold text-[14px] min-h-[46px] transition-all cursor-pointer ${
                activeTrip?.stage === 6
                  ? "bg-[#d6ff3f] hover:bg-[#ccff00] active:scale-[0.98] text-[#14140f] shadow-[0_8px_20px_-6px_rgba(214,255,63,0.7)]"
                  : "bg-white/10 text-white/40 cursor-not-allowed border-none"
              }`}
            >
              {activeTrip?.stage === 6 ? "Send to our team →" : "Plan a few days first"}
            </button>
            <small className="text-[11px] text-white/55">
              No payment now · our expert calls you with the exact price
            </small>
          </div>
        </aside>
      </div>

      {/* Minimal Footer on Mountain Backdrop */}
      <footer className="w-full py-3 sm:py-4 text-center text-[11px] sm:text-xs text-[#6b6b63] tracking-wider select-none shrink-0">
        © 2026 Trail Explorers · Made in India ✦
      </footer>
      </div>

      {/* Inquiry Dialog Modal (Chat Mode) */}
      {modalOpen && (
        <div
          ref={dialogOverlayRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 touch-none overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalOpen(false);
              setInquirySubmitted(false);
            }
          }}
        >
          <div
            ref={dialogSheetRef}
            className="bg-[#14140f] text-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] border border-white/15 p-5 sm:p-8 relative shadow-2xl animate-pc-pop max-h-[90dvh] sm:max-h-[calc(100dvh-32px)] overflow-y-auto overscroll-contain touch-pan-y pb-[calc(20px+env(safe-area-inset-bottom,0px))] sm:pb-8"
          >
            {/* Mobile drag handle */}
            <div
              ref={dialogHandleRef}
              className="w-12 h-1.5 bg-white/30 hover:bg-white/50 rounded-full mx-auto mb-3 block sm:hidden cursor-grab active:cursor-grabbing touch-none select-none transition-colors"
              title="Drag down to close"
              aria-label="Drag down to close"
            />
            <button
              onClick={() => {
                setModalOpen(false);
                setInquirySubmitted(false);
              }}
              className="absolute top-5 right-5 text-white/60 hover:text-white text-xl font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            {!inquirySubmitted ? (
              <form onSubmit={handleBuilderSubmit} className="flex flex-col gap-4">
                <div className="text-left">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#d6ff3f]">
                    Almost done
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">Send to our team</h3>
                  <p className="text-xs text-white/70 mt-1">
                    Our Himalayan trip expert will call you back with the exact group quote and customized pricing.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-2 text-left">
                  <Input
                    label="Your Name"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="bg-white/5 text-white border-white/20 focus:border-[#d6ff3f] placeholder:text-white/40"
                  />

                  <Input
                    label="WhatsApp / Phone"
                    required
                    type="tel"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="bg-white/5 text-white border-white/20 focus:border-[#d6ff3f] placeholder:text-white/40"
                  />

                  <Input
                    label="Email (Optional)"
                    type="email"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="bg-white/5 text-white border-white/20 focus:border-[#d6ff3f] placeholder:text-white/40"
                  />

                  <Select
                    label="When should we call?"
                    value={custCallTime}
                    onChange={(e) => setCustCallTime(e.target.value)}
                    options={[
                      { label: "As soon as possible", value: "As soon as possible" },
                      { label: "Morning (10 AM – 1 PM)", value: "Morning (10 AM – 1 PM)" },
                      { label: "Afternoon (1 – 4 PM)", value: "Afternoon (1 – 4 PM)" },
                      { label: "Evening (4 – 7 PM)", value: "Evening (4 – 7 PM)" },
                    ]}
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth className="mt-3">
                  Confirm & Request Call →
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-bold text-2xl mb-1 shadow-lg">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Plan sent successfully!</h3>
                <p className="text-sm text-white/75 max-w-xs">
                  Your reference ID is <strong className="text-[#d6ff3f]">{builderRef}</strong>. Our trip expert will
                  call you at <strong>{custPhone}</strong> {custCallTime.toLowerCase()}.
                </p>
                <Button
                  variant="outline"
                  size="md"
                  className="text-white border-white hover:bg-white hover:text-black mt-4"
                  onClick={() => {
                    setModalOpen(false);
                    setInquirySubmitted(false);
                  }}
                >
                  Back to trip planner
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
