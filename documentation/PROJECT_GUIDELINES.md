# AWWARA BANJARA – PROJECT GUIDELINES & ARCHITECTURE MANUAL

> **Mandatory Reference:** All engineers, AI coding agents, and contributors must strictly adhere to the standards, naming conventions, design tokens, and component architecture detailed in this document.

---

## 1. Project Overview

Awara Banjara (`awarabanjara.in`) is an experiential youth travel brand offering curated small-group Himalayan expeditions, motorbike road trips, festival tours, and customized private journeys across Ladakh, Spiti Valley, Himachal Pradesh, Kashmir, and Uttarakhand.

This project delivers a complete, high-fidelity recreation with modern web performance, high visual fidelity, seamless responsive layouts, dynamic filtering, interactive modals, and accessible UI interactions.

---

## 2. Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5+ (Strict Mode, zero unconstrained `any`)
- **Styling:** Tailwind CSS with custom design system extensions & CSS variables
- **Icons:** `lucide-react` for clean, consistent SVG iconography
- **Fonts:** `next/font/google` with Plus Jakarta Sans, Poppins, and Baloo 2
- **State & Interactions:** React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- **Assets:** Optimized Next.js `<Image />` and HTML5 `<video>`

---

## 3. Design System Foundation

The Awara Banjara aesthetic is characterized by:
- **High-contrast minimal canvas:** Soft off-white backgrounds (`#ffffff`, `#f6f6f1`) with deep pitch-black text and borders (`#14140f`).
- **Signature neon lime accent:** Vibrant electric lime (`#d6ff3f`) used strategically for high-priority conversion points, badges, active tabs, and hover elevations.
- **Organic pill geometry:** Full border-radius pills (`rounded-full`) for buttons, search bars, and tags, contrasted with smooth `18px` rounded cards.

---

## 4. Typography Rules

Font families are loaded via Google Fonts / `next/font`:
- `--font-heading`: `'Plus Jakarta Sans'`, `'Poppins'`, sans-serif
- `--font-body`: `'Plus Jakarta Sans'`, `'Poppins'`, sans-serif
- `--font-accent`: `'Baloo 2'`, sans-serif

### Typography Hierarchy Standards:
1. **Hero H1:** Bold clamp `clamp(34px, 5.5vw, 72px)`, line-height `1.1`, tracking `-0.03em`.
2. **Page H1:** `clamp(30px, 4.5vw, 48px)`, bold, tracking `-0.02em`.
3. **Section H2:** `clamp(24px, 3.2vw, 36px)`, weight 700, line-height `1.2`.
4. **Card H3:** `17px – 20px`, weight 700, line-clamp-2 with min-height for uniform card heights.
5. **Pillar H4 / Sub-labels:** `13px – 14px`, uppercase, tracking `0.5px`, weight 700.
6. **Body / Paragraphs:** `15px – 16px`, line-height `1.6`, color `#14140f` or `#6b6b63`.
7. **Meta / Eyebrow:** `11px – 12px`, uppercase, tracking `0.05em`, weight 700.

All headings must utilize the centralized `<Heading>` and `<SectionHeading>` components. Never create disconnected raw heading tags with haphazard font sizes.

---

## 5. Color Palette Tokens

Extend `tailwind.config.ts` with these exact tokens:

| Name | Hex | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| `primary` | `#14140f` | `--color-black` | Main typography, dark borders, dark buttons, footer base |
| `accent` | `#d6ff3f` | `--color-accent` | Primary CTA buttons, key badges, highlight stickers |
| `accent-hover` | `#a9cc2a` | `--color-accent-dark` | Hover and active states for lime elements |
| `canvas` | `#ffffff` | `--color-bg` | Page base background, card fills |
| `surface-muted` | `#f6f6f1` | `--color-surface-muted` | Subtle alternating section bands, input backgrounds |
| `text-muted` | `#6b6b63` | `--color-text-muted` | Secondary captions, subtitle body copy |
| `border` | `#14140f` | `--color-border` | Signature 2px solid button and card borders |
| `border-light` | `#e2e2dc` | `--color-border-light` | Divider lines and card outline frames |
| `whatsapp` | `#25d366` | `--color-whatsapp` | Direct WhatsApp concierge CTAs |
| `success` | `#2fa84f` | `--color-success` | Availability tags, inclusion checkmarks |
| `danger` | `#e0455a` | `--color-danger` | Urgency indicators, form validation errors |

---

## 6. Spacing Rules

- **Container Max Width:** `1280px` (`max-w-7xl` or custom `max-w-[1280px]`).
- **Container Horizontal Padding:** `px-4 sm:px-6 lg:px-8`.
- **Section Spacing (`--section-gap`):** `py-14 sm:py-20 lg:py-24`.
- **Component Gaps:**
  - Card grids: `gap-6 lg:gap-8`.
  - Icon / Meta rows: `gap-2 sm:gap-3`.
  - Form fields: `gap-4 sm:gap-5`.

---

## 7. Responsive Design Rules

All components must be designed mobile-first and tested rigorously across standard viewports:
- Mobile Portrait: `360px`, `390px`, `430px`
- Tablet: `768px`, `820px`
- Laptop: `1024px`, `1280px`
- Ultra-wide: `1440px`, `1920px`

### Responsive Layout Behaviors:
- **Header:** Sticky desktop bar collapses into sticky bar with mobile drawer toggle at `< 1024px`.
- **Trip Grids:** Convert to horizontal swipeable carousels on touch screens with indicator dots.
- **Sidebars:** Sticky trip pricing sidebars move into a fixed floating bottom bar on mobile screens (`< 1024px`).
- **Zero Horizontal Overflow:** All layout containers must maintain `max-w-full overflow-x-hidden` on outer wrappers.

---

## 8. Component Architecture

```text
src/
├── app/                  # Next.js App Router Pages & Layouts
├── components/
│   ├── ui/               # Atomic Primitives (Button, Heading, Input, Badge, etc.)
│   ├── layout/           # Global Shell (Header, Footer, Container, MobileNav)
│   ├── common/           # Cross-cutting Components (SectionHeading, Carousel, Modal, etc.)
│   ├── home/             # Homepage Specific Sections (Hero, TrustBar, Pillars, etc.)
│   ├── trips/            # Trip Card, Filter Bar, Detailed Itinerary Accordion, Booking Box
│   ├── experiences/      # Experience Cards and Highlights
│   └── reviews/          # Testimonial Cards & Rating Badges
├── data/                 # Typed Datasets (Trips, Destinations, Reviews, Postcards, Config)
├── types/                # TypeScript Interfaces & Types
├── lib/                  # Utilities (formatters, date utils, class merger)
└── hooks/                # Custom React Hooks (useWindowSize, useScroll, etc.)
```

---

## 9. Button Standards (`components/ui/Button.tsx`)

Every button on the platform must be an instance of `<Button>`.
Allowed variants:
1. `primary`: Lime background `#d6ff3f`, black text `#14140f`, black border, pill shape.
2. `secondary`: Off-white `#f0f0eb`, black text, border.
3. `dark`: Solid black `#14140f`, white text `#ffffff`.
4. `white`: Pure white `#ffffff`, black text, drop shadow.
5. `outline`: Transparent background, 2px black border, black text.
6. `ghost`: Transparent with subtle hover effect.
7. `hero-ghost`: Translucent black `rgba(20,20,15,0.35)` with white border and white text.
8. `whatsapp`: WhatsApp green `#25d366` or white with WhatsApp green accents.

Sizes:
- `sm`: `px-4 py-2 text-xs font-semibold`
- `md`: `px-6 py-2.5 text-sm font-bold`
- `lg`: `px-7 py-3 text-base font-bold`
- `xl`: `px-8 py-4 text-lg font-extrabold`

All buttons must support `asChild` / `href` for Next.js `<Link>` usage, left/right icons, loading spinners, and disabled states.

---

## 10. Form Component Standards

All form inputs must live in `components/ui/`:
- `<Input />`: Clean rounded input with label, helper text, and error states.
- `<Select />`: Accessible dropdown selector.
- `<Textarea />`: Multi-line text field with character count.
- `<Checkbox />` & `<Radio />`: Custom styled interactive checks.

Validation:
- Real-time client-side validation.
- Visual error indicators in `#e0455a`.
- Accessible `aria-invalid` and `aria-describedby` attributes.

---

## 11. Heading Standards (`components/ui/Heading.tsx`)

Usage example:
```tsx
<Heading level={1} className="text-white">Made by wanderers, for wanderers.</Heading>
<SectionHeading
  eyebrow="COMMUNITY TRIPS"
  title="Upcoming Himalayan Group Expeditions"
  subtitle="Handpicked small groups, certified mountain captains, and authentic village homestays."
/>
```

---

## 12. Image Standards

- Always specify `width`, `height`, or `fill` with `sizes` on Next.js `<Image />`.
- Maintain `aspect-[4/3]` on trip cards and destination cards.
- Support smooth blur or placeholder fallback to prevent visual layout shifts.
- Maintain `object-cover` to prevent distortion.

---

## 13. Carousel Standards (`components/common/Carousel.tsx`)

- Touch swipe and mouse drag support.
- Navigation buttons (previous / next arrows) with clear disabled states when at limits.
- Smooth CSS snap scrolling (`scroll-snap-type: x mandatory`).
- Responsive cards per view (1 on mobile, 2 on tablet, 3 or 4 on desktop).

---

## 14. Naming Conventions

- **Components:** PascalCase (e.g., `TripCard.tsx`, `HeroSection.tsx`).
- **Files & Utilities:** kebab-case (e.g., `trip-utils.ts`, `site-config.ts`).
- **CSS Classes:** Tailwind utility classes, kebab-case for custom classes.
- **Interfaces & Types:** PascalCase (e.g., `Trip`, `Destination`, `Review`).

---

## 15. Routing Standards

- Next.js App Router directory convention: `app/<route>/page.tsx`.
- Dynamic routes: `app/trips/[slug]/page.tsx`.
- Regional hubs: `app/ladakh/page.tsx`, `app/spiti/page.tsx`, etc.
- Metadata exported per route via Next.js `generateMetadata` or static `metadata`.

---

## 16. Accessibility Requirements

- Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`).
- All interactive controls must be focusable with visible focus rings.
- Proper `aria-label` attributes on icon-only buttons.
- Color contrast ratio minimum 4.5:1 for normal text and 3:1 for large headings.
- Form inputs mapped with `<label htmlFor="...">`.

---

## 17. Performance Standards

- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, FID/INP < 100ms.
- Preload hero video poster image.
- Defer non-critical modals and drawers.
- Static generation for all known trip and destination routes.

---

## 18. Code Quality Rules

1. Zero TypeScript compilation errors (`tsc --noEmit`).
2. Clean separation of data, logic, and presentation.
3. No duplicate component implementations.
4. Descriptive prop interfaces with proper default values.
5. All external links must include `rel="noopener noreferrer"`.

---

## 19. Asset Management

- Assets must be organized under `public/assets/`.
- Never reference missing files or external temporary placeholders when verified local files exist.
- Always provide fallback SVG icons if a specialized asset fails to load.

---

## 20. Development Workflow

1. Initialize Next.js project with Tailwind CSS & TypeScript.
2. Build data contracts and export data constants from authentic scraped JSON.
3. Build atomic UI primitives (`Button`, `Heading`, `Input`, `Container`, `Badge`).
4. Build global layout shell (`Header`, `Footer`, `MobileNav`).
5. Build common travel cards (`TripCard`, `DestinationCard`, `ReviewCard`, `Carousel`).
6. Implement Home page with all 14 sections matching exact visual order.
7. Implement all discovered subpages and dynamic trip details.
8. Perform responsive QA across all breakpoints.
9. Verify build and production readiness.
