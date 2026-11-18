import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/common/FloatingWidgets";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://awarabanjara.in"),
  title: "Awara Banjara — Himalayan Tourism & Youth Group Trips in India",
  description:
    "Awara Banjara — India's premier youth travel community for Himalayan bike tours, Spiti Valley road trips, treks, festival trips, and women-only travel. Curated group expeditions for adventurous souls.",
  keywords: [
    "Himalayan group trips",
    "Spiti Valley tour package",
    "Leh Ladakh bike expedition",
    "youth travel community India",
    "Kasol Kheerganga trek",
    "women travel groups India",
    "Winter Spiti 4x4",
  ],
  authors: [{ name: "Awara Banjara Adventure (OPC) Pvt. Ltd." }],
  openGraph: {
    title: "Awara Banjara — Himalayan Tourism & Youth Group Trips in India",
    description:
      "Join India's vibrant youth travel community. Curated Himalayan bike expeditions, Spiti Valley road trips, treks, and women-only tours.",
    url: "https://awarabanjara.in",
    siteName: "Awara Banjara",
    images: [
      {
        url: "/assets/images/home/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Awara Banjara Himalayan Expeditions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/assets/images/logo/favicon.png",
    shortcut: "/assets/images/logo/favicon.png",
    apple: "/assets/images/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${poppins.variable} ${baloo2.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-[#14140f] antialiased">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
