import React from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Paragraph } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Briefcase, Send, Compass } from "lucide-react";

const JOBS = [
  {
    title: "Trip Leader — Freelancer",
    location: "Manali / Spiti / Ladakh",
    type: "Seasonal Contract / Per Trip",
    desc: "Lead adventurous small-group departures. Must have basic mountaineering course (BMC) or extensive trekking experience, excellent people skills, and first-aid certification.",
  },
  {
    title: "Video Editor & Reel Creator",
    location: "Remote / Hybrid (Delhi / Manali)",
    type: "Full-Time",
    desc: "Turn raw 4K GoPro, drone, and mobile footage from Himalayan expeditions into viral, cinematic reels and travel documentaries for YouTube & Instagram.",
  },
  {
    title: "Business Development & Community Executive",
    location: "Delhi NCR",
    type: "Full-Time",
    desc: "Handle customer inquiries, curate custom private itineraries, coordinate with local homestay operators, and nurture our 13,000+ member travel community.",
  },
  {
    title: "Graphic & Brand Designer",
    location: "Remote",
    type: "Full-Time / Part-Time",
    desc: "Design striking travel itineraries, social media field guides, presentation decks, and brand marketing collaterals following our high-contrast aesthetic.",
  },
];

export default function CareersPage() {
  return (
    <div className="w-full bg-[#f6f6f1] min-h-screen pb-20">
      <section className="bg-[#14140f] text-white py-16 sm:py-20 border-b border-white/10">
        <Container size="narrow">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-[#d6ff3f] text-[#14140f] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Join The Crew</span>
            </span>
            <Heading level={1} className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Careers at Awara Banjara
            </Heading>
            <Paragraph className="text-white/80 text-base sm:text-lg leading-relaxed">
              We are looking for passionate wanderers, storytellers, and mountain lovers who want to build the future of authentic experiential travel in India.
            </Paragraph>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="py-14">
        <div className="flex flex-col gap-6">
          {JOBS.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2dc] shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex flex-col gap-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold bg-[#f0f0eb] text-[#14140f] px-2.5 py-1 rounded-md">
                    {job.location}
                  </span>
                  <span className="text-xs font-bold bg-[#d6ff3f] text-[#14140f] px-2.5 py-1 rounded-md">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#14140f]">{job.title}</h3>
                <p className="text-xs sm:text-sm text-[#6b6b63] leading-relaxed">{job.desc}</p>
              </div>

              <div className="shrink-0">
                <Button
                  href={`mailto:careers@awarabanjara.in?subject=Application for ${encodeURIComponent(job.title)}`}
                  variant="primary"
                  size="sm"
                  rightIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
