# Trail Explorers – Himalayan Travel Community Website

> **Website:** [https://trailexplorers.in/](https://trailexplorers.in/)  
> **Deployment:** [https://latest.trailexplorers.co/](https://latest.trailexplorers.co/)  
> **Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide React Icons  

A pixel-accurate, high-performance web platform for **Trail Explorers** — India's premier youth travel community for Himalayan bike tours, Spiti Valley road trips, treks, festival trips, and group departures.

---

## 1. Key Highlights & Features

- **High-Fidelity Aesthetics:** Strict adherence to Trail Explorers' signature design system — pitch-black (`#14140f`) high contrast typography, crisp white canvas, organic pill geometry, and vibrant electric lime (`#d6ff3f`) conversion accents.
- **Hero Video & Fallback:** Autoplaying muted video hero loop (`assets/videos/hero-loop.mp4`) with high-resolution poster image fallback (`hero-poster.jpg`).
- **Complete Route Coverage:** 22+ fully developed routes including Homepage (all 14 sections in authentic order), Community Trips, Experiences, Tour Packages, Winter Spiti Campaign, Plan Your Trip interactive planner, Founder's Story, About Us, Contact Directory, Customer Reviews, Postcards / Reels, Podcast Hub, 5 Regional Hubs, Dynamic Trip Details (`/trips/[slug]`), and all statutory policy pages.
- **Interactive Multi-Step Planner:** Custom itinerary builder with instant budget estimation, validation, and direct WhatsApp concierge integration.
- **Dynamic Booking & Token Engine:** Itinerary details with collapsible day-by-day itineraries, inclusions vs exclusions comparison, occupancy price breakdown (Quad/Triple/Double sharing), and instant seat reservation modals.
- **Touch & Drag Carousels:** Smooth snap-scroll carousels with arrow indicators and pagination dots.
- **Zero Broken Assets:** 57+ authentic brand assets, logos, and expedition thumbnails preserved locally under `public/assets/`.

---

## 2. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS with custom design system extensions & CSS variables
- **Icons:** `lucide-react`
- **Typography:** Google Fonts (`Plus Jakarta Sans`, `Poppins`, `Baloo 2`) via `next/font/google`
- **State Management:** React Hooks (`useState`, `useMemo`, `useCallback`, `useEffect`)

---

## 3. Project Directory Structure

```text
├── documentation/
│   ├── WEBSITE_AUDIT.md            # Comprehensive audit of all discovered routes & sections
│   ├── DESIGN_SYSTEM.md            # Typography, hex/rgb colors, spacing & layout measurements
│   └── ASSET_INVENTORY.md          # Complete inventory of local verified assets & media
├── public/
│   └── assets/
│       ├── images/
│       │   ├── logo/               # Dark full logo, white full logo, favicon
│       │   ├── home/               # Hero poster, banners
│       │   ├── destinations/       # Domestic & international destination images, regional icons
│       │   ├── about/              # Founder portrait, community campfire, cultural photos
│       │   └── trips/              # 26+ curated expedition thumbnails
│       └── videos/
│           └── hero-loop.mp4       # Autoplaying looping hero video
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root shell with Google Fonts, Header, and Footer
│   │   ├── page.tsx                # Homepage with all 14 authentic sections
│   │   ├── globals.css             # Tailwind layers, CSS variables, and typography rules
│   │   ├── community-trips/        # Community small group trips listing & filters
│   │   ├── experiences/            # Immersive festivals & snow experiences
│   │   ├── tour-packages/          # Complete catalog (Spiti, Ladakh, Treks, Bike)
│   │   ├── winter-spiti/           # Dedicated 4x4 winter campaign landing page
│   │   ├── plan-your-trip/         # Interactive custom itinerary planner & quote builder
│   │   ├── about/                  # Valley roots, heritage story, and crew
│   │   ├── founder/                # Founder Viru Thakur's story: "Beyond Maps & Boundaries"
│   │   ├── contact/                # Office details, operational hours, and contact form
│   │   ├── reviews/                # 4.9★ verified customer reviews & testimonials
│   │   ├── postcards/              # Watch & Read stories, field guides, and modal reader
│   │   ├── podcast/                # The Himalayan Wanderer Podcast episodes & audio dispatches
│   │   ├── ladakh/                 # Ladakh & Zanskar regional hub
│   │   ├── spiti/                  # Spiti Valley regional hub
│   │   ├── himachal/               # Himachal Pradesh regional hub
│   │   ├── kashmir/                # Kashmir regional hub
│   │   ├── uttarakhand/            # Uttarakhand regional hub
│   │   ├── trips/[slug]/           # Dynamic trip detail page (Itinerary, Pricing, Booking)
│   │   ├── careers/                # Job openings & freelance trip leader opportunities
│   │   ├── booking-terms/          # Official booking terms and conditions
│   │   ├── cancellation-policy/    # Token, refund schedules, and cancellation policies
│   │   ├── privacy-policy/         # Data privacy, ILP permits, and media consent
│   │   └── payment-details/        # Corporate bank accounts, UPI, and invoice guidance
│   ├── components/
│   │   ├── ui/                     # Button, Heading, Input, Select, Textarea, Badge
│   │   ├── layout/                 # Header, Footer, Container, MobileNav
│   │   ├── common/                 # SectionHeading, Carousel
│   │   ├── home/                   # HeroSection, TrustBar, RegionIcons, WinterStrip, Pillars, etc.
│   │   ├── trips/                  # TripCard
│   │   ├── destinations/           # DestinationCard
│   │   ├── reviews/                # ReviewCard
│   │   └── postcards/              # PostcardCard
│   ├── data/
│   │   ├── trips.ts                # 32 authentic trip itineraries, pricing, and FAQs
│   │   ├── destinations.ts         # Domestic & international destination objects
│   │   ├── reviews.ts              # Verified traveler reviews & ratings
│   │   ├── postcards.ts            # 80 articles, field guides, and video reels
│   │   └── site-config.ts          # Contact details, banners, and phone numbers
│   ├── lib/
│   │   └── utils.ts                # cn() helper, formatPrice(), slugify()
│   └── types/
│       └── index.ts                # TypeScript interfaces for all data models
├── PROJECT_GUIDELINES.md           # Mandatory coding, architectural, and design rules
├── tailwind.config.ts              # Extended design tokens, colors, radius, and shadows
├── tsconfig.json                   # Strict TypeScript compiler options
└── package.json
```

---

## 4. Getting Started & Installation

### Prerequisites
- Node.js `18.17+` or `20+` or `24+`
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd AWWARA

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build
```bash
npm run build
npm start
```

### Live Deployment (Vercel)
The project is deployed and hosted on **Vercel**:
- **Live Vercel Production URL:** [https://latest.trailexplorers.co/](https://latest.trailexplorers.co/)
- **GitHub Repository:** [https://github.com/rajdoescode/TrailExplorers-neww.git](https://github.com/rajdoescode/TrailExplorers-neww.git)

---

## 5. Available Routes & Pages

| Route | Description |
| :--- | :--- |
| `/` | Homepage (Hero video, trust bar, region icons, winter strip, carousels, pillars, destinations, reviews) |
| `/community-trips` | Curated small-group departures filterable by destination region |
| `/experiences` | Curated experiential journeys (snow trails, cultural festivals, bike passages) |
| `/tour-packages` | Comprehensive tour catalog organized by category tabs |
| `/winter-spiti` | High-impact winter campaign page with month-by-month guide and 4x4 fleet details |
| `/plan-your-trip` | Interactive multi-step itinerary planner with WhatsApp concierge integration |
| `/about` | Native valley roots, sustainable tourism principles, and the crew |
| `/founder` | Founder's story by Viru Thakur: "Beyond Maps & Boundaries, in Search of Our Tribe" |
| `/contact` | Physical office location, operational hours, verified phone, and contact form |
| `/reviews` | Verified customer testimonials with 4.9★ Google rating badge |
| `/postcards` | Visual travel dispatches, field guides, and interactive story modal |
| `/podcast` | The Himalayan Wanderer Podcast & documentary audio dispatches |
| `/ladakh` | Ladakh & Zanskar regional destination hub |
| `/spiti` | Spiti Valley regional destination hub |
| `/himachal` | Himachal Pradesh regional destination hub |
| `/kashmir` | Kashmir regional destination hub |
| `/uttarakhand` | Uttarakhand regional destination hub |
| `/trips/[slug]` | Dynamic trip detail page with expandable itinerary, pricing, and reservation modal |
| `/careers` | Job openings (Trip Leaders, Video Creators, BD Executives, Designers) |
| `/booking-terms` | Legal booking terms, age eligibility, and mountain liability disclaimers |
| `/cancellation-policy` | Tiered refund schedule, token transfer policy, and force majeure clauses |
| `/privacy-policy` | Data protection, ILP permit handling, and media consent rules |
| `/payment-details` | Corporate HDFC Bank transfer details, verified UPI ID, and confirmation steps |

---

## 6. Design System Tokens

- **Brand Accent:** `#d6ff3f` (Electric Neon Lime)
- **Accent Hover:** `#a9cc2a`
- **Primary Carbon:** `#14140f` (Pitch Black Typography & Headers)
- **Muted Surface:** `#f6f6f1` (Subtle Alternating Sections)
- **Muted Text:** `#6b6b63` (Captions & Subtitles)
- **WhatsApp Green:** `#25d366`
- **Card Radius:** `18px` (`--radius-card`)
- **Pill Radius:** `999px` (`--radius-pill`)
- **Card Shadow:** `0 10px 24px rgba(20, 20, 15, 0.08)`
- **Hover Shadow:** `0 18px 34px rgba(20, 20, 15, 0.14)`
