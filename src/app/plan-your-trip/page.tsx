"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, RotateCcw, MessageSquare, Phone, ChevronRight, Check, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  chips?: string[];
  showBudgetSlider?: boolean;
  showLockCard?: {
    proposed: string;
  };
  itineraryUpdate?: ItineraryData;
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
  route: string[];
  facts: {
    when: string;
    length: string;
    who: string;
    from: string;
    transport: string;
    stays: string;
    pace?: string;
  };
  itinerary: ItineraryDay[];
}

const PRESETS: Record<string, ItineraryData> = {
  spiti: {
    title: "Spiti Valley Full Circuit",
    region: "Spiti Valley + Himachal",
    days: 8,
    route: ["Delhi", "Narkanda", "Chitkul", "Tabo", "Kaza", "Chandratal", "Manali", "Delhi"],
    facts: {
      when: "June – September",
      length: "8 days / 7 nights",
      who: "Friends & Road Trippers",
      from: "Delhi",
      transport: "Private 4x4 SUV",
      stays: "Comfort Homestays & Camps",
      pace: "Adventurous",
    },
    itinerary: [
      {
        day: 1,
        title: "Delhi to Narkanda via Shimla",
        stops: "Himalayan Expressway · Shimla · Fagu",
        desc: "Early morning drive into the Shivalik foothills, crossing apple orchards to Narkanda.",
        night: "Narkanda",
      },
      {
        day: 2,
        title: "Narkanda to Sangla & Chitkul",
        stops: "Rampur · Kinnaur Gate · Baspa Valley",
        desc: "Drive through the cliff-hewn Kinnaur road into Baspa Valley, reaching India's last inhabited village.",
        night: "Chitkul",
      },
      {
        day: 3,
        title: "Chitkul to Nako & Tabo",
        stops: "Khab Sangam · Nako Sacred Lake · Gue Mummy",
        desc: "Confluence of Spiti & Sutlej rivers, entering the Trans-Himalayan high desert plateau.",
        night: "Tabo",
      },
      {
        day: 4,
        title: "Tabo to Dhankar & Kaza",
        stops: "1000-yr old Tabo Monastery · Dhankar Cliff Gompa",
        desc: "Explore ancient mud murals in Tabo, cliffside Dhankar fortress, and reach Spiti's capital Kaza.",
        night: "Kaza",
      },
      {
        day: 5,
        title: "Kaza Highest Villages & Key Monastery",
        stops: "Key Gompa · Kibber · Chicham Bridge · Langza · Hikkim · Komic",
        desc: "Iconic Key Monastery, cross Asia's highest suspension bridge, and post a postcard from the world's highest post office.",
        night: "Kaza",
      },
      {
        day: 6,
        title: "Kaza to Chandratal Moon Lake via Kunzum La",
        stops: "Losar · Kunzum Pass (14,931 ft) · Chandratal Lake",
        desc: "High mountain pass crossing Kunzum La, descend to the crescent-shaped sacred blue lake with luxury camping.",
        night: "Chandratal Camp",
      },
      {
        day: 7,
        title: "Chandratal to Manali via Atal Tunnel",
        stops: "Batal · Gramphu · Atal Tunnel · Solang",
        desc: "Drive through the rugged Chandra river valley, emerge from Atal Tunnel into lush green Kullu Valley.",
        night: "Manali",
      },
      {
        day: 8,
        title: "Manali to Delhi Departure",
        stops: "Kullu · Mandi · Chandigarh",
        desc: "Scenic journey back to Delhi with unforgettable memories of the cold desert.",
        night: "Departure",
      },
    ],
  },
  ladakh: {
    title: "Ladakh High Passes & Blue Lakes",
    region: "Ladakh",
    days: 7,
    route: ["Leh", "Nubra Valley", "Turtuk", "Pangong Tso", "Leh"],
    facts: {
      when: "May – October",
      length: "7 days / 6 nights",
      who: "Couples & Small Groups",
      from: "Leh",
      transport: "Deluxe Toyota Innova / Fortuner",
      stays: "Boutique Heritage Stays & Luxury Domes",
      pace: "Moderate & Acclimatized",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh & Complete Rest",
        stops: "Leh Airport · Shanti Stupa evening sunset",
        desc: "Mandatory rest for high altitude acclimatization (11,500 ft). Gentle evening stroll to Shanti Stupa.",
        night: "Leh",
      },
      {
        day: 2,
        title: "Sham Valley & Monasteries",
        stops: "Magnetic Hill · Indus-Zanskar Sangam · Hall of Fame",
        desc: "Witness the confluence of two great rivers, optical illusion of Magnetic Hill, and Gurudwara Pathar Sahib.",
        night: "Leh",
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La",
        stops: "Khardung La (17,982 ft) · Diskit Monastery · Hunder Sand Dunes",
        desc: "Cross one of the world's highest motorable passes, see the giant Maitreya Buddha, and ride double-humped Bactrian camels.",
        night: "Hunder (Nubra)",
      },
      {
        day: 4,
        title: "Excursion to Turtuk Village",
        stops: "Thang Border Viewpoint · Turtuk Balti Heritage",
        desc: "Explore apricot orchards and unique Indo-Aryan Balti culture in the northernmost village opened to travelers.",
        night: "Hunder (Nubra)",
      },
      {
        day: 5,
        title: "Nubra to Pangong Tso via Shyok River",
        stops: "Agham · Shyok Gorge · Durbuk · Pangong Tso",
        desc: "Wild river route to the shimmering multi-hued saltwater lake stretching across the international border into Tibet.",
        night: "Pangong Lake Camp",
      },
      {
        day: 6,
        title: "Pangong Sunrise & Return to Leh via Chang La",
        stops: "Chang La (17,688 ft) · Thiksey Monastery · Shey Palace",
        desc: "Captivating sunrise over Pangong Lake, high-pass crossing Chang La, and visit majestic multi-tier Thiksey Monastery.",
        night: "Leh",
      },
      {
        day: 7,
        title: "Fly Out from Leh",
        stops: "Leh Kushok Bakula Rimpochee Airport",
        desc: "Scenic flight over the snow-covered Greater Himalayas back home.",
        night: "Departure",
      },
    ],
  },
  kashmir: {
    title: "Kashmir Family Escape",
    region: "Kashmir",
    days: 7,
    route: ["Delhi", "Srinagar Houseboat", "Gulmarg", "Pahalgam", "Sonamarg", "Srinagar"],
    facts: {
      when: "Year-Round (Best Apr – Nov)",
      length: "7 days / 6 nights",
      who: "Family (4 adults, 2 children)",
      from: "Delhi",
      transport: "Comfortable Innova Crysta",
      stays: "Deluxe Houseboat & 4-Star Resorts",
      pace: "Relaxed & Family Friendly",
    },
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival & Houseboat Stay",
        stops: "Dal Lake · Mughal Gardens · Evening Shikara",
        desc: "Traditional Kashmiri welcome with hot Kehwa. Evening relaxing shikara cruise past floating vegetable gardens.",
        night: "Srinagar Houseboat",
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg Meadow of Flowers",
        stops: "Tangmarg · Gulmarg Golf Course · Apharwat Peak",
        desc: "Ride the world's second-highest cable car, Gulmarg Gondola Phase 1 & 2, with panoramic snow views.",
        night: "Gulmarg",
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam Valley of Shepherds",
        stops: "Pampore Saffron Fields · Awantipora Ruins · Lidder River",
        desc: "Drive through saffron town Pampore, stop at 9th-century temple ruins, and check into riverside resort in Pahalgam.",
        night: "Pahalgam",
      },
      {
        day: 4,
        title: "Pahalgam Valleys & Baisaran Meadow",
        stops: "Betaab Valley · Aru Wildlife Sanctuary · Mini Switzerland",
        desc: "Pony ride up to lush pine meadows of Baisaran, visit crystal-clear waters of Betaab Valley where Bollywood classics were shot.",
        night: "Pahalgam",
      },
      {
        day: 5,
        title: "Pahalgam to Sonamarg Meadow of Gold",
        stops: "Sindh Valley · Thajiwas Glacier · Nilagrad River",
        desc: "Scenic drive alongside turquoise Sindh river to glacier-ringed Sonamarg. Sledge ride on snow in Thajiwas.",
        night: "Sonamarg / Srinagar",
      },
      {
        day: 6,
        title: "Old Srinagar Heritage & Local Markets",
        stops: "Jamia Masjid · Shah Hamdan Shrine · Lal Chowk Dry Fruit Bazaars",
        desc: "Heritage walk through wood-carved Old City bridges, copperware shopping, and tasting Wazwan delicacies.",
        night: "Srinagar",
      },
      {
        day: 7,
        title: "Srinagar Airport Departure",
        stops: "Sheikh ul-Alam International Airport",
        desc: "Transfer to airport with Kashmiri saffron and walnut gifts, carrying paradise memories.",
        night: "Departure",
      },
    ],
  },
  himachal: {
    title: "Offbeat Himachal & Parvati Valley",
    region: "Himachal Pradesh",
    days: 6,
    route: ["Delhi", "Manali", "Kasol", "Jibhi", "Tirthan Valley", "Delhi"],
    facts: {
      when: "March – November",
      length: "6 days / 5 nights",
      who: "Couples & Friends",
      from: "Delhi / Chandigarh",
      transport: "Private Urban Cruiser",
      stays: "Riverside Wood Cottages",
      pace: "Balanced Leisure & Treks",
    },
    itinerary: [
      {
        day: 1,
        title: "Delhi to Old Manali Overnight Drive",
        stops: "Sundernagar Lake · Pandoh Dam · Beas River",
        desc: "Ascend into the lush green cedar forests of Kullu Valley, arriving in bohemian Old Manali.",
        night: "Old Manali",
      },
      {
        day: 2,
        title: "Old Manali Cafés, Jogini Waterfalls & Solang",
        stops: "Hadimba Temple · Vashisht Hot Springs · Jogini Falls",
        desc: "Pine forest hike to Jogini falls, dip in natural sulfur hot springs, and evening riverside live acoustic music.",
        night: "Old Manali",
      },
      {
        day: 3,
        title: "Manali to Kasol & Chalal Village",
        stops: "Naggar Castle · Manikaran Sahib Gurudwara · Parvati River",
        desc: "Visit historic Naggar wood architecture, sacred Manikaran hot springs, and cross the suspension bridge into peaceful Chalal.",
        night: "Kasol",
      },
      {
        day: 4,
        title: "Kasol to Jibhi & Jalori Pass",
        stops: "Aut Tunnel · Banjar Valley · Jalori Pass (10,800 ft) · Serolsar Lake",
        desc: "Cross over Jalori Pass with dense oak & rhododendron forest hike to mystical Serolsar Lake.",
        night: "Jibhi",
      },
      {
        day: 5,
        title: "Jibhi Waterfalls & Tirthan Valley Riverside",
        stops: "Jibhi Wooden Bridges · Chehni Kothi Fort Tower · Tirthan River",
        desc: "Relax by the trout streams of UNESCO Great Himalayan National Park buffer zone in Tirthan Valley.",
        night: "Tirthan",
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

export default function PlanYourTripPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "Hey! I'm Banjara, Awara Banjara's trip planner 👋",
    },
    {
      id: "msg-2",
      sender: "bot",
      text: "Where are the mountains calling you?",
    },
    {
      id: "msg-3",
      sender: "bot",
      text: "Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price.",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTrip, setActiveTrip] = useState<ItineraryData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [stepMode, setStepMode] = useState(false);
  const [ticketFlash, setTicketFlash] = useState(false);
  const [budgetVal, setBudgetVal] = useState(30000);

  // Inquiry form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [callTime, setCallTime] = useState("As soon as possible");
  const [notes, setNotes] = useState("");
  const [refCode, setRefCode] = useState("AB-7294");

  // Step Mode Wizard states
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["spiti"]);
  const [wizardDays, setWizardDays] = useState(8);
  const [wizardGroup, setWizardGroup] = useState("Group of friends");
  const [wizardStay, setWizardStay] = useState("Comfort & boutique stays");
  const [wizardTransport, setWizardTransport] = useState("Private SUV");

  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 3 || isTyping) {
      threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const triggerBotResponse = (userText: string, tripKey?: string) => {
    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let key = tripKey;
      const lower = userText.toLowerCase();

      if (!key) {
        if (lower.includes("spiti") || lower.includes("kaza")) key = "spiti";
        else if (lower.includes("ladakh") || lower.includes("leh") || lower.includes("pangong")) key = "ladakh";
        else if (lower.includes("kashmir") || lower.includes("gulmarg") || lower.includes("srinagar") || lower.includes("pahalgam")) key = "kashmir";
        else key = "himachal";
      }

      const preset = PRESETS[key] || PRESETS.spiti;
      setActiveTrip(preset);

      // Flash ticket header to draw attention
      setTicketFlash(true);
      setTimeout(() => setTicketFlash(false), 1200);

      // Tailored response and interactive chips
      let replyText = "";
      let chips: string[] = [];

      if (key === "spiti") {
        replyText = `Spiti is a breathtaking cold desert! Since you're planning a road trip, what month are you thinking of travelling? June to September is the prime season when Kunzum Pass is fully open.`;
        chips = ["June", "July", "August", "September", "8 Days Full Circuit", "Comfort homestays & SUV"];
      } else if (key === "ladakh") {
        replyText = `Wonderful! Ladakh in summer has high passes, clear blue skies, and turquoise lakes. How many days would you like to plan, and who's travelling along?`;
        chips = ["7 Days", "9 Days", "Couples / Friends", "Luxury camps & SUV"];
      } else if (key === "kashmir") {
        replyText = `Magical choice! Kashmir with family offers peaceful houseboats on Dal Lake and snow meadows in Gulmarg. How many days are you planning?`;
        chips = ["7 Days", "Family (4 adults, 2 kids)", "Comfort hotels & houseboat", "Comfortable SUV"];
      } else {
        replyText = `Awesome! We can craft a bespoke offbeat Himachal trip covering pine valleys, riverside cottages, and mountain passes. Here is our classic route shaped on your trip ticket.`;
        chips = ["6 Days", "Riverside Cottages", "Private Urban Cruiser", "Tell us your budget"];
      }

      const botReply: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: replyText,
        chips,
        showBudgetSlider: true,
      };

      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  const handleSelectTrip = (start: (typeof STARTS)[0]) => {
    triggerBotResponse(start.say, start.id);
  };

  const handleChipClick = (chip: string) => {
    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: chip,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botReply: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: `Got it: "${chip}". I've updated your preferences on your trip ticket. Review the day-by-day plan on the right, and tap "Send to our team →" whenever you'd like our trip expert to call you with the exact group quote!`,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    setInputText("");
    triggerBotResponse(query);
  };

  const handleRestart = () => {
    if (window.confirm("Start a new trip plan? This clears the current chat and ticket.")) {
      setMessages([
        {
          id: "msg-1",
          sender: "bot",
          text: "Hey! I'm Banjara, Awara Banjara's trip planner 👋",
        },
        {
          id: "msg-2",
          sender: "bot",
          text: "Where are the mountains calling you?",
        },
        {
          id: "msg-3",
          sender: "bot",
          text: "Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price.",
        },
      ]);
      setActiveTrip(null);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const randomCode = "AB-" + Math.floor(1000 + Math.random() * 9000);
    setRefCode(randomCode);
    setInquirySubmitted(true);
  };

  const formatSliderPct = (val: number, min: number, max: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  return (
    <div
      className="flex-1 w-full flex flex-col font-sans selection:bg-[#d6ff3f] selection:text-[#14140f]"
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
      {/* Stage Head */}
      <section className="text-center text-white pt-6 sm:pt-8 pb-5 px-4 select-none">
        <span className="inline-block bg-[#d6ff3f] text-[#14140f] text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
          Private trip planner
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight drop-shadow-md">
          Plan your Himalayan trip<span className="text-[#d6ff3f]">.</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-white/85 max-w-xl mx-auto font-normal">
          Chat with Banjara, shape it day by day, and our trip expert calls you with the price.
        </p>
      </section>

      {/* Main App Frame */}
      <main className="max-w-[1180px] w-full mx-auto px-4 pb-8 flex-1 flex flex-col">
        {stepMode ? (
          /* Step by Step Structured Wizard Mode */
          <div className="bg-white rounded-[28px] p-6 sm:p-10 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-4">
              <button
                onClick={() => setStepMode(false)}
                className="inline-flex items-center gap-1.5 font-bold text-sm text-[#14140f] hover:text-[#2fa84f] cursor-pointer"
              >
                ← Back to the chat planner
              </button>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Step {wizardStep + 1} of 4
              </span>
            </div>

            {/* Stepper Tabs */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 overflow-x-auto gap-2">
              {["1. Where", "2. When & Who", "3. Style", "4. Review & Send"].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setWizardStep(idx)}
                  className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    wizardStep === idx
                      ? "bg-[#14140f] text-[#d6ff3f]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Wizard Step 0: Where */}
            {wizardStep === 0 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-xl sm:text-2xl font-bold text-[#14140f]">
                  Where in the Himalayas are you dreaming of?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {Object.entries(PRESETS).map(([key, data]) => {
                    const isSelected = selectedRegions.includes(key);
                    return (
                      <div
                        key={key}
                        onClick={() => {
                          setSelectedRegions([key]);
                          setActiveTrip(data);
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${
                          isSelected
                            ? "border-[#14140f] bg-[#f8ffea] shadow-md"
                            : "border-gray-200 hover:border-gray-400 bg-white"
                        }`}
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                          <Image
                            src={
                              key === "spiti"
                                ? "/assets/images/destinations/domestic/spiti.jpg"
                                : key === "ladakh"
                                ? "/assets/images/trips/trip_117_image_url.jpg"
                                : key === "kashmir"
                                ? "/assets/images/trips/trip_115_image_url.jpg"
                                : "/assets/images/destinations/domestic/himachal.jpg"
                            }
                            alt={data.title}
                            fill
                            className="object-cover"
                          />
                          {isSelected && (
                            <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#d6ff3f] text-[#14140f] font-bold flex items-center justify-center text-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm text-[#14140f] leading-tight">
                          {data.title}
                        </h3>
                        <p className="text-[11px] text-gray-500">{data.facts.when}</p>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => setWizardStep(1)}
                  className="self-end px-8 py-3 rounded-full bg-[#14140f] text-[#d6ff3f] font-bold text-sm hover:scale-105 transition-transform"
                >
                  Next: When & Who →
                </button>
              </div>
            )}

            {/* Wizard Step 1: When & Who */}
            {wizardStep === 1 && (
              <div className="flex flex-col gap-6 max-w-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-[#14140f]">
                  When &amp; who is traveling?
                </h2>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Trip Duration: <span className="text-[#14140f] text-sm">{wizardDays} Days</span>
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={16}
                    value={wizardDays}
                    onChange={(e) => setWizardDays(Number(e.target.value))}
                    className="w-full accent-[#14140f]"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>4 Days</span>
                    <span>8 Days</span>
                    <span>16 Days</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Who&apos;s traveling?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Couple", "Group of friends", "Family with kids", "Solo wanderer"].map((grp) => (
                      <button
                        key={grp}
                        type="button"
                        onClick={() => setWizardGroup(grp)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          wizardGroup === grp
                            ? "bg-[#14140f] text-white border-[#14140f]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        {grp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setWizardStep(0)}
                    className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-bold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-8 py-3 rounded-full bg-[#14140f] text-[#d6ff3f] font-bold text-sm hover:scale-105 transition-transform"
                  >
                    Next: Style →
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 2: Style */}
            {wizardStep === 2 && (
              <div className="flex flex-col gap-6 max-w-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-[#14140f]">
                  Travel Style &amp; Transport
                </h2>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Preferred Stays</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Comfort & boutique stays",
                      "Mix of homestays & camps",
                      "Premium heritage resorts",
                    ].map((stay) => (
                      <button
                        key={stay}
                        type="button"
                        onClick={() => setWizardStay(stay)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          wizardStay === stay
                            ? "bg-[#14140f] text-white border-[#14140f]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        {stay}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Transport</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Private SUV (4x4)",
                      "Toyota Innova Crysta",
                      "Tempo Traveller",
                      "Self-Drive 4x4",
                    ].map((tr) => (
                      <button
                        key={tr}
                        type="button"
                        onClick={() => setWizardTransport(tr)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          wizardTransport === tr
                            ? "bg-[#14140f] text-white border-[#14140f]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        {tr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-bold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="px-8 py-3 rounded-full bg-[#14140f] text-[#d6ff3f] font-bold text-sm hover:scale-105 transition-transform"
                  >
                    Next: Review &amp; Submit →
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 3: Review & Submit */}
            {wizardStep === 3 && (
              <div className="flex flex-col gap-6 max-w-xl">
                <h2 className="text-xl sm:text-2xl font-bold text-[#14140f]">
                  Review Your Custom Trip Request
                </h2>
                <div className="p-5 rounded-2xl bg-[#f8f8f5] border border-gray-200 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-base text-[#14140f]">
                      {activeTrip ? activeTrip.title : "Custom Himalayan Tour"}
                    </strong>
                    <span className="text-xs font-extrabold px-3 py-1 bg-[#d6ff3f] text-[#14140f] rounded-full">
                      {wizardDays} Days
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    <strong>Group:</strong> {wizardGroup} · <strong>Stays:</strong> {wizardStay} ·{" "}
                    <strong>Transport:</strong> {wizardTransport}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setStepMode(false);
                    setModalOpen(true);
                  }}
                  className="w-full py-4 rounded-full bg-[#d6ff3f] text-[#14140f] font-bold text-base shadow-lg hover:bg-[#ccff00] transition-colors"
                >
                  Send Itinerary to Trip Expert →
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Two Column Chat & Ticket Frame */
          <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(10,12,8,0.55),0_0_0_1px_rgba(255,255,255,0.08)] grid grid-cols-1 lg:grid-cols-[1fr_370px] h-[720px] sm:h-[760px]">
            {/* Left Column: Chat App */}
            <div className="flex flex-col min-w-0 min-h-0 bg-white">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-[#e8e8e0] shrink-0 bg-white">
                <div className="relative w-[44px] h-[44px] rounded-full bg-[#14140f] overflow-hidden shrink-0 border-[1.5px] border-[#14140f] shadow-xs">
                  <Image
                    src="/assets/images/mascot/banjara-face.webp"
                    alt="Banjara Avatar"
                    fill
                    className="object-cover object-top scale-110"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <strong className="text-[#14140f] text-[15.5px] font-bold leading-tight">
                    Banjara
                  </strong>
                  <small className="flex items-center gap-1.5 text-[11.5px] text-gray-500 leading-tight">
                    <span className="w-2 h-2 rounded-full bg-[#b8ff00] border border-[#14140f] animate-banjara-online" />
                    Trip planner · usually replies in seconds
                  </small>
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  title="Start a new trip"
                  className="inline-flex items-center gap-1.5 border border-[#e8e8e0] bg-white hover:border-[#14140f] text-[#14140f] rounded-full px-3 py-1.5 text-[12px] font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New trip</span>
                </button>
              </div>

              {/* Chat Messages Thread */}
              <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-3 bg-white">
                {/* Standing Character in Welcome State */}
                {messages.length <= 3 && (
                  <div className="w-[110px] h-[130px] mx-auto my-1 relative shrink-0 pointer-events-none">
                    <div className="w-full h-full animate-banjara-breathe relative">
                      <Image
                        src="/assets/images/mascot/banjara-standing.webp"
                        alt="Banjara Mascot"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Sender label */}
                <span className="text-[11.5px] text-gray-400 font-bold ml-3 mb-[-4px]">
                  Banjara
                </span>

                {/* Message Bubbles */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] sm:max-w-[80%] animate-pc-pop ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2.5 text-[14px] sm:text-[14.5px] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#d6ff3f] text-[#14140f] font-semibold rounded-[18px] rounded-br-[4px] shadow-xs"
                          : "bg-[#e9e9eb] text-[#14140f] rounded-[18px] rounded-bl-[4px]"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Quick Reply Chips */}
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {msg.chips.map((chip, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleChipClick(chip)}
                            className="px-3 py-1 rounded-full bg-white hover:bg-[#d6ff3f] text-[#14140f] text-[12px] font-bold border border-[#14140f] shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* In-Chat Budget Slider Card */}
                    {msg.showBudgetSlider && (
                      <div className="mt-3 p-4 rounded-2xl bg-[#14140f] text-white border border-white/10 w-full max-w-[340px] shadow-lg flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#d6ff3f]">
                            Budget per person
                          </span>
                          <span className="text-xs font-bold text-white/80">
                            ₹{budgetVal.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={5000}
                          max={200000}
                          step={1000}
                          value={budgetVal}
                          onChange={(e) => setBudgetVal(Number(e.target.value))}
                          style={
                            {
                              "--pc-fill": `${formatSliderPct(budgetVal, 5000, 200000)}%`,
                            } as React.CSSProperties
                          }
                          className="pc-budget-range"
                        />
                        <div className="flex justify-between text-[10px] text-white/50">
                          <span>₹5,000</span>
                          <span>₹2,00,000+</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleChipClick(`Budget: ₹${budgetVal.toLocaleString("en-IN")} per person`)}
                          className="w-full mt-1 py-2 rounded-full bg-[#d6ff3f] text-[#14140f] font-bold text-xs hover:bg-[#ccff00] transition-colors cursor-pointer"
                        >
                          Set my budget
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Initial 4 Suggestion Cards (Visible in welcome flow) */}
                {messages.length <= 3 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2 pt-1">
                    {STARTS.map((start) => (
                      <button
                        key={start.id}
                        type="button"
                        onClick={() => handleSelectTrip(start)}
                        className="relative aspect-4/5 rounded-[18px] overflow-hidden p-0 text-left bg-[#14140f] text-white shadow-[0_10px_24px_-14px_rgba(20,20,15,0.6)] hover:-translate-y-1 transition-all duration-200 group cursor-pointer border-none"
                      >
                        <Image
                          src={start.image}
                          alt={start.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                        <div className="absolute inset-x-3 bottom-3 z-10">
                          <span className="font-bold text-[13px] sm:text-[13.5px] leading-tight block text-white">
                            {start.title}
                          </span>
                          <small className="block font-medium text-[11px] text-white/80 mt-1">
                            {start.sub}
                          </small>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Animated Typing Bubble */}
                {isTyping && (
                  <div className="self-start flex items-center gap-1.5 px-4 py-2.5 bg-[#e9e9eb] rounded-[18px] w-fit animate-pc-pop">
                    <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-1 block" />
                    <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-2 block" />
                    <i className="w-1.5 h-1.5 rounded-full bg-black/60 pc-bounce-3 block" />
                  </div>
                )}

                <div ref={threadEndRef} />
              </div>

              {/* Composer */}
              <div className="p-3 sm:p-4 bg-white border-t border-[#e8e8e0] shrink-0">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2 bg-white rounded-full p-1.5 pl-4 sm:pl-5 shadow-[0_0_0_1.5px_#e8e8e0,0_8px_24px_-14px_rgba(20,20,15,0.35)] focus-within:shadow-[0_0_0_2px_#14140f,0_8px_24px_-14px_rgba(20,20,15,0.35)] transition-shadow"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Tell Banjara about your trip…"
                    className="flex-1 bg-transparent border-none outline-hidden text-[#14140f] text-[15px] sm:text-[16px] placeholder-gray-400 py-2"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="w-10 h-10 rounded-full bg-[#14140f] hover:bg-black text-[#d6ff3f] flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer border-none"
                  >
                    <ArrowUp className="w-5 h-5 stroke-[2.4]" />
                  </button>
                </form>

                <p className="text-center text-[12px] text-gray-500 mt-2.5">
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

            {/* Right Column: Your Trip Ticket */}
            <aside className="bg-[#14140f] text-white flex flex-col min-h-0 relative select-none">
              {/* Ticket Head with Cutout Notches */}
              <div
                className={`relative p-5 sm:p-6 border-b-2 border-dashed border-white/15 transition-all ${
                  ticketFlash ? "bg-white/10" : ""
                }`}
              >
                {/* Left Ticket Notch */}
                <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 rounded-full bg-white block z-10" />
                {/* Right Ticket Notch */}
                <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full bg-white block z-10" />

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#d6ff3f]">
                    Your trip ticket
                  </span>
                  <strong className="text-[19px] sm:text-[20px] font-bold text-white leading-tight">
                    {activeTrip ? activeTrip.title : "Your trip"}
                  </strong>
                  <small className="text-[12.5px] text-white/60">
                    {activeTrip ? `${activeTrip.days} days · ${activeTrip.region}` : "Taking shape as you chat"}
                  </small>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 flex flex-col gap-5">
                {!activeTrip ? (
                  /* Empty State Matching Screenshot */
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
                  /* Populated Itinerary Ticket */
                  <div className="flex flex-col gap-4 animate-pc-pop">
                    {/* Route Strip */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeTrip.route.map((stop, i) => (
                        <React.Fragment key={i}>
                          <span
                            className={`text-[11.5px] font-bold px-2.5 py-1 rounded-full border ${
                              i === 0 || i === activeTrip.route.length - 1
                                ? "bg-[#d6ff3f] text-[#14140f] border-[#d6ff3f]"
                                : "bg-white/10 text-white/90 border-white/15"
                            }`}
                          >
                            {stop}
                          </span>
                          {i < activeTrip.route.length - 1 && (
                            <span className="w-2.5 h-[1.5px] bg-white/30 rounded-full" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Facts Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          When
                        </span>
                        <strong className="text-white text-xs mt-0.5 block">
                          {activeTrip.facts.when}
                        </strong>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          Length
                        </span>
                        <strong className="text-white text-xs mt-0.5 block">
                          {activeTrip.facts.length}
                        </strong>
                      </div>
                      <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          Who
                        </span>
                        <strong className="text-white text-xs mt-0.5 block">
                          {activeTrip.facts.who}
                        </strong>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          Transport
                        </span>
                        <strong className="text-white text-xs mt-0.5 block">
                          {activeTrip.facts.transport}
                        </strong>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          Stays
                        </span>
                        <strong className="text-white text-xs mt-0.5 block truncate">
                          {activeTrip.facts.stays}
                        </strong>
                      </div>
                    </div>

                    {/* Day by Day Plan Accordion */}
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
                            <summary className="flex items-center gap-2.5 p-2.5 text-[13px] font-bold list-none group-open:bg-white/10 transition-colors">
                              <span className="w-5 h-5 rounded-full bg-[#d6ff3f] text-[#14140f] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                                {dayItem.day}
                              </span>
                              <span className="flex-1 text-white leading-tight">
                                {dayItem.title}
                              </span>
                            </summary>
                            <div className="px-3 pb-3 pt-1 text-[12px] text-white/75 flex flex-col gap-1 border-t border-white/5">
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
                  </div>
                )}
              </div>

              {/* Ticket Footer */}
              <div className="p-5 sm:p-6 border-t border-white/10 flex flex-col gap-2 text-center bg-[#14140f]">
                <button
                  type="button"
                  disabled={!activeTrip}
                  onClick={() => setModalOpen(true)}
                  className={`w-full py-3.5 px-4 rounded-full font-bold text-[14.5px] transition-all duration-200 cursor-pointer ${
                    activeTrip
                      ? "bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] shadow-[0_8px_24px_-6px_rgba(214,255,63,0.7)] hover:-translate-y-0.5"
                      : "bg-white/10 text-white/40 cursor-not-allowed border-none"
                  }`}
                >
                  {activeTrip ? "Send to our team →" : "Plan a few days first"}
                </button>
                <small className="text-[11.5px] text-white/55">
                  No payment now · our expert calls you with the exact price
                </small>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Inquiry Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-pc-pop text-[#14140f] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setModalOpen(false);
                setInquirySubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-2xl leading-none cursor-pointer p-1"
            >
              &times;
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-4 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-bold text-2xl mb-1 shadow-md">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#14140f]">Itinerary received!</h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Reference: <strong className="text-[#14140f]">{refCode}</strong>
                </span>
                <p className="text-sm text-gray-600 leading-relaxed max-w-sm mt-1">
                  Thank you, <strong>{name}</strong>! We have received your custom itinerary for{" "}
                  <strong>{activeTrip?.title}</strong> ({activeTrip?.days} Days). Our senior trip expert will call you on{" "}
                  <strong>{phone}</strong> ({callTime.toLowerCase()}) with the best price for your group.
                </p>
                <a
                  href={`https://wa.me/919103910523?text=${encodeURIComponent(
                    `Hi Awara Banjara! I planned a trip for ${activeTrip?.title} (${activeTrip?.days} Days, Ref: ${refCode}). My name is ${name}. Please share the quotation!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25d366] text-white font-bold text-sm shadow-md hover:scale-105 transition-transform"
                >
                  <MessageSquare className="w-4 h-4" />
                  Also send it to us on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#14140f] leading-tight pr-6">
                  Where should our trip expert call you?
                </h2>
                <p className="text-xs text-gray-500">
                  We&apos;ll prepare the exact group cost based on your custom itinerary.
                </p>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-gray-700">Your name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:border-[#14140f]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-gray-700">Mobile (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:border-[#14140f]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-gray-700">
                    Email <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:border-[#14140f]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-gray-700">Best time to call</label>
                  <select
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:border-[#14140f] bg-white"
                  >
                    <option>As soon as possible</option>
                    <option>Morning (10 AM – 1 PM)</option>
                    <option>Afternoon (1 – 4 PM)</option>
                    <option>Evening (4 – 7 PM)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700">
                      Budget per person <span className="font-normal text-gray-400">(excluding flights)</span>
                    </label>
                    <span className="text-xs font-bold text-[#14140f]">
                      ₹{budgetVal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={200000}
                    step={1000}
                    value={budgetVal}
                    onChange={(e) => setBudgetVal(Number(e.target.value))}
                    className="w-full accent-[#14140f]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-gray-700">
                    Anything else? <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="A birthday on the trip, dietary needs, preferred dates…"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm outline-hidden focus:border-[#14140f]"
                  />
                </div>

                <p className="text-[11.5px] text-gray-500 leading-snug">
                  Our trip expert will call you within 24 hours with a price for your trip.
                </p>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-[15px] shadow-md transition-all cursor-pointer border-none"
                >
                  Send my itinerary
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
