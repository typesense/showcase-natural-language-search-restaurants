import Typesense from 'typesense';

export type _Restaurant = {
  id: string;
  restaurant_link: string;
  restaurant_name: string;
  country: string;
  region: string | null;
  province: string | null;
  city: string | null;
  address: string;
  awards: string[];
  popularity_detailed: string;
  top_tags: string[];
  meals: string;
  cuisines: string;
  features: string;
  vegetarian_friendly: boolean;
  gluten_free: boolean;
  open_hours: string;
  open_days_per_week: number | null;
  avg_rating: number;
  total_reviews_count: number;
  reviews_count_in_default_language: number;
  excellent: number;
  very_good: number;
  average: number;
  poor: number;
  terrible: number;
  food: number;
  service: number | null;
  value: number | null;
  atmosphere: number | null;
  geopoint: [number, number];
  price_min: number;
  price_max: number;
};
export const typesense = ({ isServer = false } = {}) =>
  new Typesense.Client({
    apiKey:
      (isServer
        ? process.env.TYPESENSE_ADMIN_API_KEY
        : process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY) || 'xyz',
    nodes: [
      {
        url: process.env.NEXT_PUBLIC_TYPESENSE_URL || 'http://localhost:8108',
      },
    ],
    connectionTimeoutSeconds: 60 * 60,
  });
