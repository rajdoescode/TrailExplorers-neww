# TRAIL EXPLORERS – DESIGN SYSTEM SPECIFICATION

> **Source:** Extracted directly from `assets/css/style.css` and live production DOM inspection of `trailexplorers.in`.

---

## 1. Typography System

### 1.1 Font Families

| Role | Font Family | Fallbacks | Source |
| :--- | :--- | :--- | :--- |
| **Primary Headings** | `'Plus Jakarta Sans'` | `'Poppins'`, -apple-system, sans-serif | Google Fonts (`wght@600;700;800`) |
| **Secondary & Accents** | `'Poppins'` | -apple-system, BlinkMacSystemFont, sans-serif | Google Fonts (`wght@400;500;600;700`) |
| **Brand Accents / Display**| `'Baloo 2'` | sans-serif | Google Fonts (`wght@600;700;800`) |
| **Body & UI Elements** | `'Plus Jakarta Sans'` | `'Poppins'`, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif | System / Google Fonts |

### 1.2 Type Scale & Hierarchy

| Element | Font Family | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing | Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | Plus Jakarta Sans | `clamp(34px, 5.5vw, 72px)` | `34px` | 800 (Extra Bold) | 1.1 | -0.03em | `#ffffff` |
| **Page H1** | Plus Jakarta Sans | `clamp(32px, 4.5vw, 52px)` | `30px` | 700 (Bold) | 1.15 | -0.02em | `#14140f` |
| **Section H2**| Plus Jakarta Sans | `clamp(24px, 3.2vw, 36px)` | `24px` | 700 (Bold) | 1.2 | -0.02em | `#14140f` |
| **Banner H2** | Plus Jakarta Sans | `clamp(28px, 4vw, 44px)` | `26px` | 700 (Bold) | 1.2 | -0.02em | `#ffffff` |
| **Card H3** | Plus Jakarta Sans | `17px – 20px` | `16px` | 700 (Bold) | 1.3 | -0.01em | `#14140f` |
| **Modal / Sub H3** | Plus Jakarta Sans | `22px – 24px` | `20px` | 700 (Bold) | 1.25 | -0.01em | `#14140f` |
| **Pillar H4** | Plus Jakarta Sans | `14px – 16px` | `14px` | 700 (Bold) | 1.3 | 0.5px (Uppercase)| `#14140f` |
| **Body / Paragraph** | Plus Jakarta Sans / Poppins | `15px – 16px` | `14px` | 400 / 500 | 1.6 | normal | `#14140f` |
| **Body Muted**| Plus Jakarta Sans | `14px` | `13px` | 400 | 1.5 | normal | `#6b6b63` |
| **Eyebrow / Badge** | Plus Jakarta Sans | `11px – 12px` | `11px` | 700 (Bold) | 1.2 | 0.5px (Uppercase)| `#14140f` |
| **Navigation Link** | Plus Jakarta Sans | `15px` | `16px` | 600 (Semi-Bold) | 1.2 | normal | `#14140f` |
| **Primary Button** | Plus Jakarta Sans | `15px` | `14px` | 700 (Bold) | 1.2 | normal | `#14140f` |
| **Small Button** | Plus Jakarta Sans | `13px` | `12px` | 600 | 1.2 | normal | `#14140f` |
| **Price Hero** | Plus Jakarta Sans | `20px – 24px` | `18px` | 800 (Extra Bold) | 1.1 | -0.02em | `#14140f` |
| **Captions / Meta** | Plus Jakarta Sans | `12px – 13px` | `12px` | 500 | 1.4 | normal | `#6b6b63` |

---

## 2. Color Palette Specification

```text
HEX               RGB                 Usage
#ffffff           rgb(255, 255, 255)  Base Background, Card Backgrounds, White Buttons, Pure White Text
#14140f           rgb(20, 20, 15)     Primary Charcoal Black (Headings, Text, Borders, Footer Base)
#6b6b63           rgb(107, 107, 99)   Muted Text, Paragraph Subtitles, Inactive Indicators
#f6f6f1           rgb(246, 246, 241)  Muted Surface, Subtle Section Backgrounds, Form Input Fills
#d6ff3f           rgb(214, 255, 63)   Primary Neon Lime Accent (CTAs, Badges, Highlights)
#a9cc2a           rgb(169, 204, 42)   Lime Accent Dark (Hover States, Active Rings)
#25d366           rgb(37, 211, 102)   WhatsApp Brand Green (Chat Actions, Verification Badges)
#2fa84f           rgb(47, 168, 79)    Success Green (Availability Badges, Inclusions Checkmarks)
#e0455a           rgb(224, 69, 90)    Danger Red (Exclusions, Seat Urgency, Form Errors)
#f0f0eb           rgb(240, 240, 235)  Secondary Button Fill, Pill Badge Backgrounds
#e2e2dc           rgb(226, 226, 220)  Hairline Dividers, Card Border Strokes
rgba(20,20,15,0.08)                   Standard Card Elevation Shadow
rgba(214,255,63,0.55)                 Neon Lime Accent Drop Shadow Glow
rgba(0,0,0,0.45)                      Hero Video / Image Scrim Overlay
```

---

## 3. Layout Dimensions & Measurements

### 3.1 Container & Header Dimensions
- **Max Container Width (`--container-max`):** `1280px` (`max-w-7xl` in Tailwind).
- **Header Height:** `72px` (desktop), `64px` (mobile).
- **Header Padding:** `16px 24px` (desktop), `12px 16px` (mobile).
- **Section Spacing (`--section-gap`):** `clamp(56px, 8vw, 96px)` vertical padding between major sections.
- **Section Horizontal Padding:** `clamp(16px, 4vw, 32px)`.

### 3.2 Border Radii
- **Card Radius (`--radius-card`):** `18px` (`rounded-[18px]` or `rounded-2xl`).
- **Pill Radius (`--radius-pill`):** `999px` (`rounded-full`) for all main buttons and category filters.
- **Small Radius (`--radius-sm`):** `10px` – `12px` for input fields, badges, and thumbnail containers.

### 3.3 Shadow Tokens
- **Card Shadow (`--shadow-card`):** `0 10px 24px rgba(20, 20, 15, 0.08)`
- **Card Hover Shadow:** `0 18px 34px rgba(20, 20, 15, 0.14)`
- **Neon Glow (`--shadow-glow`):** `0 6px 0 rgba(214, 255, 63, 0.55)`
- **Button Hover Shadow:** `0 8px 24px rgba(214, 255, 63, 0.65)`

### 3.4 Responsive Breakpoints
- **Mobile XS / Small:** `360px` – `430px`
- **Mobile Landscape / Small Tablet:** `640px` (`sm`)
- **Tablet Portrait:** `768px` (`md`)
- **Tablet Landscape / Laptop:** `1024px` (`lg`)
- **Desktop Standard:** `1280px` (`xl`)
- **Large Desktop Screens:** `1440px` – `1920px` (`2xl`)

---

## 4. UI Component Patterns

### 4.1 Buttons
- **Primary Pill (`.btn-primary`):** Background `#d6ff3f`, color `#14140f`, border `2px solid #14140f`, radius `999px`, font-weight 700, padding `12px 28px`. Hover: `translateY(-2px)`, shadow `0 8px 18px rgba(20, 20, 15, 0.16)`.
- **Secondary Dark (`.btn-dark`):** Background `#14140f`, color `#ffffff`, border `2px solid #14140f`, radius `999px`.
- **Ghost White (`.btn-hero-ghost`):** Background `rgba(20, 20, 15, 0.35)`, color `#ffffff`, border `2px solid #ffffff`, backdrop-blur `4px`.
- **Outline (`.btn-outline`):** Background `transparent`, color `#14140f`, border `2px solid #14140f`, radius `999px`.
- **WhatsApp Button (`.btn-whatsapp`):** Background `#25d366` or `#ffffff` with green icon, text `#14140f`, border `1.5px solid #14140f`.

### 4.2 Trip & Experience Cards
- **Structure:**
  - Thumb: Aspect Ratio `4 / 3`, overflow hidden, border radius `18px 18px 0 0`.
  - Image: `object-cover w-full h-full`, hover `scale-105` transition 0.4s ease.
  - Floating Badge: Absolute top-left `top-3 left-3 bg-[#d6ff3f] text-[#14140f] text-xs font-bold px-3 py-1 rounded-full`.
  - Body: Padding `16px 20px 20px 20px`, display flex column gap `8px`.
  - Meta tags: Duration and location with icons.
  - Title: 2 lines max with ellipsis, font weight 700.
  - Footer row: Price tag with duration and bold action link.

### 4.3 Input & Form Controls
- **Input Field:** Background `#f6f6f1`, border `1.5px solid #e2e2dc`, radius `12px`, padding `14px 18px`, text `#14140f`, focus border `#14140f` + focus ring `#d6ff3f`.
- **Labels:** Font weight 600, size `14px`, text `#14140f`, margin-bottom `6px`.
- **Error Messages:** Text color `#e0455a`, size `13px`, margin-top `4px`.

### 4.4 Floating Action Launcher Widgets (Bottom-Right)
- **Banjara Mascot Tile:**
  - Dimensions: `58px × 58px`, squircle radius `rounded-[18px]`.
  - Background: Radial gradient `radial-gradient(circle at 50% 35%, #2d2d24 0%, #14140f 72%)`.
  - Character Peeking: `banjara-standing.webp` centered, head and cap protruding ~22px above the top border, sides and bottom clipped to the 18px border radius using `clipPath: inset(-35px 0 0 0 round 0 0 18px 18px)`.
  - Online Status Dot: `12px × 12px` rounded-full, fill `#b8ff00`, border `2.5px solid #14140f`, pulsing glow animation `animate-banjara-online`.
- **WhatsApp Tile:**
  - Dimensions: `58px × 58px`, matching `rounded-[18px]` radius.
  - Background: Brand green `#25d366`.
  - Icon: Centered crisp white WhatsApp icon (`32px × 32px`).
  - Hover: `hover:scale-105 active:scale-95 transition-all duration-200`.
- **Speech Bubble Prompt:**
  - Floating above the launchers with rotating travel prompts and close `×` button.

### 4.5 Regional Destination Icons
- **Icon Artwork:** Transparent high-res PNG line-art illustrations (Stupa, Monastery, Toy Train, Shikara, Temple) rendered free-standing at `clamp(100px, 14vw, 170px)` without any circular borders or background container fills.
- **Typography:** `font-size: clamp(11px, 1.3vw, 14px); font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #14140f`.
- **Hover Micro-interaction:** `group-hover:-translate-y-1.5 group-hover:scale-105 transition-transform duration-250`.

---

## 5. Animation & Motion Design

- **Transition Durations:**
  - Micro-interactions (hover, click, active): `180ms – 250ms ease`
  - Image Zooms: `400ms cubic-bezier(0.16, 1, 0.3, 1)`
  - Modals / Drawers: `300ms cubic-bezier(0.25, 0.8, 0.25, 1)`
- **Hover Micro-transforms:** `translateY(-2px)` on buttons, `translateY(-6px)` on cards.
- **Trip Planner Staggered Pop-in Animation (`/plan-your-trip`):**
  - `@keyframes pc-pop`: `from { opacity: 0; transform: translateY(6px) scale(0.96); } to { opacity: 1; transform: none; }`
  - `.pc-pop-1`: Delay `0.00s`, duration `0.32s` (Bubble 1).
  - `.pc-pop-2`: Delay `0.45s`, duration `0.32s` (Bubble 2, bold font).
  - `.pc-pop-3`: Delay `0.90s`, duration `0.32s` (Bubble 3).
  - `.pc-pop-starts`: Delay `1.30s`, duration `0.40s` (Starter cards).
  - `⟲ New trip` reset: Increments `welcomeKey` to cleanly replay the entrance sequence.
  - Layout: `h-auto` with zero internal card scrollbar; screen/window scrolling handles natural overflow.
- **Accessibility:** Full support for `prefers-reduced-motion: reduce` disabling transform springs.
