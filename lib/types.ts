export type PackingCategory =
  | "clothing"
  | "toiletries"
  | "documents"
  | "electronics"
  | "travel-gear"
  | "weather"
  | "activity"
  | "family-baby";

export type LuggageType = "carry-on" | "checked" | "both";
export type TravelerType = "solo" | "couple" | "family" | "baby-kids";

export type TripType =
  | "city"
  | "beach"
  | "business"
  | "cruise"
  | "camping"
  | "hiking"
  | "international"
  | "disney";

export interface TripConfig {
  destinationSlug: string;
  destinationName: string;
  month: string;
  durationDays: number;
  luggageType: LuggageType;
  travelerType: TravelerType;
  tripTypes: TripType[];
  hasLaundry: boolean;
  packLight: boolean;
  rainExpected: boolean;
  coldWeather: boolean;
  hotWeather: boolean;
  isInternational: boolean;
}

export interface BasePackingItem {
  id: string;
  name: string;
  category: PackingCategory;
  tags?: string[];
}

export interface PackingItem extends BasePackingItem {
  quantity?: number;
  reason: string;
  optional?: boolean;
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  climateTags: string[];
  isInternationalDefault: boolean;
  outletType: string[];
  commonActivities: string[];
  walkingHeavy: boolean;
  notes: string;
}

export interface CategoryMeta {
  id: PackingCategory;
  name: string;
  description: string;
}
