"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  RotateCcw,
  Check,
  ChevronRight,
  ArrowUpRight,
  Phone,
  Calendar,
  Plus,
  Minus,
  ArrowUp as ArrowUpIcon,
  ArrowDown,
  X,
} from "lucide-react";

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

const PRESETS: Record<string, {
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
}> = {
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
    tagline: "Cold desert, ancient monasteries, the highest villages",
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
    tagline: "Remotest valleys, glaciers & cliffside monasteries",
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
    tagline: "Temples, treks & the Ganga",
    image: "/assets/images/trips/trip_119_image_url.jpg",
  },
  {
    id: "northeast",
    name: "Northeast",
    tagline: "Living root bridges, monasteries & festivals",
    image: "/assets/images/trips/trip_114_image_url.jpg",
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
  "Paragliding", "River rafting", "Camping", "Snow activities", "Day hikes", "Multi-day trek",
  "Monasteries & culture", "Stargazing", "Photography help", "Local food trail", "Village homestay",
  "Festival visit", "Jeep safari", "Hot springs"
];

const BUILDER_START_CITIES = [
  "Delhi", "Chandigarh", "Manali", "Leh", "Srinagar", "Dehradun", "Guwahati", "Bagdogra", "Other"
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

export default function PlanYourTripPage() {
  // Mode toggle: false = Chat mode (dark mountain backdrop), true = 5-step Builder form (light background)
  const [stepMode, setStepMode] = useState(false);

  // ------------------------------------------
  // Chat Mode State
  // ------------------------------------------
  const [welcomeKey, setWelcomeKey] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-1", sender: "bot", text: "Hey! I'm Banjara, Awara Banjara's trip planner 👋" },
    { id: "msg-2", sender: "bot", text: "Where are the mountains calling you?" },
    { id: "msg-3", sender: "bot", text: "Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price." },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState<number>(0);
  const [activeTrip, setActiveTrip] = useState<ItineraryData | null>(null);

  const stageRef = useRef(0);
  const regionRef = useRef("ladakh");

  const [modalOpen, setModalOpen] = useState(false);
  const [mobileTicketOpen, setMobileTicketOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [ticketFlash, setTicketFlash] = useState(false);
  const [budgetVal, setBudgetVal] = useState(30000);

  // ------------------------------------------
  // Step-by-Step Wizard State
  // ------------------------------------------
  const [wizardStep, setWizardStep] = useState<number>(0); // 0 = Where, 1 = When & who, 2 = Style, 3 = Day by day, 4 = Send
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["himachal"]);

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
  const [builderDays, setBuilderDays] = useState<BuilderDayItem[]>([
    { id: "d-1", dayNum: 1, dateStr: "Fri, 20 Nov", title: "Chandigarh → Manali", night: "Manali", stops: [], notes: "" },
    { id: "d-2", dayNum: 2, dateStr: "Sat, 21 Nov", title: "Explore Manali", night: "Manali", stops: [], notes: "" },
    { id: "d-3", dayNum: 3, dateStr: "Sun, 22 Nov", title: "Explore Manali", night: "Manali", stops: [], notes: "" },
    { id: "d-4", dayNum: 4, dateStr: "Mon, 23 Nov", title: "Manali → Atal Tunnel & Sissu", night: "Atal Tunnel & Sissu", stops: [], notes: "" },
    { id: "d-5", dayNum: 5, dateStr: "Tue, 24 Nov", title: "Atal Tunnel & Sissu → Kasol", night: "Kasol", stops: [], notes: "" },
    { id: "d-6", dayNum: 6, dateStr: "Wed, 25 Nov", title: "Kasol → Jibhi & Tirthan Valley", night: "Jibhi & Tirthan Valley", stops: [], notes: "" },
    { id: "d-7", dayNum: 7, dateStr: "Thu, 26 Nov", title: "Jibhi & Tirthan Valley → Bir Billing", night: "Bir Billing", stops: [], notes: "" },
    { id: "d-8", dayNum: 8, dateStr: "Fri, 27 Nov", title: "Bir Billing → Dharamshala & McLeodganj", night: "Dharamshala & McLeodganj", stops: [], notes: "" },
  ]);

  // Step 5 state (Contact Form)
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custCallTime, setCustCallTime] = useState("As soon as possible");
  const [custNotes, setCustNotes] = useState("");
  const [builderSubmitted, setBuilderSubmitted] = useState(false);
  const [builderRef, setBuilderRef] = useState("AB-9182");

  const threadEndRef = useRef<HTMLDivElement>(null);

  // Sync body class: .pc-mode-chat in Chat mode, standard white background in Step mode
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
    if (messages.length > 3 || isTyping) {
      threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Toggle region selection in step 1
  const toggleRegion = (id: string) => {
    setSelectedRegions((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((r) => r !== id);
      }
      return [...prev, id];
    });
  };

  // Toggle activity chip in step 3
  const toggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  // Re-generate days when entering step 4 based on picked regions and numDays
  const syncDaysCount = (newCount: number) => {
    setNumDays(newCount);
    setBuilderDays((prev) => {
      if (newCount > prev.length) {
        const added: BuilderDayItem[] = [];
        for (let i = prev.length + 1; i <= newCount; i++) {
          added.push({
            id: `d-${i}`,
            dayNum: i,
            dateStr: `Day ${i}`,
            title: `Explore ${selectedRegions[0] || "Mountains"}`,
            night: "Local Stay",
            stops: [],
            notes: "",
          });
        }
        return [...prev, ...added];
      } else {
        return prev.slice(0, newCount);
      }
    });
  };

  // Move day up/down
  const moveDay = (index: number, direction: "up" | "down") => {
    setBuilderDays((prev) => {
      const copy = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      // Re-index dayNums
      return copy.map((item, idx) => ({ ...item, dayNum: idx + 1 }));
    });
  };

  // Delete day
  const deleteDay = (index: number) => {
    setBuilderDays((prev) => {
      if (prev.length <= 1) return prev;
      const copy = prev.filter((_, idx) => idx !== index);
      return copy.map((item, idx) => ({ ...item, dayNum: idx + 1 }));
    });
    setNumDays((prev) => Math.max(1, prev - 1));
  };

  // Add a day
  const addDay = () => {
    setBuilderDays((prev) => {
      const nextNum = prev.length + 1;
      return [
        ...prev,
        {
          id: `d-${Date.now()}`,
          dayNum: nextNum,
          dateStr: `Day ${nextNum}`,
          title: `Explore ${selectedRegions[0] || "Mountains"}`,
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
    const refCode = "AB-" + Math.floor(1000 + Math.random() * 9000);
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

    const preset = PRESETS[key] || PRESETS.ladakh;

    setActiveTrip({
      title: preset.title,
      region: preset.region,
      days: preset.days,
      stage: 1,
      facts: {
        when: key === "spiti" ? "June – October" : key === "ladakh" ? "Summer" : key === "kashmir" ? "Year-Round" : "Spring & Summer",
      },
    });

    setTicketFlash(true);
    setTimeout(() => setTicketFlash(false), 900);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      let chips: string[] = [];

      if (key === "ladakh") {
        replyText = "Ladakh in summer is incredible—blue skies, high passes like Khardung La, and stunning lakes like Pangong Tso! Which month are you planning to travel, and how many days do you have in mind?";
        chips = ["June", "July", "August", "September"];
      } else if (key === "spiti") {
        replyText = "Spiti Valley is breathtaking! The full circuit via Kunzum Pass is open June to October. Which month are you planning to head out?";
        chips = ["June", "July", "August", "September", "Winter 4x4"];
      } else if (key === "kashmir") {
        replyText = "Magical choice! Kashmir with family offers peaceful houseboats on Dal Lake and snow meadows in Gulmarg. Which season suits your family best?";
        chips = ["Spring / Tulips", "Summer", "Autumn", "Winter Snow"];
      } else {
        replyText = "Awesome! We have offbeat valley escapes across Himachal, Parvati, and Jibhi. What vibe are you looking for?";
        chips = ["Peaceful pine forests & cafés", "High adventure & roads", "Snow & glaciers", "Offbeat culture"];
      }

      setMessages((prev) => [...prev, { id: "bot-" + Date.now(), sender: "bot", text: replyText, chips }]);
    }, 700);
  };

  const handleChipClick = (chip: string) => {
    setMessages((prev) => [...prev, { id: "user-" + Date.now(), sender: "user", text: chip }]);
    setIsTyping(true);

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
            chips: ["Starting from Delhi", "Starting from Chandigarh", "Fly direct into Leh / Srinagar", "Starting from Mumbai"],
          },
        ]);
      } else if (curStage === 4) {
        stageRef.current = 5;
        setConversationStage(5);
        const fromCity = chip.includes("Delhi") ? "Delhi" : chip.includes("Chandigarh") ? "Chandigarh" : chip.includes("Mumbai") ? "Mumbai" : "Leh / Srinagar";

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
            chips: ["Traditional homestays", "Comfortable hotels", "Mix of homestays & hotels", "Camping along the way"],
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
            text: `${chip} give you the best local experience in ${preset.region}! Since you're traveling for ${activeTrip?.days || preset.days} days, would you prefer an SUV like a Scorpio / Xylo or a Tempo Traveller for your group?`,
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
            text: `Here is an ${daysCount}-day itinerary for your group, covering ${preset.region}'s highest passes, scenic valleys and blue lakes with ${activeTrip?.facts.stays || preset.facts.stays} and a ${transportVal}.\n\nYour day-by-day plan is now updated on your trip ticket! What do you think of this route?`,
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
    }, 600);
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
      { id: "user-" + Date.now(), sender: "user", text: `Budget: ₹${budgetVal.toLocaleString("en-IN")} per person` },
      { id: "bot-" + Date.now(), sender: "bot", text: `Got it! I've set your budget to ₹${budgetVal.toLocaleString("en-IN")} per person. Tap "Send to our team →" whenever you're ready and our trip expert will call you with the exact customized group quote!`, chips: ["Send to our team →", "Ask a question", "Change stops"] },
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
      { id: "msg-1", sender: "bot", text: "Hey! I'm Banjara, Awara Banjara's trip planner 👋" },
      { id: "msg-2", sender: "bot", text: "Where are the mountains calling you?" },
      { id: "msg-3", sender: "bot", text: "Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price." },
    ]);
    setActiveTrip(null);
    setConversationStage(0);
    stageRef.current = 0;
    regionRef.current = "ladakh";
    setInputText("");
    setIsTyping(false);
    setMobileTicketOpen(false);
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
            Tell Banjara where and when you want to go.
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

  // ==========================================
  // RENDER: STEP-BY-STEP BUILDER WIZARD MODE
  // ==========================================
  if (stepMode) {
    const activeRegionNames = selectedRegions.map((id) => BUILDER_REGIONS.find((r) => r.id === id)?.name || id).join(" + ");
    const stayLabel = BUILDER_STAYS.find((s) => s.id === stayStyle)?.label || "Comfort";
    const transportLabel = BUILDER_VEHICLES.find((t) => t.id === transportStyle)?.label || "Suggest for me";
    const paceLabel = BUILDER_PACES.find((p) => p.id === paceStyle)?.label || "Balanced";

    return (
      <div className="min-h-screen bg-[#fafaf8] text-[#14140f] font-sans pb-16 selection:bg-[#d6ff3f] selection:text-[#14140f]">
        {/* Intro Header */}
        <section className="pt-10 sm:pt-16 pb-6 px-4 text-center max-w-[820px] mx-auto select-none">
          <span className="inline-block bg-[#14140f] text-[#d6ff3f] text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            Private trip planner
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#14140f]">
            Plan your Himalayan trip<span className="text-[#b8ff00]">.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Chat with our trip planner about where, when and how you like to travel. Together you&apos;ll shape a day-by-day plan, and a trip expert will call you back with a price for your group, no matter its size.
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setStepMode(false)}
              className="text-xs font-bold text-[#14140f] hover:underline underline-offset-4 cursor-pointer"
            >
              ← Back to the chat planner
            </button>
          </div>
        </section>

        {/* Wizard Shell */}
        <div className="max-w-[920px] mx-auto px-4">
          <div className="bg-white border border-[#e6e6df] rounded-[24px] shadow-[0_12px_40px_-15px_rgba(20,20,15,0.08)] p-5 sm:p-10">
            {/* 5-Step Progress Bar */}
            <ol className="grid grid-cols-5 gap-2 sm:gap-3 mb-8 sm:mb-10 list-none p-0">
              {[
                { num: 1, label: "Where" },
                { num: 2, label: "When & who" },
                { num: 3, label: "Style" },
                { num: 4, label: "Day by day" },
                { num: 5, label: "Send" },
              ].map((step, idx) => {
                const isActive = wizardStep === idx;
                const isDone = wizardStep > idx;
                return (
                  <li
                    key={step.num}
                    onClick={() => {
                      if (isDone) setWizardStep(idx);
                    }}
                    className={`pt-2 sm:pt-3 border-t-4 transition-all ${
                      isActive
                        ? "border-[#14140f] text-[#14140f]"
                        : isDone
                        ? "border-[#b8ff00] text-gray-800 cursor-pointer"
                        : "border-[#e6e6df] text-gray-400"
                    }`}
                  >
                    <span className="text-[12px] sm:text-[13px] font-bold block truncate">
                      <span className="hidden sm:inline">{step.num}. </span>
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* STEP 1: WHERE */}
            {wizardStep === 0 && (
              <div className="flex flex-col gap-6 animate-pc-pop">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f]">
                    Where in the Himalayas?
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Pick one or more. Combining neighbours (like Spiti + Himachal, or Ladakh + Zanskar) works best.
                  </p>
                </div>

                {/* Region Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5">
                  {BUILDER_REGIONS.map((reg) => {
                    const isSelected = selectedRegions.includes(reg.id);
                    return (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => toggleRegion(reg.id)}
                        className={`relative aspect-[4/3] rounded-[18px] overflow-hidden text-left p-0 border-[3px] transition-all cursor-pointer group ${
                          isSelected
                            ? "border-[#d6ff3f] shadow-md scale-[1.01]"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <Image src={reg.image} alt={reg.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                        {/* Top-right Selection Tick Circle */}
                        <div
                          className={`absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#d6ff3f] border-[#d6ff3f] text-[#14140f]"
                              : "bg-white/20 border-white text-transparent"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>

                        {/* Text */}
                        <div className="absolute inset-x-3 bottom-2.5 z-10">
                          <strong className="block text-white text-[15px] sm:text-base font-bold leading-tight">
                            {reg.name}
                          </strong>
                          <small className="hidden sm:block text-white/80 text-[11px] leading-snug mt-0.5 line-clamp-2">
                            {reg.tagline}
                          </small>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Action Bar */}
                <div className="flex justify-end pt-6 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="px-7 py-3 rounded-full bg-[#14140f] hover:bg-black text-[#d6ff3f] font-bold text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: WHEN & WHO */}
            {wizardStep === 1 && (
              <div className="flex flex-col gap-6 animate-pc-pop">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f]">
                    When, how long & who&apos;s coming?
                  </h2>
                </div>

                {/* Row 1: Start date & Number of days */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-700">Start date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-white border-[1.5px] border-[#d9d9d0] rounded-xl px-3.5 py-2.5 text-sm font-medium outline-hidden focus:border-black"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={flexibleDates}
                        onChange={(e) => setFlexibleDates(e.target.checked)}
                        className="w-4 h-4 rounded-sm accent-[#14140f]"
                      />
                      <span>My dates are flexible</span>
                    </label>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                      <span>Number of days: {numDays}</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={21}
                      value={numDays}
                      onChange={(e) => syncDaysCount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#14140f] mt-3"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 font-bold px-0.5">
                      <span>2</span>
                      <span>21</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Adults & Children Steppers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-700">Adults</label>
                    <div className="inline-flex items-center border-[1.5px] border-[#d9d9d0] rounded-full w-fit overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                        className="w-11 h-10 flex items-center justify-center hover:bg-gray-100 text-lg font-bold cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-base">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults((prev) => prev + 1)}
                        className="w-11 h-10 flex items-center justify-center hover:bg-gray-100 text-lg font-bold cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-700">Children (under 12)</label>
                    <div className="inline-flex items-center border-[1.5px] border-[#d9d9d0] rounded-full w-fit overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                        className="w-11 h-10 flex items-center justify-center hover:bg-gray-100 text-lg font-bold cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-base">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren((prev) => prev + 1)}
                        className="w-11 h-10 flex items-center justify-center hover:bg-gray-100 text-lg font-bold cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 3: Who's travelling chips */}
                <div className="flex flex-col gap-2 pt-2">
                  <label className="text-xs font-bold text-gray-700">Who&apos;s travelling?</label>
                  <div className="flex flex-wrap gap-2">
                    {["Friends", "Family", "Couple", "Solo", "Office / Corporate", "School / College"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setGroupType(type)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                          groupType === type
                            ? "bg-[#14140f] text-white border-[#14140f]"
                            : "bg-white text-gray-700 border-[#d9d9d0] hover:border-black"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 4: Start city dropdown */}
                <div className="flex flex-col gap-2 pt-2">
                  <label className="text-xs font-bold text-gray-700">Where will you start from?</label>
                  <select
                    value={startCity}
                    onChange={(e) => setStartCity(e.target.value)}
                    className="w-full max-w-sm bg-white border-[1.5px] border-[#d9d9d0] rounded-xl px-3.5 py-2.5 text-sm font-medium outline-hidden focus:border-black cursor-pointer"
                  >
                    {BUILDER_START_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={() => setWizardStep(0)}
                    className="px-6 py-2.5 rounded-full border border-[#d9d9d0] hover:border-black text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-7 py-3 rounded-full bg-[#14140f] hover:bg-black text-[#d6ff3f] font-bold text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: STYLE */}
            {wizardStep === 2 && (
              <div className="flex flex-col gap-6 animate-pc-pop">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f]">
                    How do you like to travel?
                  </h2>
                </div>

                {/* Section 1: Stays */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Stays</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {BUILDER_STAYS.map((s) => {
                      const isSel = stayStyle === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStayStyle(s.id)}
                          className={`flex flex-col text-left p-3.5 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                            isSel
                              ? "bg-[#d6ff3f] border-[#14140f] shadow-xs"
                              : "bg-white border-[#d9d9d0] hover:border-black"
                          }`}
                        >
                          <strong className="text-sm font-bold text-[#14140f]">{s.label}</strong>
                          <small className="text-[11px] text-gray-600 mt-1 leading-snug">{s.desc}</small>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Getting around */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Getting around</span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {BUILDER_VEHICLES.map((v) => {
                      const isSel = transportStyle === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setTransportStyle(v.id)}
                          className={`flex flex-col text-left p-3.5 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                            isSel
                              ? "bg-[#d6ff3f] border-[#14140f] shadow-xs"
                              : "bg-white border-[#d9d9d0] hover:border-black"
                          }`}
                        >
                          <strong className="text-sm font-bold text-[#14140f] leading-tight">{v.label}</strong>
                          <small className="text-[11px] text-gray-600 mt-1 leading-snug">{v.desc}</small>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Pace */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pace</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {BUILDER_PACES.map((p) => {
                      const isSel = paceStyle === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPaceStyle(p.id)}
                          className={`flex flex-col text-left p-3.5 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                            isSel
                              ? "bg-[#d6ff3f] border-[#14140f] shadow-xs"
                              : "bg-white border-[#d9d9d0] hover:border-black"
                          }`}
                        >
                          <strong className="text-sm font-bold text-[#14140f]">{p.label}</strong>
                          <small className="text-[11px] text-gray-600 mt-0.5 leading-snug">{p.desc}</small>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Activities */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Things you&apos;d love to do (optional)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {BUILDER_ACTIVITIES.map((act) => {
                      const isSel = selectedActivities.includes(act);
                      return (
                        <button
                          key={act}
                          type="button"
                          onClick={() => toggleActivity(act)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                            isSel
                              ? "bg-[#14140f] text-white border-[#14140f]"
                              : "bg-white text-gray-700 border-[#d9d9d0] hover:border-black"
                          }`}
                        >
                          {act}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="px-6 py-2.5 rounded-full border border-[#d9d9d0] hover:border-black text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="px-7 py-3 rounded-full bg-[#14140f] hover:bg-black text-[#d6ff3f] font-bold text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DAY BY DAY */}
            {wizardStep === 3 && (
              <div className="flex flex-col gap-6 animate-pc-pop">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f]">
                    Shape it day by day
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Start from a suggestion and make it yours. Don&apos;t worry about getting it perfect — our expert will fine-tune routes and timings with you on the call.
                  </p>
                </div>

                {/* Starters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => syncDaysCount(numDays)}
                    className="p-3.5 rounded-xl border-[1.5px] border-dashed border-[#c9c9bf] hover:border-black text-left flex flex-col gap-1 bg-[#fafaf8] cursor-pointer"
                  >
                    <strong className="text-sm font-bold text-[#14140f]">Suggest a route</strong>
                    <span className="text-[11px] text-gray-500">Our classic route for the places you picked</span>
                  </button>
                  <div className="p-3.5 rounded-xl border-[1.5px] border-dashed border-[#c9c9bf] flex flex-col gap-1 bg-[#fafaf8]">
                    <strong className="text-sm font-bold text-[#14140f]">Start from one of our trips</strong>
                    <select className="w-full mt-1 bg-white border border-[#d9d9d0] rounded-lg p-1.5 text-xs font-medium outline-hidden">
                      <option>Choose a trip...</option>
                      <option>Himachal 8-Day Classic</option>
                      <option>Spiti 4x4 Circuit</option>
                      <option>Ladakh Highlights</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBuilderDays((prev) =>
                        prev.map((d) => ({ ...d, title: "Custom Day", night: "", notes: "" }))
                      );
                    }}
                    className="p-3.5 rounded-xl border-[1.5px] border-dashed border-[#c9c9bf] hover:border-black text-left flex flex-col gap-1 bg-[#fafaf8] cursor-pointer"
                  >
                    <strong className="text-sm font-bold text-[#14140f]">Start blank</strong>
                    <span className="text-[11px] text-gray-500">I know exactly what I want</span>
                  </button>
                </div>

                {/* Days List */}
                <div className="flex flex-col gap-3">
                  {builderDays.map((dayItem, idx) => (
                    <div
                      key={dayItem.id}
                      className="border-[1.5px] border-[#e2e2d9] rounded-2xl bg-white overflow-hidden"
                    >
                      {/* Day Header */}
                      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[#fafaf8] border-b border-[#e9e9e1]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-extrabold text-[#14140f]">
                            Day {dayItem.dayNum}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium">
                            {dayItem.dateStr}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={dayItem.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBuilderDays((prev) =>
                              prev.map((d, i) => (i === idx ? { ...d, title: val } : d))
                            );
                          }}
                          className="flex-1 font-bold text-sm text-[#14140f] bg-transparent border-b border-transparent hover:border-black focus:border-black outline-hidden px-1 py-0.5"
                        />
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveDay(idx, "up")}
                            className="w-7 h-7 rounded-lg border border-[#d9d9d0] flex items-center justify-center text-xs hover:border-black disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUpIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === builderDays.length - 1}
                            onClick={() => moveDay(idx, "down")}
                            className="w-7 h-7 rounded-lg border border-[#d9d9d0] flex items-center justify-center text-xs hover:border-black disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteDay(idx)}
                            className="w-7 h-7 rounded-lg border border-[#d9d9d0] flex items-center justify-center text-xs hover:border-black text-red-500 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Day Body */}
                      <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-gray-500">Night stay</label>
                          <input
                            type="text"
                            value={dayItem.night}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBuilderDays((prev) =>
                                prev.map((d, i) => (i === idx ? { ...d, night: val } : d))
                              );
                            }}
                            placeholder="Town or hotel location"
                            className="bg-white border border-[#d9d9d0] rounded-lg p-2 text-xs outline-hidden focus:border-black"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-gray-500">Places & things to do</label>
                          <input
                            type="text"
                            placeholder="Add a place or activity, then Enter"
                            className="bg-white border border-[#d9d9d0] rounded-lg p-2 text-xs outline-hidden focus:border-black"
                          />
                        </div>

                        <div className="sm:col-span-2 flex flex-col gap-1">
                          <label className="font-bold text-gray-500">Notes</label>
                          <textarea
                            rows={1}
                            value={dayItem.notes}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBuilderDays((prev) =>
                                prev.map((d, i) => (i === idx ? { ...d, notes: val } : d))
                              );
                            }}
                            placeholder="Anything special for this day"
                            className="bg-white border border-[#d9d9d0] rounded-lg p-2 text-xs outline-hidden focus:border-black"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={addDay}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black text-xs font-bold text-[#14140f] hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    + Add a day
                  </button>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-6 py-2.5 rounded-full border border-[#d9d9d0] hover:border-black text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(4)}
                    className="px-7 py-3 rounded-full bg-[#14140f] hover:bg-black text-[#d6ff3f] font-bold text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SEND & SUMMARY */}
            {wizardStep === 4 && (
              <div className="flex flex-col gap-6 animate-pc-pop">
                {!builderSubmitted ? (
                  <form onSubmit={handleBuilderSubmit} className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f]">
                        Your trip, ready to send
                      </h2>
                    </div>

                    {/* Summary Review Table */}
                    <div className="border-[1.5px] border-[#e2e2d9] rounded-2xl overflow-hidden bg-white text-xs">
                      <div className="flex items-center justify-between p-3.5 border-b border-[#eeeee7]">
                        <span className="font-bold text-gray-400 w-20">Where</span>
                        <strong className="flex-1 text-[#14140f] font-bold text-sm">{activeRegionNames}</strong>
                        <button
                          type="button"
                          onClick={() => setWizardStep(0)}
                          className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3.5 border-b border-[#eeeee7]">
                        <span className="font-bold text-gray-400 w-20">When</span>
                        <span className="flex-1 text-[#14140f] font-medium text-xs">
                          {startDate} · {numDays} days {flexibleDates ? "(Dates flexible)" : ""}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3.5 border-b border-[#eeeee7]">
                        <span className="font-bold text-gray-400 w-20">Who</span>
                        <span className="flex-1 text-[#14140f] font-medium text-xs">
                          {adults} adults{children > 0 ? `, ${children} child` : ""} · {groupType} · starting from {startCity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3.5">
                        <span className="font-bold text-gray-400 w-20">Style</span>
                        <span className="flex-1 text-[#14140f] font-medium text-xs">
                          {stayLabel} stays · transport: {transportLabel} · {paceLabel} pace
                        </span>
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Day by Day Vertical Timeline Preview */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-base text-[#14140f]">Day by day</h3>
                        <button
                          type="button"
                          onClick={() => setWizardStep(3)}
                          className="font-bold text-xs underline underline-offset-2 hover:text-black cursor-pointer"
                        >
                          Edit days
                        </button>
                      </div>

                      <ol className="relative border-l-2 border-[#14140f] ml-3 pl-5 space-y-4 my-2 text-xs">
                        {builderDays.map((d) => (
                          <li key={d.id} className="relative">
                            <span className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#d6ff3f] border-2 border-[#14140f]" />
                            <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block">
                              DAY {d.dayNum}
                            </span>
                            <strong className="block text-sm font-bold text-[#14140f] leading-tight mt-0.5">
                              {d.title}
                            </strong>
                            {d.night && (
                              <span className="text-gray-500 text-[11px] block mt-0.5">
                                Night: {d.night}
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Contact Form Fields */}
                    <div className="border-t border-[#e6e6df] pt-6 flex flex-col gap-4 text-xs">
                      <h3 className="text-lg font-bold text-[#14140f]">Where should our trip expert call you?</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-gray-600">Your name *</label>
                          <input
                            type="text"
                            required
                            value={custName}
                            onChange={(e) => setCustName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="bg-white border border-[#d9d9d0] rounded-xl p-2.5 text-xs outline-hidden focus:border-black"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-gray-600">Mobile (WhatsApp) *</label>
                          <input
                            type="tel"
                            required
                            value={custPhone}
                            onChange={(e) => setCustPhone(e.target.value)}
                            placeholder="98765 43210"
                            className="bg-white border border-[#d9d9d0] rounded-xl p-2.5 text-xs outline-hidden focus:border-black"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-gray-600">Email (optional)</label>
                          <input
                            type="email"
                            value={custEmail}
                            onChange={(e) => setCustEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            className="bg-white border border-[#d9d9d0] rounded-xl p-2.5 text-xs outline-hidden focus:border-black"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-gray-600">Best time to call</label>
                          <select
                            value={custCallTime}
                            onChange={(e) => setCustCallTime(e.target.value)}
                            className="bg-white border border-[#d9d9d0] rounded-xl p-2.5 text-xs outline-hidden focus:border-black cursor-pointer"
                          >
                            <option value="As soon as possible">As soon as possible</option>
                            <option value="Morning (10 AM – 1 PM)">Morning (10 AM – 1 PM)</option>
                            <option value="Afternoon (1 – 4 PM)">Afternoon (1 – 4 PM)</option>
                            <option value="Evening (4 – 7 PM)">Evening (4 – 7 PM)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2 flex flex-col gap-1">
                          <label className="font-bold text-gray-600">Anything else we should know? (optional)</label>
                          <textarea
                            rows={3}
                            value={custNotes}
                            onChange={(e) => setCustNotes(e.target.value)}
                            placeholder="Budget in mind, a birthday on the trip, elderly parents, dietary needs..."
                            className="bg-white border border-[#d9d9d0] rounded-xl p-2.5 text-xs outline-hidden focus:border-black"
                          />
                        </div>
                      </div>

                      {/* Callback promise banner */}
                      <div className="bg-[#14140f] text-white p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-semibold">
                        <Phone className="w-4 h-4 text-[#d6ff3f]" />
                        <span>Our trip expert will call you within 24 hours with a price for your trip.</span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-2">
                      <button
                        type="button"
                        onClick={() => setWizardStep(3)}
                        className="px-6 py-2.5 rounded-full border border-[#d9d9d0] hover:border-black text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-sm shadow-[0_8px_20px_-6px_rgba(214,255,63,0.7)] transition-all active:scale-95 cursor-pointer"
                      >
                        Send my itinerary
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Done Confirmation Screen */
                  <div className="text-center py-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#d6ff3f] border-2 border-[#14140f] text-[#14140f] flex items-center justify-center font-bold text-3xl shadow-lg">
                      ✓
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#14140f]">Plan sent to our team!</h2>
                    <p className="text-base text-gray-700 max-w-md font-medium">
                      Our Himalayan trip expert will call you at <strong>{custPhone}</strong> {custCallTime.toLowerCase()} with a customized price for your {numDays}-day {activeRegionNames} trip.
                    </p>
                    <span className="text-xs text-gray-400">Reference: {builderRef}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBuilderSubmitted(false);
                        setStepMode(false);
                      }}
                      className="mt-4 px-7 py-3 rounded-full bg-[#14140f] text-[#d6ff3f] font-bold text-xs transition-transform active:scale-95 cursor-pointer"
                    >
                      Back to trip planner
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Step Mode Full Standard Footer matching reference */}
        <footer className="max-w-[920px] mx-auto px-4 mt-16 pt-10 border-t border-[#e6e6df] text-[#14140f]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#e6e6df]">
            <div className="flex flex-col gap-2.5">
              <Image
                src="/assets/images/logo/logo-black-full.png"
                alt="Awara Banjara"
                width={150}
                height={30}
                className="h-7 w-auto object-contain"
              />
              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                Curated journeys for curious minds. We handle the details so you can focus on the memory.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-gray-400 mb-2.5">Explore</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                <li><Link href="/community-trips" className="hover:text-black">Community Trips</Link></li>
                <li><Link href="/experiences" className="hover:text-black">Experiences</Link></li>
                <li><Link href="/plan-your-trip" className="hover:text-black">Plan Your Trip</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-gray-400 mb-2.5">Company</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                <li><Link href="/" className="hover:text-black">Home</Link></li>
                <li><Link href="/about" className="hover:text-black">About Us</Link></li>
                <li><Link href="/founder" className="hover:text-black">Founder&apos;s Story</Link></li>
                <li><Link href="/postcards" className="hover:text-black">Postcards</Link></li>
                <li><Link href="/careers" className="hover:text-black">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-gray-400 mb-2.5">Help</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                <li><Link href="/booking-terms" className="hover:text-black">Booking T&amp;C</Link></li>
                <li><Link href="/cancellation-policy" className="hover:text-black">Cancellation Policy</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-black">Contact</Link></li>
                <li><Link href="/payment-details" className="hover:text-black">Payment Details</Link></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 pt-6">
            © 2026 Awara Banjara · Made in India ✦
          </p>
        </footer>
      </div>
    );
  }

  // ==========================================
  // RENDER: CHAT PLANNER MODE (DEFAULT)
  // ==========================================
  return (
    <div
      className="min-h-[calc(100vh-73px)] w-full flex flex-col justify-between font-sans selection:bg-[#d6ff3f] selection:text-[#14140f]"
      style={{
        backgroundColor: "#14140f",
        backgroundImage:
          "linear-gradient(180deg, rgba(14, 16, 12, 0.72) 0%, rgba(14, 16, 12, 0.6) 50%, rgba(14, 16, 12, 0.85) 100%), url('/assets/images/home/hero-poster.jpg')",
        backgroundPosition: "center 35%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Stage Head - Clean and Responsive matching Mobile & Desktop */}
      <section className="text-center text-white pt-3 sm:pt-8 pb-2 sm:pb-3 px-4 select-none shrink-0">
        <span className="hidden sm:inline-block bg-[#d6ff3f] text-[#14140f] text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
          Private trip planner
        </span>
        <h1 className="text-[22px] sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight drop-shadow-md">
          Plan your Himalayan trip<span className="text-[#d6ff3f]">.</span>
        </h1>
        <p className="hidden sm:block mt-2 text-sm sm:text-base text-white/85 max-w-xl mx-auto font-normal">
          Chat with Banjara, shape it day by day, and our trip expert calls you with the price.
        </p>
      </section>

      {/* Main App Frame */}
      <main className="max-w-[1180px] w-full mx-auto px-2 sm:px-4 pb-2 sm:pb-4 flex-1 flex flex-col justify-center">
        {/* App Container: Single Column on Mobile, Two Columns on Desktop */}
        <div className="bg-white rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(10,12,8,0.55),0_0_0_1px_rgba(255,255,255,0.08)] grid grid-cols-1 lg:grid-cols-[1fr_370px] min-h-[560px] h-auto relative">
          {/* Left Column: Chat App */}
          <div className="flex flex-col min-w-0 bg-white">
            {/* Chat Header */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-[#e8e8e0] shrink-0 bg-white">
              <div className="relative w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-full bg-[#14140f] overflow-hidden shrink-0 border-[1.5px] border-[#14140f] shadow-xs">
                <Image
                  src="/assets/images/mascot/banjara-face.webp"
                  alt="Banjara Avatar"
                  fill
                  className="object-cover object-top scale-110"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <strong className="text-[#14140f] text-[15px] sm:text-[15.5px] font-bold leading-tight">
                  Banjara
                </strong>
                <small className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-gray-500 leading-tight">
                  <span className="w-2 h-2 rounded-full bg-[#b8ff00] border border-[#14140f] animate-banjara-online" />
                  Trip planner · usually replies in seconds
                </small>
              </div>
              <button
                type="button"
                onClick={handleRestart}
                title="Start a new trip"
                className="inline-flex items-center justify-center gap-1.5 border border-[#e8e8e0] bg-white hover:border-[#14140f] text-[#14140f] rounded-full p-2 sm:px-3 sm:py-1.5 text-[12px] font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New trip</span>
              </button>
            </div>

            {/* Chat Messages Thread */}
            <div className="flex-1 px-3.5 sm:px-6 py-3 sm:py-4 flex flex-col gap-2.5 sm:gap-3 bg-white">
              {conversationStage === 0 ? (
                <div key={welcomeKey} className="flex flex-col gap-2.5 sm:gap-3">
                  {/* Standing Character in Welcome State */}
                  <div className="w-[95px] h-[125px] sm:w-[115px] sm:h-[145px] mx-auto my-1 relative shrink-0 pointer-events-none">
                    <div className="w-full h-full animate-banjara-breathe relative">
                      <Image
                        src="/assets/images/mascot/banjara-standing.webp"
                        alt="Banjara Mascot"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Sender label */}
                  <span className="text-[11px] sm:text-[11.5px] text-gray-400 font-bold ml-1 sm:ml-2 mb-[-4px]">
                    Banjara
                  </span>

                  {/* Bubble 1: 0s delay */}
                  <div className="pc-pop-1 max-w-[88%] sm:max-w-[80%] self-start">
                    <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13.5px] sm:text-[14.5px] leading-relaxed bg-[#e9e9eb] text-[#14140f] rounded-[18px] rounded-bl-[4px]">
                      Hey! I'm Banjara, Awara Banjara's trip planner 👋
                    </div>
                  </div>

                  {/* Bubble 2: 0.45s delay, bold text */}
                  <div className="pc-pop-2 max-w-[88%] sm:max-w-[80%] self-start">
                    <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13.5px] sm:text-[14.5px] font-bold leading-relaxed bg-[#e9e9eb] text-[#14140f] rounded-[18px] rounded-bl-[4px]">
                      Where are the mountains calling you?
                    </div>
                  </div>

                  {/* Bubble 3: 0.9s delay */}
                  <div className="pc-pop-3 max-w-[88%] sm:max-w-[80%] self-start">
                    <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13.5px] sm:text-[14.5px] leading-relaxed bg-[#e9e9eb] text-[#14140f] rounded-[18px] rounded-bl-[4px]">
                      Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price.
                    </div>
                  </div>

                  {/* Initial 4 Suggestion Cards: 1.3s delay */}
                  <div className="pc-pop-starts flex flex-row overflow-x-auto gap-2.5 py-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:overflow-visible no-scrollbar mt-1">
                    {STARTS.map((start) => (
                      <button
                        key={start.id}
                        type="button"
                        onClick={() => handleSelectTrip(start)}
                        className="relative shrink-0 min-w-[124px] w-[124px] h-[124px] sm:min-w-0 sm:w-auto sm:aspect-[4/5] sm:min-h-[190px] rounded-[16px] sm:rounded-[18px] overflow-hidden p-0 text-left bg-[#14140f] text-white shadow-[0_10px_24px_-14px_rgba(20,20,15,0.6)] hover:-translate-y-1 transition-all duration-200 group cursor-pointer border-none"
                      >
                        <Image
                          src={start.image}
                          alt={start.title}
                          fill
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
                    Banjara
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
                    {/* Bot Avatar Icon: only shown for active conversation bot replies */}
                    {msg.sender === "bot" && !isInitialBotMsg && (
                      <div className="w-7 h-7 rounded-full bg-[#14140f] overflow-hidden shrink-0 mb-1 border border-[#14140f] shadow-xs relative">
                        <Image
                          src="/assets/images/mascot/banjara-face.webp"
                          alt="Banjara"
                          fill
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
                            ? "bg-[#e9e9eb] text-[#14140f] font-bold rounded-[18px] rounded-bl-[4px]"
                            : "bg-[#e9e9eb] text-[#14140f] rounded-[18px] rounded-bl-[4px]"
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
                              <small className="text-[11px] text-white/70">
                                {msg.planUpdate.route}
                              </small>
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
                            Slide to roughly what each person would like to spend, excluding travel to the starting city.
                          </p>
                        </div>

                        {/* Value Output */}
                        <div className="text-center font-bold text-sm sm:text-base text-[#d6ff3f] py-1 bg-white/5 rounded-lg border border-white/10">
                          ₹{budgetVal.toLocaleString("en-IN")}{budgetVal >= 200000 ? "+" : ""} per person
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

                  {/* Mobile Floating Pill Button: "Your trip so far ↑" */}
                  {activeTrip && (
                    <div className="lg:hidden flex items-center justify-start py-1">
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
                </>
              )}

              {/* Animated Typing Bubble */}
              {isTyping && (
                <div className="self-start flex items-center gap-1.5 px-3.5 py-2 bg-[#e9e9eb] rounded-[18px] w-fit animate-pc-pop">
                  <span className="text-[11.5px] font-semibold text-gray-500 mr-1.5">Mapping your route…</span>
                  <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-1 block" />
                  <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-2 block" />
                  <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-3 block" />
                </div>
              )}

              <div ref={threadEndRef} />
            </div>

            {/* Composer */}
            <div className="p-2.5 sm:p-4 bg-white border-t border-[#e8e8e0] shrink-0">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 bg-white rounded-full p-1 pl-4 sm:pl-5 shadow-[0_0_0_1.5px_#e8e8e0,0_8px_24px_-14px_rgba(20,20,15,0.35)] focus-within:shadow-[0_0_0_2px_#14140f,0_8px_24px_-14px_rgba(20,20,15,0.35)] transition-shadow"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tell Banjara about your trip…"
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
          <aside className="hidden lg:flex bg-[#14140f] text-white flex-col relative select-none">
            {/* Ticket Head with Cutout Notches */}
            <div
              className={`relative p-5 sm:p-6 border-b-2 border-dashed border-white/15 transition-all ${
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

            {/* Ticket Body with Ultra-thin Custom Scrollbar */}
            <div className="ticket-scroll flex-1 p-5 sm:p-6 flex flex-col gap-5">
              {renderTicketContent()}
            </div>

            {/* Ticket Footer */}
            <div className="p-5 sm:p-6 border-t border-white/10 flex flex-col gap-2 text-center bg-[#14140f]">
              <button
                type="button"
                disabled={activeTrip?.stage !== 6}
                onClick={() => setModalOpen(true)}
                className={`w-full py-3.5 px-4 rounded-full font-bold text-[14.5px] transition-all duration-200 cursor-pointer ${
                  activeTrip?.stage === 6
                    ? "bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] shadow-[0_8px_24px_-6px_rgba(214,255,63,0.7)] hover:-translate-y-0.5"
                    : "bg-white/10 text-white/40 cursor-not-allowed border-none"
                }`}
              >
                {activeTrip?.stage === 6 ? "Send to our team →" : "Plan a few days first"}
              </button>
              <small className="text-[11.5px] text-white/55">
                No payment now · our expert calls you with the exact price
              </small>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Slide-Up Ticket Sheet */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileTicketOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileTicketOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        <aside
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] bg-[#14140f] text-white rounded-t-[26px] shadow-2xl flex flex-col transition-transform duration-300 ease-out z-10 ${
            mobileTicketOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="relative p-5 border-b-2 border-dashed border-white/15 flex items-center justify-between">
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
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
              aria-label="Close ticket sheet"
            >
              ✕
            </button>
          </div>

          <div className="ticket-scroll flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4">
            {renderTicketContent()}
          </div>

          <div className="p-4 border-t border-white/10 flex flex-col gap-1.5 text-center bg-[#14140f]">
            <button
              type="button"
              disabled={activeTrip?.stage !== 6}
              onClick={() => {
                setMobileTicketOpen(false);
                setModalOpen(true);
              }}
              className={`w-full py-3 px-4 rounded-full font-bold text-[14px] transition-all cursor-pointer ${
                activeTrip?.stage === 6
                  ? "bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] shadow-[0_8px_20px_-6px_rgba(214,255,63,0.7)]"
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

      {/* Minimal Footer on Mountain Backdrop - Seamless Without Any White Space */}
      <footer className="w-full py-3 sm:py-4 text-center text-[11px] sm:text-xs text-white/60 tracking-wider select-none shrink-0">
        © 2026 Awara Banjara · Made in India ✦
      </footer>

      {/* Inquiry Dialog Modal (Chat Mode) */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#14140f] text-white w-full max-w-md rounded-[28px] border border-white/15 p-6 sm:p-8 relative shadow-2xl animate-pc-pop">
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
                  <div>
                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm outline-hidden focus:border-[#d6ff3f]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider block mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm outline-hidden focus:border-[#d6ff3f]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider block mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm outline-hidden focus:border-[#d6ff3f]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider block mb-1">
                      When should we call?
                    </label>
                    <select
                      value={custCallTime}
                      onChange={(e) => setCustCallTime(e.target.value)}
                      className="w-full bg-[#20201a] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm outline-hidden focus:border-[#d6ff3f]"
                    >
                      <option value="As soon as possible">As soon as possible</option>
                      <option value="Morning (10 AM – 1 PM)">Morning (10 AM – 1 PM)</option>
                      <option value="Afternoon (1 – 4 PM)">Afternoon (1 – 4 PM)</option>
                      <option value="Evening (4 – 7 PM)">Evening (4 – 7 PM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-3 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-sm shadow-[0_8px_20px_-4px_rgba(214,255,63,0.6)] cursor-pointer"
                >
                  Confirm & Request Call →
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-bold text-2xl mb-1 shadow-lg">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Plan sent successfully!</h3>
                <p className="text-sm text-white/75 max-w-xs">
                  Your reference ID is <strong className="text-[#d6ff3f]">{builderRef}</strong>. Our trip expert will call you at{" "}
                  <strong>{custPhone}</strong> {custCallTime.toLowerCase()}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setInquirySubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Back to trip planner
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
