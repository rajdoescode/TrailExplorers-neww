import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceStr: string | number): string {
  if (!priceStr) return "On Request";
  const str = String(priceStr).trim();

  if (str.toLowerCase() === "on request" || str.toLowerCase() === "price on request") {
    return "On Request";
  }

  // Strip prefixes like "Price Per Couple:", "Starting From:", "Starts From:", "Triple sharing", "per person", etc.
  const cleanStr = str
    .replace(/price\s+per\s+couple\s*:?/gi, "")
    .replace(/per\s+couple/gi, "")
    .replace(/starts?\s+from\s*:?/gi, "")
    .replace(/triple\s+sharing\s*:?/gi, "")
    .replace(/per\s+person/gi, "")
    .replace(/\/-/g, "")
    .trim();

  if (!cleanStr || cleanStr.toLowerCase() === "on request") {
    return "On Request";
  }

  // If it has digits, extract the clean formatted Indian currency string
  const numMatch = cleanStr.match(/([0-9,]+(?:\.[0-9]+)?)/);
  if (numMatch) {
    const rawNum = numMatch[1].replace(/,/g, "");
    const num = parseFloat(rawNum);
    if (!isNaN(num) && num > 0) {
      return `₹${num.toLocaleString("en-IN")}`;
    }
  }

  if (cleanStr.startsWith("₹")) {
    return cleanStr;
  }

  return cleanStr || "On Request";
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
