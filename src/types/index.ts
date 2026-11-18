export interface ItineraryDay {
  day: number;
  title: string;
  desc?: string;
  description?: string;
  distance?: string;
  altitude?: string;
  stay?: string;
  meals?: string;
  highlights?: string[];
  points?: string[];
  [key: string]: any;
}

export interface DepartureDate {
  month?: string;
  dates?: any;
  price?: string;
  status?: string;
  [key: string]: any;
}

export interface PackageOption {
  title?: string;
  price?: string;
  description?: string;
  details?: string[];
  [key: string]: any;
}

export interface Trip {
  id: string | number;
  title: string;
  duration: string;
  price: string;
  category: string;
  route?: string;
  weather_spot?: string;
  tags?: any;
  image_url: string;
  bento_img_1?: string | null;
  bento_img_2?: string | null;
  bento_img_3?: string | null;
  bento_img_4?: string | null;
  bento_img_5?: string | null;
  gallery_images?: any;
  about_text?: string;
  itinerary?: ItineraryDay[];
  inclusions?: any;
  exclusions?: any;
  packing_list?: any;
  package_options?: any;
  sub_package_options?: any;
  departure_dates?: any;
  faqs?: any;
  reviews?: any;
  seo_title?: string;
  meta_description?: string;
  reserve_banner_title?: string;
  custom_quote_title?: string;
  is_featured_reels?: boolean;
  is_featured_stack?: boolean;
  is_featured_lemonade?: boolean;
  is_coming_soon?: boolean;
  listing?: string;
  link?: string;
  slug?: string;
  region?: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface Destination {
  id: number;
  title: string;
  category: "domestic" | "international";
  image_url: string;
  subtitle: string;
  display_order: number;
  is_active: boolean;
  description?: string;
  created_at?: string;
}

export interface Review {
  id: number | string;
  customer_name: string;
  trip_id?: number | string | null;
  trip_tag?: string | null;
  trip_name?: string | null;
  trip_url?: string | null;
  rating: number | string;
  avatar_url?: string | null;
  cover_image?: string | null;
  images?: string[] | null;
  review_text: string;
  featured?: boolean;
  date_text?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Postcard {
  id: number | string;
  type: string;
  title: string;
  subtitle?: string | null;
  category?: string;
  image_url: string;
  video_url?: string;
  embed_url?: string;
  author?: string;
  content?: string;
  related_trip_ids?: any;
  updated_at?: string;
  created_at?: string;
  [key: string]: any;
}

export interface SiteConfig {
  site_phone: string;
  whatsapp_number: string;
  hero_headline: string;
  hero_subtitle: string;
  announcement_bar: string;
  home_destinations?: string;
  carousel_order?: {
    reels?: { order: (number | string)[]; centre?: number | string };
    stack?: { order: (number | string)[] };
    lemonade?: { order: (number | string)[]; centre?: number | string };
  };
}
