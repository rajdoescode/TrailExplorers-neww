export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  badge: string;
  experience: string;
  favouriteDestination: string;
  headline: string;
  description: string;
  bio: string;
  quote: string;
  specialties: string[];
  socialLinks: {
    instagram: string;
    linkedin: string;
    facebook: string;
    x: string;
  };
  image: string;
  status: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Harsh Thakkar",
    designation: "Founder & Chief Explorer",
    badge: "FOUNDER",
    experience: "6+ Years",
    favouriteDestination: "Spiti Valley",
    headline: "Every Stop, A Story.",
    description:
      "Harsh Thakkar is the driving force behind Trail Explorers. With a deep passion for mountains, adventure, and meaningful travel experiences, he founded Trail Explorers with a vision to help people explore the Himalayas beyond ordinary journeys.",
    bio:
      "A certified rock climber and adventure enthusiast, Harsh believes that every journey should be more than just reaching a destination. His focus is on creating safe, authentic, and unforgettable expeditions while connecting travellers with local cultures, hidden destinations, and the true spirit of the mountains.",
    quote: "Every summit is just the beginning of the next adventure.",
    specialties: [
      "Expedition Planning",
      "Rock Climbing",
      "Adventure Travel",
      "Himalayan Exploration",
      "Team Leadership",
    ],
    socialLinks: {
      instagram: "https://www.instagram.com/trail_explorers_",
      linkedin: "",
      facebook: "https://facebook.com",
      x: "https://x.com",
    },
    image: "/assets/images/about/harsh-thakkar.avif",
    status: "active",
  },
];
