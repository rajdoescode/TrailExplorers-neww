import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/common/FloatingWidgets";
import { TripModal } from "@/components/common/TripModal";

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
    <html lang="en" className="overflow-x-hidden max-w-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#14140f] antialiased overflow-x-hidden max-w-full">
        <Header />
        <main className="flex-1 w-full overflow-x-hidden max-w-full">{children}</main>
        <Footer />
        <FloatingWidgets />
        <TripModal />
      </body>
    </html>
  );
}
