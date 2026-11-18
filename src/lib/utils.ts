import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceStr: string | number): string {
  if (!priceStr) return "On Request";
  const str = String(priceStr).trim();
  if (str.startsWith("₹") || str.toLowerCase().includes("from") || str.toLowerCase().includes("price")) {
    return str;
  }
  const num = parseFloat(str.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return str;
  return `₹${num.toLocaleString("en-IN")}`;
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
