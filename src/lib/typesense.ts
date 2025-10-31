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
  meals: string[];
  cuisines: string[];
  features: string[];
  vegetarian_friendly: boolean;
  gluten_free: boolean;
  open_hours: { day: string; open: number; close: number }[];
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

export const typesense = new Typesense.Client({
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY || 'xyz',
  nodes: process.env.NEXT_PUBLIC_TYPESENSE_URLS
    ? process.env.NEXT_PUBLIC_TYPESENSE_URLS.split(',').map((url: string) => ({
        url,
      }))
    : [
        {
          url: 'http://localhost:8108',
        },
      ],

  nearestNode: process.env.PUBLIC_TYPESENSE_NEAREST_NODE_URL
    ? {
        url: process.env.PUBLIC_TYPESENSE_NEAREST_NODE_URL,
      }
    : undefined,
  connectionTimeoutSeconds: 5,
});
