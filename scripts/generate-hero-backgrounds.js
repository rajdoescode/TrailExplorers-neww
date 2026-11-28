const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const bgDir = path.resolve('public/assets/images/backgrounds');

// SVG gradient overlay for mobile 900x1350
// Top 0-35% is 100% white (#ffffff)
// 35%-75% is smooth cubic/exponential falloff from white to transparent
// 75%-100% is 100% transparent
const mobileSvgOverlay = Buffer.from(`
<svg width="900" height="1350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="43%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="52%" stop-color="#ffffff" stop-opacity="0.75" />
      <stop offset="62%" stop-color="#ffffff" stop-opacity="0.38" />
      <stop offset="72%" stop-color="#ffffff" stop-opacity="0.1" />
      <stop offset="82%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="900" height="1350" fill="url(#topFade)" />
</svg>
`);

// Desktop SVG gradient overlay for left fade to ensure 100% pure white on left text zone
const desktopSvgOverlay = Buffer.from(`
<svg width="1920" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="28%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="38%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="48%" stop-color="#ffffff" stop-opacity="0.45" />
      <stop offset="58%" stop-color="#ffffff" stop-opacity="0.12" />
      <stop offset="68%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1920" height="900" fill="url(#leftFade)" />
</svg>
`);

const configs = [
  {
    name: 'booking-terms',
    source: 'booking-terms.png',
    crop: { left: 600, top: 0, width: 984, height: 672 }
  },
  {
    name: 'cancellation-policy',
    source: 'cancellation-policy.png',
    crop: { left: 550, top: 0, width: 1034, height: 672 }
  },
  {
    name: 'privacy-policy',
    source: 'privacy-policy.png',
    crop: { left: 620, top: 0, width: 964, height: 672 }
  },
  {
    name: 'contact',
    source: 'contact.png',
    crop: { left: 600, top: 0, width: 984, height: 672 }
  },
  {
    name: 'payment-details',
    source: 'payment-details.png',
    crop: { left: 550, top: 0, width: 1034, height: 672 }
  }
];

async function generateAll() {
  for (const cfg of configs) {
    console.log(`Processing ${cfg.name}...`);
    const srcPath = path.join(bgDir, cfg.source);

    // 1. DESKTOP WebP (1920x900)
    // Scale source to fit right-aligned on 1920x900 canvas with left white zone
    const desktopImg = await sharp(srcPath)
      .resize(1920, 900, { fit: 'cover', position: 'right' })
      .toBuffer();

    await sharp({
      create: {
        width: 1920,
        height: 900,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      { input: desktopImg, top: 0, left: 0 },
      { input: desktopSvgOverlay, top: 0, left: 0 }
    ])
    .webp({ quality: 90 })
    .toFile(path.join(bgDir, `${cfg.name}-desktop.webp`));

    // 2. MOBILE WebP (900x1350)
    const mobileCropped = await sharp(srcPath)
      .extract(cfg.crop)
      .resize(900, 920, { fit: 'cover', position: 'center' })
      .toBuffer();

    await sharp({
      create: {
        width: 900,
        height: 1350,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      { input: mobileCropped, top: 430, left: 0 },
      { input: mobileSvgOverlay, top: 0, left: 0 }
    ])
    .webp({ quality: 90 })
    .toFile(path.join(bgDir, `${cfg.name}-mobile.webp`));

    console.log(`✓ ${cfg.name} desktop & mobile generated.`);
  }

  // Cleanup test file if exists
  const testFile = path.join(bgDir, 'contact_mobile_test.webp');
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  console.log('All backgrounds successfully generated!');
}

generateAll().catch(console.error);
