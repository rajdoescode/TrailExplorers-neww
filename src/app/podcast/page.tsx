import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Headphones, Play, Mic, Radio, Clock, Sparkles } from "lucide-react";

const EPISODES = [
  {
    id: 1,
    title: "Zanskar Full Circuit: Crossing Shinku La and Conquering the Monolith",
    guest: "Viru Thakur & Mountain Captain Tenzin",
    duration: "42 mins",
    category: "High Altitude Expeditions",
    desc: "An in-depth conversation about opening the new Zanskar winter route, acclimatization tactics at 16,000 ft, and life inside high remote Himalayan gompas.",
    image: "/assets/images/trips/trip_100_image_url.jpg",
  },
  {
    id: 2,
    title: "Winter Spiti: Surviving -25°C in the Middle Land",
    guest: "Local Spitian Host Lobzang & Team",
    duration: "38 mins",
    category: "Sub-Zero Expeditions",
    desc: "How village families thrive in deep Himalayan winters with woodfire Bukharis, tracking elusive snow leopards, and why winter reveals the real soul of Spiti.",
    image: "/assets/images/trips/trip_103_image_url.jpg",
  },
  {
    id: 3,
    title: "The Art of Solo Traveling Without Feeling Lonely",
    guest: "Community Wanderers & Solo Women Explorers",
    duration: "35 mins",
    category: "Community & Mindset",
    desc: "Why more than 60% of our group participants join solo, how our campfire circles break hesitation, and tips for first-time backpackers.",
    image: "/assets/images/about/community-group.jpg",
  },
  {
    id: 4,
    title: "Leaving No Trace Behind: Eco Tourism in the Fragile Himalayas",
    guest: "Alpine Conservationists & Village Panchayats",
    duration: "29 mins",
    category: "Responsible Travel",
    desc: "Why single-use plastic must be eliminated from alpine trails, the impact of unplanned mass tourism, and how conscious travelers make a positive difference.",
    image: "/assets/images/about/responsible-puppet.jpg",
  },
];

export default function PodcastPage() {
  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Headphones className="w-3.5 h-3.5" />
              <span>Trail Explorers Audio Dispatch</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              The Himalayan Wanderer Podcast
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              Unfiltered conversations with mountaineers, native valley elders, solo travelers, and expedition leaders recorded around mountain campfires.
            </Paragraph>
          </div>
        </Container>
      </section>

      {/* Episodes Listing */}
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EPISODES.map((ep) => (
            <div
              key={ep.id}
              className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#e2e2dc] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 border border-[#e2e2dc]">
                  <Image src={ep.image} alt={ep.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6b6b63] font-bold mb-2">
                  <span className="bg-[#f0f0eb] text-[#14140f] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {ep.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {ep.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#14140f] mb-2 leading-snug">
                  {ep.title}
                </h3>
                <p className="text-xs text-[#d6ff3f] bg-[#14140f] px-2.5 py-1 rounded-md font-semibold w-fit mb-3">
                  Featuring: {ep.guest}
                </p>
                <p className="text-sm text-[#6b6b63] leading-relaxed">
                  {ep.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#f0f0eb] flex items-center justify-between">
                <Button variant="primary" size="sm" leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}>
                  Play Episode
                </Button>
                <span className="text-xs font-bold text-[#6b6b63]">Listen on Spotify &amp; Apple</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
