import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages — Complete Himalayan Expeditions | Trail Explorers",
  description:
    "Explore our complete range of fixed group departures, private custom tours, high-altitude motorcycle circuits, and alpine treks across Northern India.",
  keywords: [
    "tour packages",
    "Himalayan tour packages",
    "Spiti tour packages",
    "Ladakh tour packages",
    "Himachal tour packages",
    "Kashmir tour packages",
    "Trail Explorers",
  ],
  alternates: {
    canonical: "https://trailexplorers.in/tour-packages",
  },
  openGraph: {
    type: "website",
    url: "https://trailexplorers.in/tour-packages",
    title: "Tour Packages — Complete Himalayan Expeditions | Trail Explorers",
    description: "Explore our complete range of Himalayan tour packages. Immersive travel, more human connection.",
    images: ["/assets/images/home/hero-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages — Complete Himalayan Expeditions | Trail Explorers",
    description: "Explore our complete range of Himalayan tour packages. Immersive travel, more human connection.",
    images: ["/assets/images/home/hero-poster.jpg"],
  },
};

export default function TourPackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
