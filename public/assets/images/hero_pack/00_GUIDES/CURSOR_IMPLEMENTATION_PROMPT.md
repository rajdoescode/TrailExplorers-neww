# Cursor / Claude Code / Lovable IMPLEMENTATION PROMPT

Update my existing Trail Explorers website using the attached expanded hero image pack. Change ONLY these 4 pages:
- /community-trips
- /experiences
- /tour-packages
- /postcards

Do NOT change About Us page. Do NOT make new static website screenshots. Keep the site fully functional.

### Visual design
Use existing site brand palette: black/charcoal `#14140F`, white `#FFFFFF`, neon-lime `#D6FF3F`. No orange buttons or dark green page theme. Use realistic photo-looking imagery with right-weighted subjects and a smooth fade into white. Each page must use its own appropriate scene: hikers, cultural Himalayan festival, monastery/road-trip, physical travel postcards.

### Responsive hero requirements
Desktop (>767px) uses `01_DESKTOP_1920x900_WHITE_FADE_WEBP` asset, image on right and clear white space left for real title and description. Mobile (<768px) uses matching `03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP` asset, with a spacious white top for legible title and photo subject visible in lower half. The mobile files in `05_SPECIAL_PORTRAIT_REFERENCE` are additional options. Select whichever crop best preserves subjects.

Use accessible HTML text and responsive `<picture>`; not an image containing text. Check at widths 360, 375, 390, 430, 768, 1024, 1440, and 1920. No horizontal scrolling, no awkward cutoff, no overlap with floating search/filter cards. Page headings and filters should remain real interactive components. Maintain existing links, booking buttons, filters, postcards categories, APIs, and prices, without inventing data. Optimize WebP dimensions, loading priority for above-fold hero, and avoid layout shifts.

### Example
```jsx
<section className="hero">
  <picture className="hero__media">
    <source media="(max-width: 767px)" srcSet="/images/Community_Trips/03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP/01_Standing_at_Himalayan_Viewpoint_mobile_fade.webp" />
    <img src="/images/Community_Trips/01_DESKTOP_1920x900_WHITE_FADE_WEBP/01_Standing_at_Himalayan_Viewpoint_desktop.webp" alt="Travelers sitting at a Himalayan viewpoint" fetchPriority="high" />
  </picture>
  <div className="hero__copy"><h1>Community Trips</h1><p>Immersive Travel, More human connection.</p></div>
</section>
```

```css
.hero { position:relative; min-height:570px; background:white; overflow:hidden; }
.hero__media, .hero__media img { position:absolute; inset:0; width:100%; height:100%; }
.hero__media img { object-fit:cover; object-position:center right; }
.hero__copy { position:relative; z-index:2; max-width:570px; padding:70px 5%; color:#14140F; }
@media (max-width:767px) {
  .hero { min-height:620px; }
  .hero__media img { object-position:center center; }
  .hero__copy { padding:30px 20px; max-width:none; }
}
```

Before editing, inspect the repo and retain existing styles and functionality. Implement directly in the project and verify at all screen widths.
