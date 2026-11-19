import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Trips — Small-Group Himalayan Journeys | Awara Banjara",
  description:
    "Join Awara Banjara community trips: small-group Himalayan journeys where travellers meet, share the road and leave as friends. Immersive travel, more human connection.",
  keywords: [
    "community trips",
    "group trips India",
    "Himalayan group travel",
    "travel community",
    "solo traveller group trips",
    "Awara Banjara",
  ],
  alternates: {
    canonical: "https://awarabanjara.in/community-trips",
  },
  openGraph: {
    type: "website",
    url: "https://awarabanjara.in/community-trips",
    title: "Community Trips — Small-Group Himalayan Journeys | Awara Banjara",
    description: "Small-group Himalayan journeys with Awara Banjara. Immersive travel, more human connection.",
    images: ["/assets/images/home/hero-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Trips — Small-Group Himalayan Journeys | Awara Banjara",
    description: "Small-group Himalayan journeys with Awara Banjara. Immersive travel, more human connection.",
    images: ["/assets/images/home/hero-poster.jpg"],
  },
};

export default function CommunityTripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
