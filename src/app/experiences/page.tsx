import type { Metadata } from "next";
import Link from "next/link";
import { EXPERIENCES_DATA } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Travel Experiences: Festivals & Himalayan Expeditions | Awara Banjara",
  description:
    "Awara Banjara Experiences: small-group trips built around a moment, not a map. Mountain festivals, winter carnivals and Himalayan expeditions with fixed dates.",
  keywords: [
    "travel experiences India",
    "festival trips",
    "Kullu Dussehra trip",
    "Manali winter carnival",
    "Himalayan expeditions",
    "group trips",
    "Awara Banjara",
  ],
  alternates: {
    canonical: "https://awarabanjara.in/experiences",
  },
  openGraph: {
    type: "website",
    url: "https://awarabanjara.in/experiences",
    title: "Travel Experiences: Festivals & Himalayan Expeditions | Awara Banjara",
    description: "Trips built around a moment, not a map: festivals, carnivals and expeditions.",
    images: [{ url: "/assets/images/home/hero-poster.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Experiences: Festivals & Himalayan Expeditions | Awara Banjara",
    description: "Trips built around a moment, not a map: festivals, carnivals and expeditions.",
    images: ["/assets/images/home/hero-poster.jpg"],
  },
};

export default function ExperiencesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Awara Banjara Experiences",
    "numberOfItems": EXPERIENCES_DATA.length,
    "itemListElement": EXPERIENCES_DATA.map((trip, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": trip.title,
      "url": `https://awarabanjara.in${trip.detailUrl}`,
    })),
  };

  return (
    <div className="w-full bg-white min-h-[60vh] pb-16">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Hero Title */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 packages-hero">
        <h1>Experiences</h1>
        <p>Trips built around a moment, not a map: festivals, carnivals and expeditions.</p>
      </div>

      {/* Trips Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6" id="experiencesContainer">
        {EXPERIENCES_DATA.length > 0 ? (
          <section className="category-section">
            <div className="packages-grid">
              {EXPERIENCES_DATA.map((trip) => (
                <article key={trip.id} className="trip-card">
                  <div className="thumb">
                    <Link href={trip.detailUrl}>
                      <img
                        src={trip.image}
                        alt={trip.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  </div>
                  <div className="body">
                    <h3>
                      <Link
                        href={trip.detailUrl}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {trip.title}
                      </Link>
                    </h3>
                    <div className="meta">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="w-3.5 h-3.5 shrink-0"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span>{trip.duration}</span>
                    </div>
                    <hr />
                    <div className="price-row">
                      <span>
                        <span className="price-label">{trip.priceLabel}</span>
                        <span className="price">{trip.priceDisplay}</span>
                      </span>
                      <Link href={trip.detailUrl} className="book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <div className="experiences-empty">
            <h2>No experiences active right now</h2>
            <p>
              We launch trips around specific moments — seasonal festivals, carnivals
              and expeditions with set dates. Check back soon or explore our community trips.
            </p>
            <Link href="/community-trips" className="book-btn">
              Browse Community Trips
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
