import type { TripType } from "@/lib/types";

export const ACTIVITY_OPTIONS: { value: TripType; label: string; description: string }[] = [
  { value: "city", label: "City", description: "Walking, restaurants, museums, transit." },
  { value: "beach", label: "Beach", description: "Swimwear, sandals, sun protection." },
  { value: "business", label: "Business", description: "Laptop, polished clothes, wrinkle control." },
  { value: "cruise", label: "Cruise", description: "Pool, deck, dinner, travel documents." },
  { value: "camping", label: "Camping", description: "Outdoor basics, towel, bugs, layers." },
  { value: "hiking", label: "Hiking", description: "Trail shoes, water, daypack, rain layer." },
  { value: "international", label: "International", description: "Passport, adapters, document backups." },
  { value: "disney", label: "Disney / theme park", description: "Poncho, water bottle, park bag, walking shoes." }
];
