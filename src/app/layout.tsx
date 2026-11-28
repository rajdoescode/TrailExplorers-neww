import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans, Poppins, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const FloatingWidgets = dynamic(() =>
  import("@/components/common/FloatingWidgets").then((m) => m.FloatingWidgets)
);
const TripModal = dynamic(() =>
  import("@/components/common/TripModal").then((m) => m.TripModal)
);

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#14140f",
};

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
    <html
      lang="en"
      className={`overflow-x-clip max-w-full ${plusJakartaSans.variable} ${poppins.variable} ${baloo2.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-white text-[#14140f] antialiased overflow-x-clip max-w-full relative"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <MobileBottomNav />
        <FloatingWidgets />
        <TripModal />
      </body>
    </html>
  );
}
