import { Trip, Review } from "@/types";
import { POSTCARDS_DATA } from "@/data/postcards";
import { REVIEWS_DATA } from "@/data/reviews";

export interface WeatherInfo {
  location: string;
  temp: string;
  description: string;
  forecast: Array<{
    day: string;
    icon: string;
    temp: string;
  }>;
}

export interface AttractionItem {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  content?: string;
}

export interface PackingCategory {
  category: string;
  icon: string;
  items: Array<{
    name: string;
    icon?: string;
  }>;
}

// Default 7-category / 37-item Himalayan expedition packing list matching the reference 1-to-1
export const DEFAULT_HIMALAYAN_PACKING_LIST: PackingCategory[] = [
  {
    category: "Clothing",
    icon: "🧥",
    items: [
      { name: "Thermal base layers (3-4 sets, merino wool or synthetic)", icon: "🌡️" },
      { name: "Fleece sweaters or pullover layers", icon: "🧥" },
      { name: "Windproof and waterproof heavy down jacket (-20°C rated)", icon: "🧥" },
      { name: "Fleece-lined trekking or snow pants", icon: "👖" },
      { name: "Waterproof outer pants", icon: "👖" },
      { name: "Woolen beanie / monkey cap", icon: "🧢" },
      { name: "Balaclava or neck gaiter", icon: "🧣" },
      { name: "Thermal inner gloves", icon: "🧤" },
      { name: "Waterproof and windproof ski gloves / mittens", icon: "🧤" },
      { name: "Woolen thermal socks (5-6 pairs)", icon: "🧦" },
    ],
  },
  {
    category: "Footwear",
    icon: "🥾",
    items: [
      { name: "Waterproof high-ankle snow boots with deep tread grip", icon: "🥾" },
      { name: "Extra wool/fleece insoles", icon: "👟" },
      { name: "Comfortable slip-on shoes or insulated slippers for homestays", icon: "🩴" },
    ],
  },
  {
    category: "Essentials",
    icon: "⭐",
    items: [
      { name: "UV400 polarized sunglasses (essential against snow blindness)", icon: "🕶️" },
      { name: "Sunscreen lotion (SPF 50+ PA+++)", icon: "🧴" },
      { name: "Moisturizing cold cream and petroleum jelly", icon: "🧴" },
      { name: "Hydrating lip balm with SPF", icon: "💄" },
      { name: "Insulated thermos flask (1 litre, keeps water hot)", icon: "🍶" },
      { name: "Quick-dry microfiber towel", icon: "🧼" },
      { name: "Biodegradable wet wipes and tissue rolls", icon: "🧻" },
    ],
  },
  {
    category: "Gadgets",
    icon: "📱",
    items: [
      { name: "High-capacity power bank (20,000 mAh+; cold drains batteries fast)", icon: "🔋" },
      { name: "Extra camera and phone batteries", icon: "📷" },
      { name: "Multi-plug adapter and charging cables", icon: "🔌" },
      { name: "Torch or headlamp with extra batteries", icon: "🔦" },
    ],
  },
  {
    category: "Medical",
    icon: "💊",
    items: [
      { name: "Prescription Diamox (for AMS acclimatization)", icon: "💊" },
      { name: "Pain relief and fever tablets (Paracetamol, Ibuprofen)", icon: "💊" },
      { name: "Antinausea and motion sickness tablets", icon: "💊" },
      { name: "Cold, cough, and throat lozenges", icon: "🍬" },
      { name: "Band-aids, antiseptic cream, and crepe bandage", icon: "🩹" },
      { name: "Personal regular prescription medicines", icon: "🩺" },
    ],
  },
  {
    category: "Personal Care",
    icon: "🧴",
    items: [
      { name: "Toothbrush and biodegradable toothpaste", icon: "🪥" },
      { name: "Dry shampoo", icon: "🧴" },
      { name: "Hand sanitizer", icon: "🧴" },
      { name: "Pocket paper soaps", icon: "🧼" },
    ],
  },
  {
    category: "Documents & Money",
    icon: "💳",
    items: [
      { name: "Original government-issued photo ID (Aadhaar / Voter ID / Passport)", icon: "🪪" },
      { name: "Multiple physical photocopies of photo ID", icon: "📄" },
      { name: "Adequate physical cash (ATMs rarely work in Spiti during winter)", icon: "💵" },
    ],
  },
];

/**
 * Get static captured weather fixture for a trip matching awarabanjara.in
 */
export function getTripWeather(trip: Trip): WeatherInfo {
  const text = `${trip.title} ${trip.route || ""} ${trip.category || ""}`.toLowerCase();

  if (text.includes("spiti")) {
    return {
      location: "KAZA, SPITI VALLEY",
      temp: "-3°C",
      description: "Clear sky • feels like -7° • today 6° / -9°",
      forecast: [
        { day: "Fri", icon: "☁️", temp: "9° / -6°" },
        { day: "Sat", icon: "☁️", temp: "9° / -5°" },
        { day: "Sun", icon: "❄️", temp: "6° / -7°" },
        { day: "Mon", icon: "☁️", temp: "4° / -9°" },
      ],
    };
  }

  if (text.includes("manali") || text.includes("naggar") || text.includes("baralacha") || text.includes("himachal") || text.includes("kullu") || text.includes("kasol")) {
    return {
      location: "MANALI, HIMACHAL PRADESH",
      temp: "6°C",
      description: "Clear sky • feels like 2° • today 23° / 2°",
      forecast: [
        { day: "Fri", icon: "☁️", temp: "21° / 5°" },
        { day: "Sat", icon: "🌧️", temp: "19° / 7°" },
        { day: "Sun", icon: "🌧️", temp: "17° / 4°" },
        { day: "Mon", icon: "☀️", temp: "18° / 3°" },
      ],
    };
  }

  if (text.includes("kashmir") || text.includes("gulmarg") || text.includes("srinagar") || text.includes("pahalgam")) {
    return {
      location: "SRINAGAR, KASHMIR",
      temp: "4°C",
      description: "Overcast • feels like 1° • today 12° / 0°",
      forecast: [
        { day: "Fri", icon: "🌧️", temp: "10° / 1°" },
        { day: "Sat", icon: "❄️", temp: "8° / -2°" },
        { day: "Sun", icon: "❄️", temp: "7° / -1°" },
        { day: "Mon", icon: "⛅", temp: "11° / 2°" },
      ],
    };
  }

  if (text.includes("zanskar") || text.includes("ladakh") || text.includes("leh") || text.includes("shinku")) {
    return {
      location: "LEH, LADAKH",
      temp: "-1°C",
      description: "Partly cloudy • feels like -5° • today 5° / -8°",
      forecast: [
        { day: "Fri", icon: "⛅", temp: "4° / -7°" },
        { day: "Sat", icon: "❄️", temp: "3° / -9°" },
        { day: "Sun", icon: "☀️", temp: "5° / -6°" },
        { day: "Mon", icon: "⛅", temp: "6° / -5°" },
      ],
    };
  }

  if (text.includes("meghalaya") || text.includes("kaziranga") || text.includes("ziro")) {
    return {
      location: "SHILLONG, MEGHALAYA",
      temp: "16°C",
      description: "Gentle breeze • feels like 16° • today 22° / 12°",
      forecast: [
        { day: "Fri", icon: "☀️", temp: "21° / 13°" },
        { day: "Sat", icon: "⛅", temp: "20° / 12°" },
        { day: "Sun", icon: "☀️", temp: "22° / 11°" },
        { day: "Mon", icon: "☀️", temp: "23° / 12°" },
      ],
    };
  }

  return {
    location: "MANALI, HIMACHAL PRADESH",
    temp: "6°C",
    description: "Clear sky • feels like 2° • today 23° / 2°",
    forecast: [
      { day: "Fri", icon: "☁️", temp: "21° / 5°" },
      { day: "Sat", icon: "🌧️", temp: "19° / 7°" },
      { day: "Sun", icon: "🌧️", temp: "17° / 4°" },
      { day: "Mon", icon: "☀️", temp: "18° / 3°" },
    ],
  };
}

/**
 * Extract full gallery of photos for a trip
 */
export function getTripGallery(trip: Trip): string[] {
  const list: string[] = [];
  if (trip.image_url) list.push(trip.image_url);
  if (trip.bento_img_1) list.push(trip.bento_img_1);
  if (trip.bento_img_2) list.push(trip.bento_img_2);
  if (trip.bento_img_3) list.push(trip.bento_img_3);
  if (trip.bento_img_4) list.push(trip.bento_img_4);
  if (trip.bento_img_5) list.push(trip.bento_img_5);

  if (Array.isArray(trip.gallery_images)) {
    for (const img of trip.gallery_images) {
      if (img && typeof img === "string" && !list.includes(img)) {
        list.push(img);
      }
    }
  }

  // Deduplicate and ensure starting slash
  const clean = Array.from(new Set(list))
    .filter(Boolean)
    .map((url) => (url.startsWith("/") || url.startsWith("http") ? url : `/${url}`));

  // Fallbacks if fewer than 3
  if (clean.length < 3) {
    clean.push("/assets/images/destinations/domestic/himachal.jpg");
    clean.push("/assets/images/destinations/domestic/spiti.jpg");
    clean.push("/assets/images/about/community-group.jpg");
  }

  return clean;
}

/**
 * Get attractions matching this trip from postcards dataset
 */
export function getTripAttractions(trip: Trip): AttractionItem[] {
  const text = `${trip.title} ${trip.route || ""} ${trip.category || ""}`.toLowerCase();
  const allAttractions = (POSTCARDS_DATA || []).filter(
    (p) => p.type === "attraction" || p.category === "Attraction"
  );

  let filtered: any[] = [];

  if (text.includes("spiti")) {
    const spitiKeywords = ["kaza", "kibber", "chicham", "key monastery", "hikkim", "komic", "langza", "dhankhar", "tabo", "nako", "kunzum"];
    filtered = allAttractions.filter((a) => {
      const aText = (a.title + " " + (a.content || "")).toLowerCase();
      return spitiKeywords.some((k) => aText.includes(k));
    });
  } else if (text.includes("naggar") || text.includes("baralacha") || text.includes("bijli") || text.includes("manali")) {
    const naggarKeywords = ["naggar", "baralacha", "bijli", "jana", "suraj tal", "deepak tal", "sissu", "atal tunnel", "hadimba"];
    filtered = allAttractions.filter((a) => {
      const aText = (a.title + " " + (a.content || "")).toLowerCase();
      return naggarKeywords.some((k) => aText.includes(k));
    });
  } else if (text.includes("kashmir") || text.includes("gulmarg") || text.includes("srinagar")) {
    const kashmirKeywords = ["gulmarg", "pahalgam", "betaab", "aru", "dal lake", "doodhpathri", "drung"];
    filtered = allAttractions.filter((a) => {
      const aText = (a.title + " " + (a.content || "")).toLowerCase();
      return kashmirKeywords.some((k) => aText.includes(k));
    });
  } else if (text.includes("zanskar") || text.includes("ladakh")) {
    const zanskarKeywords = ["karsha", "padum", "phuktal", "shinku", "gonbo"];
    filtered = allAttractions.filter((a) => {
      const aText = (a.title + " " + (a.content || "")).toLowerCase();
      return zanskarKeywords.some((k) => aText.includes(k));
    });
  }

  if (filtered.length < 3) {
    filtered = allAttractions.slice(0, 6);
  }

  return filtered.map((a) => {
    let img = a.image_url || "/assets/images/destinations/domestic/himachal.jpg";
    if (!img.startsWith("/") && !img.startsWith("http")) img = "/" + img;
    return {
      id: String(a.id),
      title: a.title,
      subtitle: a.subtitle || (a.content ? a.content.slice(0, 140) + "..." : ""),
      image_url: img,
      content: a.content,
    };
  });
}

/**
 * Get tailored authentic reviews for this trip
 */
export function getTripReviews(trip: Trip): Review[] {
  const text = `${trip.title} ${trip.category || ""}`.toLowerCase();

  if (text.includes("spiti")) {
    const dhruv = REVIEWS_DATA.find((r) => r.customer_name.includes("Dhruv"));
    const devansh = REVIEWS_DATA.find((r) => r.customer_name.includes("Devansh"));
    const list = [dhruv, devansh].filter(Boolean) as Review[];
    if (list.length > 0) return list;
  }

  if (text.includes("naggar") || text.includes("manali") || text.includes("himachal")) {
    const samarth = REVIEWS_DATA.find((r) => r.customer_name.includes("Samarth"));
    const divya = REVIEWS_DATA.find((r) => r.customer_name.includes("Divya"));
    const list = [samarth, divya].filter(Boolean) as Review[];
    if (list.length > 0) return list;
  }

  return REVIEWS_DATA.slice(0, 2);
}

/**
 * Get packing list for trip (7 categories / 37 items)
 */
export function getTripPackingList(trip: Trip): PackingCategory[] {
  if (Array.isArray(trip.packing_list) && trip.packing_list.length > 0) {
    return trip.packing_list.map((cat: any) => ({
      category: cat.category,
      icon: getCategoryIcon(cat.category),
      items: (cat.items || []).map((it: any) => (typeof it === "string" ? { name: it, icon: getItemIcon(it) } : it)),
    }));
  }

  return DEFAULT_HIMALAYAN_PACKING_LIST;
}

function getCategoryIcon(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes("cloth")) return "🧥";
  if (c.includes("foot")) return "🥾";
  if (c.includes("essential")) return "⭐";
  if (c.includes("gadget")) return "📱";
  if (c.includes("medic")) return "💊";
  if (c.includes("personal")) return "🧴";
  if (c.includes("document") || c.includes("money")) return "💳";
  return "🎒";
}

function getItemIcon(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("thermal") || n.includes("cold")) return "🌡️";
  if (n.includes("fleece") || n.includes("jacket") || n.includes("cloth")) return "🧥";
  if (n.includes("pant")) return "👖";
  if (n.includes("boot") || n.includes("shoe")) return "🥾";
  if (n.includes("sock")) return "🧦";
  if (n.includes("glove")) return "🧤";
  if (n.includes("cap") || n.includes("beanie")) return "🧢";
  if (n.includes("sunglass")) return "🕶️";
  if (n.includes("sunscreen") || n.includes("cream") || n.includes("balm")) return "🧴";
  if (n.includes("flask") || n.includes("water") || n.includes("thermos")) return "🍶";
  if (n.includes("power bank") || n.includes("battery")) return "🔋";
  if (n.includes("camera") || n.includes("phone")) return "📷";
  if (n.includes("torch") || n.includes("headlamp")) return "🔦";
  if (n.includes("diamox") || n.includes("medicine") || n.includes("tablet")) return "💊";
  if (n.includes("bandage") || n.includes("aid")) return "🩹";
  if (n.includes("id") || n.includes("passport") || n.includes("aadhaar")) return "🪪";
  if (n.includes("cash") || n.includes("money")) return "💵";
  return "✨";
}
