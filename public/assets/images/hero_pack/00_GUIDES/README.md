# TRAIL EXPLORERS — EXPANDED DESKTOP + MOBILE HERO IMAGE PACK

Four pages ONLY: **Community Trips, Experiences, Tour Packages, Postcards**. About Us is deliberately excluded.

## Contents
- **34 photo variants** = 18 earlier hero concepts + 16 newly generated alternatives.
- Each of the 34 variants includes 4 files: original source PNG, **1920×900 desktop WebP**, **900×1350 mobile WebP**, and **900×1350 mobile with white heading fade**.
- **4 extra full-resolution vertical portrait references** extracted from the original mobile visuals shown in your screenshot, plus matching resized WebP and white-fade WebP for each.
- Preview sheets, screenshots supplied for visual reference, and an implementation prompt.

## Page counts
- Community Trips: **10 desktop + mobile hero photo concepts**, plus 1 dedicated original portrait image.
- Experiences: **7 desktop + mobile hero photo concepts**, plus 1 dedicated original portrait image.
- Tour Packages: **8 desktop + mobile hero photo concepts**, plus 1 dedicated original portrait image.
- Postcards: **9 desktop + mobile hero photo concepts**, plus 1 dedicated original portrait image.

## Design directions
- **Text-free image assets**: no logo, heading, nav, badges, buttons, UI.
- For desktop, left side deliberately fades to white for real HTML text on top of the image; subject is on the right.
- For mobile, use top-white-fade variants to add HTML title above the subjects.
- Natural camera-inspired travel imagery, not aggressive synthetic/neon filters.
- Existing Trail Explorers accent palette remains charcoal `#14140F`, neon lime `#D6FF3F`, white `#FFFFFF`; these accents belong in HTML/CSS, not inside the photos.
- **Important**: images are **AI-generated photorealistic design concepts**, not photos actually taken by a camera at Trail Explorers events. If authentic trip documentation is required, use original licensed photography.

## Recommended file references
Choose a matched desktop and mobile WebP from the *same page and same filename prefix*.

`/public/images/Community_Trips/01_DESKTOP_1920x900_WHITE_FADE_WEBP/01_Standing_at_Himalayan_Viewpoint_desktop.webp`

`/public/images/Community_Trips/03_MOBILE_900x1350_TOP_WHITE_FADE_WEBP/01_Standing_at_Himalayan_Viewpoint_mobile_fade.webp`

## Usage
Use `<picture>` with responsive source rules; put headline and subtitle as real HTML on top, not inside image. Avoid `background-size: cover` cropping the subject incorrectly; check `object-position` per page on 360–430px mobile widths. Preserve existing website functionality, real trip data, and booking actions.
