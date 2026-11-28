/**
 * Trail Explorers User Website API Client
 * Connects frontend pages to MongoDB REST endpoints with seamless fallback
 */

import { TRIPS_DATA } from "@/data/trips";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { REVIEWS_DATA } from "@/data/reviews";
import { POSTCARDS_DATA } from "@/data/postcards";
import { SITE_CONFIG } from "@/data/site-config";
import { Trip, Destination, Review, Postcard, SiteConfig } from "@/types";

const getApiBase = () => {
  if (typeof window !== "undefined") {
    return "/api";
  }
  return process.env.BACKEND_API_URL || "http://127.0.0.1:5002/api";
};

export class TrailApi {
  // Trips
  static async getTrips(): Promise<Trip[]> {
    try {
      const res = await fetch(`${getApiBase()}/trips`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }
    return TRIPS_DATA;
  }

  static async getTripBySlug(slug: string): Promise<Trip | null> {
    try {
      const res = await fetch(`${getApiBase()}/trips/${encodeURIComponent(slug)}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }
    return (
      TRIPS_DATA.find(
        (t) =>
          t.slug === slug ||
          String(t.id) === slug ||
          slug.endsWith(`-${t.id}`)
      ) || null
    );
  }

  // Destinations
  static async getDestinations(): Promise<Destination[]> {
    try {
      const res = await fetch(`${getApiBase()}/destinations`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }
    return DESTINATIONS_DATA;
  }

  // Reviews
  static async getReviews(): Promise<Review[]> {
    try {
      const res = await fetch(`${getApiBase()}/reviews`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }
    return REVIEWS_DATA;
  }

  // Postcards & Stories
  static async getPostcards(): Promise<Postcard[]> {
    try {
      const res = await fetch(`${getApiBase()}/postcards`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }
    return POSTCARDS_DATA;
  }

  // Site Configuration
  static async getSiteConfig(): Promise<SiteConfig> {
    try {
      const res = await fetch(`${getApiBase()}/site-config`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }
    return SITE_CONFIG;
  }

  // Submit Lead
  static async submitInquiry(payload: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const res = await fetch(`${getApiBase()}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json) return json;
      return { success: false, error: json?.error || "Failed to submit inquiry." };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error. Please try again." };
    }
  }

  // Submit Custom Planner Request
  static async submitCustomPlan(payload: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const res = await fetch(`${getApiBase()}/plan-your-trip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json) return json;
      return { success: false, error: json?.error || "Failed to submit custom itinerary." };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error." };
    }
  }

  // Banjara AI Chat
  static async chatTurn(sessionId: string, message: string): Promise<any> {
    try {
      const res = await fetch(`${getApiBase()}/trip-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Ignore
    }
    return null;
  }
}
