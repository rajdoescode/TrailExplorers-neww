"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, RotateCcw, MessageSquare, Phone } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  itineraryUpdate?: ItineraryData;
}

interface ItineraryData {
  title: string;
  region: string;
  days: number;
  route: string[];
  places: string[];
  group: string;
  style: string;
}

const STARTS = [
  {
    id: "spiti",
    title: "Spiti Valley road trip",
    sub: "Cold desert & monasteries",
    image: "/assets/images/destinations/domestic/spiti.jpg",
    days: 8,
    route: ["Delhi", "Manali", "Kaza", "Chandratal", "Manali"],
    places: [
      "Day 1: Delhi to Manali overnight transfer",
      "Day 2: Over Kunzum Pass to Kaza",
      "Day 3: Key Monastery, Kibber & Chicham Bridge",
      "Day 4: Langza, Hikkim & Komic highest villages",
      "Day 5: Pin Valley & Dhankar Monastery",
      "Day 6: Camping at Chandratal Moon Lake",
      "Day 7: Drive to Manali via Rohtang / Atal Tunnel",
      "Day 8: Departure with lifelong memories",
    ],
    group: "4-6 Travelers",
    style: "Private 4x4 & Boutique Homestays",
  },
  {
    id: "ladakh",
    title: "Ladakh in summer",
    sub: "High passes & blue lakes",
    image: "/assets/images/trips/trip_117_image_url.jpg",
    days: 7,
    route: ["Leh", "Nubra Valley", "Turtuk", "Pangong Tso", "Leh"],
    places: [
      "Day 1: Arrival in Leh, rest & acclimatize",
      "Day 2: Sham Valley, Hall of Fame & Magnetic Hill",
      "Day 3: Over Khardung La to Nubra Valley & Hunder",
      "Day 4: Day excursion to Turtuk Indo-Balti village",
      "Day 5: Scenic cross-country drive to Pangong Tso",
      "Day 6: Sunrise at Pangong, return to Leh via Chang La",
      "Day 7: Fly out from Leh",
    ],
    group: "Couples & Friends",
    style: "Deluxe Camps & SUV",
  },
  {
    id: "kashmir",
    title: "Kashmir with family",
    sub: "Houseboats & meadows",
    image: "/assets/images/trips/trip_115_image_url.jpg",
    days: 6,
    route: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Srinagar"],
    places: [
      "Day 1: Dal Lake Shikara ride & luxury houseboat stay",
      "Day 2: Gulmarg Gondola ride to Apharwat Peak",
      "Day 3: Drive to Pahalgam via saffron fields",
      "Day 4: Betaab Valley, Aru & Baisaran meadow",
      "Day 5: Day trip to Sonamarg Thajiwas Glacier",
      "Day 6: Old Srinagar heritage walk & departure",
    ],
    group: "Family Vacation",
    style: "Heritage Houseboat & Premium Stays",
  },
  {
    id: "himachal",
    title: "Surprise me",
    sub: "Tell us your vibe",
    image: "/assets/images/destinations/domestic/himachal.jpg",
    days: 5,
    route: ["Delhi", "Manali", "Kasol", "Jibhi", "Delhi"],
    places: [
      "Day 1: Scenic drive into Kullu Valley",
      "Day 2: Old Manali cafés, Jogini Falls & hot springs",
      "Day 3: Parvati Valley, Kasol & riverside Chalal",
      "Day 4: Pine forests of Jibhi & Jalori Pass trek",
      "Day 5: Drive back to Delhi",
    ],
    group: "Flexible Wanderers",
    style: "Riverside Cottages & Traveler Vans",
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

  // Inquiry form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [callTime, setCallTime] = useState("Morning (10 AM - 1 PM)");
  const [notes, setNotes] = useState("");

  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 3 || isTyping) {
      threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSelectTrip = (start: (typeof STARTS)[0]) => {
    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: start.title,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const itinerary: ItineraryData = {
        title: start.title,
        region: start.id.toUpperCase(),
        days: start.days,
        route: start.route,
        places: start.places,
        group: start.group,
        style: start.style,
      };

      setActiveTrip(itinerary);

      const botReply: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: `Super! Here's a handcrafted ${start.days}-day plan for ${start.title}. I've updated your trip ticket on the right. You can review the stops, and tap "Send itinerary to expert" so we can call you with a price for your group!`,
        itineraryUpdate: itinerary,
      };

      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    setInputText("");

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let matched = STARTS[0];
      const lower = query.toLowerCase();
      if (lower.includes("ladakh") || lower.includes("leh")) matched = STARTS[1];
      else if (lower.includes("kashmir") || lower.includes("gulmarg")) matched = STARTS[2];
      else if (lower.includes("himachal") || lower.includes("manali") || lower.includes("kasol")) matched = STARTS[3];

      const itinerary: ItineraryData = {
        title: matched.title,
        region: matched.id.toUpperCase(),
        days: matched.days,
        route: matched.route,
        places: matched.places,
        group: "Custom Group",
        style: "Private SUV & Verified Stays",
      };

      setActiveTrip(itinerary);

      const botReply: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: `Got it! "${query}" sounds wonderful. I have shaped your custom route on your trip ticket. Check out the day-by-day plan on the right and let us know where to call you with the price!`,
        itineraryUpdate: itinerary,
      };

      setMessages((prev) => [...prev, botReply]);
    }, 900);
  };

  const handleRestart = () => {
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
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setInquirySubmitted(true);
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
          /* Step by Step Alternative View */
          <div className="bg-white rounded-[28px] p-6 sm:p-10 shadow-2xl flex flex-col gap-6">
            <button
              onClick={() => setStepMode(false)}
              className="text-left font-bold text-sm text-[#14140f] hover:underline cursor-pointer"
            >
              ← Back to the chat planner
            </button>
            <h2 className="text-2xl font-bold text-[#14140f]">Step-by-step Private Trip Request</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STARTS.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => {
                    handleSelectTrip(trip);
                    setStepMode(false);
                  }}
                  className="p-4 rounded-2xl border-2 border-[#14140f] hover:bg-[#f7f7f5] cursor-pointer flex gap-4 items-center transition-all hover:scale-[1.01]"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={trip.image} alt={trip.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#14140f]">{trip.title}</h3>
                    <p className="text-xs text-gray-500">{trip.sub}</p>
                    <span className="inline-block mt-1 text-xs font-bold text-[#2fa84f]">
                      {trip.days} Days Itinerary
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Two Column Chat & Ticket Frame */
          <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(10,12,8,0.55),0_0_0_1px_rgba(255,255,255,0.08)] grid grid-cols-1 lg:grid-cols-[1fr_360px] h-[720px] sm:h-[750px] lg:h-[760px]">
            {/* Left Column: Chat App */}
            <div className="flex flex-col min-w-0 min-h-0 bg-white">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-[#e8e8e0] shrink-0 bg-white">
                <div className="relative w-[40px] h-[40px] rounded-[13px] bg-[#14140f] overflow-hidden shrink-0 border border-white/20">
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
                    <span className="w-2 h-2 rounded-full bg-[#2fa84f] shadow-[0_0_0_3px_rgba(47,168,79,0.18)]" />
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
              <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-3 flex flex-col gap-2 bg-white">
                {/* 3D Standing Character in Center */}
                <div className="w-[62px] h-[82px] mx-auto my-0.5 relative animate-banjara-breathe shrink-0 pointer-events-none">
                  <Image
                    src="/assets/images/mascot/banjara-standing.webp"
                    alt="Banjara Mascot"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Sender label */}
                <span className="text-[11.5px] text-gray-400 font-medium ml-3 mb-[-2px]">
                  Banjara
                </span>

                {/* Message Bubbles */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] sm:max-w-[78%] animate-pc-pop ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 text-[14px] sm:text-[14.5px] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#d6ff3f] text-[#14140f] font-semibold rounded-[18px] rounded-br-[4px]"
                          : "bg-[#e9e9eb] text-[#14140f] rounded-[18px] rounded-bl-[4px]"
                      }`}
                    >
                      {msg.text}
                    </div>
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
              <div className="relative p-5 sm:p-6 border-b-2 border-dashed border-white/15">
                {/* Left Ticket Notch */}
                <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 rounded-full bg-white block z-10" />
                {/* Right Ticket Notch */}
                <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full bg-white block z-10" />

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#d6ff3f]">
                    Your trip ticket
                  </span>
                  <strong className="text-[20px] font-bold text-white leading-tight">
                    {activeTrip ? activeTrip.title : "Your trip"}
                  </strong>
                  <small className="text-[12.5px] text-white/60">
                    {activeTrip ? `${activeTrip.days} Days Handcrafted Route` : "Taking shape as you chat"}
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
                        {/* Mountain bodies */}
                        <path d="M18 4L2 34H34L18 4Z" fill="#505045" />
                        <path d="M32 10L18 34H46L32 10Z" fill="#383830" />
                        {/* Snow caps */}
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
                  <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                    {/* Route strip */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeTrip.route.map((stop, i) => (
                        <React.Fragment key={i}>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                              i === 0 || i === activeTrip.route.length - 1
                                ? "bg-[#d6ff3f] text-[#14140f] border-[#d6ff3f]"
                                : "bg-white/10 text-white/90 border-white/15"
                            }`}
                          >
                            {stop}
                          </span>
                          {i < activeTrip.route.length - 1 && (
                            <span className="w-2 h-0.5 bg-white/30 rounded-full" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Facts Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          Duration
                        </span>
                        <strong className="text-white text-sm mt-0.5 block">
                          {activeTrip.days} Days / {activeTrip.days - 1} Nights
                        </strong>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          Travelers
                        </span>
                        <strong className="text-white text-sm mt-0.5 block">
                          {activeTrip.group}
                        </strong>
                      </div>
                    </div>

                    {/* Day by Day Plan */}
                    <div>
                      <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-white/50 block mb-2">
                        Day-by-Day Highlights
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {activeTrip.places.map((place, idx) => (
                          <div
                            key={idx}
                            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[12.5px] text-white/85 leading-snug"
                          >
                            {place}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ticket Footer */}
              <div className="p-5 sm:p-6 border-t border-white/10 flex flex-col gap-2.5 text-center bg-[#14140f]">
                <button
                  type="button"
                  disabled={!activeTrip}
                  onClick={() => setModalOpen(true)}
                  className={`w-full py-3.5 px-4 rounded-full font-bold text-[14.5px] transition-all duration-200 cursor-pointer ${
                    activeTrip
                      ? "bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] shadow-[0_8px_22px_-10px_rgba(214,255,63,0.8)] hover:-translate-y-0.5"
                      : "bg-white/10 text-white/45 cursor-not-allowed border-none"
                  }`}
                >
                  {activeTrip ? "Send itinerary to expert" : "Plan a few days first"}
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
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-[#14140f]">
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
                <div className="w-14 h-14 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-bold text-2xl mb-1">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#14140f]">Itinerary Received!</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                  Thank you, <strong>{name}</strong>! We have received your custom itinerary for{" "}
                  <strong>{activeTrip?.title}</strong>. Our senior trip expert will call you on{" "}
                  <strong>{phone}</strong> during {callTime}.
                </p>
                <a
                  href={`https://wa.me/919103910523?text=${encodeURIComponent(
                    `Hi Awara Banjara! I planned a trip for ${activeTrip?.title} (${activeTrip?.days} Days). My name is ${name}. Please share the quotation!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25d366] text-white font-bold text-sm shadow-md hover:scale-105 transition-transform"
                >
                  <MessageSquare className="w-4 h-4" />
                  Also send it on WhatsApp
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
                    <option>Morning (10 AM - 1 PM)</option>
                    <option>Afternoon (1 PM - 5 PM)</option>
                    <option>Evening (5 PM - 8 PM)</option>
                    <option>Anytime</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-gray-700">
                    Anything else? <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Dietary needs, special dates, or preferred vehicle..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm outline-hidden focus:border-[#14140f]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-full bg-[#d6ff3f] hover:bg-[#ccff00] text-[#14140f] font-bold text-[15px] shadow-md transition-all cursor-pointer border-none"
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
