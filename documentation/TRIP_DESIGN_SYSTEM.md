# TRAIL EXPLORERS – TRIP DETAIL DESIGN SYSTEM SPECIFICATION

## 1. Color Palette & Brand Tokens

| Token | Hex / Value | Usage |
|---|---|---|
| **Neon Lime Accent** | `#d6ff3f` / `#ccff00` | Primary CTAs, active package pills, "BOOK NOW" buttons, lightbox highlights |
| **Primary Dark** | `#14140f` | Headings, primary buttons, badges, dark pill buttons, footer |
| **Warm Page Background** | `#f6f6f1` | Global body background, contrast surfaces |
| **White Card Background** | `#ffffff` | Content cards, modal cards, sticky sidebar, header |
| **Subtle Card Tint** | `#fafaf7` | Secondary surfaces, weather cards, inactive tabs, FAQ headers |
| **Card Borders** | `#e2e2dc` | Container borders, card outlines, dividers |
| **Muted Text** | `#6b6b63` | Subtitles, breadcrumbs, descriptions, timestamps |
| **Success / Available** | `#2fa84f` / `#1b7e3f` | Inclusions checkmarks, "Available" status badge, live weather pulse |
| **Exclusion / Alert** | `#e0455a` | Exclusions crossmarks, warnings, errors |
| **WhatsApp Brand** | `#25d366` | WhatsApp button, WhatsApp share, chat links |
| **Star Rating Gold** | `#facc15` | Customer review stars |

---

## 2. Typography

- **Headings Font:** `Plus Jakarta Sans`, `Baloo 2`, sans-serif (`font-heading`)
  - Weight: `800` (Extrabold) & `700` (Bold)
  - Letter-spacing: `-0.02em`
- **Body Font:** `Plus Jakarta Sans`, system-ui, sans-serif
  - Weight: `500` (Medium), `600` (Semibold), `400` (Regular)
- **Line Heights:**
  - Headings: `1.15` to `1.25`
  - Body / Paragraphs: `1.6` to `1.7`

---

## 3. UI Component Architecture

### Section 1: Bento Photo Gallery & Lightbox
- **Desktop Layout:** 4-column CSS grid (`h-[460px]`), 1 main tile (span 3), 2 stacked vertical tiles (span 1)
- **Border Radius:** `16px` (`rounded-2xl`)
- **Pill Button:** `Show all X photos` (`bg-[#14140f]/90 text-white rounded-full`)
- **Fullscreen Lightbox Modal:**
  - Dark backdrop blur (`bg-black/95`)
  - Keyboard listeners: `Escape` closes, `ArrowRight` / `ArrowLeft` navigates
  - Bottom thumbnail strip with active `#d6ff3f` border

### Section 2: Secondary Sticky Navigation
- **Sticky Offset:** `top-0` (or below header), `z-30`, `bg-white/95 backdrop-blur-md`
- **Items:** `About`, `Itinerary`, `Inclusions`, `Packages`, `Packing`, `Dates`, `Attractions`, `FAQs`, `Reviews`
- **Active State:** `bg-[#14140f] text-[#d6ff3f] rounded-full`
- **Smooth Scroll:** Programmatic `window.scrollTo` with offset `-90px`

### Section 3: Title Card
- **Breadcrumbs:** `Home › [Destination] › [Trip Title]`
- **Meta:** `⏱ X Days / Y Nights`
- **Title:** `text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14140f]`
- **Action Buttons:**
  - `Share`: Black pill button, opens `ShareModal`
  - `Download PDF`: Neon lime pill button, opens `PdfLeadModal`

### Section 4: Live Weather Card
- **Pulsing Dot:** Green pulse `animate-pulse` + `LIVE [LOCATION]`
- **Big Temperature:** `text-4xl sm:text-5xl font-extrabold`
- **Condition Subtitle:** `Clear sky • feels like ... • today ...`
- **4-Day Forecast:** 4 mini-cards with Day, Weather Icon, and Min/Max temperatures

### Section 5: Package Options Card
- **Package Pills:** Interactive cards (`Quad Sharing ₹17,499`, `Triple Sharing ₹18,499`)
- **Selection Behavior:** Active card gets `bg-[#d6ff3f] border-[#14140f]`, updating the sticky booking card and modal price

### Section 6: What to Pack (Interactive Checklist)
- **Counter Badge:** 🎒 `X / 37` packed
- **7 Categories:**
  1. Clothing (10 items)
  2. Footwear (3 items)
  3. Essentials (7 items)
  4. Gadgets (4 items)
  5. Medical (6 items)
  6. Personal Care (4 items)
  7. Documents & Money (3 items)
- **Checkboxes:** Custom styled checkboxes with icon, strikethrough text on check, `localStorage` persistence

### Section 7: Departure Dates Card
- **Month Tabs:** E.g. `December 2026`, `November 2026`
- **Batch Cards:** Batch date, `Available` badge, dynamic package price
- **Action CTA:** `BOOK NOW — [Batch Date]` opening the 2-column modal

### Section 8: Attractions Carousel
- **Controls:** `<` and `>` circular buttons
- **Horizontal Cards:** `w-[320px] h-[380px]`, image with dark gradient, bold white title, description snippet

### Section 9: FAQs Accordion
- **Expand/Collapse All:** Top-right button
- **Item Toggle:** `+` / `-` with smooth height transition
- **Pagination Limit:** Shows first 5 questions by default, toggle to `Show all 14 questions`

### Section 10: Reviews Section
- **Verified Cards:** Reviewer avatar, name, `Joined Solo Trip` tag, `Booked: [Trip Name] ↗`, 5 stars, review text

### Section 11: Sticky Right Sidebar
- **Position:** `sticky top-[90px]`
- **Price Block:** `Starting From`, dynamic price, `per person`, `+ 5% GST`
- **CTA:** Full-width `#d6ff3f` `BOOK NOW` button
- **Planner Button:** `Chat with our Trip Planner`
- **WhatsApp Button:** Direct WhatsApp link with prefilled inquiry message
- **Trust Guarantee:** 10% advance lock, 30 days refund, zero hidden fees

### Section 12: 1-to-1 Booking Modal ("Plan Your Next Trip")
- **Layout:** 2-column popup card
- **Left Column:** Dynamic trip image, "Escape the ordinary.", Selected Batch glass card
- **Right Column:** Name, Mobile No, Email, Departure Date, Travelers, Message, "Connect with Expert" button
