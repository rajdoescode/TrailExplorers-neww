import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/common/FloatingWidgets";
import { TripModal } from "@/components/common/TripModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://trailexplorers.in"),
  title: "Trail Explorers — Curated Himalayan Escapes & Group Trips in India",
  description:
    "Trail Explorers — India's premier travel community for Himalayan bike tours, Spiti Valley road trips, treks, festival trips, and offbeat group departures. Curated expeditions for adventurous souls.",
  keywords: [
    "Trail Explorers",
    "Himalayan group trips",
    "Spiti Valley tour package",
    "Leh Ladakh bike expedition",
    "travel community India",
    "Kasol Kheerganga trek",
    "group travel India",
    "Winter Spiti 4x4",
  ],
  authors: [{ name: "Trail Explorers" }],
  openGraph: {
    title: "Trail Explorers — Curated Himalayan Escapes & Group Trips in India",
    description:
      "Join Trail Explorers. Curated Himalayan bike expeditions, Spiti Valley road trips, treks, and offbeat group adventures.",
    url: "https://trailexplorers.in",
    siteName: "Trail Explorers",
    images: [
      {
        url: "/assets/images/home/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Trail Explorers Himalayan Expeditions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/assets/images/logo/icon.svg",
    shortcut: "/assets/images/logo/favicon.ico",
    apple: "/assets/images/logo/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-clip max-w-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#14140f] antialiased overflow-x-clip max-w-full">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingWidgets />
        <TripModal />
      </body>
    </html>
  );
}
